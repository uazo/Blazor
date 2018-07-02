import { platform } from './Environment';
import { navigateTo, internalFunctions as uriHelperInternalFunctions } from './Services/UriHelper';
import { internalFunctions as httpInternalFunctions } from './Services/Http';
import { attachRootComponentToElement, renderBatch } from './Rendering/Renderer';

import { BlazorDOMComponent } from './Rendering/Elements/BlazorDOMComponent'
import { BlazorDOMElement } from './Rendering/Elements/BlazorDOMElement'
import { registerCustomTag, registerCustomDOMElement } from './Interop/RenderingFunction'
import { raiseEvent } from './Rendering/BrowserRenderer'
import { EventForDotNet } from './Rendering/EventForDotNet'

if (typeof window !== 'undefined') {
  // When the library is loaded in a browser via a <script> element, make the
  // following APIs available in global scope for invocation from JS
  window['Blazor'] = {
    platform,
    navigateTo,

    _internal: {
      attachRootComponentToElement,
      renderBatch,
      http: httpInternalFunctions,
      uriHelper: uriHelperInternalFunctions
		},

		raiseEvent,
		registerCustomTag,
		registerCustomDOMElement,
		BlazorDOMElement,
		BlazorDOMComponent,
		EventForDotNet
  };
}
