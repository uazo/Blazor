import * as $ from 'jquery';
import * as Blazor from '@blazor';
import 'eonasdan-bootstrap-datetimepicker';
import * as moment from 'moment-timezone';

class DateTimePickerComponent extends Blazor.BlazorDOMComponent {
  DatePicker: EonasdanBootstrapDatetimepicker.Datetimepicker | null = null;
  Format: string | null = null;

  protected isDOMAttribute(attributeName: string, value: string | null): boolean {
    if (attributeName === "Format") {
      this.Format = value!;
      return false;
    }
    return super.isDOMAttribute(attributeName, value);
  }

  onDOMUpdated() {
    if (this.DatePicker === null) {
      let input = this.getDOMElement().nextSibling! as HTMLElement;
      let value = new Date(((input.firstChild) as HTMLInputElement).value);
      let _this = this;

      if (input !== null) {
        this.DatePicker = $(input).datetimepicker({
          locale: moment.locale('it'),
        }).data("DateTimePicker");

        this.DatePicker!.date(value);

        $(input).on('dp.change', function (e) {
          let newValue = _this.DatePicker!.date().format('YYYY-MM-DDTHH:mm:ss');

          let toDomElement = _this.getDOMElement();
          let listener = toDomElement['_onchange'];
          if (listener !== undefined && listener !== null) {
            listener({
              type: "onchange",
              value: newValue
            });
          }
        });
      }
    }

    if (this.DatePicker !== null) {
      if (this.Format !== null) this.DatePicker!.format(this.Format);
    }
    super.onDOMUpdated();
  }

  protected applyEvent(attributeName: string, componentId: number, eventHandlerId: number): boolean {
    var toDomElement = this.getDOMElement();
    var browserRendererId = this.browserRenderer.browserRendererId;
    var _this = this;

    if (attributeName === "onchange") {
      let listener = function (evt) {
        _this.raiseEvent(eventHandlerId, new Blazor.EventForDotNet('custom', { type: evt.type, Value: evt.value }));
      };
      toDomElement['_onchange'] = listener;
      return true;
    }

    return super.applyEvent(attributeName, componentId, eventHandlerId);
  }

  public dispose() {
    let toDomElement = this.getDOMElement();
    toDomElement['_onchange'] = null;

    if( this.DatePicker != null) this.DatePicker.destroy();
    super.dispose();
  }
}

Blazor.registerFunction('RegisterDateTimePickerComponentId', (id) => {
  Blazor.registerCustomDOMElement(id, function (CID, parent, childIndex, br) {
    return new DateTimePickerComponent(CID, parent, childIndex, br);
  });

  return true;
});
