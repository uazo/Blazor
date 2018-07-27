var blazor =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Boot.WebAssembly.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../Microsoft.JSInterop/JavaScriptRuntime/src/Microsoft.JSInterop.ts":
/*!***************************************************************************!*\
  !*** ../Microsoft.JSInterop/JavaScriptRuntime/src/Microsoft.JSInterop.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// This is a single-file self-contained module to avoid the need for a Webpack build
var DotNet;
(function (DotNet) {
    window.DotNet = DotNet; // Ensure reachable from anywhere
    var jsonRevivers = [];
    var pendingAsyncCalls = {};
    var cachedJSFunctions = {};
    var nextAsyncCallId = 1; // Start at 1 because zero signals "no response needed"
    var dotNetDispatcher = null;
    /**
     * Sets the specified .NET call dispatcher as the current instance so that it will be used
     * for future invocations.
     *
     * @param dispatcher An object that can dispatch calls from JavaScript to a .NET runtime.
     */
    function attachDispatcher(dispatcher) {
        dotNetDispatcher = dispatcher;
    }
    DotNet.attachDispatcher = attachDispatcher;
    /**
     * Adds a JSON reviver callback that will be used when parsing arguments received from .NET.
     * @param reviver The reviver to add.
     */
    function attachReviver(reviver) {
        jsonRevivers.push(reviver);
    }
    DotNet.attachReviver = attachReviver;
    /**
     * Invokes the specified .NET public method synchronously. Not all hosting scenarios support
     * synchronous invocation, so if possible use invokeMethodAsync instead.
     *
     * @param assemblyName The short name (without key/version or .dll extension) of the .NET assembly containing the method.
     * @param methodIdentifier The identifier of the method to invoke. The method must have a [JSInvokable] attribute specifying this identifier.
     * @param args Arguments to pass to the method, each of which must be JSON-serializable.
     * @returns The result of the operation.
     */
    function invokeMethod(assemblyName, methodIdentifier) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return invokePossibleInstanceMethod(assemblyName, methodIdentifier, null, args);
    }
    DotNet.invokeMethod = invokeMethod;
    /**
     * Invokes the specified .NET public method asynchronously.
     *
     * @param assemblyName The short name (without key/version or .dll extension) of the .NET assembly containing the method.
     * @param methodIdentifier The identifier of the method to invoke. The method must have a [JSInvokable] attribute specifying this identifier.
     * @param args Arguments to pass to the method, each of which must be JSON-serializable.
     * @returns A promise representing the result of the operation.
     */
    function invokeMethodAsync(assemblyName, methodIdentifier) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return invokePossibleInstanceMethodAsync(assemblyName, methodIdentifier, null, args);
    }
    DotNet.invokeMethodAsync = invokeMethodAsync;
    function invokePossibleInstanceMethod(assemblyName, methodIdentifier, dotNetObjectId, args) {
        var dispatcher = getRequiredDispatcher();
        if (dispatcher.invokeDotNetFromJS) {
            var argsJson = JSON.stringify(args, argReplacer);
            var resultJson = dispatcher.invokeDotNetFromJS(assemblyName, methodIdentifier, dotNetObjectId, argsJson);
            return resultJson ? parseJsonWithRevivers(resultJson) : null;
        }
        else {
            throw new Error('The current dispatcher does not support synchronous calls from JS to .NET. Use invokeMethodAsync instead.');
        }
    }
    function invokePossibleInstanceMethodAsync(assemblyName, methodIdentifier, dotNetObjectId, args) {
        var asyncCallId = nextAsyncCallId++;
        var resultPromise = new Promise(function (resolve, reject) {
            pendingAsyncCalls[asyncCallId] = { resolve: resolve, reject: reject };
        });
        try {
            var argsJson = JSON.stringify(args, argReplacer);
            getRequiredDispatcher().beginInvokeDotNetFromJS(asyncCallId, assemblyName, methodIdentifier, dotNetObjectId, argsJson);
        }
        catch (ex) {
            // Synchronous failure
            completePendingCall(asyncCallId, false, ex);
        }
        return resultPromise;
    }
    function getRequiredDispatcher() {
        if (dotNetDispatcher !== null) {
            return dotNetDispatcher;
        }
        throw new Error('No .NET call dispatcher has been set.');
    }
    function completePendingCall(asyncCallId, success, resultOrError) {
        if (!pendingAsyncCalls.hasOwnProperty(asyncCallId)) {
            throw new Error("There is no pending async call with ID " + asyncCallId + ".");
        }
        var asyncCall = pendingAsyncCalls[asyncCallId];
        delete pendingAsyncCalls[asyncCallId];
        if (success) {
            asyncCall.resolve(resultOrError);
        }
        else {
            asyncCall.reject(resultOrError);
        }
    }
    /**
     * Receives incoming calls from .NET and dispatches them to JavaScript.
     */
    DotNet.jsCallDispatcher = {
        /**
         * Finds the JavaScript function matching the specified identifier.
         *
         * @param identifier Identifies the globally-reachable function to be returned.
         * @returns A Function instance.
         */
        findJSFunction: findJSFunction,
        /**
         * Invokes the specified synchronous JavaScript function.
         *
         * @param identifier Identifies the globally-reachable function to invoke.
         * @param argsJson JSON representation of arguments to be passed to the function.
         * @returns JSON representation of the invocation result.
         */
        invokeJSFromDotNet: function (identifier, argsJson) {
            var result = findJSFunction(identifier).apply(null, parseJsonWithRevivers(argsJson));
            return result === null || result === undefined
                ? null
                : JSON.stringify(result, argReplacer);
        },
        /**
         * Invokes the specified synchronous or asynchronous JavaScript function.
         *
         * @param asyncHandle A value identifying the asynchronous operation. This value will be passed back in a later call to endInvokeJSFromDotNet.
         * @param identifier Identifies the globally-reachable function to invoke.
         * @param argsJson JSON representation of arguments to be passed to the function.
         */
        beginInvokeJSFromDotNet: function (asyncHandle, identifier, argsJson) {
            // Coerce synchronous functions into async ones, plus treat
            // synchronous exceptions the same as async ones
            var promise = new Promise(function (resolve) {
                var synchronousResultOrPromise = findJSFunction(identifier).apply(null, parseJsonWithRevivers(argsJson));
                resolve(synchronousResultOrPromise);
            });
            // We only listen for a result if the caller wants to be notified about it
            if (asyncHandle) {
                // On completion, dispatch result back to .NET
                // Not using "await" because it codegens a lot of boilerplate
                promise.then(function (result) { return getRequiredDispatcher().beginInvokeDotNetFromJS(0, 'Microsoft.JSInterop', 'DotNetDispatcher.EndInvoke', null, JSON.stringify([asyncHandle, true, result], argReplacer)); }, function (error) { return getRequiredDispatcher().beginInvokeDotNetFromJS(0, 'Microsoft.JSInterop', 'DotNetDispatcher.EndInvoke', null, JSON.stringify([asyncHandle, false, formatError(error)])); });
            }
        },
        /**
         * Receives notification that an async call from JS to .NET has completed.
         * @param asyncCallId The identifier supplied in an earlier call to beginInvokeDotNetFromJS.
         * @param success A flag to indicate whether the operation completed successfully.
         * @param resultOrExceptionMessage Either the operation result or an error message.
         */
        endInvokeDotNetFromJS: function (asyncCallId, success, resultOrExceptionMessage) {
            var resultOrError = success ? resultOrExceptionMessage : new Error(resultOrExceptionMessage);
            completePendingCall(parseInt(asyncCallId), success, resultOrError);
        }
    };
    function parseJsonWithRevivers(json) {
        return json ? JSON.parse(json, function (key, initialValue) {
            // Invoke each reviver in order, passing the output from the previous reviver,
            // so that each one gets a chance to transform the value
            return jsonRevivers.reduce(function (latestValue, reviver) { return reviver(key, latestValue); }, initialValue);
        }) : null;
    }
    function formatError(error) {
        if (error instanceof Error) {
            return error.message + "\n" + error.stack;
        }
        else {
            return error ? error.toString() : 'null';
        }
    }
    function findJSFunction(identifier) {
        if (cachedJSFunctions.hasOwnProperty(identifier)) {
            return cachedJSFunctions[identifier];
        }
        var result = window;
        var resultIdentifier = 'window';
        identifier.split('.').forEach(function (segment) {
            if (segment in result) {
                result = result[segment];
                resultIdentifier += '.' + segment;
            }
            else {
                throw new Error("Could not find '" + segment + "' in '" + resultIdentifier + "'.");
            }
        });
        if (result instanceof Function) {
            return result;
        }
        else {
            throw new Error("The value '" + resultIdentifier + "' is not a function.");
        }
    }
    var DotNetObject = /** @class */ (function () {
        function DotNetObject(_id) {
            this._id = _id;
        }
        DotNetObject.prototype.invokeMethod = function (methodIdentifier) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return invokePossibleInstanceMethod(null, methodIdentifier, this._id, args);
        };
        DotNetObject.prototype.invokeMethodAsync = function (methodIdentifier) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return invokePossibleInstanceMethodAsync(null, methodIdentifier, this._id, args);
        };
        DotNetObject.prototype.dispose = function () {
            var promise = invokeMethodAsync('Microsoft.JSInterop', 'DotNetDispatcher.ReleaseDotNetObject', this._id);
            promise.catch(function (error) { return console.error(error); });
        };
        DotNetObject.prototype.serializeAsArg = function () {
            return "__dotNetObject:" + this._id;
        };
        return DotNetObject;
    }());
    var dotNetObjectValueFormat = /^__dotNetObject\:(\d+)$/;
    attachReviver(function reviveDotNetObject(key, value) {
        if (typeof value === 'string') {
            var match = value.match(dotNetObjectValueFormat);
            if (match) {
                return new DotNetObject(parseInt(match[1]));
            }
        }
        // Unrecognized - let another reviver handle it
        return value;
    });
    function argReplacer(key, value) {
        return value instanceof DotNetObject ? value.serializeAsArg() : value;
    }
})(DotNet || (DotNet = {}));


/***/ }),

/***/ "./src/Boot.WebAssembly.ts":
/*!*********************************!*\
  !*** ./src/Boot.WebAssembly.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../../Microsoft.JSInterop/JavaScriptRuntime/src/Microsoft.JSInterop */ "../Microsoft.JSInterop/JavaScriptRuntime/src/Microsoft.JSInterop.ts");
__webpack_require__(/*! ./GlobalExports */ "./src/GlobalExports.ts");
var Environment = __webpack_require__(/*! ./Environment */ "./src/Environment.ts");
var MonoPlatform_1 = __webpack_require__(/*! ./Platform/Mono/MonoPlatform */ "./src/Platform/Mono/MonoPlatform.ts");
var Url_1 = __webpack_require__(/*! ./Platform/Url */ "./src/Platform/Url.ts");
var Renderer_1 = __webpack_require__(/*! ./Rendering/Renderer */ "./src/Rendering/Renderer.ts");
var SharedMemoryRenderBatch_1 = __webpack_require__(/*! ./Rendering/RenderBatch/SharedMemoryRenderBatch */ "./src/Rendering/RenderBatch/SharedMemoryRenderBatch.ts");
var BootCommon_1 = __webpack_require__(/*! ./BootCommon */ "./src/BootCommon.ts");
function boot() {
    return __awaiter(this, void 0, void 0, function () {
        var platform, bootConfig, embeddedResourcesPromise, loadAssemblyUrls, ex_1, evt, mainAssemblyName, evt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    platform = Environment.setPlatform(MonoPlatform_1.monoPlatform);
                    window['Blazor'].platform = platform;
                    window['Blazor']._internal.renderBatch = function (browserRendererId, batchAddress) {
                        Renderer_1.renderBatch(browserRendererId, new SharedMemoryRenderBatch_1.SharedMemoryRenderBatch(batchAddress));
                    };
                    return [4 /*yield*/, BootCommon_1.fetchBootConfigAsync()];
                case 1:
                    bootConfig = _a.sent();
                    embeddedResourcesPromise = BootCommon_1.loadEmbeddedResourcesAsync(bootConfig);
                    if (!bootConfig.linkerEnabled) {
                        console.info('Blazor is running in dev mode without IL stripping. To make the bundle size significantly smaller, publish the application or see https://go.microsoft.com/fwlink/?linkid=870414');
                    }
                    loadAssemblyUrls = [bootConfig.main]
                        .concat(bootConfig.assemblyReferences)
                        .map(function (filename) { return "_framework/_bin/" + filename; });
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, platform.start(loadAssemblyUrls)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    ex_1 = _a.sent();
                    throw new Error("Failed to start platform. Reason: " + ex_1);
                case 5: 
                // Before we start running .NET code, be sure embedded content resources are all loaded
                return [4 /*yield*/, embeddedResourcesPromise];
                case 6:
                    // Before we start running .NET code, be sure embedded content resources are all loaded
                    _a.sent();
                    // Trigger BlazorOnLoad event
                    if (window) {
                        evt = new Event('BlazorOnLoad');
                        window.dispatchEvent(evt);
                    }
                    mainAssemblyName = Url_1.getAssemblyNameFromUrl(bootConfig.main);
                    platform.callEntryPoint(mainAssemblyName, bootConfig.entryPoint, []);
                    // Trigger BlazorOnStart event
                    if (window) {
                        evt = new Event('BlazorOnStart');
                        window.dispatchEvent(evt);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
boot();


/***/ }),

/***/ "./src/BootCommon.ts":
/*!***************************!*\
  !*** ./src/BootCommon.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function fetchBootConfigAsync() {
    return __awaiter(this, void 0, void 0, function () {
        var bootConfigResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('_framework/blazor.boot.json')];
                case 1:
                    bootConfigResponse = _a.sent();
                    return [2 /*return*/, bootConfigResponse.json()];
            }
        });
    });
}
exports.fetchBootConfigAsync = fetchBootConfigAsync;
function loadEmbeddedResourcesAsync(bootConfig) {
    var cssLoadingPromises = bootConfig.cssReferences.map(function (cssReference) {
        var linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = cssReference;
        return loadResourceFromElement(linkElement);
    });
    var jsLoadingPromises = bootConfig.jsReferences.map(function (jsReference) {
        var scriptElement = document.createElement('script');
        scriptElement.src = jsReference;
        return loadResourceFromElement(scriptElement);
    });
    return Promise.all(cssLoadingPromises.concat(jsLoadingPromises));
}
exports.loadEmbeddedResourcesAsync = loadEmbeddedResourcesAsync;
function loadResourceFromElement(element) {
    return new Promise(function (resolve, reject) {
        element.onload = resolve;
        element.onerror = reject;
        document.head.appendChild(element);
    });
}


/***/ }),

/***/ "./src/Environment.ts":
/*!****************************!*\
  !*** ./src/Environment.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function setPlatform(platformInstance) {
    exports.platform = platformInstance;
    return exports.platform;
}
exports.setPlatform = setPlatform;


/***/ }),

/***/ "./src/GlobalExports.ts":
/*!******************************!*\
  !*** ./src/GlobalExports.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UriHelper_1 = __webpack_require__(/*! ./Services/UriHelper */ "./src/Services/UriHelper.ts");
var Http_1 = __webpack_require__(/*! ./Services/Http */ "./src/Services/Http.ts");
var Renderer_1 = __webpack_require__(/*! ./Rendering/Renderer */ "./src/Rendering/Renderer.ts");
var BlazorDOMComponent_1 = __webpack_require__(/*! ./Rendering/Elements/BlazorDOMComponent */ "./src/Rendering/Elements/BlazorDOMComponent.ts");
var BlazorDOMElement_1 = __webpack_require__(/*! ./Rendering/Elements/BlazorDOMElement */ "./src/Rendering/Elements/BlazorDOMElement.ts");
var RenderingFunction_1 = __webpack_require__(/*! ./Rendering/Elements/RenderingFunction */ "./src/Rendering/Elements/RenderingFunction.ts");
var BrowserRenderer_1 = __webpack_require__(/*! ./Rendering/BrowserRenderer */ "./src/Rendering/BrowserRenderer.ts");
var EventForDotNet_1 = __webpack_require__(/*! ./Rendering/EventForDotNet */ "./src/Rendering/EventForDotNet.ts");
// Make the following APIs available in global scope for invocation from JS
window['Blazor'] = {
    navigateTo: UriHelper_1.navigateTo,
    _internal: {
        attachRootComponentToElement: Renderer_1.attachRootComponentToElement,
        http: Http_1.internalFunctions,
        uriHelper: UriHelper_1.internalFunctions
    },
    raiseEvent: BrowserRenderer_1.raiseEvent,
    registerCustomTag: RenderingFunction_1.registerCustomTag,
    registerCustomDOMElement: RenderingFunction_1.registerCustomDOMElement,
    BlazorDOMElement: BlazorDOMElement_1.BlazorDOMElement,
    BlazorDOMComponent: BlazorDOMComponent_1.BlazorDOMComponent,
    EventForDotNet: EventForDotNet_1.EventForDotNet
};


/***/ }),

/***/ "./src/Platform/Mono/MonoDebugger.ts":
/*!*******************************************!*\
  !*** ./src/Platform/Mono/MonoDebugger.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Url_1 = __webpack_require__(/*! ../Url */ "./src/Platform/Url.ts");
var currentBrowserIsChrome = window.chrome
    && navigator.userAgent.indexOf('Edge') < 0; // Edge pretends to be Chrome
var hasReferencedPdbs = false;
function hasDebuggingEnabled() {
    return hasReferencedPdbs && currentBrowserIsChrome;
}
exports.hasDebuggingEnabled = hasDebuggingEnabled;
function attachDebuggerHotkey(loadAssemblyUrls) {
    hasReferencedPdbs = loadAssemblyUrls
        .some(function (url) { return /\.pdb$/.test(Url_1.getFileNameFromUrl(url)); });
    // Use the combination shift+alt+D because it isn't used by the major browsers
    // for anything else by default
    var altKeyName = navigator.platform.match(/^Mac/i) ? 'Cmd' : 'Alt';
    if (hasDebuggingEnabled()) {
        console.info("Debugging hotkey: Shift+" + altKeyName + "+D (when application has focus)");
    }
    // Even if debugging isn't enabled, we register the hotkey so we can report why it's not enabled
    document.addEventListener('keydown', function (evt) {
        if (evt.shiftKey && (evt.metaKey || evt.altKey) && evt.code === 'KeyD') {
            if (!hasReferencedPdbs) {
                console.error('Cannot start debugging, because the application was not compiled with debugging enabled.');
            }
            else if (!currentBrowserIsChrome) {
                console.error('Currently, only Chrome is supported for debugging.');
            }
            else {
                launchDebugger();
            }
        }
    });
}
exports.attachDebuggerHotkey = attachDebuggerHotkey;
function launchDebugger() {
    // The noopener flag is essential, because otherwise Chrome tracks the association with the
    // parent tab, and then when the parent tab pauses in the debugger, the child tab does so
    // too (even if it's since navigated to a different page). This means that the debugger
    // itself freezes, and not just the page being debugged.
    //
    // We have to construct a link element and simulate a click on it, because the more obvious
    // window.open(..., 'noopener') always opens a new window instead of a new tab.
    var link = document.createElement('a');
    link.href = "_framework/debug?url=" + encodeURIComponent(location.href);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
}


/***/ }),

/***/ "./src/Platform/Mono/MonoPlatform.ts":
/*!*******************************************!*\
  !*** ./src/Platform/Mono/MonoPlatform.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Url_1 = __webpack_require__(/*! ../Url */ "./src/Platform/Url.ts");
var MonoDebugger_1 = __webpack_require__(/*! ./MonoDebugger */ "./src/Platform/Mono/MonoDebugger.ts");
var assemblyHandleCache = {};
var typeHandleCache = {};
var methodHandleCache = {};
var assembly_load;
var find_class;
var find_method;
var invoke_method;
var mono_string_get_utf8;
var mono_string;
var appBinDirName = 'appBinDir';
exports.monoPlatform = {
    start: function start(loadAssemblyUrls) {
        return new Promise(function (resolve, reject) {
            MonoDebugger_1.attachDebuggerHotkey(loadAssemblyUrls);
            // mono.js assumes the existence of this
            window['Browser'] = {
                init: function () { }
            };
            // Emscripten works by expecting the module config to be a global
            window['Module'] = createEmscriptenModuleInstance(loadAssemblyUrls, resolve, reject);
            addScriptTagsToDocument();
        });
    },
    findMethod: findMethod,
    callEntryPoint: function callEntryPoint(assemblyName, entrypointMethod, args) {
        // Parse the entrypointMethod, which is of the form MyApp.MyNamespace.MyTypeName::MyMethodName
        // Note that we don't support specifying a method overload, so it has to be unique
        var entrypointSegments = entrypointMethod.split('::');
        if (entrypointSegments.length != 2) {
            throw new Error('Malformed entry point method name; could not resolve class name and method name.');
        }
        var typeFullName = entrypointSegments[0];
        var methodName = entrypointSegments[1];
        var lastDot = typeFullName.lastIndexOf('.');
        var namespace = lastDot > -1 ? typeFullName.substring(0, lastDot) : '';
        var typeShortName = lastDot > -1 ? typeFullName.substring(lastDot + 1) : typeFullName;
        var entryPointMethodHandle = exports.monoPlatform.findMethod(assemblyName, namespace, typeShortName, methodName);
        exports.monoPlatform.callMethod(entryPointMethodHandle, null, args);
    },
    callMethod: function callMethod(method, target, args) {
        if (args.length > 4) {
            // Hopefully this restriction can be eased soon, but for now make it clear what's going on
            throw new Error("Currently, MonoPlatform supports passing a maximum of 4 arguments from JS to .NET. You tried to pass " + args.length + ".");
        }
        var stack = Module.stackSave();
        try {
            var argsBuffer = Module.stackAlloc(args.length);
            var exceptionFlagManagedInt = Module.stackAlloc(4);
            for (var i = 0; i < args.length; ++i) {
                Module.setValue(argsBuffer + i * 4, args[i], 'i32');
            }
            Module.setValue(exceptionFlagManagedInt, 0, 'i32');
            var t0 = performance.now();
            var res = invoke_method(method, target, argsBuffer, exceptionFlagManagedInt);
            var t1 = performance.now();
            console.log("mono callMethod took " + (t1 - t0) + " milliseconds.");
            if (Module.getValue(exceptionFlagManagedInt, 'i32') !== 0) {
                // If the exception flag is set, the returned value is exception.ToString()
                throw new Error(exports.monoPlatform.toJavaScriptString(res));
            }
            return res;
        }
        finally {
            Module.stackRestore(stack);
        }
    },
    toJavaScriptString: function toJavaScriptString(managedString) {
        // Comments from original Mono sample:
        //FIXME this is wastefull, we could remove the temp malloc by going the UTF16 route
        //FIXME this is unsafe, cuz raw objects could be GC'd.
        var utf8 = mono_string_get_utf8(managedString);
        var res = Module.UTF8ToString(utf8);
        Module._free(utf8);
        return res;
    },
    toDotNetString: function toDotNetString(jsString) {
        return mono_string(jsString);
    },
    toUint8Array: function toUint8Array(array) {
        var dataPtr = getArrayDataPointer(array);
        var length = Module.getValue(dataPtr, 'i32');
        return new Uint8Array(Module.HEAPU8.buffer, dataPtr + 4, length);
    },
    getArrayLength: function getArrayLength(array) {
        return Module.getValue(getArrayDataPointer(array), 'i32');
    },
    getArrayEntryPtr: function getArrayEntryPtr(array, index, itemSize) {
        // First byte is array length, followed by entries
        var address = getArrayDataPointer(array) + 4 + index * itemSize;
        return address;
    },
    getObjectFieldsBaseAddress: function getObjectFieldsBaseAddress(referenceTypedObject) {
        // The first two int32 values are internal Mono data
        return (referenceTypedObject + 8);
    },
    readInt32Field: function readHeapInt32(baseAddress, fieldOffset) {
        return Module.getValue(baseAddress + (fieldOffset || 0), 'i32');
    },
    readFloatField: function readHeapFloat(baseAddress, fieldOffset) {
        return Module.getValue(baseAddress + (fieldOffset || 0), 'float');
    },
    readInt16Field: function readHeapInt16(baseAddress, fieldOffset) {
        return Module.getValue(baseAddress + (fieldOffset || 0), 'i16');
    },
    readObjectField: function readHeapObject(baseAddress, fieldOffset) {
        return Module.getValue(baseAddress + (fieldOffset || 0), 'i32');
    },
    readStringField: function readHeapObject(baseAddress, fieldOffset) {
        var fieldValue = Module.getValue(baseAddress + (fieldOffset || 0), 'i32');
        return fieldValue === 0 ? null : exports.monoPlatform.toJavaScriptString(fieldValue);
    },
    readStructField: function readStructField(baseAddress, fieldOffset) {
        return (baseAddress + (fieldOffset || 0));
    },
};
function findAssembly(assemblyName) {
    var assemblyHandle = assemblyHandleCache[assemblyName];
    if (!assemblyHandle) {
        assemblyHandle = assembly_load(assemblyName);
        if (!assemblyHandle) {
            throw new Error("Could not find assembly \"" + assemblyName + "\"");
        }
        assemblyHandleCache[assemblyName] = assemblyHandle;
    }
    return assemblyHandle;
}
function findType(assemblyName, namespace, className) {
    var fullyQualifiedTypeName = "[" + assemblyName + "]" + namespace + "." + className;
    var typeHandle = typeHandleCache[fullyQualifiedTypeName];
    if (!typeHandle) {
        typeHandle = find_class(findAssembly(assemblyName), namespace, className);
        if (!typeHandle) {
            throw new Error("Could not find type \"" + className + "\" in namespace \"" + namespace + "\" in assembly \"" + assemblyName + "\"");
        }
        typeHandleCache[fullyQualifiedTypeName] = typeHandle;
    }
    return typeHandle;
}
function findMethod(assemblyName, namespace, className, methodName) {
    var fullyQualifiedMethodName = "[" + assemblyName + "]" + namespace + "." + className + "::" + methodName;
    var methodHandle = methodHandleCache[fullyQualifiedMethodName];
    if (!methodHandle) {
        methodHandle = find_method(findType(assemblyName, namespace, className), methodName, -1);
        if (!methodHandle) {
            throw new Error("Could not find method \"" + methodName + "\" on type \"" + namespace + "." + className + "\"");
        }
        methodHandleCache[fullyQualifiedMethodName] = methodHandle;
    }
    return methodHandle;
}
function addScriptTagsToDocument() {
    // Load either the wasm or asm.js version of the Mono runtime
    var browserSupportsNativeWebAssembly = typeof WebAssembly !== 'undefined' && WebAssembly.validate;
    var monoRuntimeUrlBase = '_framework/' + (browserSupportsNativeWebAssembly ? 'wasm' : 'asmjs');
    var monoRuntimeScriptUrl = monoRuntimeUrlBase + "/mono.js";
    if (!browserSupportsNativeWebAssembly) {
        // In the asmjs case, the initial memory structure is in a separate file we need to download
        var meminitXHR = Module['memoryInitializerRequest'] = new XMLHttpRequest();
        meminitXHR.open('GET', monoRuntimeUrlBase + "/mono.js.mem");
        meminitXHR.responseType = 'arraybuffer';
        meminitXHR.send(null);
    }
    var scriptElem = document.createElement('script');
    scriptElem.src = monoRuntimeScriptUrl;
    scriptElem.defer = true;
    document.body.appendChild(scriptElem);
}
function createEmscriptenModuleInstance(loadAssemblyUrls, onReady, onError) {
    var module = {};
    var wasmBinaryFile = '_framework/wasm/mono.wasm';
    var asmjsCodeFile = '_framework/asmjs/mono.asm.js';
    var suppressMessages = ['DEBUGGING ENABLED'];
    module.print = function (line) { return (suppressMessages.indexOf(line) < 0 && console.log("WASM: " + line)); };
    module.printErr = function (line) { return console.error("WASM: " + line); };
    module.preRun = [];
    module.postRun = [];
    module.preloadPlugins = [];
    module.locateFile = function (fileName) {
        switch (fileName) {
            case 'mono.wasm': return wasmBinaryFile;
            case 'mono.asm.js': return asmjsCodeFile;
            default: return fileName;
        }
    };
    module.preRun.push(function () {
        // By now, emscripten should be initialised enough that we can capture these methods for later use
        assembly_load = Module.cwrap('mono_wasm_assembly_load', 'number', ['string']);
        find_class = Module.cwrap('mono_wasm_assembly_find_class', 'number', ['number', 'string', 'string']);
        find_method = Module.cwrap('mono_wasm_assembly_find_method', 'number', ['number', 'string', 'number']);
        invoke_method = Module.cwrap('mono_wasm_invoke_method', 'number', ['number', 'number', 'number']);
        mono_string_get_utf8 = Module.cwrap('mono_wasm_string_get_utf8', 'number', ['number']);
        mono_string = Module.cwrap('mono_wasm_string_from_js', 'number', ['string']);
        Module.FS_createPath('/', appBinDirName, true, true);
        MONO.loaded_files = [];
        loadAssemblyUrls.forEach(function (url) {
            var filename = Url_1.getFileNameFromUrl(url);
            var runDependencyId = "blazor:" + filename;
            addRunDependency(runDependencyId);
            asyncLoad(url).then(function (data) {
                Module.FS_createDataFile(appBinDirName, filename, data, true, false, false);
                MONO.loaded_files.push(toAbsoluteUrl(url));
                removeRunDependency(runDependencyId);
            }, function (errorInfo) {
                // If it's a 404 on a .pdb, we don't want to block the app from starting up.
                // We'll just skip that file and continue (though the 404 is logged in the console).
                // This happens if you build a Debug build but then run in Production environment.
                var isPdb404 = errorInfo instanceof XMLHttpRequest
                    && errorInfo.status === 404
                    && filename.match(/\.pdb$/);
                if (!isPdb404) {
                    onError(errorInfo);
                }
                removeRunDependency(runDependencyId);
            });
        });
    });
    module.postRun.push(function () {
        var load_runtime = Module.cwrap('mono_wasm_load_runtime', null, ['string', 'number']);
        load_runtime(appBinDirName, MonoDebugger_1.hasDebuggingEnabled() ? 1 : 0);
        MONO.mono_wasm_runtime_is_ready = true;
        attachInteropInvoker();
        onReady();
    });
    return module;
}
var anchorTagForAbsoluteUrlConversions = document.createElement('a');
function toAbsoluteUrl(possiblyRelativeUrl) {
    anchorTagForAbsoluteUrlConversions.href = possiblyRelativeUrl;
    return anchorTagForAbsoluteUrlConversions.href;
}
function asyncLoad(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest;
        xhr.open('GET', url, /* async: */ true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
            if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                var asm = new Uint8Array(xhr.response);
                resolve(asm);
            }
            else {
                reject(xhr);
            }
        };
        xhr.onerror = reject;
        xhr.send(null);
    });
}
function getArrayDataPointer(array) {
    return array + 12; // First byte from here is length, then following bytes are entries
}
function attachInteropInvoker() {
    var dotNetDispatcherInvokeMethodHandle = findMethod('Mono.WebAssembly.Interop', 'Mono.WebAssembly.Interop', 'MonoWebAssemblyJSRuntime', 'InvokeDotNet');
    var dotNetDispatcherBeginInvokeMethodHandle = findMethod('Mono.WebAssembly.Interop', 'Mono.WebAssembly.Interop', 'MonoWebAssemblyJSRuntime', 'BeginInvokeDotNet');
    DotNet.attachDispatcher({
        beginInvokeDotNetFromJS: function (callId, assemblyName, methodIdentifier, dotNetObjectId, argsJson) {
            // As a current limitation, we can only pass 4 args. Fortunately we only need one of
            // 'assemblyName' or 'dotNetObjectId', so overload them in a single slot
            var assemblyNameOrDotNetObjectId = dotNetObjectId
                ? dotNetObjectId.toString()
                : assemblyName;
            exports.monoPlatform.callMethod(dotNetDispatcherBeginInvokeMethodHandle, null, [
                callId ? exports.monoPlatform.toDotNetString(callId.toString()) : null,
                exports.monoPlatform.toDotNetString(assemblyNameOrDotNetObjectId),
                exports.monoPlatform.toDotNetString(methodIdentifier),
                exports.monoPlatform.toDotNetString(argsJson)
            ]);
        },
        invokeDotNetFromJS: function (assemblyName, methodIdentifier, dotNetObjectId, argsJson) {
            var resultJsonStringPtr = exports.monoPlatform.callMethod(dotNetDispatcherInvokeMethodHandle, null, [
                assemblyName ? exports.monoPlatform.toDotNetString(assemblyName) : null,
                exports.monoPlatform.toDotNetString(methodIdentifier),
                dotNetObjectId ? exports.monoPlatform.toDotNetString(dotNetObjectId.toString()) : null,
                exports.monoPlatform.toDotNetString(argsJson)
            ]);
            return resultJsonStringPtr
                ? exports.monoPlatform.toJavaScriptString(resultJsonStringPtr)
                : null;
        },
    });
}


/***/ }),

/***/ "./src/Platform/Url.ts":
/*!*****************************!*\
  !*** ./src/Platform/Url.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getFileNameFromUrl(url) {
    // This could also be called "get last path segment from URL", but the primary
    // use case is to extract things that look like filenames
    var lastSegment = url.substring(url.lastIndexOf('/') + 1);
    var queryStringStartPos = lastSegment.indexOf('?');
    return queryStringStartPos < 0 ? lastSegment : lastSegment.substring(0, queryStringStartPos);
}
exports.getFileNameFromUrl = getFileNameFromUrl;
function getAssemblyNameFromUrl(url) {
    return getFileNameFromUrl(url).replace(/\.dll$/, '');
}
exports.getAssemblyNameFromUrl = getAssemblyNameFromUrl;


/***/ }),

/***/ "./src/Rendering/BrowserRenderer.ts":
/*!******************************************!*\
  !*** ./src/Rendering/BrowserRenderer.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var RenderBatch_1 = __webpack_require__(/*! ./RenderBatch/RenderBatch */ "./src/Rendering/RenderBatch/RenderBatch.ts");
var EventDelegator_1 = __webpack_require__(/*! ./EventDelegator */ "./src/Rendering/EventDelegator.ts");
var ElementReferenceCapture_1 = __webpack_require__(/*! ./ElementReferenceCapture */ "./src/Rendering/ElementReferenceCapture.ts");
var preventDefaultEvents = { submit: true };
var BlazorDOMElement_1 = __webpack_require__(/*! ./Elements/BlazorDOMElement */ "./src/Rendering/Elements/BlazorDOMElement.ts");
var ElementCreators_1 = __webpack_require__(/*! ./Elements/ElementCreators */ "./src/Rendering/Elements/ElementCreators.ts");
var raiseEventMethod;
var renderComponentMethod;
var BrowserRenderer = /** @class */ (function () {
    function BrowserRenderer(rendererId) {
        var _this = this;
        this.childComponentLocations = {};
        this.renderNo = 0;
        this._queueEvent = [];
        this.browserRendererId = rendererId;
        this.eventDelegator = new EventDelegator_1.EventDelegator(function (event, componentId, eventHandlerId, eventArgs) {
            raiseEvent(event, _this.browserRendererId, componentId, eventHandlerId, eventArgs);
        });
    }
    BrowserRenderer.prototype.beginRender = function () {
        this.renderNo++;
        console.log("renderBatch " + this.renderNo);
    };
    BrowserRenderer.prototype.endRender = function () {
        this.renderNo--;
        this.sendQueueEvents();
        console.log("renderBatch " + (this.renderNo + 1) + " finished");
    };
    BrowserRenderer.prototype.attachRootComponentToElement = function (componentId, element) {
        this.attachComponentToElement(componentId, element);
    };
    BrowserRenderer.prototype.attachComponentToElement = function (componentId, element) {
        var blazorElement = new BlazorDOMElement_1.BlazorDOMElement(this, element);
        this.attachBlazorComponentToElement(componentId, blazorElement);
    };
    BrowserRenderer.prototype.updateComponent = function (batch, componentId, edits, referenceFrames) {
        var element = this.childComponentLocations[componentId];
        if (!element) {
            throw new Error("No element is currently associated with component " + componentId);
        }
        this.applyEdits(batch, componentId, element, 0, edits, referenceFrames);
    };
    BrowserRenderer.prototype.disposeComponent = function (componentId) {
        this.childComponentLocations[componentId].dispose();
        delete this.childComponentLocations[componentId];
    };
    BrowserRenderer.prototype.attachBlazorComponentToElement = function (componentId, element) {
        this.childComponentLocations[componentId] = element;
    };
    BrowserRenderer.prototype.applyEdits = function (batch, componentId, parent, childIndex, edits, referenceFrames) {
        var t0 = performance.now();
        var currentDepth = 0;
        var childIndexAtCurrentDepth = childIndex;
        var arraySegmentReader = batch.arraySegmentReader;
        var editReader = batch.editReader;
        var frameReader = batch.frameReader;
        var editsValues = arraySegmentReader.values(edits);
        var editsOffset = arraySegmentReader.offset(edits);
        var editsLength = arraySegmentReader.count(edits);
        var maxEditIndexExcl = editsOffset + editsLength;
        parent.onDOMUpdating();
        var elementStack = new Array();
        elementStack.push(parent);
        var elementsNeedRendering = new Array();
        elementsNeedRendering.push(parent);
        var _loop_1 = function (editIndex) {
            var edit = batch.diffReader.editsEntry(editsValues, editIndex);
            var editType = editReader.editType(edit);
            switch (editType) {
                case RenderBatch_1.EditType.prependFrame: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    this_1.insertFrame(batch, componentId, parent, childIndexAtCurrentDepth + siblingIndex, referenceFrames, frame, frameIndex);
                    break;
                }
                case RenderBatch_1.EditType.removeFrame: {
                    var siblingIndex = editReader.siblingIndex(edit);
                    this_1.removeNodeFromDOM(parent, childIndexAtCurrentDepth + siblingIndex);
                    break;
                }
                case RenderBatch_1.EditType.setAttribute: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    var element = parent.getLogicalChild(childIndexAtCurrentDepth + siblingIndex);
                    if (element instanceof BlazorDOMElement_1.BlazorDOMElement == false) {
                        var be = ElementCreators_1.createBlazorDOMElement(this_1, element);
                        be.applyAttribute(batch, componentId, frame);
                        be.dispose();
                    }
                    else {
                        var blazorElement_1 = element;
                        blazorElement_1.applyAttribute(batch, componentId, frame);
                        if (elementsNeedRendering.findIndex(function (x) { return x == blazorElement_1; }) == -1)
                            elementsNeedRendering.push(blazorElement_1);
                    }
                    break;
                }
                case RenderBatch_1.EditType.removeAttribute: {
                    // Note that we don't have to dispose the info we track about event handlers here, because the
                    // disposed event handler IDs are delivered separately (in the 'disposedEventHandlerIds' array)
                    var siblingIndex = editReader.siblingIndex(edit);
                    //const element = getLogicalChild(parent, childIndexAtCurrentDepth + siblingIndex);
                    //if (element instanceof HTMLElement) {
                    //	const attributeName = editReader.removedAttributeName(edit)!;
                    //	// First try to remove any special property we use for this attribute
                    //	if (!this.tryApplySpecialProperty(batch, element, attributeName, null)) {
                    //		// If that's not applicable, it's a regular DOM attribute so remove that
                    //		element.removeAttribute(attributeName);
                    //	}
                    //} else {
                    //	throw new Error(`Cannot remove attribute from non-element child`);
                    //}
                    //break;				
                    parent.removeAttribute(childIndexAtCurrentDepth + siblingIndex, editReader.removedAttributeName(edit));
                    break;
                }
                case RenderBatch_1.EditType.updateText: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    parent.updateText(childIndexAtCurrentDepth + siblingIndex, frameReader.textContent(frame));
                    break;
                }
                case RenderBatch_1.EditType.updateMarkup: {
                    var frameIndex = editReader.newTreeIndex(edit);
                    var frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
                    var siblingIndex = editReader.siblingIndex(edit);
                    parent.removeFromDom(childIndexAtCurrentDepth + siblingIndex);
                    this_1.insertMarkup(batch, parent, childIndexAtCurrentDepth + siblingIndex, frame);
                    break;
                }
                case RenderBatch_1.EditType.stepIn: {
                    var siblingIndex = editReader.siblingIndex(edit);
                    var stepInElement = parent.getLogicalChild(childIndexAtCurrentDepth + siblingIndex);
                    elementStack.push(parent);
                    // if stepInElement is a simple DOM element, create a element
                    if (stepInElement instanceof BlazorDOMElement_1.BlazorDOMElement == false) {
                        parent = ElementCreators_1.createBlazorDOMElement(this_1, stepInElement);
                    }
                    else {
                        parent = stepInElement;
                    }
                    parent.onDOMUpdating();
                    currentDepth++;
                    childIndexAtCurrentDepth = 0;
                    break;
                }
                case RenderBatch_1.EditType.stepOut: {
                    elementsNeedRendering.push(parent);
                    parent = elementStack.pop();
                    currentDepth--;
                    childIndexAtCurrentDepth = currentDepth === 0 ? childIndex : 0; // The childIndex is only ever nonzero at zero depth
                    break;
                }
                default: {
                    var unknownType = editType; // Compile-time verification that the switch was exhaustive
                    throw new Error("Unknown edit type: " + unknownType);
                }
            }
        };
        var this_1 = this;
        for (var editIndex = editsOffset; editIndex < maxEditIndexExcl; editIndex++) {
            _loop_1(editIndex);
        }
        var needRendering = elementsNeedRendering.pop();
        while (needRendering) {
            needRendering.onDOMUpdated();
            needRendering = elementsNeedRendering.pop();
        }
        var t1 = performance.now();
        var name = "";
        if (parent.constructor)
            name = parent.constructor.name;
        console.log("updateComponent " + componentId + "(" + name + ") took " + (t1 - t0) + " mills for " + editsLength);
    };
    BrowserRenderer.prototype.insertFrame = function (batch, componentId, parent, childIndex, frames, frame, frameIndex) {
        var frameReader = batch.frameReader;
        var frameType = frameReader.frameType(frame);
        switch (frameType) {
            case RenderBatch_1.FrameType.element:
                this.insertElement(batch, componentId, parent, childIndex, frames, frame, frameIndex);
                return 1;
            case RenderBatch_1.FrameType.text:
                this.insertText(batch, parent, childIndex, frame);
                return 1;
            case RenderBatch_1.FrameType.attribute:
                throw new Error('Attribute frames should only be present as leading children of element frames.');
            case RenderBatch_1.FrameType.component:
                this.insertComponent(batch, parent, childIndex, frame, frames, frameIndex);
                return 1;
            case RenderBatch_1.FrameType.region:
                return this.insertFrameRange(batch, componentId, parent, childIndex, frames, frameIndex + 1, frameIndex + frameReader.subtreeLength(frame));
            case RenderBatch_1.FrameType.elementReferenceCapture:
                {
                    var parentElement = parent.getClosestDomElement();
                    if (parentElement instanceof Element) {
                        ElementReferenceCapture_1.applyCaptureIdToElement(parentElement, frameReader.elementReferenceCaptureId(frame));
                        return 0; // A "capture" is a child in the diff, but has no node in the DOM
                    }
                    else {
                        throw new Error('Reference capture frames can only be children of element frames.');
                    }
                }
            case RenderBatch_1.FrameType.markup:
                this.insertMarkup(batch, parent, childIndex, frame);
                return 1;
            default:
                var unknownType = frameType; // Compile-time verification that the switch was exhaustive
                throw new Error("Unknown frame type: " + unknownType);
        }
    };
    BrowserRenderer.prototype.insertElement = function (batch, componentId, parent, childIndex, frames, frame, frameIndex) {
        var frameReader = batch.frameReader;
        var tagName = frameReader.elementName(frame);
        var newDomElement = parent.createElement(tagName, childIndex);
        if (newDomElement !== null && newDomElement !== undefined) {
            parent.insertNodeIntoDOM(newDomElement, childIndex);
            var blazorElement = ElementCreators_1.createBlazorDOMElement(this, newDomElement);
            // Apply attributes
            var descendantsEndIndexExcl = frameIndex + frameReader.subtreeLength(frame);
            for (var descendantIndex = frameIndex + 1; descendantIndex < descendantsEndIndexExcl; descendantIndex++) {
                var descendantFrame = batch.referenceFramesEntry(frames, descendantIndex);
                if (frameReader.frameType(descendantFrame) === RenderBatch_1.FrameType.attribute) {
                    blazorElement.applyAttribute(batch, componentId, descendantFrame);
                }
                else {
                    // As soon as we see a non-attribute child, all the subsequent child frames are
                    // not attributes, so bail out and insert the remnants recursively
                    this.insertFrameRange(batch, componentId, blazorElement, 0, frames, descendantIndex, descendantsEndIndexExcl);
                    break;
                }
            }
            blazorElement.onDOMUpdated();
            if (blazorElement.isComponent() == false)
                blazorElement.dispose();
        }
    };
    BrowserRenderer.prototype.insertComponent = function (batch, parent, childIndex, frame, frames, frameIndex) {
        // All we have to do is associate the child component ID with its location. We don't actually
        // do any rendering here, because the diff for the child will appear later in the render batch.
        var frameReader = batch.frameReader;
        var childComponentId = frameReader.componentId(frame);
        var customComponentType = frameReader.customComponentType(frame);
        var blazorElement = ElementCreators_1.createBlazorDOMComponent(this, childComponentId, parent, childIndex, customComponentType);
        this.attachBlazorComponentToElement(childComponentId, blazorElement);
        if (customComponentType != 0) {
            // Apply attributes
            var descendantsEndIndexExcl = frameIndex + frameReader.subtreeLength(frame);
            for (var descendantIndex = frameIndex + 1; descendantIndex < descendantsEndIndexExcl; descendantIndex++) {
                var descendantFrame = batch.referenceFramesEntry(frames, descendantIndex);
                if (frameReader.frameType(descendantFrame) === RenderBatch_1.FrameType.attribute) {
                    blazorElement.applyAttribute(batch, childComponentId, descendantFrame);
                }
                else {
                    break;
                }
            }
        }
    };
    BrowserRenderer.prototype.insertText = function (batch, parent, childIndex, textFrame) {
        var textContent = batch.frameReader.textContent(textFrame);
        var newTextNode = document.createTextNode(textContent);
        parent.insertNodeIntoDOM(newTextNode, childIndex);
    };
    BrowserRenderer.prototype.insertFrameRange = function (batch, componentId, parent, childIndex, frames, startIndex, endIndexExcl) {
        var origChildIndex = childIndex;
        for (var index = startIndex; index < endIndexExcl; index++) {
            var frame = batch.referenceFramesEntry(frames, index);
            var numChildrenInserted = this.insertFrame(batch, componentId, parent, childIndex, frames, frame, index);
            childIndex += numChildrenInserted;
            // Skip over any descendants, since they are already dealt with recursively
            index += this.countDescendantFrames(batch, frame);
        }
        return (childIndex - origChildIndex); // Total number of children inserted
    };
    BrowserRenderer.prototype.insertMarkup = function (batch, parent, childIndex, markupFrame) {
        var markupContainer = ElementCreators_1.createBlazorMarkupComponent(this, -1, parent, childIndex);
        var markupContent = batch.frameReader.markupContent(markupFrame);
        var parsedMarkup = markupContainer.parseMarkup(markupContent, parent.isSvgElement());
        var logicalSiblingIndex = 0;
        while (parsedMarkup.firstChild) {
            markupContainer.insertNodeIntoDOM(parsedMarkup.firstChild, logicalSiblingIndex++);
        }
    };
    BrowserRenderer.prototype.removeNodeFromDOM = function (parent, childIndex) {
        parent.removeFromDom(childIndex);
    };
    BrowserRenderer.prototype.disposeEventHandler = function (eventHandlerId) {
        this.eventDelegator.removeListener(eventHandlerId);
    };
    BrowserRenderer.prototype.countDescendantFrames = function (batch, frame) {
        var frameReader = batch.frameReader;
        switch (frameReader.frameType(frame)) {
            // The following frame types have a subtree length. Other frames may use that memory slot
            // to mean something else, so we must not read it. We should consider having nominal subtypes
            // of RenderTreeFramePointer that prevent access to non-applicable fields.
            case RenderBatch_1.FrameType.component:
            case RenderBatch_1.FrameType.element:
            case RenderBatch_1.FrameType.region:
                return frameReader.subtreeLength(frame) - 1;
            default:
                return 0;
        }
    };
    BrowserRenderer.prototype.raiseEvent = function (event, componentId, eventHandlerId, eventArgs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.renderNo == 0) {
                    return [2 /*return*/, raiseEvent(event, this.browserRendererId, componentId, eventHandlerId, eventArgs)];
                }
                else {
                    this._queueEvent.push({
                        event: event,
                        componentId: componentId,
                        eventHandlerId: eventHandlerId,
                        eventArgs: eventArgs
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    BrowserRenderer.prototype.sendQueueEvents = function () {
        if (this._queueEvent.length == 0)
            return;
        var evt = this._queueEvent.pop();
        while (evt) {
            //raiseEvent(evt.event, this.browserRendererId, evt.componentId, evt.eventHandlerId, evt.eventArgs);
            var eventDescriptor = {
                browserRendererId: this.browserRendererId,
                componentId: evt.componentId,
                eventHandlerId: evt.eventHandlerId,
                eventArgsType: evt.eventArgs.type
            };
            console.log("sendQueueEvents start " + eventDescriptor.componentId);
            var t0 = performance.now();
            DotNet.invokeMethodAsync('Microsoft.AspNetCore.Blazor.Browser', 'DispatchEvent', eventDescriptor, JSON.stringify(evt.eventArgs.data));
            var t1 = performance.now();
            console.log("sendQueueEvents " + eventDescriptor.componentId + "-" + eventDescriptor.eventArgsType + " took " + (t1 - t0) + " milliseconds.");
            evt = this._queueEvent.pop();
        }
    };
    return BrowserRenderer;
}());
exports.BrowserRenderer = BrowserRenderer;
function raiseEvent(event, browserRendererId, componentId, eventHandlerId, eventArgs) {
    if (event !== null && event.preventDefault !== undefined)
        event.preventDefault();
    if (event !== null && preventDefaultEvents[event.type]) {
        event.preventDefault();
    }
    var eventDescriptor = {
        browserRendererId: browserRendererId,
        componentId: componentId,
        eventHandlerId: eventHandlerId,
        eventArgsType: eventArgs.type
    };
    console.log("BrowserRendererEventDispatcher start " + eventDescriptor.componentId);
    var t0 = performance.now();
    window.setTimeout(function () {
        var rt = DotNet.invokeMethodAsync('Microsoft.AspNetCore.Blazor.Browser', 'DispatchEvent', eventDescriptor, JSON.stringify(eventArgs.data));
    }, 1);
    var t1 = performance.now();
    console.log("BrowserRendererEventDispatcher " + eventDescriptor.componentId + "-" + eventDescriptor.eventArgsType + " took " + (t1 - t0) + " milliseconds.");
}
exports.raiseEvent = raiseEvent;


/***/ }),

/***/ "./src/Rendering/ElementReferenceCapture.ts":
/*!**************************************************!*\
  !*** ./src/Rendering/ElementReferenceCapture.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function applyCaptureIdToElement(element, referenceCaptureId) {
    element.setAttribute(getCaptureIdAttributeName(referenceCaptureId), '');
}
exports.applyCaptureIdToElement = applyCaptureIdToElement;
function getElementByCaptureId(referenceCaptureId) {
    var selector = "[" + getCaptureIdAttributeName(referenceCaptureId) + "]";
    return document.querySelector(selector);
}
function getCaptureIdAttributeName(referenceCaptureId) {
    return "_bl_" + referenceCaptureId;
}
// Support receiving ElementRef instances as args in interop calls
var elementRefKey = '_blazorElementRef'; // Keep in sync with ElementRef.cs
DotNet.attachReviver(function (key, value) {
    if (value && typeof value === 'object' && value.hasOwnProperty(elementRefKey) && typeof value[elementRefKey] === 'string') {
        return getElementByCaptureId(value[elementRefKey]);
    }
    else {
        return value;
    }
});


/***/ }),

/***/ "./src/Rendering/Elements/BlazorDOMComponent.ts":
/*!******************************************************!*\
  !*** ./src/Rendering/Elements/BlazorDOMComponent.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BlazorDOMElement_1 = __webpack_require__(/*! ./BlazorDOMElement */ "./src/Rendering/Elements/BlazorDOMElement.ts");
var BlazorDOMComponent = /** @class */ (function (_super) {
    __extends(BlazorDOMComponent, _super);
    function BlazorDOMComponent(CID, parent, childIndex, br) {
        var _this = this;
        var markerStart = document.createComment('blazor-component-start.' + CID);
        var markerEnd = document.createComment('blazor-component-end.' + CID);
        parent.insertNodeIntoDOM(markerEnd, childIndex);
        parent.insertNodeIntoDOM(markerStart, childIndex);
        _this = _super.call(this, br, markerStart, markerEnd) || this;
        _this.ComponentID = CID;
        parent.onChildAttached(_this);
        return _this;
    }
    BlazorDOMComponent.prototype.getClosestDomElement = function () {
        return this.getDOMElement().parentNode;
    };
    BlazorDOMComponent.prototype.isComponent = function () {
        return true;
    };
    BlazorDOMComponent.prototype.setAttribute = function (attributeName, attributeValue) {
        // Blazor DOM Component do not have HTML attributes
    };
    BlazorDOMComponent.prototype.raiseEvent = function (eventHandlerId, evt) {
        this.browserRenderer.raiseEvent(null, this.ComponentID, eventHandlerId, evt);
    };
    return BlazorDOMComponent;
}(BlazorDOMElement_1.BlazorDOMElement));
exports.BlazorDOMComponent = BlazorDOMComponent;


/***/ }),

/***/ "./src/Rendering/Elements/BlazorDOMElement.ts":
/*!****************************************************!*\
  !*** ./src/Rendering/Elements/BlazorDOMElement.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logicalBlazorDomElementPropname = createSymbolOrFallback('_blazorDomElement');
var logicalBlazorChildElementPropname = createSymbolOrFallback('_blazorDomChild');
var BlazorDOMElement = /** @class */ (function () {
    function BlazorDOMElement(browserRendeder, start, end) {
        if (end === void 0) { end = null; }
        this._elements = [];
        this.browserRenderer = browserRendeder;
        this.startContainer = start;
        this.endContainer = end;
        this.startContainer[logicalBlazorDomElementPropname] = this;
        this.startContainer[logicalBlazorChildElementPropname] = [];
    }
    BlazorDOMElement.prototype.isComponent = function () {
        return false;
    };
    BlazorDOMElement.prototype.getClosestDomElement = function () {
        return this.startContainer;
    };
    BlazorDOMElement.prototype.getDOMElement = function () {
        return this.startContainer;
    };
    BlazorDOMElement.prototype.getLogicalChild = function (childIndex) {
        var cachedChild = this.startContainer[logicalBlazorChildElementPropname][childIndex];
        if (cachedChild !== undefined)
            return cachedChild;
        var element = this.startContainer;
        if (this.isComponent() === false)
            element = element.firstChild;
        else
            element = element.nextSibling;
        if (element == null) {
            // no child
            return null;
        }
        else {
            var ci = childIndex;
            while (ci > 0) {
                // skip if is this.Range
                if (element !== this.startContainer) {
                    // is a component ?
                    var blazorDom_1 = this.getComponentFromNode(element);
                    if (blazorDom_1 != null) {
                        element = blazorDom_1.endContainer;
                    }
                }
                ci--;
                element = element.nextSibling;
                if (element == null)
                    return null;
            }
            var blazorDom = this.getComponentFromNode(element);
            if (blazorDom != null) {
                this.startContainer[logicalBlazorChildElementPropname][childIndex] = blazorDom;
                return blazorDom;
            }
            this.startContainer[logicalBlazorChildElementPropname][childIndex] = element;
            return element;
        }
    };
    BlazorDOMElement.prototype.getComponentFromNode = function (element) {
        var component = element[logicalBlazorDomElementPropname];
        if (component !== null && component !== undefined && component.isComponent() === true)
            return component;
        return null;
    };
    BlazorDOMElement.prototype.createElement = function (tagName, childIndex) {
        var parent = this.getClosestDomElement();
        var newDomElement = tagName === 'svg' || (parent != null && parent.namespaceURI === 'http://www.w3.org/2000/svg') ?
            document.createElementNS('http://www.w3.org/2000/svg', tagName) :
            document.createElement(tagName);
        return newDomElement;
    };
    BlazorDOMElement.prototype.insertNodeIntoDOM = function (node, childIndex) {
        var parentElement = this.getClosestDomElement();
        var realSibling = this.getLogicalChild(childIndex);
        if (realSibling === null) {
            if (this.isComponent() == false) {
                parentElement.appendChild(node);
            }
            else {
                parentElement.insertBefore(node, this.endContainer);
            }
        }
        else {
            realSibling.parentElement.insertBefore(node, realSibling);
            // better than parentElement.insertBefore(node, realSibling as Node);
        }
        this.startContainer[logicalBlazorChildElementPropname] = [];
    };
    BlazorDOMElement.prototype.removeFromDom = function (childIndex) {
        if (childIndex === void 0) { childIndex = null; }
        if (childIndex === null) {
            // Adjust range to whole component
            var range = document.createRange();
            range.setStartBefore(this.startContainer);
            range.setEndAfter(this.endContainer);
            // Clear whole range
            range.deleteContents();
            range.detach();
        }
        else {
            var element = this.getLogicalChild(childIndex);
            if (element instanceof BlazorDOMElement) {
                element.removeFromDom();
            }
            else {
                // Remove only the childindex-nth element
                element.parentElement.removeChild(element);
            }
        }
        this.startContainer[logicalBlazorChildElementPropname] = [];
    };
    BlazorDOMElement.prototype.updateText = function (childIndex, newText) {
        var domTextNode = this.getLogicalChild(childIndex);
        domTextNode.textContent = newText;
    };
    BlazorDOMElement.prototype.isSvgElement = function () {
        return this.getClosestDomElement().namespaceURI === 'http://www.w3.org/2000/svg';
    };
    BlazorDOMElement.prototype.applyAttribute = function (batch, componentId, attributeFrame) {
        var frameReader = batch.frameReader;
        var attributeName = frameReader.attributeName(attributeFrame);
        //const toDomElement = this.Range.startContainer as Element;
        //const browserRendererId = this.browserRenderer.browserRendererId;
        if (attributeName === "ChildContent")
            return;
        if (this.isDOMAttributeEvent(attributeName)) {
            var eventHandlerId = frameReader.attributeEventHandlerId(attributeFrame);
            if (this.applyEvent(attributeName, componentId, eventHandlerId) == true) {
                return;
            }
        }
        var attributeValue;
        if (frameReader.hasAttributeValueJson(attributeFrame)) {
            attributeValue = JSON.parse(frameReader.attributeValueJson(attributeFrame));
        }
        else {
            attributeValue = frameReader.attributeValue(attributeFrame);
        }
        if (this.isDOMAttribute(attributeName, attributeValue) == false) {
            return; // If this DOM element type has special 'value' handling, don't also write it as an attribute
        }
        // Treat as a regular string-valued attribute
        this.setAttribute(attributeName, attributeValue);
    };
    BlazorDOMElement.prototype.removeAttributeValue = function (attributeName) {
    };
    BlazorDOMElement.prototype.removeAttribute = function (childIndex, attributeName) {
        var element = this.getLogicalChild(childIndex);
        if (element instanceof BlazorDOMElement == false) {
            element.removeAttribute(attributeName);
        }
        else {
            var blazorElement = element;
            blazorElement.removeAttributeValue(attributeName);
        }
    };
    BlazorDOMElement.prototype.setAttribute = function (attributeName, attributeValue) {
        var toDomElement = this.startContainer;
        if (attributeValue == null) {
            toDomElement.removeAttribute(attributeName);
        }
        else {
            toDomElement.setAttribute(attributeName, attributeValue);
        }
    };
    BlazorDOMElement.prototype.isDOMAttribute = function (attributeName, value) {
        // default is true
        return true;
    };
    BlazorDOMElement.prototype.isDOMAttributeEvent = function (attributeName) {
        var firstTwoChars = attributeName.substring(0, 2);
        if (firstTwoChars === 'on')
            return true;
        return false;
    };
    BlazorDOMElement.prototype.applyEvent = function (attributeName, componentId, eventHandlerId) {
        var toDomElement = this.startContainer;
        //const browserRendererId = this.browserRenderer.browserRendererId;
        if (eventHandlerId) {
            var firstTwoChars = attributeName.substring(0, 2);
            var eventName = attributeName.substring(2);
            if (firstTwoChars !== 'on' || !eventName) {
                throw new Error("Attribute has nonzero event handler ID, but attribute name '" + attributeName + "' does not start with 'on'.");
            }
            this.browserRenderer.eventDelegator.setListener(toDomElement, eventName, componentId, eventHandlerId);
            return true;
        }
        return false;
    };
    BlazorDOMElement.prototype.onDOMUpdating = function () { };
    BlazorDOMElement.prototype.onDOMUpdated = function () { };
    BlazorDOMElement.prototype.onChildAttached = function (child) { };
    BlazorDOMElement.prototype.dispose = function () {
    };
    return BlazorDOMElement;
}());
exports.BlazorDOMElement = BlazorDOMElement;
function getBlazorDomElement(container) {
    if (container[logicalBlazorDomElementPropname] !== undefined)
        return container[logicalBlazorDomElementPropname];
    if (container instanceof BlazorDOMElement)
        return container;
    return null;
}
exports.getBlazorDomElement = getBlazorDomElement;
function createSymbolOrFallback(fallback) {
    return typeof Symbol === 'function' ? Symbol() : fallback;
}


/***/ }),

/***/ "./src/Rendering/Elements/BlazorINPUTElement.ts":
/*!******************************************************!*\
  !*** ./src/Rendering/Elements/BlazorINPUTElement.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BlazorDOMElement_1 = __webpack_require__(/*! ./BlazorDOMElement */ "./src/Rendering/Elements/BlazorDOMElement.ts");
var BlazorINPUTElement = /** @class */ (function (_super) {
    __extends(BlazorINPUTElement, _super);
    function BlazorINPUTElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSelectValue = null;
        return _this;
        //protected applyEvent(attributeName: string, componentId: number, eventHandlerId: number): boolean {
        //	const toDomElement = this.getDOMElement();
        //	const browserRendererId = this.browserRenderer.browserRendererId;
        //	// TODO: Instead of applying separate event listeners to each DOM element, use event delegation
        //	// and remove all the _blazor*Listener hacks
        //	switch (attributeName) {
        //		case 'onchange': {
        //			toDomElement.removeEventListener('change', toDomElement['_blazorChangeListener']);
        //			const targetIsCheckbox = this.isCheckbox(toDomElement);
        //			const listener = evt => {
        //				const newValue = targetIsCheckbox ? evt.target.checked : evt.target.value;
        //				raiseEvent(evt, browserRendererId, componentId, eventHandlerId, 'change', { Type: 'change', Value: newValue });
        //			};
        //			toDomElement['_blazorChangeListener'] = listener;
        //			toDomElement.addEventListener('change', listener);
        //			return true;
        //		}
        //		case 'onkeypress': {
        //			toDomElement.removeEventListener('keypress', toDomElement['_blazorKeypressListener']);
        //			const listener = evt => {
        //				// This does not account for special keys nor cross-browser differences. So far it's
        //				// just to establish that we can pass parameters when raising events.
        //				// We use C#-style PascalCase on the eventInfo to simplify deserialization, but this could
        //				// change if we introduced a richer JSON library on the .NET side.
        //				raiseEvent(evt, browserRendererId, componentId, eventHandlerId, 'keyboard', { Type: evt.type, Key: (evt as any).key });
        //			};
        //			toDomElement['_blazorKeypressListener'] = listener;
        //			toDomElement.addEventListener('keypress', listener);
        //			return true;
        //		}
        //	}
        //	return super.applyEvent(attributeName, componentId, eventHandlerId);
        //}
    }
    BlazorINPUTElement.prototype.isDOMAttribute = function (attributeName, value) {
        var element = this.getDOMElement();
        if (attributeName == "value") {
            // Certain elements have built-in behaviour for their 'value' property
            switch (element.tagName) {
                case 'INPUT':
                case 'SELECT':
                case 'TEXTAREA':
                    if (this.isCheckbox(element)) {
                        element.checked = value === 'True';
                    }
                    else {
                        this.handleSelectValue = value;
                        element.value = value;
                    }
                    return false;
                default:
                    return _super.prototype.isDOMAttribute.call(this, attributeName, value);
            }
        }
        else
            return true;
    };
    BlazorINPUTElement.prototype.onDOMUpdating = function () {
        this.handleSelectValue = null;
    };
    BlazorINPUTElement.prototype.onDOMUpdated = function () {
        if (this.handleSelectValue !== null) {
            var element = this.getDOMElement();
            if (element.tagName == "SELECT") {
                element.value = this.handleSelectValue;
                this.handleSelectValue = null;
            }
        }
    };
    BlazorINPUTElement.prototype.isCheckbox = function (element) {
        return element.tagName === 'INPUT' && element.getAttribute('type') === 'checkbox';
    };
    return BlazorINPUTElement;
}(BlazorDOMElement_1.BlazorDOMElement));
exports.BlazorINPUTElement = BlazorINPUTElement;


/***/ }),

/***/ "./src/Rendering/Elements/BlazorMarkupElement.ts":
/*!*******************************************************!*\
  !*** ./src/Rendering/Elements/BlazorMarkupElement.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BlazorDOMComponent_1 = __webpack_require__(/*! ./BlazorDOMComponent */ "./src/Rendering/Elements/BlazorDOMComponent.ts");
var sharedTemplateElemForParsing = document.createElement('template');
var sharedSvgElemForParsing = document.createElementNS('http://www.w3.org/2000/svg', 'g');
var BlazorMarkupElement = /** @class */ (function (_super) {
    __extends(BlazorMarkupElement, _super);
    function BlazorMarkupElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlazorMarkupElement.prototype.parseMarkup = function (markup, isSvg) {
        if (isSvg) {
            sharedSvgElemForParsing.innerHTML = markup || ' ';
            return sharedSvgElemForParsing;
        }
        else {
            sharedTemplateElemForParsing.innerHTML = markup || ' ';
            return sharedTemplateElemForParsing.content;
        }
    };
    return BlazorMarkupElement;
}(BlazorDOMComponent_1.BlazorDOMComponent));
exports.BlazorMarkupElement = BlazorMarkupElement;


/***/ }),

/***/ "./src/Rendering/Elements/ElementCreators.ts":
/*!***************************************************!*\
  !*** ./src/Rendering/Elements/ElementCreators.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BlazorDOMElement_1 = __webpack_require__(/*! ./BlazorDOMElement */ "./src/Rendering/Elements/BlazorDOMElement.ts");
var BlazorDOMComponent_1 = __webpack_require__(/*! ./BlazorDOMComponent */ "./src/Rendering/Elements/BlazorDOMComponent.ts");
var BlazorINPUTElement_1 = __webpack_require__(/*! ./BlazorINPUTElement */ "./src/Rendering/Elements/BlazorINPUTElement.ts");
var BlazorMarkupElement_1 = __webpack_require__(/*! ./BlazorMarkupElement */ "./src/Rendering/Elements/BlazorMarkupElement.ts");
var RenderingFunction_1 = __webpack_require__(/*! ./RenderingFunction */ "./src/Rendering/Elements/RenderingFunction.ts");
function createBlazorDOMElement(br, stepInElement) {
    var element = BlazorDOMElement_1.getBlazorDomElement(stepInElement);
    if (element !== null)
        return element;
    if (stepInElement.tagName == "INPUT" || stepInElement.tagName == "SELECT" || stepInElement.tagName == "TEXTAREA")
        return new BlazorINPUTElement_1.BlazorINPUTElement(br, stepInElement);
    else {
        var customDOM = RenderingFunction_1.getRegisteredCustomTag(stepInElement.tagName);
        if (customDOM !== null) {
            return customDOM(br, stepInElement);
        }
        else {
            return new BlazorDOMElement_1.BlazorDOMElement(br, stepInElement);
        }
    }
}
exports.createBlazorDOMElement = createBlazorDOMElement;
function createBlazorMarkupComponent(br, componentId, parent, childIndex) {
    return new BlazorMarkupElement_1.BlazorMarkupElement(componentId, parent, childIndex, br);
}
exports.createBlazorMarkupComponent = createBlazorMarkupComponent;
function createBlazorDOMComponent(br, componentId, parent, childIndex, customComponentType) {
    var blazorElement = null;
    if (customComponentType !== 0) {
        var customElement = RenderingFunction_1.getRegisteredCustomDOMElement(customComponentType);
        blazorElement = customElement(componentId, parent, childIndex, br);
    }
    else {
        blazorElement = new BlazorDOMComponent_1.BlazorDOMComponent(componentId, parent, childIndex, br);
    }
    return blazorElement;
}
exports.createBlazorDOMComponent = createBlazorDOMComponent;


/***/ }),

/***/ "./src/Rendering/Elements/RenderingFunction.ts":
/*!*****************************************************!*\
  !*** ./src/Rendering/Elements/RenderingFunction.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var registeredCustomTags = {};
function registerCustomTag(identifier, implementation) {
    registeredCustomTags[identifier] = implementation;
}
exports.registerCustomTag = registerCustomTag;
function getRegisteredCustomTag(identifier) {
    var result = registeredCustomTags[identifier];
    if (result) {
        return result;
    }
    else {
        return null;
    }
}
exports.getRegisteredCustomTag = getRegisteredCustomTag;
var registeredCustomElement = {};
function registerCustomDOMElement(identifier, implementation) {
    registeredCustomElement[identifier] = implementation;
}
exports.registerCustomDOMElement = registerCustomDOMElement;
function getRegisteredCustomDOMElement(identifier) {
    var result = registeredCustomElement[identifier];
    if (result) {
        return result;
    }
    else {
        return null;
    }
}
exports.getRegisteredCustomDOMElement = getRegisteredCustomDOMElement;


/***/ }),

/***/ "./src/Rendering/EventDelegator.ts":
/*!*****************************************!*\
  !*** ./src/Rendering/EventDelegator.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventForDotNet_1 = __webpack_require__(/*! ./EventForDotNet */ "./src/Rendering/EventForDotNet.ts");
var nonBubblingEvents = toLookup([
    'abort', 'blur', 'change', 'error', 'focus', 'load', 'loadend', 'loadstart', 'mouseenter', 'mouseleave',
    'progress', 'reset', 'scroll', 'submit', 'unload', 'DOMNodeInsertedIntoDocument', 'DOMNodeRemovedFromDocument'
]);
// Responsible for adding/removing the eventInfo on an expando property on DOM elements, and
// calling an EventInfoStore that deals with registering/unregistering the underlying delegated
// event listeners as required (and also maps actual events back to the given callback).
var EventDelegator = /** @class */ (function () {
    function EventDelegator(onEvent) {
        this.onEvent = onEvent;
        var eventDelegatorId = ++EventDelegator.nextEventDelegatorId;
        this.eventsCollectionKey = "_blazorEvents_" + eventDelegatorId;
        this.eventInfoStore = new EventInfoStore(this.onGlobalEvent.bind(this));
    }
    EventDelegator.prototype.setListener = function (element, eventName, componentId, eventHandlerId) {
        // Ensure we have a place to store event info for this element
        var infoForElement = element[this.eventsCollectionKey];
        if (!infoForElement) {
            infoForElement = element[this.eventsCollectionKey] = {};
        }
        if (infoForElement.hasOwnProperty(eventName)) {
            // We can cheaply update the info on the existing object and don't need any other housekeeping
            var oldInfo = infoForElement[eventName];
            this.eventInfoStore.update(oldInfo.eventHandlerId, eventHandlerId);
        }
        else {
            // Go through the whole flow which might involve registering a new global handler
            var newInfo = { element: element, eventName: eventName, componentId: componentId, eventHandlerId: eventHandlerId };
            this.eventInfoStore.add(newInfo);
            infoForElement[eventName] = newInfo;
        }
    };
    EventDelegator.prototype.removeListener = function (eventHandlerId) {
        // This method gets called whenever the .NET-side code reports that a certain event handler
        // has been disposed. However we will already have disposed the info about that handler if
        // the eventHandlerId for the (element,eventName) pair was replaced during diff application.
        var info = this.eventInfoStore.remove(eventHandlerId);
        if (info) {
            // Looks like this event handler wasn't already disposed
            // Remove the associated data from the DOM element
            var element = info.element;
            if (element.hasOwnProperty(this.eventsCollectionKey)) {
                var elementEventInfos = element[this.eventsCollectionKey];
                delete elementEventInfos[info.eventName];
                if (Object.getOwnPropertyNames(elementEventInfos).length === 0) {
                    delete element[this.eventsCollectionKey];
                }
            }
        }
    };
    EventDelegator.prototype.onGlobalEvent = function (evt) {
        if (!(evt.target instanceof Element)) {
            return;
        }
        // Scan up the element hierarchy, looking for any matching registered event handlers
        var candidateElement = evt.target;
        var eventArgs = null; // Populate lazily
        var eventIsNonBubbling = nonBubblingEvents.hasOwnProperty(evt.type);
        while (candidateElement) {
            if (candidateElement.hasOwnProperty(this.eventsCollectionKey)) {
                var handlerInfos = candidateElement[this.eventsCollectionKey];
                if (handlerInfos.hasOwnProperty(evt.type)) {
                    // We are going to raise an event for this element, so prepare info needed by the .NET code
                    if (!eventArgs) {
                        eventArgs = EventForDotNet_1.EventForDotNet.fromDOMEvent(evt);
                    }
                    var handlerInfo = handlerInfos[evt.type];
                    this.onEvent(evt, handlerInfo.componentId, handlerInfo.eventHandlerId, eventArgs);
                }
            }
            candidateElement = eventIsNonBubbling ? null : candidateElement.parentElement;
        }
    };
    EventDelegator.nextEventDelegatorId = 0;
    return EventDelegator;
}());
exports.EventDelegator = EventDelegator;
// Responsible for adding and removing the global listener when the number of listeners
// for a given event name changes between zero and nonzero
var EventInfoStore = /** @class */ (function () {
    function EventInfoStore(globalListener) {
        this.globalListener = globalListener;
        this.infosByEventHandlerId = {};
        this.countByEventName = {};
    }
    EventInfoStore.prototype.add = function (info) {
        if (this.infosByEventHandlerId[info.eventHandlerId]) {
            // Should never happen, but we want to know if it does
            throw new Error("Event " + info.eventHandlerId + " is already tracked");
        }
        this.infosByEventHandlerId[info.eventHandlerId] = info;
        var eventName = info.eventName;
        if (this.countByEventName.hasOwnProperty(eventName)) {
            this.countByEventName[eventName]++;
        }
        else {
            this.countByEventName[eventName] = 1;
            // To make delegation work with non-bubbling events, register a 'capture' listener.
            // We preserve the non-bubbling behavior by only dispatching such events to the targeted element.
            var useCapture = nonBubblingEvents.hasOwnProperty(eventName);
            document.addEventListener(eventName, this.globalListener, useCapture);
        }
    };
    EventInfoStore.prototype.update = function (oldEventHandlerId, newEventHandlerId) {
        if (this.infosByEventHandlerId.hasOwnProperty(newEventHandlerId)) {
            // Should never happen, but we want to know if it does
            throw new Error("Event " + newEventHandlerId + " is already tracked");
        }
        // Since we're just updating the event handler ID, there's no need to update the global counts
        var info = this.infosByEventHandlerId[oldEventHandlerId];
        delete this.infosByEventHandlerId[oldEventHandlerId];
        info.eventHandlerId = newEventHandlerId;
        this.infosByEventHandlerId[newEventHandlerId] = info;
    };
    EventInfoStore.prototype.remove = function (eventHandlerId) {
        var info = this.infosByEventHandlerId[eventHandlerId];
        if (info) {
            delete this.infosByEventHandlerId[eventHandlerId];
            var eventName = info.eventName;
            if (--this.countByEventName[eventName] === 0) {
                delete this.countByEventName[eventName];
                document.removeEventListener(eventName, this.globalListener);
            }
        }
        return info;
    };
    return EventInfoStore;
}());
function toLookup(items) {
    var result = {};
    items.forEach(function (value) { result[value] = true; });
    return result;
}


/***/ }),

/***/ "./src/Rendering/EventForDotNet.ts":
/*!*****************************************!*\
  !*** ./src/Rendering/EventForDotNet.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventForDotNet = /** @class */ (function () {
    function EventForDotNet(type, data) {
        this.type = type;
        this.data = data;
    }
    EventForDotNet.fromDOMEvent = function (event) {
        var element = event.target;
        switch (event.type) {
            case 'change': {
                var targetIsCheckbox = isCheckbox(element);
                var newValue = targetIsCheckbox ? !!element['checked'] : element['value'];
                return new EventForDotNet('change', { type: event.type, value: newValue });
            }
            case 'copy':
            case 'cut':
            case 'paste':
                return new EventForDotNet('clipboard', { type: event.type });
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
                return new EventForDotNet('drag', parseDragEvent(event));
            case 'focus':
            case 'blur':
            case 'focusin':
            case 'focusout':
                return new EventForDotNet('focus', { type: event.type });
            case 'keydown':
            case 'keyup':
            case 'keypress':
                return new EventForDotNet('keyboard', parseKeyboardEvent(event));
            case 'contextmenu':
            case 'click':
            case 'mouseover':
            case 'mouseout':
            case 'mousemove':
            case 'mousedown':
            case 'mouseup':
            case 'dblclick':
                return new EventForDotNet('mouse', parseMouseEvent(event));
            case 'error':
                return new EventForDotNet('error', parseErrorEvent(event));
            case 'loadstart':
            case 'timeout':
            case 'abort':
            case 'load':
            case 'loadend':
            case 'progress':
                return new EventForDotNet('progress', parseProgressEvent(event));
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchenter':
            case 'touchleave':
            case 'touchstart':
                return new EventForDotNet('touch', parseTouchEvent(event));
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointerenter':
            case 'pointerleave':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
                return new EventForDotNet('pointer', parsePointerEvent(event));
            case 'wheel':
            case 'mousewheel':
                return new EventForDotNet('wheel', parseWheelEvent(event));
            default:
                return new EventForDotNet('unknown', { type: event.type });
        }
    };
    return EventForDotNet;
}());
exports.EventForDotNet = EventForDotNet;
function parseDragEvent(event) {
    return {
        type: event.type,
        detail: event.detail,
        dataTransfer: event.dataTransfer,
        screenX: event.screenX,
        screenY: event.screenY,
        clientX: event.clientX,
        clientY: event.clientY,
        button: event.button,
        buttons: event.buttons,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey
    };
}
function parseWheelEvent(event) {
    return __assign({}, parseMouseEvent(event), { deltaX: event.deltaX, deltaY: event.deltaY, deltaZ: event.deltaZ, deltaMode: event.deltaMode });
}
function parseErrorEvent(event) {
    return {
        type: event.type,
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    };
}
function parseProgressEvent(event) {
    return {
        type: event.type,
        lengthComputable: event.lengthComputable,
        loaded: event.loaded,
        total: event.total
    };
}
function parseTouchEvent(event) {
    function parseTouch(touchList) {
        var touches = [];
        for (var i = 0; i < touchList.length; i++) {
            var touch = touchList[i];
            touches.push({
                identifier: touch.identifier,
                clientX: touch.clientX,
                clientY: touch.clientY,
                screenX: touch.screenX,
                screenY: touch.screenY,
                pageX: touch.pageX,
                pageY: touch.pageY
            });
        }
        return touches;
    }
    return {
        type: event.type,
        detail: event.detail,
        touches: parseTouch(event.touches),
        targetTouches: parseTouch(event.targetTouches),
        changedTouches: parseTouch(event.changedTouches),
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey
    };
}
function parseKeyboardEvent(event) {
    return {
        type: event.type,
        key: event.key,
        code: event.code,
        location: event.location,
        repeat: event.repeat,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey
    };
}
function parsePointerEvent(event) {
    return __assign({}, parseMouseEvent(event), { pointerId: event.pointerId, width: event.width, height: event.height, pressure: event.pressure, tiltX: event.tiltX, tiltY: event.tiltY, pointerType: event.pointerType, isPrimary: event.isPrimary });
}
function parseMouseEvent(event) {
    return {
        type: event.type,
        detail: event.detail,
        screenX: event.screenX,
        screenY: event.screenY,
        clientX: event.clientX,
        clientY: event.clientY,
        button: event.button,
        buttons: event.buttons,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey
    };
}
function isCheckbox(element) {
    return element && element.tagName === 'INPUT' && element.getAttribute('type') === 'checkbox';
}


/***/ }),

/***/ "./src/Rendering/RenderBatch/RenderBatch.ts":
/*!**************************************************!*\
  !*** ./src/Rendering/RenderBatch/RenderBatch.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EditType;
(function (EditType) {
    // The values must be kept in sync with the .NET equivalent in RenderTreeEditType.cs
    EditType[EditType["prependFrame"] = 1] = "prependFrame";
    EditType[EditType["removeFrame"] = 2] = "removeFrame";
    EditType[EditType["setAttribute"] = 3] = "setAttribute";
    EditType[EditType["removeAttribute"] = 4] = "removeAttribute";
    EditType[EditType["updateText"] = 5] = "updateText";
    EditType[EditType["stepIn"] = 6] = "stepIn";
    EditType[EditType["stepOut"] = 7] = "stepOut";
    EditType[EditType["updateMarkup"] = 8] = "updateMarkup";
})(EditType = exports.EditType || (exports.EditType = {}));
var FrameType;
(function (FrameType) {
    // The values must be kept in sync with the .NET equivalent in RenderTreeFrameType.cs
    FrameType[FrameType["element"] = 1] = "element";
    FrameType[FrameType["text"] = 2] = "text";
    FrameType[FrameType["attribute"] = 3] = "attribute";
    FrameType[FrameType["component"] = 4] = "component";
    FrameType[FrameType["region"] = 5] = "region";
    FrameType[FrameType["elementReferenceCapture"] = 6] = "elementReferenceCapture";
    FrameType[FrameType["markup"] = 8] = "markup";
})(FrameType = exports.FrameType || (exports.FrameType = {}));


/***/ }),

/***/ "./src/Rendering/RenderBatch/SharedMemoryRenderBatch.ts":
/*!**************************************************************!*\
  !*** ./src/Rendering/RenderBatch/SharedMemoryRenderBatch.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(/*! ../../Environment */ "./src/Environment.ts");
// Used when running on Mono WebAssembly for shared-memory interop. The code here encapsulates
// our knowledge of the memory layout of RenderBatch and all referenced types.
//
// In this implementation, all the DTO types are really heap pointers at runtime, hence all
// the casts to 'any' whenever we pass them to platform.read.
var SharedMemoryRenderBatch = /** @class */ (function () {
    function SharedMemoryRenderBatch(batchAddress) {
        this.batchAddress = batchAddress;
        this.arrayRangeReader = arrayRangeReader;
        this.arraySegmentReader = arraySegmentReader;
        this.diffReader = diffReader;
        this.editReader = editReader;
        this.frameReader = frameReader;
    }
    // Keep in sync with memory layout in RenderBatch.cs
    SharedMemoryRenderBatch.prototype.updatedComponents = function () { return Environment_1.platform.readStructField(this.batchAddress, 0); };
    SharedMemoryRenderBatch.prototype.referenceFrames = function () { return Environment_1.platform.readStructField(this.batchAddress, arrayRangeReader.structLength); };
    SharedMemoryRenderBatch.prototype.disposedComponentIds = function () { return Environment_1.platform.readStructField(this.batchAddress, arrayRangeReader.structLength * 2); };
    SharedMemoryRenderBatch.prototype.disposedEventHandlerIds = function () { return Environment_1.platform.readStructField(this.batchAddress, arrayRangeReader.structLength * 3); };
    SharedMemoryRenderBatch.prototype.updatedComponentsEntry = function (values, index) {
        return arrayValuesEntry(values, index, diffReader.structLength);
    };
    SharedMemoryRenderBatch.prototype.referenceFramesEntry = function (values, index) {
        return arrayValuesEntry(values, index, frameReader.structLength);
    };
    SharedMemoryRenderBatch.prototype.disposedComponentIdsEntry = function (values, index) {
        var pointer = arrayValuesEntry(values, index, /* int length */ 4);
        return Environment_1.platform.readInt32Field(pointer);
    };
    SharedMemoryRenderBatch.prototype.disposedEventHandlerIdsEntry = function (values, index) {
        var pointer = arrayValuesEntry(values, index, /* int length */ 4);
        return Environment_1.platform.readInt32Field(pointer);
    };
    return SharedMemoryRenderBatch;
}());
exports.SharedMemoryRenderBatch = SharedMemoryRenderBatch;
// Keep in sync with memory layout in ArrayRange.cs
var arrayRangeReader = {
    structLength: 8,
    values: function (arrayRange) { return Environment_1.platform.readObjectField(arrayRange, 0); },
    count: function (arrayRange) { return Environment_1.platform.readInt32Field(arrayRange, 4); },
};
// Keep in sync with memory layout in ArraySegment
var arraySegmentReader = {
    structLength: 12,
    values: function (arraySegment) { return Environment_1.platform.readObjectField(arraySegment, 0); },
    offset: function (arraySegment) { return Environment_1.platform.readInt32Field(arraySegment, 4); },
    count: function (arraySegment) { return Environment_1.platform.readInt32Field(arraySegment, 8); },
};
// Keep in sync with memory layout in RenderTreeDiff.cs
var diffReader = {
    structLength: 4 + arraySegmentReader.structLength,
    componentId: function (diff) { return Environment_1.platform.readInt32Field(diff, 0); },
    edits: function (diff) { return Environment_1.platform.readStructField(diff, 4); },
    editsEntry: function (values, index) { return arrayValuesEntry(values, index, editReader.structLength); },
};
// Keep in sync with memory layout in RenderTreeEdit.cs
var editReader = {
    structLength: 16,
    editType: function (edit) { return Environment_1.platform.readInt32Field(edit, 0); },
    siblingIndex: function (edit) { return Environment_1.platform.readInt32Field(edit, 4); },
    newTreeIndex: function (edit) { return Environment_1.platform.readInt32Field(edit, 8); },
    removedAttributeName: function (edit) { return Environment_1.platform.readStringField(edit, 12); },
};
// Keep in sync with memory layout in RenderTreeFrame.cs
var frameReader = {
    structLength: 36,
    frameType: function (frame) { return Environment_1.platform.readInt16Field(frame, 4); },
    subtreeLength: function (frame) { return Environment_1.platform.readInt32Field(frame, 8); },
    elementReferenceCaptureId: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    componentId: function (frame) { return Environment_1.platform.readInt32Field(frame, 12); },
    elementName: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    textContent: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    markupContent: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    attributeName: function (frame) { return Environment_1.platform.readStringField(frame, 16); },
    attributeValue: function (frame) { return Environment_1.platform.readStringField(frame, 24); },
    attributeEventHandlerId: function (frame) { return Environment_1.platform.readInt32Field(frame, 8); },
    customComponentType: function (frame) { return Environment_1.platform.readInt16Field(frame, 6); },
    hasAttributeValueJson: function (frame) { return Environment_1.platform.readInt32Field(frame, 32) != 0; },
    attributeValueJson: function (frame) { return Environment_1.platform.readStringField(frame, 32); }
};
function arrayValuesEntry(arrayValues, index, itemSize) {
    return Environment_1.platform.getArrayEntryPtr(arrayValues, index, itemSize);
}


/***/ }),

/***/ "./src/Rendering/Renderer.ts":
/*!***********************************!*\
  !*** ./src/Rendering/Renderer.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BrowserRenderer_1 = __webpack_require__(/*! ./BrowserRenderer */ "./src/Rendering/BrowserRenderer.ts");
var browserRenderers = {};
function attachRootComponentToElement(browserRendererId, elementSelector, componentId) {
    var element = document.querySelector(elementSelector);
    if (!element) {
        throw new Error("Could not find any element matching selector '" + elementSelector + "'.");
    }
    var browserRenderer = browserRenderers[browserRendererId];
    if (!browserRenderer) {
        browserRenderer = browserRenderers[browserRendererId] = new BrowserRenderer_1.BrowserRenderer(browserRendererId);
    }
    clearElement(element);
    browserRenderer.attachRootComponentToElement(componentId, element);
}
exports.attachRootComponentToElement = attachRootComponentToElement;
function renderBatch(browserRendererId, batch) {
    var browserRenderer = browserRenderers[browserRendererId];
    if (!browserRenderer) {
        throw new Error("There is no browser renderer with ID " + browserRendererId + ".");
    }
    var arrayRangeReader = batch.arrayRangeReader;
    var updatedComponentsRange = batch.updatedComponents();
    var updatedComponentsValues = arrayRangeReader.values(updatedComponentsRange);
    var updatedComponentsLength = arrayRangeReader.count(updatedComponentsRange);
    var referenceFrames = batch.referenceFrames();
    var referenceFramesValues = arrayRangeReader.values(referenceFrames);
    var diffReader = batch.diffReader;
    browserRenderer.beginRender();
    for (var i = 0; i < updatedComponentsLength; i++) {
        var diff = batch.updatedComponentsEntry(updatedComponentsValues, i);
        var componentId = diffReader.componentId(diff);
        var edits = diffReader.edits(diff);
        browserRenderer.updateComponent(batch, componentId, edits, referenceFramesValues);
    }
    browserRenderer.endRender();
    var disposedComponentIdsRange = batch.disposedComponentIds();
    var disposedComponentIdsValues = arrayRangeReader.values(disposedComponentIdsRange);
    var disposedComponentIdsLength = arrayRangeReader.count(disposedComponentIdsRange);
    for (var i = 0; i < disposedComponentIdsLength; i++) {
        var componentId = batch.disposedComponentIdsEntry(disposedComponentIdsValues, i);
        browserRenderer.disposeComponent(componentId);
    }
    var disposedEventHandlerIdsRange = batch.disposedEventHandlerIds();
    var disposedEventHandlerIdsValues = arrayRangeReader.values(disposedEventHandlerIdsRange);
    var disposedEventHandlerIdsLength = arrayRangeReader.count(disposedEventHandlerIdsRange);
    for (var i = 0; i < disposedEventHandlerIdsLength; i++) {
        var eventHandlerId = batch.disposedEventHandlerIdsEntry(disposedEventHandlerIdsValues, i);
        browserRenderer.disposeEventHandler(eventHandlerId);
    }
}
exports.renderBatch = renderBatch;
function clearElement(element) {
    var childNode;
    while (childNode = element.firstChild) {
        element.removeChild(childNode);
    }
}


/***/ }),

/***/ "./src/Services/Http.ts":
/*!******************************!*\
  !*** ./src/Services/Http.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Environment_1 = __webpack_require__(/*! ../Environment */ "./src/Environment.ts");
var httpClientAssembly = 'Microsoft.AspNetCore.Blazor.Browser';
var httpClientNamespace = httpClientAssembly + ".Http";
var httpClientTypeName = 'BrowserHttpMessageHandler';
var httpClientFullTypeName = httpClientNamespace + "." + httpClientTypeName;
var receiveResponseMethod;
var allocateArrayMethod;
// These are the functions we're making available for invocation from .NET
exports.internalFunctions = {
    sendAsync: sendAsync
};
function sendAsync(id, body, jsonFetchArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var response, responseData, fetchOptions, requestInit, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetchOptions = JSON.parse(Environment_1.platform.toJavaScriptString(jsonFetchArgs));
                    requestInit = Object.assign(fetchOptions.requestInit, fetchOptions.requestInitOverrides);
                    if (body) {
                        requestInit.body = Environment_1.platform.toUint8Array(body);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(fetchOptions.requestUri, requestInit)];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.arrayBuffer()];
                case 3:
                    responseData = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    ex_1 = _a.sent();
                    dispatchErrorResponse(id, ex_1.toString());
                    return [2 /*return*/];
                case 5:
                    dispatchSuccessResponse(id, response, responseData);
                    return [2 /*return*/];
            }
        });
    });
}
function dispatchSuccessResponse(id, response, responseData) {
    var responseDescriptor = {
        statusCode: response.status,
        statusText: response.statusText,
        headers: []
    };
    response.headers.forEach(function (value, name) {
        responseDescriptor.headers.push([name, value]);
    });
    if (!allocateArrayMethod) {
        allocateArrayMethod = Environment_1.platform.findMethod(httpClientAssembly, httpClientNamespace, httpClientTypeName, 'AllocateArray');
    }
    // allocate a managed byte[] of the right size
    var dotNetArray = Environment_1.platform.callMethod(allocateArrayMethod, null, [Environment_1.platform.toDotNetString(responseData.byteLength.toString())]);
    // get an Uint8Array view of it
    var array = Environment_1.platform.toUint8Array(dotNetArray);
    // copy the responseData to our managed byte[]
    array.set(new Uint8Array(responseData));
    dispatchResponse(id, Environment_1.platform.toDotNetString(JSON.stringify(responseDescriptor)), dotNetArray, 
    /* errorMessage */ null);
}
function dispatchErrorResponse(id, errorMessage) {
    dispatchResponse(id, 
    /* responseDescriptor */ null, 
    /* responseText */ null, Environment_1.platform.toDotNetString(errorMessage));
}
function dispatchResponse(id, responseDescriptor, responseData, errorMessage) {
    if (!receiveResponseMethod) {
        receiveResponseMethod = Environment_1.platform.findMethod(httpClientAssembly, httpClientNamespace, httpClientTypeName, 'ReceiveResponse');
    }
    Environment_1.platform.callMethod(receiveResponseMethod, null, [
        Environment_1.platform.toDotNetString(id.toString()),
        responseDescriptor,
        responseData,
        errorMessage,
    ]);
}


/***/ }),

/***/ "./src/Services/UriHelper.ts":
/*!***********************************!*\
  !*** ./src/Services/UriHelper.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var hasRegisteredEventListeners = false;
// Will be initialized once someone registers
var notifyLocationChangedCallback = null;
// These are the functions we're making available for invocation from .NET
exports.internalFunctions = {
    enableNavigationInterception: enableNavigationInterception,
    navigateTo: navigateTo,
    getBaseURI: function () { return document.baseURI; },
    getLocationHref: function () { return location.href; },
};
function enableNavigationInterception(assemblyName, functionName) {
    if (hasRegisteredEventListeners || assemblyName === undefined || functionName === undefined) {
        return;
    }
    notifyLocationChangedCallback = { assemblyName: assemblyName, functionName: functionName };
    hasRegisteredEventListeners = true;
    document.addEventListener('click', function (event) {
        // Intercept clicks on all <a> elements where the href is within the <base href> URI space
        // We must explicitly check if it has an 'href' attribute, because if it doesn't, the result might be null or an empty string depending on the browser
        var anchorTarget = findClosestAncestor(event.target, 'A');
        var hrefAttributeName = 'href';
        if (anchorTarget && anchorTarget.hasAttribute(hrefAttributeName) && event.button === 0) {
            var href = anchorTarget.getAttribute(hrefAttributeName);
            var absoluteHref = toAbsoluteUri(href);
            // Don't stop ctrl/meta-click (etc) from opening links in new tabs/windows
            if (isWithinBaseUriSpace(absoluteHref) && !eventHasSpecialKey(event)) {
                event.preventDefault();
                performInternalNavigation(absoluteHref);
            }
        }
    });
    window.addEventListener('popstate', handleInternalNavigation);
}
function navigateTo(uri) {
    var absoluteUri = toAbsoluteUri(uri);
    if (isWithinBaseUriSpace(absoluteUri)) {
        performInternalNavigation(absoluteUri);
    }
    else {
        location.href = uri;
    }
}
exports.navigateTo = navigateTo;
function performInternalNavigation(absoluteInternalHref) {
    history.pushState(null, /* ignored title */ '', absoluteInternalHref);
    handleInternalNavigation();
}
function handleInternalNavigation() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!notifyLocationChangedCallback) return [3 /*break*/, 2];
                    return [4 /*yield*/, DotNet.invokeMethodAsync(notifyLocationChangedCallback.assemblyName, notifyLocationChangedCallback.functionName, location.href)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
var testAnchor;
function toAbsoluteUri(relativeUri) {
    testAnchor = testAnchor || document.createElement('a');
    testAnchor.href = relativeUri;
    return testAnchor.href;
}
function findClosestAncestor(element, tagName) {
    return !element
        ? null
        : element.tagName === tagName
            ? element
            : findClosestAncestor(element.parentElement, tagName);
}
function isWithinBaseUriSpace(href) {
    var baseUriWithTrailingSlash = toBaseUriWithTrailingSlash(document.baseURI); // TODO: Might baseURI really be null?
    return href.startsWith(baseUriWithTrailingSlash);
}
function toBaseUriWithTrailingSlash(baseUri) {
    return baseUri.substr(0, baseUri.lastIndexOf('/') + 1);
}
function eventHasSpecialKey(event) {
    return event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibGF6b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmxhem9yLy4uL01pY3Jvc29mdC5KU0ludGVyb3AvSmF2YVNjcmlwdFJ1bnRpbWUvc3JjL01pY3Jvc29mdC5KU0ludGVyb3AudHMiLCJ3ZWJwYWNrOi8vYmxhem9yLy4vc3JjL0Jvb3QuV2ViQXNzZW1ibHkudHMiLCJ3ZWJwYWNrOi8vYmxhem9yLy4vc3JjL0Jvb3RDb21tb24udHMiLCJ3ZWJwYWNrOi8vYmxhem9yLy4vc3JjL0Vudmlyb25tZW50LnRzIiwid2VicGFjazovL2JsYXpvci8uL3NyYy9HbG9iYWxFeHBvcnRzLnRzIiwid2VicGFjazovL2JsYXpvci8uL3NyYy9QbGF0Zm9ybS9Nb25vL01vbm9EZWJ1Z2dlci50cyIsIndlYnBhY2s6Ly9ibGF6b3IvLi9zcmMvUGxhdGZvcm0vTW9uby9Nb25vUGxhdGZvcm0udHMiLCJ3ZWJwYWNrOi8vYmxhem9yLy4vc3JjL1BsYXRmb3JtL1VybC50cyIsIndlYnBhY2s6Ly9ibGF6b3IvLi9zcmMvUmVuZGVyaW5nL0Jyb3dzZXJSZW5kZXJlci50cyIsIndlYnBhY2s6Ly9ibGF6b3IvLi9zcmMvUmVuZGVyaW5nL0VsZW1lbnRSZWZlcmVuY2VDYXB0dXJlLnRzIiwid2VicGFjazovL2JsYXpvci8uL3NyYy9SZW5kZXJpbmcvRWxlbWVudHMvQmxhem9yRE9NQ29tcG9uZW50LnRzIiwid2VicGFjazovL2JsYXpvci8uL3NyYy9SZW5kZXJpbmcvRWxlbWVudHMvQmxhem9yRE9NRWxlbWVudC50cyIsIndlYnBhY2s6Ly9ibGF6b3IvLi9zcmMvUmVuZGVyaW5nL0VsZW1lbnRzL0JsYXpvcklOUFVURWxlbWVudC50cyIsIndlYnBhY2s6Ly9ibGF6b3IvLi9zcmMvUmVuZGVyaW5nL0VsZW1lbnRzL0JsYXpvck1hcmt1cEVsZW1lbnQudHMiLCJ3ZWJwYWNrOi8vYmxhem9yLy4vc3JjL1JlbmRlcmluZy9FbGVtZW50cy9FbGVtZW50Q3JlYXRvcnMudHMiLCJ3ZWJwYWNrOi8vYmxhem9yLy4vc3JjL1JlbmRlcmluZy9FbGVtZW50cy9SZW5kZXJpbmdGdW5jdGlvbi50cyIsIndlYnBhY2s6Ly9ibGF6b3IvLi9zcmMvUmVuZGVyaW5nL0V2ZW50RGVsZWdhdG9yLnRzIiwid2VicGFjazovL2JsYXpvci8uL3NyYy9SZW5kZXJpbmcvRXZlbnRGb3JEb3ROZXQudHMiLCJ3ZWJwYWNrOi8vYmxhem9yLy4vc3JjL1JlbmRlcmluZy9SZW5kZXJCYXRjaC9SZW5kZXJCYXRjaC50cyIsIndlYnBhY2s6Ly9ibGF6b3IvLi9zcmMvUmVuZGVyaW5nL1JlbmRlckJhdGNoL1NoYXJlZE1lbW9yeVJlbmRlckJhdGNoLnRzIiwid2VicGFjazovL2JsYXpvci8uL3NyYy9SZW5kZXJpbmcvUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vYmxhem9yLy4vc3JjL1NlcnZpY2VzL0h0dHAudHMiLCJ3ZWJwYWNrOi8vYmxhem9yLy4vc3JjL1NlcnZpY2VzL1VyaUhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtB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QUFDLElBQUksR0FBRyxXQUFXLENBQUM7SUFDOUIsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDO0FBQ3pCLENBQUM7QUFFRCw2QkFBNkIsT0FBdUIsRUFBRSxPQUFlO0lBQ25FLE9BQU8sQ0FBQyxPQUFPO1FBQ2IsQ0FBQyxDQUFDLElBQUk7UUFDTixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxPQUFPO1lBQzNCLENBQUMsQ0FBQyxPQUFPO1lBQ1QsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDO0FBQzNELENBQUM7QUFFRCw4QkFBOEIsSUFBWTtJQUN4QyxJQUFNLHdCQUF3QixHQUFHLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxPQUFRLENBQUMsQ0FBQyxDQUFDLHNDQUFzQztJQUN0SCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQsb0NBQW9DLE9BQWU7SUFDakQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFFRCw0QkFBNEIsS0FBaUI7SUFDM0MsT0FBTyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDO0FBQzFFLENBQUMiLCJmaWxlIjoiYmxhem9yLndlYmFzc2VtYmx5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvQm9vdC5XZWJBc3NlbWJseS50c1wiKTtcbiIsIi8vIFRoaXMgaXMgYSBzaW5nbGUtZmlsZSBzZWxmLWNvbnRhaW5lZCBtb2R1bGUgdG8gYXZvaWQgdGhlIG5lZWQgZm9yIGEgV2VicGFjayBidWlsZFxyXG5cclxubW9kdWxlIERvdE5ldCB7XHJcbiAgKHdpbmRvdyBhcyBhbnkpLkRvdE5ldCA9IERvdE5ldDsgLy8gRW5zdXJlIHJlYWNoYWJsZSBmcm9tIGFueXdoZXJlXHJcblxyXG4gIGV4cG9ydCB0eXBlIEpzb25SZXZpdmVyID0gKChrZXk6IGFueSwgdmFsdWU6IGFueSkgPT4gYW55KTtcclxuICBjb25zdCBqc29uUmV2aXZlcnM6IEpzb25SZXZpdmVyW10gPSBbXTtcclxuXHJcbiAgY29uc3QgcGVuZGluZ0FzeW5jQ2FsbHM6IHsgW2lkOiBudW1iZXJdOiBQZW5kaW5nQXN5bmNDYWxsPGFueT4gfSA9IHt9O1xyXG4gIGNvbnN0IGNhY2hlZEpTRnVuY3Rpb25zOiB7IFtpZGVudGlmaWVyOiBzdHJpbmddOiBGdW5jdGlvbiB9ID0ge307XHJcbiAgbGV0IG5leHRBc3luY0NhbGxJZCA9IDE7IC8vIFN0YXJ0IGF0IDEgYmVjYXVzZSB6ZXJvIHNpZ25hbHMgXCJubyByZXNwb25zZSBuZWVkZWRcIlxyXG5cclxuICBsZXQgZG90TmV0RGlzcGF0Y2hlcjogRG90TmV0Q2FsbERpc3BhdGNoZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgc3BlY2lmaWVkIC5ORVQgY2FsbCBkaXNwYXRjaGVyIGFzIHRoZSBjdXJyZW50IGluc3RhbmNlIHNvIHRoYXQgaXQgd2lsbCBiZSB1c2VkXHJcbiAgICogZm9yIGZ1dHVyZSBpbnZvY2F0aW9ucy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBkaXNwYXRjaGVyIEFuIG9iamVjdCB0aGF0IGNhbiBkaXNwYXRjaCBjYWxscyBmcm9tIEphdmFTY3JpcHQgdG8gYSAuTkVUIHJ1bnRpbWUuXHJcbiAgICovXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaERpc3BhdGNoZXIoZGlzcGF0Y2hlcjogRG90TmV0Q2FsbERpc3BhdGNoZXIpIHtcclxuICAgIGRvdE5ldERpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIEpTT04gcmV2aXZlciBjYWxsYmFjayB0aGF0IHdpbGwgYmUgdXNlZCB3aGVuIHBhcnNpbmcgYXJndW1lbnRzIHJlY2VpdmVkIGZyb20gLk5FVC5cclxuICAgKiBAcGFyYW0gcmV2aXZlciBUaGUgcmV2aXZlciB0byBhZGQuXHJcbiAgICovXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaFJldml2ZXIocmV2aXZlcjogSnNvblJldml2ZXIpIHtcclxuICAgIGpzb25SZXZpdmVycy5wdXNoKHJldml2ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW52b2tlcyB0aGUgc3BlY2lmaWVkIC5ORVQgcHVibGljIG1ldGhvZCBzeW5jaHJvbm91c2x5LiBOb3QgYWxsIGhvc3Rpbmcgc2NlbmFyaW9zIHN1cHBvcnRcclxuICAgKiBzeW5jaHJvbm91cyBpbnZvY2F0aW9uLCBzbyBpZiBwb3NzaWJsZSB1c2UgaW52b2tlTWV0aG9kQXN5bmMgaW5zdGVhZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBhc3NlbWJseU5hbWUgVGhlIHNob3J0IG5hbWUgKHdpdGhvdXQga2V5L3ZlcnNpb24gb3IgLmRsbCBleHRlbnNpb24pIG9mIHRoZSAuTkVUIGFzc2VtYmx5IGNvbnRhaW5pbmcgdGhlIG1ldGhvZC5cclxuICAgKiBAcGFyYW0gbWV0aG9kSWRlbnRpZmllciBUaGUgaWRlbnRpZmllciBvZiB0aGUgbWV0aG9kIHRvIGludm9rZS4gVGhlIG1ldGhvZCBtdXN0IGhhdmUgYSBbSlNJbnZva2FibGVdIGF0dHJpYnV0ZSBzcGVjaWZ5aW5nIHRoaXMgaWRlbnRpZmllci5cclxuICAgKiBAcGFyYW0gYXJncyBBcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgbWV0aG9kLCBlYWNoIG9mIHdoaWNoIG11c3QgYmUgSlNPTi1zZXJpYWxpemFibGUuXHJcbiAgICogQHJldHVybnMgVGhlIHJlc3VsdCBvZiB0aGUgb3BlcmF0aW9uLlxyXG4gICAqL1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBpbnZva2VNZXRob2Q8VD4oYXNzZW1ibHlOYW1lOiBzdHJpbmcsIG1ldGhvZElkZW50aWZpZXI6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBUIHtcclxuICAgIHJldHVybiBpbnZva2VQb3NzaWJsZUluc3RhbmNlTWV0aG9kPFQ+KGFzc2VtYmx5TmFtZSwgbWV0aG9kSWRlbnRpZmllciwgbnVsbCwgYXJncyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnZva2VzIHRoZSBzcGVjaWZpZWQgLk5FVCBwdWJsaWMgbWV0aG9kIGFzeW5jaHJvbm91c2x5LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGFzc2VtYmx5TmFtZSBUaGUgc2hvcnQgbmFtZSAod2l0aG91dCBrZXkvdmVyc2lvbiBvciAuZGxsIGV4dGVuc2lvbikgb2YgdGhlIC5ORVQgYXNzZW1ibHkgY29udGFpbmluZyB0aGUgbWV0aG9kLlxyXG4gICAqIEBwYXJhbSBtZXRob2RJZGVudGlmaWVyIFRoZSBpZGVudGlmaWVyIG9mIHRoZSBtZXRob2QgdG8gaW52b2tlLiBUaGUgbWV0aG9kIG11c3QgaGF2ZSBhIFtKU0ludm9rYWJsZV0gYXR0cmlidXRlIHNwZWNpZnlpbmcgdGhpcyBpZGVudGlmaWVyLlxyXG4gICAqIEBwYXJhbSBhcmdzIEFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBtZXRob2QsIGVhY2ggb2Ygd2hpY2ggbXVzdCBiZSBKU09OLXNlcmlhbGl6YWJsZS5cclxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgcmVwcmVzZW50aW5nIHRoZSByZXN1bHQgb2YgdGhlIG9wZXJhdGlvbi5cclxuICAgKi9cclxuICBleHBvcnQgZnVuY3Rpb24gaW52b2tlTWV0aG9kQXN5bmM8VD4oYXNzZW1ibHlOYW1lOiBzdHJpbmcsIG1ldGhvZElkZW50aWZpZXI6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBQcm9taXNlPFQ+IHtcclxuICAgIHJldHVybiBpbnZva2VQb3NzaWJsZUluc3RhbmNlTWV0aG9kQXN5bmMoYXNzZW1ibHlOYW1lLCBtZXRob2RJZGVudGlmaWVyLCBudWxsLCBhcmdzKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGludm9rZVBvc3NpYmxlSW5zdGFuY2VNZXRob2Q8VD4oYXNzZW1ibHlOYW1lOiBzdHJpbmcgfCBudWxsLCBtZXRob2RJZGVudGlmaWVyOiBzdHJpbmcsIGRvdE5ldE9iamVjdElkOiBudW1iZXIgfCBudWxsLCBhcmdzOiBhbnlbXSk6IFQge1xyXG4gICAgY29uc3QgZGlzcGF0Y2hlciA9IGdldFJlcXVpcmVkRGlzcGF0Y2hlcigpO1xyXG4gICAgaWYgKGRpc3BhdGNoZXIuaW52b2tlRG90TmV0RnJvbUpTKSB7XHJcbiAgICAgIGNvbnN0IGFyZ3NKc29uID0gSlNPTi5zdHJpbmdpZnkoYXJncywgYXJnUmVwbGFjZXIpO1xyXG4gICAgICBjb25zdCByZXN1bHRKc29uID0gZGlzcGF0Y2hlci5pbnZva2VEb3ROZXRGcm9tSlMoYXNzZW1ibHlOYW1lLCBtZXRob2RJZGVudGlmaWVyLCBkb3ROZXRPYmplY3RJZCwgYXJnc0pzb24pO1xyXG4gICAgICByZXR1cm4gcmVzdWx0SnNvbiA/IHBhcnNlSnNvbldpdGhSZXZpdmVycyhyZXN1bHRKc29uKSA6IG51bGw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjdXJyZW50IGRpc3BhdGNoZXIgZG9lcyBub3Qgc3VwcG9ydCBzeW5jaHJvbm91cyBjYWxscyBmcm9tIEpTIHRvIC5ORVQuIFVzZSBpbnZva2VNZXRob2RBc3luYyBpbnN0ZWFkLicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaW52b2tlUG9zc2libGVJbnN0YW5jZU1ldGhvZEFzeW5jPFQ+KGFzc2VtYmx5TmFtZTogc3RyaW5nIHwgbnVsbCwgbWV0aG9kSWRlbnRpZmllcjogc3RyaW5nLCBkb3ROZXRPYmplY3RJZDogbnVtYmVyIHwgbnVsbCwgYXJnczogYW55W10pOiBQcm9taXNlPFQ+IHtcclxuICAgIGNvbnN0IGFzeW5jQ2FsbElkID0gbmV4dEFzeW5jQ2FsbElkKys7XHJcbiAgICBjb25zdCByZXN1bHRQcm9taXNlID0gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBwZW5kaW5nQXN5bmNDYWxsc1thc3luY0NhbGxJZF0gPSB7IHJlc29sdmUsIHJlamVjdCB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYXJnc0pzb24gPSBKU09OLnN0cmluZ2lmeShhcmdzLCBhcmdSZXBsYWNlcik7XHJcbiAgICAgIGdldFJlcXVpcmVkRGlzcGF0Y2hlcigpLmJlZ2luSW52b2tlRG90TmV0RnJvbUpTKGFzeW5jQ2FsbElkLCBhc3NlbWJseU5hbWUsIG1ldGhvZElkZW50aWZpZXIsIGRvdE5ldE9iamVjdElkLCBhcmdzSnNvbik7XHJcbiAgICB9IGNhdGNoKGV4KSB7XHJcbiAgICAgIC8vIFN5bmNocm9ub3VzIGZhaWx1cmVcclxuICAgICAgY29tcGxldGVQZW5kaW5nQ2FsbChhc3luY0NhbGxJZCwgZmFsc2UsIGV4KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0UHJvbWlzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFJlcXVpcmVkRGlzcGF0Y2hlcigpOiBEb3ROZXRDYWxsRGlzcGF0Y2hlciB7XHJcbiAgICBpZiAoZG90TmV0RGlzcGF0Y2hlciAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gZG90TmV0RGlzcGF0Y2hlcjtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIC5ORVQgY2FsbCBkaXNwYXRjaGVyIGhhcyBiZWVuIHNldC4nKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNvbXBsZXRlUGVuZGluZ0NhbGwoYXN5bmNDYWxsSWQ6IG51bWJlciwgc3VjY2VzczogYm9vbGVhbiwgcmVzdWx0T3JFcnJvcjogYW55KSB7XHJcbiAgICBpZiAoIXBlbmRpbmdBc3luY0NhbGxzLmhhc093blByb3BlcnR5KGFzeW5jQ2FsbElkKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIG5vIHBlbmRpbmcgYXN5bmMgY2FsbCB3aXRoIElEICR7YXN5bmNDYWxsSWR9LmApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFzeW5jQ2FsbCA9IHBlbmRpbmdBc3luY0NhbGxzW2FzeW5jQ2FsbElkXTtcclxuICAgIGRlbGV0ZSBwZW5kaW5nQXN5bmNDYWxsc1thc3luY0NhbGxJZF07XHJcbiAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICBhc3luY0NhbGwucmVzb2x2ZShyZXN1bHRPckVycm9yKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFzeW5jQ2FsbC5yZWplY3QocmVzdWx0T3JFcnJvcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbnRlcmZhY2UgUGVuZGluZ0FzeW5jQ2FsbDxUPiB7XHJcbiAgICByZXNvbHZlOiAodmFsdWU/OiBUIHwgUHJvbWlzZUxpa2U8VD4pID0+IHZvaWQ7XHJcbiAgICByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXByZXNlbnRzIHRoZSBhYmlsaXR5IHRvIGRpc3BhdGNoIGNhbGxzIGZyb20gSmF2YVNjcmlwdCB0byBhIC5ORVQgcnVudGltZS5cclxuICAgKi9cclxuICBleHBvcnQgaW50ZXJmYWNlIERvdE5ldENhbGxEaXNwYXRjaGVyIHtcclxuICAgIC8qKlxyXG4gICAgICogT3B0aW9uYWwuIElmIGltcGxlbWVudGVkLCBpbnZva2VkIGJ5IHRoZSBydW50aW1lIHRvIHBlcmZvcm0gYSBzeW5jaHJvbm91cyBjYWxsIHRvIGEgLk5FVCBtZXRob2QuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBhc3NlbWJseU5hbWUgVGhlIHNob3J0IG5hbWUgKHdpdGhvdXQga2V5L3ZlcnNpb24gb3IgLmRsbCBleHRlbnNpb24pIG9mIHRoZSAuTkVUIGFzc2VtYmx5IGhvbGRpbmcgdGhlIG1ldGhvZCB0byBpbnZva2UuIFRoZSB2YWx1ZSBtYXkgYmUgbnVsbCB3aGVuIGludm9raW5nIGluc3RhbmNlIG1ldGhvZHMuXHJcbiAgICAgKiBAcGFyYW0gbWV0aG9kSWRlbnRpZmllciBUaGUgaWRlbnRpZmllciBvZiB0aGUgbWV0aG9kIHRvIGludm9rZS4gVGhlIG1ldGhvZCBtdXN0IGhhdmUgYSBbSlNJbnZva2FibGVdIGF0dHJpYnV0ZSBzcGVjaWZ5aW5nIHRoaXMgaWRlbnRpZmllci5cclxuICAgICAqIEBwYXJhbSBkb3ROZXRPYmplY3RJZCBJZiBnaXZlbiwgdGhlIGNhbGwgd2lsbCBiZSB0byBhbiBpbnN0YW5jZSBtZXRob2Qgb24gdGhlIHNwZWNpZmllZCBEb3ROZXRPYmplY3QuIFBhc3MgbnVsbCBvciB1bmRlZmluZWQgdG8gY2FsbCBzdGF0aWMgbWV0aG9kcy5cclxuICAgICAqIEBwYXJhbSBhcmdzSnNvbiBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBtZXRob2QuXHJcbiAgICAgKiBAcmV0dXJucyBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoZSByZXN1bHQgb2YgdGhlIGludm9jYXRpb24uXHJcbiAgICAgKi9cclxuICAgIGludm9rZURvdE5ldEZyb21KUz8oYXNzZW1ibHlOYW1lOiBzdHJpbmcgfCBudWxsLCBtZXRob2RJZGVudGlmaWVyOiBzdHJpbmcsIGRvdE5ldE9iamVjdElkOiBudW1iZXIgfCBudWxsLCBhcmdzSnNvbjogc3RyaW5nKTogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEludm9rZWQgYnkgdGhlIHJ1bnRpbWUgdG8gYmVnaW4gYW4gYXN5bmNocm9ub3VzIGNhbGwgdG8gYSAuTkVUIG1ldGhvZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2FsbElkIEEgdmFsdWUgaWRlbnRpZnlpbmcgdGhlIGFzeW5jaHJvbm91cyBvcGVyYXRpb24uIFRoaXMgdmFsdWUgc2hvdWxkIGJlIHBhc3NlZCBiYWNrIGluIGEgbGF0ZXIgY2FsbCBmcm9tIC5ORVQgdG8gSlMuXHJcbiAgICAgKiBAcGFyYW0gYXNzZW1ibHlOYW1lIFRoZSBzaG9ydCBuYW1lICh3aXRob3V0IGtleS92ZXJzaW9uIG9yIC5kbGwgZXh0ZW5zaW9uKSBvZiB0aGUgLk5FVCBhc3NlbWJseSBob2xkaW5nIHRoZSBtZXRob2QgdG8gaW52b2tlLiBUaGUgdmFsdWUgbWF5IGJlIG51bGwgd2hlbiBpbnZva2luZyBpbnN0YW5jZSBtZXRob2RzLlxyXG4gICAgICogQHBhcmFtIG1ldGhvZElkZW50aWZpZXIgVGhlIGlkZW50aWZpZXIgb2YgdGhlIG1ldGhvZCB0byBpbnZva2UuIFRoZSBtZXRob2QgbXVzdCBoYXZlIGEgW0pTSW52b2thYmxlXSBhdHRyaWJ1dGUgc3BlY2lmeWluZyB0aGlzIGlkZW50aWZpZXIuXHJcbiAgICAgKiBAcGFyYW0gZG90TmV0T2JqZWN0SWQgSWYgZ2l2ZW4sIHRoZSBjYWxsIHdpbGwgYmUgdG8gYW4gaW5zdGFuY2UgbWV0aG9kIG9uIHRoZSBzcGVjaWZpZWQgRG90TmV0T2JqZWN0LiBQYXNzIG51bGwgdG8gY2FsbCBzdGF0aWMgbWV0aG9kcy5cclxuICAgICAqIEBwYXJhbSBhcmdzSnNvbiBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBtZXRob2QuXHJcbiAgICAgKi9cclxuICAgIGJlZ2luSW52b2tlRG90TmV0RnJvbUpTKGNhbGxJZDogbnVtYmVyLCBhc3NlbWJseU5hbWU6IHN0cmluZyB8IG51bGwsIG1ldGhvZElkZW50aWZpZXI6IHN0cmluZywgZG90TmV0T2JqZWN0SWQ6IG51bWJlciB8IG51bGwsIGFyZ3NKc29uOiBzdHJpbmcpOiB2b2lkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVjZWl2ZXMgaW5jb21pbmcgY2FsbHMgZnJvbSAuTkVUIGFuZCBkaXNwYXRjaGVzIHRoZW0gdG8gSmF2YVNjcmlwdC5cclxuICAgKi9cclxuICBleHBvcnQgY29uc3QganNDYWxsRGlzcGF0Y2hlciA9IHtcclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgdGhlIEphdmFTY3JpcHQgZnVuY3Rpb24gbWF0Y2hpbmcgdGhlIHNwZWNpZmllZCBpZGVudGlmaWVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBpZGVudGlmaWVyIElkZW50aWZpZXMgdGhlIGdsb2JhbGx5LXJlYWNoYWJsZSBmdW5jdGlvbiB0byBiZSByZXR1cm5lZC5cclxuICAgICAqIEByZXR1cm5zIEEgRnVuY3Rpb24gaW5zdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIGZpbmRKU0Z1bmN0aW9uLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgc3BlY2lmaWVkIHN5bmNocm9ub3VzIEphdmFTY3JpcHQgZnVuY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGlkZW50aWZpZXIgSWRlbnRpZmllcyB0aGUgZ2xvYmFsbHktcmVhY2hhYmxlIGZ1bmN0aW9uIHRvIGludm9rZS5cclxuICAgICAqIEBwYXJhbSBhcmdzSnNvbiBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGFyZ3VtZW50cyB0byBiZSBwYXNzZWQgdG8gdGhlIGZ1bmN0aW9uLlxyXG4gICAgICogQHJldHVybnMgSlNPTiByZXByZXNlbnRhdGlvbiBvZiB0aGUgaW52b2NhdGlvbiByZXN1bHQuXHJcbiAgICAgKi9cclxuICAgIGludm9rZUpTRnJvbURvdE5ldDogKGlkZW50aWZpZXI6IHN0cmluZywgYXJnc0pzb246IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBmaW5kSlNGdW5jdGlvbihpZGVudGlmaWVyKS5hcHBseShudWxsLCBwYXJzZUpzb25XaXRoUmV2aXZlcnMoYXJnc0pzb24pKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gbnVsbCB8fCByZXN1bHQgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogSlNPTi5zdHJpbmdpZnkocmVzdWx0LCBhcmdSZXBsYWNlcik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlcyB0aGUgc3BlY2lmaWVkIHN5bmNocm9ub3VzIG9yIGFzeW5jaHJvbm91cyBKYXZhU2NyaXB0IGZ1bmN0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBhc3luY0hhbmRsZSBBIHZhbHVlIGlkZW50aWZ5aW5nIHRoZSBhc3luY2hyb25vdXMgb3BlcmF0aW9uLiBUaGlzIHZhbHVlIHdpbGwgYmUgcGFzc2VkIGJhY2sgaW4gYSBsYXRlciBjYWxsIHRvIGVuZEludm9rZUpTRnJvbURvdE5ldC5cclxuICAgICAqIEBwYXJhbSBpZGVudGlmaWVyIElkZW50aWZpZXMgdGhlIGdsb2JhbGx5LXJlYWNoYWJsZSBmdW5jdGlvbiB0byBpbnZva2UuXHJcbiAgICAgKiBAcGFyYW0gYXJnc0pzb24gSlNPTiByZXByZXNlbnRhdGlvbiBvZiBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIHRoZSBmdW5jdGlvbi5cclxuICAgICAqL1xyXG4gICAgYmVnaW5JbnZva2VKU0Zyb21Eb3ROZXQ6IChhc3luY0hhbmRsZTogbnVtYmVyLCBpZGVudGlmaWVyOiBzdHJpbmcsIGFyZ3NKc29uOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgLy8gQ29lcmNlIHN5bmNocm9ub3VzIGZ1bmN0aW9ucyBpbnRvIGFzeW5jIG9uZXMsIHBsdXMgdHJlYXRcclxuICAgICAgLy8gc3luY2hyb25vdXMgZXhjZXB0aW9ucyB0aGUgc2FtZSBhcyBhc3luYyBvbmVzXHJcbiAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZTxhbnk+KHJlc29sdmUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN5bmNocm9ub3VzUmVzdWx0T3JQcm9taXNlID0gZmluZEpTRnVuY3Rpb24oaWRlbnRpZmllcikuYXBwbHkobnVsbCwgcGFyc2VKc29uV2l0aFJldml2ZXJzKGFyZ3NKc29uKSk7XHJcbiAgICAgICAgcmVzb2x2ZShzeW5jaHJvbm91c1Jlc3VsdE9yUHJvbWlzZSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gV2Ugb25seSBsaXN0ZW4gZm9yIGEgcmVzdWx0IGlmIHRoZSBjYWxsZXIgd2FudHMgdG8gYmUgbm90aWZpZWQgYWJvdXQgaXRcclxuICAgICAgaWYgKGFzeW5jSGFuZGxlKSB7XHJcbiAgICAgICAgLy8gT24gY29tcGxldGlvbiwgZGlzcGF0Y2ggcmVzdWx0IGJhY2sgdG8gLk5FVFxyXG4gICAgICAgIC8vIE5vdCB1c2luZyBcImF3YWl0XCIgYmVjYXVzZSBpdCBjb2RlZ2VucyBhIGxvdCBvZiBib2lsZXJwbGF0ZVxyXG4gICAgICAgIHByb21pc2UudGhlbihcclxuICAgICAgICAgIHJlc3VsdCA9PiBnZXRSZXF1aXJlZERpc3BhdGNoZXIoKS5iZWdpbkludm9rZURvdE5ldEZyb21KUygwLCAnTWljcm9zb2Z0LkpTSW50ZXJvcCcsICdEb3ROZXREaXNwYXRjaGVyLkVuZEludm9rZScsIG51bGwsIEpTT04uc3RyaW5naWZ5KFthc3luY0hhbmRsZSwgdHJ1ZSwgcmVzdWx0XSwgYXJnUmVwbGFjZXIpKSxcclxuICAgICAgICAgIGVycm9yID0+IGdldFJlcXVpcmVkRGlzcGF0Y2hlcigpLmJlZ2luSW52b2tlRG90TmV0RnJvbUpTKDAsICdNaWNyb3NvZnQuSlNJbnRlcm9wJywgJ0RvdE5ldERpc3BhdGNoZXIuRW5kSW52b2tlJywgbnVsbCwgSlNPTi5zdHJpbmdpZnkoW2FzeW5jSGFuZGxlLCBmYWxzZSwgZm9ybWF0RXJyb3IoZXJyb3IpXSkpXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY2VpdmVzIG5vdGlmaWNhdGlvbiB0aGF0IGFuIGFzeW5jIGNhbGwgZnJvbSBKUyB0byAuTkVUIGhhcyBjb21wbGV0ZWQuXHJcbiAgICAgKiBAcGFyYW0gYXN5bmNDYWxsSWQgVGhlIGlkZW50aWZpZXIgc3VwcGxpZWQgaW4gYW4gZWFybGllciBjYWxsIHRvIGJlZ2luSW52b2tlRG90TmV0RnJvbUpTLlxyXG4gICAgICogQHBhcmFtIHN1Y2Nlc3MgQSBmbGFnIHRvIGluZGljYXRlIHdoZXRoZXIgdGhlIG9wZXJhdGlvbiBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxyXG4gICAgICogQHBhcmFtIHJlc3VsdE9yRXhjZXB0aW9uTWVzc2FnZSBFaXRoZXIgdGhlIG9wZXJhdGlvbiByZXN1bHQgb3IgYW4gZXJyb3IgbWVzc2FnZS5cclxuICAgICAqL1xyXG4gICAgZW5kSW52b2tlRG90TmV0RnJvbUpTOiAoYXN5bmNDYWxsSWQ6IHN0cmluZywgc3VjY2VzczogYm9vbGVhbiwgcmVzdWx0T3JFeGNlcHRpb25NZXNzYWdlOiBhbnkpOiB2b2lkID0+IHtcclxuICAgICAgY29uc3QgcmVzdWx0T3JFcnJvciA9IHN1Y2Nlc3MgPyByZXN1bHRPckV4Y2VwdGlvbk1lc3NhZ2UgOiBuZXcgRXJyb3IocmVzdWx0T3JFeGNlcHRpb25NZXNzYWdlKTtcclxuICAgICAgY29tcGxldGVQZW5kaW5nQ2FsbChwYXJzZUludChhc3luY0NhbGxJZCksIHN1Y2Nlc3MsIHJlc3VsdE9yRXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGFyc2VKc29uV2l0aFJldml2ZXJzKGpzb246IHN0cmluZyk6IGFueSB7XHJcbiAgICByZXR1cm4ganNvbiA/IEpTT04ucGFyc2UoanNvbiwgKGtleSwgaW5pdGlhbFZhbHVlKSA9PiB7XHJcbiAgICAgIC8vIEludm9rZSBlYWNoIHJldml2ZXIgaW4gb3JkZXIsIHBhc3NpbmcgdGhlIG91dHB1dCBmcm9tIHRoZSBwcmV2aW91cyByZXZpdmVyLFxyXG4gICAgICAvLyBzbyB0aGF0IGVhY2ggb25lIGdldHMgYSBjaGFuY2UgdG8gdHJhbnNmb3JtIHRoZSB2YWx1ZVxyXG4gICAgICByZXR1cm4ganNvblJldml2ZXJzLnJlZHVjZShcclxuICAgICAgICAobGF0ZXN0VmFsdWUsIHJldml2ZXIpID0+IHJldml2ZXIoa2V5LCBsYXRlc3RWYWx1ZSksXHJcbiAgICAgICAgaW5pdGlhbFZhbHVlXHJcbiAgICAgICk7XHJcbiAgICB9KSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmb3JtYXRFcnJvcihlcnJvcjogYW55KTogc3RyaW5nIHtcclxuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgIHJldHVybiBgJHtlcnJvci5tZXNzYWdlfVxcbiR7ZXJyb3Iuc3RhY2t9YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBlcnJvciA/IGVycm9yLnRvU3RyaW5nKCkgOiAnbnVsbCc7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGZ1bmN0aW9uIGZpbmRKU0Z1bmN0aW9uKGlkZW50aWZpZXI6IHN0cmluZyk6IEZ1bmN0aW9uIHtcclxuICAgIGlmIChjYWNoZWRKU0Z1bmN0aW9ucy5oYXNPd25Qcm9wZXJ0eShpZGVudGlmaWVyKSkge1xyXG4gICAgICByZXR1cm4gY2FjaGVkSlNGdW5jdGlvbnNbaWRlbnRpZmllcl07XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc3VsdDogYW55ID0gd2luZG93O1xyXG4gICAgbGV0IHJlc3VsdElkZW50aWZpZXIgPSAnd2luZG93JztcclxuICAgIGlkZW50aWZpZXIuc3BsaXQoJy4nKS5mb3JFYWNoKHNlZ21lbnQgPT4ge1xyXG4gICAgICBpZiAoc2VnbWVudCBpbiByZXN1bHQpIHtcclxuICAgICAgICByZXN1bHQgPSByZXN1bHRbc2VnbWVudF07XHJcbiAgICAgICAgcmVzdWx0SWRlbnRpZmllciArPSAnLicgKyBzZWdtZW50O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgJyR7c2VnbWVudH0nIGluICcke3Jlc3VsdElkZW50aWZpZXJ9Jy5gKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSB2YWx1ZSAnJHtyZXN1bHRJZGVudGlmaWVyfScgaXMgbm90IGEgZnVuY3Rpb24uYCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbGFzcyBEb3ROZXRPYmplY3QgeyAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2lkOiBudW1iZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW52b2tlTWV0aG9kPFQ+KG1ldGhvZElkZW50aWZpZXI6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBUIHtcclxuICAgICAgcmV0dXJuIGludm9rZVBvc3NpYmxlSW5zdGFuY2VNZXRob2Q8VD4obnVsbCwgbWV0aG9kSWRlbnRpZmllciwgdGhpcy5faWQsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnZva2VNZXRob2RBc3luYzxUPihtZXRob2RJZGVudGlmaWVyOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogUHJvbWlzZTxUPiB7XHJcbiAgICAgIHJldHVybiBpbnZva2VQb3NzaWJsZUluc3RhbmNlTWV0aG9kQXN5bmM8VD4obnVsbCwgbWV0aG9kSWRlbnRpZmllciwgdGhpcy5faWQsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwb3NlKCkge1xyXG4gICAgICBjb25zdCBwcm9taXNlID0gaW52b2tlTWV0aG9kQXN5bmM8YW55PihcclxuICAgICAgICAnTWljcm9zb2Z0LkpTSW50ZXJvcCcsXHJcbiAgICAgICAgJ0RvdE5ldERpc3BhdGNoZXIuUmVsZWFzZURvdE5ldE9iamVjdCcsXHJcbiAgICAgICAgdGhpcy5faWQpO1xyXG4gICAgICBwcm9taXNlLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VyaWFsaXplQXNBcmcoKSB7XHJcbiAgICAgIHJldHVybiBgX19kb3ROZXRPYmplY3Q6JHt0aGlzLl9pZH1gO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgZG90TmV0T2JqZWN0VmFsdWVGb3JtYXQgPSAvXl9fZG90TmV0T2JqZWN0XFw6KFxcZCspJC87XHJcbiAgYXR0YWNoUmV2aXZlcihmdW5jdGlvbiByZXZpdmVEb3ROZXRPYmplY3Qoa2V5OiBhbnksIHZhbHVlOiBhbnkpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGNvbnN0IG1hdGNoID0gdmFsdWUubWF0Y2goZG90TmV0T2JqZWN0VmFsdWVGb3JtYXQpO1xyXG4gICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERvdE5ldE9iamVjdChwYXJzZUludChtYXRjaFsxXSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVW5yZWNvZ25pemVkIC0gbGV0IGFub3RoZXIgcmV2aXZlciBoYW5kbGUgaXRcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gYXJnUmVwbGFjZXIoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIERvdE5ldE9iamVjdCA/IHZhbHVlLnNlcmlhbGl6ZUFzQXJnKCkgOiB2YWx1ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0ICcuLi8uLi9NaWNyb3NvZnQuSlNJbnRlcm9wL0phdmFTY3JpcHRSdW50aW1lL3NyYy9NaWNyb3NvZnQuSlNJbnRlcm9wJztcclxuaW1wb3J0ICcuL0dsb2JhbEV4cG9ydHMnO1xyXG5pbXBvcnQgKiBhcyBFbnZpcm9ubWVudCBmcm9tICcuL0Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgbW9ub1BsYXRmb3JtIH0gZnJvbSAnLi9QbGF0Zm9ybS9Nb25vL01vbm9QbGF0Zm9ybSc7XHJcbmltcG9ydCB7IGdldEFzc2VtYmx5TmFtZUZyb21VcmwgfSBmcm9tICcuL1BsYXRmb3JtL1VybCc7XHJcbmltcG9ydCB7IHJlbmRlckJhdGNoIH0gZnJvbSAnLi9SZW5kZXJpbmcvUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBSZW5kZXJCYXRjaCB9IGZyb20gJy4vUmVuZGVyaW5nL1JlbmRlckJhdGNoL1JlbmRlckJhdGNoJztcclxuaW1wb3J0IHsgU2hhcmVkTWVtb3J5UmVuZGVyQmF0Y2ggfSBmcm9tICcuL1JlbmRlcmluZy9SZW5kZXJCYXRjaC9TaGFyZWRNZW1vcnlSZW5kZXJCYXRjaCc7XHJcbmltcG9ydCB7IFBvaW50ZXIgfSBmcm9tICcuL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuaW1wb3J0IHsgZmV0Y2hCb290Q29uZmlnQXN5bmMsIGxvYWRFbWJlZGRlZFJlc291cmNlc0FzeW5jIH0gZnJvbSAnLi9Cb290Q29tbW9uJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGJvb3QoKSB7XHJcbiAgLy8gQ29uZmlndXJlIGVudmlyb25tZW50IGZvciBleGVjdXRpb24gdW5kZXIgTW9ubyBXZWJBc3NlbWJseSB3aXRoIHNoYXJlZC1tZW1vcnkgcmVuZGVyaW5nXHJcbiAgY29uc3QgcGxhdGZvcm0gPSBFbnZpcm9ubWVudC5zZXRQbGF0Zm9ybShtb25vUGxhdGZvcm0pO1xyXG4gIHdpbmRvd1snQmxhem9yJ10ucGxhdGZvcm0gPSBwbGF0Zm9ybTtcclxuICB3aW5kb3dbJ0JsYXpvciddLl9pbnRlcm5hbC5yZW5kZXJCYXRjaCA9IChicm93c2VyUmVuZGVyZXJJZDogbnVtYmVyLCBiYXRjaEFkZHJlc3M6IFBvaW50ZXIpID0+IHtcclxuICAgIHJlbmRlckJhdGNoKGJyb3dzZXJSZW5kZXJlcklkLCBuZXcgU2hhcmVkTWVtb3J5UmVuZGVyQmF0Y2goYmF0Y2hBZGRyZXNzKSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gRmV0Y2ggdGhlIGJvb3QgSlNPTiBmaWxlXHJcbiAgY29uc3QgYm9vdENvbmZpZyA9IGF3YWl0IGZldGNoQm9vdENvbmZpZ0FzeW5jKCk7XHJcbiAgY29uc3QgZW1iZWRkZWRSZXNvdXJjZXNQcm9taXNlID0gbG9hZEVtYmVkZGVkUmVzb3VyY2VzQXN5bmMoYm9vdENvbmZpZyk7XHJcblxyXG4gIGlmICghYm9vdENvbmZpZy5saW5rZXJFbmFibGVkKSB7XHJcbiAgICBjb25zb2xlLmluZm8oJ0JsYXpvciBpcyBydW5uaW5nIGluIGRldiBtb2RlIHdpdGhvdXQgSUwgc3RyaXBwaW5nLiBUbyBtYWtlIHRoZSBidW5kbGUgc2l6ZSBzaWduaWZpY2FudGx5IHNtYWxsZXIsIHB1Ymxpc2ggdGhlIGFwcGxpY2F0aW9uIG9yIHNlZSBodHRwczovL2dvLm1pY3Jvc29mdC5jb20vZndsaW5rLz9saW5raWQ9ODcwNDE0Jyk7XHJcbiAgfVxyXG5cclxuICAvLyBEZXRlcm1pbmUgdGhlIFVSTHMgb2YgdGhlIGFzc2VtYmxpZXMgd2Ugd2FudCB0byBsb2FkLCB0aGVuIGJlZ2luIGZldGNoaW5nIHRoZW0gYWxsXHJcbiAgY29uc3QgbG9hZEFzc2VtYmx5VXJscyA9IFtib290Q29uZmlnLm1haW5dXHJcbiAgICAuY29uY2F0KGJvb3RDb25maWcuYXNzZW1ibHlSZWZlcmVuY2VzKVxyXG4gICAgLm1hcChmaWxlbmFtZSA9PiBgX2ZyYW1ld29yay9fYmluLyR7ZmlsZW5hbWV9YCk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBwbGF0Zm9ybS5zdGFydChsb2FkQXNzZW1ibHlVcmxzKTtcclxuICB9IGNhdGNoIChleCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gc3RhcnQgcGxhdGZvcm0uIFJlYXNvbjogJHtleH1gKTtcclxuICB9XHJcblxyXG4gIC8vIEJlZm9yZSB3ZSBzdGFydCBydW5uaW5nIC5ORVQgY29kZSwgYmUgc3VyZSBlbWJlZGRlZCBjb250ZW50IHJlc291cmNlcyBhcmUgYWxsIGxvYWRlZFxyXG4gIGF3YWl0IGVtYmVkZGVkUmVzb3VyY2VzUHJvbWlzZTtcclxuXHJcbiAgLy8gVHJpZ2dlciBCbGF6b3JPbkxvYWQgZXZlbnRcclxuICBpZiAod2luZG93KSB7XHJcbiAgICBsZXQgZXZ0ID0gbmV3IEV2ZW50KCdCbGF6b3JPbkxvYWQnKTtcclxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgfVxyXG5cclxuICAvLyBTdGFydCB1cCB0aGUgYXBwbGljYXRpb25cclxuICBjb25zdCBtYWluQXNzZW1ibHlOYW1lID0gZ2V0QXNzZW1ibHlOYW1lRnJvbVVybChib290Q29uZmlnLm1haW4pO1xyXG4gIHBsYXRmb3JtLmNhbGxFbnRyeVBvaW50KG1haW5Bc3NlbWJseU5hbWUsIGJvb3RDb25maWcuZW50cnlQb2ludCwgW10pO1xyXG5cclxuICAvLyBUcmlnZ2VyIEJsYXpvck9uU3RhcnQgZXZlbnRcclxuICBpZiAod2luZG93KSB7XHJcbiAgICBsZXQgZXZ0ID0gbmV3IEV2ZW50KCdCbGF6b3JPblN0YXJ0Jyk7XHJcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gIH1cclxufVxyXG5cclxuYm9vdCgpO1xyXG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hCb290Q29uZmlnQXN5bmMoKSB7XHJcbiAgLy8gTGF0ZXIgd2UgbWlnaHQgbWFrZSB0aGUgbG9jYXRpb24gb2YgdGhpcyBjb25maWd1cmFibGUgKGUuZy4sIGFzIGFuIGF0dHJpYnV0ZSBvbiB0aGUgPHNjcmlwdD5cclxuICAvLyBlbGVtZW50IHRoYXQncyBpbXBvcnRpbmcgdGhpcyBmaWxlKSwgYnV0IGN1cnJlbnRseSB0aGVyZSBpc24ndCBhIHVzZSBjYXNlIGZvciB0aGF0LlxyXG4gIGNvbnN0IGJvb3RDb25maWdSZXNwb25zZSA9IGF3YWl0IGZldGNoKCdfZnJhbWV3b3JrL2JsYXpvci5ib290Lmpzb24nKTtcclxuICByZXR1cm4gYm9vdENvbmZpZ1Jlc3BvbnNlLmpzb24oKSBhcyBQcm9taXNlPEJvb3RKc29uRGF0YT47XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkRW1iZWRkZWRSZXNvdXJjZXNBc3luYyhib290Q29uZmlnOiBCb290SnNvbkRhdGEpOiBQcm9taXNlPGFueT4ge1xyXG4gIGNvbnN0IGNzc0xvYWRpbmdQcm9taXNlcyA9IGJvb3RDb25maWcuY3NzUmVmZXJlbmNlcy5tYXAoY3NzUmVmZXJlbmNlID0+IHtcclxuICAgIGNvbnN0IGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xyXG4gICAgbGlua0VsZW1lbnQucmVsID0gJ3N0eWxlc2hlZXQnO1xyXG4gICAgbGlua0VsZW1lbnQuaHJlZiA9IGNzc1JlZmVyZW5jZTtcclxuICAgIHJldHVybiBsb2FkUmVzb3VyY2VGcm9tRWxlbWVudChsaW5rRWxlbWVudCk7XHJcbiAgfSk7XHJcbiAgY29uc3QganNMb2FkaW5nUHJvbWlzZXMgPSBib290Q29uZmlnLmpzUmVmZXJlbmNlcy5tYXAoanNSZWZlcmVuY2UgPT4ge1xyXG4gICAgY29uc3Qgc2NyaXB0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgc2NyaXB0RWxlbWVudC5zcmMgPSBqc1JlZmVyZW5jZTtcclxuICAgIHJldHVybiBsb2FkUmVzb3VyY2VGcm9tRWxlbWVudChzY3JpcHRFbGVtZW50KTtcclxuICB9KTtcclxuICByZXR1cm4gUHJvbWlzZS5hbGwoY3NzTG9hZGluZ1Byb21pc2VzLmNvbmNhdChqc0xvYWRpbmdQcm9taXNlcykpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkUmVzb3VyY2VGcm9tRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBlbGVtZW50Lm9ubG9hZCA9IHJlc29sdmU7XHJcbiAgICBlbGVtZW50Lm9uZXJyb3IgPSByZWplY3Q7XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBLZWVwIGluIHN5bmMgd2l0aCBCb290SnNvbkRhdGEgaW4gTWljcm9zb2Z0LkFzcE5ldENvcmUuQmxhem9yLkJ1aWxkXHJcbmludGVyZmFjZSBCb290SnNvbkRhdGEge1xyXG4gIG1haW46IHN0cmluZztcclxuICBlbnRyeVBvaW50OiBzdHJpbmc7XHJcbiAgYXNzZW1ibHlSZWZlcmVuY2VzOiBzdHJpbmdbXTtcclxuICBjc3NSZWZlcmVuY2VzOiBzdHJpbmdbXTtcclxuICBqc1JlZmVyZW5jZXM6IHN0cmluZ1tdO1xyXG4gIGxpbmtlckVuYWJsZWQ6IGJvb2xlYW47XHJcbn1cclxuIiwiLy8gRXhwb3NlIGFuIGV4cG9ydCBjYWxsZWQgJ3BsYXRmb3JtJyBvZiB0aGUgaW50ZXJmYWNlIHR5cGUgJ1BsYXRmb3JtJyxcclxuLy8gc28gdGhhdCBjb25zdW1lcnMgY2FuIGJlIGFnbm9zdGljIGFib3V0IHdoaWNoIGltcGxlbWVudGF0aW9uIHRoZXkgdXNlLlxyXG4vLyBCYXNpYyBhbHRlcm5hdGl2ZSB0byBoYXZpbmcgYW4gYWN0dWFsIERJIGNvbnRhaW5lci5cclxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICcuL1BsYXRmb3JtL1BsYXRmb3JtJztcclxuXHJcbmV4cG9ydCBsZXQgcGxhdGZvcm06IFBsYXRmb3JtO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFBsYXRmb3JtKHBsYXRmb3JtSW5zdGFuY2U6IFBsYXRmb3JtKSB7XHJcbiAgcGxhdGZvcm0gPSBwbGF0Zm9ybUluc3RhbmNlO1xyXG4gIHJldHVybiBwbGF0Zm9ybTtcclxufVxyXG4iLCJpbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvLCBpbnRlcm5hbEZ1bmN0aW9ucyBhcyB1cmlIZWxwZXJJbnRlcm5hbEZ1bmN0aW9ucyB9IGZyb20gJy4vU2VydmljZXMvVXJpSGVscGVyJztcclxuaW1wb3J0IHsgaW50ZXJuYWxGdW5jdGlvbnMgYXMgaHR0cEludGVybmFsRnVuY3Rpb25zIH0gZnJvbSAnLi9TZXJ2aWNlcy9IdHRwJztcclxuaW1wb3J0IHsgYXR0YWNoUm9vdENvbXBvbmVudFRvRWxlbWVudCB9IGZyb20gJy4vUmVuZGVyaW5nL1JlbmRlcmVyJztcclxuaW1wb3J0IHsgUG9pbnRlciB9IGZyb20gJy4vUGxhdGZvcm0vUGxhdGZvcm0nO1xyXG5cclxuaW1wb3J0IHsgQmxhem9yRE9NQ29tcG9uZW50IH0gZnJvbSAnLi9SZW5kZXJpbmcvRWxlbWVudHMvQmxhem9yRE9NQ29tcG9uZW50J1xyXG5pbXBvcnQgeyBCbGF6b3JET01FbGVtZW50IH0gZnJvbSAnLi9SZW5kZXJpbmcvRWxlbWVudHMvQmxhem9yRE9NRWxlbWVudCdcclxuaW1wb3J0IHsgcmVnaXN0ZXJDdXN0b21UYWcsIHJlZ2lzdGVyQ3VzdG9tRE9NRWxlbWVudCB9IGZyb20gJy4vUmVuZGVyaW5nL0VsZW1lbnRzL1JlbmRlcmluZ0Z1bmN0aW9uJ1xyXG5pbXBvcnQgeyByYWlzZUV2ZW50IH0gZnJvbSAnLi9SZW5kZXJpbmcvQnJvd3NlclJlbmRlcmVyJ1xyXG5pbXBvcnQgeyBFdmVudEZvckRvdE5ldCB9IGZyb20gJy4vUmVuZGVyaW5nL0V2ZW50Rm9yRG90TmV0J1xyXG5cclxuLy8gTWFrZSB0aGUgZm9sbG93aW5nIEFQSXMgYXZhaWxhYmxlIGluIGdsb2JhbCBzY29wZSBmb3IgaW52b2NhdGlvbiBmcm9tIEpTXHJcbndpbmRvd1snQmxhem9yJ10gPSB7XHJcbiAgbmF2aWdhdGVUbyxcclxuXHJcbiAgX2ludGVybmFsOiB7XHJcbiAgICBhdHRhY2hSb290Q29tcG9uZW50VG9FbGVtZW50LFxyXG4gICAgaHR0cDogaHR0cEludGVybmFsRnVuY3Rpb25zLFxyXG4gICAgdXJpSGVscGVyOiB1cmlIZWxwZXJJbnRlcm5hbEZ1bmN0aW9uc1xyXG5cdH0sXHJcblxyXG5cdHJhaXNlRXZlbnQsXHJcblx0cmVnaXN0ZXJDdXN0b21UYWcsXHJcblx0cmVnaXN0ZXJDdXN0b21ET01FbGVtZW50LFxyXG5cdEJsYXpvckRPTUVsZW1lbnQsXHJcblx0Qmxhem9yRE9NQ29tcG9uZW50LFxyXG5cdEV2ZW50Rm9yRG90TmV0XHJcbn07XHJcbiIsImltcG9ydCB7IGdldEFzc2VtYmx5TmFtZUZyb21VcmwsIGdldEZpbGVOYW1lRnJvbVVybCB9IGZyb20gJy4uL1VybCc7XHJcblxyXG5jb25zdCBjdXJyZW50QnJvd3NlcklzQ2hyb21lID0gKHdpbmRvdyBhcyBhbnkpLmNocm9tZVxyXG4gICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRWRnZScpIDwgMDsgLy8gRWRnZSBwcmV0ZW5kcyB0byBiZSBDaHJvbWVcclxuXHJcbmxldCBoYXNSZWZlcmVuY2VkUGRicyA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc0RlYnVnZ2luZ0VuYWJsZWQoKSB7XHJcbiAgcmV0dXJuIGhhc1JlZmVyZW5jZWRQZGJzICYmIGN1cnJlbnRCcm93c2VySXNDaHJvbWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdHRhY2hEZWJ1Z2dlckhvdGtleShsb2FkQXNzZW1ibHlVcmxzOiBzdHJpbmdbXSkge1xyXG4gIGhhc1JlZmVyZW5jZWRQZGJzID0gbG9hZEFzc2VtYmx5VXJsc1xyXG4gICAgLnNvbWUodXJsID0+IC9cXC5wZGIkLy50ZXN0KGdldEZpbGVOYW1lRnJvbVVybCh1cmwpKSk7XHJcblxyXG4gIC8vIFVzZSB0aGUgY29tYmluYXRpb24gc2hpZnQrYWx0K0QgYmVjYXVzZSBpdCBpc24ndCB1c2VkIGJ5IHRoZSBtYWpvciBicm93c2Vyc1xyXG4gIC8vIGZvciBhbnl0aGluZyBlbHNlIGJ5IGRlZmF1bHRcclxuICBjb25zdCBhbHRLZXlOYW1lID0gbmF2aWdhdG9yLnBsYXRmb3JtLm1hdGNoKC9eTWFjL2kpID8gJ0NtZCcgOiAnQWx0JztcclxuICBpZiAoaGFzRGVidWdnaW5nRW5hYmxlZCgpKSB7XHJcbiAgICBjb25zb2xlLmluZm8oYERlYnVnZ2luZyBob3RrZXk6IFNoaWZ0KyR7YWx0S2V5TmFtZX0rRCAod2hlbiBhcHBsaWNhdGlvbiBoYXMgZm9jdXMpYCk7XHJcbiAgfVxyXG5cclxuICAvLyBFdmVuIGlmIGRlYnVnZ2luZyBpc24ndCBlbmFibGVkLCB3ZSByZWdpc3RlciB0aGUgaG90a2V5IHNvIHdlIGNhbiByZXBvcnQgd2h5IGl0J3Mgbm90IGVuYWJsZWRcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZ0ID0+IHtcclxuICAgIGlmIChldnQuc2hpZnRLZXkgJiYgKGV2dC5tZXRhS2V5IHx8IGV2dC5hbHRLZXkpICYmIGV2dC5jb2RlID09PSAnS2V5RCcpIHtcclxuICAgICAgaWYgKCFoYXNSZWZlcmVuY2VkUGRicykge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBzdGFydCBkZWJ1Z2dpbmcsIGJlY2F1c2UgdGhlIGFwcGxpY2F0aW9uIHdhcyBub3QgY29tcGlsZWQgd2l0aCBkZWJ1Z2dpbmcgZW5hYmxlZC4nKTtcclxuICAgICAgfSBlbHNlIGlmICghY3VycmVudEJyb3dzZXJJc0Nocm9tZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0N1cnJlbnRseSwgb25seSBDaHJvbWUgaXMgc3VwcG9ydGVkIGZvciBkZWJ1Z2dpbmcuJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGF1bmNoRGVidWdnZXIoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsYXVuY2hEZWJ1Z2dlcigpIHtcclxuICAvLyBUaGUgbm9vcGVuZXIgZmxhZyBpcyBlc3NlbnRpYWwsIGJlY2F1c2Ugb3RoZXJ3aXNlIENocm9tZSB0cmFja3MgdGhlIGFzc29jaWF0aW9uIHdpdGggdGhlXHJcbiAgLy8gcGFyZW50IHRhYiwgYW5kIHRoZW4gd2hlbiB0aGUgcGFyZW50IHRhYiBwYXVzZXMgaW4gdGhlIGRlYnVnZ2VyLCB0aGUgY2hpbGQgdGFiIGRvZXMgc29cclxuICAvLyB0b28gKGV2ZW4gaWYgaXQncyBzaW5jZSBuYXZpZ2F0ZWQgdG8gYSBkaWZmZXJlbnQgcGFnZSkuIFRoaXMgbWVhbnMgdGhhdCB0aGUgZGVidWdnZXJcclxuICAvLyBpdHNlbGYgZnJlZXplcywgYW5kIG5vdCBqdXN0IHRoZSBwYWdlIGJlaW5nIGRlYnVnZ2VkLlxyXG4gIC8vXHJcbiAgLy8gV2UgaGF2ZSB0byBjb25zdHJ1Y3QgYSBsaW5rIGVsZW1lbnQgYW5kIHNpbXVsYXRlIGEgY2xpY2sgb24gaXQsIGJlY2F1c2UgdGhlIG1vcmUgb2J2aW91c1xyXG4gIC8vIHdpbmRvdy5vcGVuKC4uLiwgJ25vb3BlbmVyJykgYWx3YXlzIG9wZW5zIGEgbmV3IHdpbmRvdyBpbnN0ZWFkIG9mIGEgbmV3IHRhYi5cclxuICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gIGxpbmsuaHJlZiA9IGBfZnJhbWV3b3JrL2RlYnVnP3VybD0ke2VuY29kZVVSSUNvbXBvbmVudChsb2NhdGlvbi5ocmVmKX1gO1xyXG4gIGxpbmsudGFyZ2V0ID0gJ19ibGFuayc7XHJcbiAgbGluay5yZWwgPSAnbm9vcGVuZXIgbm9yZWZlcnJlcic7XHJcbiAgbGluay5jbGljaygpO1xyXG59XHJcbiIsImltcG9ydCB7IE1ldGhvZEhhbmRsZSwgU3lzdGVtX09iamVjdCwgU3lzdGVtX1N0cmluZywgU3lzdGVtX0FycmF5LCBQb2ludGVyLCBQbGF0Zm9ybSB9IGZyb20gJy4uL1BsYXRmb3JtJztcclxuaW1wb3J0IHsgZ2V0QXNzZW1ibHlOYW1lRnJvbVVybCwgZ2V0RmlsZU5hbWVGcm9tVXJsIH0gZnJvbSAnLi4vVXJsJztcclxuaW1wb3J0IHsgYXR0YWNoRGVidWdnZXJIb3RrZXksIGhhc0RlYnVnZ2luZ0VuYWJsZWQgfSBmcm9tICcuL01vbm9EZWJ1Z2dlcic7XHJcblxyXG5jb25zdCBhc3NlbWJseUhhbmRsZUNhY2hlOiB7IFthc3NlbWJseU5hbWU6IHN0cmluZ106IG51bWJlciB9ID0ge307XHJcbmNvbnN0IHR5cGVIYW5kbGVDYWNoZTogeyBbZnVsbHlRdWFsaWZpZWRUeXBlTmFtZTogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcclxuY29uc3QgbWV0aG9kSGFuZGxlQ2FjaGU6IHsgW2Z1bGx5UXVhbGlmaWVkTWV0aG9kTmFtZTogc3RyaW5nXTogTWV0aG9kSGFuZGxlIH0gPSB7fTtcclxuXHJcbmxldCBhc3NlbWJseV9sb2FkOiAoYXNzZW1ibHlOYW1lOiBzdHJpbmcpID0+IG51bWJlcjtcclxubGV0IGZpbmRfY2xhc3M6IChhc3NlbWJseUhhbmRsZTogbnVtYmVyLCBuYW1lc3BhY2U6IHN0cmluZywgY2xhc3NOYW1lOiBzdHJpbmcpID0+IG51bWJlcjtcclxubGV0IGZpbmRfbWV0aG9kOiAodHlwZUhhbmRsZTogbnVtYmVyLCBtZXRob2ROYW1lOiBzdHJpbmcsIHVua25vd25Bcmc6IG51bWJlcikgPT4gTWV0aG9kSGFuZGxlO1xyXG5sZXQgaW52b2tlX21ldGhvZDogKG1ldGhvZDogTWV0aG9kSGFuZGxlLCB0YXJnZXQ6IFN5c3RlbV9PYmplY3QsIGFyZ3NBcnJheVB0cjogbnVtYmVyLCBleGNlcHRpb25GbGFnSW50UHRyOiBudW1iZXIpID0+IFN5c3RlbV9PYmplY3Q7XHJcbmxldCBtb25vX3N0cmluZ19nZXRfdXRmODogKG1hbmFnZWRTdHJpbmc6IFN5c3RlbV9TdHJpbmcpID0+IE1vbm8uVXRmOFB0cjtcclxubGV0IG1vbm9fc3RyaW5nOiAoanNTdHJpbmc6IHN0cmluZykgPT4gU3lzdGVtX1N0cmluZztcclxuY29uc3QgYXBwQmluRGlyTmFtZSA9ICdhcHBCaW5EaXInO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1vbm9QbGF0Zm9ybTogUGxhdGZvcm0gPSB7XHJcbiAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KGxvYWRBc3NlbWJseVVybHM6IHN0cmluZ1tdKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBhdHRhY2hEZWJ1Z2dlckhvdGtleShsb2FkQXNzZW1ibHlVcmxzKTtcclxuXHJcbiAgICAgIC8vIG1vbm8uanMgYXNzdW1lcyB0aGUgZXhpc3RlbmNlIG9mIHRoaXNcclxuICAgICAgd2luZG93WydCcm93c2VyJ10gPSB7XHJcbiAgICAgICAgaW5pdDogKCkgPT4geyB9XHJcbiAgICAgIH07XHJcbiAgICAgIC8vIEVtc2NyaXB0ZW4gd29ya3MgYnkgZXhwZWN0aW5nIHRoZSBtb2R1bGUgY29uZmlnIHRvIGJlIGEgZ2xvYmFsXHJcbiAgICAgIHdpbmRvd1snTW9kdWxlJ10gPSBjcmVhdGVFbXNjcmlwdGVuTW9kdWxlSW5zdGFuY2UobG9hZEFzc2VtYmx5VXJscywgcmVzb2x2ZSwgcmVqZWN0KTtcclxuXHJcbiAgICAgIGFkZFNjcmlwdFRhZ3NUb0RvY3VtZW50KCk7XHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICBmaW5kTWV0aG9kOiBmaW5kTWV0aG9kLFxyXG5cclxuICBjYWxsRW50cnlQb2ludDogZnVuY3Rpb24gY2FsbEVudHJ5UG9pbnQoYXNzZW1ibHlOYW1lOiBzdHJpbmcsIGVudHJ5cG9pbnRNZXRob2Q6IHN0cmluZywgYXJnczogU3lzdGVtX09iamVjdFtdKTogdm9pZCB7XHJcbiAgICAvLyBQYXJzZSB0aGUgZW50cnlwb2ludE1ldGhvZCwgd2hpY2ggaXMgb2YgdGhlIGZvcm0gTXlBcHAuTXlOYW1lc3BhY2UuTXlUeXBlTmFtZTo6TXlNZXRob2ROYW1lXHJcbiAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3Qgc3VwcG9ydCBzcGVjaWZ5aW5nIGEgbWV0aG9kIG92ZXJsb2FkLCBzbyBpdCBoYXMgdG8gYmUgdW5pcXVlXHJcbiAgICBjb25zdCBlbnRyeXBvaW50U2VnbWVudHMgPSBlbnRyeXBvaW50TWV0aG9kLnNwbGl0KCc6OicpO1xyXG4gICAgaWYgKGVudHJ5cG9pbnRTZWdtZW50cy5sZW5ndGggIT0gMikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBlbnRyeSBwb2ludCBtZXRob2QgbmFtZTsgY291bGQgbm90IHJlc29sdmUgY2xhc3MgbmFtZSBhbmQgbWV0aG9kIG5hbWUuJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0eXBlRnVsbE5hbWUgPSBlbnRyeXBvaW50U2VnbWVudHNbMF07XHJcbiAgICBjb25zdCBtZXRob2ROYW1lID0gZW50cnlwb2ludFNlZ21lbnRzWzFdO1xyXG4gICAgY29uc3QgbGFzdERvdCA9IHR5cGVGdWxsTmFtZS5sYXN0SW5kZXhPZignLicpO1xyXG4gICAgY29uc3QgbmFtZXNwYWNlID0gbGFzdERvdCA+IC0xID8gdHlwZUZ1bGxOYW1lLnN1YnN0cmluZygwLCBsYXN0RG90KSA6ICcnO1xyXG4gICAgY29uc3QgdHlwZVNob3J0TmFtZSA9IGxhc3REb3QgPiAtMSA/IHR5cGVGdWxsTmFtZS5zdWJzdHJpbmcobGFzdERvdCArIDEpIDogdHlwZUZ1bGxOYW1lO1xyXG5cclxuICAgIGNvbnN0IGVudHJ5UG9pbnRNZXRob2RIYW5kbGUgPSBtb25vUGxhdGZvcm0uZmluZE1ldGhvZChhc3NlbWJseU5hbWUsIG5hbWVzcGFjZSwgdHlwZVNob3J0TmFtZSwgbWV0aG9kTmFtZSk7XHJcbiAgICBtb25vUGxhdGZvcm0uY2FsbE1ldGhvZChlbnRyeVBvaW50TWV0aG9kSGFuZGxlLCBudWxsLCBhcmdzKTtcclxuICB9LFxyXG5cclxuICBjYWxsTWV0aG9kOiBmdW5jdGlvbiBjYWxsTWV0aG9kKG1ldGhvZDogTWV0aG9kSGFuZGxlLCB0YXJnZXQ6IFN5c3RlbV9PYmplY3QsIGFyZ3M6IFN5c3RlbV9PYmplY3RbXSk6IFN5c3RlbV9PYmplY3Qge1xyXG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gNCkge1xyXG4gICAgICAvLyBIb3BlZnVsbHkgdGhpcyByZXN0cmljdGlvbiBjYW4gYmUgZWFzZWQgc29vbiwgYnV0IGZvciBub3cgbWFrZSBpdCBjbGVhciB3aGF0J3MgZ29pbmcgb25cclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDdXJyZW50bHksIE1vbm9QbGF0Zm9ybSBzdXBwb3J0cyBwYXNzaW5nIGEgbWF4aW11bSBvZiA0IGFyZ3VtZW50cyBmcm9tIEpTIHRvIC5ORVQuIFlvdSB0cmllZCB0byBwYXNzICR7YXJncy5sZW5ndGh9LmApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0YWNrID0gTW9kdWxlLnN0YWNrU2F2ZSgpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGFyZ3NCdWZmZXIgPSBNb2R1bGUuc3RhY2tBbGxvYyhhcmdzLmxlbmd0aCk7XHJcbiAgICAgIGNvbnN0IGV4Y2VwdGlvbkZsYWdNYW5hZ2VkSW50ID0gTW9kdWxlLnN0YWNrQWxsb2MoNCk7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIE1vZHVsZS5zZXRWYWx1ZShhcmdzQnVmZmVyICsgaSAqIDQsIGFyZ3NbaV0sICdpMzInKTtcclxuICAgICAgfVxyXG4gICAgICBNb2R1bGUuc2V0VmFsdWUoZXhjZXB0aW9uRmxhZ01hbmFnZWRJbnQsIDAsICdpMzInKTtcclxuXHJcbiAgICAgIGxldCB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICBjb25zdCByZXMgPSBpbnZva2VfbWV0aG9kKG1ldGhvZCwgdGFyZ2V0LCBhcmdzQnVmZmVyLCBleGNlcHRpb25GbGFnTWFuYWdlZEludCk7XHJcbiAgICAgIGxldCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIm1vbm8gY2FsbE1ldGhvZCB0b29rIFwiICsgKHQxIC0gdDApICsgXCIgbWlsbGlzZWNvbmRzLlwiKVxyXG5cclxuICAgICAgaWYgKE1vZHVsZS5nZXRWYWx1ZShleGNlcHRpb25GbGFnTWFuYWdlZEludCwgJ2kzMicpICE9PSAwKSB7XHJcbiAgICAgICAgLy8gSWYgdGhlIGV4Y2VwdGlvbiBmbGFnIGlzIHNldCwgdGhlIHJldHVybmVkIHZhbHVlIGlzIGV4Y2VwdGlvbi5Ub1N0cmluZygpXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1vbm9QbGF0Zm9ybS50b0phdmFTY3JpcHRTdHJpbmcoPFN5c3RlbV9TdHJpbmc+cmVzKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiByZXM7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBNb2R1bGUuc3RhY2tSZXN0b3JlKHN0YWNrKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICB0b0phdmFTY3JpcHRTdHJpbmc6IGZ1bmN0aW9uIHRvSmF2YVNjcmlwdFN0cmluZyhtYW5hZ2VkU3RyaW5nOiBTeXN0ZW1fU3RyaW5nKSB7XHJcbiAgICAvLyBDb21tZW50cyBmcm9tIG9yaWdpbmFsIE1vbm8gc2FtcGxlOlxyXG4gICAgLy9GSVhNRSB0aGlzIGlzIHdhc3RlZnVsbCwgd2UgY291bGQgcmVtb3ZlIHRoZSB0ZW1wIG1hbGxvYyBieSBnb2luZyB0aGUgVVRGMTYgcm91dGVcclxuICAgIC8vRklYTUUgdGhpcyBpcyB1bnNhZmUsIGN1eiByYXcgb2JqZWN0cyBjb3VsZCBiZSBHQydkLlxyXG5cclxuICAgIGNvbnN0IHV0ZjggPSBtb25vX3N0cmluZ19nZXRfdXRmOChtYW5hZ2VkU3RyaW5nKTtcclxuICAgIGNvbnN0IHJlcyA9IE1vZHVsZS5VVEY4VG9TdHJpbmcodXRmOCk7XHJcbiAgICBNb2R1bGUuX2ZyZWUodXRmOCBhcyBhbnkpO1xyXG4gICAgcmV0dXJuIHJlcztcclxuICB9LFxyXG5cclxuICB0b0RvdE5ldFN0cmluZzogZnVuY3Rpb24gdG9Eb3ROZXRTdHJpbmcoanNTdHJpbmc6IHN0cmluZyk6IFN5c3RlbV9TdHJpbmcge1xyXG4gICAgcmV0dXJuIG1vbm9fc3RyaW5nKGpzU3RyaW5nKTtcclxuICB9LFxyXG5cclxuICB0b1VpbnQ4QXJyYXk6IGZ1bmN0aW9uIHRvVWludDhBcnJheShhcnJheTogU3lzdGVtX0FycmF5PGFueT4pOiBVaW50OEFycmF5IHtcclxuICAgIGNvbnN0IGRhdGFQdHIgPSBnZXRBcnJheURhdGFQb2ludGVyKGFycmF5KTtcclxuICAgIGNvbnN0IGxlbmd0aCA9IE1vZHVsZS5nZXRWYWx1ZShkYXRhUHRyLCAnaTMyJyk7XHJcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoTW9kdWxlLkhFQVBVOC5idWZmZXIsIGRhdGFQdHIgKyA0LCBsZW5ndGgpO1xyXG4gIH0sXHJcblxyXG4gIGdldEFycmF5TGVuZ3RoOiBmdW5jdGlvbiBnZXRBcnJheUxlbmd0aChhcnJheTogU3lzdGVtX0FycmF5PGFueT4pOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1vZHVsZS5nZXRWYWx1ZShnZXRBcnJheURhdGFQb2ludGVyKGFycmF5KSwgJ2kzMicpO1xyXG4gIH0sXHJcblxyXG4gIGdldEFycmF5RW50cnlQdHI6IGZ1bmN0aW9uIGdldEFycmF5RW50cnlQdHI8VFB0ciBleHRlbmRzIFBvaW50ZXI+KGFycmF5OiBTeXN0ZW1fQXJyYXk8VFB0cj4sIGluZGV4OiBudW1iZXIsIGl0ZW1TaXplOiBudW1iZXIpOiBUUHRyIHtcclxuICAgIC8vIEZpcnN0IGJ5dGUgaXMgYXJyYXkgbGVuZ3RoLCBmb2xsb3dlZCBieSBlbnRyaWVzXHJcbiAgICBjb25zdCBhZGRyZXNzID0gZ2V0QXJyYXlEYXRhUG9pbnRlcihhcnJheSkgKyA0ICsgaW5kZXggKiBpdGVtU2l6ZTtcclxuICAgIHJldHVybiBhZGRyZXNzIGFzIGFueSBhcyBUUHRyO1xyXG4gIH0sXHJcblxyXG4gIGdldE9iamVjdEZpZWxkc0Jhc2VBZGRyZXNzOiBmdW5jdGlvbiBnZXRPYmplY3RGaWVsZHNCYXNlQWRkcmVzcyhyZWZlcmVuY2VUeXBlZE9iamVjdDogU3lzdGVtX09iamVjdCk6IFBvaW50ZXIge1xyXG4gICAgLy8gVGhlIGZpcnN0IHR3byBpbnQzMiB2YWx1ZXMgYXJlIGludGVybmFsIE1vbm8gZGF0YVxyXG4gICAgcmV0dXJuIChyZWZlcmVuY2VUeXBlZE9iamVjdCBhcyBhbnkgYXMgbnVtYmVyICsgOCkgYXMgYW55IGFzIFBvaW50ZXI7XHJcbiAgfSxcclxuXHJcbiAgcmVhZEludDMyRmllbGQ6IGZ1bmN0aW9uIHJlYWRIZWFwSW50MzIoYmFzZUFkZHJlc3M6IFBvaW50ZXIsIGZpZWxkT2Zmc2V0PzogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNb2R1bGUuZ2V0VmFsdWUoKGJhc2VBZGRyZXNzIGFzIGFueSBhcyBudW1iZXIpICsgKGZpZWxkT2Zmc2V0IHx8IDApLCAnaTMyJyk7XHJcbiAgfSxcclxuXHJcbiAgcmVhZEZsb2F0RmllbGQ6IGZ1bmN0aW9uIHJlYWRIZWFwRmxvYXQoYmFzZUFkZHJlc3M6IFBvaW50ZXIsIGZpZWxkT2Zmc2V0PzogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNb2R1bGUuZ2V0VmFsdWUoKGJhc2VBZGRyZXNzIGFzIGFueSBhcyBudW1iZXIpICsgKGZpZWxkT2Zmc2V0IHx8IDApLCAnZmxvYXQnKTtcclxuICB9LFxyXG5cclxuXHRyZWFkSW50MTZGaWVsZDogZnVuY3Rpb24gcmVhZEhlYXBJbnQxNihiYXNlQWRkcmVzczogUG9pbnRlciwgZmllbGRPZmZzZXQ/OiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIE1vZHVsZS5nZXRWYWx1ZSgoYmFzZUFkZHJlc3MgYXMgYW55IGFzIG51bWJlcikgKyAoZmllbGRPZmZzZXQgfHwgMCksICdpMTYnKTtcclxuXHR9LFxyXG5cclxuICByZWFkT2JqZWN0RmllbGQ6IGZ1bmN0aW9uIHJlYWRIZWFwT2JqZWN0PFQgZXh0ZW5kcyBTeXN0ZW1fT2JqZWN0PihiYXNlQWRkcmVzczogUG9pbnRlciwgZmllbGRPZmZzZXQ/OiBudW1iZXIpOiBUIHtcclxuICAgIHJldHVybiBNb2R1bGUuZ2V0VmFsdWUoKGJhc2VBZGRyZXNzIGFzIGFueSBhcyBudW1iZXIpICsgKGZpZWxkT2Zmc2V0IHx8IDApLCAnaTMyJykgYXMgYW55IGFzIFQ7XHJcbiAgfSxcclxuXHJcbiAgcmVhZFN0cmluZ0ZpZWxkOiBmdW5jdGlvbiByZWFkSGVhcE9iamVjdChiYXNlQWRkcmVzczogUG9pbnRlciwgZmllbGRPZmZzZXQ/OiBudW1iZXIpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgIGNvbnN0IGZpZWxkVmFsdWUgPSBNb2R1bGUuZ2V0VmFsdWUoKGJhc2VBZGRyZXNzIGFzIGFueSBhcyBudW1iZXIpICsgKGZpZWxkT2Zmc2V0IHx8IDApLCAnaTMyJyk7XHJcbiAgICByZXR1cm4gZmllbGRWYWx1ZSA9PT0gMCA/IG51bGwgOiBtb25vUGxhdGZvcm0udG9KYXZhU2NyaXB0U3RyaW5nKGZpZWxkVmFsdWUgYXMgYW55IGFzIFN5c3RlbV9TdHJpbmcpO1xyXG4gIH0sXHJcblxyXG4gIHJlYWRTdHJ1Y3RGaWVsZDogZnVuY3Rpb24gcmVhZFN0cnVjdEZpZWxkPFQgZXh0ZW5kcyBQb2ludGVyPihiYXNlQWRkcmVzczogUG9pbnRlciwgZmllbGRPZmZzZXQ/OiBudW1iZXIpOiBUIHtcclxuICAgIHJldHVybiAoKGJhc2VBZGRyZXNzIGFzIGFueSBhcyBudW1iZXIpICsgKGZpZWxkT2Zmc2V0IHx8IDApKSBhcyBhbnkgYXMgVDtcclxuICB9LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gZmluZEFzc2VtYmx5KGFzc2VtYmx5TmFtZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICBsZXQgYXNzZW1ibHlIYW5kbGUgPSBhc3NlbWJseUhhbmRsZUNhY2hlW2Fzc2VtYmx5TmFtZV07XHJcbiAgaWYgKCFhc3NlbWJseUhhbmRsZSkge1xyXG4gICAgYXNzZW1ibHlIYW5kbGUgPSBhc3NlbWJseV9sb2FkKGFzc2VtYmx5TmFtZSk7XHJcbiAgICBpZiAoIWFzc2VtYmx5SGFuZGxlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYXNzZW1ibHkgXCIke2Fzc2VtYmx5TmFtZX1cImApO1xyXG4gICAgfVxyXG4gICAgYXNzZW1ibHlIYW5kbGVDYWNoZVthc3NlbWJseU5hbWVdID0gYXNzZW1ibHlIYW5kbGU7XHJcbiAgfVxyXG4gIHJldHVybiBhc3NlbWJseUhhbmRsZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFR5cGUoYXNzZW1ibHlOYW1lOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nLCBjbGFzc05hbWU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgY29uc3QgZnVsbHlRdWFsaWZpZWRUeXBlTmFtZSA9IGBbJHthc3NlbWJseU5hbWV9XSR7bmFtZXNwYWNlfS4ke2NsYXNzTmFtZX1gO1xyXG4gIGxldCB0eXBlSGFuZGxlID0gdHlwZUhhbmRsZUNhY2hlW2Z1bGx5UXVhbGlmaWVkVHlwZU5hbWVdO1xyXG4gIGlmICghdHlwZUhhbmRsZSkge1xyXG4gICAgdHlwZUhhbmRsZSA9IGZpbmRfY2xhc3MoZmluZEFzc2VtYmx5KGFzc2VtYmx5TmFtZSksIG5hbWVzcGFjZSwgY2xhc3NOYW1lKTtcclxuICAgIGlmICghdHlwZUhhbmRsZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIHR5cGUgXCIke2NsYXNzTmFtZX1cIiBpbiBuYW1lc3BhY2UgXCIke25hbWVzcGFjZX1cIiBpbiBhc3NlbWJseSBcIiR7YXNzZW1ibHlOYW1lfVwiYCk7XHJcbiAgICB9XHJcbiAgICB0eXBlSGFuZGxlQ2FjaGVbZnVsbHlRdWFsaWZpZWRUeXBlTmFtZV0gPSB0eXBlSGFuZGxlO1xyXG4gIH1cclxuICByZXR1cm4gdHlwZUhhbmRsZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZE1ldGhvZChhc3NlbWJseU5hbWU6IHN0cmluZywgbmFtZXNwYWNlOiBzdHJpbmcsIGNsYXNzTmFtZTogc3RyaW5nLCBtZXRob2ROYW1lOiBzdHJpbmcpOiBNZXRob2RIYW5kbGUge1xyXG4gIGNvbnN0IGZ1bGx5UXVhbGlmaWVkTWV0aG9kTmFtZSA9IGBbJHthc3NlbWJseU5hbWV9XSR7bmFtZXNwYWNlfS4ke2NsYXNzTmFtZX06OiR7bWV0aG9kTmFtZX1gO1xyXG4gIGxldCBtZXRob2RIYW5kbGUgPSBtZXRob2RIYW5kbGVDYWNoZVtmdWxseVF1YWxpZmllZE1ldGhvZE5hbWVdO1xyXG4gIGlmICghbWV0aG9kSGFuZGxlKSB7XHJcbiAgICBtZXRob2RIYW5kbGUgPSBmaW5kX21ldGhvZChmaW5kVHlwZShhc3NlbWJseU5hbWUsIG5hbWVzcGFjZSwgY2xhc3NOYW1lKSwgbWV0aG9kTmFtZSwgLTEpO1xyXG4gICAgaWYgKCFtZXRob2RIYW5kbGUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBtZXRob2QgXCIke21ldGhvZE5hbWV9XCIgb24gdHlwZSBcIiR7bmFtZXNwYWNlfS4ke2NsYXNzTmFtZX1cImApO1xyXG4gICAgfVxyXG4gICAgbWV0aG9kSGFuZGxlQ2FjaGVbZnVsbHlRdWFsaWZpZWRNZXRob2ROYW1lXSA9IG1ldGhvZEhhbmRsZTtcclxuICB9XHJcbiAgcmV0dXJuIG1ldGhvZEhhbmRsZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU2NyaXB0VGFnc1RvRG9jdW1lbnQoKSB7XHJcbiAgLy8gTG9hZCBlaXRoZXIgdGhlIHdhc20gb3IgYXNtLmpzIHZlcnNpb24gb2YgdGhlIE1vbm8gcnVudGltZVxyXG4gIGNvbnN0IGJyb3dzZXJTdXBwb3J0c05hdGl2ZVdlYkFzc2VtYmx5ID0gdHlwZW9mIFdlYkFzc2VtYmx5ICE9PSAndW5kZWZpbmVkJyAmJiBXZWJBc3NlbWJseS52YWxpZGF0ZTtcclxuICBjb25zdCBtb25vUnVudGltZVVybEJhc2UgPSAnX2ZyYW1ld29yay8nICsgKGJyb3dzZXJTdXBwb3J0c05hdGl2ZVdlYkFzc2VtYmx5ID8gJ3dhc20nIDogJ2FzbWpzJyk7XHJcbiAgY29uc3QgbW9ub1J1bnRpbWVTY3JpcHRVcmwgPSBgJHttb25vUnVudGltZVVybEJhc2V9L21vbm8uanNgO1xyXG5cclxuICBpZiAoIWJyb3dzZXJTdXBwb3J0c05hdGl2ZVdlYkFzc2VtYmx5KSB7XHJcbiAgICAvLyBJbiB0aGUgYXNtanMgY2FzZSwgdGhlIGluaXRpYWwgbWVtb3J5IHN0cnVjdHVyZSBpcyBpbiBhIHNlcGFyYXRlIGZpbGUgd2UgbmVlZCB0byBkb3dubG9hZFxyXG4gICAgY29uc3QgbWVtaW5pdFhIUiA9IE1vZHVsZVsnbWVtb3J5SW5pdGlhbGl6ZXJSZXF1ZXN0J10gPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIG1lbWluaXRYSFIub3BlbignR0VUJywgYCR7bW9ub1J1bnRpbWVVcmxCYXNlfS9tb25vLmpzLm1lbWApO1xyXG4gICAgbWVtaW5pdFhIUi5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xyXG4gICAgbWVtaW5pdFhIUi5zZW5kKG51bGwpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2NyaXB0RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gIHNjcmlwdEVsZW0uc3JjID0gbW9ub1J1bnRpbWVTY3JpcHRVcmw7XHJcbiAgc2NyaXB0RWxlbS5kZWZlciA9IHRydWU7XHJcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHRFbGVtKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRW1zY3JpcHRlbk1vZHVsZUluc3RhbmNlKGxvYWRBc3NlbWJseVVybHM6IHN0cmluZ1tdLCBvblJlYWR5OiAoKSA9PiB2b2lkLCBvbkVycm9yOiAocmVhc29uPzogYW55KSA9PiB2b2lkKSB7XHJcbiAgY29uc3QgbW9kdWxlID0ge30gYXMgdHlwZW9mIE1vZHVsZTtcclxuICBjb25zdCB3YXNtQmluYXJ5RmlsZSA9ICdfZnJhbWV3b3JrL3dhc20vbW9uby53YXNtJztcclxuICBjb25zdCBhc21qc0NvZGVGaWxlID0gJ19mcmFtZXdvcmsvYXNtanMvbW9uby5hc20uanMnO1xyXG4gIGNvbnN0IHN1cHByZXNzTWVzc2FnZXMgPSBbJ0RFQlVHR0lORyBFTkFCTEVEJ107XHJcblxyXG4gIG1vZHVsZS5wcmludCA9IGxpbmUgPT4gKHN1cHByZXNzTWVzc2FnZXMuaW5kZXhPZihsaW5lKSA8IDAgJiYgY29uc29sZS5sb2coYFdBU006ICR7bGluZX1gKSk7XHJcbiAgbW9kdWxlLnByaW50RXJyID0gbGluZSA9PiBjb25zb2xlLmVycm9yKGBXQVNNOiAke2xpbmV9YCk7XHJcbiAgbW9kdWxlLnByZVJ1biA9IFtdO1xyXG4gIG1vZHVsZS5wb3N0UnVuID0gW107XHJcbiAgbW9kdWxlLnByZWxvYWRQbHVnaW5zID0gW107XHJcblxyXG4gIG1vZHVsZS5sb2NhdGVGaWxlID0gZmlsZU5hbWUgPT4ge1xyXG4gICAgc3dpdGNoIChmaWxlTmFtZSkge1xyXG4gICAgICBjYXNlICdtb25vLndhc20nOiByZXR1cm4gd2FzbUJpbmFyeUZpbGU7XHJcbiAgICAgIGNhc2UgJ21vbm8uYXNtLmpzJzogcmV0dXJuIGFzbWpzQ29kZUZpbGU7XHJcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBmaWxlTmFtZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBtb2R1bGUucHJlUnVuLnB1c2goKCkgPT4ge1xyXG4gICAgLy8gQnkgbm93LCBlbXNjcmlwdGVuIHNob3VsZCBiZSBpbml0aWFsaXNlZCBlbm91Z2ggdGhhdCB3ZSBjYW4gY2FwdHVyZSB0aGVzZSBtZXRob2RzIGZvciBsYXRlciB1c2VcclxuICAgIGFzc2VtYmx5X2xvYWQgPSBNb2R1bGUuY3dyYXAoJ21vbm9fd2FzbV9hc3NlbWJseV9sb2FkJywgJ251bWJlcicsIFsnc3RyaW5nJ10pO1xyXG4gICAgZmluZF9jbGFzcyA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX2Fzc2VtYmx5X2ZpbmRfY2xhc3MnLCAnbnVtYmVyJywgWydudW1iZXInLCAnc3RyaW5nJywgJ3N0cmluZyddKTtcclxuICAgIGZpbmRfbWV0aG9kID0gTW9kdWxlLmN3cmFwKCdtb25vX3dhc21fYXNzZW1ibHlfZmluZF9tZXRob2QnLCAnbnVtYmVyJywgWydudW1iZXInLCAnc3RyaW5nJywgJ251bWJlciddKTtcclxuICAgIGludm9rZV9tZXRob2QgPSBNb2R1bGUuY3dyYXAoJ21vbm9fd2FzbV9pbnZva2VfbWV0aG9kJywgJ251bWJlcicsIFsnbnVtYmVyJywgJ251bWJlcicsICdudW1iZXInXSk7XHJcbiAgICBtb25vX3N0cmluZ19nZXRfdXRmOCA9IE1vZHVsZS5jd3JhcCgnbW9ub193YXNtX3N0cmluZ19nZXRfdXRmOCcsICdudW1iZXInLCBbJ251bWJlciddKTtcclxuICAgIG1vbm9fc3RyaW5nID0gTW9kdWxlLmN3cmFwKCdtb25vX3dhc21fc3RyaW5nX2Zyb21fanMnLCAnbnVtYmVyJywgWydzdHJpbmcnXSk7XHJcblxyXG4gICAgTW9kdWxlLkZTX2NyZWF0ZVBhdGgoJy8nLCBhcHBCaW5EaXJOYW1lLCB0cnVlLCB0cnVlKTtcclxuICAgIE1PTk8ubG9hZGVkX2ZpbGVzID0gW107XHJcblxyXG4gICAgbG9hZEFzc2VtYmx5VXJscy5mb3JFYWNoKHVybCA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gZ2V0RmlsZU5hbWVGcm9tVXJsKHVybCk7XHJcbiAgICAgIGNvbnN0IHJ1bkRlcGVuZGVuY3lJZCA9IGBibGF6b3I6JHtmaWxlbmFtZX1gO1xyXG4gICAgICBhZGRSdW5EZXBlbmRlbmN5KHJ1bkRlcGVuZGVuY3lJZCk7XHJcbiAgICAgIGFzeW5jTG9hZCh1cmwpLnRoZW4oXHJcbiAgICAgICAgZGF0YSA9PiB7XHJcbiAgICAgICAgICBNb2R1bGUuRlNfY3JlYXRlRGF0YUZpbGUoYXBwQmluRGlyTmFtZSwgZmlsZW5hbWUsIGRhdGEsIHRydWUsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICBNT05PLmxvYWRlZF9maWxlcy5wdXNoKHRvQWJzb2x1dGVVcmwodXJsKSk7XHJcbiAgICAgICAgICByZW1vdmVSdW5EZXBlbmRlbmN5KHJ1bkRlcGVuZGVuY3lJZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvckluZm8gPT4ge1xyXG4gICAgICAgICAgLy8gSWYgaXQncyBhIDQwNCBvbiBhIC5wZGIsIHdlIGRvbid0IHdhbnQgdG8gYmxvY2sgdGhlIGFwcCBmcm9tIHN0YXJ0aW5nIHVwLlxyXG4gICAgICAgICAgLy8gV2UnbGwganVzdCBza2lwIHRoYXQgZmlsZSBhbmQgY29udGludWUgKHRob3VnaCB0aGUgNDA0IGlzIGxvZ2dlZCBpbiB0aGUgY29uc29sZSkuXHJcbiAgICAgICAgICAvLyBUaGlzIGhhcHBlbnMgaWYgeW91IGJ1aWxkIGEgRGVidWcgYnVpbGQgYnV0IHRoZW4gcnVuIGluIFByb2R1Y3Rpb24gZW52aXJvbm1lbnQuXHJcbiAgICAgICAgICBjb25zdCBpc1BkYjQwNCA9IGVycm9ySW5mbyBpbnN0YW5jZW9mIFhNTEh0dHBSZXF1ZXN0XHJcbiAgICAgICAgICAgICYmIGVycm9ySW5mby5zdGF0dXMgPT09IDQwNFxyXG4gICAgICAgICAgICAmJiBmaWxlbmFtZS5tYXRjaCgvXFwucGRiJC8pO1xyXG4gICAgICAgICAgaWYgKCFpc1BkYjQwNCkge1xyXG4gICAgICAgICAgICBvbkVycm9yKGVycm9ySW5mbyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZW1vdmVSdW5EZXBlbmRlbmN5KHJ1bkRlcGVuZGVuY3lJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIG1vZHVsZS5wb3N0UnVuLnB1c2goKCkgPT4ge1xyXG4gICAgY29uc3QgbG9hZF9ydW50aW1lID0gTW9kdWxlLmN3cmFwKCdtb25vX3dhc21fbG9hZF9ydW50aW1lJywgbnVsbCwgWydzdHJpbmcnLCAnbnVtYmVyJ10pO1xyXG4gICAgbG9hZF9ydW50aW1lKGFwcEJpbkRpck5hbWUsIGhhc0RlYnVnZ2luZ0VuYWJsZWQoKSA/IDEgOiAwKTtcclxuICAgIE1PTk8ubW9ub193YXNtX3J1bnRpbWVfaXNfcmVhZHkgPSB0cnVlO1xyXG4gICAgYXR0YWNoSW50ZXJvcEludm9rZXIoKTtcclxuICAgIG9uUmVhZHkoKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG1vZHVsZTtcclxufVxyXG5cclxuY29uc3QgYW5jaG9yVGFnRm9yQWJzb2x1dGVVcmxDb252ZXJzaW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuZnVuY3Rpb24gdG9BYnNvbHV0ZVVybChwb3NzaWJseVJlbGF0aXZlVXJsOiBzdHJpbmcpIHtcclxuICBhbmNob3JUYWdGb3JBYnNvbHV0ZVVybENvbnZlcnNpb25zLmhyZWYgPSBwb3NzaWJseVJlbGF0aXZlVXJsO1xyXG4gIHJldHVybiBhbmNob3JUYWdGb3JBYnNvbHV0ZVVybENvbnZlcnNpb25zLmhyZWY7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzeW5jTG9hZCh1cmwpIHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdDtcclxuICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIC8qIGFzeW5jOiAqLyB0cnVlKTtcclxuICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIHhocl9vbmxvYWQoKSB7XHJcbiAgICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCB8fCB4aHIuc3RhdHVzID09IDAgJiYgeGhyLnJlc3BvbnNlKSB7XHJcbiAgICAgICAgdmFyIGFzbSA9IG5ldyBVaW50OEFycmF5KHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgcmVzb2x2ZShhc20pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlamVjdCh4aHIpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgeGhyLm9uZXJyb3IgPSByZWplY3Q7XHJcbiAgICB4aHIuc2VuZChudWxsKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QXJyYXlEYXRhUG9pbnRlcjxUPihhcnJheTogU3lzdGVtX0FycmF5PFQ+KTogbnVtYmVyIHtcclxuICByZXR1cm4gPG51bWJlcj48YW55PmFycmF5ICsgMTI7IC8vIEZpcnN0IGJ5dGUgZnJvbSBoZXJlIGlzIGxlbmd0aCwgdGhlbiBmb2xsb3dpbmcgYnl0ZXMgYXJlIGVudHJpZXNcclxufVxyXG5cclxuZnVuY3Rpb24gYXR0YWNoSW50ZXJvcEludm9rZXIoKSB7XHJcbiAgY29uc3QgZG90TmV0RGlzcGF0Y2hlckludm9rZU1ldGhvZEhhbmRsZSA9IGZpbmRNZXRob2QoJ01vbm8uV2ViQXNzZW1ibHkuSW50ZXJvcCcsICdNb25vLldlYkFzc2VtYmx5LkludGVyb3AnLCAnTW9ub1dlYkFzc2VtYmx5SlNSdW50aW1lJywgJ0ludm9rZURvdE5ldCcpO1xyXG4gIGNvbnN0IGRvdE5ldERpc3BhdGNoZXJCZWdpbkludm9rZU1ldGhvZEhhbmRsZSA9IGZpbmRNZXRob2QoJ01vbm8uV2ViQXNzZW1ibHkuSW50ZXJvcCcsICdNb25vLldlYkFzc2VtYmx5LkludGVyb3AnLCAnTW9ub1dlYkFzc2VtYmx5SlNSdW50aW1lJywgJ0JlZ2luSW52b2tlRG90TmV0Jyk7XHJcblxyXG4gIERvdE5ldC5hdHRhY2hEaXNwYXRjaGVyKHtcclxuICAgIGJlZ2luSW52b2tlRG90TmV0RnJvbUpTOiAoY2FsbElkLCBhc3NlbWJseU5hbWUsIG1ldGhvZElkZW50aWZpZXIsIGRvdE5ldE9iamVjdElkLCBhcmdzSnNvbikgPT4ge1xyXG4gICAgICAvLyBBcyBhIGN1cnJlbnQgbGltaXRhdGlvbiwgd2UgY2FuIG9ubHkgcGFzcyA0IGFyZ3MuIEZvcnR1bmF0ZWx5IHdlIG9ubHkgbmVlZCBvbmUgb2ZcclxuICAgICAgLy8gJ2Fzc2VtYmx5TmFtZScgb3IgJ2RvdE5ldE9iamVjdElkJywgc28gb3ZlcmxvYWQgdGhlbSBpbiBhIHNpbmdsZSBzbG90XHJcbiAgICAgIGNvbnN0IGFzc2VtYmx5TmFtZU9yRG90TmV0T2JqZWN0SWQgPSBkb3ROZXRPYmplY3RJZFxyXG4gICAgICAgID8gZG90TmV0T2JqZWN0SWQudG9TdHJpbmcoKVxyXG4gICAgICAgIDogYXNzZW1ibHlOYW1lO1xyXG4gICAgICBcclxuICAgICAgbW9ub1BsYXRmb3JtLmNhbGxNZXRob2QoZG90TmV0RGlzcGF0Y2hlckJlZ2luSW52b2tlTWV0aG9kSGFuZGxlLCBudWxsLCBbXHJcbiAgICAgICAgY2FsbElkID8gbW9ub1BsYXRmb3JtLnRvRG90TmV0U3RyaW5nKGNhbGxJZC50b1N0cmluZygpKSA6IG51bGwsXHJcbiAgICAgICAgbW9ub1BsYXRmb3JtLnRvRG90TmV0U3RyaW5nKGFzc2VtYmx5TmFtZU9yRG90TmV0T2JqZWN0SWQhKSxcclxuICAgICAgICBtb25vUGxhdGZvcm0udG9Eb3ROZXRTdHJpbmcobWV0aG9kSWRlbnRpZmllciksXHJcbiAgICAgICAgbW9ub1BsYXRmb3JtLnRvRG90TmV0U3RyaW5nKGFyZ3NKc29uKVxyXG4gICAgICBdKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW52b2tlRG90TmV0RnJvbUpTOiAoYXNzZW1ibHlOYW1lLCBtZXRob2RJZGVudGlmaWVyLCBkb3ROZXRPYmplY3RJZCwgYXJnc0pzb24pID0+IHtcclxuICAgICAgY29uc3QgcmVzdWx0SnNvblN0cmluZ1B0ciA9IG1vbm9QbGF0Zm9ybS5jYWxsTWV0aG9kKGRvdE5ldERpc3BhdGNoZXJJbnZva2VNZXRob2RIYW5kbGUsIG51bGwsIFtcclxuICAgICAgICBhc3NlbWJseU5hbWUgPyBtb25vUGxhdGZvcm0udG9Eb3ROZXRTdHJpbmcoYXNzZW1ibHlOYW1lKSA6IG51bGwsXHJcbiAgICAgICAgbW9ub1BsYXRmb3JtLnRvRG90TmV0U3RyaW5nKG1ldGhvZElkZW50aWZpZXIpLFxyXG4gICAgICAgIGRvdE5ldE9iamVjdElkID8gbW9ub1BsYXRmb3JtLnRvRG90TmV0U3RyaW5nKGRvdE5ldE9iamVjdElkLnRvU3RyaW5nKCkpIDogbnVsbCxcclxuICAgICAgICBtb25vUGxhdGZvcm0udG9Eb3ROZXRTdHJpbmcoYXJnc0pzb24pXHJcbiAgICAgIF0pIGFzIFN5c3RlbV9TdHJpbmc7XHJcbiAgICAgIHJldHVybiByZXN1bHRKc29uU3RyaW5nUHRyXHJcbiAgICAgICAgPyBtb25vUGxhdGZvcm0udG9KYXZhU2NyaXB0U3RyaW5nKHJlc3VsdEpzb25TdHJpbmdQdHIpXHJcbiAgICAgICAgOiBudWxsO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0RmlsZU5hbWVGcm9tVXJsKHVybDogc3RyaW5nKSB7XHJcbiAgLy8gVGhpcyBjb3VsZCBhbHNvIGJlIGNhbGxlZCBcImdldCBsYXN0IHBhdGggc2VnbWVudCBmcm9tIFVSTFwiLCBidXQgdGhlIHByaW1hcnlcclxuICAvLyB1c2UgY2FzZSBpcyB0byBleHRyYWN0IHRoaW5ncyB0aGF0IGxvb2sgbGlrZSBmaWxlbmFtZXNcclxuICBjb25zdCBsYXN0U2VnbWVudCA9IHVybC5zdWJzdHJpbmcodXJsLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcclxuICBjb25zdCBxdWVyeVN0cmluZ1N0YXJ0UG9zID0gbGFzdFNlZ21lbnQuaW5kZXhPZignPycpO1xyXG4gIHJldHVybiBxdWVyeVN0cmluZ1N0YXJ0UG9zIDwgMCA/IGxhc3RTZWdtZW50IDogbGFzdFNlZ21lbnQuc3Vic3RyaW5nKDAsIHF1ZXJ5U3RyaW5nU3RhcnRQb3MpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXNzZW1ibHlOYW1lRnJvbVVybCh1cmw6IHN0cmluZykge1xyXG4gIHJldHVybiBnZXRGaWxlTmFtZUZyb21VcmwodXJsKS5yZXBsYWNlKC9cXC5kbGwkLywgJycpO1xyXG59XHJcbiIsImltcG9ydCB7IFN5c3RlbV9BcnJheSwgTWV0aG9kSGFuZGxlLCBTeXN0ZW1fU3RyaW5nIH0gZnJvbSAnLi4vUGxhdGZvcm0vUGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBSZW5kZXJCYXRjaCwgQXJyYXlTZWdtZW50LCBBcnJheVJhbmdlLCBSZW5kZXJUcmVlRWRpdCwgUmVuZGVyVHJlZUZyYW1lLCBFZGl0VHlwZSwgRnJhbWVUeXBlLCBBcnJheVZhbHVlcyB9IGZyb20gJy4vUmVuZGVyQmF0Y2gvUmVuZGVyQmF0Y2gnO1xyXG5pbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4uL0Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgRXZlbnREZWxlZ2F0b3IgfSBmcm9tICcuL0V2ZW50RGVsZWdhdG9yJztcclxuaW1wb3J0IHsgRXZlbnRGb3JEb3ROZXQsIFVJRXZlbnRBcmdzIH0gZnJvbSAnLi9FdmVudEZvckRvdE5ldCc7XHJcbmltcG9ydCB7IGFwcGx5Q2FwdHVyZUlkVG9FbGVtZW50IH0gZnJvbSAnLi9FbGVtZW50UmVmZXJlbmNlQ2FwdHVyZSc7XHJcblxyXG5jb25zdCBwcmV2ZW50RGVmYXVsdEV2ZW50czogeyBbZXZlbnRUeXBlOiBzdHJpbmddOiBib29sZWFuIH0gPSB7IHN1Ym1pdDogdHJ1ZSB9O1xyXG5cclxuaW1wb3J0IHsgQmxhem9yRE9NRWxlbWVudCB9IGZyb20gJy4vRWxlbWVudHMvQmxhem9yRE9NRWxlbWVudCc7XHJcbmltcG9ydCB7IGNyZWF0ZUJsYXpvckRPTUNvbXBvbmVudCwgY3JlYXRlQmxhem9yRE9NRWxlbWVudCwgY3JlYXRlQmxhem9yTWFya3VwQ29tcG9uZW50IH0gZnJvbSAnLi9FbGVtZW50cy9FbGVtZW50Q3JlYXRvcnMnO1xyXG5cclxubGV0IHJhaXNlRXZlbnRNZXRob2Q6IE1ldGhvZEhhbmRsZTtcclxubGV0IHJlbmRlckNvbXBvbmVudE1ldGhvZDogTWV0aG9kSGFuZGxlO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJyb3dzZXJSZW5kZXJlciB7XHJcbiAgLy8gcHJpdmF0ZSBpcyBiZXR0ZXIgKHRvZG86IEkgZG9uJ3QgbGlrZSBpdCEpXHJcbiAgcHVibGljIGV2ZW50RGVsZWdhdG9yOiBFdmVudERlbGVnYXRvcjtcclxuICBwcml2YXRlIHJlYWRvbmx5IGNoaWxkQ29tcG9uZW50TG9jYXRpb25zOiB7IFtjb21wb25lbnRJZDogbnVtYmVyXTogQmxhem9yRE9NRWxlbWVudCB9ID0ge307XHJcblxyXG4gIHB1YmxpYyByZWFkb25seSBicm93c2VyUmVuZGVyZXJJZDogbnVtYmVyO1xyXG4gIHByaXZhdGUgcmVuZGVyTm86IG51bWJlciA9IDA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJlbmRlcmVySWQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5icm93c2VyUmVuZGVyZXJJZCA9IHJlbmRlcmVySWQ7XHJcbiAgICB0aGlzLmV2ZW50RGVsZWdhdG9yID0gbmV3IEV2ZW50RGVsZWdhdG9yKChldmVudCwgY29tcG9uZW50SWQsIGV2ZW50SGFuZGxlcklkLCBldmVudEFyZ3MpID0+IHtcclxuICAgICAgcmFpc2VFdmVudChldmVudCwgdGhpcy5icm93c2VyUmVuZGVyZXJJZCwgY29tcG9uZW50SWQsIGV2ZW50SGFuZGxlcklkLCBldmVudEFyZ3MpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYmVnaW5SZW5kZXIoKSB7XHJcbiAgICB0aGlzLnJlbmRlck5vKys7XHJcbiAgICBjb25zb2xlLmxvZyhcInJlbmRlckJhdGNoIFwiICsgdGhpcy5yZW5kZXJObyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZW5kUmVuZGVyKCkge1xyXG4gICAgdGhpcy5yZW5kZXJOby0tO1xyXG5cclxuICAgIHRoaXMuc2VuZFF1ZXVlRXZlbnRzKCk7XHJcbiAgICBjb25zb2xlLmxvZyhcInJlbmRlckJhdGNoIFwiICsgKHRoaXMucmVuZGVyTm8rMSkgKyBcIiBmaW5pc2hlZFwiKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhdHRhY2hSb290Q29tcG9uZW50VG9FbGVtZW50KGNvbXBvbmVudElkOiBudW1iZXIsIGVsZW1lbnQ6IEVsZW1lbnQpIHtcclxuICAgIHRoaXMuYXR0YWNoQ29tcG9uZW50VG9FbGVtZW50KGNvbXBvbmVudElkLCBlbGVtZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXR0YWNoQ29tcG9uZW50VG9FbGVtZW50KGNvbXBvbmVudElkOiBudW1iZXIsIGVsZW1lbnQ6IE5vZGUpIHtcclxuICAgIGxldCBibGF6b3JFbGVtZW50ID0gbmV3IEJsYXpvckRPTUVsZW1lbnQodGhpcywgZWxlbWVudCk7XHJcbiAgICB0aGlzLmF0dGFjaEJsYXpvckNvbXBvbmVudFRvRWxlbWVudChjb21wb25lbnRJZCwgYmxhem9yRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlQ29tcG9uZW50KGJhdGNoOiBSZW5kZXJCYXRjaCwgY29tcG9uZW50SWQ6IG51bWJlciwgZWRpdHM6IEFycmF5U2VnbWVudDxSZW5kZXJUcmVlRWRpdD4sIHJlZmVyZW5jZUZyYW1lczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZUZyYW1lPikge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuY2hpbGRDb21wb25lbnRMb2NhdGlvbnNbY29tcG9uZW50SWRdO1xyXG4gICAgaWYgKCFlbGVtZW50KSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gZWxlbWVudCBpcyBjdXJyZW50bHkgYXNzb2NpYXRlZCB3aXRoIGNvbXBvbmVudCAke2NvbXBvbmVudElkfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXBwbHlFZGl0cyhiYXRjaCwgY29tcG9uZW50SWQsIGVsZW1lbnQsIDAsIGVkaXRzLCByZWZlcmVuY2VGcmFtZXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc3Bvc2VDb21wb25lbnQoY29tcG9uZW50SWQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5jaGlsZENvbXBvbmVudExvY2F0aW9uc1tjb21wb25lbnRJZF0uZGlzcG9zZSgpO1xyXG4gICAgZGVsZXRlIHRoaXMuY2hpbGRDb21wb25lbnRMb2NhdGlvbnNbY29tcG9uZW50SWRdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhdHRhY2hCbGF6b3JDb21wb25lbnRUb0VsZW1lbnQoY29tcG9uZW50SWQ6IG51bWJlciwgZWxlbWVudDogQmxhem9yRE9NRWxlbWVudCkge1xyXG4gICAgdGhpcy5jaGlsZENvbXBvbmVudExvY2F0aW9uc1tjb21wb25lbnRJZF0gPSBlbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhcHBseUVkaXRzKGJhdGNoOiBSZW5kZXJCYXRjaCwgY29tcG9uZW50SWQ6IG51bWJlciwgcGFyZW50OiBCbGF6b3JET01FbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGVkaXRzOiBBcnJheVNlZ21lbnQ8UmVuZGVyVHJlZUVkaXQ+LCByZWZlcmVuY2VGcmFtZXM6IEFycmF5VmFsdWVzPFJlbmRlclRyZWVGcmFtZT4pIHtcclxuICAgIGxldCB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgIGxldCBjdXJyZW50RGVwdGggPSAwO1xyXG4gICAgbGV0IGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCA9IGNoaWxkSW5kZXg7XHJcblxyXG4gICAgY29uc3QgYXJyYXlTZWdtZW50UmVhZGVyID0gYmF0Y2guYXJyYXlTZWdtZW50UmVhZGVyO1xyXG4gICAgY29uc3QgZWRpdFJlYWRlciA9IGJhdGNoLmVkaXRSZWFkZXI7XHJcbiAgICBjb25zdCBmcmFtZVJlYWRlciA9IGJhdGNoLmZyYW1lUmVhZGVyO1xyXG4gICAgY29uc3QgZWRpdHNWYWx1ZXMgPSBhcnJheVNlZ21lbnRSZWFkZXIudmFsdWVzKGVkaXRzKTtcclxuICAgIGNvbnN0IGVkaXRzT2Zmc2V0ID0gYXJyYXlTZWdtZW50UmVhZGVyLm9mZnNldChlZGl0cyk7XHJcbiAgICBjb25zdCBlZGl0c0xlbmd0aCA9IGFycmF5U2VnbWVudFJlYWRlci5jb3VudChlZGl0cyk7XHJcbiAgICBjb25zdCBtYXhFZGl0SW5kZXhFeGNsID0gZWRpdHNPZmZzZXQgKyBlZGl0c0xlbmd0aDtcclxuXHJcbiAgICBwYXJlbnQub25ET01VcGRhdGluZygpO1xyXG5cclxuICAgIHZhciBlbGVtZW50U3RhY2sgPSBuZXcgQXJyYXkoKTtcclxuICAgIGVsZW1lbnRTdGFjay5wdXNoKHBhcmVudCk7XHJcblxyXG4gICAgdmFyIGVsZW1lbnRzTmVlZFJlbmRlcmluZyA9IG5ldyBBcnJheSgpO1xyXG4gICAgZWxlbWVudHNOZWVkUmVuZGVyaW5nLnB1c2gocGFyZW50KTtcclxuXHJcbiAgICBmb3IgKGxldCBlZGl0SW5kZXggPSBlZGl0c09mZnNldDsgZWRpdEluZGV4IDwgbWF4RWRpdEluZGV4RXhjbDsgZWRpdEluZGV4KyspIHtcclxuICAgICAgY29uc3QgZWRpdCA9IGJhdGNoLmRpZmZSZWFkZXIuZWRpdHNFbnRyeShlZGl0c1ZhbHVlcywgZWRpdEluZGV4KTtcclxuICAgICAgY29uc3QgZWRpdFR5cGUgPSBlZGl0UmVhZGVyLmVkaXRUeXBlKGVkaXQpO1xyXG4gICAgICBzd2l0Y2ggKGVkaXRUeXBlKSB7XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5wcmVwZW5kRnJhbWU6IHtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lSW5kZXggPSBlZGl0UmVhZGVyLm5ld1RyZWVJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGZyYW1lID0gYmF0Y2gucmVmZXJlbmNlRnJhbWVzRW50cnkocmVmZXJlbmNlRnJhbWVzLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IGVkaXRSZWFkZXIuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgdGhpcy5pbnNlcnRGcmFtZShiYXRjaCwgY29tcG9uZW50SWQsIHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4LCByZWZlcmVuY2VGcmFtZXMsIGZyYW1lLCBmcmFtZUluZGV4KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnJlbW92ZUZyYW1lOiB7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSBlZGl0UmVhZGVyLnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIHRoaXMucmVtb3ZlTm9kZUZyb21ET00ocGFyZW50LCBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggKyBzaWJsaW5nSW5kZXgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUuc2V0QXR0cmlidXRlOiB7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZUluZGV4ID0gZWRpdFJlYWRlci5uZXdUcmVlSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBjb25zdCBmcmFtZSA9IGJhdGNoLnJlZmVyZW5jZUZyYW1lc0VudHJ5KHJlZmVyZW5jZUZyYW1lcywgZnJhbWVJbmRleCk7XHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSBlZGl0UmVhZGVyLnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBwYXJlbnQuZ2V0TG9naWNhbENoaWxkKGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCkgYXMgRWxlbWVudDtcclxuXHJcbiAgICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJsYXpvckRPTUVsZW1lbnQgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgY29uc3QgYmUgPSBjcmVhdGVCbGF6b3JET01FbGVtZW50KHRoaXMsIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBiZS5hcHBseUF0dHJpYnV0ZShiYXRjaCwgY29tcG9uZW50SWQsIGZyYW1lKTtcclxuICAgICAgICAgICAgYmUuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJsYXpvckVsZW1lbnQgPSBlbGVtZW50IGFzIGFueSBhcyBCbGF6b3JET01FbGVtZW50O1xyXG4gICAgICAgICAgICBibGF6b3JFbGVtZW50LmFwcGx5QXR0cmlidXRlKGJhdGNoLCBjb21wb25lbnRJZCwgZnJhbWUpO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudHNOZWVkUmVuZGVyaW5nLmZpbmRJbmRleCh4ID0+IHggPT0gYmxhem9yRWxlbWVudCkgPT0gLTEpXHJcbiAgICAgICAgICAgICAgZWxlbWVudHNOZWVkUmVuZGVyaW5nLnB1c2goYmxhem9yRWxlbWVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5yZW1vdmVBdHRyaWJ1dGU6IHtcclxuICAgICAgICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCBoYXZlIHRvIGRpc3Bvc2UgdGhlIGluZm8gd2UgdHJhY2sgYWJvdXQgZXZlbnQgaGFuZGxlcnMgaGVyZSwgYmVjYXVzZSB0aGVcclxuICAgICAgICAgIC8vIGRpc3Bvc2VkIGV2ZW50IGhhbmRsZXIgSURzIGFyZSBkZWxpdmVyZWQgc2VwYXJhdGVseSAoaW4gdGhlICdkaXNwb3NlZEV2ZW50SGFuZGxlcklkcycgYXJyYXkpXHJcbiAgICAgICAgICBjb25zdCBzaWJsaW5nSW5kZXggPSBlZGl0UmVhZGVyLnNpYmxpbmdJbmRleChlZGl0KTtcclxuICAgICAgICAgIC8vY29uc3QgZWxlbWVudCA9IGdldExvZ2ljYWxDaGlsZChwYXJlbnQsIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCk7XHJcbiAgICAgICAgICAvL2lmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgIC8vXHRjb25zdCBhdHRyaWJ1dGVOYW1lID0gZWRpdFJlYWRlci5yZW1vdmVkQXR0cmlidXRlTmFtZShlZGl0KSE7XHJcbiAgICAgICAgICAvL1x0Ly8gRmlyc3QgdHJ5IHRvIHJlbW92ZSBhbnkgc3BlY2lhbCBwcm9wZXJ0eSB3ZSB1c2UgZm9yIHRoaXMgYXR0cmlidXRlXHJcbiAgICAgICAgICAvL1x0aWYgKCF0aGlzLnRyeUFwcGx5U3BlY2lhbFByb3BlcnR5KGJhdGNoLCBlbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCBudWxsKSkge1xyXG4gICAgICAgICAgLy9cdFx0Ly8gSWYgdGhhdCdzIG5vdCBhcHBsaWNhYmxlLCBpdCdzIGEgcmVndWxhciBET00gYXR0cmlidXRlIHNvIHJlbW92ZSB0aGF0XHJcbiAgICAgICAgICAvL1x0XHRlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgICAgICAgIC8vXHR9XHJcbiAgICAgICAgICAvL30gZWxzZSB7XHJcbiAgICAgICAgICAvL1x0dGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcmVtb3ZlIGF0dHJpYnV0ZSBmcm9tIG5vbi1lbGVtZW50IGNoaWxkYCk7XHJcbiAgICAgICAgICAvL31cclxuICAgICAgICAgIC8vYnJlYWs7XHRcdFx0XHRcclxuXHJcbiAgICAgICAgICBwYXJlbnQucmVtb3ZlQXR0cmlidXRlKGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCArIHNpYmxpbmdJbmRleCwgZWRpdFJlYWRlci5yZW1vdmVkQXR0cmlidXRlTmFtZShlZGl0KSEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUudXBkYXRlVGV4dDoge1xyXG4gICAgICAgICAgY29uc3QgZnJhbWVJbmRleCA9IGVkaXRSZWFkZXIubmV3VHJlZUluZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3QgZnJhbWUgPSBiYXRjaC5yZWZlcmVuY2VGcmFtZXNFbnRyeShyZWZlcmVuY2VGcmFtZXMsIGZyYW1lSW5kZXgpO1xyXG4gICAgICAgICAgY29uc3Qgc2libGluZ0luZGV4ID0gZWRpdFJlYWRlci5zaWJsaW5nSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBwYXJlbnQudXBkYXRlVGV4dChjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggKyBzaWJsaW5nSW5kZXgsIGZyYW1lUmVhZGVyLnRleHRDb250ZW50KGZyYW1lKSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIEVkaXRUeXBlLnVwZGF0ZU1hcmt1cDoge1xyXG4gICAgICAgICAgY29uc3QgZnJhbWVJbmRleCA9IGVkaXRSZWFkZXIubmV3VHJlZUluZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3QgZnJhbWUgPSBiYXRjaC5yZWZlcmVuY2VGcmFtZXNFbnRyeShyZWZlcmVuY2VGcmFtZXMsIGZyYW1lSW5kZXgpO1xyXG4gICAgICAgICAgY29uc3Qgc2libGluZ0luZGV4ID0gZWRpdFJlYWRlci5zaWJsaW5nSW5kZXgoZWRpdCk7XHJcbiAgICAgICAgICBwYXJlbnQucmVtb3ZlRnJvbURvbShjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggKyBzaWJsaW5nSW5kZXgpO1xyXG4gICAgICAgICAgdGhpcy5pbnNlcnRNYXJrdXAoYmF0Y2gsIHBhcmVudCwgY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4LCBmcmFtZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSBFZGl0VHlwZS5zdGVwSW46IHtcclxuICAgICAgICAgIGNvbnN0IHNpYmxpbmdJbmRleCA9IGVkaXRSZWFkZXIuc2libGluZ0luZGV4KGVkaXQpO1xyXG4gICAgICAgICAgY29uc3Qgc3RlcEluRWxlbWVudCA9IHBhcmVudC5nZXRMb2dpY2FsQ2hpbGQoY2hpbGRJbmRleEF0Q3VycmVudERlcHRoICsgc2libGluZ0luZGV4KSE7XHJcblxyXG4gICAgICAgICAgZWxlbWVudFN0YWNrLnB1c2gocGFyZW50KTtcclxuICAgICAgICAgIC8vIGlmIHN0ZXBJbkVsZW1lbnQgaXMgYSBzaW1wbGUgRE9NIGVsZW1lbnQsIGNyZWF0ZSBhIGVsZW1lbnRcclxuICAgICAgICAgIGlmIChzdGVwSW5FbGVtZW50IGluc3RhbmNlb2YgQmxhem9yRE9NRWxlbWVudCA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBwYXJlbnQgPSBjcmVhdGVCbGF6b3JET01FbGVtZW50KHRoaXMsIHN0ZXBJbkVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBhcmVudCA9IHN0ZXBJbkVsZW1lbnQgYXMgQmxhem9yRE9NRWxlbWVudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHBhcmVudC5vbkRPTVVwZGF0aW5nKCk7XHJcblxyXG4gICAgICAgICAgY3VycmVudERlcHRoKys7XHJcbiAgICAgICAgICBjaGlsZEluZGV4QXRDdXJyZW50RGVwdGggPSAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgRWRpdFR5cGUuc3RlcE91dDoge1xyXG4gICAgICAgICAgZWxlbWVudHNOZWVkUmVuZGVyaW5nLnB1c2gocGFyZW50KTtcclxuXHJcbiAgICAgICAgICBwYXJlbnQgPSBlbGVtZW50U3RhY2sucG9wKCk7XHJcbiAgICAgICAgICBjdXJyZW50RGVwdGgtLTtcclxuICAgICAgICAgIGNoaWxkSW5kZXhBdEN1cnJlbnREZXB0aCA9IGN1cnJlbnREZXB0aCA9PT0gMCA/IGNoaWxkSW5kZXggOiAwOyAvLyBUaGUgY2hpbGRJbmRleCBpcyBvbmx5IGV2ZXIgbm9uemVybyBhdCB6ZXJvIGRlcHRoXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgY29uc3QgdW5rbm93blR5cGU6IG5ldmVyID0gZWRpdFR5cGU7IC8vIENvbXBpbGUtdGltZSB2ZXJpZmljYXRpb24gdGhhdCB0aGUgc3dpdGNoIHdhcyBleGhhdXN0aXZlXHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gZWRpdCB0eXBlOiAke3Vua25vd25UeXBlfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBuZWVkUmVuZGVyaW5nID0gZWxlbWVudHNOZWVkUmVuZGVyaW5nLnBvcCgpIGFzIEJsYXpvckRPTUVsZW1lbnQ7XHJcbiAgICB3aGlsZSAobmVlZFJlbmRlcmluZykge1xyXG4gICAgICBuZWVkUmVuZGVyaW5nLm9uRE9NVXBkYXRlZCgpO1xyXG4gICAgICBuZWVkUmVuZGVyaW5nID0gZWxlbWVudHNOZWVkUmVuZGVyaW5nLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgbGV0IG5hbWUgPSBcIlwiO1xyXG4gICAgaWYgKHBhcmVudC5jb25zdHJ1Y3RvcikgbmFtZSA9IHBhcmVudC5jb25zdHJ1Y3Rvci5uYW1lO1xyXG4gICAgY29uc29sZS5sb2coXCJ1cGRhdGVDb21wb25lbnQgXCIgKyBjb21wb25lbnRJZCArIFwiKFwiICsgbmFtZSArIFwiKSB0b29rIFwiICsgKHQxIC0gdDApICsgXCIgbWlsbHMgZm9yIFwiICsgZWRpdHNMZW5ndGgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRGcmFtZShiYXRjaDogUmVuZGVyQmF0Y2gsIGNvbXBvbmVudElkOiBudW1iZXIsIHBhcmVudDogQmxhem9yRE9NRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyLCBmcmFtZXM6IEFycmF5VmFsdWVzPFJlbmRlclRyZWVGcmFtZT4sIGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUsIGZyYW1lSW5kZXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBjb25zdCBmcmFtZVJlYWRlciA9IGJhdGNoLmZyYW1lUmVhZGVyO1xyXG4gICAgY29uc3QgZnJhbWVUeXBlID0gZnJhbWVSZWFkZXIuZnJhbWVUeXBlKGZyYW1lKTtcclxuICAgIHN3aXRjaCAoZnJhbWVUeXBlKSB7XHJcbiAgICAgIGNhc2UgRnJhbWVUeXBlLmVsZW1lbnQ6XHJcbiAgICAgICAgdGhpcy5pbnNlcnRFbGVtZW50KGJhdGNoLCBjb21wb25lbnRJZCwgcGFyZW50LCBjaGlsZEluZGV4LCBmcmFtZXMsIGZyYW1lLCBmcmFtZUluZGV4KTtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgY2FzZSBGcmFtZVR5cGUudGV4dDpcclxuICAgICAgICB0aGlzLmluc2VydFRleHQoYmF0Y2gsIHBhcmVudCwgY2hpbGRJbmRleCwgZnJhbWUpO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5hdHRyaWJ1dGU6XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdHRyaWJ1dGUgZnJhbWVzIHNob3VsZCBvbmx5IGJlIHByZXNlbnQgYXMgbGVhZGluZyBjaGlsZHJlbiBvZiBlbGVtZW50IGZyYW1lcy4nKTtcclxuICAgICAgY2FzZSBGcmFtZVR5cGUuY29tcG9uZW50OlxyXG4gICAgICAgIHRoaXMuaW5zZXJ0Q29tcG9uZW50KGJhdGNoLCBwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lLCBmcmFtZXMsIGZyYW1lSW5kZXgpO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgICBjYXNlIEZyYW1lVHlwZS5yZWdpb246XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zZXJ0RnJhbWVSYW5nZShiYXRjaCwgY29tcG9uZW50SWQsIHBhcmVudCwgY2hpbGRJbmRleCwgZnJhbWVzLCBmcmFtZUluZGV4ICsgMSwgZnJhbWVJbmRleCArIGZyYW1lUmVhZGVyLnN1YnRyZWVMZW5ndGgoZnJhbWUpKTtcclxuICAgICAgY2FzZSBGcmFtZVR5cGUuZWxlbWVudFJlZmVyZW5jZUNhcHR1cmU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbGV0IHBhcmVudEVsZW1lbnQgPSBwYXJlbnQuZ2V0Q2xvc2VzdERvbUVsZW1lbnQoKSBhcyBFbGVtZW50O1xyXG4gICAgICAgICAgaWYgKHBhcmVudEVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGFwcGx5Q2FwdHVyZUlkVG9FbGVtZW50KHBhcmVudEVsZW1lbnQsIGZyYW1lUmVhZGVyLmVsZW1lbnRSZWZlcmVuY2VDYXB0dXJlSWQoZnJhbWUpISk7XHJcbiAgICAgICAgICAgIHJldHVybiAwOyAvLyBBIFwiY2FwdHVyZVwiIGlzIGEgY2hpbGQgaW4gdGhlIGRpZmYsIGJ1dCBoYXMgbm8gbm9kZSBpbiB0aGUgRE9NXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZmVyZW5jZSBjYXB0dXJlIGZyYW1lcyBjYW4gb25seSBiZSBjaGlsZHJlbiBvZiBlbGVtZW50IGZyYW1lcy4nKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIGNhc2UgRnJhbWVUeXBlLm1hcmt1cDpcclxuICAgICAgICB0aGlzLmluc2VydE1hcmt1cChiYXRjaCwgcGFyZW50LCBjaGlsZEluZGV4LCBmcmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc3QgdW5rbm93blR5cGU6IG5ldmVyID0gZnJhbWVUeXBlOyAvLyBDb21waWxlLXRpbWUgdmVyaWZpY2F0aW9uIHRoYXQgdGhlIHN3aXRjaCB3YXMgZXhoYXVzdGl2ZVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBmcmFtZSB0eXBlOiAke3Vua25vd25UeXBlfWApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnNlcnRFbGVtZW50KGJhdGNoOiBSZW5kZXJCYXRjaCwgY29tcG9uZW50SWQ6IG51bWJlciwgcGFyZW50OiBCbGF6b3JET01FbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGZyYW1lczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZUZyYW1lPiwgZnJhbWU6IFJlbmRlclRyZWVGcmFtZSwgZnJhbWVJbmRleDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBmcmFtZVJlYWRlciA9IGJhdGNoLmZyYW1lUmVhZGVyO1xyXG4gICAgY29uc3QgdGFnTmFtZSA9IGZyYW1lUmVhZGVyLmVsZW1lbnROYW1lKGZyYW1lKSE7XHJcbiAgICBjb25zdCBuZXdEb21FbGVtZW50ID0gcGFyZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgY2hpbGRJbmRleCk7XHJcblxyXG4gICAgaWYgKG5ld0RvbUVsZW1lbnQgIT09IG51bGwgJiYgbmV3RG9tRWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHBhcmVudC5pbnNlcnROb2RlSW50b0RPTShuZXdEb21FbGVtZW50LCBjaGlsZEluZGV4KTtcclxuXHJcbiAgICAgIGxldCBibGF6b3JFbGVtZW50ID0gY3JlYXRlQmxhem9yRE9NRWxlbWVudCh0aGlzLCBuZXdEb21FbGVtZW50KTtcclxuXHJcbiAgICAgIC8vIEFwcGx5IGF0dHJpYnV0ZXNcclxuICAgICAgY29uc3QgZGVzY2VuZGFudHNFbmRJbmRleEV4Y2wgPSBmcmFtZUluZGV4ICsgZnJhbWVSZWFkZXIuc3VidHJlZUxlbmd0aChmcmFtZSk7XHJcbiAgICAgIGZvciAobGV0IGRlc2NlbmRhbnRJbmRleCA9IGZyYW1lSW5kZXggKyAxOyBkZXNjZW5kYW50SW5kZXggPCBkZXNjZW5kYW50c0VuZEluZGV4RXhjbDsgZGVzY2VuZGFudEluZGV4KyspIHtcclxuICAgICAgICBjb25zdCBkZXNjZW5kYW50RnJhbWUgPSBiYXRjaC5yZWZlcmVuY2VGcmFtZXNFbnRyeShmcmFtZXMsIGRlc2NlbmRhbnRJbmRleCk7XHJcblxyXG4gICAgICAgIGlmIChmcmFtZVJlYWRlci5mcmFtZVR5cGUoZGVzY2VuZGFudEZyYW1lKSA9PT0gRnJhbWVUeXBlLmF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgYmxhem9yRWxlbWVudC5hcHBseUF0dHJpYnV0ZShiYXRjaCwgY29tcG9uZW50SWQsIGRlc2NlbmRhbnRGcmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIEFzIHNvb24gYXMgd2Ugc2VlIGEgbm9uLWF0dHJpYnV0ZSBjaGlsZCwgYWxsIHRoZSBzdWJzZXF1ZW50IGNoaWxkIGZyYW1lcyBhcmVcclxuICAgICAgICAgIC8vIG5vdCBhdHRyaWJ1dGVzLCBzbyBiYWlsIG91dCBhbmQgaW5zZXJ0IHRoZSByZW1uYW50cyByZWN1cnNpdmVseVxyXG4gICAgICAgICAgdGhpcy5pbnNlcnRGcmFtZVJhbmdlKGJhdGNoLCBjb21wb25lbnRJZCwgYmxhem9yRWxlbWVudCwgMCwgZnJhbWVzLCBkZXNjZW5kYW50SW5kZXgsIGRlc2NlbmRhbnRzRW5kSW5kZXhFeGNsKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgYmxhem9yRWxlbWVudC5vbkRPTVVwZGF0ZWQoKTtcclxuICAgICAgaWYgKGJsYXpvckVsZW1lbnQuaXNDb21wb25lbnQoKSA9PSBmYWxzZSlcclxuICAgICAgICBibGF6b3JFbGVtZW50LmRpc3Bvc2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG5cdHByaXZhdGUgaW5zZXJ0Q29tcG9uZW50KGJhdGNoOiBSZW5kZXJCYXRjaCwgcGFyZW50OiBCbGF6b3JET01FbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUsIGZyYW1lczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZUZyYW1lPiwgZnJhbWVJbmRleDogbnVtYmVyKSB7XHJcbiAgICAvLyBBbGwgd2UgaGF2ZSB0byBkbyBpcyBhc3NvY2lhdGUgdGhlIGNoaWxkIGNvbXBvbmVudCBJRCB3aXRoIGl0cyBsb2NhdGlvbi4gV2UgZG9uJ3QgYWN0dWFsbHlcclxuICAgIC8vIGRvIGFueSByZW5kZXJpbmcgaGVyZSwgYmVjYXVzZSB0aGUgZGlmZiBmb3IgdGhlIGNoaWxkIHdpbGwgYXBwZWFyIGxhdGVyIGluIHRoZSByZW5kZXIgYmF0Y2guXHJcblxyXG4gICAgY29uc3QgZnJhbWVSZWFkZXIgPSBiYXRjaC5mcmFtZVJlYWRlcjtcclxuICAgIGNvbnN0IGNoaWxkQ29tcG9uZW50SWQgPSBmcmFtZVJlYWRlci5jb21wb25lbnRJZChmcmFtZSk7XHJcbiAgICBjb25zdCBjdXN0b21Db21wb25lbnRUeXBlID0gZnJhbWVSZWFkZXIuY3VzdG9tQ29tcG9uZW50VHlwZShmcmFtZSk7XHJcbiAgICBjb25zdCBibGF6b3JFbGVtZW50ID0gY3JlYXRlQmxhem9yRE9NQ29tcG9uZW50KHRoaXMsIGNoaWxkQ29tcG9uZW50SWQsIHBhcmVudCwgY2hpbGRJbmRleCwgY3VzdG9tQ29tcG9uZW50VHlwZSk7XHJcbiAgICB0aGlzLmF0dGFjaEJsYXpvckNvbXBvbmVudFRvRWxlbWVudChjaGlsZENvbXBvbmVudElkLCBibGF6b3JFbGVtZW50KTtcclxuXHJcbiAgICBpZiAoY3VzdG9tQ29tcG9uZW50VHlwZSAhPSAwKSB7XHJcbiAgICAgIC8vIEFwcGx5IGF0dHJpYnV0ZXNcclxuICAgICAgY29uc3QgZGVzY2VuZGFudHNFbmRJbmRleEV4Y2wgPSBmcmFtZUluZGV4ICsgZnJhbWVSZWFkZXIuc3VidHJlZUxlbmd0aChmcmFtZSk7XHJcbiAgICAgIGZvciAobGV0IGRlc2NlbmRhbnRJbmRleCA9IGZyYW1lSW5kZXggKyAxOyBkZXNjZW5kYW50SW5kZXggPCBkZXNjZW5kYW50c0VuZEluZGV4RXhjbDsgZGVzY2VuZGFudEluZGV4KyspIHtcclxuICAgICAgICBjb25zdCBkZXNjZW5kYW50RnJhbWUgPSBiYXRjaC5yZWZlcmVuY2VGcmFtZXNFbnRyeShmcmFtZXMsIGRlc2NlbmRhbnRJbmRleCk7XHJcblxyXG4gICAgICAgIGlmIChmcmFtZVJlYWRlci5mcmFtZVR5cGUoZGVzY2VuZGFudEZyYW1lKSA9PT0gRnJhbWVUeXBlLmF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgYmxhem9yRWxlbWVudC5hcHBseUF0dHJpYnV0ZShiYXRjaCwgY2hpbGRDb21wb25lbnRJZCwgZGVzY2VuZGFudEZyYW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluc2VydFRleHQoYmF0Y2g6IFJlbmRlckJhdGNoLCBwYXJlbnQ6IEJsYXpvckRPTUVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlciwgdGV4dEZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpIHtcclxuICAgIGNvbnN0IHRleHRDb250ZW50ID0gYmF0Y2guZnJhbWVSZWFkZXIudGV4dENvbnRlbnQodGV4dEZyYW1lKSE7XHJcbiAgICBjb25zdCBuZXdUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHRDb250ZW50KTtcclxuICAgIHBhcmVudC5pbnNlcnROb2RlSW50b0RPTShuZXdUZXh0Tm9kZSwgY2hpbGRJbmRleCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluc2VydEZyYW1lUmFuZ2UoYmF0Y2g6IFJlbmRlckJhdGNoLCBjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IEJsYXpvckRPTUVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlciwgZnJhbWVzOiBBcnJheVZhbHVlczxSZW5kZXJUcmVlRnJhbWU+LCBzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4RXhjbDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IG9yaWdDaGlsZEluZGV4ID0gY2hpbGRJbmRleDtcclxuICAgIGZvciAobGV0IGluZGV4ID0gc3RhcnRJbmRleDsgaW5kZXggPCBlbmRJbmRleEV4Y2w7IGluZGV4KyspIHtcclxuICAgICAgY29uc3QgZnJhbWUgPSBiYXRjaC5yZWZlcmVuY2VGcmFtZXNFbnRyeShmcmFtZXMsIGluZGV4KTtcclxuICAgICAgY29uc3QgbnVtQ2hpbGRyZW5JbnNlcnRlZCA9IHRoaXMuaW5zZXJ0RnJhbWUoYmF0Y2gsIGNvbXBvbmVudElkLCBwYXJlbnQsIGNoaWxkSW5kZXgsIGZyYW1lcywgZnJhbWUsIGluZGV4KTtcclxuICAgICAgY2hpbGRJbmRleCArPSBudW1DaGlsZHJlbkluc2VydGVkO1xyXG5cclxuICAgICAgLy8gU2tpcCBvdmVyIGFueSBkZXNjZW5kYW50cywgc2luY2UgdGhleSBhcmUgYWxyZWFkeSBkZWFsdCB3aXRoIHJlY3Vyc2l2ZWx5XHJcbiAgICAgIGluZGV4ICs9IHRoaXMuY291bnREZXNjZW5kYW50RnJhbWVzKGJhdGNoLCBmcmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChjaGlsZEluZGV4IC0gb3JpZ0NoaWxkSW5kZXgpOyAvLyBUb3RhbCBudW1iZXIgb2YgY2hpbGRyZW4gaW5zZXJ0ZWRcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zZXJ0TWFya3VwKGJhdGNoOiBSZW5kZXJCYXRjaCwgcGFyZW50OiBCbGF6b3JET01FbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIG1hcmt1cEZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpIHtcclxuICAgIGNvbnN0IG1hcmt1cENvbnRhaW5lciA9IGNyZWF0ZUJsYXpvck1hcmt1cENvbXBvbmVudCh0aGlzLCAtMSwgcGFyZW50LCBjaGlsZEluZGV4KTtcclxuXHJcbiAgICBjb25zdCBtYXJrdXBDb250ZW50ID0gYmF0Y2guZnJhbWVSZWFkZXIubWFya3VwQ29udGVudChtYXJrdXBGcmFtZSk7XHJcbiAgICBjb25zdCBwYXJzZWRNYXJrdXAgPSBtYXJrdXBDb250YWluZXIucGFyc2VNYXJrdXAobWFya3VwQ29udGVudCwgcGFyZW50LmlzU3ZnRWxlbWVudCgpKTtcclxuICAgIGxldCBsb2dpY2FsU2libGluZ0luZGV4ID0gMDtcclxuICAgIHdoaWxlIChwYXJzZWRNYXJrdXAuZmlyc3RDaGlsZCkge1xyXG4gICAgICBtYXJrdXBDb250YWluZXIuaW5zZXJ0Tm9kZUludG9ET00ocGFyc2VkTWFya3VwLmZpcnN0Q2hpbGQsIGxvZ2ljYWxTaWJsaW5nSW5kZXgrKyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbW92ZU5vZGVGcm9tRE9NKHBhcmVudDogQmxhem9yRE9NRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyKSB7XHJcbiAgICBwYXJlbnQucmVtb3ZlRnJvbURvbShjaGlsZEluZGV4KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNwb3NlRXZlbnRIYW5kbGVyKGV2ZW50SGFuZGxlcklkOiBudW1iZXIpIHtcclxuICAgIHRoaXMuZXZlbnREZWxlZ2F0b3IucmVtb3ZlTGlzdGVuZXIoZXZlbnRIYW5kbGVySWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb3VudERlc2NlbmRhbnRGcmFtZXMoYmF0Y2g6IFJlbmRlckJhdGNoLCBmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IGZyYW1lUmVhZGVyID0gYmF0Y2guZnJhbWVSZWFkZXI7XHJcbiAgICBzd2l0Y2ggKGZyYW1lUmVhZGVyLmZyYW1lVHlwZShmcmFtZSkpIHtcclxuICAgICAgLy8gVGhlIGZvbGxvd2luZyBmcmFtZSB0eXBlcyBoYXZlIGEgc3VidHJlZSBsZW5ndGguIE90aGVyIGZyYW1lcyBtYXkgdXNlIHRoYXQgbWVtb3J5IHNsb3RcclxuICAgICAgLy8gdG8gbWVhbiBzb21ldGhpbmcgZWxzZSwgc28gd2UgbXVzdCBub3QgcmVhZCBpdC4gV2Ugc2hvdWxkIGNvbnNpZGVyIGhhdmluZyBub21pbmFsIHN1YnR5cGVzXHJcbiAgICAgIC8vIG9mIFJlbmRlclRyZWVGcmFtZVBvaW50ZXIgdGhhdCBwcmV2ZW50IGFjY2VzcyB0byBub24tYXBwbGljYWJsZSBmaWVsZHMuXHJcbiAgICAgIGNhc2UgRnJhbWVUeXBlLmNvbXBvbmVudDpcclxuICAgICAgY2FzZSBGcmFtZVR5cGUuZWxlbWVudDpcclxuICAgICAgY2FzZSBGcmFtZVR5cGUucmVnaW9uOlxyXG4gICAgICAgIHJldHVybiBmcmFtZVJlYWRlci5zdWJ0cmVlTGVuZ3RoKGZyYW1lKSAtIDE7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9xdWV1ZUV2ZW50OiBhbnlbXSA9IFtdO1xyXG5cclxuICBwdWJsaWMgYXN5bmMgcmFpc2VFdmVudChldmVudDogRXZlbnQgfCBudWxsLCBjb21wb25lbnRJZDogbnVtYmVyLCBldmVudEhhbmRsZXJJZDogbnVtYmVyLCBldmVudEFyZ3M6IEV2ZW50Rm9yRG90TmV0PFVJRXZlbnRBcmdzPikge1xyXG4gICAgaWYgKHRoaXMucmVuZGVyTm8gPT0gMCkge1xyXG4gICAgICByZXR1cm4gcmFpc2VFdmVudChldmVudCwgdGhpcy5icm93c2VyUmVuZGVyZXJJZCwgY29tcG9uZW50SWQsIGV2ZW50SGFuZGxlcklkLCBldmVudEFyZ3MpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMuX3F1ZXVlRXZlbnQucHVzaCh7XHJcbiAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgIGNvbXBvbmVudElkOiBjb21wb25lbnRJZCxcclxuICAgICAgICBldmVudEhhbmRsZXJJZDogZXZlbnRIYW5kbGVySWQsXHJcbiAgICAgICAgZXZlbnRBcmdzOiBldmVudEFyZ3NcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNlbmRRdWV1ZUV2ZW50cygpIHtcclxuICAgIGlmICh0aGlzLl9xdWV1ZUV2ZW50Lmxlbmd0aCA9PSAwKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGV2dCA9IHRoaXMuX3F1ZXVlRXZlbnQucG9wKCk7XHJcbiAgICB3aGlsZSAoZXZ0KVxyXG4gICAge1xyXG4gICAgICAvL3JhaXNlRXZlbnQoZXZ0LmV2ZW50LCB0aGlzLmJyb3dzZXJSZW5kZXJlcklkLCBldnQuY29tcG9uZW50SWQsIGV2dC5ldmVudEhhbmRsZXJJZCwgZXZ0LmV2ZW50QXJncyk7XHJcblxyXG4gICAgICBjb25zdCBldmVudERlc2NyaXB0b3IgPSB7XHJcbiAgICAgICAgYnJvd3NlclJlbmRlcmVySWQ6IHRoaXMuYnJvd3NlclJlbmRlcmVySWQsXHJcbiAgICAgICAgY29tcG9uZW50SWQ6IGV2dC5jb21wb25lbnRJZCxcclxuICAgICAgICBldmVudEhhbmRsZXJJZDogZXZ0LmV2ZW50SGFuZGxlcklkLFxyXG4gICAgICAgIGV2ZW50QXJnc1R5cGU6IGV2dC5ldmVudEFyZ3MudHlwZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kUXVldWVFdmVudHMgc3RhcnQgXCIgKyBldmVudERlc2NyaXB0b3IuY29tcG9uZW50SWQpO1xyXG4gICAgICBsZXQgdDAgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICAgIERvdE5ldC5pbnZva2VNZXRob2RBc3luYyhcclxuICAgICAgICAnTWljcm9zb2Z0LkFzcE5ldENvcmUuQmxhem9yLkJyb3dzZXInLFxyXG4gICAgICAgICdEaXNwYXRjaEV2ZW50JyxcclxuICAgICAgICBldmVudERlc2NyaXB0b3IsXHJcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoZXZ0LmV2ZW50QXJncy5kYXRhKSk7XHJcblxyXG4gICAgICBsZXQgdDEgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgY29uc29sZS5sb2coXCJzZW5kUXVldWVFdmVudHMgXCIgKyBldmVudERlc2NyaXB0b3IuY29tcG9uZW50SWQgKyBcIi1cIiArIGV2ZW50RGVzY3JpcHRvci5ldmVudEFyZ3NUeXBlICsgXCIgdG9vayBcIiArICh0MSAtIHQwKSArIFwiIG1pbGxpc2Vjb25kcy5cIilcclxuXHJcbiAgICAgIGV2dCA9IHRoaXMuX3F1ZXVlRXZlbnQucG9wKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmFpc2VFdmVudChldmVudDogRXZlbnQgfCBudWxsLCBicm93c2VyUmVuZGVyZXJJZDogbnVtYmVyLCBjb21wb25lbnRJZDogbnVtYmVyLCBldmVudEhhbmRsZXJJZDogbnVtYmVyLCBldmVudEFyZ3M6IEV2ZW50Rm9yRG90TmV0PFVJRXZlbnRBcmdzPikge1xyXG5cdGlmIChldmVudCAhPT0gbnVsbCAmJiBldmVudC5wcmV2ZW50RGVmYXVsdCAhPT0gdW5kZWZpbmVkKVxyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgaWYgKGV2ZW50ICE9PSBudWxsICYmIHByZXZlbnREZWZhdWx0RXZlbnRzW2V2ZW50LnR5cGVdKSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH1cclxuXHJcblx0Y29uc3QgZXZlbnREZXNjcmlwdG9yID0ge1xyXG4gICAgYnJvd3NlclJlbmRlcmVySWQsXHJcbiAgICBjb21wb25lbnRJZCxcclxuICAgIGV2ZW50SGFuZGxlcklkLFxyXG4gICAgZXZlbnRBcmdzVHlwZTogZXZlbnRBcmdzLnR5cGVcclxuXHR9O1xyXG5cclxuICBjb25zb2xlLmxvZyhcIkJyb3dzZXJSZW5kZXJlckV2ZW50RGlzcGF0Y2hlciBzdGFydCBcIiArIGV2ZW50RGVzY3JpcHRvci5jb21wb25lbnRJZCk7XHJcblxyXG4gIGxldCB0MCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIHZhciBydCA9IERvdE5ldC5pbnZva2VNZXRob2RBc3luYyhcclxuICAgICAgJ01pY3Jvc29mdC5Bc3BOZXRDb3JlLkJsYXpvci5Ccm93c2VyJyxcclxuICAgICAgJ0Rpc3BhdGNoRXZlbnQnLFxyXG4gICAgICBldmVudERlc2NyaXB0b3IsXHJcbiAgICAgIEpTT04uc3RyaW5naWZ5KGV2ZW50QXJncy5kYXRhKSk7XHJcbiAgfSwgMSk7XHJcblxyXG5cdGxldCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gIGNvbnNvbGUubG9nKFwiQnJvd3NlclJlbmRlcmVyRXZlbnREaXNwYXRjaGVyIFwiICsgZXZlbnREZXNjcmlwdG9yLmNvbXBvbmVudElkICsgXCItXCIgKyBldmVudERlc2NyaXB0b3IuZXZlbnRBcmdzVHlwZSArIFwiIHRvb2sgXCIgKyAodDEgLSB0MCkgKyBcIiBtaWxsaXNlY29uZHMuXCIpXHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIGFwcGx5Q2FwdHVyZUlkVG9FbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQsIHJlZmVyZW5jZUNhcHR1cmVJZDogc3RyaW5nKSB7XHJcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoZ2V0Q2FwdHVyZUlkQXR0cmlidXRlTmFtZShyZWZlcmVuY2VDYXB0dXJlSWQpLCAnJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEVsZW1lbnRCeUNhcHR1cmVJZChyZWZlcmVuY2VDYXB0dXJlSWQ6IHN0cmluZykge1xyXG4gIGNvbnN0IHNlbGVjdG9yID0gYFske2dldENhcHR1cmVJZEF0dHJpYnV0ZU5hbWUocmVmZXJlbmNlQ2FwdHVyZUlkKX1dYDtcclxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENhcHR1cmVJZEF0dHJpYnV0ZU5hbWUocmVmZXJlbmNlQ2FwdHVyZUlkOiBzdHJpbmcpIHtcclxuICByZXR1cm4gYF9ibF8ke3JlZmVyZW5jZUNhcHR1cmVJZH1gO1xyXG59XHJcblxyXG4vLyBTdXBwb3J0IHJlY2VpdmluZyBFbGVtZW50UmVmIGluc3RhbmNlcyBhcyBhcmdzIGluIGludGVyb3AgY2FsbHNcclxuY29uc3QgZWxlbWVudFJlZktleSA9ICdfYmxhem9yRWxlbWVudFJlZic7IC8vIEtlZXAgaW4gc3luYyB3aXRoIEVsZW1lbnRSZWYuY3NcclxuRG90TmV0LmF0dGFjaFJldml2ZXIoKGtleSwgdmFsdWUpID0+IHtcclxuICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eShlbGVtZW50UmVmS2V5KSAmJiB0eXBlb2YgdmFsdWVbZWxlbWVudFJlZktleV0gPT09ICdzdHJpbmcnKSB7XHJcbiAgICByZXR1cm4gZ2V0RWxlbWVudEJ5Q2FwdHVyZUlkKHZhbHVlW2VsZW1lbnRSZWZLZXldKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxufSk7XHJcbiIsImltcG9ydCB7IEJyb3dzZXJSZW5kZXJlciB9IGZyb20gJy4uL0Jyb3dzZXJSZW5kZXJlcic7XHJcbmltcG9ydCB7IEJsYXpvckRPTUVsZW1lbnQgfSBmcm9tICcuL0JsYXpvckRPTUVsZW1lbnQnO1xyXG5pbXBvcnQgeyBFdmVudEZvckRvdE5ldCwgVUlFdmVudEFyZ3MgfSBmcm9tICcuLi9FdmVudEZvckRvdE5ldCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQmxhem9yRE9NQ29tcG9uZW50IGV4dGVuZHMgQmxhem9yRE9NRWxlbWVudCB7XHJcbiAgQ29tcG9uZW50SUQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoQ0lEOiBudW1iZXIsIHBhcmVudDogQmxhem9yRE9NRWxlbWVudCwgY2hpbGRJbmRleDogbnVtYmVyLCBicjogQnJvd3NlclJlbmRlcmVyKSB7XHJcbiAgICBjb25zdCBtYXJrZXJTdGFydCA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ2JsYXpvci1jb21wb25lbnQtc3RhcnQuJyArIENJRCk7XHJcbiAgICBjb25zdCBtYXJrZXJFbmQgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCdibGF6b3ItY29tcG9uZW50LWVuZC4nICsgQ0lEKTtcclxuXHJcbiAgICBwYXJlbnQuaW5zZXJ0Tm9kZUludG9ET00obWFya2VyRW5kLCBjaGlsZEluZGV4KTtcclxuICAgIHBhcmVudC5pbnNlcnROb2RlSW50b0RPTShtYXJrZXJTdGFydCwgY2hpbGRJbmRleCk7XHJcblxyXG4gICAgc3VwZXIoYnIsIG1hcmtlclN0YXJ0LCBtYXJrZXJFbmQpO1xyXG4gICAgdGhpcy5Db21wb25lbnRJRCA9IENJRDtcclxuXHJcbiAgICBwYXJlbnQub25DaGlsZEF0dGFjaGVkKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENsb3Nlc3REb21FbGVtZW50KCk6IE5vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RE9NRWxlbWVudCgpLnBhcmVudE5vZGUhO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzQ29tcG9uZW50KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWU6IHN0cmluZywgYXR0cmlidXRlVmFsdWU6IHN0cmluZyB8IG51bGwpIHtcclxuICAgIC8vIEJsYXpvciBET00gQ29tcG9uZW50IGRvIG5vdCBoYXZlIEhUTUwgYXR0cmlidXRlc1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHJhaXNlRXZlbnQoZXZlbnRIYW5kbGVySWQ6IG51bWJlciwgZXZ0OiBFdmVudEZvckRvdE5ldDxVSUV2ZW50QXJncz4pIHtcclxuICAgIHRoaXMuYnJvd3NlclJlbmRlcmVyLnJhaXNlRXZlbnQobnVsbCwgdGhpcy5Db21wb25lbnRJRCwgZXZlbnRIYW5kbGVySWQsIGV2dCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEJyb3dzZXJSZW5kZXJlciB9IGZyb20gJy4uL0Jyb3dzZXJSZW5kZXJlcic7XHJcbmltcG9ydCB7IGdldFJlZ2lzdGVyZWRDdXN0b21UYWcgfSBmcm9tICcuL1JlbmRlcmluZ0Z1bmN0aW9uJztcclxuaW1wb3J0IHsgQmxhem9ySU5QVVRFbGVtZW50IH0gZnJvbSAnLi9CbGF6b3JJTlBVVEVsZW1lbnQnO1xyXG5pbXBvcnQgeyBSZW5kZXJCYXRjaCwgQXJyYXlTZWdtZW50LCBBcnJheVJhbmdlLCBSZW5kZXJUcmVlRWRpdCwgUmVuZGVyVHJlZUZyYW1lLCBFZGl0VHlwZSwgRnJhbWVUeXBlLCBBcnJheVZhbHVlcyB9IGZyb20gJy4uL1JlbmRlckJhdGNoL1JlbmRlckJhdGNoJztcclxuaW1wb3J0IHsgY3JlYXRlQmxhem9yTWFya3VwQ29tcG9uZW50IH0gZnJvbSAnLi9FbGVtZW50Q3JlYXRvcnMnXHJcblxyXG5jb25zdCBsb2dpY2FsQmxhem9yRG9tRWxlbWVudFByb3BuYW1lID0gY3JlYXRlU3ltYm9sT3JGYWxsYmFjaygnX2JsYXpvckRvbUVsZW1lbnQnKTtcclxuY29uc3QgbG9naWNhbEJsYXpvckNoaWxkRWxlbWVudFByb3BuYW1lID0gY3JlYXRlU3ltYm9sT3JGYWxsYmFjaygnX2JsYXpvckRvbUNoaWxkJyk7XHJcblxyXG5leHBvcnQgY2xhc3MgQmxhem9yRE9NRWxlbWVudCB7XHJcblx0cHJvdGVjdGVkIHJlYWRvbmx5IGJyb3dzZXJSZW5kZXJlcjogQnJvd3NlclJlbmRlcmVyO1xyXG5cdHByaXZhdGUgX2VsZW1lbnRzOiBOb2RlW10gPSBbXTtcclxuXHJcblx0cHJpdmF0ZSBzdGFydENvbnRhaW5lcjogTm9kZTtcclxuXHRwcml2YXRlIGVuZENvbnRhaW5lcjogTm9kZSB8IG51bGw7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGJyb3dzZXJSZW5kZWRlcjogQnJvd3NlclJlbmRlcmVyLCBzdGFydDogTm9kZSwgZW5kOiBOb2RlIHwgbnVsbCA9IG51bGwpIHtcclxuXHRcdHRoaXMuYnJvd3NlclJlbmRlcmVyID0gYnJvd3NlclJlbmRlZGVyO1xyXG5cclxuXHRcdHRoaXMuc3RhcnRDb250YWluZXIgPSBzdGFydDtcclxuXHRcdHRoaXMuZW5kQ29udGFpbmVyID0gZW5kO1xyXG5cclxuICAgIHRoaXMuc3RhcnRDb250YWluZXJbbG9naWNhbEJsYXpvckRvbUVsZW1lbnRQcm9wbmFtZV0gPSB0aGlzO1xyXG4gICAgdGhpcy5zdGFydENvbnRhaW5lcltsb2dpY2FsQmxhem9yQ2hpbGRFbGVtZW50UHJvcG5hbWVdID0gW107XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgaXNDb21wb25lbnQoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0Q2xvc2VzdERvbUVsZW1lbnQoKTogTm9kZSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zdGFydENvbnRhaW5lcjtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXRET01FbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdHJldHVybiB0aGlzLnN0YXJ0Q29udGFpbmVyIGFzIEhUTUxFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldExvZ2ljYWxDaGlsZChjaGlsZEluZGV4OiBudW1iZXIpOiBOb2RlIHwgQmxhem9yRE9NRWxlbWVudCB8IG51bGwge1xyXG4gICAgbGV0IGNhY2hlZENoaWxkID0gdGhpcy5zdGFydENvbnRhaW5lcltsb2dpY2FsQmxhem9yQ2hpbGRFbGVtZW50UHJvcG5hbWVdW2NoaWxkSW5kZXhdO1xyXG4gICAgaWYgKGNhY2hlZENoaWxkICE9PSB1bmRlZmluZWQpIHJldHVybiBjYWNoZWRDaGlsZDtcclxuXHJcbiAgICBsZXQgZWxlbWVudDogTm9kZSB8IG51bGwgPSB0aGlzLnN0YXJ0Q29udGFpbmVyO1xyXG5cdFx0aWYgKHRoaXMuaXNDb21wb25lbnQoKSA9PT0gZmFsc2UpXHJcblx0XHRcdGVsZW1lbnQgPSBlbGVtZW50LmZpcnN0Q2hpbGQ7XHJcblx0XHRlbHNlXHJcblx0XHRcdGVsZW1lbnQgPSBlbGVtZW50Lm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdGlmIChlbGVtZW50ID09IG51bGwpIHtcclxuXHRcdFx0Ly8gbm8gY2hpbGRcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcbiAgICBlbHNlIHtcclxuICAgICAgbGV0IGNpID0gY2hpbGRJbmRleDtcclxuICAgICAgd2hpbGUgKGNpID4gMCkge1xyXG5cdFx0XHRcdC8vIHNraXAgaWYgaXMgdGhpcy5SYW5nZVxyXG5cdFx0XHRcdGlmIChlbGVtZW50ICE9PSB0aGlzLnN0YXJ0Q29udGFpbmVyKSB7XHJcblx0XHRcdFx0XHQvLyBpcyBhIGNvbXBvbmVudCA/XHJcblx0XHRcdFx0XHRsZXQgYmxhem9yRG9tID0gdGhpcy5nZXRDb21wb25lbnRGcm9tTm9kZShlbGVtZW50KTtcclxuXHRcdFx0XHRcdGlmIChibGF6b3JEb20gIT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0XHRlbGVtZW50ID0gYmxhem9yRG9tLmVuZENvbnRhaW5lcjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG4gICAgICAgIGNpLS07XHJcblxyXG5cdFx0XHRcdGVsZW1lbnQgPSBlbGVtZW50IS5uZXh0U2libGluZztcclxuXHRcdFx0XHRpZiAoZWxlbWVudCA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IGJsYXpvckRvbSA9IHRoaXMuZ2V0Q29tcG9uZW50RnJvbU5vZGUoZWxlbWVudCk7XHJcbiAgICAgIGlmIChibGF6b3JEb20gIT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRDb250YWluZXJbbG9naWNhbEJsYXpvckNoaWxkRWxlbWVudFByb3BuYW1lXVtjaGlsZEluZGV4XSA9IGJsYXpvckRvbTtcclxuXHRcdFx0XHRyZXR1cm4gYmxhem9yRG9tO1xyXG5cdFx0XHR9XHJcblxyXG4gICAgICB0aGlzLnN0YXJ0Q29udGFpbmVyW2xvZ2ljYWxCbGF6b3JDaGlsZEVsZW1lbnRQcm9wbmFtZV1bY2hpbGRJbmRleF0gPSBlbGVtZW50O1xyXG5cdFx0XHRyZXR1cm4gZWxlbWVudDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0Q29tcG9uZW50RnJvbU5vZGUoZWxlbWVudDogTm9kZSk6IEJsYXpvckRPTUVsZW1lbnQgfCBudWxsIHtcclxuXHRcdGxldCBjb21wb25lbnQgPSBlbGVtZW50W2xvZ2ljYWxCbGF6b3JEb21FbGVtZW50UHJvcG5hbWVdIGFzIEJsYXpvckRPTUVsZW1lbnQ7XHJcblx0XHRpZiAoY29tcG9uZW50ICE9PSBudWxsICYmIGNvbXBvbmVudCAhPT0gdW5kZWZpbmVkICYmIGNvbXBvbmVudC5pc0NvbXBvbmVudCgpID09PSB0cnVlKSByZXR1cm4gY29tcG9uZW50O1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuICBwdWJsaWMgY3JlYXRlRWxlbWVudCh0YWdOYW1lOiBzdHJpbmcsIGNoaWxkSW5kZXg6IG51bWJlcik6IEVsZW1lbnQge1xyXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5nZXRDbG9zZXN0RG9tRWxlbWVudCgpO1xyXG4gICAgY29uc3QgbmV3RG9tRWxlbWVudCA9IHRhZ05hbWUgPT09ICdzdmcnIHx8IChwYXJlbnQgIT0gbnVsbCAmJiBwYXJlbnQubmFtZXNwYWNlVVJJID09PSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKSA/XHJcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCB0YWdOYW1lKSA6XHJcbiAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XHJcbiAgICByZXR1cm4gbmV3RG9tRWxlbWVudDtcclxuICB9XHJcblxyXG5cdHB1YmxpYyBpbnNlcnROb2RlSW50b0RPTShub2RlOiBOb2RlLCBjaGlsZEluZGV4OiBudW1iZXIpIHtcclxuXHRcdGxldCBwYXJlbnRFbGVtZW50ID0gdGhpcy5nZXRDbG9zZXN0RG9tRWxlbWVudCgpO1xyXG5cclxuXHRcdGxldCByZWFsU2libGluZyA9IHRoaXMuZ2V0TG9naWNhbENoaWxkKGNoaWxkSW5kZXgpO1xyXG5cdFx0aWYgKHJlYWxTaWJsaW5nID09PSBudWxsKSB7XHJcblx0XHRcdGlmICh0aGlzLmlzQ29tcG9uZW50KCkgPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKG5vZGUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHRoaXMuZW5kQ29udGFpbmVyKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIChyZWFsU2libGluZyBhcyBOb2RlKS5wYXJlbnRFbGVtZW50IS5pbnNlcnRCZWZvcmUobm9kZSwgcmVhbFNpYmxpbmcgYXMgTm9kZSk7XHJcblx0XHRcdC8vIGJldHRlciB0aGFuIHBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHJlYWxTaWJsaW5nIGFzIE5vZGUpO1xyXG5cdFx0fVxyXG5cclxuICAgIHRoaXMuc3RhcnRDb250YWluZXJbbG9naWNhbEJsYXpvckNoaWxkRWxlbWVudFByb3BuYW1lXSA9IFtdO1xyXG4gIH1cclxuXHJcblx0cHVibGljIHJlbW92ZUZyb21Eb20oY2hpbGRJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGwpIHtcclxuXHRcdGlmIChjaGlsZEluZGV4ID09PSBudWxsKSB7XHJcblx0XHRcdC8vIEFkanVzdCByYW5nZSB0byB3aG9sZSBjb21wb25lbnRcclxuXHRcdFx0dmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuXHRcdFx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUodGhpcy5zdGFydENvbnRhaW5lcik7XHJcblx0XHRcdHJhbmdlLnNldEVuZEFmdGVyKHRoaXMuZW5kQ29udGFpbmVyISk7XHJcblxyXG5cdFx0XHQvLyBDbGVhciB3aG9sZSByYW5nZVxyXG5cdFx0XHRyYW5nZS5kZWxldGVDb250ZW50cygpO1xyXG4gICAgICByYW5nZS5kZXRhY2goKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRjb25zdCBlbGVtZW50ID0gdGhpcy5nZXRMb2dpY2FsQ2hpbGQoY2hpbGRJbmRleCkhO1xyXG5cclxuXHRcdFx0aWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBCbGF6b3JET01FbGVtZW50KSB7XHJcblx0XHRcdFx0ZWxlbWVudC5yZW1vdmVGcm9tRG9tKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0Ly8gUmVtb3ZlIG9ubHkgdGhlIGNoaWxkaW5kZXgtbnRoIGVsZW1lbnRcclxuXHRcdFx0XHRlbGVtZW50LnBhcmVudEVsZW1lbnQhLnJlbW92ZUNoaWxkKGVsZW1lbnQgYXMgTm9kZSk7XHJcbiAgICAgIH1cclxuXHRcdH1cclxuICAgIHRoaXMuc3RhcnRDb250YWluZXJbbG9naWNhbEJsYXpvckNoaWxkRWxlbWVudFByb3BuYW1lXSA9IFtdO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHVwZGF0ZVRleHQoY2hpbGRJbmRleDogbnVtYmVyLCBuZXdUZXh0OiBzdHJpbmcgfCBudWxsKSB7XHJcblx0XHRjb25zdCBkb21UZXh0Tm9kZSA9IHRoaXMuZ2V0TG9naWNhbENoaWxkKGNoaWxkSW5kZXgpIGFzIFRleHQ7XHJcblx0XHRkb21UZXh0Tm9kZS50ZXh0Q29udGVudCA9IG5ld1RleHQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNTdmdFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2xvc2VzdERvbUVsZW1lbnQoKS5uYW1lc3BhY2VVUkkgPT09ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXBwbHlBdHRyaWJ1dGUoYmF0Y2g6IFJlbmRlckJhdGNoLCBjb21wb25lbnRJZDogbnVtYmVyLCBhdHRyaWJ1dGVGcmFtZTogUmVuZGVyVHJlZUZyYW1lKSB7XHJcbiAgICBjb25zdCBmcmFtZVJlYWRlciA9IGJhdGNoLmZyYW1lUmVhZGVyO1xyXG4gICAgY29uc3QgYXR0cmlidXRlTmFtZSA9IGZyYW1lUmVhZGVyLmF0dHJpYnV0ZU5hbWUoYXR0cmlidXRlRnJhbWUpITtcclxuXHRcdC8vY29uc3QgdG9Eb21FbGVtZW50ID0gdGhpcy5SYW5nZS5zdGFydENvbnRhaW5lciBhcyBFbGVtZW50O1xyXG5cdFx0Ly9jb25zdCBicm93c2VyUmVuZGVyZXJJZCA9IHRoaXMuYnJvd3NlclJlbmRlcmVyLmJyb3dzZXJSZW5kZXJlcklkO1xyXG4gICAgaWYgKGF0dHJpYnV0ZU5hbWUgPT09IFwiQ2hpbGRDb250ZW50XCIpXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5pc0RPTUF0dHJpYnV0ZUV2ZW50KGF0dHJpYnV0ZU5hbWUpKSB7XHJcbiAgICAgIGNvbnN0IGV2ZW50SGFuZGxlcklkID0gZnJhbWVSZWFkZXIuYXR0cmlidXRlRXZlbnRIYW5kbGVySWQoYXR0cmlidXRlRnJhbWUpO1xyXG4gICAgICBpZiAodGhpcy5hcHBseUV2ZW50KGF0dHJpYnV0ZU5hbWUsIGNvbXBvbmVudElkLCBldmVudEhhbmRsZXJJZCkgPT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBhdHRyaWJ1dGVWYWx1ZSA6IHN0cmluZyB8IG51bGw7XHJcbiAgICBpZiAoZnJhbWVSZWFkZXIuaGFzQXR0cmlidXRlVmFsdWVKc29uKGF0dHJpYnV0ZUZyYW1lKSkge1xyXG4gICAgICBhdHRyaWJ1dGVWYWx1ZSA9IEpTT04ucGFyc2UoZnJhbWVSZWFkZXIuYXR0cmlidXRlVmFsdWVKc29uKGF0dHJpYnV0ZUZyYW1lKSEpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGF0dHJpYnV0ZVZhbHVlID0gZnJhbWVSZWFkZXIuYXR0cmlidXRlVmFsdWUoYXR0cmlidXRlRnJhbWUpO1xyXG4gICAgfVxyXG5cdFx0aWYgKHRoaXMuaXNET01BdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpID09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybjsgLy8gSWYgdGhpcyBET00gZWxlbWVudCB0eXBlIGhhcyBzcGVjaWFsICd2YWx1ZScgaGFuZGxpbmcsIGRvbid0IGFsc28gd3JpdGUgaXQgYXMgYW4gYXR0cmlidXRlXHJcblx0XHR9XHJcblxyXG4gICAgLy8gVHJlYXQgYXMgYSByZWd1bGFyIHN0cmluZy12YWx1ZWQgYXR0cmlidXRlXHJcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVtb3ZlQXR0cmlidXRlVmFsdWUoYXR0cmlidXRlTmFtZTogc3RyaW5nKSB7XHJcbiAgfVxyXG5cclxuXHRwdWJsaWMgcmVtb3ZlQXR0cmlidXRlKGNoaWxkSW5kZXg6IG51bWJlciwgYXR0cmlidXRlTmFtZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5nZXRMb2dpY2FsQ2hpbGQoY2hpbGRJbmRleCkgYXMgRWxlbWVudDtcclxuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmxhem9yRE9NRWxlbWVudCA9PSBmYWxzZSkge1xyXG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zdCBibGF6b3JFbGVtZW50ID0gZWxlbWVudCBhcyBhbnkgYXMgQmxhem9yRE9NRWxlbWVudDtcclxuICAgICAgYmxhem9yRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgIH1cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBzZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZTogc3RyaW5nLCBhdHRyaWJ1dGVWYWx1ZTogc3RyaW5nIHwgbnVsbCkge1xyXG5cdFx0Y29uc3QgdG9Eb21FbGVtZW50ID0gdGhpcy5zdGFydENvbnRhaW5lciBhcyBFbGVtZW50O1xyXG5cclxuXHRcdGlmIChhdHRyaWJ1dGVWYWx1ZSA9PSBudWxsKSB7XHJcblx0XHRcdHRvRG9tRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dG9Eb21FbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgaXNET01BdHRyaWJ1dGUoYXR0cmlidXRlTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgbnVsbCk6IGJvb2xlYW4ge1xyXG5cdFx0Ly8gZGVmYXVsdCBpcyB0cnVlXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBpc0RPTUF0dHJpYnV0ZUV2ZW50KGF0dHJpYnV0ZU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZmlyc3RUd29DaGFycyA9IGF0dHJpYnV0ZU5hbWUuc3Vic3RyaW5nKDAsIDIpO1xyXG4gICAgaWYgKGZpcnN0VHdvQ2hhcnMgPT09ICdvbicpIHJldHVybiB0cnVlO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG5cdHByb3RlY3RlZCBhcHBseUV2ZW50KGF0dHJpYnV0ZU5hbWU6IHN0cmluZywgY29tcG9uZW50SWQ6IG51bWJlciwgZXZlbnRIYW5kbGVySWQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG5cdFx0Y29uc3QgdG9Eb21FbGVtZW50ID0gdGhpcy5zdGFydENvbnRhaW5lciBhcyBFbGVtZW50O1xyXG5cdFx0Ly9jb25zdCBicm93c2VyUmVuZGVyZXJJZCA9IHRoaXMuYnJvd3NlclJlbmRlcmVyLmJyb3dzZXJSZW5kZXJlcklkO1xyXG5cclxuXHRcdGlmIChldmVudEhhbmRsZXJJZCkge1xyXG5cdFx0XHRjb25zdCBmaXJzdFR3b0NoYXJzID0gYXR0cmlidXRlTmFtZS5zdWJzdHJpbmcoMCwgMik7XHJcblx0XHRcdGNvbnN0IGV2ZW50TmFtZSA9IGF0dHJpYnV0ZU5hbWUuc3Vic3RyaW5nKDIpO1xyXG5cdFx0XHRpZiAoZmlyc3RUd29DaGFycyAhPT0gJ29uJyB8fCAhZXZlbnROYW1lKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBdHRyaWJ1dGUgaGFzIG5vbnplcm8gZXZlbnQgaGFuZGxlciBJRCwgYnV0IGF0dHJpYnV0ZSBuYW1lICcke2F0dHJpYnV0ZU5hbWV9JyBkb2VzIG5vdCBzdGFydCB3aXRoICdvbicuYCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5icm93c2VyUmVuZGVyZXIuZXZlbnREZWxlZ2F0b3Iuc2V0TGlzdGVuZXIodG9Eb21FbGVtZW50LCBldmVudE5hbWUsIGNvbXBvbmVudElkLCBldmVudEhhbmRsZXJJZCk7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvbkRPTVVwZGF0aW5nKCkgeyB9XHJcbiAgcHVibGljIG9uRE9NVXBkYXRlZCgpIHsgfVxyXG4gIHB1YmxpYyBvbkNoaWxkQXR0YWNoZWQoY2hpbGQ6IEJsYXpvckRPTUVsZW1lbnQpIHt9XHJcblxyXG5cdHB1YmxpYyBkaXNwb3NlKCkge1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEJsYXpvckRvbUVsZW1lbnQoY29udGFpbmVyOiBOb2RlKTogQmxhem9yRE9NRWxlbWVudCB8IG51bGwge1xyXG4gIGlmIChjb250YWluZXJbbG9naWNhbEJsYXpvckRvbUVsZW1lbnRQcm9wbmFtZV0gIT09IHVuZGVmaW5lZCkgcmV0dXJuIGNvbnRhaW5lcltsb2dpY2FsQmxhem9yRG9tRWxlbWVudFByb3BuYW1lXSBhcyBhbnkgYXMgQmxhem9yRE9NRWxlbWVudDtcclxuICBpZiAoY29udGFpbmVyIGluc3RhbmNlb2YgQmxhem9yRE9NRWxlbWVudCkgcmV0dXJuIGNvbnRhaW5lcjtcclxuICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3ltYm9sT3JGYWxsYmFjayhmYWxsYmFjazogc3RyaW5nKTogc3ltYm9sIHwgc3RyaW5nIHtcclxuICAgIHJldHVybiB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nID8gU3ltYm9sKCkgOiBmYWxsYmFjaztcclxufVxyXG4iLCJpbXBvcnQgeyBCbGF6b3JET01FbGVtZW50IH0gZnJvbSAnLi9CbGF6b3JET01FbGVtZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBCbGF6b3JJTlBVVEVsZW1lbnQgZXh0ZW5kcyBCbGF6b3JET01FbGVtZW50IHtcclxuICAgIHByaXZhdGUgaGFuZGxlU2VsZWN0VmFsdWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBpc0RPTUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudWxsKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xyXG5cclxuICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PSBcInZhbHVlXCIpIHtcclxuICAgICAgICAgICAgLy8gQ2VydGFpbiBlbGVtZW50cyBoYXZlIGJ1aWx0LWluIGJlaGF2aW91ciBmb3IgdGhlaXIgJ3ZhbHVlJyBwcm9wZXJ0eVxyXG4gICAgICAgICAgICBzd2l0Y2ggKGVsZW1lbnQudGFnTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnSU5QVVQnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnU0VMRUNUJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1RFWFRBUkVBJzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NoZWNrYm94KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChlbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQgPSB2YWx1ZSA9PT0gJ1RydWUnO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGVsZW1lbnQgYXMgYW55KS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5pc0RPTUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25ET01VcGRhdGluZygpIHtcclxuICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdFZhbHVlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25ET01VcGRhdGVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhbmRsZVNlbGVjdFZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQudGFnTmFtZSA9PSBcIlNFTEVDVFwiKSB7XHJcbiAgICAgICAgICAgICAgICAoZWxlbWVudCBhcyBhbnkpLnZhbHVlID0gdGhpcy5oYW5kbGVTZWxlY3RWYWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0VmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNDaGVja2JveChlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZSgndHlwZScpID09PSAnY2hlY2tib3gnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcHJvdGVjdGVkIGFwcGx5RXZlbnQoYXR0cmlidXRlTmFtZTogc3RyaW5nLCBjb21wb25lbnRJZDogbnVtYmVyLCBldmVudEhhbmRsZXJJZDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAvL1x0Y29uc3QgdG9Eb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcbiAgICAvL1x0Y29uc3QgYnJvd3NlclJlbmRlcmVySWQgPSB0aGlzLmJyb3dzZXJSZW5kZXJlci5icm93c2VyUmVuZGVyZXJJZDtcclxuXHJcbiAgICAvL1x0Ly8gVE9ETzogSW5zdGVhZCBvZiBhcHBseWluZyBzZXBhcmF0ZSBldmVudCBsaXN0ZW5lcnMgdG8gZWFjaCBET00gZWxlbWVudCwgdXNlIGV2ZW50IGRlbGVnYXRpb25cclxuICAgIC8vXHQvLyBhbmQgcmVtb3ZlIGFsbCB0aGUgX2JsYXpvcipMaXN0ZW5lciBoYWNrc1xyXG4gICAgLy9cdHN3aXRjaCAoYXR0cmlidXRlTmFtZSkge1xyXG4gICAgLy9cdFx0Y2FzZSAnb25jaGFuZ2UnOiB7XHJcbiAgICAvL1x0XHRcdHRvRG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0b0RvbUVsZW1lbnRbJ19ibGF6b3JDaGFuZ2VMaXN0ZW5lciddKTtcclxuICAgIC8vXHRcdFx0Y29uc3QgdGFyZ2V0SXNDaGVja2JveCA9IHRoaXMuaXNDaGVja2JveCh0b0RvbUVsZW1lbnQpO1xyXG4gICAgLy9cdFx0XHRjb25zdCBsaXN0ZW5lciA9IGV2dCA9PiB7XHJcbiAgICAvL1x0XHRcdFx0Y29uc3QgbmV3VmFsdWUgPSB0YXJnZXRJc0NoZWNrYm94ID8gZXZ0LnRhcmdldC5jaGVja2VkIDogZXZ0LnRhcmdldC52YWx1ZTtcclxuICAgIC8vXHRcdFx0XHRyYWlzZUV2ZW50KGV2dCwgYnJvd3NlclJlbmRlcmVySWQsIGNvbXBvbmVudElkLCBldmVudEhhbmRsZXJJZCwgJ2NoYW5nZScsIHsgVHlwZTogJ2NoYW5nZScsIFZhbHVlOiBuZXdWYWx1ZSB9KTtcclxuICAgIC8vXHRcdFx0fTtcclxuICAgIC8vXHRcdFx0dG9Eb21FbGVtZW50WydfYmxhem9yQ2hhbmdlTGlzdGVuZXInXSA9IGxpc3RlbmVyO1xyXG4gICAgLy9cdFx0XHR0b0RvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgbGlzdGVuZXIpO1xyXG4gICAgLy9cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuICAgIC8vXHRcdH1cclxuICAgIC8vXHRcdGNhc2UgJ29ua2V5cHJlc3MnOiB7XHJcbiAgICAvL1x0XHRcdHRvRG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRvRG9tRWxlbWVudFsnX2JsYXpvcktleXByZXNzTGlzdGVuZXInXSk7XHJcbiAgICAvL1x0XHRcdGNvbnN0IGxpc3RlbmVyID0gZXZ0ID0+IHtcclxuICAgIC8vXHRcdFx0XHQvLyBUaGlzIGRvZXMgbm90IGFjY291bnQgZm9yIHNwZWNpYWwga2V5cyBub3IgY3Jvc3MtYnJvd3NlciBkaWZmZXJlbmNlcy4gU28gZmFyIGl0J3NcclxuICAgIC8vXHRcdFx0XHQvLyBqdXN0IHRvIGVzdGFibGlzaCB0aGF0IHdlIGNhbiBwYXNzIHBhcmFtZXRlcnMgd2hlbiByYWlzaW5nIGV2ZW50cy5cclxuICAgIC8vXHRcdFx0XHQvLyBXZSB1c2UgQyMtc3R5bGUgUGFzY2FsQ2FzZSBvbiB0aGUgZXZlbnRJbmZvIHRvIHNpbXBsaWZ5IGRlc2VyaWFsaXphdGlvbiwgYnV0IHRoaXMgY291bGRcclxuICAgIC8vXHRcdFx0XHQvLyBjaGFuZ2UgaWYgd2UgaW50cm9kdWNlZCBhIHJpY2hlciBKU09OIGxpYnJhcnkgb24gdGhlIC5ORVQgc2lkZS5cclxuICAgIC8vXHRcdFx0XHRyYWlzZUV2ZW50KGV2dCwgYnJvd3NlclJlbmRlcmVySWQsIGNvbXBvbmVudElkLCBldmVudEhhbmRsZXJJZCwgJ2tleWJvYXJkJywgeyBUeXBlOiBldnQudHlwZSwgS2V5OiAoZXZ0IGFzIGFueSkua2V5IH0pO1xyXG4gICAgLy9cdFx0XHR9O1xyXG4gICAgLy9cdFx0XHR0b0RvbUVsZW1lbnRbJ19ibGF6b3JLZXlwcmVzc0xpc3RlbmVyJ10gPSBsaXN0ZW5lcjtcclxuICAgIC8vXHRcdFx0dG9Eb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgbGlzdGVuZXIpO1xyXG4gICAgLy9cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuICAgIC8vXHRcdH1cclxuICAgIC8vXHR9XHJcbiAgICAvL1x0cmV0dXJuIHN1cGVyLmFwcGx5RXZlbnQoYXR0cmlidXRlTmFtZSwgY29tcG9uZW50SWQsIGV2ZW50SGFuZGxlcklkKTtcclxuICAgIC8vfVxyXG59IiwiaW1wb3J0IHsgQmxhem9yRE9NQ29tcG9uZW50IH0gZnJvbSAnLi9CbGF6b3JET01Db21wb25lbnQnO1xyXG5cclxuY29uc3Qgc2hhcmVkVGVtcGxhdGVFbGVtRm9yUGFyc2luZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XHJcbmNvbnN0IHNoYXJlZFN2Z0VsZW1Gb3JQYXJzaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdnJyk7XHJcblxyXG5leHBvcnQgY2xhc3MgQmxhem9yTWFya3VwRWxlbWVudCBleHRlbmRzIEJsYXpvckRPTUNvbXBvbmVudCB7XHJcblxyXG4gIHB1YmxpYyBwYXJzZU1hcmt1cChtYXJrdXA6IHN0cmluZywgaXNTdmc6IGJvb2xlYW4pIHtcclxuICAgIGlmIChpc1N2Zykge1xyXG4gICAgICBzaGFyZWRTdmdFbGVtRm9yUGFyc2luZy5pbm5lckhUTUwgPSBtYXJrdXAgfHwgJyAnO1xyXG4gICAgICByZXR1cm4gc2hhcmVkU3ZnRWxlbUZvclBhcnNpbmc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaGFyZWRUZW1wbGF0ZUVsZW1Gb3JQYXJzaW5nLmlubmVySFRNTCA9IG1hcmt1cCB8fCAnICc7XHJcbiAgICAgIHJldHVybiBzaGFyZWRUZW1wbGF0ZUVsZW1Gb3JQYXJzaW5nLmNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBCcm93c2VyUmVuZGVyZXIgfSBmcm9tICcuLi9Ccm93c2VyUmVuZGVyZXInO1xyXG5pbXBvcnQgeyBCbGF6b3JET01FbGVtZW50LCBnZXRCbGF6b3JEb21FbGVtZW50IH0gZnJvbSAnLi9CbGF6b3JET01FbGVtZW50JztcclxuaW1wb3J0IHsgQmxhem9yRE9NQ29tcG9uZW50IH0gZnJvbSAnLi9CbGF6b3JET01Db21wb25lbnQnO1xyXG5pbXBvcnQgeyBCbGF6b3JJTlBVVEVsZW1lbnQgfSBmcm9tICcuL0JsYXpvcklOUFVURWxlbWVudCc7XHJcbmltcG9ydCB7IEJsYXpvck1hcmt1cEVsZW1lbnQgfSBmcm9tICcuL0JsYXpvck1hcmt1cEVsZW1lbnQnO1xyXG5cclxuaW1wb3J0IHsgZ2V0UmVnaXN0ZXJlZEN1c3RvbVRhZywgZ2V0UmVnaXN0ZXJlZEN1c3RvbURPTUVsZW1lbnQgfSBmcm9tICcuL1JlbmRlcmluZ0Z1bmN0aW9uJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCbGF6b3JET01FbGVtZW50KGJyOiBCcm93c2VyUmVuZGVyZXIsIHN0ZXBJbkVsZW1lbnQ6IEVsZW1lbnQpOiBCbGF6b3JET01FbGVtZW50IHtcclxuXHRsZXQgZWxlbWVudCA9IGdldEJsYXpvckRvbUVsZW1lbnQoc3RlcEluRWxlbWVudCk7XHJcbiAgaWYgKGVsZW1lbnQgIT09IG51bGwpIHJldHVybiBlbGVtZW50OyBcclxuXHJcblx0aWYgKHN0ZXBJbkVsZW1lbnQudGFnTmFtZSA9PSBcIklOUFVUXCIgfHwgc3RlcEluRWxlbWVudC50YWdOYW1lID09IFwiU0VMRUNUXCIgfHwgc3RlcEluRWxlbWVudC50YWdOYW1lID09IFwiVEVYVEFSRUFcIilcclxuXHRcdHJldHVybiBuZXcgQmxhem9ySU5QVVRFbGVtZW50KGJyLCBzdGVwSW5FbGVtZW50KTtcclxuXHRlbHNlIHtcclxuXHRcdGxldCBjdXN0b21ET00gPSBnZXRSZWdpc3RlcmVkQ3VzdG9tVGFnKHN0ZXBJbkVsZW1lbnQudGFnTmFtZSkgYXMgYW55O1xyXG5cdFx0aWYgKGN1c3RvbURPTSAhPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gY3VzdG9tRE9NKGJyLCBzdGVwSW5FbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gbmV3IEJsYXpvckRPTUVsZW1lbnQoYnIsIHN0ZXBJbkVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJsYXpvck1hcmt1cENvbXBvbmVudChicjogQnJvd3NlclJlbmRlcmVyLCBjb21wb25lbnRJZDogbnVtYmVyLCBwYXJlbnQ6IEJsYXpvckRPTUVsZW1lbnQsIGNoaWxkSW5kZXg6IG51bWJlcik6IEJsYXpvck1hcmt1cEVsZW1lbnQge1xyXG4gIHJldHVybiBuZXcgQmxhem9yTWFya3VwRWxlbWVudChjb21wb25lbnRJZCwgcGFyZW50LCBjaGlsZEluZGV4LCBicik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCbGF6b3JET01Db21wb25lbnQoYnI6IEJyb3dzZXJSZW5kZXJlciwgY29tcG9uZW50SWQ6IG51bWJlciwgcGFyZW50OiBCbGF6b3JET01FbGVtZW50LCBjaGlsZEluZGV4OiBudW1iZXIsIGN1c3RvbUNvbXBvbmVudFR5cGU6IG51bWJlcik6IEJsYXpvckRPTUNvbXBvbmVudCB7XHJcblx0bGV0IGJsYXpvckVsZW1lbnQ6IEJsYXpvckRPTUNvbXBvbmVudCB8IG51bGwgPSBudWxsO1xyXG5cclxuXHRpZiAoY3VzdG9tQ29tcG9uZW50VHlwZSAhPT0gMCkge1xyXG5cdFx0bGV0IGN1c3RvbUVsZW1lbnQgPSBnZXRSZWdpc3RlcmVkQ3VzdG9tRE9NRWxlbWVudChjdXN0b21Db21wb25lbnRUeXBlKSBhcyBhbnk7XHJcblx0XHRibGF6b3JFbGVtZW50ID0gY3VzdG9tRWxlbWVudChjb21wb25lbnRJZCwgcGFyZW50LCBjaGlsZEluZGV4LCBicik7XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0Ymxhem9yRWxlbWVudCA9IG5ldyBCbGF6b3JET01Db21wb25lbnQoY29tcG9uZW50SWQsIHBhcmVudCwgY2hpbGRJbmRleCwgYnIpO1xyXG5cdH1cclxuXHRyZXR1cm4gYmxhem9yRWxlbWVudCE7XHJcbn1cclxuIiwiY29uc3QgcmVnaXN0ZXJlZEN1c3RvbVRhZ3M6IHsgW2lkZW50aWZpZXI6IHN0cmluZ106IEZ1bmN0aW9uIHwgdW5kZWZpbmVkIH0gPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckN1c3RvbVRhZyhpZGVudGlmaWVyOiBzdHJpbmcsIGltcGxlbWVudGF0aW9uOiBGdW5jdGlvbikge1xyXG5cdHJlZ2lzdGVyZWRDdXN0b21UYWdzW2lkZW50aWZpZXJdID0gaW1wbGVtZW50YXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWdpc3RlcmVkQ3VzdG9tVGFnKGlkZW50aWZpZXI6IHN0cmluZyk6IEZ1bmN0aW9uIHwgbnVsbCB7XHJcblx0Y29uc3QgcmVzdWx0ID0gcmVnaXN0ZXJlZEN1c3RvbVRhZ3NbaWRlbnRpZmllcl07XHJcblx0aWYgKHJlc3VsdCkge1xyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG59XHJcblxyXG5cclxuY29uc3QgcmVnaXN0ZXJlZEN1c3RvbUVsZW1lbnQ6IHsgW2lkZW50aWZpZXI6IG51bWJlcl06IEZ1bmN0aW9uIHwgdW5kZWZpbmVkIH0gPSB7fTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckN1c3RvbURPTUVsZW1lbnQoaWRlbnRpZmllcjogbnVtYmVyLCBpbXBsZW1lbnRhdGlvbjogRnVuY3Rpb24pIHtcclxuXHRyZWdpc3RlcmVkQ3VzdG9tRWxlbWVudFtpZGVudGlmaWVyXSA9IGltcGxlbWVudGF0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVnaXN0ZXJlZEN1c3RvbURPTUVsZW1lbnQoaWRlbnRpZmllcjogbnVtYmVyKTogRnVuY3Rpb24gfCBudWxsIHtcclxuXHRjb25zdCByZXN1bHQgPSByZWdpc3RlcmVkQ3VzdG9tRWxlbWVudFtpZGVudGlmaWVyXTtcclxuXHRpZiAocmVzdWx0KSB7XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXZlbnRGb3JEb3ROZXQsIFVJRXZlbnRBcmdzIH0gZnJvbSAnLi9FdmVudEZvckRvdE5ldCc7XHJcblxyXG5jb25zdCBub25CdWJibGluZ0V2ZW50cyA9IHRvTG9va3VwKFtcclxuICAnYWJvcnQnLCAnYmx1cicsICdjaGFuZ2UnLCAnZXJyb3InLCAnZm9jdXMnLCAnbG9hZCcsICdsb2FkZW5kJywgJ2xvYWRzdGFydCcsICdtb3VzZWVudGVyJywgJ21vdXNlbGVhdmUnLFxyXG4gICdwcm9ncmVzcycsICdyZXNldCcsICdzY3JvbGwnLCAnc3VibWl0JywgJ3VubG9hZCcsICdET01Ob2RlSW5zZXJ0ZWRJbnRvRG9jdW1lbnQnLCAnRE9NTm9kZVJlbW92ZWRGcm9tRG9jdW1lbnQnXHJcbl0pO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBPbkV2ZW50Q2FsbGJhY2sge1xyXG4gIChldmVudDogRXZlbnQsIGNvbXBvbmVudElkOiBudW1iZXIsIGV2ZW50SGFuZGxlcklkOiBudW1iZXIsIGV2ZW50QXJnczogRXZlbnRGb3JEb3ROZXQ8VUlFdmVudEFyZ3M+KTogdm9pZDtcclxufVxyXG5cclxuLy8gUmVzcG9uc2libGUgZm9yIGFkZGluZy9yZW1vdmluZyB0aGUgZXZlbnRJbmZvIG9uIGFuIGV4cGFuZG8gcHJvcGVydHkgb24gRE9NIGVsZW1lbnRzLCBhbmRcclxuLy8gY2FsbGluZyBhbiBFdmVudEluZm9TdG9yZSB0aGF0IGRlYWxzIHdpdGggcmVnaXN0ZXJpbmcvdW5yZWdpc3RlcmluZyB0aGUgdW5kZXJseWluZyBkZWxlZ2F0ZWRcclxuLy8gZXZlbnQgbGlzdGVuZXJzIGFzIHJlcXVpcmVkIChhbmQgYWxzbyBtYXBzIGFjdHVhbCBldmVudHMgYmFjayB0byB0aGUgZ2l2ZW4gY2FsbGJhY2spLlxyXG5leHBvcnQgY2xhc3MgRXZlbnREZWxlZ2F0b3Ige1xyXG4gIHByaXZhdGUgc3RhdGljIG5leHRFdmVudERlbGVnYXRvcklkID0gMDtcclxuICBwcml2YXRlIGV2ZW50c0NvbGxlY3Rpb25LZXk6IHN0cmluZztcclxuICBwcml2YXRlIGV2ZW50SW5mb1N0b3JlOiBFdmVudEluZm9TdG9yZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvbkV2ZW50OiBPbkV2ZW50Q2FsbGJhY2spIHtcclxuICAgIGNvbnN0IGV2ZW50RGVsZWdhdG9ySWQgPSArK0V2ZW50RGVsZWdhdG9yLm5leHRFdmVudERlbGVnYXRvcklkO1xyXG4gICAgdGhpcy5ldmVudHNDb2xsZWN0aW9uS2V5ID0gYF9ibGF6b3JFdmVudHNfJHtldmVudERlbGVnYXRvcklkfWA7XHJcbiAgICB0aGlzLmV2ZW50SW5mb1N0b3JlID0gbmV3IEV2ZW50SW5mb1N0b3JlKHRoaXMub25HbG9iYWxFdmVudC5iaW5kKHRoaXMpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRMaXN0ZW5lcihlbGVtZW50OiBFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgY29tcG9uZW50SWQ6IG51bWJlciwgZXZlbnRIYW5kbGVySWQ6IG51bWJlcikge1xyXG4gICAgLy8gRW5zdXJlIHdlIGhhdmUgYSBwbGFjZSB0byBzdG9yZSBldmVudCBpbmZvIGZvciB0aGlzIGVsZW1lbnRcclxuICAgIGxldCBpbmZvRm9yRWxlbWVudDogRXZlbnRIYW5kbGVySW5mb3NGb3JFbGVtZW50ID0gZWxlbWVudFt0aGlzLmV2ZW50c0NvbGxlY3Rpb25LZXldO1xyXG4gICAgaWYgKCFpbmZvRm9yRWxlbWVudCkge1xyXG4gICAgICBpbmZvRm9yRWxlbWVudCA9IGVsZW1lbnRbdGhpcy5ldmVudHNDb2xsZWN0aW9uS2V5XSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmZvRm9yRWxlbWVudC5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpKSB7XHJcbiAgICAgIC8vIFdlIGNhbiBjaGVhcGx5IHVwZGF0ZSB0aGUgaW5mbyBvbiB0aGUgZXhpc3Rpbmcgb2JqZWN0IGFuZCBkb24ndCBuZWVkIGFueSBvdGhlciBob3VzZWtlZXBpbmdcclxuICAgICAgY29uc3Qgb2xkSW5mbyA9IGluZm9Gb3JFbGVtZW50W2V2ZW50TmFtZV07XHJcbiAgICAgIHRoaXMuZXZlbnRJbmZvU3RvcmUudXBkYXRlKG9sZEluZm8uZXZlbnRIYW5kbGVySWQsIGV2ZW50SGFuZGxlcklkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEdvIHRocm91Z2ggdGhlIHdob2xlIGZsb3cgd2hpY2ggbWlnaHQgaW52b2x2ZSByZWdpc3RlcmluZyBhIG5ldyBnbG9iYWwgaGFuZGxlclxyXG4gICAgICBjb25zdCBuZXdJbmZvID0geyBlbGVtZW50LCBldmVudE5hbWUsIGNvbXBvbmVudElkLCBldmVudEhhbmRsZXJJZCB9O1xyXG4gICAgICB0aGlzLmV2ZW50SW5mb1N0b3JlLmFkZChuZXdJbmZvKTtcclxuICAgICAgaW5mb0ZvckVsZW1lbnRbZXZlbnROYW1lXSA9IG5ld0luZm87XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlTGlzdGVuZXIoZXZlbnRIYW5kbGVySWQ6IG51bWJlcikge1xyXG4gICAgLy8gVGhpcyBtZXRob2QgZ2V0cyBjYWxsZWQgd2hlbmV2ZXIgdGhlIC5ORVQtc2lkZSBjb2RlIHJlcG9ydHMgdGhhdCBhIGNlcnRhaW4gZXZlbnQgaGFuZGxlclxyXG4gICAgLy8gaGFzIGJlZW4gZGlzcG9zZWQuIEhvd2V2ZXIgd2Ugd2lsbCBhbHJlYWR5IGhhdmUgZGlzcG9zZWQgdGhlIGluZm8gYWJvdXQgdGhhdCBoYW5kbGVyIGlmXHJcbiAgICAvLyB0aGUgZXZlbnRIYW5kbGVySWQgZm9yIHRoZSAoZWxlbWVudCxldmVudE5hbWUpIHBhaXIgd2FzIHJlcGxhY2VkIGR1cmluZyBkaWZmIGFwcGxpY2F0aW9uLlxyXG4gICAgY29uc3QgaW5mbyA9IHRoaXMuZXZlbnRJbmZvU3RvcmUucmVtb3ZlKGV2ZW50SGFuZGxlcklkKTtcclxuICAgIGlmIChpbmZvKSB7XHJcbiAgICAgIC8vIExvb2tzIGxpa2UgdGhpcyBldmVudCBoYW5kbGVyIHdhc24ndCBhbHJlYWR5IGRpc3Bvc2VkXHJcbiAgICAgIC8vIFJlbW92ZSB0aGUgYXNzb2NpYXRlZCBkYXRhIGZyb20gdGhlIERPTSBlbGVtZW50XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBpbmZvLmVsZW1lbnQ7XHJcbiAgICAgIGlmIChlbGVtZW50Lmhhc093blByb3BlcnR5KHRoaXMuZXZlbnRzQ29sbGVjdGlvbktleSkpIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50RXZlbnRJbmZvczogRXZlbnRIYW5kbGVySW5mb3NGb3JFbGVtZW50ID0gZWxlbWVudFt0aGlzLmV2ZW50c0NvbGxlY3Rpb25LZXldO1xyXG4gICAgICAgIGRlbGV0ZSBlbGVtZW50RXZlbnRJbmZvc1tpbmZvLmV2ZW50TmFtZV07XHJcbiAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVsZW1lbnRFdmVudEluZm9zKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIGRlbGV0ZSBlbGVtZW50W3RoaXMuZXZlbnRzQ29sbGVjdGlvbktleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uR2xvYmFsRXZlbnQoZXZ0OiBFdmVudCkge1xyXG4gICAgaWYgKCEoZXZ0LnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTY2FuIHVwIHRoZSBlbGVtZW50IGhpZXJhcmNoeSwgbG9va2luZyBmb3IgYW55IG1hdGNoaW5nIHJlZ2lzdGVyZWQgZXZlbnQgaGFuZGxlcnNcclxuICAgIGxldCBjYW5kaWRhdGVFbGVtZW50ID0gZXZ0LnRhcmdldCBhcyBFbGVtZW50IHwgbnVsbDtcclxuICAgIGxldCBldmVudEFyZ3M6IEV2ZW50Rm9yRG90TmV0PFVJRXZlbnRBcmdzPiB8IG51bGwgPSBudWxsOyAvLyBQb3B1bGF0ZSBsYXppbHlcclxuICAgIGNvbnN0IGV2ZW50SXNOb25CdWJibGluZyA9IG5vbkJ1YmJsaW5nRXZlbnRzLmhhc093blByb3BlcnR5KGV2dC50eXBlKTtcclxuICAgIHdoaWxlIChjYW5kaWRhdGVFbGVtZW50KSB7XHJcbiAgICAgIGlmIChjYW5kaWRhdGVFbGVtZW50Lmhhc093blByb3BlcnR5KHRoaXMuZXZlbnRzQ29sbGVjdGlvbktleSkpIHtcclxuICAgICAgICBjb25zdCBoYW5kbGVySW5mb3MgPSBjYW5kaWRhdGVFbGVtZW50W3RoaXMuZXZlbnRzQ29sbGVjdGlvbktleV07XHJcbiAgICAgICAgaWYgKGhhbmRsZXJJbmZvcy5oYXNPd25Qcm9wZXJ0eShldnQudHlwZSkpIHtcclxuICAgICAgICAgIC8vIFdlIGFyZSBnb2luZyB0byByYWlzZSBhbiBldmVudCBmb3IgdGhpcyBlbGVtZW50LCBzbyBwcmVwYXJlIGluZm8gbmVlZGVkIGJ5IHRoZSAuTkVUIGNvZGVcclxuICAgICAgICAgIGlmICghZXZlbnRBcmdzKSB7XHJcbiAgICAgICAgICAgIGV2ZW50QXJncyA9IEV2ZW50Rm9yRG90TmV0LmZyb21ET01FdmVudChldnQpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IGhhbmRsZXJJbmZvID0gaGFuZGxlckluZm9zW2V2dC50eXBlXTtcclxuICAgICAgICAgIHRoaXMub25FdmVudChldnQsIGhhbmRsZXJJbmZvLmNvbXBvbmVudElkLCBoYW5kbGVySW5mby5ldmVudEhhbmRsZXJJZCwgZXZlbnRBcmdzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhbmRpZGF0ZUVsZW1lbnQgPSBldmVudElzTm9uQnViYmxpbmcgPyBudWxsIDogY2FuZGlkYXRlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gUmVzcG9uc2libGUgZm9yIGFkZGluZyBhbmQgcmVtb3ZpbmcgdGhlIGdsb2JhbCBsaXN0ZW5lciB3aGVuIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzXHJcbi8vIGZvciBhIGdpdmVuIGV2ZW50IG5hbWUgY2hhbmdlcyBiZXR3ZWVuIHplcm8gYW5kIG5vbnplcm9cclxuY2xhc3MgRXZlbnRJbmZvU3RvcmUge1xyXG4gIHByaXZhdGUgaW5mb3NCeUV2ZW50SGFuZGxlcklkOiB7IFtldmVudEhhbmRsZXJJZDogbnVtYmVyXTogRXZlbnRIYW5kbGVySW5mbyB9ID0ge307XHJcbiAgcHJpdmF0ZSBjb3VudEJ5RXZlbnROYW1lOiB7IFtldmVudE5hbWU6IHN0cmluZ106IG51bWJlciB9ID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2xvYmFsTGlzdGVuZXI6IEV2ZW50TGlzdGVuZXIpIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGQoaW5mbzogRXZlbnRIYW5kbGVySW5mbykge1xyXG4gICAgaWYgKHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW2luZm8uZXZlbnRIYW5kbGVySWRdKSB7XHJcbiAgICAgIC8vIFNob3VsZCBuZXZlciBoYXBwZW4sIGJ1dCB3ZSB3YW50IHRvIGtub3cgaWYgaXQgZG9lc1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEV2ZW50ICR7aW5mby5ldmVudEhhbmRsZXJJZH0gaXMgYWxyZWFkeSB0cmFja2VkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbmZvc0J5RXZlbnRIYW5kbGVySWRbaW5mby5ldmVudEhhbmRsZXJJZF0gPSBpbmZvO1xyXG5cclxuICAgIGNvbnN0IGV2ZW50TmFtZSA9IGluZm8uZXZlbnROYW1lO1xyXG4gICAgaWYgKHRoaXMuY291bnRCeUV2ZW50TmFtZS5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpKSB7XHJcbiAgICAgIHRoaXMuY291bnRCeUV2ZW50TmFtZVtldmVudE5hbWVdKys7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXSA9IDE7XHJcblxyXG4gICAgICAvLyBUbyBtYWtlIGRlbGVnYXRpb24gd29yayB3aXRoIG5vbi1idWJibGluZyBldmVudHMsIHJlZ2lzdGVyIGEgJ2NhcHR1cmUnIGxpc3RlbmVyLlxyXG4gICAgICAvLyBXZSBwcmVzZXJ2ZSB0aGUgbm9uLWJ1YmJsaW5nIGJlaGF2aW9yIGJ5IG9ubHkgZGlzcGF0Y2hpbmcgc3VjaCBldmVudHMgdG8gdGhlIHRhcmdldGVkIGVsZW1lbnQuXHJcbiAgICAgIGNvbnN0IHVzZUNhcHR1cmUgPSBub25CdWJibGluZ0V2ZW50cy5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdGhpcy5nbG9iYWxMaXN0ZW5lciwgdXNlQ2FwdHVyZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlKG9sZEV2ZW50SGFuZGxlcklkOiBudW1iZXIsIG5ld0V2ZW50SGFuZGxlcklkOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZC5oYXNPd25Qcm9wZXJ0eShuZXdFdmVudEhhbmRsZXJJZCkpIHtcclxuICAgICAgLy8gU2hvdWxkIG5ldmVyIGhhcHBlbiwgYnV0IHdlIHdhbnQgdG8ga25vdyBpZiBpdCBkb2VzXHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXZlbnQgJHtuZXdFdmVudEhhbmRsZXJJZH0gaXMgYWxyZWFkeSB0cmFja2VkYCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luY2Ugd2UncmUganVzdCB1cGRhdGluZyB0aGUgZXZlbnQgaGFuZGxlciBJRCwgdGhlcmUncyBubyBuZWVkIHRvIHVwZGF0ZSB0aGUgZ2xvYmFsIGNvdW50c1xyXG4gICAgY29uc3QgaW5mbyA9IHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW29sZEV2ZW50SGFuZGxlcklkXTtcclxuICAgIGRlbGV0ZSB0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtvbGRFdmVudEhhbmRsZXJJZF07XHJcbiAgICBpbmZvLmV2ZW50SGFuZGxlcklkID0gbmV3RXZlbnRIYW5kbGVySWQ7XHJcbiAgICB0aGlzLmluZm9zQnlFdmVudEhhbmRsZXJJZFtuZXdFdmVudEhhbmRsZXJJZF0gPSBpbmZvO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZShldmVudEhhbmRsZXJJZDogbnVtYmVyKTogRXZlbnRIYW5kbGVySW5mbyB7XHJcbiAgICBjb25zdCBpbmZvID0gdGhpcy5pbmZvc0J5RXZlbnRIYW5kbGVySWRbZXZlbnRIYW5kbGVySWRdO1xyXG4gICAgaWYgKGluZm8pIHtcclxuICAgICAgZGVsZXRlIHRoaXMuaW5mb3NCeUV2ZW50SGFuZGxlcklkW2V2ZW50SGFuZGxlcklkXTtcclxuXHJcbiAgICAgIGNvbnN0IGV2ZW50TmFtZSA9IGluZm8uZXZlbnROYW1lO1xyXG4gICAgICBpZiAoLS10aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXSA9PT0gMCkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmNvdW50QnlFdmVudE5hbWVbZXZlbnROYW1lXTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgdGhpcy5nbG9iYWxMaXN0ZW5lcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaW5mbztcclxuICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBFdmVudEhhbmRsZXJJbmZvc0ZvckVsZW1lbnQge1xyXG4gIC8vIEFsdGhvdWdoIHdlICpjb3VsZCogdHJhY2sgbXVsdGlwbGUgZXZlbnQgaGFuZGxlcnMgcGVyIChlbGVtZW50LCBldmVudE5hbWUpIHBhaXJcclxuICAvLyAoc2luY2UgdGhleSBoYXZlIGRpc3RpbmN0IGV2ZW50SGFuZGxlcklkIHZhbHVlcyksIHRoZXJlJ3Mgbm8gcG9pbnQgZG9pbmcgc28gYmVjYXVzZVxyXG4gIC8vIG91ciBwcm9ncmFtbWluZyBtb2RlbCBpcyB0aGF0IHlvdSBkZWNsYXJlIGV2ZW50IGhhbmRsZXJzIGFzIGF0dHJpYnV0ZXMuIEFuIGVsZW1lbnRcclxuICAvLyBjYW4gb25seSBoYXZlIG9uZSBhdHRyaWJ1dGUgd2l0aCBhIGdpdmVuIG5hbWUsIGhlbmNlIG9ubHkgb25lIGV2ZW50IGhhbmRsZXIgd2l0aFxyXG4gIC8vIHRoYXQgbmFtZSBhdCBhbnkgb25lIHRpbWUuXHJcbiAgLy8gU28gdG8ga2VlcCB0aGluZ3Mgc2ltcGxlLCBvbmx5IHRyYWNrIG9uZSBFdmVudEhhbmRsZXJJbmZvIHBlciAoZWxlbWVudCwgZXZlbnROYW1lKVxyXG4gIFtldmVudE5hbWU6IHN0cmluZ106IEV2ZW50SGFuZGxlckluZm9cclxufVxyXG5cclxuaW50ZXJmYWNlIEV2ZW50SGFuZGxlckluZm8ge1xyXG4gIGVsZW1lbnQ6IEVsZW1lbnQ7XHJcbiAgZXZlbnROYW1lOiBzdHJpbmc7XHJcbiAgY29tcG9uZW50SWQ6IG51bWJlcjtcclxuICBldmVudEhhbmRsZXJJZDogbnVtYmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b0xvb2t1cChpdGVtczogc3RyaW5nW10pOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSB7XHJcbiAgY29uc3QgcmVzdWx0ID0ge307XHJcbiAgaXRlbXMuZm9yRWFjaCh2YWx1ZSA9PiB7IHJlc3VsdFt2YWx1ZV0gPSB0cnVlOyB9KTtcclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBFdmVudEZvckRvdE5ldDxURGF0YSBleHRlbmRzIFVJRXZlbnRBcmdzPiB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHR5cGU6IEV2ZW50QXJnc1R5cGUsIHB1YmxpYyByZWFkb25seSBkYXRhOiBURGF0YSkge1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21ET01FdmVudChldmVudDogRXZlbnQpOiBFdmVudEZvckRvdE5ldDxVSUV2ZW50QXJncz4ge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBFbGVtZW50O1xyXG4gICAgc3dpdGNoIChldmVudC50eXBlKSB7XHJcblxyXG4gICAgICBjYXNlICdjaGFuZ2UnOiB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0SXNDaGVja2JveCA9IGlzQ2hlY2tib3goZWxlbWVudCk7XHJcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0YXJnZXRJc0NoZWNrYm94ID8gISFlbGVtZW50WydjaGVja2VkJ10gOiBlbGVtZW50Wyd2YWx1ZSddO1xyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlDaGFuZ2VFdmVudEFyZ3M+KCdjaGFuZ2UnLCB7IHR5cGU6IGV2ZW50LnR5cGUsIHZhbHVlOiBuZXdWYWx1ZSB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2FzZSAnY29weSc6XHJcbiAgICAgIGNhc2UgJ2N1dCc6XHJcbiAgICAgIGNhc2UgJ3Bhc3RlJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJQ2xpcGJvYXJkRXZlbnRBcmdzPignY2xpcGJvYXJkJywgeyB0eXBlOiBldmVudC50eXBlIH0pO1xyXG5cclxuICAgICAgY2FzZSAnZHJhZyc6XHJcbiAgICAgIGNhc2UgJ2RyYWdlbmQnOlxyXG4gICAgICBjYXNlICdkcmFnZW50ZXInOlxyXG4gICAgICBjYXNlICdkcmFnbGVhdmUnOlxyXG4gICAgICBjYXNlICdkcmFnb3Zlcic6XHJcbiAgICAgIGNhc2UgJ2RyYWdzdGFydCc6XHJcbiAgICAgIGNhc2UgJ2Ryb3AnOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlEcmFnRXZlbnRBcmdzPignZHJhZycsIHBhcnNlRHJhZ0V2ZW50KGV2ZW50KSk7XHJcblxyXG4gICAgICBjYXNlICdmb2N1cyc6XHJcbiAgICAgIGNhc2UgJ2JsdXInOlxyXG4gICAgICBjYXNlICdmb2N1c2luJzpcclxuICAgICAgY2FzZSAnZm9jdXNvdXQnOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlGb2N1c0V2ZW50QXJncz4oJ2ZvY3VzJywgeyB0eXBlOiBldmVudC50eXBlIH0pO1xyXG5cclxuICAgICAgY2FzZSAna2V5ZG93bic6XHJcbiAgICAgIGNhc2UgJ2tleXVwJzpcclxuICAgICAgY2FzZSAna2V5cHJlc3MnOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlLZXlib2FyZEV2ZW50QXJncz4oJ2tleWJvYXJkJywgcGFyc2VLZXlib2FyZEV2ZW50KDxLZXlib2FyZEV2ZW50PmV2ZW50KSk7XHJcblxyXG4gICAgICBjYXNlICdjb250ZXh0bWVudSc6XHJcbiAgICAgIGNhc2UgJ2NsaWNrJzpcclxuICAgICAgY2FzZSAnbW91c2VvdmVyJzpcclxuICAgICAgY2FzZSAnbW91c2VvdXQnOlxyXG4gICAgICBjYXNlICdtb3VzZW1vdmUnOlxyXG4gICAgICBjYXNlICdtb3VzZWRvd24nOlxyXG4gICAgICBjYXNlICdtb3VzZXVwJzpcclxuICAgICAgY2FzZSAnZGJsY2xpY2snOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlNb3VzZUV2ZW50QXJncz4oJ21vdXNlJywgcGFyc2VNb3VzZUV2ZW50KDxNb3VzZUV2ZW50PmV2ZW50KSk7XHJcblxyXG4gICAgICBjYXNlICdlcnJvcic6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSUVycm9yRXZlbnRBcmdzPignZXJyb3InLCBwYXJzZUVycm9yRXZlbnQoPEVycm9yRXZlbnQ+ZXZlbnQpKTtcclxuXHJcbiAgICAgIGNhc2UgJ2xvYWRzdGFydCc6XHJcbiAgICAgIGNhc2UgJ3RpbWVvdXQnOlxyXG4gICAgICBjYXNlICdhYm9ydCc6XHJcbiAgICAgIGNhc2UgJ2xvYWQnOlxyXG4gICAgICBjYXNlICdsb2FkZW5kJzpcclxuICAgICAgY2FzZSAncHJvZ3Jlc3MnOlxyXG4gICAgICAgIHJldHVybiBuZXcgRXZlbnRGb3JEb3ROZXQ8VUlQcm9ncmVzc0V2ZW50QXJncz4oJ3Byb2dyZXNzJywgcGFyc2VQcm9ncmVzc0V2ZW50KDxQcm9ncmVzc0V2ZW50PmV2ZW50KSk7XHJcblxyXG4gICAgICBjYXNlICd0b3VjaGNhbmNlbCc6XHJcbiAgICAgIGNhc2UgJ3RvdWNoZW5kJzpcclxuICAgICAgY2FzZSAndG91Y2htb3ZlJzpcclxuICAgICAgY2FzZSAndG91Y2hlbnRlcic6XHJcbiAgICAgIGNhc2UgJ3RvdWNobGVhdmUnOlxyXG4gICAgICBjYXNlICd0b3VjaHN0YXJ0JzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJVG91Y2hFdmVudEFyZ3M+KCd0b3VjaCcsIHBhcnNlVG91Y2hFdmVudCg8VG91Y2hFdmVudD5ldmVudCkpO1xyXG5cclxuICAgICAgY2FzZSAnZ290cG9pbnRlcmNhcHR1cmUnOlxyXG4gICAgICBjYXNlICdsb3N0cG9pbnRlcmNhcHR1cmUnOlxyXG4gICAgICBjYXNlICdwb2ludGVyY2FuY2VsJzpcclxuICAgICAgY2FzZSAncG9pbnRlcmRvd24nOlxyXG4gICAgICBjYXNlICdwb2ludGVyZW50ZXInOlxyXG4gICAgICBjYXNlICdwb2ludGVybGVhdmUnOlxyXG4gICAgICBjYXNlICdwb2ludGVybW92ZSc6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJvdXQnOlxyXG4gICAgICBjYXNlICdwb2ludGVyb3Zlcic6XHJcbiAgICAgIGNhc2UgJ3BvaW50ZXJ1cCc6XHJcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudEZvckRvdE5ldDxVSVBvaW50ZXJFdmVudEFyZ3M+KCdwb2ludGVyJywgcGFyc2VQb2ludGVyRXZlbnQoPFBvaW50ZXJFdmVudD5ldmVudCkpO1xyXG5cclxuICAgICAgY2FzZSAnd2hlZWwnOlxyXG4gICAgICBjYXNlICdtb3VzZXdoZWVsJzpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJV2hlZWxFdmVudEFyZ3M+KCd3aGVlbCcsIHBhcnNlV2hlZWxFdmVudCg8V2hlZWxFdmVudD5ldmVudCkpO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gbmV3IEV2ZW50Rm9yRG90TmV0PFVJRXZlbnRBcmdzPigndW5rbm93bicsIHsgdHlwZTogZXZlbnQudHlwZSB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlRHJhZ0V2ZW50KGV2ZW50OiBhbnkpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogZXZlbnQudHlwZSxcclxuICAgIGRldGFpbDogZXZlbnQuZGV0YWlsLFxyXG4gICAgZGF0YVRyYW5zZmVyOiBldmVudC5kYXRhVHJhbnNmZXIsXHJcbiAgICBzY3JlZW5YOiBldmVudC5zY3JlZW5YLFxyXG4gICAgc2NyZWVuWTogZXZlbnQuc2NyZWVuWSxcclxuICAgIGNsaWVudFg6IGV2ZW50LmNsaWVudFgsXHJcbiAgICBjbGllbnRZOiBldmVudC5jbGllbnRZLFxyXG4gICAgYnV0dG9uOiBldmVudC5idXR0b24sXHJcbiAgICBidXR0b25zOiBldmVudC5idXR0b25zLFxyXG4gICAgY3RybEtleTogZXZlbnQuY3RybEtleSxcclxuICAgIHNoaWZ0S2V5OiBldmVudC5zaGlmdEtleSxcclxuICAgIGFsdEtleTogZXZlbnQuYWx0S2V5LFxyXG4gICAgbWV0YUtleTogZXZlbnQubWV0YUtleVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VXaGVlbEV2ZW50KGV2ZW50OiBXaGVlbEV2ZW50KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnBhcnNlTW91c2VFdmVudChldmVudCksXHJcbiAgICBkZWx0YVg6IGV2ZW50LmRlbHRhWCxcclxuICAgIGRlbHRhWTogZXZlbnQuZGVsdGFZLFxyXG4gICAgZGVsdGFaOiBldmVudC5kZWx0YVosXHJcbiAgICBkZWx0YU1vZGU6IGV2ZW50LmRlbHRhTW9kZVxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlRXJyb3JFdmVudChldmVudDogRXJyb3JFdmVudCkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBldmVudC50eXBlLFxyXG4gICAgbWVzc2FnZTogZXZlbnQubWVzc2FnZSxcclxuICAgIGZpbGVuYW1lOiBldmVudC5maWxlbmFtZSxcclxuICAgIGxpbmVubzogZXZlbnQubGluZW5vLFxyXG4gICAgY29sbm86IGV2ZW50LmNvbG5vXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVByb2dyZXNzRXZlbnQoZXZlbnQ6IFByb2dyZXNzRXZlbnQpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogZXZlbnQudHlwZSxcclxuICAgIGxlbmd0aENvbXB1dGFibGU6IGV2ZW50Lmxlbmd0aENvbXB1dGFibGUsXHJcbiAgICBsb2FkZWQ6IGV2ZW50LmxvYWRlZCxcclxuICAgIHRvdGFsOiBldmVudC50b3RhbFxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlVG91Y2hFdmVudChldmVudDogVG91Y2hFdmVudCkge1xyXG5cclxuICBmdW5jdGlvbiBwYXJzZVRvdWNoKHRvdWNoTGlzdDogVG91Y2hMaXN0KSB7XHJcbiAgICBjb25zdCB0b3VjaGVzOiBVSVRvdWNoUG9pbnRbXSA9IFtdO1xyXG4gICAgXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdWNoTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCB0b3VjaCA9IHRvdWNoTGlzdFtpXTtcclxuICAgICAgdG91Y2hlcy5wdXNoKHtcclxuICAgICAgICBpZGVudGlmaWVyOiB0b3VjaC5pZGVudGlmaWVyLFxyXG4gICAgICAgIGNsaWVudFg6IHRvdWNoLmNsaWVudFgsXHJcbiAgICAgICAgY2xpZW50WTogdG91Y2guY2xpZW50WSxcclxuICAgICAgICBzY3JlZW5YOiB0b3VjaC5zY3JlZW5YLFxyXG4gICAgICAgIHNjcmVlblk6IHRvdWNoLnNjcmVlblksXHJcbiAgICAgICAgcGFnZVg6IHRvdWNoLnBhZ2VYLFxyXG4gICAgICAgIHBhZ2VZOiB0b3VjaC5wYWdlWVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0b3VjaGVzO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IGV2ZW50LnR5cGUsXHJcbiAgICBkZXRhaWw6IGV2ZW50LmRldGFpbCxcclxuICAgIHRvdWNoZXM6IHBhcnNlVG91Y2goZXZlbnQudG91Y2hlcyksXHJcbiAgICB0YXJnZXRUb3VjaGVzOiBwYXJzZVRvdWNoKGV2ZW50LnRhcmdldFRvdWNoZXMpLFxyXG4gICAgY2hhbmdlZFRvdWNoZXM6IHBhcnNlVG91Y2goZXZlbnQuY2hhbmdlZFRvdWNoZXMpLFxyXG4gICAgY3RybEtleTogZXZlbnQuY3RybEtleSxcclxuICAgIHNoaWZ0S2V5OiBldmVudC5zaGlmdEtleSxcclxuICAgIGFsdEtleTogZXZlbnQuYWx0S2V5LFxyXG4gICAgbWV0YUtleTogZXZlbnQubWV0YUtleVxyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhcnNlS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBldmVudC50eXBlLFxyXG4gICAga2V5OiBldmVudC5rZXksXHJcbiAgICBjb2RlOiBldmVudC5jb2RlLFxyXG4gICAgbG9jYXRpb246IGV2ZW50LmxvY2F0aW9uLFxyXG4gICAgcmVwZWF0OiBldmVudC5yZXBlYXQsXHJcbiAgICBjdHJsS2V5OiBldmVudC5jdHJsS2V5LFxyXG4gICAgc2hpZnRLZXk6IGV2ZW50LnNoaWZ0S2V5LFxyXG4gICAgYWx0S2V5OiBldmVudC5hbHRLZXksXHJcbiAgICBtZXRhS2V5OiBldmVudC5tZXRhS2V5XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VQb2ludGVyRXZlbnQoZXZlbnQ6IFBvaW50ZXJFdmVudCkge1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5wYXJzZU1vdXNlRXZlbnQoZXZlbnQpLFxyXG4gICAgcG9pbnRlcklkOiBldmVudC5wb2ludGVySWQsXHJcbiAgICB3aWR0aDogZXZlbnQud2lkdGgsXHJcbiAgICBoZWlnaHQ6IGV2ZW50LmhlaWdodCxcclxuICAgIHByZXNzdXJlOiBldmVudC5wcmVzc3VyZSxcclxuICAgIHRpbHRYOiBldmVudC50aWx0WCxcclxuICAgIHRpbHRZOiBldmVudC50aWx0WSxcclxuICAgIHBvaW50ZXJUeXBlOiBldmVudC5wb2ludGVyVHlwZSxcclxuICAgIGlzUHJpbWFyeTogZXZlbnQuaXNQcmltYXJ5XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VNb3VzZUV2ZW50KGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IGV2ZW50LnR5cGUsXHJcbiAgICBkZXRhaWw6IGV2ZW50LmRldGFpbCxcclxuICAgIHNjcmVlblg6IGV2ZW50LnNjcmVlblgsXHJcbiAgICBzY3JlZW5ZOiBldmVudC5zY3JlZW5ZLFxyXG4gICAgY2xpZW50WDogZXZlbnQuY2xpZW50WCxcclxuICAgIGNsaWVudFk6IGV2ZW50LmNsaWVudFksXHJcbiAgICBidXR0b246IGV2ZW50LmJ1dHRvbixcclxuICAgIGJ1dHRvbnM6IGV2ZW50LmJ1dHRvbnMsXHJcbiAgICBjdHJsS2V5OiBldmVudC5jdHJsS2V5LFxyXG4gICAgc2hpZnRLZXk6IGV2ZW50LnNoaWZ0S2V5LFxyXG4gICAgYWx0S2V5OiBldmVudC5hbHRLZXksXHJcbiAgICBtZXRhS2V5OiBldmVudC5tZXRhS2V5XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNDaGVja2JveChlbGVtZW50OiBFbGVtZW50IHwgbnVsbCkge1xyXG4gIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJyAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZSgndHlwZScpID09PSAnY2hlY2tib3gnO1xyXG59XHJcblxyXG4vLyBUaGUgZm9sbG93aW5nIGludGVyZmFjZXMgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aGUgVUlFdmVudEFyZ3MgQyMgY2xhc3Nlc1xyXG5cclxuZXhwb3J0IHR5cGUgRXZlbnRBcmdzVHlwZSA9XHJcbiAgJ2NoYW5nZScgfCAnY2xpcGJvYXJkJyB8ICdkcmFnJyB8ICdlcnJvcicgfCAnZm9jdXMnIHwgJ2tleWJvYXJkJyB8ICdtb3VzZScgfCAncG9pbnRlcicgfCAncHJvZ3Jlc3MnIHwgJ3RvdWNoJyB8ICd1bmtub3duJyB8ICd3aGVlbCdcclxuICB8ICdjdXN0b20nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVSUV2ZW50QXJncyB7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlDaGFuZ2VFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbiAgdmFsdWU6IHN0cmluZyB8IGJvb2xlYW47XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSUNsaXBib2FyZEV2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJRHJhZ0V2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxuICBkZXRhaWw6IG51bWJlcjtcclxuICBkYXRhVHJhbnNmZXI6IFVJRGF0YVRyYW5zZmVyO1xyXG4gIHNjcmVlblg6IG51bWJlcjtcclxuICBzY3JlZW5ZOiBudW1iZXI7XHJcbiAgY2xpZW50WDogbnVtYmVyO1xyXG4gIGNsaWVudFk6IG51bWJlcjtcclxuICBidXR0b246IG51bWJlcjtcclxuICBidXR0b25zOiBudW1iZXI7XHJcbiAgY3RybEtleTogYm9vbGVhbjtcclxuICBzaGlmdEtleTogYm9vbGVhbjtcclxuICBhbHRLZXk6IGJvb2xlYW47XHJcbiAgbWV0YUtleTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJRGF0YVRyYW5zZmVyIHtcclxuICBkcm9wRWZmZWN0OiBzdHJpbmc7XHJcbiAgZWZmZWN0QWxsb3dlZDogc3RyaW5nO1xyXG4gIGZpbGVzOiBzdHJpbmdbXTtcclxuICBpdGVtczogVUlEYXRhVHJhbnNmZXJJdGVtW107XHJcbiAgdHlwZXM6IHN0cmluZ1tdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlEYXRhVHJhbnNmZXJJdGVtIHtcclxuICBraW5kOiBzdHJpbmc7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlFcnJvckV2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxuICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgZmlsZW5hbWU6IHN0cmluZztcclxuICBsaW5lbm86IG51bWJlcjtcclxuICBjb2xubzogbnVtYmVyO1xyXG5cclxuICAvLyBvbWl0dGluZyAnZXJyb3InIGhlcmUgc2luY2Ugd2UnZCBoYXZlIHRvIHNlcmlhbGl6ZSBpdCwgYW5kIGl0J3Mgbm90IGNsZWFyIHdlIHdpbGwgd2FudCB0b1xyXG4gIC8vIGRvIHRoYXQuIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FcnJvckV2ZW50XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSUZvY3VzRXZlbnRBcmdzIGV4dGVuZHMgVUlFdmVudEFyZ3Mge1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlLZXlib2FyZEV2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxuICBrZXk6IHN0cmluZztcclxuICBjb2RlOiBzdHJpbmc7XHJcbiAgbG9jYXRpb246IG51bWJlcjtcclxuICByZXBlYXQ6IGJvb2xlYW47XHJcbiAgY3RybEtleTogYm9vbGVhbjtcclxuICBzaGlmdEtleTogYm9vbGVhbjtcclxuICBhbHRLZXk6IGJvb2xlYW47XHJcbiAgbWV0YUtleTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJTW91c2VFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbiAgZGV0YWlsOiBudW1iZXI7XHJcbiAgc2NyZWVuWDogbnVtYmVyO1xyXG4gIHNjcmVlblk6IG51bWJlcjtcclxuICBjbGllbnRYOiBudW1iZXI7XHJcbiAgY2xpZW50WTogbnVtYmVyO1xyXG4gIGJ1dHRvbjogbnVtYmVyO1xyXG4gIGJ1dHRvbnM6IG51bWJlcjtcclxuICBjdHJsS2V5OiBib29sZWFuO1xyXG4gIHNoaWZ0S2V5OiBib29sZWFuO1xyXG4gIGFsdEtleTogYm9vbGVhbjtcclxuICBtZXRhS2V5OiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlQb2ludGVyRXZlbnRBcmdzIGV4dGVuZHMgVUlNb3VzZUV2ZW50QXJncyB7XHJcbiAgcG9pbnRlcklkOiBudW1iZXI7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICBwcmVzc3VyZTogbnVtYmVyO1xyXG4gIHRpbHRYOiBudW1iZXI7XHJcbiAgdGlsdFk6IG51bWJlcjtcclxuICBwb2ludGVyVHlwZTogc3RyaW5nO1xyXG4gIGlzUHJpbWFyeTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJUHJvZ3Jlc3NFdmVudEFyZ3MgZXh0ZW5kcyBVSUV2ZW50QXJncyB7XHJcbiAgbGVuZ3RoQ29tcHV0YWJsZTogYm9vbGVhbjtcclxuICBsb2FkZWQ6IG51bWJlcjtcclxuICB0b3RhbDogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVUlUb3VjaEV2ZW50QXJncyBleHRlbmRzIFVJRXZlbnRBcmdzIHtcclxuICBkZXRhaWw6IG51bWJlcjtcclxuICB0b3VjaGVzOiBVSVRvdWNoUG9pbnRbXTtcclxuICB0YXJnZXRUb3VjaGVzOiBVSVRvdWNoUG9pbnRbXTtcclxuICBjaGFuZ2VkVG91Y2hlczogVUlUb3VjaFBvaW50W107XHJcbiAgY3RybEtleTogYm9vbGVhbjtcclxuICBzaGlmdEtleTogYm9vbGVhbjtcclxuICBhbHRLZXk6IGJvb2xlYW47XHJcbiAgbWV0YUtleTogYm9vbGVhbjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFVJVG91Y2hQb2ludCB7XHJcbiAgaWRlbnRpZmllcjogbnVtYmVyO1xyXG4gIHNjcmVlblg6IG51bWJlcjtcclxuICBzY3JlZW5ZOiBudW1iZXI7XHJcbiAgY2xpZW50WDogbnVtYmVyO1xyXG4gIGNsaWVudFk6IG51bWJlcjtcclxuICBwYWdlWDogbnVtYmVyO1xyXG4gIHBhZ2VZOiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBVSVdoZWVsRXZlbnRBcmdzIGV4dGVuZHMgVUlNb3VzZUV2ZW50QXJncyB7XHJcbiAgZGVsdGFYOiBudW1iZXI7XHJcbiAgZGVsdGFZOiBudW1iZXI7XHJcbiAgZGVsdGFaOiBudW1iZXI7XHJcbiAgZGVsdGFNb2RlOiBudW1iZXI7XHJcbn1cclxuIiwiZXhwb3J0IGludGVyZmFjZSBSZW5kZXJCYXRjaCB7XHJcbiAgdXBkYXRlZENvbXBvbmVudHMoKTogQXJyYXlSYW5nZTxSZW5kZXJUcmVlRGlmZj47XHJcbiAgcmVmZXJlbmNlRnJhbWVzKCk6IEFycmF5UmFuZ2U8UmVuZGVyVHJlZUZyYW1lPjtcclxuICBkaXNwb3NlZENvbXBvbmVudElkcygpOiBBcnJheVJhbmdlPG51bWJlcj47XHJcbiAgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHMoKTogQXJyYXlSYW5nZTxudW1iZXI+O1xyXG5cclxuICB1cGRhdGVkQ29tcG9uZW50c0VudHJ5KHZhbHVlczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZURpZmY+LCBpbmRleDogbnVtYmVyKTogUmVuZGVyVHJlZURpZmY7XHJcbiAgcmVmZXJlbmNlRnJhbWVzRW50cnkodmFsdWVzOiBBcnJheVZhbHVlczxSZW5kZXJUcmVlRnJhbWU+LCBpbmRleDogbnVtYmVyKTogUmVuZGVyVHJlZUZyYW1lO1xyXG4gIGRpc3Bvc2VkQ29tcG9uZW50SWRzRW50cnkodmFsdWVzOiBBcnJheVZhbHVlczxudW1iZXI+LCBpbmRleDogbnVtYmVyKTogbnVtYmVyO1xyXG4gIGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzRW50cnkodmFsdWVzOiBBcnJheVZhbHVlczxudW1iZXI+LCBpbmRleDogbnVtYmVyKTogbnVtYmVyO1xyXG5cclxuICBkaWZmUmVhZGVyOiBSZW5kZXJUcmVlRGlmZlJlYWRlcjtcclxuICBlZGl0UmVhZGVyOiBSZW5kZXJUcmVlRWRpdFJlYWRlcjtcclxuICBmcmFtZVJlYWRlcjogUmVuZGVyVHJlZUZyYW1lUmVhZGVyO1xyXG4gIGFycmF5UmFuZ2VSZWFkZXI6IEFycmF5UmFuZ2VSZWFkZXI7XHJcbiAgYXJyYXlTZWdtZW50UmVhZGVyOiBBcnJheVNlZ21lbnRSZWFkZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXJyYXlSYW5nZVJlYWRlciB7XHJcbiAgY291bnQ8VD4oYXJyYXlSYW5nZTogQXJyYXlSYW5nZTxUPik6IG51bWJlcjtcclxuICB2YWx1ZXM8VD4oYXJyYXlSYW5nZTogQXJyYXlSYW5nZTxUPik6IEFycmF5VmFsdWVzPFQ+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5U2VnbWVudFJlYWRlciB7XHJcbiAgb2Zmc2V0PFQ+KGFycmF5U2VnbWVudDogQXJyYXlTZWdtZW50PFQ+KTogbnVtYmVyO1xyXG4gIGNvdW50PFQ+KGFycmF5U2VnbWVudDogQXJyYXlTZWdtZW50PFQ+KTogbnVtYmVyO1xyXG4gIHZhbHVlczxUPihhcnJheVNlZ21lbnQ6IEFycmF5U2VnbWVudDxUPik6IEFycmF5VmFsdWVzPFQ+O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVEaWZmUmVhZGVyIHtcclxuICBjb21wb25lbnRJZChkaWZmOiBSZW5kZXJUcmVlRGlmZik6IG51bWJlcjtcclxuICBlZGl0cyhkaWZmOiBSZW5kZXJUcmVlRGlmZik6IEFycmF5U2VnbWVudDxSZW5kZXJUcmVlRWRpdD47XHJcbiAgZWRpdHNFbnRyeSh2YWx1ZXM6IEFycmF5VmFsdWVzPFJlbmRlclRyZWVFZGl0PiwgaW5kZXg6IG51bWJlcik6IFJlbmRlclRyZWVFZGl0O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVFZGl0UmVhZGVyIHtcclxuICBlZGl0VHlwZShlZGl0OiBSZW5kZXJUcmVlRWRpdCk6IEVkaXRUeXBlO1xyXG4gIHNpYmxpbmdJbmRleChlZGl0OiBSZW5kZXJUcmVlRWRpdCk6IG51bWJlcjtcclxuICBuZXdUcmVlSW5kZXgoZWRpdDogUmVuZGVyVHJlZUVkaXQpOiBudW1iZXI7XHJcbiAgcmVtb3ZlZEF0dHJpYnV0ZU5hbWUoZWRpdDogUmVuZGVyVHJlZUVkaXQpOiBzdHJpbmcgfCBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVGcmFtZVJlYWRlciB7XHJcbiAgZnJhbWVUeXBlKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpOiBGcmFtZVR5cGU7XHJcbiAgc3VidHJlZUxlbmd0aChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogbnVtYmVyO1xyXG4gIGVsZW1lbnRSZWZlcmVuY2VDYXB0dXJlSWQoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IHN0cmluZyB8IG51bGw7XHJcbiAgY29tcG9uZW50SWQoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IG51bWJlcjtcclxuICBlbGVtZW50TmFtZShmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogc3RyaW5nIHwgbnVsbDtcclxuICB0ZXh0Q29udGVudChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogc3RyaW5nIHwgbnVsbDtcclxuICBtYXJrdXBDb250ZW50KGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpOiBzdHJpbmc7XHJcbiAgYXR0cmlidXRlTmFtZShmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogc3RyaW5nIHwgbnVsbDtcclxuICBhdHRyaWJ1dGVWYWx1ZShmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogc3RyaW5nIHwgbnVsbDtcclxuICBhdHRyaWJ1dGVFdmVudEhhbmRsZXJJZChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKTogbnVtYmVyO1xyXG4gIGN1c3RvbUNvbXBvbmVudFR5cGUoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IG51bWJlcjtcclxuICBoYXNBdHRyaWJ1dGVWYWx1ZUpzb24oZnJhbWU6IFJlbmRlclRyZWVGcmFtZSk6IGJvb2xlYW47XHJcbiAgYXR0cmlidXRlVmFsdWVKc29uKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpOiBzdHJpbmcgfCBudWxsO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5UmFuZ2U8VD4geyBBcnJheVJhbmdlX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5leHBvcnQgaW50ZXJmYWNlIEFycmF5U2VnbWVudDxUPiB7IEFycmF5U2VnbWVudF9fRE9fTk9UX0lNUExFTUVOVDogYW55IH1cclxuZXhwb3J0IGludGVyZmFjZSBBcnJheVZhbHVlczxUPiB7IEFycmF5VmFsdWVzX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJUcmVlRGlmZiB7IFJlbmRlclRyZWVEaWZmX19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlclRyZWVGcmFtZSB7IFJlbmRlclRyZWVGcmFtZV9fRE9fTk9UX0lNUExFTUVOVDogYW55IH1cclxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJUcmVlRWRpdCB7IFJlbmRlclRyZWVFZGl0X19ET19OT1RfSU1QTEVNRU5UOiBhbnkgfVxyXG5cclxuZXhwb3J0IGVudW0gRWRpdFR5cGUge1xyXG4gIC8vIFRoZSB2YWx1ZXMgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aGUgLk5FVCBlcXVpdmFsZW50IGluIFJlbmRlclRyZWVFZGl0VHlwZS5jc1xyXG4gIHByZXBlbmRGcmFtZSA9IDEsXHJcbiAgcmVtb3ZlRnJhbWUgPSAyLFxyXG4gIHNldEF0dHJpYnV0ZSA9IDMsXHJcbiAgcmVtb3ZlQXR0cmlidXRlID0gNCxcclxuICB1cGRhdGVUZXh0ID0gNSxcclxuICBzdGVwSW4gPSA2LFxyXG4gIHN0ZXBPdXQgPSA3LFxyXG4gIHVwZGF0ZU1hcmt1cCA9IDgsXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEZyYW1lVHlwZSB7XHJcbiAgLy8gVGhlIHZhbHVlcyBtdXN0IGJlIGtlcHQgaW4gc3luYyB3aXRoIHRoZSAuTkVUIGVxdWl2YWxlbnQgaW4gUmVuZGVyVHJlZUZyYW1lVHlwZS5jc1xyXG4gIGVsZW1lbnQgPSAxLFxyXG4gIHRleHQgPSAyLFxyXG4gIGF0dHJpYnV0ZSA9IDMsXHJcbiAgY29tcG9uZW50ID0gNCxcclxuICByZWdpb24gPSA1LFxyXG4gIGVsZW1lbnRSZWZlcmVuY2VDYXB0dXJlID0gNixcclxuICBtYXJrdXAgPSA4LFxyXG59XHJcbiIsImltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBSZW5kZXJCYXRjaCwgQXJyYXlSYW5nZSwgQXJyYXlSYW5nZVJlYWRlciwgQXJyYXlTZWdtZW50LCBSZW5kZXJUcmVlRGlmZiwgUmVuZGVyVHJlZUVkaXQsIFJlbmRlclRyZWVGcmFtZSwgQXJyYXlWYWx1ZXMsIEVkaXRUeXBlLCBGcmFtZVR5cGUsIFJlbmRlclRyZWVGcmFtZVJlYWRlciB9IGZyb20gJy4vUmVuZGVyQmF0Y2gnO1xyXG5pbXBvcnQgeyBQb2ludGVyLCBTeXN0ZW1fQXJyYXkgfSBmcm9tICcuLi8uLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcblxyXG4vLyBVc2VkIHdoZW4gcnVubmluZyBvbiBNb25vIFdlYkFzc2VtYmx5IGZvciBzaGFyZWQtbWVtb3J5IGludGVyb3AuIFRoZSBjb2RlIGhlcmUgZW5jYXBzdWxhdGVzXHJcbi8vIG91ciBrbm93bGVkZ2Ugb2YgdGhlIG1lbW9yeSBsYXlvdXQgb2YgUmVuZGVyQmF0Y2ggYW5kIGFsbCByZWZlcmVuY2VkIHR5cGVzLlxyXG4vL1xyXG4vLyBJbiB0aGlzIGltcGxlbWVudGF0aW9uLCBhbGwgdGhlIERUTyB0eXBlcyBhcmUgcmVhbGx5IGhlYXAgcG9pbnRlcnMgYXQgcnVudGltZSwgaGVuY2UgYWxsXHJcbi8vIHRoZSBjYXN0cyB0byAnYW55JyB3aGVuZXZlciB3ZSBwYXNzIHRoZW0gdG8gcGxhdGZvcm0ucmVhZC5cclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFyZWRNZW1vcnlSZW5kZXJCYXRjaCBpbXBsZW1lbnRzIFJlbmRlckJhdGNoIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhdGNoQWRkcmVzczogUG9pbnRlcikge1xyXG4gIH1cclxuXHJcbiAgLy8gS2VlcCBpbiBzeW5jIHdpdGggbWVtb3J5IGxheW91dCBpbiBSZW5kZXJCYXRjaC5jc1xyXG4gIHVwZGF0ZWRDb21wb25lbnRzKCkgeyByZXR1cm4gcGxhdGZvcm0ucmVhZFN0cnVjdEZpZWxkPFBvaW50ZXI+KHRoaXMuYmF0Y2hBZGRyZXNzLCAwKSBhcyBhbnkgYXMgQXJyYXlSYW5nZTxSZW5kZXJUcmVlRGlmZj47IH1cclxuICByZWZlcmVuY2VGcmFtZXMoKSB7IHJldHVybiBwbGF0Zm9ybS5yZWFkU3RydWN0RmllbGQ8UG9pbnRlcj4odGhpcy5iYXRjaEFkZHJlc3MsIGFycmF5UmFuZ2VSZWFkZXIuc3RydWN0TGVuZ3RoKSBhcyBhbnkgYXMgQXJyYXlSYW5nZTxSZW5kZXJUcmVlRGlmZj47IH1cclxuICBkaXNwb3NlZENvbXBvbmVudElkcygpIHsgcmV0dXJuIHBsYXRmb3JtLnJlYWRTdHJ1Y3RGaWVsZDxQb2ludGVyPih0aGlzLmJhdGNoQWRkcmVzcywgYXJyYXlSYW5nZVJlYWRlci5zdHJ1Y3RMZW5ndGggKiAyKSBhcyBhbnkgYXMgQXJyYXlSYW5nZTxudW1iZXI+OyB9XHJcbiAgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHMoKSB7IHJldHVybiBwbGF0Zm9ybS5yZWFkU3RydWN0RmllbGQ8UG9pbnRlcj4odGhpcy5iYXRjaEFkZHJlc3MsIGFycmF5UmFuZ2VSZWFkZXIuc3RydWN0TGVuZ3RoICogMykgYXMgYW55IGFzIEFycmF5UmFuZ2U8bnVtYmVyPjsgfVxyXG5cclxuICB1cGRhdGVkQ29tcG9uZW50c0VudHJ5KHZhbHVlczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZURpZmY+LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gYXJyYXlWYWx1ZXNFbnRyeSh2YWx1ZXMsIGluZGV4LCBkaWZmUmVhZGVyLnN0cnVjdExlbmd0aCk7XHJcbiAgfVxyXG4gIHJlZmVyZW5jZUZyYW1lc0VudHJ5KHZhbHVlczogQXJyYXlWYWx1ZXM8UmVuZGVyVHJlZUZyYW1lPiwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGFycmF5VmFsdWVzRW50cnkodmFsdWVzLCBpbmRleCwgZnJhbWVSZWFkZXIuc3RydWN0TGVuZ3RoKTtcclxuICB9XHJcbiAgZGlzcG9zZWRDb21wb25lbnRJZHNFbnRyeSh2YWx1ZXM6IEFycmF5VmFsdWVzPG51bWJlcj4sIGluZGV4OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHBvaW50ZXIgPSBhcnJheVZhbHVlc0VudHJ5KHZhbHVlcywgaW5kZXgsIC8qIGludCBsZW5ndGggKi8gNCk7XHJcbiAgICByZXR1cm4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQocG9pbnRlciBhcyBhbnkgYXMgUG9pbnRlcik7XHJcbiAgfVxyXG4gIGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzRW50cnkodmFsdWVzOiBBcnJheVZhbHVlczxudW1iZXI+LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBwb2ludGVyID0gYXJyYXlWYWx1ZXNFbnRyeSh2YWx1ZXMsIGluZGV4LCAvKiBpbnQgbGVuZ3RoICovIDQpO1xyXG4gICAgcmV0dXJuIHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKHBvaW50ZXIgYXMgYW55IGFzIFBvaW50ZXIpO1xyXG4gIH1cclxuXHJcbiAgYXJyYXlSYW5nZVJlYWRlciA9IGFycmF5UmFuZ2VSZWFkZXI7XHJcbiAgYXJyYXlTZWdtZW50UmVhZGVyID0gYXJyYXlTZWdtZW50UmVhZGVyO1xyXG4gIGRpZmZSZWFkZXIgPSBkaWZmUmVhZGVyO1xyXG4gIGVkaXRSZWFkZXIgPSBlZGl0UmVhZGVyO1xyXG4gIGZyYW1lUmVhZGVyID0gZnJhbWVSZWFkZXI7XHJcbn1cclxuXHJcbi8vIEtlZXAgaW4gc3luYyB3aXRoIG1lbW9yeSBsYXlvdXQgaW4gQXJyYXlSYW5nZS5jc1xyXG5jb25zdCBhcnJheVJhbmdlUmVhZGVyID0ge1xyXG4gIHN0cnVjdExlbmd0aDogOCxcclxuICB2YWx1ZXM6IDxUPihhcnJheVJhbmdlOiBBcnJheVJhbmdlPFQ+KSA9PiBwbGF0Zm9ybS5yZWFkT2JqZWN0RmllbGQ8U3lzdGVtX0FycmF5PFQ+PihhcnJheVJhbmdlIGFzIGFueSwgMCkgYXMgYW55IGFzIEFycmF5VmFsdWVzPFQ+LFxyXG4gIGNvdW50OiA8VD4oYXJyYXlSYW5nZTogQXJyYXlSYW5nZTxUPikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoYXJyYXlSYW5nZSBhcyBhbnksIDQpLFxyXG59O1xyXG5cclxuLy8gS2VlcCBpbiBzeW5jIHdpdGggbWVtb3J5IGxheW91dCBpbiBBcnJheVNlZ21lbnRcclxuY29uc3QgYXJyYXlTZWdtZW50UmVhZGVyID0ge1xyXG4gIHN0cnVjdExlbmd0aDogMTIsXHJcbiAgdmFsdWVzOiA8VD4oYXJyYXlTZWdtZW50OiBBcnJheVNlZ21lbnQ8VD4pID0+IHBsYXRmb3JtLnJlYWRPYmplY3RGaWVsZDxTeXN0ZW1fQXJyYXk8VD4+KGFycmF5U2VnbWVudCBhcyBhbnksIDApIGFzIGFueSBhcyBBcnJheVZhbHVlczxUPixcclxuICBvZmZzZXQ6IDxUPihhcnJheVNlZ21lbnQ6IEFycmF5U2VnbWVudDxUPikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoYXJyYXlTZWdtZW50IGFzIGFueSwgNCksXHJcbiAgY291bnQ6IDxUPihhcnJheVNlZ21lbnQ6IEFycmF5U2VnbWVudDxUPikgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoYXJyYXlTZWdtZW50IGFzIGFueSwgOCksXHJcbn07XHJcblxyXG4vLyBLZWVwIGluIHN5bmMgd2l0aCBtZW1vcnkgbGF5b3V0IGluIFJlbmRlclRyZWVEaWZmLmNzXHJcbmNvbnN0IGRpZmZSZWFkZXIgPSB7XHJcbiAgc3RydWN0TGVuZ3RoOiA0ICsgYXJyYXlTZWdtZW50UmVhZGVyLnN0cnVjdExlbmd0aCxcclxuICBjb21wb25lbnRJZDogKGRpZmY6IFJlbmRlclRyZWVEaWZmKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChkaWZmIGFzIGFueSwgMCksXHJcbiAgZWRpdHM6IChkaWZmOiBSZW5kZXJUcmVlRGlmZikgPT4gcGxhdGZvcm0ucmVhZFN0cnVjdEZpZWxkPFBvaW50ZXI+KGRpZmYgYXMgYW55LCA0KSBhcyBhbnkgYXMgQXJyYXlTZWdtZW50PFJlbmRlclRyZWVFZGl0PixcclxuICBlZGl0c0VudHJ5OiAodmFsdWVzOiBBcnJheVZhbHVlczxSZW5kZXJUcmVlRWRpdD4sIGluZGV4OiBudW1iZXIpID0+IGFycmF5VmFsdWVzRW50cnkodmFsdWVzLCBpbmRleCwgZWRpdFJlYWRlci5zdHJ1Y3RMZW5ndGgpLFxyXG59O1xyXG5cclxuLy8gS2VlcCBpbiBzeW5jIHdpdGggbWVtb3J5IGxheW91dCBpbiBSZW5kZXJUcmVlRWRpdC5jc1xyXG5jb25zdCBlZGl0UmVhZGVyID0ge1xyXG4gIHN0cnVjdExlbmd0aDogMTYsXHJcbiAgZWRpdFR5cGU6IChlZGl0OiBSZW5kZXJUcmVlRWRpdCkgPT4gcGxhdGZvcm0ucmVhZEludDMyRmllbGQoZWRpdCBhcyBhbnksIDApIGFzIEVkaXRUeXBlLFxyXG4gIHNpYmxpbmdJbmRleDogKGVkaXQ6IFJlbmRlclRyZWVFZGl0KSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChlZGl0IGFzIGFueSwgNCksXHJcbiAgbmV3VHJlZUluZGV4OiAoZWRpdDogUmVuZGVyVHJlZUVkaXQpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGVkaXQgYXMgYW55LCA4KSxcclxuICByZW1vdmVkQXR0cmlidXRlTmFtZTogKGVkaXQ6IFJlbmRlclRyZWVFZGl0KSA9PiBwbGF0Zm9ybS5yZWFkU3RyaW5nRmllbGQoZWRpdCBhcyBhbnksIDEyKSxcclxufTtcclxuXHJcbi8vIEtlZXAgaW4gc3luYyB3aXRoIG1lbW9yeSBsYXlvdXQgaW4gUmVuZGVyVHJlZUZyYW1lLmNzXHJcbmNvbnN0IGZyYW1lUmVhZGVyID0ge1xyXG4gIHN0cnVjdExlbmd0aDogMzYsXHJcbiAgZnJhbWVUeXBlOiAoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSkgPT4gcGxhdGZvcm0ucmVhZEludDE2RmllbGQoZnJhbWUgYXMgYW55LCA0KSBhcyBGcmFtZVR5cGUsXHJcbiAgc3VidHJlZUxlbmd0aDogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGZyYW1lIGFzIGFueSwgOCksXHJcbiAgZWxlbWVudFJlZmVyZW5jZUNhcHR1cmVJZDogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpID0+IHBsYXRmb3JtLnJlYWRTdHJpbmdGaWVsZChmcmFtZSBhcyBhbnksIDE2KSxcclxuICBjb21wb25lbnRJZDogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGZyYW1lIGFzIGFueSwgMTIpLFxyXG4gIGVsZW1lbnROYW1lOiAoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSkgPT4gcGxhdGZvcm0ucmVhZFN0cmluZ0ZpZWxkKGZyYW1lIGFzIGFueSwgMTYpLFxyXG4gIHRleHRDb250ZW50OiAoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSkgPT4gcGxhdGZvcm0ucmVhZFN0cmluZ0ZpZWxkKGZyYW1lIGFzIGFueSwgMTYpLFxyXG4gIG1hcmt1cENvbnRlbnQ6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSA9PiBwbGF0Zm9ybS5yZWFkU3RyaW5nRmllbGQoZnJhbWUgYXMgYW55LCAxNikhLFxyXG4gIGF0dHJpYnV0ZU5hbWU6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSA9PiBwbGF0Zm9ybS5yZWFkU3RyaW5nRmllbGQoZnJhbWUgYXMgYW55LCAxNiksXHJcbiAgYXR0cmlidXRlVmFsdWU6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSA9PiBwbGF0Zm9ybS5yZWFkU3RyaW5nRmllbGQoZnJhbWUgYXMgYW55LCAyNCksXHJcbiAgYXR0cmlidXRlRXZlbnRIYW5kbGVySWQ6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSA9PiBwbGF0Zm9ybS5yZWFkSW50MzJGaWVsZChmcmFtZSBhcyBhbnksIDgpLFxyXG4gIGN1c3RvbUNvbXBvbmVudFR5cGU6IChmcmFtZTogUmVuZGVyVHJlZUZyYW1lKSA9PiBwbGF0Zm9ybS5yZWFkSW50MTZGaWVsZChmcmFtZSBhcyBhbnksIDYpLFxyXG4gIGhhc0F0dHJpYnV0ZVZhbHVlSnNvbjogKGZyYW1lOiBSZW5kZXJUcmVlRnJhbWUpID0+IHBsYXRmb3JtLnJlYWRJbnQzMkZpZWxkKGZyYW1lIGFzIGFueSwgMzIpICE9IDAsXHJcbiAgYXR0cmlidXRlVmFsdWVKc29uOiAoZnJhbWU6IFJlbmRlclRyZWVGcmFtZSkgPT4gcGxhdGZvcm0ucmVhZFN0cmluZ0ZpZWxkKGZyYW1lIGFzIGFueSwgMzIpXHJcbn07XHJcblxyXG5mdW5jdGlvbiBhcnJheVZhbHVlc0VudHJ5PFQ+KGFycmF5VmFsdWVzOiBBcnJheVZhbHVlczxUPiwgaW5kZXg6IG51bWJlciwgaXRlbVNpemU6IG51bWJlcik6IFQge1xyXG4gIHJldHVybiBwbGF0Zm9ybS5nZXRBcnJheUVudHJ5UHRyKGFycmF5VmFsdWVzIGFzIGFueSBhcyBTeXN0ZW1fQXJyYXk8VD4sIGluZGV4LCBpdGVtU2l6ZSkgYXMgYW55IGFzIFQ7XHJcbn1cclxuIiwiaW1wb3J0IHsgU3lzdGVtX09iamVjdCwgU3lzdGVtX1N0cmluZywgU3lzdGVtX0FycmF5LCBNZXRob2RIYW5kbGUsIFBvaW50ZXIgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmltcG9ydCB7IHBsYXRmb3JtIH0gZnJvbSAnLi4vRW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgeyBSZW5kZXJCYXRjaCB9IGZyb20gJy4vUmVuZGVyQmF0Y2gvUmVuZGVyQmF0Y2gnO1xyXG5pbXBvcnQgeyBCcm93c2VyUmVuZGVyZXIgfSBmcm9tICcuL0Jyb3dzZXJSZW5kZXJlcic7XHJcblxyXG50eXBlIEJyb3dzZXJSZW5kZXJlclJlZ2lzdHJ5ID0geyBbYnJvd3NlclJlbmRlcmVySWQ6IG51bWJlcl06IEJyb3dzZXJSZW5kZXJlciB9O1xyXG5jb25zdCBicm93c2VyUmVuZGVyZXJzOiBCcm93c2VyUmVuZGVyZXJSZWdpc3RyeSA9IHt9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dGFjaFJvb3RDb21wb25lbnRUb0VsZW1lbnQoYnJvd3NlclJlbmRlcmVySWQ6IG51bWJlciwgZWxlbWVudFNlbGVjdG9yOiBzdHJpbmcsIGNvbXBvbmVudElkOiBudW1iZXIpIHtcclxuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50U2VsZWN0b3IpO1xyXG4gIGlmICghZWxlbWVudCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBhbnkgZWxlbWVudCBtYXRjaGluZyBzZWxlY3RvciAnJHtlbGVtZW50U2VsZWN0b3J9Jy5gKTtcclxuICB9XHJcblxyXG4gIGxldCBicm93c2VyUmVuZGVyZXIgPSBicm93c2VyUmVuZGVyZXJzW2Jyb3dzZXJSZW5kZXJlcklkXTtcclxuICBpZiAoIWJyb3dzZXJSZW5kZXJlcikge1xyXG4gICAgYnJvd3NlclJlbmRlcmVyID0gYnJvd3NlclJlbmRlcmVyc1ticm93c2VyUmVuZGVyZXJJZF0gPSBuZXcgQnJvd3NlclJlbmRlcmVyKGJyb3dzZXJSZW5kZXJlcklkKTtcclxuICB9XHJcbiAgY2xlYXJFbGVtZW50KGVsZW1lbnQpO1xyXG4gIGJyb3dzZXJSZW5kZXJlci5hdHRhY2hSb290Q29tcG9uZW50VG9FbGVtZW50KGNvbXBvbmVudElkLCBlbGVtZW50KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckJhdGNoKGJyb3dzZXJSZW5kZXJlcklkOiBudW1iZXIsIGJhdGNoOiBSZW5kZXJCYXRjaCkge1xyXG4gIGNvbnN0IGJyb3dzZXJSZW5kZXJlciA9IGJyb3dzZXJSZW5kZXJlcnNbYnJvd3NlclJlbmRlcmVySWRdO1xyXG4gIGlmICghYnJvd3NlclJlbmRlcmVyKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZXJlIGlzIG5vIGJyb3dzZXIgcmVuZGVyZXIgd2l0aCBJRCAke2Jyb3dzZXJSZW5kZXJlcklkfS5gKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGFycmF5UmFuZ2VSZWFkZXIgPSBiYXRjaC5hcnJheVJhbmdlUmVhZGVyO1xyXG4gIGNvbnN0IHVwZGF0ZWRDb21wb25lbnRzUmFuZ2UgPSBiYXRjaC51cGRhdGVkQ29tcG9uZW50cygpO1xyXG4gIGNvbnN0IHVwZGF0ZWRDb21wb25lbnRzVmFsdWVzID0gYXJyYXlSYW5nZVJlYWRlci52YWx1ZXModXBkYXRlZENvbXBvbmVudHNSYW5nZSk7XHJcbiAgY29uc3QgdXBkYXRlZENvbXBvbmVudHNMZW5ndGggPSBhcnJheVJhbmdlUmVhZGVyLmNvdW50KHVwZGF0ZWRDb21wb25lbnRzUmFuZ2UpO1xyXG4gIGNvbnN0IHJlZmVyZW5jZUZyYW1lcyA9IGJhdGNoLnJlZmVyZW5jZUZyYW1lcygpO1xyXG4gIGNvbnN0IHJlZmVyZW5jZUZyYW1lc1ZhbHVlcyA9IGFycmF5UmFuZ2VSZWFkZXIudmFsdWVzKHJlZmVyZW5jZUZyYW1lcyk7XHJcbiAgY29uc3QgZGlmZlJlYWRlciA9IGJhdGNoLmRpZmZSZWFkZXI7XHJcblxyXG4gIGJyb3dzZXJSZW5kZXJlci5iZWdpblJlbmRlcigpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdXBkYXRlZENvbXBvbmVudHNMZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgZGlmZiA9IGJhdGNoLnVwZGF0ZWRDb21wb25lbnRzRW50cnkodXBkYXRlZENvbXBvbmVudHNWYWx1ZXMsIGkpO1xyXG4gICAgY29uc3QgY29tcG9uZW50SWQgPSBkaWZmUmVhZGVyLmNvbXBvbmVudElkKGRpZmYpO1xyXG4gICAgY29uc3QgZWRpdHMgPSBkaWZmUmVhZGVyLmVkaXRzKGRpZmYpO1xyXG4gICAgYnJvd3NlclJlbmRlcmVyLnVwZGF0ZUNvbXBvbmVudChiYXRjaCwgY29tcG9uZW50SWQsIGVkaXRzLCByZWZlcmVuY2VGcmFtZXNWYWx1ZXMpO1xyXG4gIH1cclxuICBicm93c2VyUmVuZGVyZXIuZW5kUmVuZGVyKCk7XHJcblxyXG4gIGNvbnN0IGRpc3Bvc2VkQ29tcG9uZW50SWRzUmFuZ2UgPSBiYXRjaC5kaXNwb3NlZENvbXBvbmVudElkcygpO1xyXG4gIGNvbnN0IGRpc3Bvc2VkQ29tcG9uZW50SWRzVmFsdWVzID0gYXJyYXlSYW5nZVJlYWRlci52YWx1ZXMoZGlzcG9zZWRDb21wb25lbnRJZHNSYW5nZSk7XHJcbiAgY29uc3QgZGlzcG9zZWRDb21wb25lbnRJZHNMZW5ndGggPSBhcnJheVJhbmdlUmVhZGVyLmNvdW50KGRpc3Bvc2VkQ29tcG9uZW50SWRzUmFuZ2UpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzcG9zZWRDb21wb25lbnRJZHNMZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgY29tcG9uZW50SWQgPSBiYXRjaC5kaXNwb3NlZENvbXBvbmVudElkc0VudHJ5KGRpc3Bvc2VkQ29tcG9uZW50SWRzVmFsdWVzLCBpKTtcclxuICAgIGJyb3dzZXJSZW5kZXJlci5kaXNwb3NlQ29tcG9uZW50KGNvbXBvbmVudElkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzUmFuZ2UgPSBiYXRjaC5kaXNwb3NlZEV2ZW50SGFuZGxlcklkcygpO1xyXG4gIGNvbnN0IGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzVmFsdWVzID0gYXJyYXlSYW5nZVJlYWRlci52YWx1ZXMoZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNSYW5nZSk7XHJcbiAgY29uc3QgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNMZW5ndGggPSBhcnJheVJhbmdlUmVhZGVyLmNvdW50KGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzUmFuZ2UpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlzcG9zZWRFdmVudEhhbmRsZXJJZHNMZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgZXZlbnRIYW5kbGVySWQgPSBiYXRjaC5kaXNwb3NlZEV2ZW50SGFuZGxlcklkc0VudHJ5KGRpc3Bvc2VkRXZlbnRIYW5kbGVySWRzVmFsdWVzLCBpKTtcclxuICAgIGJyb3dzZXJSZW5kZXJlci5kaXNwb3NlRXZlbnRIYW5kbGVyKGV2ZW50SGFuZGxlcklkKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyRWxlbWVudChlbGVtZW50OiBFbGVtZW50KSB7XHJcbiAgbGV0IGNoaWxkTm9kZTogTm9kZSB8IG51bGw7XHJcbiAgd2hpbGUgKGNoaWxkTm9kZSA9IGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgZWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGUpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBwbGF0Zm9ybSB9IGZyb20gJy4uL0Vudmlyb25tZW50JztcclxuaW1wb3J0IHsgTWV0aG9kSGFuZGxlLCBTeXN0ZW1fU3RyaW5nLCBTeXN0ZW1fQXJyYXkgfSBmcm9tICcuLi9QbGF0Zm9ybS9QbGF0Zm9ybSc7XHJcbmNvbnN0IGh0dHBDbGllbnRBc3NlbWJseSA9ICdNaWNyb3NvZnQuQXNwTmV0Q29yZS5CbGF6b3IuQnJvd3Nlcic7XHJcbmNvbnN0IGh0dHBDbGllbnROYW1lc3BhY2UgPSBgJHtodHRwQ2xpZW50QXNzZW1ibHl9Lkh0dHBgO1xyXG5jb25zdCBodHRwQ2xpZW50VHlwZU5hbWUgPSAnQnJvd3Nlckh0dHBNZXNzYWdlSGFuZGxlcic7XHJcbmNvbnN0IGh0dHBDbGllbnRGdWxsVHlwZU5hbWUgPSBgJHtodHRwQ2xpZW50TmFtZXNwYWNlfS4ke2h0dHBDbGllbnRUeXBlTmFtZX1gO1xyXG5sZXQgcmVjZWl2ZVJlc3BvbnNlTWV0aG9kOiBNZXRob2RIYW5kbGU7XHJcbmxldCBhbGxvY2F0ZUFycmF5TWV0aG9kOiBNZXRob2RIYW5kbGU7XHJcblxyXG4vLyBUaGVzZSBhcmUgdGhlIGZ1bmN0aW9ucyB3ZSdyZSBtYWtpbmcgYXZhaWxhYmxlIGZvciBpbnZvY2F0aW9uIGZyb20gLk5FVFxyXG5leHBvcnQgY29uc3QgaW50ZXJuYWxGdW5jdGlvbnMgPSB7XHJcbiAgc2VuZEFzeW5jXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNlbmRBc3luYyhpZDogbnVtYmVyLCBib2R5OiBTeXN0ZW1fQXJyYXk8YW55PiwganNvbkZldGNoQXJnczogU3lzdGVtX1N0cmluZykge1xyXG4gIGxldCByZXNwb25zZTogUmVzcG9uc2U7XHJcbiAgbGV0IHJlc3BvbnNlRGF0YTogQXJyYXlCdWZmZXI7XHJcblxyXG4gIGNvbnN0IGZldGNoT3B0aW9uczogRmV0Y2hPcHRpb25zID0gSlNPTi5wYXJzZShwbGF0Zm9ybS50b0phdmFTY3JpcHRTdHJpbmcoanNvbkZldGNoQXJncykpO1xyXG4gIGNvbnN0IHJlcXVlc3RJbml0OiBSZXF1ZXN0SW5pdCA9IE9iamVjdC5hc3NpZ24oZmV0Y2hPcHRpb25zLnJlcXVlc3RJbml0LCBmZXRjaE9wdGlvbnMucmVxdWVzdEluaXRPdmVycmlkZXMpO1xyXG5cclxuICBpZiAoYm9keSkge1xyXG4gICAgcmVxdWVzdEluaXQuYm9keSA9IHBsYXRmb3JtLnRvVWludDhBcnJheShib2R5KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGZldGNoT3B0aW9ucy5yZXF1ZXN0VXJpLCByZXF1ZXN0SW5pdCk7XHJcbiAgICByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS5hcnJheUJ1ZmZlcigpO1xyXG4gIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICBkaXNwYXRjaEVycm9yUmVzcG9uc2UoaWQsIGV4LnRvU3RyaW5nKCkpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgZGlzcGF0Y2hTdWNjZXNzUmVzcG9uc2UoaWQsIHJlc3BvbnNlLCByZXNwb25zZURhdGEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwYXRjaFN1Y2Nlc3NSZXNwb25zZShpZDogbnVtYmVyLCByZXNwb25zZTogUmVzcG9uc2UsIHJlc3BvbnNlRGF0YTogQXJyYXlCdWZmZXIpIHtcclxuICBjb25zdCByZXNwb25zZURlc2NyaXB0b3I6IFJlc3BvbnNlRGVzY3JpcHRvciA9IHtcclxuICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXHJcbiAgICBoZWFkZXJzOiBbXVxyXG4gIH07XHJcbiAgcmVzcG9uc2UuaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwgbmFtZSkgPT4ge1xyXG4gICAgcmVzcG9uc2VEZXNjcmlwdG9yLmhlYWRlcnMucHVzaChbbmFtZSwgdmFsdWVdKTtcclxuICB9KTtcclxuXHJcbiAgaWYgKCFhbGxvY2F0ZUFycmF5TWV0aG9kKSB7XHJcbiAgICBhbGxvY2F0ZUFycmF5TWV0aG9kID0gcGxhdGZvcm0uZmluZE1ldGhvZChcclxuICAgICAgaHR0cENsaWVudEFzc2VtYmx5LFxyXG4gICAgICBodHRwQ2xpZW50TmFtZXNwYWNlLFxyXG4gICAgICBodHRwQ2xpZW50VHlwZU5hbWUsXHJcbiAgICAgICdBbGxvY2F0ZUFycmF5J1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8vIGFsbG9jYXRlIGEgbWFuYWdlZCBieXRlW10gb2YgdGhlIHJpZ2h0IHNpemVcclxuICBjb25zdCBkb3ROZXRBcnJheSA9IHBsYXRmb3JtLmNhbGxNZXRob2QoYWxsb2NhdGVBcnJheU1ldGhvZCwgbnVsbCwgW3BsYXRmb3JtLnRvRG90TmV0U3RyaW5nKHJlc3BvbnNlRGF0YS5ieXRlTGVuZ3RoLnRvU3RyaW5nKCkpXSkgYXMgU3lzdGVtX0FycmF5PGFueT47XHJcblxyXG4gIC8vIGdldCBhbiBVaW50OEFycmF5IHZpZXcgb2YgaXRcclxuICBjb25zdCBhcnJheSA9IHBsYXRmb3JtLnRvVWludDhBcnJheShkb3ROZXRBcnJheSk7XHJcblxyXG4gIC8vIGNvcHkgdGhlIHJlc3BvbnNlRGF0YSB0byBvdXIgbWFuYWdlZCBieXRlW11cclxuICBhcnJheS5zZXQobmV3IFVpbnQ4QXJyYXkocmVzcG9uc2VEYXRhKSk7XHJcblxyXG4gIGRpc3BhdGNoUmVzcG9uc2UoXHJcbiAgICBpZCxcclxuICAgIHBsYXRmb3JtLnRvRG90TmV0U3RyaW5nKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlRGVzY3JpcHRvcikpLFxyXG4gICAgZG90TmV0QXJyYXksXHJcbiAgICAvKiBlcnJvck1lc3NhZ2UgKi8gbnVsbFxyXG4gICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BhdGNoRXJyb3JSZXNwb25zZShpZDogbnVtYmVyLCBlcnJvck1lc3NhZ2U6IHN0cmluZykge1xyXG4gIGRpc3BhdGNoUmVzcG9uc2UoXHJcbiAgICBpZCxcclxuICAgIC8qIHJlc3BvbnNlRGVzY3JpcHRvciAqLyBudWxsLFxyXG4gICAgLyogcmVzcG9uc2VUZXh0ICovIG51bGwsXHJcbiAgICBwbGF0Zm9ybS50b0RvdE5ldFN0cmluZyhlcnJvck1lc3NhZ2UpXHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGlzcGF0Y2hSZXNwb25zZShpZDogbnVtYmVyLCByZXNwb25zZURlc2NyaXB0b3I6IFN5c3RlbV9TdHJpbmcgfCBudWxsLCByZXNwb25zZURhdGE6IFN5c3RlbV9BcnJheTxhbnk+IHwgbnVsbCwgZXJyb3JNZXNzYWdlOiBTeXN0ZW1fU3RyaW5nIHwgbnVsbCkge1xyXG4gIGlmICghcmVjZWl2ZVJlc3BvbnNlTWV0aG9kKSB7XHJcbiAgICByZWNlaXZlUmVzcG9uc2VNZXRob2QgPSBwbGF0Zm9ybS5maW5kTWV0aG9kKFxyXG4gICAgICBodHRwQ2xpZW50QXNzZW1ibHksXHJcbiAgICAgIGh0dHBDbGllbnROYW1lc3BhY2UsXHJcbiAgICAgIGh0dHBDbGllbnRUeXBlTmFtZSxcclxuICAgICAgJ1JlY2VpdmVSZXNwb25zZSdcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwbGF0Zm9ybS5jYWxsTWV0aG9kKHJlY2VpdmVSZXNwb25zZU1ldGhvZCwgbnVsbCwgW1xyXG4gICAgcGxhdGZvcm0udG9Eb3ROZXRTdHJpbmcoaWQudG9TdHJpbmcoKSksXHJcbiAgICByZXNwb25zZURlc2NyaXB0b3IsXHJcbiAgICByZXNwb25zZURhdGEsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgXSk7XHJcbn1cclxuXHJcbi8vIEtlZXAgdGhlc2UgaW4gc3luYyB3aXRoIHRoZSAuTkVUIGVxdWl2YWxlbnQgaW4gQnJvd3Nlckh0dHBNZXNzYWdlSGFuZGxlci5jc1xyXG5pbnRlcmZhY2UgRmV0Y2hPcHRpb25zIHtcclxuICByZXF1ZXN0VXJpOiBzdHJpbmc7XHJcbiAgcmVxdWVzdEluaXQ6IFJlcXVlc3RJbml0O1xyXG4gIHJlcXVlc3RJbml0T3ZlcnJpZGVzOiBSZXF1ZXN0SW5pdDtcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlc3BvbnNlRGVzY3JpcHRvciB7XHJcbiAgLy8gV2UgZG9uJ3QgaGF2ZSBCb2R5VGV4dCBpbiBoZXJlIGJlY2F1c2UgaWYgd2UgZGlkLCB0aGVuIGluIHRoZSBKU09OLXJlc3BvbnNlIGNhc2UgKHdoaWNoXHJcbiAgLy8gaXMgdGhlIG1vc3QgY29tbW9uIGNhc2UpLCB3ZSdkIGJlIGRvdWJsZS1lbmNvZGluZyBpdCwgc2luY2UgdGhlIGVudGlyZSBSZXNwb25zZURlc2NyaXB0b3JcclxuICAvLyBhbHNvIGdldHMgSlNPTiBlbmNvZGVkLiBJdCB3b3VsZCB3b3JrIGJ1dCBpcyB0d2ljZSB0aGUgYW1vdW50IG9mIHN0cmluZyBwcm9jZXNzaW5nLlxyXG4gIHN0YXR1c0NvZGU6IG51bWJlcjtcclxuICBzdGF0dXNUZXh0OiBzdHJpbmc7XHJcbiAgaGVhZGVyczogc3RyaW5nW11bXTtcclxufVxyXG4iLCJsZXQgaGFzUmVnaXN0ZXJlZEV2ZW50TGlzdGVuZXJzID0gZmFsc2U7XHJcblxyXG4vLyBXaWxsIGJlIGluaXRpYWxpemVkIG9uY2Ugc29tZW9uZSByZWdpc3RlcnNcclxubGV0IG5vdGlmeUxvY2F0aW9uQ2hhbmdlZENhbGxiYWNrOiB7IGFzc2VtYmx5TmFtZTogc3RyaW5nLCBmdW5jdGlvbk5hbWU6IHN0cmluZyB9IHwgbnVsbCA9IG51bGw7XHJcblxyXG4vLyBUaGVzZSBhcmUgdGhlIGZ1bmN0aW9ucyB3ZSdyZSBtYWtpbmcgYXZhaWxhYmxlIGZvciBpbnZvY2F0aW9uIGZyb20gLk5FVFxyXG5leHBvcnQgY29uc3QgaW50ZXJuYWxGdW5jdGlvbnMgPSB7XHJcbiAgZW5hYmxlTmF2aWdhdGlvbkludGVyY2VwdGlvbixcclxuICBuYXZpZ2F0ZVRvLFxyXG4gIGdldEJhc2VVUkk6ICgpID0+IGRvY3VtZW50LmJhc2VVUkksXHJcbiAgZ2V0TG9jYXRpb25IcmVmOiAoKSA9PiBsb2NhdGlvbi5ocmVmLFxyXG59XHJcblxyXG5mdW5jdGlvbiBlbmFibGVOYXZpZ2F0aW9uSW50ZXJjZXB0aW9uKGFzc2VtYmx5TmFtZTogc3RyaW5nLCBmdW5jdGlvbk5hbWU6IHN0cmluZykge1xyXG4gIGlmIChoYXNSZWdpc3RlcmVkRXZlbnRMaXN0ZW5lcnMgfHwgYXNzZW1ibHlOYW1lID09PSB1bmRlZmluZWQgfHwgZnVuY3Rpb25OYW1lID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIG5vdGlmeUxvY2F0aW9uQ2hhbmdlZENhbGxiYWNrID0geyBhc3NlbWJseU5hbWUsIGZ1bmN0aW9uTmFtZSB9O1xyXG4gIGhhc1JlZ2lzdGVyZWRFdmVudExpc3RlbmVycyA9IHRydWU7XHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgLy8gSW50ZXJjZXB0IGNsaWNrcyBvbiBhbGwgPGE+IGVsZW1lbnRzIHdoZXJlIHRoZSBocmVmIGlzIHdpdGhpbiB0aGUgPGJhc2UgaHJlZj4gVVJJIHNwYWNlXHJcbiAgICAvLyBXZSBtdXN0IGV4cGxpY2l0bHkgY2hlY2sgaWYgaXQgaGFzIGFuICdocmVmJyBhdHRyaWJ1dGUsIGJlY2F1c2UgaWYgaXQgZG9lc24ndCwgdGhlIHJlc3VsdCBtaWdodCBiZSBudWxsIG9yIGFuIGVtcHR5IHN0cmluZyBkZXBlbmRpbmcgb24gdGhlIGJyb3dzZXJcclxuICAgIGNvbnN0IGFuY2hvclRhcmdldCA9IGZpbmRDbG9zZXN0QW5jZXN0b3IoZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQgfCBudWxsLCAnQScpIGFzIEhUTUxBbmNob3JFbGVtZW50O1xyXG4gICAgY29uc3QgaHJlZkF0dHJpYnV0ZU5hbWUgPSAnaHJlZic7XHJcbiAgICBpZiAoYW5jaG9yVGFyZ2V0ICYmIGFuY2hvclRhcmdldC5oYXNBdHRyaWJ1dGUoaHJlZkF0dHJpYnV0ZU5hbWUpICYmIGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xyXG4gICAgICBjb25zdCBocmVmID0gYW5jaG9yVGFyZ2V0LmdldEF0dHJpYnV0ZShocmVmQXR0cmlidXRlTmFtZSkhO1xyXG4gICAgICBjb25zdCBhYnNvbHV0ZUhyZWYgPSB0b0Fic29sdXRlVXJpKGhyZWYpO1xyXG5cclxuICAgICAgLy8gRG9uJ3Qgc3RvcCBjdHJsL21ldGEtY2xpY2sgKGV0YykgZnJvbSBvcGVuaW5nIGxpbmtzIGluIG5ldyB0YWJzL3dpbmRvd3NcclxuICAgICAgaWYgKGlzV2l0aGluQmFzZVVyaVNwYWNlKGFic29sdXRlSHJlZikgJiYgIWV2ZW50SGFzU3BlY2lhbEtleShldmVudCkpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHBlcmZvcm1JbnRlcm5hbE5hdmlnYXRpb24oYWJzb2x1dGVIcmVmKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBoYW5kbGVJbnRlcm5hbE5hdmlnYXRpb24pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGVUbyh1cmk6IHN0cmluZykge1xyXG4gIGNvbnN0IGFic29sdXRlVXJpID0gdG9BYnNvbHV0ZVVyaSh1cmkpO1xyXG4gIGlmIChpc1dpdGhpbkJhc2VVcmlTcGFjZShhYnNvbHV0ZVVyaSkpIHtcclxuICAgIHBlcmZvcm1JbnRlcm5hbE5hdmlnYXRpb24oYWJzb2x1dGVVcmkpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsb2NhdGlvbi5ocmVmID0gdXJpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGVyZm9ybUludGVybmFsTmF2aWdhdGlvbihhYnNvbHV0ZUludGVybmFsSHJlZjogc3RyaW5nKSB7XHJcbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgLyogaWdub3JlZCB0aXRsZSAqLyAnJywgYWJzb2x1dGVJbnRlcm5hbEhyZWYpO1xyXG4gIGhhbmRsZUludGVybmFsTmF2aWdhdGlvbigpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVJbnRlcm5hbE5hdmlnYXRpb24oKSB7XHJcbiAgaWYgKG5vdGlmeUxvY2F0aW9uQ2hhbmdlZENhbGxiYWNrKSB7XHJcbiAgICBhd2FpdCBEb3ROZXQuaW52b2tlTWV0aG9kQXN5bmMoXHJcbiAgICAgIG5vdGlmeUxvY2F0aW9uQ2hhbmdlZENhbGxiYWNrLmFzc2VtYmx5TmFtZSxcclxuICAgICAgbm90aWZ5TG9jYXRpb25DaGFuZ2VkQ2FsbGJhY2suZnVuY3Rpb25OYW1lLFxyXG4gICAgICBsb2NhdGlvbi5ocmVmXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxubGV0IHRlc3RBbmNob3I6IEhUTUxBbmNob3JFbGVtZW50O1xyXG5mdW5jdGlvbiB0b0Fic29sdXRlVXJpKHJlbGF0aXZlVXJpOiBzdHJpbmcpIHtcclxuICB0ZXN0QW5jaG9yID0gdGVzdEFuY2hvciB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgdGVzdEFuY2hvci5ocmVmID0gcmVsYXRpdmVVcmk7XHJcbiAgcmV0dXJuIHRlc3RBbmNob3IuaHJlZjtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZENsb3Nlc3RBbmNlc3RvcihlbGVtZW50OiBFbGVtZW50IHwgbnVsbCwgdGFnTmFtZTogc3RyaW5nKSB7XHJcbiAgcmV0dXJuICFlbGVtZW50XHJcbiAgICA/IG51bGxcclxuICAgIDogZWxlbWVudC50YWdOYW1lID09PSB0YWdOYW1lXHJcbiAgICAgID8gZWxlbWVudFxyXG4gICAgICA6IGZpbmRDbG9zZXN0QW5jZXN0b3IoZWxlbWVudC5wYXJlbnRFbGVtZW50LCB0YWdOYW1lKVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc1dpdGhpbkJhc2VVcmlTcGFjZShocmVmOiBzdHJpbmcpIHtcclxuICBjb25zdCBiYXNlVXJpV2l0aFRyYWlsaW5nU2xhc2ggPSB0b0Jhc2VVcmlXaXRoVHJhaWxpbmdTbGFzaChkb2N1bWVudC5iYXNlVVJJISk7IC8vIFRPRE86IE1pZ2h0IGJhc2VVUkkgcmVhbGx5IGJlIG51bGw/XHJcbiAgcmV0dXJuIGhyZWYuc3RhcnRzV2l0aChiYXNlVXJpV2l0aFRyYWlsaW5nU2xhc2gpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b0Jhc2VVcmlXaXRoVHJhaWxpbmdTbGFzaChiYXNlVXJpOiBzdHJpbmcpIHtcclxuICByZXR1cm4gYmFzZVVyaS5zdWJzdHIoMCwgYmFzZVVyaS5sYXN0SW5kZXhPZignLycpICsgMSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV2ZW50SGFzU3BlY2lhbEtleShldmVudDogTW91c2VFdmVudCkge1xyXG4gIHJldHVybiBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5tZXRhS2V5O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=