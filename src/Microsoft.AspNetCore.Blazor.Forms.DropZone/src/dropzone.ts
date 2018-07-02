import * as Blazor from '@blazor';
import * as Dropzone from 'dropzone';

class DropZoneElement extends Blazor.BlazorDOMComponent {

  private url: string = '';
  private authorization: string = '';
  private maxFiles: number = 1;

  private myDropzone: Dropzone | null = null;

  protected isDOMAttribute(attributeName: string, value: string | null): boolean {
    if (attributeName === "Url") {
      this.url = value!;
      return false;
    }
    else if (attributeName === "AuthorizationHeader") {
      this.authorization = value!;
      return false;
    }
    else if (attributeName === "MaxFiles") {
      this.maxFiles = parseInt( value! );
      return false;
    }

    return super.isDOMAttribute(attributeName, value);
  }

  public onDOMUpdating() {
    super.onDOMUpdating();
  }

  public onDOMUpdated() {
    if (this.myDropzone === null) {
      let _this = this;

      let input = this.getDOMElement().nextSibling! as HTMLElement;
      this.myDropzone = new Dropzone(input, {
        url: this.url,
        maxFiles: this.maxFiles,
        addRemoveLinks: true,
        headers: {
          'Authorization': this.authorization
        },
        removedfile: function (file) {
          let toDomElement = _this.getDOMElement();
          let listener = toDomElement['_onfileremovedlistener'];
          if (listener !== undefined && listener !== null) {
            listener({
              type: "FileRemoved",
              value: JSON.stringify({
                FileName: file.name,
                Size: file.size
              })
            });
          }
          file.previewElement.remove();
        },
        success: function (file, response) {
          let toDomElement = _this.getDOMElement();
          let listener = toDomElement['_onfileaddedlistener'];
          if (listener !== undefined && listener !== null) {
            listener({
              type: "FileAdded",
              value: JSON.stringify({
                FileName: file.name,
                Size: file.size,
                Guid: response
              })
            });
          }
        }
      });
    }

    super.onDOMUpdated();
  }

  protected applyEvent(attributeName: string, componentId: number, eventHandlerId: number): boolean {
    var toDomElement = this.getDOMElement();
    var browserRendererId = this.browserRenderer.browserRendererId;
    var _this = this;

    if (attributeName === "onfileadded") {
      let listener = function (evt) {
        _this.raiseEvent(eventHandlerId, new Blazor.EventForDotNet('custom', { type: evt.type, Value: evt.value }));
      };
      toDomElement['_onfileaddedlistener'] = listener;
      return true;
    } else if (attributeName === "onfileremoved") {
      let listener = function (evt) {
        _this.raiseEvent(eventHandlerId, new Blazor.EventForDotNet('custom', { type: evt.type, Value: evt.value }));
      };
      toDomElement['_onfileremovedlistener'] = listener;
      return true;
    }

    return super.applyEvent(attributeName, componentId, eventHandlerId);
  }

  public dispose() {
    if (this.myDropzone !== null) {
      let toDomElement = this.getDOMElement();
      toDomElement['_onfileaddedlistener'] = null;
      toDomElement['_onfileremovedlistener'] = null;

      this.myDropzone.destroy();
      this.myDropzone = null;
    }

    super.dispose();
  }
}

export function RegisterDropZoneComponentId(id) {
  Blazor.registerCustomDOMElement(id, function (CID, parent, childIndex, br) {
    return new DropZoneElement(CID, parent, childIndex, br);
  });

  return true;
}
window["RegisterDropZoneComponentId"] = RegisterDropZoneComponentId;
