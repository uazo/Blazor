import { MethodHandle, System_Object, System_String, System_Array, Pointer, Platform } from '../Platform';
import { getAssemblyNameFromUrl, getFileNameFromUrl } from '../Url';
import { attachDebuggerHotkey, hasDebuggingEnabled } from './MonoDebugger';

const assemblyHandleCache: { [assemblyName: string]: number } = {};
const typeHandleCache: { [fullyQualifiedTypeName: string]: number } = {};
const methodHandleCache: { [fullyQualifiedMethodName: string]: MethodHandle } = {};

let assembly_load: (assemblyName: string) => number;
let find_class: (assemblyHandle: number, namespace: string, className: string) => number;
let find_method: (typeHandle: number, methodName: string, unknownArg: number) => MethodHandle;
let invoke_method: (method: MethodHandle, target: System_Object, argsArrayPtr: number, exceptionFlagIntPtr: number) => System_Object;
let mono_string_get_utf8: (managedString: System_String) => Mono.Utf8Ptr;
let mono_string: (jsString: string) => System_String;
const appBinDirName = 'appBinDir';

export const monoPlatform: Platform = {
  start: function start(loadAssemblyUrls: string[]) {
    return new Promise<void>((resolve, reject) => {
      attachDebuggerHotkey(loadAssemblyUrls);

      // mono.js assumes the existence of this
      window['Browser'] = {
        init: () => { }
      };
      // Emscripten works by expecting the module config to be a global
      window['Module'] = createEmscriptenModuleInstance(loadAssemblyUrls, resolve, reject);

      addScriptTagsToDocument();
    });
  },

  findMethod: findMethod,

  callEntryPoint: function callEntryPoint(assemblyName: string, entrypointMethod: string, args: System_Object[]): void {
    // Parse the entrypointMethod, which is of the form MyApp.MyNamespace.MyTypeName::MyMethodName
    // Note that we don't support specifying a method overload, so it has to be unique
    const entrypointSegments = entrypointMethod.split('::');
    if (entrypointSegments.length != 2) {
      throw new Error('Malformed entry point method name; could not resolve class name and method name.');
    }
    const typeFullName = entrypointSegments[0];
    const methodName = entrypointSegments[1];
    const lastDot = typeFullName.lastIndexOf('.');
    const namespace = lastDot > -1 ? typeFullName.substring(0, lastDot) : '';
    const typeShortName = lastDot > -1 ? typeFullName.substring(lastDot + 1) : typeFullName;

    const entryPointMethodHandle = monoPlatform.findMethod(assemblyName, namespace, typeShortName, methodName);
    monoPlatform.callMethod(entryPointMethodHandle, null, args);
  },

  callMethod: function callMethod(method: MethodHandle, target: System_Object, args: System_Object[]): System_Object {
    if (args.length > 4) {
      // Hopefully this restriction can be eased soon, but for now make it clear what's going on
      throw new Error(`Currently, MonoPlatform supports passing a maximum of 4 arguments from JS to .NET. You tried to pass ${args.length}.`);
    }

    const stack = Module.stackSave();

    try {
      const argsBuffer = Module.stackAlloc(args.length);
      const exceptionFlagManagedInt = Module.stackAlloc(4);
      for (var i = 0; i < args.length; ++i) {
        Module.setValue(argsBuffer + i * 4, args[i], 'i32');
      }
      Module.setValue(exceptionFlagManagedInt, 0, 'i32');

      let t0 = performance.now();
      const res = invoke_method(method, target, argsBuffer, exceptionFlagManagedInt);
      let t1 = performance.now();
      console.log("mono callMethod took " + (t1 - t0) + " milliseconds.")

      if (Module.getValue(exceptionFlagManagedInt, 'i32') !== 0) {
        // If the exception flag is set, the returned value is exception.ToString()
        throw new Error(monoPlatform.toJavaScriptString(<System_String>res));
      }

      return res;
    } finally {
      Module.stackRestore(stack);
    }
  },

  toJavaScriptString: function toJavaScriptString(managedString: System_String) {
    // Comments from original Mono sample:
    //FIXME this is wastefull, we could remove the temp malloc by going the UTF16 route
    //FIXME this is unsafe, cuz raw objects could be GC'd.

    const utf8 = mono_string_get_utf8(managedString);
    const res = Module.UTF8ToString(utf8);
    Module._free(utf8 as any);
    return res;
  },

  toDotNetString: function toDotNetString(jsString: string): System_String {
    return mono_string(jsString);
  },

  toUint8Array: function toUint8Array(array: System_Array<any>): Uint8Array {
    const dataPtr = getArrayDataPointer(array);
    const length = Module.getValue(dataPtr, 'i32');
    return new Uint8Array(Module.HEAPU8.buffer, dataPtr + 4, length);
  },

  getArrayLength: function getArrayLength(array: System_Array<any>): number {
    return Module.getValue(getArrayDataPointer(array), 'i32');
  },

  getArrayEntryPtr: function getArrayEntryPtr<TPtr extends Pointer>(array: System_Array<TPtr>, index: number, itemSize: number): TPtr {
    // First byte is array length, followed by entries
    const address = getArrayDataPointer(array) + 4 + index * itemSize;
    return address as any as TPtr;
  },

  getObjectFieldsBaseAddress: function getObjectFieldsBaseAddress(referenceTypedObject: System_Object): Pointer {
    // The first two int32 values are internal Mono data
    return (referenceTypedObject as any as number + 8) as any as Pointer;
  },

  readInt32Field: function readHeapInt32(baseAddress: Pointer, fieldOffset?: number): number {
    return Module.getValue((baseAddress as any as number) + (fieldOffset || 0), 'i32');
  },

  readFloatField: function readHeapFloat(baseAddress: Pointer, fieldOffset?: number): number {
    return Module.getValue((baseAddress as any as number) + (fieldOffset || 0), 'float');
  },

	readInt16Field: function readHeapInt16(baseAddress: Pointer, fieldOffset?: number): number {
		return Module.getValue((baseAddress as any as number) + (fieldOffset || 0), 'i16');
	},

  readObjectField: function readHeapObject<T extends System_Object>(baseAddress: Pointer, fieldOffset?: number): T {
    return Module.getValue((baseAddress as any as number) + (fieldOffset || 0), 'i32') as any as T;
  },

  readStringField: function readHeapObject(baseAddress: Pointer, fieldOffset?: number): string | null {
    const fieldValue = Module.getValue((baseAddress as any as number) + (fieldOffset || 0), 'i32');
    return fieldValue === 0 ? null : monoPlatform.toJavaScriptString(fieldValue as any as System_String);
  },

  readStructField: function readStructField<T extends Pointer>(baseAddress: Pointer, fieldOffset?: number): T {
    return ((baseAddress as any as number) + (fieldOffset || 0)) as any as T;
  },
};

function findAssembly(assemblyName: string): number {
  let assemblyHandle = assemblyHandleCache[assemblyName];
  if (!assemblyHandle) {
    assemblyHandle = assembly_load(assemblyName);
    if (!assemblyHandle) {
      throw new Error(`Could not find assembly "${assemblyName}"`);
    }
    assemblyHandleCache[assemblyName] = assemblyHandle;
  }
  return assemblyHandle;
}

function findType(assemblyName: string, namespace: string, className: string): number {
  const fullyQualifiedTypeName = `[${assemblyName}]${namespace}.${className}`;
  let typeHandle = typeHandleCache[fullyQualifiedTypeName];
  if (!typeHandle) {
    typeHandle = find_class(findAssembly(assemblyName), namespace, className);
    if (!typeHandle) {
      throw new Error(`Could not find type "${className}" in namespace "${namespace}" in assembly "${assemblyName}"`);
    }
    typeHandleCache[fullyQualifiedTypeName] = typeHandle;
  }
  return typeHandle;
}

function findMethod(assemblyName: string, namespace: string, className: string, methodName: string): MethodHandle {
  const fullyQualifiedMethodName = `[${assemblyName}]${namespace}.${className}::${methodName}`;
  let methodHandle = methodHandleCache[fullyQualifiedMethodName];
  if (!methodHandle) {
    methodHandle = find_method(findType(assemblyName, namespace, className), methodName, -1);
    if (!methodHandle) {
      throw new Error(`Could not find method "${methodName}" on type "${namespace}.${className}"`);
    }
    methodHandleCache[fullyQualifiedMethodName] = methodHandle;
  }
  return methodHandle;
}

function addScriptTagsToDocument() {
  // Load either the wasm or asm.js version of the Mono runtime
  const browserSupportsNativeWebAssembly = typeof WebAssembly !== 'undefined' && WebAssembly.validate;
  const monoRuntimeUrlBase = '_framework/' + (browserSupportsNativeWebAssembly ? 'wasm' : 'asmjs');
  const monoRuntimeScriptUrl = `${monoRuntimeUrlBase}/mono.js`;

  if (!browserSupportsNativeWebAssembly) {
    // In the asmjs case, the initial memory structure is in a separate file we need to download
    const meminitXHR = Module['memoryInitializerRequest'] = new XMLHttpRequest();
    meminitXHR.open('GET', `${monoRuntimeUrlBase}/mono.js.mem`);
    meminitXHR.responseType = 'arraybuffer';
    meminitXHR.send(null);
  }

  const scriptElem = document.createElement('script');
  scriptElem.src = monoRuntimeScriptUrl;
  scriptElem.defer = true;
  document.body.appendChild(scriptElem);
}

function createEmscriptenModuleInstance(loadAssemblyUrls: string[], onReady: () => void, onError: (reason?: any) => void) {
  const module = {} as typeof Module;
  const wasmBinaryFile = '_framework/wasm/mono.wasm';
  const asmjsCodeFile = '_framework/asmjs/mono.asm.js';
  const suppressMessages = ['DEBUGGING ENABLED'];

  module.print = line => (suppressMessages.indexOf(line) < 0 && console.log(`WASM: ${line}`));
  module.printErr = line => console.error(`WASM: ${line}`);
  module.preRun = [];
  module.postRun = [];
  module.preloadPlugins = [];

  module.locateFile = fileName => {
    switch (fileName) {
      case 'mono.wasm': return wasmBinaryFile;
      case 'mono.asm.js': return asmjsCodeFile;
      default: return fileName;
    }
  };

  module.preRun.push(() => {
    // By now, emscripten should be initialised enough that we can capture these methods for later use
    assembly_load = Module.cwrap('mono_wasm_assembly_load', 'number', ['string']);
    find_class = Module.cwrap('mono_wasm_assembly_find_class', 'number', ['number', 'string', 'string']);
    find_method = Module.cwrap('mono_wasm_assembly_find_method', 'number', ['number', 'string', 'number']);
    invoke_method = Module.cwrap('mono_wasm_invoke_method', 'number', ['number', 'number', 'number']);
    mono_string_get_utf8 = Module.cwrap('mono_wasm_string_get_utf8', 'number', ['number']);
    mono_string = Module.cwrap('mono_wasm_string_from_js', 'number', ['string']);

    Module.FS_createPath('/', appBinDirName, true, true);
    MONO.loaded_files = [];

    loadAssemblyUrls.forEach(url => {
      const filename = getFileNameFromUrl(url);
      const runDependencyId = `blazor:${filename}`;
      addRunDependency(runDependencyId);
      asyncLoad(url).then(
        data => {
          Module.FS_createDataFile(appBinDirName, filename, data, true, false, false);
          MONO.loaded_files.push(toAbsoluteUrl(url));
          removeRunDependency(runDependencyId);
        },
        errorInfo => {
          // If it's a 404 on a .pdb, we don't want to block the app from starting up.
          // We'll just skip that file and continue (though the 404 is logged in the console).
          // This happens if you build a Debug build but then run in Production environment.
          const isPdb404 = errorInfo instanceof XMLHttpRequest
            && errorInfo.status === 404
            && filename.match(/\.pdb$/);
          if (!isPdb404) {
            onError(errorInfo);
          }
          removeRunDependency(runDependencyId);
        }
      );
    });
  });

  module.postRun.push(() => {
    const load_runtime = Module.cwrap('mono_wasm_load_runtime', null, ['string', 'number']);
    load_runtime(appBinDirName, hasDebuggingEnabled() ? 1 : 0);
    MONO.mono_wasm_runtime_is_ready = true;
    attachInteropInvoker();
    onReady();
  });

  return module;
}

const anchorTagForAbsoluteUrlConversions = document.createElement('a');
function toAbsoluteUrl(possiblyRelativeUrl: string) {
  anchorTagForAbsoluteUrlConversions.href = possiblyRelativeUrl;
  return anchorTagForAbsoluteUrlConversions.href;
}

function asyncLoad(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest;
    xhr.open('GET', url, /* async: */ true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function xhr_onload() {
      if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
        var asm = new Uint8Array(xhr.response);
        resolve(asm);
      } else {
        reject(xhr);
      }
    };
    xhr.onerror = reject;
    xhr.send(null);
  });
}

function getArrayDataPointer<T>(array: System_Array<T>): number {
  return <number><any>array + 12; // First byte from here is length, then following bytes are entries
}

function attachInteropInvoker() {
  const dotNetDispatcherInvokeMethodHandle = findMethod('Microsoft.JSInterop', 'Microsoft.JSInterop', 'DotNetDispatcher', 'Invoke');
  const dotNetDispatcherBeginInvokeMethodHandle = findMethod('Microsoft.JSInterop', 'Microsoft.JSInterop', 'DotNetDispatcher', 'BeginInvoke');

  DotNet.attachDispatcher({
    beginInvokeDotNetFromJS: (callId, assemblyName, methodIdentifier, argsJson) => {
      monoPlatform.callMethod(dotNetDispatcherBeginInvokeMethodHandle, null, [
        callId ? monoPlatform.toDotNetString(callId.toString()) : null,
        monoPlatform.toDotNetString(assemblyName),
        monoPlatform.toDotNetString(methodIdentifier),
        monoPlatform.toDotNetString(argsJson)
      ]);
    },

    invokeDotNetFromJS: (assemblyName, methodIdentifier, argsJson) => {
      const resultJsonStringPtr = monoPlatform.callMethod(dotNetDispatcherInvokeMethodHandle, null, [
        monoPlatform.toDotNetString(assemblyName),
        monoPlatform.toDotNetString(methodIdentifier),
        monoPlatform.toDotNetString(argsJson)
      ]) as System_String;
      return resultJsonStringPtr
        ? JSON.parse(monoPlatform.toJavaScriptString(resultJsonStringPtr))
        : null;
    },
  });
}
