import { BrowserRenderer, raiseEvent } from '../BrowserRenderer';
import { BlazorDOMElement } from './BlazorDOMElement';
import { EventForDotNet, UIEventArgs } from '../EventForDotNet';

export class BlazorDOMComponent extends BlazorDOMElement {
  ComponentID: number;

  constructor(CID: number, parent: BlazorDOMElement, childIndex: number, br: BrowserRenderer) {
    const markerStart = document.createComment('blazor-component-start.' + CID);
    const markerEnd = document.createComment('blazor-component-end.' + CID);

    parent.insertNodeIntoDOM(markerEnd, childIndex);
    parent.insertNodeIntoDOM(markerStart, childIndex);

    super(br, markerStart, markerEnd);
    this.ComponentID = CID;

    parent.onChildAttached(this);
  }

  public getClosestDomElement(): Node {
    return this.getDOMElement().parentNode!;
  }

  protected isComponent(): boolean {
    return true;
  }

  protected setAttribute(attributeName: string, attributeValue: string | null) {
    // Blazor DOM Component do not have HTML attributes
  }

  protected raiseEvent(eventHandlerId: number, evt: EventForDotNet<UIEventArgs>) {
    raiseEvent(null, this.browserRenderer.browserRendererId, this.ComponentID, eventHandlerId, evt);
  }
}
