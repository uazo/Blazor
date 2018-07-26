import { BlazorDOMComponent } from './BlazorDOMComponent';

const sharedTemplateElemForParsing = document.createElement('template');
const sharedSvgElemForParsing = document.createElementNS('http://www.w3.org/2000/svg', 'g');

export class BlazorMarkupElement extends BlazorDOMComponent {

  public parseMarkup(markup: string, isSvg: boolean) {
    if (isSvg) {
      sharedSvgElemForParsing.innerHTML = markup || ' ';
      return sharedSvgElemForParsing;
    } else {
      sharedTemplateElemForParsing.innerHTML = markup || ' ';
      return sharedTemplateElemForParsing.content;
    }
  }

  public isComponent(): boolean {
    return false;
  }
}
