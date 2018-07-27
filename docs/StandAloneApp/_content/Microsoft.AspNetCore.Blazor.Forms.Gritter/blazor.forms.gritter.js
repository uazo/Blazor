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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = window['$'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(0);
__webpack_require__(3);
__webpack_require__(4);
function ShowGritterMessage(title, text) {
    $.gritter.add({
        title: title,
        text: text
    });
    return true;
}
window["ShowGritterMessage"] = ShowGritterMessage;
$.extend($.gritter.options, {
    position: 'bottom-right',
    fade_in_speed: 'medium',
    fade_out_speed: 2000,
    time: 6000 // hang on the screen for...
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*
 * Gritter for jQuery
 * http://www.boedesign.com/
 *
 * Copyright (c) 2012 Jordan Boesch
 * Dual licensed under the MIT and GPL licenses.
 *
 * Date: February 24, 2012
 * Version: 1.7.4
 */

(function($){
 	
	/**
	* Set it up as an object under the jQuery namespace
	*/
	$.gritter = {};
	
	/**
	* Set up global options that the user can over-ride
	*/
	$.gritter.options = {
		position: '',
		class_name: '', // could be set to 'gritter-light' to use white notifications
		fade_in_speed: 'medium', // how fast notifications fade in
		fade_out_speed: 1000, // how fast the notices fade out
		time: 6000 // hang on the screen for...
	}
	
	/**
	* Add a gritter notification to the screen
	* @see Gritter#add();
	*/
	$.gritter.add = function(params){

		try {
			return Gritter.add(params || {});
		} catch(e) {
		
			var err = 'Gritter Error: ' + e;
			(typeof(console) != 'undefined' && console.error) ? 
				console.error(err, params) : 
				alert(err);
				
		}
		
	}
	
	/**
	* Remove a gritter notification from the screen
	* @see Gritter#removeSpecific();
	*/
	$.gritter.remove = function(id, params){
		Gritter.removeSpecific(id, params || {});
	}
	
	/**
	* Remove all notifications
	* @see Gritter#stop();
	*/
	$.gritter.removeAll = function(params){
		Gritter.stop(params || {});
	}
	
	/**
	* Big fat Gritter object
	* @constructor (not really since its object literal)
	*/
	var Gritter = {
		
		// Public - options to over-ride with $.gritter.options in "add"
		position: '',
		fade_in_speed: '',
		fade_out_speed: '',
		time: '',
		
		// Private - no touchy the private parts
		_custom_timer: 0,
		_item_count: 0,
		_is_setup: 0,
		_tpl_close: '<a class="gritter-close" href="#" tabindex="1">Close Notification</a>',
		_tpl_title: '<span class="gritter-title">[[title]]</span>',
		_tpl_item: '<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none" role="alert"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',
		_tpl_wrap: '<div id="gritter-notice-wrapper"></div>',
		
		/**
		* Add a gritter notification to the screen
		* @param {Object} params The object that contains all the options for drawing the notification
		* @return {Integer} The specific numeric id to that gritter notification
		*/
		add: function(params){
			// Handle straight text
			if(typeof(params) == 'string'){
				params = {text:params};
			}

			// We might have some issues if we don't have a title or text!
			if(params.text === null){
				throw 'You must supply "text" parameter.'; 
			}
			
			// Check the options and set them once
			if(!this._is_setup){
				this._runSetup();
			}
			
			// Basics
			var title = params.title, 
				text = params.text,
				image = params.image || '',
				sticky = params.sticky || false,
				item_class = params.class_name || $.gritter.options.class_name,
				position = $.gritter.options.position,
				time_alive = params.time || '';

			this._verifyWrapper();
			
			this._item_count++;
			var number = this._item_count, 
				tmp = this._tpl_item;
			
			// Assign callbacks
			$(['before_open', 'after_open', 'before_close', 'after_close']).each(function(i, val){
				Gritter['_' + val + '_' + number] = ($.isFunction(params[val])) ? params[val] : function(){}
			});

			// Reset
			this._custom_timer = 0;
			
			// A custom fade time set
			if(time_alive){
				this._custom_timer = time_alive;
			}
			
			var image_str = (image != '') ? '<img src="' + image + '" class="gritter-image" />' : '',
				class_name = (image != '') ? 'gritter-with-image' : 'gritter-without-image';
			
			// String replacements on the template
			if(title){
				title = this._str_replace('[[title]]',title,this._tpl_title);
			}else{
				title = '';
			}
			
			tmp = this._str_replace(
				['[[title]]', '[[text]]', '[[close]]', '[[image]]', '[[number]]', '[[class_name]]', '[[item_class]]'],
				[title, text, this._tpl_close, image_str, this._item_count, class_name, item_class], tmp
			);

			// If it's false, don't show another gritter message
			if(this['_before_open_' + number]() === false){
				return false;
			}

			$('#gritter-notice-wrapper').addClass(position).append(tmp);
			
			var item = $('#gritter-item-' + this._item_count);
			
			item.fadeIn(this.fade_in_speed, function(){
				Gritter['_after_open_' + number]($(this));
			});
			
			if(!sticky){
				this._setFadeTimer(item, number);
			}
			
			// Bind the hover/unhover states
			$(item).bind('mouseenter mouseleave', function(event){
				if(event.type == 'mouseenter'){
					if(!sticky){ 
						Gritter._restoreItemIfFading($(this), number);
					}
				}
				else {
					if(!sticky){
						Gritter._setFadeTimer($(this), number);
					}
				}
				Gritter._hoverState($(this), event.type);
			});
			
			// Clicking (X) makes the perdy thing close
			$(item).find('.gritter-close').click(function(){
				Gritter.removeSpecific(number, {}, null, true);
				return false;
			});
			
			return number;
		
		},
		
		/**
		* If we don't have any more gritter notifications, get rid of the wrapper using this check
		* @private
		* @param {Integer} unique_id The ID of the element that was just deleted, use it for a callback
		* @param {Object} e The jQuery element that we're going to perform the remove() action on
		* @param {Boolean} manual_close Did we close the gritter dialog with the (X) button
		*/
		_countRemoveWrapper: function(unique_id, e, manual_close){
			
			// Remove it then run the callback function
			e.remove();
			this['_after_close_' + unique_id](e, manual_close);
			
			// Check if the wrapper is empty, if it is.. remove the wrapper
			if($('.gritter-item-wrapper').length == 0){
				$('#gritter-notice-wrapper').remove();
			}
		
		},
		
		/**
		* Fade out an element after it's been on the screen for x amount of time
		* @private
		* @param {Object} e The jQuery element to get rid of
		* @param {Integer} unique_id The id of the element to remove
		* @param {Object} params An optional list of params to set fade speeds etc.
		* @param {Boolean} unbind_events Unbind the mouseenter/mouseleave events if they click (X)
		*/
		_fade: function(e, unique_id, params, unbind_events){

			var params = params || {},
				fade = (typeof(params.fade) != 'undefined') ? params.fade : true,
				fade_out_speed = params.speed || this.fade_out_speed,
				manual_close = unbind_events;

			this['_before_close_' + unique_id](e, manual_close);
			
			// If this is true, then we are coming from clicking the (X)
			if(unbind_events){
				e.unbind('mouseenter mouseleave');
			}
			
			// Fade it out or remove it
			if(fade){
			
				e.animate({
					opacity: 0
				}, fade_out_speed, function(){
					e.animate({ height: 0 }, 300, function(){
						Gritter._countRemoveWrapper(unique_id, e, manual_close);
					})
				})
				
			}
			else {
				
				this._countRemoveWrapper(unique_id, e);
				
			}
						
		},
		
		/**
		* Perform actions based on the type of bind (mouseenter, mouseleave) 
		* @private
		* @param {Object} e The jQuery element
		* @param {String} type The type of action we're performing: mouseenter or mouseleave
		*/
		_hoverState: function(e, type){
			
			// Change the border styles and add the (X) close button when you hover
			if(type == 'mouseenter'){
				
				e.addClass('hover');
				
				// Show close button
				e.find('.gritter-close').show();
						
			}
			// Remove the border styles and hide (X) close button when you mouse out
			else {
				
				e.removeClass('hover');
				
				// Hide close button
				e.find('.gritter-close').hide();
				
			}
			
		},
		
		/**
		* Remove a specific notification based on an ID
		* @param {Integer} unique_id The ID used to delete a specific notification
		* @param {Object} params A set of options passed in to determine how to get rid of it
		* @param {Object} e The jQuery element that we're "fading" then removing
		* @param {Boolean} unbind_events If we clicked on the (X) we set this to true to unbind mouseenter/mouseleave
		*/
		removeSpecific: function(unique_id, params, e, unbind_events){
			
			if(!e){
				var e = $('#gritter-item-' + unique_id);
			}

			// We set the fourth param to let the _fade function know to 
			// unbind the "mouseleave" event.  Once you click (X) there's no going back!
			this._fade(e, unique_id, params || {}, unbind_events);
			
		},
		
		/**
		* If the item is fading out and we hover over it, restore it!
		* @private
		* @param {Object} e The HTML element to remove
		* @param {Integer} unique_id The ID of the element
		*/
		_restoreItemIfFading: function(e, unique_id){
			
			clearTimeout(this['_int_id_' + unique_id]);
			e.stop().css({ opacity: '', height: '' });
			
		},
		
		/**
		* Setup the global options - only once
		* @private
		*/
		_runSetup: function(){
		
			for(opt in $.gritter.options){
				this[opt] = $.gritter.options[opt];
			}
			this._is_setup = 1;
			
		},
		
		/**
		* Set the notification to fade out after a certain amount of time
		* @private
		* @param {Object} item The HTML element we're dealing with
		* @param {Integer} unique_id The ID of the element
		*/
		_setFadeTimer: function(e, unique_id){
			
			var timer_str = (this._custom_timer) ? this._custom_timer : this.time;
			this['_int_id_' + unique_id] = setTimeout(function(){ 
				Gritter._fade(e, unique_id);
			}, timer_str);
		
		},
		
		/**
		* Bring everything to a halt
		* @param {Object} params A list of callback functions to pass when all notifications are removed
		*/  
		stop: function(params){
			
			// callbacks (if passed)
			var before_close = ($.isFunction(params.before_close)) ? params.before_close : function(){};
			var after_close = ($.isFunction(params.after_close)) ? params.after_close : function(){};
			
			var wrap = $('#gritter-notice-wrapper');
			before_close(wrap);
			wrap.fadeOut(function(){
				$(this).remove();
				after_close();
			});
		
		},
		
		/**
		* An extremely handy PHP function ported to JS, works well for templating
		* @private
		* @param {String/Array} search A list of things to search for
		* @param {String/Array} replace A list of things to replace the searches with
		* @return {String} sa The output
		*/  
		_str_replace: function(search, replace, subject, count){
		
			var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
				f = [].concat(search),
				r = [].concat(replace),
				s = subject,
				ra = r instanceof Array, sa = s instanceof Array;
			s = [].concat(s);
			
			if(count){
				this.window[count] = 0;
			}
		
			for(i = 0, sl = s.length; i < sl; i++){
				
				if(s[i] === ''){
					continue;
				}
				
				for (j = 0, fl = f.length; j < fl; j++){
					
					temp = s[i] + '';
					repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
					s[i] = (temp).split(f[j]).join(repl);
					
					if(count && s[i] !== temp){
						this.window[count] += (temp.length-s[i].length) / f[j].length;
					}
					
				}
			}
			
			return sa ? s : s[0];
			
		},
		
		/**
		* A check to make sure we have something to wrap our notices with
		* @private
		*/  
		_verifyWrapper: function(){
		  
			if($('#gritter-notice-wrapper').length == 0){
				$('body').append(this._tpl_wrap);
			}
		
		}
		
	}
	
})(jQuery);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = '';

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTk2NTljZjA1Mzk1NWJhOGRiMmMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwid2luZG93WyddXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Jvb3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dyaXR0ZXJ0cy50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ3JpdHRlci9qcy9qcXVlcnkuZ3JpdHRlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCInJ1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSw2Qjs7Ozs7Ozs7O0FDQUEsdUJBQXFCOzs7Ozs7Ozs7O0FDQXJCLCtCQUE0QjtBQUU1Qix1QkFBaUI7QUFDakIsdUJBQW9CO0FBRXBCLDRCQUE0QixLQUFLLEVBQUUsSUFBSTtJQUNyQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNaLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFLElBQUk7S0FDWCxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFDRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsR0FBRyxrQkFBa0IsQ0FBQztBQUVsRCxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMs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Rzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0Esd0Q7QUFDQTtBQUNBLElBQUk7O0FBRUosR0FBRzs7QUFFSDtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsWUFBWSxhQUFhO0FBQ3pCLFlBQVksYUFBYTtBQUN6QixhQUFhLE9BQU87QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDRCQUE0QixRQUFROztBQUVwQztBQUNBO0FBQ0E7O0FBRUEsOEJBQThCLFFBQVE7O0FBRXRDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLENBQUM7Ozs7Ozs7O0FDbGFELG9CIiwiZmlsZSI6ImJsYXpvci5mb3Jtcy5ncml0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTk2NTljZjA1Mzk1NWJhOGRiMmMiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1snJCddO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwid2luZG93WyckJ11cIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJy4vZ3JpdHRlcnRzJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0Jvb3QudHMiLCJpbXBvcnQgKiBhcyAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCAqIGFzIEJsYXpvciBmcm9tICdAYmxhem9yJztcclxuaW1wb3J0ICdncml0dGVyJztcclxuaW1wb3J0ICdAZ3JpdHRlcnRzJztcclxuXHJcbmZ1bmN0aW9uIFNob3dHcml0dGVyTWVzc2FnZSh0aXRsZSwgdGV4dCkge1xyXG4gICQuZ3JpdHRlci5hZGQoe1xyXG4gICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgdGV4dDogdGV4dFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG53aW5kb3dbXCJTaG93R3JpdHRlck1lc3NhZ2VcIl0gPSBTaG93R3JpdHRlck1lc3NhZ2U7XHJcblxyXG4kLmV4dGVuZCgkLmdyaXR0ZXIub3B0aW9ucywge1xyXG4gIHBvc2l0aW9uOiAnYm90dG9tLXJpZ2h0JywgLy8gZGVmYXVsdHMgdG8gJ3RvcC1yaWdodCcgYnV0IGNhbiBiZSAnYm90dG9tLWxlZnQnLCAnYm90dG9tLXJpZ2h0JywgJ3RvcC1sZWZ0JywgJ3RvcC1yaWdodCcgKGFkZGVkIGluIDEuNy4xKVxyXG4gIGZhZGVfaW5fc3BlZWQ6ICdtZWRpdW0nLCAvLyBob3cgZmFzdCBub3RpZmljYXRpb25zIGZhZGUgaW4gKHN0cmluZyBvciBpbnQpXHJcbiAgZmFkZV9vdXRfc3BlZWQ6IDIwMDAsIC8vIGhvdyBmYXN0IHRoZSBub3RpY2VzIGZhZGUgb3V0XHJcbiAgdGltZTogNjAwMCAvLyBoYW5nIG9uIHRoZSBzY3JlZW4gZm9yLi4uXHJcbn0pO1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dyaXR0ZXJ0cy50cyIsIi8qXG4gKiBHcml0dGVyIGZvciBqUXVlcnlcbiAqIGh0dHA6Ly93d3cuYm9lZGVzaWduLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIgSm9yZGFuIEJvZXNjaFxuICogRHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGFuZCBHUEwgbGljZW5zZXMuXG4gKlxuICogRGF0ZTogRmVicnVhcnkgMjQsIDIwMTJcbiAqIFZlcnNpb246IDEuNy40XG4gKi9cblxuKGZ1bmN0aW9uKCQpe1xuIFx0XG5cdC8qKlxuXHQqIFNldCBpdCB1cCBhcyBhbiBvYmplY3QgdW5kZXIgdGhlIGpRdWVyeSBuYW1lc3BhY2Vcblx0Ki9cblx0JC5ncml0dGVyID0ge307XG5cdFxuXHQvKipcblx0KiBTZXQgdXAgZ2xvYmFsIG9wdGlvbnMgdGhhdCB0aGUgdXNlciBjYW4gb3Zlci1yaWRlXG5cdCovXG5cdCQuZ3JpdHRlci5vcHRpb25zID0ge1xuXHRcdHBvc2l0aW9uOiAnJyxcblx0XHRjbGFzc19uYW1lOiAnJywgLy8gY291bGQgYmUgc2V0IHRvICdncml0dGVyLWxpZ2h0JyB0byB1c2Ugd2hpdGUgbm90aWZpY2F0aW9uc1xuXHRcdGZhZGVfaW5fc3BlZWQ6ICdtZWRpdW0nLCAvLyBob3cgZmFzdCBub3RpZmljYXRpb25zIGZhZGUgaW5cblx0XHRmYWRlX291dF9zcGVlZDogMTAwMCwgLy8gaG93IGZhc3QgdGhlIG5vdGljZXMgZmFkZSBvdXRcblx0XHR0aW1lOiA2MDAwIC8vIGhhbmcgb24gdGhlIHNjcmVlbiBmb3IuLi5cblx0fVxuXHRcblx0LyoqXG5cdCogQWRkIGEgZ3JpdHRlciBub3RpZmljYXRpb24gdG8gdGhlIHNjcmVlblxuXHQqIEBzZWUgR3JpdHRlciNhZGQoKTtcblx0Ki9cblx0JC5ncml0dGVyLmFkZCA9IGZ1bmN0aW9uKHBhcmFtcyl7XG5cblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIEdyaXR0ZXIuYWRkKHBhcmFtcyB8fCB7fSk7XG5cdFx0fSBjYXRjaChlKSB7XG5cdFx0XG5cdFx0XHR2YXIgZXJyID0gJ0dyaXR0ZXIgRXJyb3I6ICcgKyBlO1xuXHRcdFx0KHR5cGVvZihjb25zb2xlKSAhPSAndW5kZWZpbmVkJyAmJiBjb25zb2xlLmVycm9yKSA/IFxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVyciwgcGFyYW1zKSA6IFxuXHRcdFx0XHRhbGVydChlcnIpO1xuXHRcdFx0XHRcblx0XHR9XG5cdFx0XG5cdH1cblx0XG5cdC8qKlxuXHQqIFJlbW92ZSBhIGdyaXR0ZXIgbm90aWZpY2F0aW9uIGZyb20gdGhlIHNjcmVlblxuXHQqIEBzZWUgR3JpdHRlciNyZW1vdmVTcGVjaWZpYygpO1xuXHQqL1xuXHQkLmdyaXR0ZXIucmVtb3ZlID0gZnVuY3Rpb24oaWQsIHBhcmFtcyl7XG5cdFx0R3JpdHRlci5yZW1vdmVTcGVjaWZpYyhpZCwgcGFyYW1zIHx8IHt9KTtcblx0fVxuXHRcblx0LyoqXG5cdCogUmVtb3ZlIGFsbCBub3RpZmljYXRpb25zXG5cdCogQHNlZSBHcml0dGVyI3N0b3AoKTtcblx0Ki9cblx0JC5ncml0dGVyLnJlbW92ZUFsbCA9IGZ1bmN0aW9uKHBhcmFtcyl7XG5cdFx0R3JpdHRlci5zdG9wKHBhcmFtcyB8fCB7fSk7XG5cdH1cblx0XG5cdC8qKlxuXHQqIEJpZyBmYXQgR3JpdHRlciBvYmplY3Rcblx0KiBAY29uc3RydWN0b3IgKG5vdCByZWFsbHkgc2luY2UgaXRzIG9iamVjdCBsaXRlcmFsKVxuXHQqL1xuXHR2YXIgR3JpdHRlciA9IHtcblx0XHRcblx0XHQvLyBQdWJsaWMgLSBvcHRpb25zIHRvIG92ZXItcmlkZSB3aXRoICQuZ3JpdHRlci5vcHRpb25zIGluIFwiYWRkXCJcblx0XHRwb3NpdGlvbjogJycsXG5cdFx0ZmFkZV9pbl9zcGVlZDogJycsXG5cdFx0ZmFkZV9vdXRfc3BlZWQ6ICcnLFxuXHRcdHRpbWU6ICcnLFxuXHRcdFxuXHRcdC8vIFByaXZhdGUgLSBubyB0b3VjaHkgdGhlIHByaXZhdGUgcGFydHNcblx0XHRfY3VzdG9tX3RpbWVyOiAwLFxuXHRcdF9pdGVtX2NvdW50OiAwLFxuXHRcdF9pc19zZXR1cDogMCxcblx0XHRfdHBsX2Nsb3NlOiAnPGEgY2xhc3M9XCJncml0dGVyLWNsb3NlXCIgaHJlZj1cIiNcIiB0YWJpbmRleD1cIjFcIj5DbG9zZSBOb3RpZmljYXRpb248L2E+Jyxcblx0XHRfdHBsX3RpdGxlOiAnPHNwYW4gY2xhc3M9XCJncml0dGVyLXRpdGxlXCI+W1t0aXRsZV1dPC9zcGFuPicsXG5cdFx0X3RwbF9pdGVtOiAnPGRpdiBpZD1cImdyaXR0ZXItaXRlbS1bW251bWJlcl1dXCIgY2xhc3M9XCJncml0dGVyLWl0ZW0td3JhcHBlciBbW2l0ZW1fY2xhc3NdXVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgcm9sZT1cImFsZXJ0XCI+PGRpdiBjbGFzcz1cImdyaXR0ZXItdG9wXCI+PC9kaXY+PGRpdiBjbGFzcz1cImdyaXR0ZXItaXRlbVwiPltbY2xvc2VdXVtbaW1hZ2VdXTxkaXYgY2xhc3M9XCJbW2NsYXNzX25hbWVdXVwiPltbdGl0bGVdXTxwPltbdGV4dF1dPC9wPjwvZGl2PjxkaXYgc3R5bGU9XCJjbGVhcjpib3RoXCI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImdyaXR0ZXItYm90dG9tXCI+PC9kaXY+PC9kaXY+Jyxcblx0XHRfdHBsX3dyYXA6ICc8ZGl2IGlkPVwiZ3JpdHRlci1ub3RpY2Utd3JhcHBlclwiPjwvZGl2PicsXG5cdFx0XG5cdFx0LyoqXG5cdFx0KiBBZGQgYSBncml0dGVyIG5vdGlmaWNhdGlvbiB0byB0aGUgc2NyZWVuXG5cdFx0KiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIFRoZSBvYmplY3QgdGhhdCBjb250YWlucyBhbGwgdGhlIG9wdGlvbnMgZm9yIGRyYXdpbmcgdGhlIG5vdGlmaWNhdGlvblxuXHRcdCogQHJldHVybiB7SW50ZWdlcn0gVGhlIHNwZWNpZmljIG51bWVyaWMgaWQgdG8gdGhhdCBncml0dGVyIG5vdGlmaWNhdGlvblxuXHRcdCovXG5cdFx0YWRkOiBmdW5jdGlvbihwYXJhbXMpe1xuXHRcdFx0Ly8gSGFuZGxlIHN0cmFpZ2h0IHRleHRcblx0XHRcdGlmKHR5cGVvZihwYXJhbXMpID09ICdzdHJpbmcnKXtcblx0XHRcdFx0cGFyYW1zID0ge3RleHQ6cGFyYW1zfTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV2UgbWlnaHQgaGF2ZSBzb21lIGlzc3VlcyBpZiB3ZSBkb24ndCBoYXZlIGEgdGl0bGUgb3IgdGV4dCFcblx0XHRcdGlmKHBhcmFtcy50ZXh0ID09PSBudWxsKXtcblx0XHRcdFx0dGhyb3cgJ1lvdSBtdXN0IHN1cHBseSBcInRleHRcIiBwYXJhbWV0ZXIuJzsgXG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIHRoZSBvcHRpb25zIGFuZCBzZXQgdGhlbSBvbmNlXG5cdFx0XHRpZighdGhpcy5faXNfc2V0dXApe1xuXHRcdFx0XHR0aGlzLl9ydW5TZXR1cCgpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHQvLyBCYXNpY3Ncblx0XHRcdHZhciB0aXRsZSA9IHBhcmFtcy50aXRsZSwgXG5cdFx0XHRcdHRleHQgPSBwYXJhbXMudGV4dCxcblx0XHRcdFx0aW1hZ2UgPSBwYXJhbXMuaW1hZ2UgfHwgJycsXG5cdFx0XHRcdHN0aWNreSA9IHBhcmFtcy5zdGlja3kgfHwgZmFsc2UsXG5cdFx0XHRcdGl0ZW1fY2xhc3MgPSBwYXJhbXMuY2xhc3NfbmFtZSB8fCAkLmdyaXR0ZXIub3B0aW9ucy5jbGFzc19uYW1lLFxuXHRcdFx0XHRwb3NpdGlvbiA9ICQuZ3JpdHRlci5vcHRpb25zLnBvc2l0aW9uLFxuXHRcdFx0XHR0aW1lX2FsaXZlID0gcGFyYW1zLnRpbWUgfHwgJyc7XG5cblx0XHRcdHRoaXMuX3ZlcmlmeVdyYXBwZXIoKTtcblx0XHRcdFxuXHRcdFx0dGhpcy5faXRlbV9jb3VudCsrO1xuXHRcdFx0dmFyIG51bWJlciA9IHRoaXMuX2l0ZW1fY291bnQsIFxuXHRcdFx0XHR0bXAgPSB0aGlzLl90cGxfaXRlbTtcblx0XHRcdFxuXHRcdFx0Ly8gQXNzaWduIGNhbGxiYWNrc1xuXHRcdFx0JChbJ2JlZm9yZV9vcGVuJywgJ2FmdGVyX29wZW4nLCAnYmVmb3JlX2Nsb3NlJywgJ2FmdGVyX2Nsb3NlJ10pLmVhY2goZnVuY3Rpb24oaSwgdmFsKXtcblx0XHRcdFx0R3JpdHRlclsnXycgKyB2YWwgKyAnXycgKyBudW1iZXJdID0gKCQuaXNGdW5jdGlvbihwYXJhbXNbdmFsXSkpID8gcGFyYW1zW3ZhbF0gOiBmdW5jdGlvbigpe31cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBSZXNldFxuXHRcdFx0dGhpcy5fY3VzdG9tX3RpbWVyID0gMDtcblx0XHRcdFxuXHRcdFx0Ly8gQSBjdXN0b20gZmFkZSB0aW1lIHNldFxuXHRcdFx0aWYodGltZV9hbGl2ZSl7XG5cdFx0XHRcdHRoaXMuX2N1c3RvbV90aW1lciA9IHRpbWVfYWxpdmU7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHZhciBpbWFnZV9zdHIgPSAoaW1hZ2UgIT0gJycpID8gJzxpbWcgc3JjPVwiJyArIGltYWdlICsgJ1wiIGNsYXNzPVwiZ3JpdHRlci1pbWFnZVwiIC8+JyA6ICcnLFxuXHRcdFx0XHRjbGFzc19uYW1lID0gKGltYWdlICE9ICcnKSA/ICdncml0dGVyLXdpdGgtaW1hZ2UnIDogJ2dyaXR0ZXItd2l0aG91dC1pbWFnZSc7XG5cdFx0XHRcblx0XHRcdC8vIFN0cmluZyByZXBsYWNlbWVudHMgb24gdGhlIHRlbXBsYXRlXG5cdFx0XHRpZih0aXRsZSl7XG5cdFx0XHRcdHRpdGxlID0gdGhpcy5fc3RyX3JlcGxhY2UoJ1tbdGl0bGVdXScsdGl0bGUsdGhpcy5fdHBsX3RpdGxlKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aXRsZSA9ICcnO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR0bXAgPSB0aGlzLl9zdHJfcmVwbGFjZShcblx0XHRcdFx0WydbW3RpdGxlXV0nLCAnW1t0ZXh0XV0nLCAnW1tjbG9zZV1dJywgJ1tbaW1hZ2VdXScsICdbW251bWJlcl1dJywgJ1tbY2xhc3NfbmFtZV1dJywgJ1tbaXRlbV9jbGFzc11dJ10sXG5cdFx0XHRcdFt0aXRsZSwgdGV4dCwgdGhpcy5fdHBsX2Nsb3NlLCBpbWFnZV9zdHIsIHRoaXMuX2l0ZW1fY291bnQsIGNsYXNzX25hbWUsIGl0ZW1fY2xhc3NdLCB0bXBcblx0XHRcdCk7XG5cblx0XHRcdC8vIElmIGl0J3MgZmFsc2UsIGRvbid0IHNob3cgYW5vdGhlciBncml0dGVyIG1lc3NhZ2Vcblx0XHRcdGlmKHRoaXNbJ19iZWZvcmVfb3Blbl8nICsgbnVtYmVyXSgpID09PSBmYWxzZSl7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0JCgnI2dyaXR0ZXItbm90aWNlLXdyYXBwZXInKS5hZGRDbGFzcyhwb3NpdGlvbikuYXBwZW5kKHRtcCk7XG5cdFx0XHRcblx0XHRcdHZhciBpdGVtID0gJCgnI2dyaXR0ZXItaXRlbS0nICsgdGhpcy5faXRlbV9jb3VudCk7XG5cdFx0XHRcblx0XHRcdGl0ZW0uZmFkZUluKHRoaXMuZmFkZV9pbl9zcGVlZCwgZnVuY3Rpb24oKXtcblx0XHRcdFx0R3JpdHRlclsnX2FmdGVyX29wZW5fJyArIG51bWJlcl0oJCh0aGlzKSk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0aWYoIXN0aWNreSl7XG5cdFx0XHRcdHRoaXMuX3NldEZhZGVUaW1lcihpdGVtLCBudW1iZXIpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHQvLyBCaW5kIHRoZSBob3Zlci91bmhvdmVyIHN0YXRlc1xuXHRcdFx0JChpdGVtKS5iaW5kKCdtb3VzZWVudGVyIG1vdXNlbGVhdmUnLCBmdW5jdGlvbihldmVudCl7XG5cdFx0XHRcdGlmKGV2ZW50LnR5cGUgPT0gJ21vdXNlZW50ZXInKXtcblx0XHRcdFx0XHRpZighc3RpY2t5KXsgXG5cdFx0XHRcdFx0XHRHcml0dGVyLl9yZXN0b3JlSXRlbUlmRmFkaW5nKCQodGhpcyksIG51bWJlcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGlmKCFzdGlja3kpe1xuXHRcdFx0XHRcdFx0R3JpdHRlci5fc2V0RmFkZVRpbWVyKCQodGhpcyksIG51bWJlcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdEdyaXR0ZXIuX2hvdmVyU3RhdGUoJCh0aGlzKSwgZXZlbnQudHlwZSk7XG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Ly8gQ2xpY2tpbmcgKFgpIG1ha2VzIHRoZSBwZXJkeSB0aGluZyBjbG9zZVxuXHRcdFx0JChpdGVtKS5maW5kKCcuZ3JpdHRlci1jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdEdyaXR0ZXIucmVtb3ZlU3BlY2lmaWMobnVtYmVyLCB7fSwgbnVsbCwgdHJ1ZSk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gbnVtYmVyO1xuXHRcdFxuXHRcdH0sXG5cdFx0XG5cdFx0LyoqXG5cdFx0KiBJZiB3ZSBkb24ndCBoYXZlIGFueSBtb3JlIGdyaXR0ZXIgbm90aWZpY2F0aW9ucywgZ2V0IHJpZCBvZiB0aGUgd3JhcHBlciB1c2luZyB0aGlzIGNoZWNrXG5cdFx0KiBAcHJpdmF0ZVxuXHRcdCogQHBhcmFtIHtJbnRlZ2VyfSB1bmlxdWVfaWQgVGhlIElEIG9mIHRoZSBlbGVtZW50IHRoYXQgd2FzIGp1c3QgZGVsZXRlZCwgdXNlIGl0IGZvciBhIGNhbGxiYWNrXG5cdFx0KiBAcGFyYW0ge09iamVjdH0gZSBUaGUgalF1ZXJ5IGVsZW1lbnQgdGhhdCB3ZSdyZSBnb2luZyB0byBwZXJmb3JtIHRoZSByZW1vdmUoKSBhY3Rpb24gb25cblx0XHQqIEBwYXJhbSB7Qm9vbGVhbn0gbWFudWFsX2Nsb3NlIERpZCB3ZSBjbG9zZSB0aGUgZ3JpdHRlciBkaWFsb2cgd2l0aCB0aGUgKFgpIGJ1dHRvblxuXHRcdCovXG5cdFx0X2NvdW50UmVtb3ZlV3JhcHBlcjogZnVuY3Rpb24odW5pcXVlX2lkLCBlLCBtYW51YWxfY2xvc2Upe1xuXHRcdFx0XG5cdFx0XHQvLyBSZW1vdmUgaXQgdGhlbiBydW4gdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG5cdFx0XHRlLnJlbW92ZSgpO1xuXHRcdFx0dGhpc1snX2FmdGVyX2Nsb3NlXycgKyB1bmlxdWVfaWRdKGUsIG1hbnVhbF9jbG9zZSk7XG5cdFx0XHRcblx0XHRcdC8vIENoZWNrIGlmIHRoZSB3cmFwcGVyIGlzIGVtcHR5LCBpZiBpdCBpcy4uIHJlbW92ZSB0aGUgd3JhcHBlclxuXHRcdFx0aWYoJCgnLmdyaXR0ZXItaXRlbS13cmFwcGVyJykubGVuZ3RoID09IDApe1xuXHRcdFx0XHQkKCcjZ3JpdHRlci1ub3RpY2Utd3JhcHBlcicpLnJlbW92ZSgpO1xuXHRcdFx0fVxuXHRcdFxuXHRcdH0sXG5cdFx0XG5cdFx0LyoqXG5cdFx0KiBGYWRlIG91dCBhbiBlbGVtZW50IGFmdGVyIGl0J3MgYmVlbiBvbiB0aGUgc2NyZWVuIGZvciB4IGFtb3VudCBvZiB0aW1lXG5cdFx0KiBAcHJpdmF0ZVxuXHRcdCogQHBhcmFtIHtPYmplY3R9IGUgVGhlIGpRdWVyeSBlbGVtZW50IHRvIGdldCByaWQgb2Zcblx0XHQqIEBwYXJhbSB7SW50ZWdlcn0gdW5pcXVlX2lkIFRoZSBpZCBvZiB0aGUgZWxlbWVudCB0byByZW1vdmVcblx0XHQqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgQW4gb3B0aW9uYWwgbGlzdCBvZiBwYXJhbXMgdG8gc2V0IGZhZGUgc3BlZWRzIGV0Yy5cblx0XHQqIEBwYXJhbSB7Qm9vbGVhbn0gdW5iaW5kX2V2ZW50cyBVbmJpbmQgdGhlIG1vdXNlZW50ZXIvbW91c2VsZWF2ZSBldmVudHMgaWYgdGhleSBjbGljayAoWClcblx0XHQqL1xuXHRcdF9mYWRlOiBmdW5jdGlvbihlLCB1bmlxdWVfaWQsIHBhcmFtcywgdW5iaW5kX2V2ZW50cyl7XG5cblx0XHRcdHZhciBwYXJhbXMgPSBwYXJhbXMgfHwge30sXG5cdFx0XHRcdGZhZGUgPSAodHlwZW9mKHBhcmFtcy5mYWRlKSAhPSAndW5kZWZpbmVkJykgPyBwYXJhbXMuZmFkZSA6IHRydWUsXG5cdFx0XHRcdGZhZGVfb3V0X3NwZWVkID0gcGFyYW1zLnNwZWVkIHx8IHRoaXMuZmFkZV9vdXRfc3BlZWQsXG5cdFx0XHRcdG1hbnVhbF9jbG9zZSA9IHVuYmluZF9ldmVudHM7XG5cblx0XHRcdHRoaXNbJ19iZWZvcmVfY2xvc2VfJyArIHVuaXF1ZV9pZF0oZSwgbWFudWFsX2Nsb3NlKTtcblx0XHRcdFxuXHRcdFx0Ly8gSWYgdGhpcyBpcyB0cnVlLCB0aGVuIHdlIGFyZSBjb21pbmcgZnJvbSBjbGlja2luZyB0aGUgKFgpXG5cdFx0XHRpZih1bmJpbmRfZXZlbnRzKXtcblx0XHRcdFx0ZS51bmJpbmQoJ21vdXNlZW50ZXIgbW91c2VsZWF2ZScpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHQvLyBGYWRlIGl0IG91dCBvciByZW1vdmUgaXRcblx0XHRcdGlmKGZhZGUpe1xuXHRcdFx0XG5cdFx0XHRcdGUuYW5pbWF0ZSh7XG5cdFx0XHRcdFx0b3BhY2l0eTogMFxuXHRcdFx0XHR9LCBmYWRlX291dF9zcGVlZCwgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRlLmFuaW1hdGUoeyBoZWlnaHQ6IDAgfSwgMzAwLCBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0R3JpdHRlci5fY291bnRSZW1vdmVXcmFwcGVyKHVuaXF1ZV9pZCwgZSwgbWFudWFsX2Nsb3NlKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5fY291bnRSZW1vdmVXcmFwcGVyKHVuaXF1ZV9pZCwgZSk7XG5cdFx0XHRcdFxuXHRcdFx0fVxuXHRcdFx0XHRcdFx0XG5cdFx0fSxcblx0XHRcblx0XHQvKipcblx0XHQqIFBlcmZvcm0gYWN0aW9ucyBiYXNlZCBvbiB0aGUgdHlwZSBvZiBiaW5kIChtb3VzZWVudGVyLCBtb3VzZWxlYXZlKSBcblx0XHQqIEBwcml2YXRlXG5cdFx0KiBAcGFyYW0ge09iamVjdH0gZSBUaGUgalF1ZXJ5IGVsZW1lbnRcblx0XHQqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFRoZSB0eXBlIG9mIGFjdGlvbiB3ZSdyZSBwZXJmb3JtaW5nOiBtb3VzZWVudGVyIG9yIG1vdXNlbGVhdmVcblx0XHQqL1xuXHRcdF9ob3ZlclN0YXRlOiBmdW5jdGlvbihlLCB0eXBlKXtcblx0XHRcdFxuXHRcdFx0Ly8gQ2hhbmdlIHRoZSBib3JkZXIgc3R5bGVzIGFuZCBhZGQgdGhlIChYKSBjbG9zZSBidXR0b24gd2hlbiB5b3UgaG92ZXJcblx0XHRcdGlmKHR5cGUgPT0gJ21vdXNlZW50ZXInKXtcblx0XHRcdFx0XG5cdFx0XHRcdGUuYWRkQ2xhc3MoJ2hvdmVyJyk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBTaG93IGNsb3NlIGJ1dHRvblxuXHRcdFx0XHRlLmZpbmQoJy5ncml0dGVyLWNsb3NlJykuc2hvdygpO1xuXHRcdFx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0XHQvLyBSZW1vdmUgdGhlIGJvcmRlciBzdHlsZXMgYW5kIGhpZGUgKFgpIGNsb3NlIGJ1dHRvbiB3aGVuIHlvdSBtb3VzZSBvdXRcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcblx0XHRcdFx0ZS5yZW1vdmVDbGFzcygnaG92ZXInKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vIEhpZGUgY2xvc2UgYnV0dG9uXG5cdFx0XHRcdGUuZmluZCgnLmdyaXR0ZXItY2xvc2UnKS5oaWRlKCk7XG5cdFx0XHRcdFxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0fSxcblx0XHRcblx0XHQvKipcblx0XHQqIFJlbW92ZSBhIHNwZWNpZmljIG5vdGlmaWNhdGlvbiBiYXNlZCBvbiBhbiBJRFxuXHRcdCogQHBhcmFtIHtJbnRlZ2VyfSB1bmlxdWVfaWQgVGhlIElEIHVzZWQgdG8gZGVsZXRlIGEgc3BlY2lmaWMgbm90aWZpY2F0aW9uXG5cdFx0KiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIEEgc2V0IG9mIG9wdGlvbnMgcGFzc2VkIGluIHRvIGRldGVybWluZSBob3cgdG8gZ2V0IHJpZCBvZiBpdFxuXHRcdCogQHBhcmFtIHtPYmplY3R9IGUgVGhlIGpRdWVyeSBlbGVtZW50IHRoYXQgd2UncmUgXCJmYWRpbmdcIiB0aGVuIHJlbW92aW5nXG5cdFx0KiBAcGFyYW0ge0Jvb2xlYW59IHVuYmluZF9ldmVudHMgSWYgd2UgY2xpY2tlZCBvbiB0aGUgKFgpIHdlIHNldCB0aGlzIHRvIHRydWUgdG8gdW5iaW5kIG1vdXNlZW50ZXIvbW91c2VsZWF2ZVxuXHRcdCovXG5cdFx0cmVtb3ZlU3BlY2lmaWM6IGZ1bmN0aW9uKHVuaXF1ZV9pZCwgcGFyYW1zLCBlLCB1bmJpbmRfZXZlbnRzKXtcblx0XHRcdFxuXHRcdFx0aWYoIWUpe1xuXHRcdFx0XHR2YXIgZSA9ICQoJyNncml0dGVyLWl0ZW0tJyArIHVuaXF1ZV9pZCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdlIHNldCB0aGUgZm91cnRoIHBhcmFtIHRvIGxldCB0aGUgX2ZhZGUgZnVuY3Rpb24ga25vdyB0byBcblx0XHRcdC8vIHVuYmluZCB0aGUgXCJtb3VzZWxlYXZlXCIgZXZlbnQuICBPbmNlIHlvdSBjbGljayAoWCkgdGhlcmUncyBubyBnb2luZyBiYWNrIVxuXHRcdFx0dGhpcy5fZmFkZShlLCB1bmlxdWVfaWQsIHBhcmFtcyB8fCB7fSwgdW5iaW5kX2V2ZW50cyk7XG5cdFx0XHRcblx0XHR9LFxuXHRcdFxuXHRcdC8qKlxuXHRcdCogSWYgdGhlIGl0ZW0gaXMgZmFkaW5nIG91dCBhbmQgd2UgaG92ZXIgb3ZlciBpdCwgcmVzdG9yZSBpdCFcblx0XHQqIEBwcml2YXRlXG5cdFx0KiBAcGFyYW0ge09iamVjdH0gZSBUaGUgSFRNTCBlbGVtZW50IHRvIHJlbW92ZVxuXHRcdCogQHBhcmFtIHtJbnRlZ2VyfSB1bmlxdWVfaWQgVGhlIElEIG9mIHRoZSBlbGVtZW50XG5cdFx0Ki9cblx0XHRfcmVzdG9yZUl0ZW1JZkZhZGluZzogZnVuY3Rpb24oZSwgdW5pcXVlX2lkKXtcblx0XHRcdFxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXNbJ19pbnRfaWRfJyArIHVuaXF1ZV9pZF0pO1xuXHRcdFx0ZS5zdG9wKCkuY3NzKHsgb3BhY2l0eTogJycsIGhlaWdodDogJycgfSk7XG5cdFx0XHRcblx0XHR9LFxuXHRcdFxuXHRcdC8qKlxuXHRcdCogU2V0dXAgdGhlIGdsb2JhbCBvcHRpb25zIC0gb25seSBvbmNlXG5cdFx0KiBAcHJpdmF0ZVxuXHRcdCovXG5cdFx0X3J1blNldHVwOiBmdW5jdGlvbigpe1xuXHRcdFxuXHRcdFx0Zm9yKG9wdCBpbiAkLmdyaXR0ZXIub3B0aW9ucyl7XG5cdFx0XHRcdHRoaXNbb3B0XSA9ICQuZ3JpdHRlci5vcHRpb25zW29wdF07XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9pc19zZXR1cCA9IDE7XG5cdFx0XHRcblx0XHR9LFxuXHRcdFxuXHRcdC8qKlxuXHRcdCogU2V0IHRoZSBub3RpZmljYXRpb24gdG8gZmFkZSBvdXQgYWZ0ZXIgYSBjZXJ0YWluIGFtb3VudCBvZiB0aW1lXG5cdFx0KiBAcHJpdmF0ZVxuXHRcdCogQHBhcmFtIHtPYmplY3R9IGl0ZW0gVGhlIEhUTUwgZWxlbWVudCB3ZSdyZSBkZWFsaW5nIHdpdGhcblx0XHQqIEBwYXJhbSB7SW50ZWdlcn0gdW5pcXVlX2lkIFRoZSBJRCBvZiB0aGUgZWxlbWVudFxuXHRcdCovXG5cdFx0X3NldEZhZGVUaW1lcjogZnVuY3Rpb24oZSwgdW5pcXVlX2lkKXtcblx0XHRcdFxuXHRcdFx0dmFyIHRpbWVyX3N0ciA9ICh0aGlzLl9jdXN0b21fdGltZXIpID8gdGhpcy5fY3VzdG9tX3RpbWVyIDogdGhpcy50aW1lO1xuXHRcdFx0dGhpc1snX2ludF9pZF8nICsgdW5pcXVlX2lkXSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgXG5cdFx0XHRcdEdyaXR0ZXIuX2ZhZGUoZSwgdW5pcXVlX2lkKTtcblx0XHRcdH0sIHRpbWVyX3N0cik7XG5cdFx0XG5cdFx0fSxcblx0XHRcblx0XHQvKipcblx0XHQqIEJyaW5nIGV2ZXJ5dGhpbmcgdG8gYSBoYWx0XG5cdFx0KiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIEEgbGlzdCBvZiBjYWxsYmFjayBmdW5jdGlvbnMgdG8gcGFzcyB3aGVuIGFsbCBub3RpZmljYXRpb25zIGFyZSByZW1vdmVkXG5cdFx0Ki8gIFxuXHRcdHN0b3A6IGZ1bmN0aW9uKHBhcmFtcyl7XG5cdFx0XHRcblx0XHRcdC8vIGNhbGxiYWNrcyAoaWYgcGFzc2VkKVxuXHRcdFx0dmFyIGJlZm9yZV9jbG9zZSA9ICgkLmlzRnVuY3Rpb24ocGFyYW1zLmJlZm9yZV9jbG9zZSkpID8gcGFyYW1zLmJlZm9yZV9jbG9zZSA6IGZ1bmN0aW9uKCl7fTtcblx0XHRcdHZhciBhZnRlcl9jbG9zZSA9ICgkLmlzRnVuY3Rpb24ocGFyYW1zLmFmdGVyX2Nsb3NlKSkgPyBwYXJhbXMuYWZ0ZXJfY2xvc2UgOiBmdW5jdGlvbigpe307XG5cdFx0XHRcblx0XHRcdHZhciB3cmFwID0gJCgnI2dyaXR0ZXItbm90aWNlLXdyYXBwZXInKTtcblx0XHRcdGJlZm9yZV9jbG9zZSh3cmFwKTtcblx0XHRcdHdyYXAuZmFkZU91dChmdW5jdGlvbigpe1xuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZSgpO1xuXHRcdFx0XHRhZnRlcl9jbG9zZSgpO1xuXHRcdFx0fSk7XG5cdFx0XG5cdFx0fSxcblx0XHRcblx0XHQvKipcblx0XHQqIEFuIGV4dHJlbWVseSBoYW5keSBQSFAgZnVuY3Rpb24gcG9ydGVkIHRvIEpTLCB3b3JrcyB3ZWxsIGZvciB0ZW1wbGF0aW5nXG5cdFx0KiBAcHJpdmF0ZVxuXHRcdCogQHBhcmFtIHtTdHJpbmcvQXJyYXl9IHNlYXJjaCBBIGxpc3Qgb2YgdGhpbmdzIHRvIHNlYXJjaCBmb3Jcblx0XHQqIEBwYXJhbSB7U3RyaW5nL0FycmF5fSByZXBsYWNlIEEgbGlzdCBvZiB0aGluZ3MgdG8gcmVwbGFjZSB0aGUgc2VhcmNoZXMgd2l0aFxuXHRcdCogQHJldHVybiB7U3RyaW5nfSBzYSBUaGUgb3V0cHV0XG5cdFx0Ki8gIFxuXHRcdF9zdHJfcmVwbGFjZTogZnVuY3Rpb24oc2VhcmNoLCByZXBsYWNlLCBzdWJqZWN0LCBjb3VudCl7XG5cdFx0XG5cdFx0XHR2YXIgaSA9IDAsIGogPSAwLCB0ZW1wID0gJycsIHJlcGwgPSAnJywgc2wgPSAwLCBmbCA9IDAsXG5cdFx0XHRcdGYgPSBbXS5jb25jYXQoc2VhcmNoKSxcblx0XHRcdFx0ciA9IFtdLmNvbmNhdChyZXBsYWNlKSxcblx0XHRcdFx0cyA9IHN1YmplY3QsXG5cdFx0XHRcdHJhID0gciBpbnN0YW5jZW9mIEFycmF5LCBzYSA9IHMgaW5zdGFuY2VvZiBBcnJheTtcblx0XHRcdHMgPSBbXS5jb25jYXQocyk7XG5cdFx0XHRcblx0XHRcdGlmKGNvdW50KXtcblx0XHRcdFx0dGhpcy53aW5kb3dbY291bnRdID0gMDtcblx0XHRcdH1cblx0XHRcblx0XHRcdGZvcihpID0gMCwgc2wgPSBzLmxlbmd0aDsgaSA8IHNsOyBpKyspe1xuXHRcdFx0XHRcblx0XHRcdFx0aWYoc1tpXSA9PT0gJycpe1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHRmb3IgKGogPSAwLCBmbCA9IGYubGVuZ3RoOyBqIDwgZmw7IGorKyl7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dGVtcCA9IHNbaV0gKyAnJztcblx0XHRcdFx0XHRyZXBsID0gcmEgPyAocltqXSAhPT0gdW5kZWZpbmVkID8gcltqXSA6ICcnKSA6IHJbMF07XG5cdFx0XHRcdFx0c1tpXSA9ICh0ZW1wKS5zcGxpdChmW2pdKS5qb2luKHJlcGwpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmKGNvdW50ICYmIHNbaV0gIT09IHRlbXApe1xuXHRcdFx0XHRcdFx0dGhpcy53aW5kb3dbY291bnRdICs9ICh0ZW1wLmxlbmd0aC1zW2ldLmxlbmd0aCkgLyBmW2pdLmxlbmd0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0cmV0dXJuIHNhID8gcyA6IHNbMF07XG5cdFx0XHRcblx0XHR9LFxuXHRcdFxuXHRcdC8qKlxuXHRcdCogQSBjaGVjayB0byBtYWtlIHN1cmUgd2UgaGF2ZSBzb21ldGhpbmcgdG8gd3JhcCBvdXIgbm90aWNlcyB3aXRoXG5cdFx0KiBAcHJpdmF0ZVxuXHRcdCovICBcblx0XHRfdmVyaWZ5V3JhcHBlcjogZnVuY3Rpb24oKXtcblx0XHQgIFxuXHRcdFx0aWYoJCgnI2dyaXR0ZXItbm90aWNlLXdyYXBwZXInKS5sZW5ndGggPT0gMCl7XG5cdFx0XHRcdCQoJ2JvZHknKS5hcHBlbmQodGhpcy5fdHBsX3dyYXApO1xuXHRcdFx0fVxuXHRcdFxuXHRcdH1cblx0XHRcblx0fVxuXHRcbn0pKGpRdWVyeSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9ncml0dGVyL2pzL2pxdWVyeS5ncml0dGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gJyc7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCInJ1wiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=