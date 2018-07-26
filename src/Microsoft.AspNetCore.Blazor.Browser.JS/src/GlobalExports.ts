import { platform } from './Environment';
import { navigateTo, internalFunctions as uriHelperInternalFunctions } from './Services/UriHelper';
import { internalFunctions as httpInternalFunctions } from './Services/Http';
import { attachRootComponentToElement } from './Rendering/Renderer';
import { Pointer } from './Platform/Platform';

import { BlazorDOMComponent } from './Rendering/Elements/BlazorDOMComponent'
import { BlazorDOMElement } from './Rendering/Elements/BlazorDOMElement'
import { registerCustomTag, registerCustomDOMElement } from './Rendering/Elements/RenderingFunction'
import { raiseEvent } from './Rendering/BrowserRenderer'
import { EventForDotNet } from './Rendering/EventForDotNet'

// Make the following APIs available in global scope for invocation from JS
window['Blazor'] = {
  navigateTo,

  _internal: {
    attachRootComponentToElement,
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
