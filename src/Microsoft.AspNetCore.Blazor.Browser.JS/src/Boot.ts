import '../../Microsoft.JSInterop/JavaScriptRuntime/src/Microsoft.JSInterop';
import { platform } from './Environment';
import { getAssemblyNameFromUrl } from './Platform/Url';
import './GlobalExports';

async function boot() {
  // Read startup config from the <script> element that's importing this file
  const allScriptElems = document.getElementsByTagName('script');
  const thisScriptElem = (document.currentScript || allScriptElems[allScriptElems.length - 1]) as HTMLScriptElement;
  const isLinkerEnabled = thisScriptElem.getAttribute('linker-enabled') === 'true';
  const entryPointDll = getRequiredBootScriptAttribute(thisScriptElem, 'main');
  const entryPointMethod = getRequiredBootScriptAttribute(thisScriptElem, 'entrypoint');
  const entryPointAssemblyName = getAssemblyNameFromUrl(entryPointDll);
  const referenceAssembliesCommaSeparated = thisScriptElem.getAttribute('references') || '';
  const referenceAssemblies = referenceAssembliesCommaSeparated
    .split(',')
    .map(s => s.trim())
    .filter(s => !!s);

  if (!isLinkerEnabled) {
    console.info('Blazor is running in dev mode without IL stripping. To make the bundle size significantly smaller, publish the application or see https://go.microsoft.com/fwlink/?linkid=870414');
  }

  // Determine the URLs of the assemblies we want to load
  const loadAssemblyUrls = [entryPointDll]
    .concat(referenceAssemblies)
    .map(filename => `_framework/_bin/${filename}`);

  try {
    await platform.start(loadAssemblyUrls);
  } catch (ex) {
    throw new Error(`Failed to start platform. Reason: ${ex}`);
  }

	// Trigger BlazorOnLoad event
	let evt = new Event('BlazorOnLoad');
	window.dispatchEvent(evt);

  // Start up the application
	platform.callEntryPoint(entryPointAssemblyName, entryPointMethod, []);

	// Trigger BlazorOnStart event
	evt = new Event('BlazorOnStart');
	window.dispatchEvent(evt);
}

function getRequiredBootScriptAttribute(elem: HTMLScriptElement, attributeName: string): string {
  const result = elem.getAttribute(attributeName);
  if (!result) {
    throw new Error(`Missing "${attributeName}" attribute on Blazor script tag.`);
  }
  return result;
}

boot();
