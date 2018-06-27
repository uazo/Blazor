import * as $ from 'jquery';
import * as Blazor from '@blazor';
import 'gritter';
import '@gritterts';

Blazor.registerFunction('ShowGritterMessage', (title, text) => {
  $.gritter.add({
    title: title,
    text: text
  });

  return true;
});

$.extend($.gritter.options, {
  position: 'bottom-right', // defaults to 'top-right' but can be 'bottom-left', 'bottom-right', 'top-left', 'top-right' (added in 1.7.1)
  fade_in_speed: 'medium', // how fast notifications fade in (string or int)
  fade_out_speed: 2000, // how fast the notices fade out
  time: 6000 // hang on the screen for...
});
