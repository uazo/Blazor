import { System_Array, MethodHandle, System_String } from '../Platform/Platform';
import { RenderBatch, ArraySegment, ArrayRange, RenderTreeEdit, RenderTreeFrame, EditType, FrameType, ArrayValues } from './RenderBatch/RenderBatch';
import { platform } from '../Environment';
import { EventDelegator } from './EventDelegator';
import { EventForDotNet, UIEventArgs } from './EventForDotNet';
import { applyCaptureIdToElement } from './ElementReferenceCapture';

const preventDefaultEvents: { [eventType: string]: boolean } = { submit: true };

import { BlazorDOMElement } from './Elements/BlazorDOMElement';
import { createBlazorDOMComponent, createBlazorDOMElement, createBlazorMarkupComponent } from './Elements/ElementCreators';

let raiseEventMethod: MethodHandle;
let renderComponentMethod: MethodHandle;

export class BrowserRenderer {
  // private is better (todo: I don't like it!)
  public eventDelegator: EventDelegator;
  private readonly childComponentLocations: { [componentId: number]: BlazorDOMElement } = {};

  public readonly browserRendererId: number;
  private renderNo: number = 0;

  constructor(rendererId: number) {
    this.browserRendererId = rendererId;
    this.eventDelegator = new EventDelegator((event, componentId, eventHandlerId, eventArgs) => {
      raiseEvent(event, this.browserRendererId, componentId, eventHandlerId, eventArgs);
    });
  }

  public beginRender() {
    this.renderNo++;
    console.log("renderBatch " + this.renderNo);
  }

  public endRender() {
    this.renderNo--;

    this.sendQueueEvents();
    console.log("renderBatch " + (this.renderNo+1) + " finished");
  }

  public attachRootComponentToElement(componentId: number, element: Element) {
    this.attachComponentToElement(componentId, element);
  }

  private attachComponentToElement(componentId: number, element: Node) {
    let blazorElement = new BlazorDOMElement(this, element);
    this.attachBlazorComponentToElement(componentId, blazorElement);
  }

  public updateComponent(batch: RenderBatch, componentId: number, edits: ArraySegment<RenderTreeEdit>, referenceFrames: ArrayValues<RenderTreeFrame>) {
    const element = this.childComponentLocations[componentId];
    if (!element) {
      throw new Error(`No element is currently associated with component ${componentId}`);
    }

    this.applyEdits(batch, componentId, element, 0, edits, referenceFrames);
  }

  public disposeComponent(componentId: number) {
    this.childComponentLocations[componentId].dispose();
    delete this.childComponentLocations[componentId];
  }

  private attachBlazorComponentToElement(componentId: number, element: BlazorDOMElement) {
    this.childComponentLocations[componentId] = element;
  }

  private applyEdits(batch: RenderBatch, componentId: number, parent: BlazorDOMElement, childIndex: number, edits: ArraySegment<RenderTreeEdit>, referenceFrames: ArrayValues<RenderTreeFrame>) {
    let t0 = performance.now();

    let currentDepth = 0;
    let childIndexAtCurrentDepth = childIndex;

    const arraySegmentReader = batch.arraySegmentReader;
    const editReader = batch.editReader;
    const frameReader = batch.frameReader;
    const editsValues = arraySegmentReader.values(edits);
    const editsOffset = arraySegmentReader.offset(edits);
    const editsLength = arraySegmentReader.count(edits);
    const maxEditIndexExcl = editsOffset + editsLength;

    parent.onDOMUpdating();

    var elementStack = new Array();
    elementStack.push(parent);

    var elementsNeedRendering = new Array();
    elementsNeedRendering.push(parent);

    for (let editIndex = editsOffset; editIndex < maxEditIndexExcl; editIndex++) {
      const edit = batch.diffReader.editsEntry(editsValues, editIndex);
      const editType = editReader.editType(edit);
      switch (editType) {
        case EditType.prependFrame: {
          const frameIndex = editReader.newTreeIndex(edit);
          const frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
          const siblingIndex = editReader.siblingIndex(edit);
          this.insertFrame(batch, componentId, parent, childIndexAtCurrentDepth + siblingIndex, referenceFrames, frame, frameIndex);
          break;
        }
        case EditType.removeFrame: {
          const siblingIndex = editReader.siblingIndex(edit);
          this.removeNodeFromDOM(parent, childIndexAtCurrentDepth + siblingIndex);
          break;
        }
        case EditType.setAttribute: {
          const frameIndex = editReader.newTreeIndex(edit);
          const frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
          const siblingIndex = editReader.siblingIndex(edit);
          const element = parent.getLogicalChild(childIndexAtCurrentDepth + siblingIndex) as Element;

          if (element instanceof BlazorDOMElement == false) {
            const be = createBlazorDOMElement(this, element);
            be.applyAttribute(batch, componentId, frame);
            be.dispose();
          }
          else {
            const blazorElement = element as any as BlazorDOMElement;
            blazorElement.applyAttribute(batch, componentId, frame);
            if (elementsNeedRendering.findIndex(x => x == blazorElement) == -1)
              elementsNeedRendering.push(blazorElement);
          }
          break;
        }
        case EditType.removeAttribute: {
          // Note that we don't have to dispose the info we track about event handlers here, because the
          // disposed event handler IDs are delivered separately (in the 'disposedEventHandlerIds' array)
          const siblingIndex = editReader.siblingIndex(edit);
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

          parent.removeAttribute(childIndexAtCurrentDepth + siblingIndex, editReader.removedAttributeName(edit)!);
          break;
        }
        case EditType.updateText: {
          const frameIndex = editReader.newTreeIndex(edit);
          const frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
          const siblingIndex = editReader.siblingIndex(edit);
          parent.updateText(childIndexAtCurrentDepth + siblingIndex, frameReader.textContent(frame))
          break;
        }
        case EditType.updateMarkup: {
          const frameIndex = editReader.newTreeIndex(edit);
          const frame = batch.referenceFramesEntry(referenceFrames, frameIndex);
          const siblingIndex = editReader.siblingIndex(edit);
          parent.removeFromDom(childIndexAtCurrentDepth + siblingIndex);
          this.insertMarkup(batch, parent, childIndexAtCurrentDepth + siblingIndex, frame);
          break;
        }
        case EditType.stepIn: {
          const siblingIndex = editReader.siblingIndex(edit);
          const stepInElement = parent.getLogicalChild(childIndexAtCurrentDepth + siblingIndex)!;

          elementStack.push(parent);
          // if stepInElement is a simple DOM element, create a element
          if (stepInElement instanceof BlazorDOMElement == false) {
            parent = createBlazorDOMElement(this, stepInElement as HTMLElement);
          }
          else {
            parent = stepInElement as BlazorDOMElement;
          }
          parent.onDOMUpdating();

          currentDepth++;
          childIndexAtCurrentDepth = 0;
          break;
        }
        case EditType.stepOut: {
          elementsNeedRendering.push(parent);

          parent = elementStack.pop();
          currentDepth--;
          childIndexAtCurrentDepth = currentDepth === 0 ? childIndex : 0; // The childIndex is only ever nonzero at zero depth
          break;
        }
        default: {
          const unknownType: never = editType; // Compile-time verification that the switch was exhaustive
          throw new Error(`Unknown edit type: ${unknownType}`);
        }
      }
    }

    let needRendering = elementsNeedRendering.pop() as BlazorDOMElement;
    while (needRendering) {
      needRendering.onDOMUpdated();
      needRendering = elementsNeedRendering.pop();
    }

    let t1 = performance.now();
    let name = "";
    if (parent.constructor) name = parent.constructor.name;
    console.log("updateComponent " + componentId + "(" + name + ") took " + (t1 - t0) + " mills for " + editsLength);
  }

  private insertFrame(batch: RenderBatch, componentId: number, parent: BlazorDOMElement, childIndex: number, frames: ArrayValues<RenderTreeFrame>, frame: RenderTreeFrame, frameIndex: number): number {
    const frameReader = batch.frameReader;
    const frameType = frameReader.frameType(frame);
    switch (frameType) {
      case FrameType.element:
        this.insertElement(batch, componentId, parent, childIndex, frames, frame, frameIndex);
        return 1;
      case FrameType.text:
        this.insertText(batch, parent, childIndex, frame);
        return 1;
      case FrameType.attribute:
        throw new Error('Attribute frames should only be present as leading children of element frames.');
      case FrameType.component:
        this.insertComponent(batch, parent, childIndex, frame, frames, frameIndex);
        return 1;
      case FrameType.region:
        return this.insertFrameRange(batch, componentId, parent, childIndex, frames, frameIndex + 1, frameIndex + frameReader.subtreeLength(frame));
      case FrameType.elementReferenceCapture:
        {
          let parentElement = parent.getClosestDomElement() as Element;
          if (parentElement instanceof Element) {
            applyCaptureIdToElement(parentElement, frameReader.elementReferenceCaptureId(frame)!);
            return 0; // A "capture" is a child in the diff, but has no node in the DOM
          } else {
            throw new Error('Reference capture frames can only be children of element frames.');
          }
        }
      case FrameType.markup:
        this.insertMarkup(batch, parent, childIndex, frame);
        return 1;
      default:
        const unknownType: never = frameType; // Compile-time verification that the switch was exhaustive
        throw new Error(`Unknown frame type: ${unknownType}`);
    }
  }

  private insertElement(batch: RenderBatch, componentId: number, parent: BlazorDOMElement, childIndex: number, frames: ArrayValues<RenderTreeFrame>, frame: RenderTreeFrame, frameIndex: number) {
    const frameReader = batch.frameReader;
    const tagName = frameReader.elementName(frame)!;
    const newDomElement = parent.createElement(tagName, childIndex);

    if (newDomElement !== null && newDomElement !== undefined) {
      parent.insertNodeIntoDOM(newDomElement, childIndex);

      let blazorElement = createBlazorDOMElement(this, newDomElement);

      // Apply attributes
      const descendantsEndIndexExcl = frameIndex + frameReader.subtreeLength(frame);
      for (let descendantIndex = frameIndex + 1; descendantIndex < descendantsEndIndexExcl; descendantIndex++) {
        const descendantFrame = batch.referenceFramesEntry(frames, descendantIndex);

        if (frameReader.frameType(descendantFrame) === FrameType.attribute) {
          blazorElement.applyAttribute(batch, componentId, descendantFrame);
        } else {
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
  }

	private insertComponent(batch: RenderBatch, parent: BlazorDOMElement, childIndex: number, frame: RenderTreeFrame, frames: ArrayValues<RenderTreeFrame>, frameIndex: number) {
    // All we have to do is associate the child component ID with its location. We don't actually
    // do any rendering here, because the diff for the child will appear later in the render batch.

    const frameReader = batch.frameReader;
    const childComponentId = frameReader.componentId(frame);
    const customComponentType = frameReader.customComponentType(frame);
    const blazorElement = createBlazorDOMComponent(this, childComponentId, parent, childIndex, customComponentType);
    this.attachBlazorComponentToElement(childComponentId, blazorElement);

    if (customComponentType != 0) {
      // Apply attributes
      const descendantsEndIndexExcl = frameIndex + frameReader.subtreeLength(frame);
      for (let descendantIndex = frameIndex + 1; descendantIndex < descendantsEndIndexExcl; descendantIndex++) {
        const descendantFrame = batch.referenceFramesEntry(frames, descendantIndex);

        if (frameReader.frameType(descendantFrame) === FrameType.attribute) {
          blazorElement.applyAttribute(batch, childComponentId, descendantFrame);
        } else {
          break;
        }
      }
    }
  }

  private insertText(batch: RenderBatch, parent: BlazorDOMElement, childIndex: number, textFrame: RenderTreeFrame) {
    const textContent = batch.frameReader.textContent(textFrame)!;
    const newTextNode = document.createTextNode(textContent);
    parent.insertNodeIntoDOM(newTextNode, childIndex);
  }

  private insertFrameRange(batch: RenderBatch, componentId: number, parent: BlazorDOMElement, childIndex: number, frames: ArrayValues<RenderTreeFrame>, startIndex: number, endIndexExcl: number): number {
    const origChildIndex = childIndex;
    for (let index = startIndex; index < endIndexExcl; index++) {
      const frame = batch.referenceFramesEntry(frames, index);
      const numChildrenInserted = this.insertFrame(batch, componentId, parent, childIndex, frames, frame, index);
      childIndex += numChildrenInserted;

      // Skip over any descendants, since they are already dealt with recursively
      index += this.countDescendantFrames(batch, frame);
    }

    return (childIndex - origChildIndex); // Total number of children inserted
  }

  private insertMarkup(batch: RenderBatch, parent: BlazorDOMElement, childIndex: number, markupFrame: RenderTreeFrame) {
    const markupContainer = createBlazorMarkupComponent(this, -1, parent, childIndex);

    const markupContent = batch.frameReader.markupContent(markupFrame);
    const parsedMarkup = markupContainer.parseMarkup(markupContent, parent.isSvgElement());
    let logicalSiblingIndex = 0;
    while (parsedMarkup.firstChild) {
      markupContainer.insertNodeIntoDOM(parsedMarkup.firstChild, logicalSiblingIndex++);
    }
  }

  private removeNodeFromDOM(parent: BlazorDOMElement, childIndex: number) {
    parent.removeFromDom(childIndex);
  }

  public disposeEventHandler(eventHandlerId: number) {
    this.eventDelegator.removeListener(eventHandlerId);
  }

  private countDescendantFrames(batch: RenderBatch, frame: RenderTreeFrame): number {
    const frameReader = batch.frameReader;
    switch (frameReader.frameType(frame)) {
      // The following frame types have a subtree length. Other frames may use that memory slot
      // to mean something else, so we must not read it. We should consider having nominal subtypes
      // of RenderTreeFramePointer that prevent access to non-applicable fields.
      case FrameType.component:
      case FrameType.element:
      case FrameType.region:
        return frameReader.subtreeLength(frame) - 1;
      default:
        return 0;
    }
  }

  private _queueEvent: any[] = [];

  public async raiseEvent(event: Event | null, componentId: number, eventHandlerId: number, eventArgs: EventForDotNet<UIEventArgs>) {
    if (this.renderNo == 0) {
      return raiseEvent(event, this.browserRendererId, componentId, eventHandlerId, eventArgs);
    }
    else {
      this._queueEvent.push({
        event: event,
        componentId: componentId,
        eventHandlerId: eventHandlerId,
        eventArgs: eventArgs
      });
    }
  }

  private sendQueueEvents() {
    if (this._queueEvent.length == 0) return;

    let evt = this._queueEvent.pop();
    while (evt)
    {
      //raiseEvent(evt.event, this.browserRendererId, evt.componentId, evt.eventHandlerId, evt.eventArgs);

      const eventDescriptor = {
        browserRendererId: this.browserRendererId,
        componentId: evt.componentId,
        eventHandlerId: evt.eventHandlerId,
        eventArgsType: evt.eventArgs.type
      };

      console.log("sendQueueEvents start " + eventDescriptor.componentId);
      let t0 = performance.now();

      DotNet.invokeMethodAsync(
        'Microsoft.AspNetCore.Blazor.Browser',
        'DispatchEvent',
        eventDescriptor,
        JSON.stringify(evt.eventArgs.data));

      let t1 = performance.now();
      console.log("sendQueueEvents " + eventDescriptor.componentId + "-" + eventDescriptor.eventArgsType + " took " + (t1 - t0) + " milliseconds.")

      evt = this._queueEvent.pop();
    }
  }
}

export function raiseEvent(event: Event | null, browserRendererId: number, componentId: number, eventHandlerId: number, eventArgs: EventForDotNet<UIEventArgs>) {
	if (event !== null && event.preventDefault !== undefined)
		event.preventDefault();

  if (event !== null && preventDefaultEvents[event.type]) {
		event.preventDefault();
	}

	const eventDescriptor = {
    browserRendererId,
    componentId,
    eventHandlerId,
    eventArgsType: eventArgs.type
	};

  console.log("BrowserRendererEventDispatcher start " + eventDescriptor.componentId);

  let t0 = performance.now();
  window.setTimeout(() => {
    var rt = DotNet.invokeMethodAsync(
      'Microsoft.AspNetCore.Blazor.Browser',
      'DispatchEvent',
      eventDescriptor,
      JSON.stringify(eventArgs.data));
  }, 1);

	let t1 = performance.now();
  console.log("BrowserRendererEventDispatcher " + eventDescriptor.componentId + "-" + eventDescriptor.eventArgsType + " took " + (t1 - t0) + " milliseconds.")
}
