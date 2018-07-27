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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Blazor = __webpack_require__(2);
var Dropzone = __webpack_require__(3);
var DropZoneElement = /** @class */ (function (_super) {
    __extends(DropZoneElement, _super);
    function DropZoneElement() {
        var _this_1 = _super !== null && _super.apply(this, arguments) || this;
        _this_1.url = '';
        _this_1.authorization = '';
        _this_1.maxFiles = 1;
        _this_1.myDropzone = null;
        return _this_1;
    }
    DropZoneElement.prototype.isDOMAttribute = function (attributeName, value) {
        if (attributeName === "Url") {
            this.url = value;
            return false;
        }
        else if (attributeName === "AuthorizationHeader") {
            this.authorization = value;
            return false;
        }
        else if (attributeName === "MaxFiles") {
            this.maxFiles = parseInt(value);
            return false;
        }
        return _super.prototype.isDOMAttribute.call(this, attributeName, value);
    };
    DropZoneElement.prototype.onDOMUpdating = function () {
        _super.prototype.onDOMUpdating.call(this);
    };
    DropZoneElement.prototype.onDOMUpdated = function () {
        if (this.myDropzone === null) {
            var _this_2 = this;
            var input = this.getDOMElement().nextSibling;
            if (input.nodeType == 8)
                return; // is comment
            this.myDropzone = new Dropzone(input, {
                url: this.url,
                maxFiles: this.maxFiles,
                addRemoveLinks: true,
                headers: {
                    'Authorization': this.authorization
                },
                removedfile: function (file) {
                    var toDomElement = _this_2.getDOMElement();
                    var listener = toDomElement['_onfileremovedlistener'];
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
                    var toDomElement = _this_2.getDOMElement();
                    var listener = toDomElement['_onfileaddedlistener'];
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
        _super.prototype.onDOMUpdated.call(this);
    };
    DropZoneElement.prototype.applyEvent = function (attributeName, componentId, eventHandlerId) {
        var toDomElement = this.getDOMElement();
        var browserRendererId = this.browserRenderer.browserRendererId;
        var _this = this;
        if (attributeName === "onfileadded") {
            var listener = function (evt) {
                _this.raiseEvent(eventHandlerId, new Blazor.EventForDotNet('custom', { type: evt.type, Value: evt.value }));
            };
            toDomElement['_onfileaddedlistener'] = listener;
            return true;
        }
        else if (attributeName === "onfileremoved") {
            var listener = function (evt) {
                _this.raiseEvent(eventHandlerId, new Blazor.EventForDotNet('custom', { type: evt.type, Value: evt.value }));
            };
            toDomElement['_onfileremovedlistener'] = listener;
            return true;
        }
        return _super.prototype.applyEvent.call(this, attributeName, componentId, eventHandlerId);
    };
    DropZoneElement.prototype.dispose = function () {
        if (this.myDropzone !== null) {
            var toDomElement = this.getDOMElement();
            toDomElement['_onfileaddedlistener'] = null;
            toDomElement['_onfileremovedlistener'] = null;
            this.myDropzone.destroy();
            this.myDropzone = null;
        }
        _super.prototype.dispose.call(this);
    };
    return DropZoneElement;
}(Blazor.BlazorDOMComponent));
function RegisterDropZoneComponentId(id) {
    Blazor.registerCustomDOMElement(id, function (CID, parent, childIndex, br) {
        return new DropZoneElement(CID, parent, childIndex, br);
    });
    return true;
}
exports.RegisterDropZoneComponentId = RegisterDropZoneComponentId;
window["RegisterDropZoneComponentId"] = RegisterDropZoneComponentId;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = window['Blazor'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery, module) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *
 * More info at [www.dropzonejs.com](http://www.dropzonejs.com)
 *
 * Copyright (c) 2012, Matias Meno
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

// The Emitter class provides the ability to call `.on()` on Dropzone to listen
// to events.
// It is strongly based on component's emitter class, and I removed the
// functionality because of the dependency hell with different frameworks.
var Emitter = function () {
  function Emitter() {
    _classCallCheck(this, Emitter);
  }

  _createClass(Emitter, [{
    key: "on",

    // Add an event listener for given event
    value: function on(event, fn) {
      this._callbacks = this._callbacks || {};
      // Create namespace for this event
      if (!this._callbacks[event]) {
        this._callbacks[event] = [];
      }
      this._callbacks[event].push(fn);
      return this;
    }
  }, {
    key: "emit",
    value: function emit(event) {
      this._callbacks = this._callbacks || {};
      var callbacks = this._callbacks[event];

      if (callbacks) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        for (var _iterator = callbacks, _isArray = true, _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var callback = _ref;

          callback.apply(this, args);
        }
      }

      return this;
    }

    // Remove event listener for given event. If fn is not provided, all event
    // listeners for that event will be removed. If neither is provided, all
    // event listeners will be removed.

  }, {
    key: "off",
    value: function off(event, fn) {
      if (!this._callbacks || arguments.length === 0) {
        this._callbacks = {};
        return this;
      }

      // specific event
      var callbacks = this._callbacks[event];
      if (!callbacks) {
        return this;
      }

      // remove all handlers
      if (arguments.length === 1) {
        delete this._callbacks[event];
        return this;
      }

      // remove specific handler
      for (var i = 0; i < callbacks.length; i++) {
        var callback = callbacks[i];
        if (callback === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }

      return this;
    }
  }]);

  return Emitter;
}();

var Dropzone = function (_Emitter) {
  _inherits(Dropzone, _Emitter);

  _createClass(Dropzone, null, [{
    key: "initClass",
    value: function initClass() {

      // Exposing the emitter class, mainly for tests
      this.prototype.Emitter = Emitter;

      /*
       This is a list of all available events you can register on a dropzone object.
        You can register an event handler like this:
        dropzone.on("dragEnter", function() { });
        */
      this.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"];

      this.prototype.defaultOptions = {
        /**
         * Has to be specified on elements other than form (or when the form
         * doesn't have an `action` attribute). You can also
         * provide a function that will be called with `files` and
         * must return the url (since `v3.12.0`)
         */
        url: null,

        /**
         * Can be changed to `"put"` if necessary. You can also provide a function
         * that will be called with `files` and must return the method (since `v3.12.0`).
         */
        method: "post",

        /**
         * Will be set on the XHRequest.
         */
        withCredentials: false,

        /**
         * The timeout for the XHR requests in milliseconds (since `v4.4.0`).
         */
        timeout: 30000,

        /**
         * How many file uploads to process in parallel (See the
         * Enqueuing file uploads* documentation section for more info)
         */
        parallelUploads: 2,

        /**
         * Whether to send multiple files in one request. If
         * this it set to true, then the fallback file input element will
         * have the `multiple` attribute as well. This option will
         * also trigger additional events (like `processingmultiple`). See the events
         * documentation section for more information.
         */
        uploadMultiple: false,

        /**
         * Whether you want files to be uploaded in chunks to your server. This can't be
         * used in combination with `uploadMultiple`.
         *
         * See [chunksUploaded](#config-chunksUploaded) for the callback to finalise an upload.
         */
        chunking: false,

        /**
         * If `chunking` is enabled, this defines whether **every** file should be chunked,
         * even if the file size is below chunkSize. This means, that the additional chunk
         * form data will be submitted and the `chunksUploaded` callback will be invoked.
         */
        forceChunking: false,

        /**
         * If `chunking` is `true`, then this defines the chunk size in bytes.
         */
        chunkSize: 2000000,

        /**
         * If `true`, the individual chunks of a file are being uploaded simultaneously.
         */
        parallelChunkUploads: false,

        /**
         * Whether a chunk should be retried if it fails.
         */
        retryChunks: false,

        /**
         * If `retryChunks` is true, how many times should it be retried.
         */
        retryChunksLimit: 3,

        /**
         * If not `null` defines how many files this Dropzone handles. If it exceeds,
         * the event `maxfilesexceeded` will be called. The dropzone element gets the
         * class `dz-max-files-reached` accordingly so you can provide visual feedback.
         */
        maxFilesize: 256,

        /**
         * The name of the file param that gets transferred.
         * **NOTE**: If you have the option  `uploadMultiple` set to `true`, then
         * Dropzone will append `[]` to the name.
         */
        paramName: "file",

        /**
         * Whether thumbnails for images should be generated
         */
        createImageThumbnails: true,

        /**
         * In MB. When the filename exceeds this limit, the thumbnail will not be generated.
         */
        maxThumbnailFilesize: 10,

        /**
         * If `null`, the ratio of the image will be used to calculate it.
         */
        thumbnailWidth: 120,

        /**
         * The same as `thumbnailWidth`. If both are null, images will not be resized.
         */
        thumbnailHeight: 120,

        /**
         * How the images should be scaled down in case both, `thumbnailWidth` and `thumbnailHeight` are provided.
         * Can be either `contain` or `crop`.
         */
        thumbnailMethod: 'crop',

        /**
         * If set, images will be resized to these dimensions before being **uploaded**.
         * If only one, `resizeWidth` **or** `resizeHeight` is provided, the original aspect
         * ratio of the file will be preserved.
         *
         * The `options.transformFile` function uses these options, so if the `transformFile` function
         * is overridden, these options don't do anything.
         */
        resizeWidth: null,

        /**
         * See `resizeWidth`.
         */
        resizeHeight: null,

        /**
         * The mime type of the resized image (before it gets uploaded to the server).
         * If `null` the original mime type will be used. To force jpeg, for example, use `image/jpeg`.
         * See `resizeWidth` for more information.
         */
        resizeMimeType: null,

        /**
         * The quality of the resized images. See `resizeWidth`.
         */
        resizeQuality: 0.8,

        /**
         * How the images should be scaled down in case both, `resizeWidth` and `resizeHeight` are provided.
         * Can be either `contain` or `crop`.
         */
        resizeMethod: 'contain',

        /**
         * The base that is used to calculate the filesize. You can change this to
         * 1024 if you would rather display kibibytes, mebibytes, etc...
         * 1024 is technically incorrect, because `1024 bytes` are `1 kibibyte` not `1 kilobyte`.
         * You can change this to `1024` if you don't care about validity.
         */
        filesizeBase: 1000,

        /**
         * Can be used to limit the maximum number of files that will be handled by this Dropzone
         */
        maxFiles: null,

        /**
         * An optional object to send additional headers to the server. Eg:
         * `{ "My-Awesome-Header": "header value" }`
         */
        headers: null,

        /**
         * If `true`, the dropzone element itself will be clickable, if `false`
         * nothing will be clickable.
         *
         * You can also pass an HTML element, a CSS selector (for multiple elements)
         * or an array of those. In that case, all of those elements will trigger an
         * upload when clicked.
         */
        clickable: true,

        /**
         * Whether hidden files in directories should be ignored.
         */
        ignoreHiddenFiles: true,

        /**
         * The default implementation of `accept` checks the file's mime type or
         * extension against this list. This is a comma separated list of mime
         * types or file extensions.
         *
         * Eg.: `image/*,application/pdf,.psd`
         *
         * If the Dropzone is `clickable` this option will also be used as
         * [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)
         * parameter on the hidden file input as well.
         */
        acceptedFiles: null,

        /**
         * **Deprecated!**
         * Use acceptedFiles instead.
         */
        acceptedMimeTypes: null,

        /**
         * If false, files will be added to the queue but the queue will not be
         * processed automatically.
         * This can be useful if you need some additional user input before sending
         * files (or if you want want all files sent at once).
         * If you're ready to send the file simply call `myDropzone.processQueue()`.
         *
         * See the [enqueuing file uploads](#enqueuing-file-uploads) documentation
         * section for more information.
         */
        autoProcessQueue: true,

        /**
         * If false, files added to the dropzone will not be queued by default.
         * You'll have to call `enqueueFile(file)` manually.
         */
        autoQueue: true,

        /**
         * If `true`, this will add a link to every file preview to remove or cancel (if
         * already uploading) the file. The `dictCancelUpload`, `dictCancelUploadConfirmation`
         * and `dictRemoveFile` options are used for the wording.
         */
        addRemoveLinks: false,

        /**
         * Defines where to display the file previews – if `null` the
         * Dropzone element itself is used. Can be a plain `HTMLElement` or a CSS
         * selector. The element should have the `dropzone-previews` class so
         * the previews are displayed properly.
         */
        previewsContainer: null,

        /**
         * This is the element the hidden input field (which is used when clicking on the
         * dropzone to trigger file selection) will be appended to. This might
         * be important in case you use frameworks to switch the content of your page.
         */
        hiddenInputContainer: "body",

        /**
         * If null, no capture type will be specified
         * If camera, mobile devices will skip the file selection and choose camera
         * If microphone, mobile devices will skip the file selection and choose the microphone
         * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
         * On apple devices multiple must be set to false.  AcceptedFiles may need to
         * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
         */
        capture: null,

        /**
         * **Deprecated**. Use `renameFile` instead.
         */
        renameFilename: null,

        /**
         * A function that is invoked before the file is uploaded to the server and renames the file.
         * This function gets the `File` as argument and can use the `file.name`. The actual name of the
         * file that gets used during the upload can be accessed through `file.upload.filename`.
         */
        renameFile: null,

        /**
         * If `true` the fallback will be forced. This is very useful to test your server
         * implementations first and make sure that everything works as
         * expected without dropzone if you experience problems, and to test
         * how your fallbacks will look.
         */
        forceFallback: false,

        /**
         * The text used before any files are dropped.
         */
        dictDefaultMessage: "Drop files here to upload",

        /**
         * The text that replaces the default message text it the browser is not supported.
         */
        dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",

        /**
         * The text that will be added before the fallback form.
         * If you provide a  fallback element yourself, or if this option is `null` this will
         * be ignored.
         */
        dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",

        /**
         * If the filesize is too big.
         * `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values.
         */
        dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",

        /**
         * If the file doesn't match the file type.
         */
        dictInvalidFileType: "You can't upload files of this type.",

        /**
         * If the server response was invalid.
         * `{{statusCode}}` will be replaced with the servers status code.
         */
        dictResponseError: "Server responded with {{statusCode}} code.",

        /**
         * If `addRemoveLinks` is true, the text to be used for the cancel upload link.
         */
        dictCancelUpload: "Cancel upload",

        /**
         * The text that is displayed if an upload was manually canceled
         */
        dictUploadCanceled: "Upload canceled.",

        /**
         * If `addRemoveLinks` is true, the text to be used for confirmation when cancelling upload.
         */
        dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",

        /**
         * If `addRemoveLinks` is true, the text to be used to remove a file.
         */
        dictRemoveFile: "Remove file",

        /**
         * If this is not null, then the user will be prompted before removing a file.
         */
        dictRemoveFileConfirmation: null,

        /**
         * Displayed if `maxFiles` is st and exceeded.
         * The string `{{maxFiles}}` will be replaced by the configuration value.
         */
        dictMaxFilesExceeded: "You can not upload any more files.",

        /**
         * Allows you to translate the different units. Starting with `tb` for terabytes and going down to
         * `b` for bytes.
         */
        dictFileSizeUnits: { tb: "TB", gb: "GB", mb: "MB", kb: "KB", b: "b" },
        /**
         * Called when dropzone initialized
         * You can add event listeners here
         */
        init: function init() {},


        /**
         * Can be an **object** of additional parameters to transfer to the server, **or** a `Function`
         * that gets invoked with the `files`, `xhr` and, if it's a chunked upload, `chunk` arguments. In case
         * of a function, this needs to return a map.
         *
         * The default implementation does nothing for normal uploads, but adds relevant information for
         * chunked uploads.
         *
         * This is the same as adding hidden input fields in the form element.
         */
        params: function params(files, xhr, chunk) {
          if (chunk) {
            return {
              dzuuid: chunk.file.upload.uuid,
              dzchunkindex: chunk.index,
              dztotalfilesize: chunk.file.size,
              dzchunksize: this.options.chunkSize,
              dztotalchunkcount: chunk.file.upload.totalChunkCount,
              dzchunkbyteoffset: chunk.index * this.options.chunkSize
            };
          }
        },


        /**
         * A function that gets a [file](https://developer.mozilla.org/en-US/docs/DOM/File)
         * and a `done` function as parameters.
         *
         * If the done function is invoked without arguments, the file is "accepted" and will
         * be processed. If you pass an error message, the file is rejected, and the error
         * message will be displayed.
         * This function will not be called if the file is too big or doesn't match the mime types.
         */
        accept: function accept(file, done) {
          return done();
        },


        /**
         * The callback that will be invoked when all chunks have been uploaded for a file.
         * It gets the file for which the chunks have been uploaded as the first parameter,
         * and the `done` function as second. `done()` needs to be invoked when everything
         * needed to finish the upload process is done.
         */
        chunksUploaded: function chunksUploaded(file, done) {
          done();
        },

        /**
         * Gets called when the browser is not supported.
         * The default implementation shows the fallback input field and adds
         * a text.
         */
        fallback: function fallback() {
          // This code should pass in IE7... :(
          var messageElement = void 0;
          this.element.className = this.element.className + " dz-browser-not-supported";

          for (var _iterator2 = this.element.getElementsByTagName("div"), _isArray2 = true, _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            var child = _ref2;

            if (/(^| )dz-message($| )/.test(child.className)) {
              messageElement = child;
              child.className = "dz-message"; // Removes the 'dz-default' class
              break;
            }
          }
          if (!messageElement) {
            messageElement = Dropzone.createElement("<div class=\"dz-message\"><span></span></div>");
            this.element.appendChild(messageElement);
          }

          var span = messageElement.getElementsByTagName("span")[0];
          if (span) {
            if (span.textContent != null) {
              span.textContent = this.options.dictFallbackMessage;
            } else if (span.innerText != null) {
              span.innerText = this.options.dictFallbackMessage;
            }
          }

          return this.element.appendChild(this.getFallbackForm());
        },


        /**
         * Gets called to calculate the thumbnail dimensions.
         *
         * It gets `file`, `width` and `height` (both may be `null`) as parameters and must return an object containing:
         *
         *  - `srcWidth` & `srcHeight` (required)
         *  - `trgWidth` & `trgHeight` (required)
         *  - `srcX` & `srcY` (optional, default `0`)
         *  - `trgX` & `trgY` (optional, default `0`)
         *
         * Those values are going to be used by `ctx.drawImage()`.
         */
        resize: function resize(file, width, height, resizeMethod) {
          var info = {
            srcX: 0,
            srcY: 0,
            srcWidth: file.width,
            srcHeight: file.height
          };

          var srcRatio = file.width / file.height;

          // Automatically calculate dimensions if not specified
          if (width == null && height == null) {
            width = info.srcWidth;
            height = info.srcHeight;
          } else if (width == null) {
            width = height * srcRatio;
          } else if (height == null) {
            height = width / srcRatio;
          }

          // Make sure images aren't upscaled
          width = Math.min(width, info.srcWidth);
          height = Math.min(height, info.srcHeight);

          var trgRatio = width / height;

          if (info.srcWidth > width || info.srcHeight > height) {
            // Image is bigger and needs rescaling
            if (resizeMethod === 'crop') {
              if (srcRatio > trgRatio) {
                info.srcHeight = file.height;
                info.srcWidth = info.srcHeight * trgRatio;
              } else {
                info.srcWidth = file.width;
                info.srcHeight = info.srcWidth / trgRatio;
              }
            } else if (resizeMethod === 'contain') {
              // Method 'contain'
              if (srcRatio > trgRatio) {
                height = width / srcRatio;
              } else {
                width = height * srcRatio;
              }
            } else {
              throw new Error("Unknown resizeMethod '" + resizeMethod + "'");
            }
          }

          info.srcX = (file.width - info.srcWidth) / 2;
          info.srcY = (file.height - info.srcHeight) / 2;

          info.trgWidth = width;
          info.trgHeight = height;

          return info;
        },


        /**
         * Can be used to transform the file (for example, resize an image if necessary).
         *
         * The default implementation uses `resizeWidth` and `resizeHeight` (if provided) and resizes
         * images according to those dimensions.
         *
         * Gets the `file` as the first parameter, and a `done()` function as the second, that needs
         * to be invoked with the file when the transformation is done.
         */
        transformFile: function transformFile(file, done) {
          if ((this.options.resizeWidth || this.options.resizeHeight) && file.type.match(/image.*/)) {
            return this.resizeImage(file, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, done);
          } else {
            return done(file);
          }
        },


        /**
         * A string that contains the template used for each dropped
         * file. Change it to fulfill your needs but make sure to properly
         * provide all elements.
         *
         * If you want to use an actual HTML element instead of providing a String
         * as a config option, you could create a div with the id `tpl`,
         * put the template inside it and provide the element like this:
         *
         *     document
         *       .querySelector('#tpl')
         *       .innerHTML
         *
         */
        previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Error</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>",

        // END OPTIONS
        // (Required by the dropzone documentation parser)


        /*
         Those functions register themselves to the events on init and handle all
         the user interface specific stuff. Overwriting them won't break the upload
         but can break the way it's displayed.
         You can overwrite them if you don't like the default behavior. If you just
         want to add an additional event handler, register it on the dropzone object
         and don't overwrite those options.
         */

        // Those are self explanatory and simply concern the DragnDrop.
        drop: function drop(e) {
          return this.element.classList.remove("dz-drag-hover");
        },
        dragstart: function dragstart(e) {},
        dragend: function dragend(e) {
          return this.element.classList.remove("dz-drag-hover");
        },
        dragenter: function dragenter(e) {
          return this.element.classList.add("dz-drag-hover");
        },
        dragover: function dragover(e) {
          return this.element.classList.add("dz-drag-hover");
        },
        dragleave: function dragleave(e) {
          return this.element.classList.remove("dz-drag-hover");
        },
        paste: function paste(e) {},


        // Called whenever there are no files left in the dropzone anymore, and the
        // dropzone should be displayed as if in the initial state.
        reset: function reset() {
          return this.element.classList.remove("dz-started");
        },


        // Called when a file is added to the queue
        // Receives `file`
        addedfile: function addedfile(file) {
          var _this2 = this;

          if (this.element === this.previewsContainer) {
            this.element.classList.add("dz-started");
          }

          if (this.previewsContainer) {
            file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());
            file.previewTemplate = file.previewElement; // Backwards compatibility

            this.previewsContainer.appendChild(file.previewElement);
            for (var _iterator3 = file.previewElement.querySelectorAll("[data-dz-name]"), _isArray3 = true, _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
              var _ref3;

              if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
              } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
              }

              var node = _ref3;

              node.textContent = file.name;
            }
            for (var _iterator4 = file.previewElement.querySelectorAll("[data-dz-size]"), _isArray4 = true, _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
              if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                node = _iterator4[_i4++];
              } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                node = _i4.value;
              }

              node.innerHTML = this.filesize(file.size);
            }

            if (this.options.addRemoveLinks) {
              file._removeLink = Dropzone.createElement("<a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove>" + this.options.dictRemoveFile + "</a>");
              file.previewElement.appendChild(file._removeLink);
            }

            var removeFileEvent = function removeFileEvent(e) {
              e.preventDefault();
              e.stopPropagation();
              if (file.status === Dropzone.UPLOADING) {
                return Dropzone.confirm(_this2.options.dictCancelUploadConfirmation, function () {
                  return _this2.removeFile(file);
                });
              } else {
                if (_this2.options.dictRemoveFileConfirmation) {
                  return Dropzone.confirm(_this2.options.dictRemoveFileConfirmation, function () {
                    return _this2.removeFile(file);
                  });
                } else {
                  return _this2.removeFile(file);
                }
              }
            };

            for (var _iterator5 = file.previewElement.querySelectorAll("[data-dz-remove]"), _isArray5 = true, _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
              var _ref4;

              if (_isArray5) {
                if (_i5 >= _iterator5.length) break;
                _ref4 = _iterator5[_i5++];
              } else {
                _i5 = _iterator5.next();
                if (_i5.done) break;
                _ref4 = _i5.value;
              }

              var removeLink = _ref4;

              removeLink.addEventListener("click", removeFileEvent);
            }
          }
        },


        // Called whenever a file is removed.
        removedfile: function removedfile(file) {
          if (file.previewElement != null && file.previewElement.parentNode != null) {
            file.previewElement.parentNode.removeChild(file.previewElement);
          }
          return this._updateMaxFilesReachedClass();
        },


        // Called when a thumbnail has been generated
        // Receives `file` and `dataUrl`
        thumbnail: function thumbnail(file, dataUrl) {
          if (file.previewElement) {
            file.previewElement.classList.remove("dz-file-preview");
            for (var _iterator6 = file.previewElement.querySelectorAll("[data-dz-thumbnail]"), _isArray6 = true, _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
              var _ref5;

              if (_isArray6) {
                if (_i6 >= _iterator6.length) break;
                _ref5 = _iterator6[_i6++];
              } else {
                _i6 = _iterator6.next();
                if (_i6.done) break;
                _ref5 = _i6.value;
              }

              var thumbnailElement = _ref5;

              thumbnailElement.alt = file.name;
              thumbnailElement.src = dataUrl;
            }

            return setTimeout(function () {
              return file.previewElement.classList.add("dz-image-preview");
            }, 1);
          }
        },


        // Called whenever an error occurs
        // Receives `file` and `message`
        error: function error(file, message) {
          if (file.previewElement) {
            file.previewElement.classList.add("dz-error");
            if (typeof message !== "String" && message.error) {
              message = message.error;
            }
            for (var _iterator7 = file.previewElement.querySelectorAll("[data-dz-errormessage]"), _isArray7 = true, _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
              var _ref6;

              if (_isArray7) {
                if (_i7 >= _iterator7.length) break;
                _ref6 = _iterator7[_i7++];
              } else {
                _i7 = _iterator7.next();
                if (_i7.done) break;
                _ref6 = _i7.value;
              }

              var node = _ref6;

              node.textContent = message;
            }
          }
        },
        errormultiple: function errormultiple() {},


        // Called when a file gets processed. Since there is a cue, not all added
        // files are processed immediately.
        // Receives `file`
        processing: function processing(file) {
          if (file.previewElement) {
            file.previewElement.classList.add("dz-processing");
            if (file._removeLink) {
              return file._removeLink.textContent = this.options.dictCancelUpload;
            }
          }
        },
        processingmultiple: function processingmultiple() {},


        // Called whenever the upload progress gets updated.
        // Receives `file`, `progress` (percentage 0-100) and `bytesSent`.
        // To get the total number of bytes of the file, use `file.size`
        uploadprogress: function uploadprogress(file, progress, bytesSent) {
          if (file.previewElement) {
            for (var _iterator8 = file.previewElement.querySelectorAll("[data-dz-uploadprogress]"), _isArray8 = true, _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
              var _ref7;

              if (_isArray8) {
                if (_i8 >= _iterator8.length) break;
                _ref7 = _iterator8[_i8++];
              } else {
                _i8 = _iterator8.next();
                if (_i8.done) break;
                _ref7 = _i8.value;
              }

              var node = _ref7;

              node.nodeName === 'PROGRESS' ? node.value = progress : node.style.width = progress + "%";
            }
          }
        },


        // Called whenever the total upload progress gets updated.
        // Called with totalUploadProgress (0-100), totalBytes and totalBytesSent
        totaluploadprogress: function totaluploadprogress() {},


        // Called just before the file is sent. Gets the `xhr` object as second
        // parameter, so you can modify it (for example to add a CSRF token) and a
        // `formData` object to add additional information.
        sending: function sending() {},
        sendingmultiple: function sendingmultiple() {},


        // When the complete upload is finished and successful
        // Receives `file`
        success: function success(file) {
          if (file.previewElement) {
            return file.previewElement.classList.add("dz-success");
          }
        },
        successmultiple: function successmultiple() {},


        // When the upload is canceled.
        canceled: function canceled(file) {
          return this.emit("error", file, this.options.dictUploadCanceled);
        },
        canceledmultiple: function canceledmultiple() {},


        // When the upload is finished, either with success or an error.
        // Receives `file`
        complete: function complete(file) {
          if (file._removeLink) {
            file._removeLink.textContent = this.options.dictRemoveFile;
          }
          if (file.previewElement) {
            return file.previewElement.classList.add("dz-complete");
          }
        },
        completemultiple: function completemultiple() {},
        maxfilesexceeded: function maxfilesexceeded() {},
        maxfilesreached: function maxfilesreached() {},
        queuecomplete: function queuecomplete() {},
        addedfiles: function addedfiles() {}
      };

      this.prototype._thumbnailQueue = [];
      this.prototype._processingThumbnail = false;
    }

    // global utility

  }, {
    key: "extend",
    value: function extend(target) {
      for (var _len2 = arguments.length, objects = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        objects[_key2 - 1] = arguments[_key2];
      }

      for (var _iterator9 = objects, _isArray9 = true, _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
        var _ref8;

        if (_isArray9) {
          if (_i9 >= _iterator9.length) break;
          _ref8 = _iterator9[_i9++];
        } else {
          _i9 = _iterator9.next();
          if (_i9.done) break;
          _ref8 = _i9.value;
        }

        var object = _ref8;

        for (var key in object) {
          var val = object[key];
          target[key] = val;
        }
      }
      return target;
    }
  }]);

  function Dropzone(el, options) {
    _classCallCheck(this, Dropzone);

    var _this = _possibleConstructorReturn(this, (Dropzone.__proto__ || Object.getPrototypeOf(Dropzone)).call(this));

    var fallback = void 0,
        left = void 0;
    _this.element = el;
    // For backwards compatibility since the version was in the prototype previously
    _this.version = Dropzone.version;

    _this.defaultOptions.previewTemplate = _this.defaultOptions.previewTemplate.replace(/\n*/g, "");

    _this.clickableElements = [];
    _this.listeners = [];
    _this.files = []; // All files

    if (typeof _this.element === "string") {
      _this.element = document.querySelector(_this.element);
    }

    // Not checking if instance of HTMLElement or Element since IE9 is extremely weird.
    if (!_this.element || _this.element.nodeType == null) {
      throw new Error("Invalid dropzone element.");
    }

    if (_this.element.dropzone) {
      throw new Error("Dropzone already attached.");
    }

    // Now add this dropzone to the instances.
    Dropzone.instances.push(_this);

    // Put the dropzone inside the element itself.
    _this.element.dropzone = _this;

    var elementOptions = (left = Dropzone.optionsForElement(_this.element)) != null ? left : {};

    _this.options = Dropzone.extend({}, _this.defaultOptions, elementOptions, options != null ? options : {});

    // If the browser failed, just call the fallback and leave
    if (_this.options.forceFallback || !Dropzone.isBrowserSupported()) {
      var _ret;

      return _ret = _this.options.fallback.call(_this), _possibleConstructorReturn(_this, _ret);
    }

    // @options.url = @element.getAttribute "action" unless @options.url?
    if (_this.options.url == null) {
      _this.options.url = _this.element.getAttribute("action");
    }

    if (!_this.options.url) {
      throw new Error("No URL provided.");
    }

    if (_this.options.acceptedFiles && _this.options.acceptedMimeTypes) {
      throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
    }

    if (_this.options.uploadMultiple && _this.options.chunking) {
      throw new Error('You cannot set both: uploadMultiple and chunking.');
    }

    // Backwards compatibility
    if (_this.options.acceptedMimeTypes) {
      _this.options.acceptedFiles = _this.options.acceptedMimeTypes;
      delete _this.options.acceptedMimeTypes;
    }

    // Backwards compatibility
    if (_this.options.renameFilename != null) {
      _this.options.renameFile = function (file) {
        return _this.options.renameFilename.call(_this, file.name, file);
      };
    }

    _this.options.method = _this.options.method.toUpperCase();

    if ((fallback = _this.getExistingFallback()) && fallback.parentNode) {
      // Remove the fallback
      fallback.parentNode.removeChild(fallback);
    }

    // Display previews in the previewsContainer element or the Dropzone element unless explicitly set to false
    if (_this.options.previewsContainer !== false) {
      if (_this.options.previewsContainer) {
        _this.previewsContainer = Dropzone.getElement(_this.options.previewsContainer, "previewsContainer");
      } else {
        _this.previewsContainer = _this.element;
      }
    }

    if (_this.options.clickable) {
      if (_this.options.clickable === true) {
        _this.clickableElements = [_this.element];
      } else {
        _this.clickableElements = Dropzone.getElements(_this.options.clickable, "clickable");
      }
    }

    _this.init();
    return _this;
  }

  // Returns all files that have been accepted


  _createClass(Dropzone, [{
    key: "getAcceptedFiles",
    value: function getAcceptedFiles() {
      return this.files.filter(function (file) {
        return file.accepted;
      }).map(function (file) {
        return file;
      });
    }

    // Returns all files that have been rejected
    // Not sure when that's going to be useful, but added for completeness.

  }, {
    key: "getRejectedFiles",
    value: function getRejectedFiles() {
      return this.files.filter(function (file) {
        return !file.accepted;
      }).map(function (file) {
        return file;
      });
    }
  }, {
    key: "getFilesWithStatus",
    value: function getFilesWithStatus(status) {
      return this.files.filter(function (file) {
        return file.status === status;
      }).map(function (file) {
        return file;
      });
    }

    // Returns all files that are in the queue

  }, {
    key: "getQueuedFiles",
    value: function getQueuedFiles() {
      return this.getFilesWithStatus(Dropzone.QUEUED);
    }
  }, {
    key: "getUploadingFiles",
    value: function getUploadingFiles() {
      return this.getFilesWithStatus(Dropzone.UPLOADING);
    }
  }, {
    key: "getAddedFiles",
    value: function getAddedFiles() {
      return this.getFilesWithStatus(Dropzone.ADDED);
    }

    // Files that are either queued or uploading

  }, {
    key: "getActiveFiles",
    value: function getActiveFiles() {
      return this.files.filter(function (file) {
        return file.status === Dropzone.UPLOADING || file.status === Dropzone.QUEUED;
      }).map(function (file) {
        return file;
      });
    }

    // The function that gets called when Dropzone is initialized. You
    // can (and should) setup event listeners inside this function.

  }, {
    key: "init",
    value: function init() {
      var _this3 = this;

      // In case it isn't set already
      if (this.element.tagName === "form") {
        this.element.setAttribute("enctype", "multipart/form-data");
      }

      if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) {
        this.element.appendChild(Dropzone.createElement("<div class=\"dz-default dz-message\"><span>" + this.options.dictDefaultMessage + "</span></div>"));
      }

      if (this.clickableElements.length) {
        var setupHiddenFileInput = function setupHiddenFileInput() {
          if (_this3.hiddenFileInput) {
            _this3.hiddenFileInput.parentNode.removeChild(_this3.hiddenFileInput);
          }
          _this3.hiddenFileInput = document.createElement("input");
          _this3.hiddenFileInput.setAttribute("type", "file");
          if (_this3.options.maxFiles === null || _this3.options.maxFiles > 1) {
            _this3.hiddenFileInput.setAttribute("multiple", "multiple");
          }
          _this3.hiddenFileInput.className = "dz-hidden-input";

          if (_this3.options.acceptedFiles !== null) {
            _this3.hiddenFileInput.setAttribute("accept", _this3.options.acceptedFiles);
          }
          if (_this3.options.capture !== null) {
            _this3.hiddenFileInput.setAttribute("capture", _this3.options.capture);
          }

          // Not setting `display="none"` because some browsers don't accept clicks
          // on elements that aren't displayed.
          _this3.hiddenFileInput.style.visibility = "hidden";
          _this3.hiddenFileInput.style.position = "absolute";
          _this3.hiddenFileInput.style.top = "0";
          _this3.hiddenFileInput.style.left = "0";
          _this3.hiddenFileInput.style.height = "0";
          _this3.hiddenFileInput.style.width = "0";
          document.querySelector(_this3.options.hiddenInputContainer).appendChild(_this3.hiddenFileInput);
          return _this3.hiddenFileInput.addEventListener("change", function () {
            var files = _this3.hiddenFileInput.files;

            if (files.length) {
              for (var _iterator10 = files, _isArray10 = true, _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
                var _ref9;

                if (_isArray10) {
                  if (_i10 >= _iterator10.length) break;
                  _ref9 = _iterator10[_i10++];
                } else {
                  _i10 = _iterator10.next();
                  if (_i10.done) break;
                  _ref9 = _i10.value;
                }

                var file = _ref9;

                _this3.addFile(file);
              }
            }
            _this3.emit("addedfiles", files);
            return setupHiddenFileInput();
          });
        };
        setupHiddenFileInput();
      }

      this.URL = window.URL !== null ? window.URL : window.webkitURL;

      // Setup all event listeners on the Dropzone object itself.
      // They're not in @setupEventListeners() because they shouldn't be removed
      // again when the dropzone gets disabled.
      for (var _iterator11 = this.events, _isArray11 = true, _i11 = 0, _iterator11 = _isArray11 ? _iterator11 : _iterator11[Symbol.iterator]();;) {
        var _ref10;

        if (_isArray11) {
          if (_i11 >= _iterator11.length) break;
          _ref10 = _iterator11[_i11++];
        } else {
          _i11 = _iterator11.next();
          if (_i11.done) break;
          _ref10 = _i11.value;
        }

        var eventName = _ref10;

        this.on(eventName, this.options[eventName]);
      }

      this.on("uploadprogress", function () {
        return _this3.updateTotalUploadProgress();
      });

      this.on("removedfile", function () {
        return _this3.updateTotalUploadProgress();
      });

      this.on("canceled", function (file) {
        return _this3.emit("complete", file);
      });

      // Emit a `queuecomplete` event if all files finished uploading.
      this.on("complete", function (file) {
        if (_this3.getAddedFiles().length === 0 && _this3.getUploadingFiles().length === 0 && _this3.getQueuedFiles().length === 0) {
          // This needs to be deferred so that `queuecomplete` really triggers after `complete`
          return setTimeout(function () {
            return _this3.emit("queuecomplete");
          }, 0);
        }
      });

      var noPropagation = function noPropagation(e) {
        e.stopPropagation();
        if (e.preventDefault) {
          return e.preventDefault();
        } else {
          return e.returnValue = false;
        }
      };

      // Create the listeners
      this.listeners = [{
        element: this.element,
        events: {
          "dragstart": function dragstart(e) {
            return _this3.emit("dragstart", e);
          },
          "dragenter": function dragenter(e) {
            noPropagation(e);
            return _this3.emit("dragenter", e);
          },
          "dragover": function dragover(e) {
            // Makes it possible to drag files from chrome's download bar
            // http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar
            // Try is required to prevent bug in Internet Explorer 11 (SCRIPT65535 exception)
            var efct = void 0;
            try {
              efct = e.dataTransfer.effectAllowed;
            } catch (error) {}
            e.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy';

            noPropagation(e);
            return _this3.emit("dragover", e);
          },
          "dragleave": function dragleave(e) {
            return _this3.emit("dragleave", e);
          },
          "drop": function drop(e) {
            noPropagation(e);
            return _this3.drop(e);
          },
          "dragend": function dragend(e) {
            return _this3.emit("dragend", e);
          }

          // This is disabled right now, because the browsers don't implement it properly.
          // "paste": (e) =>
          //   noPropagation e
          //   @paste e
        } }];

      this.clickableElements.forEach(function (clickableElement) {
        return _this3.listeners.push({
          element: clickableElement,
          events: {
            "click": function click(evt) {
              // Only the actual dropzone or the message element should trigger file selection
              if (clickableElement !== _this3.element || evt.target === _this3.element || Dropzone.elementInside(evt.target, _this3.element.querySelector(".dz-message"))) {
                _this3.hiddenFileInput.click(); // Forward the click
              }
              return true;
            }
          }
        });
      });

      this.enable();

      return this.options.init.call(this);
    }

    // Not fully tested yet

  }, {
    key: "destroy",
    value: function destroy() {
      this.disable();
      this.removeAllFiles(true);
      if (this.hiddenFileInput != null ? this.hiddenFileInput.parentNode : undefined) {
        this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
        this.hiddenFileInput = null;
      }
      delete this.element.dropzone;
      return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);
    }
  }, {
    key: "updateTotalUploadProgress",
    value: function updateTotalUploadProgress() {
      var totalUploadProgress = void 0;
      var totalBytesSent = 0;
      var totalBytes = 0;

      var activeFiles = this.getActiveFiles();

      if (activeFiles.length) {
        for (var _iterator12 = this.getActiveFiles(), _isArray12 = true, _i12 = 0, _iterator12 = _isArray12 ? _iterator12 : _iterator12[Symbol.iterator]();;) {
          var _ref11;

          if (_isArray12) {
            if (_i12 >= _iterator12.length) break;
            _ref11 = _iterator12[_i12++];
          } else {
            _i12 = _iterator12.next();
            if (_i12.done) break;
            _ref11 = _i12.value;
          }

          var file = _ref11;

          totalBytesSent += file.upload.bytesSent;
          totalBytes += file.upload.total;
        }
        totalUploadProgress = 100 * totalBytesSent / totalBytes;
      } else {
        totalUploadProgress = 100;
      }

      return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
    }

    // @options.paramName can be a function taking one parameter rather than a string.
    // A parameter name for a file is obtained simply by calling this with an index number.

  }, {
    key: "_getParamName",
    value: function _getParamName(n) {
      if (typeof this.options.paramName === "function") {
        return this.options.paramName(n);
      } else {
        return "" + this.options.paramName + (this.options.uploadMultiple ? "[" + n + "]" : "");
      }
    }

    // If @options.renameFile is a function,
    // the function will be used to rename the file.name before appending it to the formData

  }, {
    key: "_renameFile",
    value: function _renameFile(file) {
      if (typeof this.options.renameFile !== "function") {
        return file.name;
      }
      return this.options.renameFile(file);
    }

    // Returns a form that can be used as fallback if the browser does not support DragnDrop
    //
    // If the dropzone is already a form, only the input field and button are returned. Otherwise a complete form element is provided.
    // This code has to pass in IE7 :(

  }, {
    key: "getFallbackForm",
    value: function getFallbackForm() {
      var existingFallback = void 0,
          form = void 0;
      if (existingFallback = this.getExistingFallback()) {
        return existingFallback;
      }

      var fieldsString = "<div class=\"dz-fallback\">";
      if (this.options.dictFallbackText) {
        fieldsString += "<p>" + this.options.dictFallbackText + "</p>";
      }
      fieldsString += "<input type=\"file\" name=\"" + this._getParamName(0) + "\" " + (this.options.uploadMultiple ? 'multiple="multiple"' : undefined) + " /><input type=\"submit\" value=\"Upload!\"></div>";

      var fields = Dropzone.createElement(fieldsString);
      if (this.element.tagName !== "FORM") {
        form = Dropzone.createElement("<form action=\"" + this.options.url + "\" enctype=\"multipart/form-data\" method=\"" + this.options.method + "\"></form>");
        form.appendChild(fields);
      } else {
        // Make sure that the enctype and method attributes are set properly
        this.element.setAttribute("enctype", "multipart/form-data");
        this.element.setAttribute("method", this.options.method);
      }
      return form != null ? form : fields;
    }

    // Returns the fallback elements if they exist already
    //
    // This code has to pass in IE7 :(

  }, {
    key: "getExistingFallback",
    value: function getExistingFallback() {
      var getFallback = function getFallback(elements) {
        for (var _iterator13 = elements, _isArray13 = true, _i13 = 0, _iterator13 = _isArray13 ? _iterator13 : _iterator13[Symbol.iterator]();;) {
          var _ref12;

          if (_isArray13) {
            if (_i13 >= _iterator13.length) break;
            _ref12 = _iterator13[_i13++];
          } else {
            _i13 = _iterator13.next();
            if (_i13.done) break;
            _ref12 = _i13.value;
          }

          var el = _ref12;

          if (/(^| )fallback($| )/.test(el.className)) {
            return el;
          }
        }
      };

      var _arr = ["div", "form"];
      for (var _i14 = 0; _i14 < _arr.length; _i14++) {
        var tagName = _arr[_i14];
        var fallback;
        if (fallback = getFallback(this.element.getElementsByTagName(tagName))) {
          return fallback;
        }
      }
    }

    // Activates all listeners stored in @listeners

  }, {
    key: "setupEventListeners",
    value: function setupEventListeners() {
      return this.listeners.map(function (elementListeners) {
        return function () {
          var result = [];
          for (var event in elementListeners.events) {
            var listener = elementListeners.events[event];
            result.push(elementListeners.element.addEventListener(event, listener, false));
          }
          return result;
        }();
      });
    }

    // Deactivates all listeners stored in @listeners

  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      return this.listeners.map(function (elementListeners) {
        return function () {
          var result = [];
          for (var event in elementListeners.events) {
            var listener = elementListeners.events[event];
            result.push(elementListeners.element.removeEventListener(event, listener, false));
          }
          return result;
        }();
      });
    }

    // Removes all event listeners and cancels all files in the queue or being processed.

  }, {
    key: "disable",
    value: function disable() {
      var _this4 = this;

      this.clickableElements.forEach(function (element) {
        return element.classList.remove("dz-clickable");
      });
      this.removeEventListeners();
      this.disabled = true;

      return this.files.map(function (file) {
        return _this4.cancelUpload(file);
      });
    }
  }, {
    key: "enable",
    value: function enable() {
      delete this.disabled;
      this.clickableElements.forEach(function (element) {
        return element.classList.add("dz-clickable");
      });
      return this.setupEventListeners();
    }

    // Returns a nicely formatted filesize

  }, {
    key: "filesize",
    value: function filesize(size) {
      var selectedSize = 0;
      var selectedUnit = "b";

      if (size > 0) {
        var units = ['tb', 'gb', 'mb', 'kb', 'b'];

        for (var i = 0; i < units.length; i++) {
          var unit = units[i];
          var cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;

          if (size >= cutoff) {
            selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
            selectedUnit = unit;
            break;
          }
        }

        selectedSize = Math.round(10 * selectedSize) / 10; // Cutting of digits
      }

      return "<strong>" + selectedSize + "</strong> " + this.options.dictFileSizeUnits[selectedUnit];
    }

    // Adds or removes the `dz-max-files-reached` class from the form.

  }, {
    key: "_updateMaxFilesReachedClass",
    value: function _updateMaxFilesReachedClass() {
      if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
        if (this.getAcceptedFiles().length === this.options.maxFiles) {
          this.emit('maxfilesreached', this.files);
        }
        return this.element.classList.add("dz-max-files-reached");
      } else {
        return this.element.classList.remove("dz-max-files-reached");
      }
    }
  }, {
    key: "drop",
    value: function drop(e) {
      if (!e.dataTransfer) {
        return;
      }
      this.emit("drop", e);

      // Convert the FileList to an Array
      // This is necessary for IE11
      var files = [];
      for (var i = 0; i < e.dataTransfer.files.length; i++) {
        files[i] = e.dataTransfer.files[i];
      }

      this.emit("addedfiles", files);

      // Even if it's a folder, files.length will contain the folders.
      if (files.length) {
        var items = e.dataTransfer.items;

        if (items && items.length && items[0].webkitGetAsEntry != null) {
          // The browser supports dropping of folders, so handle items instead of files
          this._addFilesFromItems(items);
        } else {
          this.handleFiles(files);
        }
      }
    }
  }, {
    key: "paste",
    value: function paste(e) {
      if (__guard__(e != null ? e.clipboardData : undefined, function (x) {
        return x.items;
      }) == null) {
        return;
      }

      this.emit("paste", e);
      var items = e.clipboardData.items;


      if (items.length) {
        return this._addFilesFromItems(items);
      }
    }
  }, {
    key: "handleFiles",
    value: function handleFiles(files) {
      for (var _iterator14 = files, _isArray14 = true, _i15 = 0, _iterator14 = _isArray14 ? _iterator14 : _iterator14[Symbol.iterator]();;) {
        var _ref13;

        if (_isArray14) {
          if (_i15 >= _iterator14.length) break;
          _ref13 = _iterator14[_i15++];
        } else {
          _i15 = _iterator14.next();
          if (_i15.done) break;
          _ref13 = _i15.value;
        }

        var file = _ref13;

        this.addFile(file);
      }
    }

    // When a folder is dropped (or files are pasted), items must be handled
    // instead of files.

  }, {
    key: "_addFilesFromItems",
    value: function _addFilesFromItems(items) {
      var _this5 = this;

      return function () {
        var result = [];
        for (var _iterator15 = items, _isArray15 = true, _i16 = 0, _iterator15 = _isArray15 ? _iterator15 : _iterator15[Symbol.iterator]();;) {
          var _ref14;

          if (_isArray15) {
            if (_i16 >= _iterator15.length) break;
            _ref14 = _iterator15[_i16++];
          } else {
            _i16 = _iterator15.next();
            if (_i16.done) break;
            _ref14 = _i16.value;
          }

          var item = _ref14;

          var entry;
          if (item.webkitGetAsEntry != null && (entry = item.webkitGetAsEntry())) {
            if (entry.isFile) {
              result.push(_this5.addFile(item.getAsFile()));
            } else if (entry.isDirectory) {
              // Append all files from that directory to files
              result.push(_this5._addFilesFromDirectory(entry, entry.name));
            } else {
              result.push(undefined);
            }
          } else if (item.getAsFile != null) {
            if (item.kind == null || item.kind === "file") {
              result.push(_this5.addFile(item.getAsFile()));
            } else {
              result.push(undefined);
            }
          } else {
            result.push(undefined);
          }
        }
        return result;
      }();
    }

    // Goes through the directory, and adds each file it finds recursively

  }, {
    key: "_addFilesFromDirectory",
    value: function _addFilesFromDirectory(directory, path) {
      var _this6 = this;

      var dirReader = directory.createReader();

      var errorHandler = function errorHandler(error) {
        return __guardMethod__(console, 'log', function (o) {
          return o.log(error);
        });
      };

      var readEntries = function readEntries() {
        return dirReader.readEntries(function (entries) {
          if (entries.length > 0) {
            for (var _iterator16 = entries, _isArray16 = true, _i17 = 0, _iterator16 = _isArray16 ? _iterator16 : _iterator16[Symbol.iterator]();;) {
              var _ref15;

              if (_isArray16) {
                if (_i17 >= _iterator16.length) break;
                _ref15 = _iterator16[_i17++];
              } else {
                _i17 = _iterator16.next();
                if (_i17.done) break;
                _ref15 = _i17.value;
              }

              var entry = _ref15;

              if (entry.isFile) {
                entry.file(function (file) {
                  if (_this6.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {
                    return;
                  }
                  file.fullPath = path + "/" + file.name;
                  return _this6.addFile(file);
                });
              } else if (entry.isDirectory) {
                _this6._addFilesFromDirectory(entry, path + "/" + entry.name);
              }
            }

            // Recursively call readEntries() again, since browser only handle
            // the first 100 entries.
            // See: https://developer.mozilla.org/en-US/docs/Web/API/DirectoryReader#readEntries
            readEntries();
          }
          return null;
        }, errorHandler);
      };

      return readEntries();
    }

    // If `done()` is called without argument the file is accepted
    // If you call it with an error message, the file is rejected
    // (This allows for asynchronous validation)
    //
    // This function checks the filesize, and if the file.type passes the
    // `acceptedFiles` check.

  }, {
    key: "accept",
    value: function accept(file, done) {
      if (file.size > this.options.maxFilesize * 1024 * 1024) {
        return done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
      } else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {
        return done(this.options.dictInvalidFileType);
      } else if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
        done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
        return this.emit("maxfilesexceeded", file);
      } else {
        return this.options.accept.call(this, file, done);
      }
    }
  }, {
    key: "addFile",
    value: function addFile(file) {
      var _this7 = this;

      file.upload = {
        uuid: Dropzone.uuidv4(),
        progress: 0,
        // Setting the total upload size to file.size for the beginning
        // It's actual different than the size to be transmitted.
        total: file.size,
        bytesSent: 0,
        filename: this._renameFile(file),
        chunked: this.options.chunking && (this.options.forceChunking || file.size > this.options.chunkSize),
        totalChunkCount: Math.ceil(file.size / this.options.chunkSize)
      };
      this.files.push(file);

      file.status = Dropzone.ADDED;

      this.emit("addedfile", file);

      this._enqueueThumbnail(file);

      return this.accept(file, function (error) {
        if (error) {
          file.accepted = false;
          _this7._errorProcessing([file], error); // Will set the file.status
        } else {
          file.accepted = true;
          if (_this7.options.autoQueue) {
            _this7.enqueueFile(file);
          } // Will set .accepted = true
        }
        return _this7._updateMaxFilesReachedClass();
      });
    }

    // Wrapper for enqueueFile

  }, {
    key: "enqueueFiles",
    value: function enqueueFiles(files) {
      for (var _iterator17 = files, _isArray17 = true, _i18 = 0, _iterator17 = _isArray17 ? _iterator17 : _iterator17[Symbol.iterator]();;) {
        var _ref16;

        if (_isArray17) {
          if (_i18 >= _iterator17.length) break;
          _ref16 = _iterator17[_i18++];
        } else {
          _i18 = _iterator17.next();
          if (_i18.done) break;
          _ref16 = _i18.value;
        }

        var file = _ref16;

        this.enqueueFile(file);
      }
      return null;
    }
  }, {
    key: "enqueueFile",
    value: function enqueueFile(file) {
      var _this8 = this;

      if (file.status === Dropzone.ADDED && file.accepted === true) {
        file.status = Dropzone.QUEUED;
        if (this.options.autoProcessQueue) {
          return setTimeout(function () {
            return _this8.processQueue();
          }, 0); // Deferring the call
        }
      } else {
        throw new Error("This file can't be queued because it has already been processed or was rejected.");
      }
    }
  }, {
    key: "_enqueueThumbnail",
    value: function _enqueueThumbnail(file) {
      var _this9 = this;

      if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1024 * 1024) {
        this._thumbnailQueue.push(file);
        return setTimeout(function () {
          return _this9._processThumbnailQueue();
        }, 0); // Deferring the call
      }
    }
  }, {
    key: "_processThumbnailQueue",
    value: function _processThumbnailQueue() {
      var _this10 = this;

      if (this._processingThumbnail || this._thumbnailQueue.length === 0) {
        return;
      }

      this._processingThumbnail = true;
      var file = this._thumbnailQueue.shift();
      return this.createThumbnail(file, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, true, function (dataUrl) {
        _this10.emit("thumbnail", file, dataUrl);
        _this10._processingThumbnail = false;
        return _this10._processThumbnailQueue();
      });
    }

    // Can be called by the user to remove a file

  }, {
    key: "removeFile",
    value: function removeFile(file) {
      if (file.status === Dropzone.UPLOADING) {
        this.cancelUpload(file);
      }
      this.files = without(this.files, file);

      this.emit("removedfile", file);
      if (this.files.length === 0) {
        return this.emit("reset");
      }
    }

    // Removes all files that aren't currently processed from the list

  }, {
    key: "removeAllFiles",
    value: function removeAllFiles(cancelIfNecessary) {
      // Create a copy of files since removeFile() changes the @files array.
      if (cancelIfNecessary == null) {
        cancelIfNecessary = false;
      }
      for (var _iterator18 = this.files.slice(), _isArray18 = true, _i19 = 0, _iterator18 = _isArray18 ? _iterator18 : _iterator18[Symbol.iterator]();;) {
        var _ref17;

        if (_isArray18) {
          if (_i19 >= _iterator18.length) break;
          _ref17 = _iterator18[_i19++];
        } else {
          _i19 = _iterator18.next();
          if (_i19.done) break;
          _ref17 = _i19.value;
        }

        var file = _ref17;

        if (file.status !== Dropzone.UPLOADING || cancelIfNecessary) {
          this.removeFile(file);
        }
      }
      return null;
    }

    // Resizes an image before it gets sent to the server. This function is the default behavior of
    // `options.transformFile` if `resizeWidth` or `resizeHeight` are set. The callback is invoked with
    // the resized blob.

  }, {
    key: "resizeImage",
    value: function resizeImage(file, width, height, resizeMethod, callback) {
      var _this11 = this;

      return this.createThumbnail(file, width, height, resizeMethod, false, function (dataUrl, canvas) {
        if (canvas == null) {
          // The image has not been resized
          return callback(file);
        } else {
          var resizeMimeType = _this11.options.resizeMimeType;

          if (resizeMimeType == null) {
            resizeMimeType = file.type;
          }
          var resizedDataURL = canvas.toDataURL(resizeMimeType, _this11.options.resizeQuality);
          if (resizeMimeType === 'image/jpeg' || resizeMimeType === 'image/jpg') {
            // Now add the original EXIF information
            resizedDataURL = ExifRestore.restore(file.dataURL, resizedDataURL);
          }
          return callback(Dropzone.dataURItoBlob(resizedDataURL));
        }
      });
    }
  }, {
    key: "createThumbnail",
    value: function createThumbnail(file, width, height, resizeMethod, fixOrientation, callback) {
      var _this12 = this;

      var fileReader = new FileReader();

      fileReader.onload = function () {

        file.dataURL = fileReader.result;

        // Don't bother creating a thumbnail for SVG images since they're vector
        if (file.type === "image/svg+xml") {
          if (callback != null) {
            callback(fileReader.result);
          }
          return;
        }

        return _this12.createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback);
      };

      return fileReader.readAsDataURL(file);
    }
  }, {
    key: "createThumbnailFromUrl",
    value: function createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback, crossOrigin) {
      var _this13 = this;

      // Not using `new Image` here because of a bug in latest Chrome versions.
      // See https://github.com/enyo/dropzone/pull/226
      var img = document.createElement("img");

      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }

      img.onload = function () {
        var loadExif = function loadExif(callback) {
          return callback(1);
        };
        if (typeof EXIF !== 'undefined' && EXIF !== null && fixOrientation) {
          loadExif = function loadExif(callback) {
            return EXIF.getData(img, function () {
              return callback(EXIF.getTag(this, 'Orientation'));
            });
          };
        }

        return loadExif(function (orientation) {
          file.width = img.width;
          file.height = img.height;

          var resizeInfo = _this13.options.resize.call(_this13, file, width, height, resizeMethod);

          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");

          canvas.width = resizeInfo.trgWidth;
          canvas.height = resizeInfo.trgHeight;

          if (orientation > 4) {
            canvas.width = resizeInfo.trgHeight;
            canvas.height = resizeInfo.trgWidth;
          }

          switch (orientation) {
            case 2:
              // horizontal flip
              ctx.translate(canvas.width, 0);
              ctx.scale(-1, 1);
              break;
            case 3:
              // 180° rotate left
              ctx.translate(canvas.width, canvas.height);
              ctx.rotate(Math.PI);
              break;
            case 4:
              // vertical flip
              ctx.translate(0, canvas.height);
              ctx.scale(1, -1);
              break;
            case 5:
              // vertical flip + 90 rotate right
              ctx.rotate(0.5 * Math.PI);
              ctx.scale(1, -1);
              break;
            case 6:
              // 90° rotate right
              ctx.rotate(0.5 * Math.PI);
              ctx.translate(0, -canvas.height);
              break;
            case 7:
              // horizontal flip + 90 rotate right
              ctx.rotate(0.5 * Math.PI);
              ctx.translate(canvas.width, -canvas.height);
              ctx.scale(-1, 1);
              break;
            case 8:
              // 90° rotate left
              ctx.rotate(-0.5 * Math.PI);
              ctx.translate(-canvas.width, 0);
              break;
          }

          // This is a bugfix for iOS' scaling bug.
          drawImageIOSFix(ctx, img, resizeInfo.srcX != null ? resizeInfo.srcX : 0, resizeInfo.srcY != null ? resizeInfo.srcY : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, resizeInfo.trgX != null ? resizeInfo.trgX : 0, resizeInfo.trgY != null ? resizeInfo.trgY : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);

          var thumbnail = canvas.toDataURL("image/png");

          if (callback != null) {
            return callback(thumbnail, canvas);
          }
        });
      };

      if (callback != null) {
        img.onerror = callback;
      }

      return img.src = file.dataURL;
    }

    // Goes through the queue and processes files if there aren't too many already.

  }, {
    key: "processQueue",
    value: function processQueue() {
      var parallelUploads = this.options.parallelUploads;

      var processingLength = this.getUploadingFiles().length;
      var i = processingLength;

      // There are already at least as many files uploading than should be
      if (processingLength >= parallelUploads) {
        return;
      }

      var queuedFiles = this.getQueuedFiles();

      if (!(queuedFiles.length > 0)) {
        return;
      }

      if (this.options.uploadMultiple) {
        // The files should be uploaded in one request
        return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
      } else {
        while (i < parallelUploads) {
          if (!queuedFiles.length) {
            return;
          } // Nothing left to process
          this.processFile(queuedFiles.shift());
          i++;
        }
      }
    }

    // Wrapper for `processFiles`

  }, {
    key: "processFile",
    value: function processFile(file) {
      return this.processFiles([file]);
    }

    // Loads the file, then calls finishedLoading()

  }, {
    key: "processFiles",
    value: function processFiles(files) {
      for (var _iterator19 = files, _isArray19 = true, _i20 = 0, _iterator19 = _isArray19 ? _iterator19 : _iterator19[Symbol.iterator]();;) {
        var _ref18;

        if (_isArray19) {
          if (_i20 >= _iterator19.length) break;
          _ref18 = _iterator19[_i20++];
        } else {
          _i20 = _iterator19.next();
          if (_i20.done) break;
          _ref18 = _i20.value;
        }

        var file = _ref18;

        file.processing = true; // Backwards compatibility
        file.status = Dropzone.UPLOADING;

        this.emit("processing", file);
      }

      if (this.options.uploadMultiple) {
        this.emit("processingmultiple", files);
      }

      return this.uploadFiles(files);
    }
  }, {
    key: "_getFilesWithXhr",
    value: function _getFilesWithXhr(xhr) {
      var files = void 0;
      return files = this.files.filter(function (file) {
        return file.xhr === xhr;
      }).map(function (file) {
        return file;
      });
    }

    // Cancels the file upload and sets the status to CANCELED
    // **if** the file is actually being uploaded.
    // If it's still in the queue, the file is being removed from it and the status
    // set to CANCELED.

  }, {
    key: "cancelUpload",
    value: function cancelUpload(file) {
      if (file.status === Dropzone.UPLOADING) {
        var groupedFiles = this._getFilesWithXhr(file.xhr);
        for (var _iterator20 = groupedFiles, _isArray20 = true, _i21 = 0, _iterator20 = _isArray20 ? _iterator20 : _iterator20[Symbol.iterator]();;) {
          var _ref19;

          if (_isArray20) {
            if (_i21 >= _iterator20.length) break;
            _ref19 = _iterator20[_i21++];
          } else {
            _i21 = _iterator20.next();
            if (_i21.done) break;
            _ref19 = _i21.value;
          }

          var groupedFile = _ref19;

          groupedFile.status = Dropzone.CANCELED;
        }
        if (typeof file.xhr !== 'undefined') {
          file.xhr.abort();
        }
        for (var _iterator21 = groupedFiles, _isArray21 = true, _i22 = 0, _iterator21 = _isArray21 ? _iterator21 : _iterator21[Symbol.iterator]();;) {
          var _ref20;

          if (_isArray21) {
            if (_i22 >= _iterator21.length) break;
            _ref20 = _iterator21[_i22++];
          } else {
            _i22 = _iterator21.next();
            if (_i22.done) break;
            _ref20 = _i22.value;
          }

          var _groupedFile = _ref20;

          this.emit("canceled", _groupedFile);
        }
        if (this.options.uploadMultiple) {
          this.emit("canceledmultiple", groupedFiles);
        }
      } else if (file.status === Dropzone.ADDED || file.status === Dropzone.QUEUED) {
        file.status = Dropzone.CANCELED;
        this.emit("canceled", file);
        if (this.options.uploadMultiple) {
          this.emit("canceledmultiple", [file]);
        }
      }

      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    }
  }, {
    key: "resolveOption",
    value: function resolveOption(option) {
      if (typeof option === 'function') {
        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        return option.apply(this, args);
      }
      return option;
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(file) {
      return this.uploadFiles([file]);
    }
  }, {
    key: "uploadFiles",
    value: function uploadFiles(files) {
      var _this14 = this;

      this._transformFiles(files, function (transformedFiles) {
        if (files[0].upload.chunked) {
          // This file should be sent in chunks!

          // If the chunking option is set, we **know** that there can only be **one** file, since
          // uploadMultiple is not allowed with this option.
          var file = files[0];
          var transformedFile = transformedFiles[0];
          var startedChunkCount = 0;

          file.upload.chunks = [];

          var handleNextChunk = function handleNextChunk() {
            var chunkIndex = 0;

            // Find the next item in file.upload.chunks that is not defined yet.
            while (file.upload.chunks[chunkIndex] !== undefined) {
              chunkIndex++;
            }

            // This means, that all chunks have already been started.
            if (chunkIndex >= file.upload.totalChunkCount) return;

            startedChunkCount++;

            var start = chunkIndex * _this14.options.chunkSize;
            var end = Math.min(start + _this14.options.chunkSize, file.size);

            var dataBlock = {
              name: _this14._getParamName(0),
              data: transformedFile.webkitSlice ? transformedFile.webkitSlice(start, end) : transformedFile.slice(start, end),
              filename: file.upload.filename,
              chunkIndex: chunkIndex
            };

            file.upload.chunks[chunkIndex] = {
              file: file,
              index: chunkIndex,
              dataBlock: dataBlock, // In case we want to retry.
              status: Dropzone.UPLOADING,
              progress: 0,
              retries: 0 // The number of times this block has been retried.
            };

            _this14._uploadData(files, [dataBlock]);
          };

          file.upload.finishedChunkUpload = function (chunk) {
            var allFinished = true;
            chunk.status = Dropzone.SUCCESS;

            // Clear the data from the chunk
            chunk.dataBlock = null;

            for (var i = 0; i < file.upload.totalChunkCount; i++) {
              if (file.upload.chunks[i] === undefined) {
                return handleNextChunk();
              }
              if (file.upload.chunks[i].status !== Dropzone.SUCCESS) {
                allFinished = false;
              }
            }

            if (allFinished) {
              _this14.options.chunksUploaded(file, function () {
                _this14._finished(files, '', null);
              });
            }
          };

          if (_this14.options.parallelChunkUploads) {
            for (var i = 0; i < file.upload.totalChunkCount; i++) {
              handleNextChunk();
            }
          } else {
            handleNextChunk();
          }
        } else {
          var dataBlocks = [];
          for (var _i23 = 0; _i23 < files.length; _i23++) {
            dataBlocks[_i23] = {
              name: _this14._getParamName(_i23),
              data: transformedFiles[_i23],
              filename: files[_i23].upload.filename
            };
          }
          _this14._uploadData(files, dataBlocks);
        }
      });
    }

    /// Returns the right chunk for given file and xhr

  }, {
    key: "_getChunk",
    value: function _getChunk(file, xhr) {
      for (var i = 0; i < file.upload.totalChunkCount; i++) {
        if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].xhr === xhr) {
          return file.upload.chunks[i];
        }
      }
    }

    // This function actually uploads the file(s) to the server.
    // If dataBlocks contains the actual data to upload (meaning, that this could either be transformed
    // files, or individual chunks for chunked upload).

  }, {
    key: "_uploadData",
    value: function _uploadData(files, dataBlocks) {
      var _this15 = this;

      var xhr = new XMLHttpRequest();

      // Put the xhr object in the file objects to be able to reference it later.
      for (var _iterator22 = files, _isArray22 = true, _i24 = 0, _iterator22 = _isArray22 ? _iterator22 : _iterator22[Symbol.iterator]();;) {
        var _ref21;

        if (_isArray22) {
          if (_i24 >= _iterator22.length) break;
          _ref21 = _iterator22[_i24++];
        } else {
          _i24 = _iterator22.next();
          if (_i24.done) break;
          _ref21 = _i24.value;
        }

        var file = _ref21;

        file.xhr = xhr;
      }
      if (files[0].upload.chunked) {
        // Put the xhr object in the right chunk object, so it can be associated later, and found with _getChunk
        files[0].upload.chunks[dataBlocks[0].chunkIndex].xhr = xhr;
      }

      var method = this.resolveOption(this.options.method, files);
      var url = this.resolveOption(this.options.url, files);
      xhr.open(method, url, true);

      // Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8
      xhr.timeout = this.resolveOption(this.options.timeout, files);

      // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
      xhr.withCredentials = !!this.options.withCredentials;

      xhr.onload = function (e) {
        _this15._finishedUploading(files, xhr, e);
      };

      xhr.onerror = function () {
        _this15._handleUploadError(files, xhr);
      };

      // Some browsers do not have the .upload property
      var progressObj = xhr.upload != null ? xhr.upload : xhr;
      progressObj.onprogress = function (e) {
        return _this15._updateFilesUploadProgress(files, xhr, e);
      };

      var headers = {
        "Accept": "application/json",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest"
      };

      if (this.options.headers) {
        Dropzone.extend(headers, this.options.headers);
      }

      for (var headerName in headers) {
        var headerValue = headers[headerName];
        if (headerValue) {
          xhr.setRequestHeader(headerName, headerValue);
        }
      }

      var formData = new FormData();

      // Adding all @options parameters
      if (this.options.params) {
        var additionalParams = this.options.params;
        if (typeof additionalParams === 'function') {
          additionalParams = additionalParams.call(this, files, xhr, files[0].upload.chunked ? this._getChunk(files[0], xhr) : null);
        }

        for (var key in additionalParams) {
          var value = additionalParams[key];
          formData.append(key, value);
        }
      }

      // Let the user add additional data if necessary
      for (var _iterator23 = files, _isArray23 = true, _i25 = 0, _iterator23 = _isArray23 ? _iterator23 : _iterator23[Symbol.iterator]();;) {
        var _ref22;

        if (_isArray23) {
          if (_i25 >= _iterator23.length) break;
          _ref22 = _iterator23[_i25++];
        } else {
          _i25 = _iterator23.next();
          if (_i25.done) break;
          _ref22 = _i25.value;
        }

        var _file = _ref22;

        this.emit("sending", _file, xhr, formData);
      }
      if (this.options.uploadMultiple) {
        this.emit("sendingmultiple", files, xhr, formData);
      }

      this._addFormElementData(formData);

      // Finally add the files
      // Has to be last because some servers (eg: S3) expect the file to be the last parameter
      for (var i = 0; i < dataBlocks.length; i++) {
        var dataBlock = dataBlocks[i];
        formData.append(dataBlock.name, dataBlock.data, dataBlock.filename);
      }

      this.submitRequest(xhr, formData, files);
    }

    // Transforms all files with this.options.transformFile and invokes done with the transformed files when done.

  }, {
    key: "_transformFiles",
    value: function _transformFiles(files, done) {
      var _this16 = this;

      var transformedFiles = [];
      // Clumsy way of handling asynchronous calls, until I get to add a proper Future library.
      var doneCounter = 0;

      var _loop = function _loop(i) {
        _this16.options.transformFile.call(_this16, files[i], function (transformedFile) {
          transformedFiles[i] = transformedFile;
          if (++doneCounter === files.length) {
            done(transformedFiles);
          }
        });
      };

      for (var i = 0; i < files.length; i++) {
        _loop(i);
      }
    }

    // Takes care of adding other input elements of the form to the AJAX request

  }, {
    key: "_addFormElementData",
    value: function _addFormElementData(formData) {
      // Take care of other input elements
      if (this.element.tagName === "FORM") {
        for (var _iterator24 = this.element.querySelectorAll("input, textarea, select, button"), _isArray24 = true, _i26 = 0, _iterator24 = _isArray24 ? _iterator24 : _iterator24[Symbol.iterator]();;) {
          var _ref23;

          if (_isArray24) {
            if (_i26 >= _iterator24.length) break;
            _ref23 = _iterator24[_i26++];
          } else {
            _i26 = _iterator24.next();
            if (_i26.done) break;
            _ref23 = _i26.value;
          }

          var input = _ref23;

          var inputName = input.getAttribute("name");
          var inputType = input.getAttribute("type");
          if (inputType) inputType = inputType.toLowerCase();

          // If the input doesn't have a name, we can't use it.
          if (typeof inputName === 'undefined' || inputName === null) continue;

          if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
            // Possibly multiple values
            for (var _iterator25 = input.options, _isArray25 = true, _i27 = 0, _iterator25 = _isArray25 ? _iterator25 : _iterator25[Symbol.iterator]();;) {
              var _ref24;

              if (_isArray25) {
                if (_i27 >= _iterator25.length) break;
                _ref24 = _iterator25[_i27++];
              } else {
                _i27 = _iterator25.next();
                if (_i27.done) break;
                _ref24 = _i27.value;
              }

              var option = _ref24;

              if (option.selected) {
                formData.append(inputName, option.value);
              }
            }
          } else if (!inputType || inputType !== "checkbox" && inputType !== "radio" || input.checked) {
            formData.append(inputName, input.value);
          }
        }
      }
    }

    // Invoked when there is new progress information about given files.
    // If e is not provided, it is assumed that the upload is finished.

  }, {
    key: "_updateFilesUploadProgress",
    value: function _updateFilesUploadProgress(files, xhr, e) {
      var progress = void 0;
      if (typeof e !== 'undefined') {
        progress = 100 * e.loaded / e.total;

        if (files[0].upload.chunked) {
          var file = files[0];
          // Since this is a chunked upload, we need to update the appropriate chunk progress.
          var chunk = this._getChunk(file, xhr);
          chunk.progress = progress;
          chunk.total = e.total;
          chunk.bytesSent = e.loaded;
          var fileProgress = 0,
              fileTotal = void 0,
              fileBytesSent = void 0;
          file.upload.progress = 0;
          file.upload.total = 0;
          file.upload.bytesSent = 0;
          for (var i = 0; i < file.upload.totalChunkCount; i++) {
            if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].progress !== undefined) {
              file.upload.progress += file.upload.chunks[i].progress;
              file.upload.total += file.upload.chunks[i].total;
              file.upload.bytesSent += file.upload.chunks[i].bytesSent;
            }
          }
          file.upload.progress = file.upload.progress / file.upload.totalChunkCount;
        } else {
          for (var _iterator26 = files, _isArray26 = true, _i28 = 0, _iterator26 = _isArray26 ? _iterator26 : _iterator26[Symbol.iterator]();;) {
            var _ref25;

            if (_isArray26) {
              if (_i28 >= _iterator26.length) break;
              _ref25 = _iterator26[_i28++];
            } else {
              _i28 = _iterator26.next();
              if (_i28.done) break;
              _ref25 = _i28.value;
            }

            var _file2 = _ref25;

            _file2.upload.progress = progress;
            _file2.upload.total = e.total;
            _file2.upload.bytesSent = e.loaded;
          }
        }
        for (var _iterator27 = files, _isArray27 = true, _i29 = 0, _iterator27 = _isArray27 ? _iterator27 : _iterator27[Symbol.iterator]();;) {
          var _ref26;

          if (_isArray27) {
            if (_i29 >= _iterator27.length) break;
            _ref26 = _iterator27[_i29++];
          } else {
            _i29 = _iterator27.next();
            if (_i29.done) break;
            _ref26 = _i29.value;
          }

          var _file3 = _ref26;

          this.emit("uploadprogress", _file3, _file3.upload.progress, _file3.upload.bytesSent);
        }
      } else {
        // Called when the file finished uploading

        var allFilesFinished = true;

        progress = 100;

        for (var _iterator28 = files, _isArray28 = true, _i30 = 0, _iterator28 = _isArray28 ? _iterator28 : _iterator28[Symbol.iterator]();;) {
          var _ref27;

          if (_isArray28) {
            if (_i30 >= _iterator28.length) break;
            _ref27 = _iterator28[_i30++];
          } else {
            _i30 = _iterator28.next();
            if (_i30.done) break;
            _ref27 = _i30.value;
          }

          var _file4 = _ref27;

          if (_file4.upload.progress !== 100 || _file4.upload.bytesSent !== _file4.upload.total) {
            allFilesFinished = false;
          }
          _file4.upload.progress = progress;
          _file4.upload.bytesSent = _file4.upload.total;
        }

        // Nothing to do, all files already at 100%
        if (allFilesFinished) {
          return;
        }

        for (var _iterator29 = files, _isArray29 = true, _i31 = 0, _iterator29 = _isArray29 ? _iterator29 : _iterator29[Symbol.iterator]();;) {
          var _ref28;

          if (_isArray29) {
            if (_i31 >= _iterator29.length) break;
            _ref28 = _iterator29[_i31++];
          } else {
            _i31 = _iterator29.next();
            if (_i31.done) break;
            _ref28 = _i31.value;
          }

          var _file5 = _ref28;

          this.emit("uploadprogress", _file5, progress, _file5.upload.bytesSent);
        }
      }
    }
  }, {
    key: "_finishedUploading",
    value: function _finishedUploading(files, xhr, e) {
      var response = void 0;

      if (files[0].status === Dropzone.CANCELED) {
        return;
      }

      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.responseType !== 'arraybuffer' && xhr.responseType !== 'blob') {
        response = xhr.responseText;

        if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
          try {
            response = JSON.parse(response);
          } catch (error) {
            e = error;
            response = "Invalid JSON response from server.";
          }
        }
      }

      this._updateFilesUploadProgress(files);

      if (!(200 <= xhr.status && xhr.status < 300)) {
        this._handleUploadError(files, xhr, response);
      } else {
        if (files[0].upload.chunked) {
          files[0].upload.finishedChunkUpload(this._getChunk(files[0], xhr));
        } else {
          this._finished(files, response, e);
        }
      }
    }
  }, {
    key: "_handleUploadError",
    value: function _handleUploadError(files, xhr, response) {
      if (files[0].status === Dropzone.CANCELED) {
        return;
      }

      if (files[0].upload.chunked && this.options.retryChunks) {
        var chunk = this._getChunk(files[0], xhr);
        if (chunk.retries++ < this.options.retryChunksLimit) {
          this._uploadData(files, [chunk.dataBlock]);
          return;
        } else {
          console.warn('Retried this chunk too often. Giving up.');
        }
      }

      for (var _iterator30 = files, _isArray30 = true, _i32 = 0, _iterator30 = _isArray30 ? _iterator30 : _iterator30[Symbol.iterator]();;) {
        var _ref29;

        if (_isArray30) {
          if (_i32 >= _iterator30.length) break;
          _ref29 = _iterator30[_i32++];
        } else {
          _i32 = _iterator30.next();
          if (_i32.done) break;
          _ref29 = _i32.value;
        }

        var file = _ref29;

        this._errorProcessing(files, response || this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr);
      }
    }
  }, {
    key: "submitRequest",
    value: function submitRequest(xhr, formData, files) {
      xhr.send(formData);
    }

    // Called internally when processing is finished.
    // Individual callbacks have to be called in the appropriate sections.

  }, {
    key: "_finished",
    value: function _finished(files, responseText, e) {
      for (var _iterator31 = files, _isArray31 = true, _i33 = 0, _iterator31 = _isArray31 ? _iterator31 : _iterator31[Symbol.iterator]();;) {
        var _ref30;

        if (_isArray31) {
          if (_i33 >= _iterator31.length) break;
          _ref30 = _iterator31[_i33++];
        } else {
          _i33 = _iterator31.next();
          if (_i33.done) break;
          _ref30 = _i33.value;
        }

        var file = _ref30;

        file.status = Dropzone.SUCCESS;
        this.emit("success", file, responseText, e);
        this.emit("complete", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("successmultiple", files, responseText, e);
        this.emit("completemultiple", files);
      }

      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    }

    // Called internally when processing is finished.
    // Individual callbacks have to be called in the appropriate sections.

  }, {
    key: "_errorProcessing",
    value: function _errorProcessing(files, message, xhr) {
      for (var _iterator32 = files, _isArray32 = true, _i34 = 0, _iterator32 = _isArray32 ? _iterator32 : _iterator32[Symbol.iterator]();;) {
        var _ref31;

        if (_isArray32) {
          if (_i34 >= _iterator32.length) break;
          _ref31 = _iterator32[_i34++];
        } else {
          _i34 = _iterator32.next();
          if (_i34.done) break;
          _ref31 = _i34.value;
        }

        var file = _ref31;

        file.status = Dropzone.ERROR;
        this.emit("error", file, message, xhr);
        this.emit("complete", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("errormultiple", files, message, xhr);
        this.emit("completemultiple", files);
      }

      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    }
  }], [{
    key: "uuidv4",
    value: function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    }
  }]);

  return Dropzone;
}(Emitter);

Dropzone.initClass();

Dropzone.version = "5.4.0";

// This is a map of options for your different dropzones. Add configurations
// to this object for your different dropzone elemens.
//
// Example:
//
//     Dropzone.options.myDropzoneElementId = { maxFilesize: 1 };
//
// To disable autoDiscover for a specific element, you can set `false` as an option:
//
//     Dropzone.options.myDisabledElementId = false;
//
// And in html:
//
//     <form action="/upload" id="my-dropzone-element-id" class="dropzone"></form>
Dropzone.options = {};

// Returns the options for an element or undefined if none available.
Dropzone.optionsForElement = function (element) {
  // Get the `Dropzone.options.elementId` for this element if it exists
  if (element.getAttribute("id")) {
    return Dropzone.options[camelize(element.getAttribute("id"))];
  } else {
    return undefined;
  }
};

// Holds a list of all dropzone instances
Dropzone.instances = [];

// Returns the dropzone for given element if any
Dropzone.forElement = function (element) {
  if (typeof element === "string") {
    element = document.querySelector(element);
  }
  if ((element != null ? element.dropzone : undefined) == null) {
    throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
  }
  return element.dropzone;
};

// Set to false if you don't want Dropzone to automatically find and attach to .dropzone elements.
Dropzone.autoDiscover = true;

// Looks for all .dropzone elements and creates a dropzone for them
Dropzone.discover = function () {
  var dropzones = void 0;
  if (document.querySelectorAll) {
    dropzones = document.querySelectorAll(".dropzone");
  } else {
    dropzones = [];
    // IE :(
    var checkElements = function checkElements(elements) {
      return function () {
        var result = [];
        for (var _iterator33 = elements, _isArray33 = true, _i35 = 0, _iterator33 = _isArray33 ? _iterator33 : _iterator33[Symbol.iterator]();;) {
          var _ref32;

          if (_isArray33) {
            if (_i35 >= _iterator33.length) break;
            _ref32 = _iterator33[_i35++];
          } else {
            _i35 = _iterator33.next();
            if (_i35.done) break;
            _ref32 = _i35.value;
          }

          var el = _ref32;

          if (/(^| )dropzone($| )/.test(el.className)) {
            result.push(dropzones.push(el));
          } else {
            result.push(undefined);
          }
        }
        return result;
      }();
    };
    checkElements(document.getElementsByTagName("div"));
    checkElements(document.getElementsByTagName("form"));
  }

  return function () {
    var result = [];
    for (var _iterator34 = dropzones, _isArray34 = true, _i36 = 0, _iterator34 = _isArray34 ? _iterator34 : _iterator34[Symbol.iterator]();;) {
      var _ref33;

      if (_isArray34) {
        if (_i36 >= _iterator34.length) break;
        _ref33 = _iterator34[_i36++];
      } else {
        _i36 = _iterator34.next();
        if (_i36.done) break;
        _ref33 = _i36.value;
      }

      var dropzone = _ref33;

      // Create a dropzone unless auto discover has been disabled for specific element
      if (Dropzone.optionsForElement(dropzone) !== false) {
        result.push(new Dropzone(dropzone));
      } else {
        result.push(undefined);
      }
    }
    return result;
  }();
};

// Since the whole Drag'n'Drop API is pretty new, some browsers implement it,
// but not correctly.
// So I created a blacklist of userAgents. Yes, yes. Browser sniffing, I know.
// But what to do when browsers *theoretically* support an API, but crash
// when using it.
//
// This is a list of regular expressions tested against navigator.userAgent
//
// ** It should only be used on browser that *do* support the API, but
// incorrectly **
//
Dropzone.blacklistedBrowsers = [
// The mac os and windows phone version of opera 12 seems to have a problem with the File drag'n'drop API.
/opera.*(Macintosh|Windows Phone).*version\/12/i];

// Checks if the browser is supported
Dropzone.isBrowserSupported = function () {
  var capableBrowser = true;

  if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
    if (!("classList" in document.createElement("a"))) {
      capableBrowser = false;
    } else {
      // The browser supports the API, but may be blacklisted.
      for (var _iterator35 = Dropzone.blacklistedBrowsers, _isArray35 = true, _i37 = 0, _iterator35 = _isArray35 ? _iterator35 : _iterator35[Symbol.iterator]();;) {
        var _ref34;

        if (_isArray35) {
          if (_i37 >= _iterator35.length) break;
          _ref34 = _iterator35[_i37++];
        } else {
          _i37 = _iterator35.next();
          if (_i37.done) break;
          _ref34 = _i37.value;
        }

        var regex = _ref34;

        if (regex.test(navigator.userAgent)) {
          capableBrowser = false;
          continue;
        }
      }
    }
  } else {
    capableBrowser = false;
  }

  return capableBrowser;
};

Dropzone.dataURItoBlob = function (dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0, end = byteString.length, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob
  return new Blob([ab], { type: mimeString });
};

// Returns an array without the rejected item
var without = function without(list, rejectedItem) {
  return list.filter(function (item) {
    return item !== rejectedItem;
  }).map(function (item) {
    return item;
  });
};

// abc-def_ghi -> abcDefGhi
var camelize = function camelize(str) {
  return str.replace(/[\-_](\w)/g, function (match) {
    return match.charAt(1).toUpperCase();
  });
};

// Creates an element from string
Dropzone.createElement = function (string) {
  var div = document.createElement("div");
  div.innerHTML = string;
  return div.childNodes[0];
};

// Tests if given element is inside (or simply is) the container
Dropzone.elementInside = function (element, container) {
  if (element === container) {
    return true;
  } // Coffeescript doesn't support do/while loops
  while (element = element.parentNode) {
    if (element === container) {
      return true;
    }
  }
  return false;
};

Dropzone.getElement = function (el, name) {
  var element = void 0;
  if (typeof el === "string") {
    element = document.querySelector(el);
  } else if (el.nodeType != null) {
    element = el;
  }
  if (element == null) {
    throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector or a plain HTML element.");
  }
  return element;
};

Dropzone.getElements = function (els, name) {
  var el = void 0,
      elements = void 0;
  if (els instanceof Array) {
    elements = [];
    try {
      for (var _iterator36 = els, _isArray36 = true, _i38 = 0, _iterator36 = _isArray36 ? _iterator36 : _iterator36[Symbol.iterator]();;) {
        if (_isArray36) {
          if (_i38 >= _iterator36.length) break;
          el = _iterator36[_i38++];
        } else {
          _i38 = _iterator36.next();
          if (_i38.done) break;
          el = _i38.value;
        }

        elements.push(this.getElement(el, name));
      }
    } catch (e) {
      elements = null;
    }
  } else if (typeof els === "string") {
    elements = [];
    for (var _iterator37 = document.querySelectorAll(els), _isArray37 = true, _i39 = 0, _iterator37 = _isArray37 ? _iterator37 : _iterator37[Symbol.iterator]();;) {
      if (_isArray37) {
        if (_i39 >= _iterator37.length) break;
        el = _iterator37[_i39++];
      } else {
        _i39 = _iterator37.next();
        if (_i39.done) break;
        el = _i39.value;
      }

      elements.push(el);
    }
  } else if (els.nodeType != null) {
    elements = [els];
  }

  if (elements == null || !elements.length) {
    throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
  }

  return elements;
};

// Asks the user the question and calls accepted or rejected accordingly
//
// The default implementation just uses `window.confirm` and then calls the
// appropriate callback.
Dropzone.confirm = function (question, accepted, rejected) {
  if (window.confirm(question)) {
    return accepted();
  } else if (rejected != null) {
    return rejected();
  }
};

// Validates the mime type like this:
//
// https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept
Dropzone.isValidFile = function (file, acceptedFiles) {
  if (!acceptedFiles) {
    return true;
  } // If there are no accepted mime types, it's OK
  acceptedFiles = acceptedFiles.split(",");

  var mimeType = file.type;
  var baseMimeType = mimeType.replace(/\/.*$/, "");

  for (var _iterator38 = acceptedFiles, _isArray38 = true, _i40 = 0, _iterator38 = _isArray38 ? _iterator38 : _iterator38[Symbol.iterator]();;) {
    var _ref35;

    if (_isArray38) {
      if (_i40 >= _iterator38.length) break;
      _ref35 = _iterator38[_i40++];
    } else {
      _i40 = _iterator38.next();
      if (_i40.done) break;
      _ref35 = _i40.value;
    }

    var validType = _ref35;

    validType = validType.trim();
    if (validType.charAt(0) === ".") {
      if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
        return true;
      }
    } else if (/\/\*$/.test(validType)) {
      // This is something like a image/* mime type
      if (baseMimeType === validType.replace(/\/.*$/, "")) {
        return true;
      }
    } else {
      if (mimeType === validType) {
        return true;
      }
    }
  }

  return false;
};

// Augment jQuery
if (typeof jQuery !== 'undefined' && jQuery !== null) {
  jQuery.fn.dropzone = function (options) {
    return this.each(function () {
      return new Dropzone(this, options);
    });
  };
}

if (typeof module !== 'undefined' && module !== null) {
  module.exports = Dropzone;
} else {
  window.Dropzone = Dropzone;
}

// Dropzone file status codes
Dropzone.ADDED = "added";

Dropzone.QUEUED = "queued";
// For backwards compatibility. Now, if a file is accepted, it's either queued
// or uploading.
Dropzone.ACCEPTED = Dropzone.QUEUED;

Dropzone.UPLOADING = "uploading";
Dropzone.PROCESSING = Dropzone.UPLOADING; // alias

Dropzone.CANCELED = "canceled";
Dropzone.ERROR = "error";
Dropzone.SUCCESS = "success";

/*

 Bugfix for iOS 6 and 7
 Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
 based on the work of https://github.com/stomita/ios-imagefile-megapixel

 */

// Detecting vertical squash in loaded image.
// Fixes a bug which squash image vertically while drawing into canvas for some images.
// This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
var detectVerticalSquash = function detectVerticalSquash(img) {
  var iw = img.naturalWidth;
  var ih = img.naturalHeight;
  var canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = ih;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var _ctx$getImageData = ctx.getImageData(1, 0, 1, ih),
      data = _ctx$getImageData.data;

  // search image edge pixel position in case it is squashed vertically.


  var sy = 0;
  var ey = ih;
  var py = ih;
  while (py > sy) {
    var alpha = data[(py - 1) * 4 + 3];

    if (alpha === 0) {
      ey = py;
    } else {
      sy = py;
    }

    py = ey + sy >> 1;
  }
  var ratio = py / ih;

  if (ratio === 0) {
    return 1;
  } else {
    return ratio;
  }
};

// A replacement for context.drawImage
// (args are for source and destination).
var drawImageIOSFix = function drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
  var vertSquashRatio = detectVerticalSquash(img);
  return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
};

// Based on MinifyJpeg
// Source: http://www.perry.cz/files/ExifRestorer.js
// http://elicon.blog57.fc2.com/blog-entry-206.html

var ExifRestore = function () {
  function ExifRestore() {
    _classCallCheck(this, ExifRestore);
  }

  _createClass(ExifRestore, null, [{
    key: "initClass",
    value: function initClass() {
      this.KEY_STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    }
  }, {
    key: "encode64",
    value: function encode64(input) {
      var output = '';
      var chr1 = undefined;
      var chr2 = undefined;
      var chr3 = '';
      var enc1 = undefined;
      var enc2 = undefined;
      var enc3 = undefined;
      var enc4 = '';
      var i = 0;
      while (true) {
        chr1 = input[i++];
        chr2 = input[i++];
        chr3 = input[i++];
        enc1 = chr1 >> 2;
        enc2 = (chr1 & 3) << 4 | chr2 >> 4;
        enc3 = (chr2 & 15) << 2 | chr3 >> 6;
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output + this.KEY_STR.charAt(enc1) + this.KEY_STR.charAt(enc2) + this.KEY_STR.charAt(enc3) + this.KEY_STR.charAt(enc4);
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';
        if (!(i < input.length)) {
          break;
        }
      }
      return output;
    }
  }, {
    key: "restore",
    value: function restore(origFileBase64, resizedFileBase64) {
      if (!origFileBase64.match('data:image/jpeg;base64,')) {
        return resizedFileBase64;
      }
      var rawImage = this.decode64(origFileBase64.replace('data:image/jpeg;base64,', ''));
      var segments = this.slice2Segments(rawImage);
      var image = this.exifManipulation(resizedFileBase64, segments);
      return "data:image/jpeg;base64," + this.encode64(image);
    }
  }, {
    key: "exifManipulation",
    value: function exifManipulation(resizedFileBase64, segments) {
      var exifArray = this.getExifArray(segments);
      var newImageArray = this.insertExif(resizedFileBase64, exifArray);
      var aBuffer = new Uint8Array(newImageArray);
      return aBuffer;
    }
  }, {
    key: "getExifArray",
    value: function getExifArray(segments) {
      var seg = undefined;
      var x = 0;
      while (x < segments.length) {
        seg = segments[x];
        if (seg[0] === 255 & seg[1] === 225) {
          return seg;
        }
        x++;
      }
      return [];
    }
  }, {
    key: "insertExif",
    value: function insertExif(resizedFileBase64, exifArray) {
      var imageData = resizedFileBase64.replace('data:image/jpeg;base64,', '');
      var buf = this.decode64(imageData);
      var separatePoint = buf.indexOf(255, 3);
      var mae = buf.slice(0, separatePoint);
      var ato = buf.slice(separatePoint);
      var array = mae;
      array = array.concat(exifArray);
      array = array.concat(ato);
      return array;
    }
  }, {
    key: "slice2Segments",
    value: function slice2Segments(rawImageArray) {
      var head = 0;
      var segments = [];
      while (true) {
        var length;
        if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 218) {
          break;
        }
        if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 216) {
          head += 2;
        } else {
          length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
          var endPoint = head + length + 2;
          var seg = rawImageArray.slice(head, endPoint);
          segments.push(seg);
          head = endPoint;
        }
        if (head > rawImageArray.length) {
          break;
        }
      }
      return segments;
    }
  }, {
    key: "decode64",
    value: function decode64(input) {
      var output = '';
      var chr1 = undefined;
      var chr2 = undefined;
      var chr3 = '';
      var enc1 = undefined;
      var enc2 = undefined;
      var enc3 = undefined;
      var enc4 = '';
      var i = 0;
      var buf = [];
      // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
      var base64test = /[^A-Za-z0-9\+\/\=]/g;
      if (base64test.exec(input)) {
        console.warn('There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, \'+\', \'/\',and \'=\'\nExpect errors in decoding.');
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
      while (true) {
        enc1 = this.KEY_STR.indexOf(input.charAt(i++));
        enc2 = this.KEY_STR.indexOf(input.charAt(i++));
        enc3 = this.KEY_STR.indexOf(input.charAt(i++));
        enc4 = this.KEY_STR.indexOf(input.charAt(i++));
        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        chr3 = (enc3 & 3) << 6 | enc4;
        buf.push(chr1);
        if (enc3 !== 64) {
          buf.push(chr2);
        }
        if (enc4 !== 64) {
          buf.push(chr3);
        }
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';
        if (!(i < input.length)) {
          break;
        }
      }
      return buf;
    }
  }]);

  return ExifRestore;
}();

ExifRestore.initClass();

/*
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 */

// @win window reference
// @fn function reference
var contentLoaded = function contentLoaded(win, fn) {
  var done = false;
  var top = true;
  var doc = win.document;
  var root = doc.documentElement;
  var add = doc.addEventListener ? "addEventListener" : "attachEvent";
  var rem = doc.addEventListener ? "removeEventListener" : "detachEvent";
  var pre = doc.addEventListener ? "" : "on";
  var init = function init(e) {
    if (e.type === "readystatechange" && doc.readyState !== "complete") {
      return;
    }
    (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);
    if (!done && (done = true)) {
      return fn.call(win, e.type || e);
    }
  };

  var poll = function poll() {
    try {
      root.doScroll("left");
    } catch (e) {
      setTimeout(poll, 50);
      return;
    }
    return init("poll");
  };

  if (doc.readyState !== "complete") {
    if (doc.createEventObject && root.doScroll) {
      try {
        top = !win.frameElement;
      } catch (error) {}
      if (top) {
        poll();
      }
    }
    doc[add](pre + "DOMContentLoaded", init, false);
    doc[add](pre + "readystatechange", init, false);
    return win[add](pre + "load", init, false);
  }
};

// As a single function to be able to write tests.
Dropzone._autoDiscoverFunction = function () {
  if (Dropzone.autoDiscover) {
    return Dropzone.discover();
  }
};
contentLoaded(window, Dropzone._autoDiscoverFunction);

function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}
function __guardMethod__(obj, methodName, transform) {
  if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {
    return transform(obj, methodName);
  } else {
    return undefined;
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(5)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = window['$'];

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjU5OTdkNjMzZDU2YzAyMGViNjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Jvb3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Ryb3B6b25lLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbmRvd1snQmxhem9yJ11cIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZHJvcHpvbmUvZGlzdC9kcm9wem9uZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5kb3dbJ11cIiIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSx1QkFBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXBCLG9DQUFrQztBQUNsQyxzQ0FBcUM7QUFFckM7SUFBOEIsbUNBQXlCO0lBQXZEO1FBQUEsdUVBK0dDO1FBN0dTLFdBQUcsR0FBVyxFQUFFLENBQUM7UUFDakIscUJBQWEsR0FBVyxFQUFFLENBQUM7UUFDM0IsZ0JBQVEsR0FBVyxDQUFDLENBQUM7UUFFckIsa0JBQVUsR0FBb0IsSUFBSSxDQUFDOztJQXlHN0MsQ0FBQztJQXZHVyx3Q0FBYyxHQUF4QixVQUF5QixhQUFxQixF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QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEZBQTBGLGFBQWE7QUFDdkc7QUFDQTs7QUFFQSxrSUFBa0k7QUFDbEk7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxFQUFFO0FBQy9DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxzQ0FBc0M7QUFDbkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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QTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsMElBQTBJO0FBQzFJOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsS0FBSztBQUNoQjtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxLQUFLO0FBQ2Q7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVKQUF1SjtBQUN2Sjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQSwwSUFBMEk7QUFDMUk7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLCtCQUErQjtBQUMvQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxP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QTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsMElBQTBJO0FBQzFJOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwyRkFBMkYsWUFBWTtBQUN2RztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQSwwSUFBMEk7QUFDMUk7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLDBJQUEwSTtBQUMxSTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FB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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQSwyRUFBMkU7QUFDM0U7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcjhHQSw2Qjs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJsYXpvci5mb3Jtcy5kcm9wem9uZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY1OTk3ZDYzM2Q1NmMwMjBlYjYyIiwiaW1wb3J0ICcuL2Ryb3B6b25lJztcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0Jvb3QudHMiLCJpbXBvcnQgKiBhcyBCbGF6b3IgZnJvbSAnQGJsYXpvcic7XHJcbmltcG9ydCAqIGFzIERyb3B6b25lIGZyb20gJ2Ryb3B6b25lJztcclxuXHJcbmNsYXNzIERyb3Bab25lRWxlbWVudCBleHRlbmRzIEJsYXpvci5CbGF6b3JET01Db21wb25lbnQge1xyXG5cclxuICBwcml2YXRlIHVybDogc3RyaW5nID0gJyc7XHJcbiAgcHJpdmF0ZSBhdXRob3JpemF0aW9uOiBzdHJpbmcgPSAnJztcclxuICBwcml2YXRlIG1heEZpbGVzOiBudW1iZXIgPSAxO1xyXG5cclxuICBwcml2YXRlIG15RHJvcHpvbmU6IERyb3B6b25lIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHByb3RlY3RlZCBpc0RPTUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBudWxsKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gXCJVcmxcIikge1xyXG4gICAgICB0aGlzLnVybCA9IHZhbHVlITtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYXR0cmlidXRlTmFtZSA9PT0gXCJBdXRob3JpemF0aW9uSGVhZGVyXCIpIHtcclxuICAgICAgdGhpcy5hdXRob3JpemF0aW9uID0gdmFsdWUhO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChhdHRyaWJ1dGVOYW1lID09PSBcIk1heEZpbGVzXCIpIHtcclxuICAgICAgdGhpcy5tYXhGaWxlcyA9IHBhcnNlSW50KCB2YWx1ZSEgKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdXBlci5pc0RPTUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25ET01VcGRhdGluZygpIHtcclxuICAgIHN1cGVyLm9uRE9NVXBkYXRpbmcoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkRPTVVwZGF0ZWQoKSB7XHJcbiAgICBpZiAodGhpcy5teURyb3B6b25lID09PSBudWxsKSB7XHJcbiAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICBsZXQgaW5wdXQgPSB0aGlzLmdldERPTUVsZW1lbnQoKS5uZXh0U2libGluZyEgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGlmIChpbnB1dC5ub2RlVHlwZSA9PSA4KSByZXR1cm47IC8vIGlzIGNvbW1lbnRcclxuXHJcbiAgICAgIHRoaXMubXlEcm9wem9uZSA9IG5ldyBEcm9wem9uZShpbnB1dCwge1xyXG4gICAgICAgIHVybDogdGhpcy51cmwsXHJcbiAgICAgICAgbWF4RmlsZXM6IHRoaXMubWF4RmlsZXMsXHJcbiAgICAgICAgYWRkUmVtb3ZlTGlua3M6IHRydWUsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiB0aGlzLmF1dGhvcml6YXRpb25cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZWRmaWxlOiBmdW5jdGlvbiAoZmlsZSkge1xyXG4gICAgICAgICAgbGV0IHRvRG9tRWxlbWVudCA9IF90aGlzLmdldERPTUVsZW1lbnQoKTtcclxuICAgICAgICAgIGxldCBsaXN0ZW5lciA9IHRvRG9tRWxlbWVudFsnX29uZmlsZXJlbW92ZWRsaXN0ZW5lciddO1xyXG4gICAgICAgICAgaWYgKGxpc3RlbmVyICE9PSB1bmRlZmluZWQgJiYgbGlzdGVuZXIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbGlzdGVuZXIoe1xyXG4gICAgICAgICAgICAgIHR5cGU6IFwiRmlsZVJlbW92ZWRcIixcclxuICAgICAgICAgICAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgRmlsZU5hbWU6IGZpbGUubmFtZSxcclxuICAgICAgICAgICAgICAgIFNpemU6IGZpbGUuc2l6ZVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZmlsZS5wcmV2aWV3RWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChmaWxlLCByZXNwb25zZSkge1xyXG4gICAgICAgICAgbGV0IHRvRG9tRWxlbWVudCA9IF90aGlzLmdldERPTUVsZW1lbnQoKTtcclxuICAgICAgICAgIGxldCBsaXN0ZW5lciA9IHRvRG9tRWxlbWVudFsnX29uZmlsZWFkZGVkbGlzdGVuZXInXTtcclxuICAgICAgICAgIGlmIChsaXN0ZW5lciAhPT0gdW5kZWZpbmVkICYmIGxpc3RlbmVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyKHtcclxuICAgICAgICAgICAgICB0eXBlOiBcIkZpbGVBZGRlZFwiLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICBGaWxlTmFtZTogZmlsZS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgU2l6ZTogZmlsZS5zaXplLFxyXG4gICAgICAgICAgICAgICAgR3VpZDogcmVzcG9uc2VcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN1cGVyLm9uRE9NVXBkYXRlZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGFwcGx5RXZlbnQoYXR0cmlidXRlTmFtZTogc3RyaW5nLCBjb21wb25lbnRJZDogbnVtYmVyLCBldmVudEhhbmRsZXJJZDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICB2YXIgdG9Eb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XHJcbiAgICB2YXIgYnJvd3NlclJlbmRlcmVySWQgPSB0aGlzLmJyb3dzZXJSZW5kZXJlci5icm93c2VyUmVuZGVyZXJJZDtcclxuICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgaWYgKGF0dHJpYnV0ZU5hbWUgPT09IFwib25maWxlYWRkZWRcIikge1xyXG4gICAgICBsZXQgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgX3RoaXMucmFpc2VFdmVudChldmVudEhhbmRsZXJJZCwgbmV3IEJsYXpvci5FdmVudEZvckRvdE5ldCgnY3VzdG9tJywgeyB0eXBlOiBldnQudHlwZSwgVmFsdWU6IGV2dC52YWx1ZSB9KSk7XHJcbiAgICAgIH07XHJcbiAgICAgIHRvRG9tRWxlbWVudFsnX29uZmlsZWFkZGVkbGlzdGVuZXInXSA9IGxpc3RlbmVyO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoYXR0cmlidXRlTmFtZSA9PT0gXCJvbmZpbGVyZW1vdmVkXCIpIHtcclxuICAgICAgbGV0IGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgIF90aGlzLnJhaXNlRXZlbnQoZXZlbnRIYW5kbGVySWQsIG5ldyBCbGF6b3IuRXZlbnRGb3JEb3ROZXQoJ2N1c3RvbScsIHsgdHlwZTogZXZ0LnR5cGUsIFZhbHVlOiBldnQudmFsdWUgfSkpO1xyXG4gICAgICB9O1xyXG4gICAgICB0b0RvbUVsZW1lbnRbJ19vbmZpbGVyZW1vdmVkbGlzdGVuZXInXSA9IGxpc3RlbmVyO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3VwZXIuYXBwbHlFdmVudChhdHRyaWJ1dGVOYW1lLCBjb21wb25lbnRJZCwgZXZlbnRIYW5kbGVySWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRpc3Bvc2UoKSB7XHJcbiAgICBpZiAodGhpcy5teURyb3B6b25lICE9PSBudWxsKSB7XHJcbiAgICAgIGxldCB0b0RvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKTtcclxuICAgICAgdG9Eb21FbGVtZW50Wydfb25maWxlYWRkZWRsaXN0ZW5lciddID0gbnVsbDtcclxuICAgICAgdG9Eb21FbGVtZW50Wydfb25maWxlcmVtb3ZlZGxpc3RlbmVyJ10gPSBudWxsO1xyXG5cclxuICAgICAgdGhpcy5teURyb3B6b25lLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5teURyb3B6b25lID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVnaXN0ZXJEcm9wWm9uZUNvbXBvbmVudElkKGlkKSB7XHJcbiAgQmxhem9yLnJlZ2lzdGVyQ3VzdG9tRE9NRWxlbWVudChpZCwgZnVuY3Rpb24gKENJRCwgcGFyZW50LCBjaGlsZEluZGV4LCBicikge1xyXG4gICAgcmV0dXJuIG5ldyBEcm9wWm9uZUVsZW1lbnQoQ0lELCBwYXJlbnQsIGNoaWxkSW5kZXgsIGJyKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxud2luZG93W1wiUmVnaXN0ZXJEcm9wWm9uZUNvbXBvbmVudElkXCJdID0gUmVnaXN0ZXJEcm9wWm9uZUNvbXBvbmVudElkO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZHJvcHpvbmUudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1snQmxhem9yJ107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5kb3dbJ0JsYXpvciddXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLypcbiAqXG4gKiBNb3JlIGluZm8gYXQgW3d3dy5kcm9wem9uZWpzLmNvbV0oaHR0cDovL3d3dy5kcm9wem9uZWpzLmNvbSlcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIsIE1hdGlhcyBNZW5vXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqXG4gKi9cblxuLy8gVGhlIEVtaXR0ZXIgY2xhc3MgcHJvdmlkZXMgdGhlIGFiaWxpdHkgdG8gY2FsbCBgLm9uKClgIG9uIERyb3B6b25lIHRvIGxpc3RlblxuLy8gdG8gZXZlbnRzLlxuLy8gSXQgaXMgc3Ryb25nbHkgYmFzZWQgb24gY29tcG9uZW50J3MgZW1pdHRlciBjbGFzcywgYW5kIEkgcmVtb3ZlZCB0aGVcbi8vIGZ1bmN0aW9uYWxpdHkgYmVjYXVzZSBvZiB0aGUgZGVwZW5kZW5jeSBoZWxsIHdpdGggZGlmZmVyZW50IGZyYW1ld29ya3MuXG52YXIgRW1pdHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRW1pdHRlcigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRW1pdHRlcik7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRW1pdHRlciwgW3tcbiAgICBrZXk6IFwib25cIixcblxuICAgIC8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciBmb3IgZ2l2ZW4gZXZlbnRcbiAgICB2YWx1ZTogZnVuY3Rpb24gb24oZXZlbnQsIGZuKSB7XG4gICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICAgICAvLyBDcmVhdGUgbmFtZXNwYWNlIGZvciB0aGlzIGV2ZW50XG4gICAgICBpZiAoIXRoaXMuX2NhbGxiYWNrc1tldmVudF0pIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XS5wdXNoKGZuKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlbWl0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgICAgIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuXG4gICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gY2FsbGJhY2tzLCBfaXNBcnJheSA9IHRydWUsIF9pID0gMCwgX2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICAgIGlmIChfaXNBcnJheSkge1xuICAgICAgICAgICAgaWYgKF9pID49IF9pdGVyYXRvci5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZiA9IF9pdGVyYXRvcltfaSsrXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX2kgPSBfaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgaWYgKF9pLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBjYWxsYmFjayA9IF9yZWY7XG5cbiAgICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXIgZm9yIGdpdmVuIGV2ZW50LiBJZiBmbiBpcyBub3QgcHJvdmlkZWQsIGFsbCBldmVudFxuICAgIC8vIGxpc3RlbmVycyBmb3IgdGhhdCBldmVudCB3aWxsIGJlIHJlbW92ZWQuIElmIG5laXRoZXIgaXMgcHJvdmlkZWQsIGFsbFxuICAgIC8vIGV2ZW50IGxpc3RlbmVycyB3aWxsIGJlIHJlbW92ZWQuXG5cbiAgfSwge1xuICAgIGtleTogXCJvZmZcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb2ZmKGV2ZW50LCBmbikge1xuICAgICAgaWYgKCF0aGlzLl9jYWxsYmFja3MgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIHNwZWNpZmljIGV2ZW50XG4gICAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgICAgIGlmICghY2FsbGJhY2tzKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV07XG4gICAgICAgIGlmIChjYWxsYmFjayA9PT0gZm4pIHtcbiAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBFbWl0dGVyO1xufSgpO1xuXG52YXIgRHJvcHpvbmUgPSBmdW5jdGlvbiAoX0VtaXR0ZXIpIHtcbiAgX2luaGVyaXRzKERyb3B6b25lLCBfRW1pdHRlcik7XG5cbiAgX2NyZWF0ZUNsYXNzKERyb3B6b25lLCBudWxsLCBbe1xuICAgIGtleTogXCJpbml0Q2xhc3NcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdENsYXNzKCkge1xuXG4gICAgICAvLyBFeHBvc2luZyB0aGUgZW1pdHRlciBjbGFzcywgbWFpbmx5IGZvciB0ZXN0c1xuICAgICAgdGhpcy5wcm90b3R5cGUuRW1pdHRlciA9IEVtaXR0ZXI7XG5cbiAgICAgIC8qXG4gICAgICAgVGhpcyBpcyBhIGxpc3Qgb2YgYWxsIGF2YWlsYWJsZSBldmVudHMgeW91IGNhbiByZWdpc3RlciBvbiBhIGRyb3B6b25lIG9iamVjdC5cbiAgICAgICAgWW91IGNhbiByZWdpc3RlciBhbiBldmVudCBoYW5kbGVyIGxpa2UgdGhpczpcbiAgICAgICAgZHJvcHpvbmUub24oXCJkcmFnRW50ZXJcIiwgZnVuY3Rpb24oKSB7IH0pO1xuICAgICAgICAqL1xuICAgICAgdGhpcy5wcm90b3R5cGUuZXZlbnRzID0gW1wiZHJvcFwiLCBcImRyYWdzdGFydFwiLCBcImRyYWdlbmRcIiwgXCJkcmFnZW50ZXJcIiwgXCJkcmFnb3ZlclwiLCBcImRyYWdsZWF2ZVwiLCBcImFkZGVkZmlsZVwiLCBcImFkZGVkZmlsZXNcIiwgXCJyZW1vdmVkZmlsZVwiLCBcInRodW1ibmFpbFwiLCBcImVycm9yXCIsIFwiZXJyb3JtdWx0aXBsZVwiLCBcInByb2Nlc3NpbmdcIiwgXCJwcm9jZXNzaW5nbXVsdGlwbGVcIiwgXCJ1cGxvYWRwcm9ncmVzc1wiLCBcInRvdGFsdXBsb2FkcHJvZ3Jlc3NcIiwgXCJzZW5kaW5nXCIsIFwic2VuZGluZ211bHRpcGxlXCIsIFwic3VjY2Vzc1wiLCBcInN1Y2Nlc3NtdWx0aXBsZVwiLCBcImNhbmNlbGVkXCIsIFwiY2FuY2VsZWRtdWx0aXBsZVwiLCBcImNvbXBsZXRlXCIsIFwiY29tcGxldGVtdWx0aXBsZVwiLCBcInJlc2V0XCIsIFwibWF4ZmlsZXNleGNlZWRlZFwiLCBcIm1heGZpbGVzcmVhY2hlZFwiLCBcInF1ZXVlY29tcGxldGVcIl07XG5cbiAgICAgIHRoaXMucHJvdG90eXBlLmRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICAvKipcbiAgICAgICAgICogSGFzIHRvIGJlIHNwZWNpZmllZCBvbiBlbGVtZW50cyBvdGhlciB0aGFuIGZvcm0gKG9yIHdoZW4gdGhlIGZvcm1cbiAgICAgICAgICogZG9lc24ndCBoYXZlIGFuIGBhY3Rpb25gIGF0dHJpYnV0ZSkuIFlvdSBjYW4gYWxzb1xuICAgICAgICAgKiBwcm92aWRlIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aXRoIGBmaWxlc2AgYW5kXG4gICAgICAgICAqIG11c3QgcmV0dXJuIHRoZSB1cmwgKHNpbmNlIGB2My4xMi4wYClcbiAgICAgICAgICovXG4gICAgICAgIHVybDogbnVsbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FuIGJlIGNoYW5nZWQgdG8gYFwicHV0XCJgIGlmIG5lY2Vzc2FyeS4gWW91IGNhbiBhbHNvIHByb3ZpZGUgYSBmdW5jdGlvblxuICAgICAgICAgKiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdpdGggYGZpbGVzYCBhbmQgbXVzdCByZXR1cm4gdGhlIG1ldGhvZCAoc2luY2UgYHYzLjEyLjBgKS5cbiAgICAgICAgICovXG4gICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdpbGwgYmUgc2V0IG9uIHRoZSBYSFJlcXVlc3QuXG4gICAgICAgICAqL1xuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdGltZW91dCBmb3IgdGhlIFhIUiByZXF1ZXN0cyBpbiBtaWxsaXNlY29uZHMgKHNpbmNlIGB2NC40LjBgKS5cbiAgICAgICAgICovXG4gICAgICAgIHRpbWVvdXQ6IDMwMDAwLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIb3cgbWFueSBmaWxlIHVwbG9hZHMgdG8gcHJvY2VzcyBpbiBwYXJhbGxlbCAoU2VlIHRoZVxuICAgICAgICAgKiBFbnF1ZXVpbmcgZmlsZSB1cGxvYWRzKiBkb2N1bWVudGF0aW9uIHNlY3Rpb24gZm9yIG1vcmUgaW5mbylcbiAgICAgICAgICovXG4gICAgICAgIHBhcmFsbGVsVXBsb2FkczogMixcblxuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0byBzZW5kIG11bHRpcGxlIGZpbGVzIGluIG9uZSByZXF1ZXN0LiBJZlxuICAgICAgICAgKiB0aGlzIGl0IHNldCB0byB0cnVlLCB0aGVuIHRoZSBmYWxsYmFjayBmaWxlIGlucHV0IGVsZW1lbnQgd2lsbFxuICAgICAgICAgKiBoYXZlIHRoZSBgbXVsdGlwbGVgIGF0dHJpYnV0ZSBhcyB3ZWxsLiBUaGlzIG9wdGlvbiB3aWxsXG4gICAgICAgICAqIGFsc28gdHJpZ2dlciBhZGRpdGlvbmFsIGV2ZW50cyAobGlrZSBgcHJvY2Vzc2luZ211bHRpcGxlYCkuIFNlZSB0aGUgZXZlbnRzXG4gICAgICAgICAqIGRvY3VtZW50YXRpb24gc2VjdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHVwbG9hZE11bHRpcGxlOiBmYWxzZSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB5b3Ugd2FudCBmaWxlcyB0byBiZSB1cGxvYWRlZCBpbiBjaHVua3MgdG8geW91ciBzZXJ2ZXIuIFRoaXMgY2FuJ3QgYmVcbiAgICAgICAgICogdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIGB1cGxvYWRNdWx0aXBsZWAuXG4gICAgICAgICAqXG4gICAgICAgICAqIFNlZSBbY2h1bmtzVXBsb2FkZWRdKCNjb25maWctY2h1bmtzVXBsb2FkZWQpIGZvciB0aGUgY2FsbGJhY2sgdG8gZmluYWxpc2UgYW4gdXBsb2FkLlxuICAgICAgICAgKi9cbiAgICAgICAgY2h1bmtpbmc6IGZhbHNlLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBgY2h1bmtpbmdgIGlzIGVuYWJsZWQsIHRoaXMgZGVmaW5lcyB3aGV0aGVyICoqZXZlcnkqKiBmaWxlIHNob3VsZCBiZSBjaHVua2VkLFxuICAgICAgICAgKiBldmVuIGlmIHRoZSBmaWxlIHNpemUgaXMgYmVsb3cgY2h1bmtTaXplLiBUaGlzIG1lYW5zLCB0aGF0IHRoZSBhZGRpdGlvbmFsIGNodW5rXG4gICAgICAgICAqIGZvcm0gZGF0YSB3aWxsIGJlIHN1Ym1pdHRlZCBhbmQgdGhlIGBjaHVua3NVcGxvYWRlZGAgY2FsbGJhY2sgd2lsbCBiZSBpbnZva2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgZm9yY2VDaHVua2luZzogZmFsc2UsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGBjaHVua2luZ2AgaXMgYHRydWVgLCB0aGVuIHRoaXMgZGVmaW5lcyB0aGUgY2h1bmsgc2l6ZSBpbiBieXRlcy5cbiAgICAgICAgICovXG4gICAgICAgIGNodW5rU2l6ZTogMjAwMDAwMCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYHRydWVgLCB0aGUgaW5kaXZpZHVhbCBjaHVua3Mgb2YgYSBmaWxlIGFyZSBiZWluZyB1cGxvYWRlZCBzaW11bHRhbmVvdXNseS5cbiAgICAgICAgICovXG4gICAgICAgIHBhcmFsbGVsQ2h1bmtVcGxvYWRzOiBmYWxzZSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciBhIGNodW5rIHNob3VsZCBiZSByZXRyaWVkIGlmIGl0IGZhaWxzLlxuICAgICAgICAgKi9cbiAgICAgICAgcmV0cnlDaHVua3M6IGZhbHNlLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBgcmV0cnlDaHVua3NgIGlzIHRydWUsIGhvdyBtYW55IHRpbWVzIHNob3VsZCBpdCBiZSByZXRyaWVkLlxuICAgICAgICAgKi9cbiAgICAgICAgcmV0cnlDaHVua3NMaW1pdDogMyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgbm90IGBudWxsYCBkZWZpbmVzIGhvdyBtYW55IGZpbGVzIHRoaXMgRHJvcHpvbmUgaGFuZGxlcy4gSWYgaXQgZXhjZWVkcyxcbiAgICAgICAgICogdGhlIGV2ZW50IGBtYXhmaWxlc2V4Y2VlZGVkYCB3aWxsIGJlIGNhbGxlZC4gVGhlIGRyb3B6b25lIGVsZW1lbnQgZ2V0cyB0aGVcbiAgICAgICAgICogY2xhc3MgYGR6LW1heC1maWxlcy1yZWFjaGVkYCBhY2NvcmRpbmdseSBzbyB5b3UgY2FuIHByb3ZpZGUgdmlzdWFsIGZlZWRiYWNrLlxuICAgICAgICAgKi9cbiAgICAgICAgbWF4RmlsZXNpemU6IDI1NixcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG5hbWUgb2YgdGhlIGZpbGUgcGFyYW0gdGhhdCBnZXRzIHRyYW5zZmVycmVkLlxuICAgICAgICAgKiAqKk5PVEUqKjogSWYgeW91IGhhdmUgdGhlIG9wdGlvbiAgYHVwbG9hZE11bHRpcGxlYCBzZXQgdG8gYHRydWVgLCB0aGVuXG4gICAgICAgICAqIERyb3B6b25lIHdpbGwgYXBwZW5kIGBbXWAgdG8gdGhlIG5hbWUuXG4gICAgICAgICAqL1xuICAgICAgICBwYXJhbU5hbWU6IFwiZmlsZVwiLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGV0aGVyIHRodW1ibmFpbHMgZm9yIGltYWdlcyBzaG91bGQgYmUgZ2VuZXJhdGVkXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVJbWFnZVRodW1ibmFpbHM6IHRydWUsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluIE1CLiBXaGVuIHRoZSBmaWxlbmFtZSBleGNlZWRzIHRoaXMgbGltaXQsIHRoZSB0aHVtYm5haWwgd2lsbCBub3QgYmUgZ2VuZXJhdGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgbWF4VGh1bWJuYWlsRmlsZXNpemU6IDEwLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBgbnVsbGAsIHRoZSByYXRpbyBvZiB0aGUgaW1hZ2Ugd2lsbCBiZSB1c2VkIHRvIGNhbGN1bGF0ZSBpdC5cbiAgICAgICAgICovXG4gICAgICAgIHRodW1ibmFpbFdpZHRoOiAxMjAsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzYW1lIGFzIGB0aHVtYm5haWxXaWR0aGAuIElmIGJvdGggYXJlIG51bGwsIGltYWdlcyB3aWxsIG5vdCBiZSByZXNpemVkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGh1bWJuYWlsSGVpZ2h0OiAxMjAsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhvdyB0aGUgaW1hZ2VzIHNob3VsZCBiZSBzY2FsZWQgZG93biBpbiBjYXNlIGJvdGgsIGB0aHVtYm5haWxXaWR0aGAgYW5kIGB0aHVtYm5haWxIZWlnaHRgIGFyZSBwcm92aWRlZC5cbiAgICAgICAgICogQ2FuIGJlIGVpdGhlciBgY29udGFpbmAgb3IgYGNyb3BgLlxuICAgICAgICAgKi9cbiAgICAgICAgdGh1bWJuYWlsTWV0aG9kOiAnY3JvcCcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHNldCwgaW1hZ2VzIHdpbGwgYmUgcmVzaXplZCB0byB0aGVzZSBkaW1lbnNpb25zIGJlZm9yZSBiZWluZyAqKnVwbG9hZGVkKiouXG4gICAgICAgICAqIElmIG9ubHkgb25lLCBgcmVzaXplV2lkdGhgICoqb3IqKiBgcmVzaXplSGVpZ2h0YCBpcyBwcm92aWRlZCwgdGhlIG9yaWdpbmFsIGFzcGVjdFxuICAgICAgICAgKiByYXRpbyBvZiB0aGUgZmlsZSB3aWxsIGJlIHByZXNlcnZlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIGBvcHRpb25zLnRyYW5zZm9ybUZpbGVgIGZ1bmN0aW9uIHVzZXMgdGhlc2Ugb3B0aW9ucywgc28gaWYgdGhlIGB0cmFuc2Zvcm1GaWxlYCBmdW5jdGlvblxuICAgICAgICAgKiBpcyBvdmVycmlkZGVuLCB0aGVzZSBvcHRpb25zIGRvbid0IGRvIGFueXRoaW5nLlxuICAgICAgICAgKi9cbiAgICAgICAgcmVzaXplV2lkdGg6IG51bGwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlZSBgcmVzaXplV2lkdGhgLlxuICAgICAgICAgKi9cbiAgICAgICAgcmVzaXplSGVpZ2h0OiBudWxsLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbWltZSB0eXBlIG9mIHRoZSByZXNpemVkIGltYWdlIChiZWZvcmUgaXQgZ2V0cyB1cGxvYWRlZCB0byB0aGUgc2VydmVyKS5cbiAgICAgICAgICogSWYgYG51bGxgIHRoZSBvcmlnaW5hbCBtaW1lIHR5cGUgd2lsbCBiZSB1c2VkLiBUbyBmb3JjZSBqcGVnLCBmb3IgZXhhbXBsZSwgdXNlIGBpbWFnZS9qcGVnYC5cbiAgICAgICAgICogU2VlIGByZXNpemVXaWR0aGAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICByZXNpemVNaW1lVHlwZTogbnVsbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHF1YWxpdHkgb2YgdGhlIHJlc2l6ZWQgaW1hZ2VzLiBTZWUgYHJlc2l6ZVdpZHRoYC5cbiAgICAgICAgICovXG4gICAgICAgIHJlc2l6ZVF1YWxpdHk6IDAuOCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSG93IHRoZSBpbWFnZXMgc2hvdWxkIGJlIHNjYWxlZCBkb3duIGluIGNhc2UgYm90aCwgYHJlc2l6ZVdpZHRoYCBhbmQgYHJlc2l6ZUhlaWdodGAgYXJlIHByb3ZpZGVkLlxuICAgICAgICAgKiBDYW4gYmUgZWl0aGVyIGBjb250YWluYCBvciBgY3JvcGAuXG4gICAgICAgICAqL1xuICAgICAgICByZXNpemVNZXRob2Q6ICdjb250YWluJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGJhc2UgdGhhdCBpcyB1c2VkIHRvIGNhbGN1bGF0ZSB0aGUgZmlsZXNpemUuIFlvdSBjYW4gY2hhbmdlIHRoaXMgdG9cbiAgICAgICAgICogMTAyNCBpZiB5b3Ugd291bGQgcmF0aGVyIGRpc3BsYXkga2liaWJ5dGVzLCBtZWJpYnl0ZXMsIGV0Yy4uLlxuICAgICAgICAgKiAxMDI0IGlzIHRlY2huaWNhbGx5IGluY29ycmVjdCwgYmVjYXVzZSBgMTAyNCBieXRlc2AgYXJlIGAxIGtpYmlieXRlYCBub3QgYDEga2lsb2J5dGVgLlxuICAgICAgICAgKiBZb3UgY2FuIGNoYW5nZSB0aGlzIHRvIGAxMDI0YCBpZiB5b3UgZG9uJ3QgY2FyZSBhYm91dCB2YWxpZGl0eS5cbiAgICAgICAgICovXG4gICAgICAgIGZpbGVzaXplQmFzZTogMTAwMCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FuIGJlIHVzZWQgdG8gbGltaXQgdGhlIG1heGltdW0gbnVtYmVyIG9mIGZpbGVzIHRoYXQgd2lsbCBiZSBoYW5kbGVkIGJ5IHRoaXMgRHJvcHpvbmVcbiAgICAgICAgICovXG4gICAgICAgIG1heEZpbGVzOiBudWxsLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbiBvcHRpb25hbCBvYmplY3QgdG8gc2VuZCBhZGRpdGlvbmFsIGhlYWRlcnMgdG8gdGhlIHNlcnZlci4gRWc6XG4gICAgICAgICAqIGB7IFwiTXktQXdlc29tZS1IZWFkZXJcIjogXCJoZWFkZXIgdmFsdWVcIiB9YFxuICAgICAgICAgKi9cbiAgICAgICAgaGVhZGVyczogbnVsbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYHRydWVgLCB0aGUgZHJvcHpvbmUgZWxlbWVudCBpdHNlbGYgd2lsbCBiZSBjbGlja2FibGUsIGlmIGBmYWxzZWBcbiAgICAgICAgICogbm90aGluZyB3aWxsIGJlIGNsaWNrYWJsZS5cbiAgICAgICAgICpcbiAgICAgICAgICogWW91IGNhbiBhbHNvIHBhc3MgYW4gSFRNTCBlbGVtZW50LCBhIENTUyBzZWxlY3RvciAoZm9yIG11bHRpcGxlIGVsZW1lbnRzKVxuICAgICAgICAgKiBvciBhbiBhcnJheSBvZiB0aG9zZS4gSW4gdGhhdCBjYXNlLCBhbGwgb2YgdGhvc2UgZWxlbWVudHMgd2lsbCB0cmlnZ2VyIGFuXG4gICAgICAgICAqIHVwbG9hZCB3aGVuIGNsaWNrZWQuXG4gICAgICAgICAqL1xuICAgICAgICBjbGlja2FibGU6IHRydWUsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZXRoZXIgaGlkZGVuIGZpbGVzIGluIGRpcmVjdG9yaWVzIHNob3VsZCBiZSBpZ25vcmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgaWdub3JlSGlkZGVuRmlsZXM6IHRydWUsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGBhY2NlcHRgIGNoZWNrcyB0aGUgZmlsZSdzIG1pbWUgdHlwZSBvclxuICAgICAgICAgKiBleHRlbnNpb24gYWdhaW5zdCB0aGlzIGxpc3QuIFRoaXMgaXMgYSBjb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBtaW1lXG4gICAgICAgICAqIHR5cGVzIG9yIGZpbGUgZXh0ZW5zaW9ucy5cbiAgICAgICAgICpcbiAgICAgICAgICogRWcuOiBgaW1hZ2UvKixhcHBsaWNhdGlvbi9wZGYsLnBzZGBcbiAgICAgICAgICpcbiAgICAgICAgICogSWYgdGhlIERyb3B6b25lIGlzIGBjbGlja2FibGVgIHRoaXMgb3B0aW9uIHdpbGwgYWxzbyBiZSB1c2VkIGFzXG4gICAgICAgICAqIFtgYWNjZXB0YF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9IVE1ML0VsZW1lbnQvaW5wdXQjYXR0ci1hY2NlcHQpXG4gICAgICAgICAqIHBhcmFtZXRlciBvbiB0aGUgaGlkZGVuIGZpbGUgaW5wdXQgYXMgd2VsbC5cbiAgICAgICAgICovXG4gICAgICAgIGFjY2VwdGVkRmlsZXM6IG51bGwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICoqRGVwcmVjYXRlZCEqKlxuICAgICAgICAgKiBVc2UgYWNjZXB0ZWRGaWxlcyBpbnN0ZWFkLlxuICAgICAgICAgKi9cbiAgICAgICAgYWNjZXB0ZWRNaW1lVHlwZXM6IG51bGwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGZhbHNlLCBmaWxlcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBxdWV1ZSBidXQgdGhlIHF1ZXVlIHdpbGwgbm90IGJlXG4gICAgICAgICAqIHByb2Nlc3NlZCBhdXRvbWF0aWNhbGx5LlxuICAgICAgICAgKiBUaGlzIGNhbiBiZSB1c2VmdWwgaWYgeW91IG5lZWQgc29tZSBhZGRpdGlvbmFsIHVzZXIgaW5wdXQgYmVmb3JlIHNlbmRpbmdcbiAgICAgICAgICogZmlsZXMgKG9yIGlmIHlvdSB3YW50IHdhbnQgYWxsIGZpbGVzIHNlbnQgYXQgb25jZSkuXG4gICAgICAgICAqIElmIHlvdSdyZSByZWFkeSB0byBzZW5kIHRoZSBmaWxlIHNpbXBseSBjYWxsIGBteURyb3B6b25lLnByb2Nlc3NRdWV1ZSgpYC5cbiAgICAgICAgICpcbiAgICAgICAgICogU2VlIHRoZSBbZW5xdWV1aW5nIGZpbGUgdXBsb2Fkc10oI2VucXVldWluZy1maWxlLXVwbG9hZHMpIGRvY3VtZW50YXRpb25cbiAgICAgICAgICogc2VjdGlvbiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIGF1dG9Qcm9jZXNzUXVldWU6IHRydWUsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGZhbHNlLCBmaWxlcyBhZGRlZCB0byB0aGUgZHJvcHpvbmUgd2lsbCBub3QgYmUgcXVldWVkIGJ5IGRlZmF1bHQuXG4gICAgICAgICAqIFlvdSdsbCBoYXZlIHRvIGNhbGwgYGVucXVldWVGaWxlKGZpbGUpYCBtYW51YWxseS5cbiAgICAgICAgICovXG4gICAgICAgIGF1dG9RdWV1ZTogdHJ1ZSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYHRydWVgLCB0aGlzIHdpbGwgYWRkIGEgbGluayB0byBldmVyeSBmaWxlIHByZXZpZXcgdG8gcmVtb3ZlIG9yIGNhbmNlbCAoaWZcbiAgICAgICAgICogYWxyZWFkeSB1cGxvYWRpbmcpIHRoZSBmaWxlLiBUaGUgYGRpY3RDYW5jZWxVcGxvYWRgLCBgZGljdENhbmNlbFVwbG9hZENvbmZpcm1hdGlvbmBcbiAgICAgICAgICogYW5kIGBkaWN0UmVtb3ZlRmlsZWAgb3B0aW9ucyBhcmUgdXNlZCBmb3IgdGhlIHdvcmRpbmcuXG4gICAgICAgICAqL1xuICAgICAgICBhZGRSZW1vdmVMaW5rczogZmFsc2UsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZXMgd2hlcmUgdG8gZGlzcGxheSB0aGUgZmlsZSBwcmV2aWV3cyDigJMgaWYgYG51bGxgIHRoZVxuICAgICAgICAgKiBEcm9wem9uZSBlbGVtZW50IGl0c2VsZiBpcyB1c2VkLiBDYW4gYmUgYSBwbGFpbiBgSFRNTEVsZW1lbnRgIG9yIGEgQ1NTXG4gICAgICAgICAqIHNlbGVjdG9yLiBUaGUgZWxlbWVudCBzaG91bGQgaGF2ZSB0aGUgYGRyb3B6b25lLXByZXZpZXdzYCBjbGFzcyBzb1xuICAgICAgICAgKiB0aGUgcHJldmlld3MgYXJlIGRpc3BsYXllZCBwcm9wZXJseS5cbiAgICAgICAgICovXG4gICAgICAgIHByZXZpZXdzQ29udGFpbmVyOiBudWxsLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGlzIHRoZSBlbGVtZW50IHRoZSBoaWRkZW4gaW5wdXQgZmllbGQgKHdoaWNoIGlzIHVzZWQgd2hlbiBjbGlja2luZyBvbiB0aGVcbiAgICAgICAgICogZHJvcHpvbmUgdG8gdHJpZ2dlciBmaWxlIHNlbGVjdGlvbikgd2lsbCBiZSBhcHBlbmRlZCB0by4gVGhpcyBtaWdodFxuICAgICAgICAgKiBiZSBpbXBvcnRhbnQgaW4gY2FzZSB5b3UgdXNlIGZyYW1ld29ya3MgdG8gc3dpdGNoIHRoZSBjb250ZW50IG9mIHlvdXIgcGFnZS5cbiAgICAgICAgICovXG4gICAgICAgIGhpZGRlbklucHV0Q29udGFpbmVyOiBcImJvZHlcIixcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgbnVsbCwgbm8gY2FwdHVyZSB0eXBlIHdpbGwgYmUgc3BlY2lmaWVkXG4gICAgICAgICAqIElmIGNhbWVyYSwgbW9iaWxlIGRldmljZXMgd2lsbCBza2lwIHRoZSBmaWxlIHNlbGVjdGlvbiBhbmQgY2hvb3NlIGNhbWVyYVxuICAgICAgICAgKiBJZiBtaWNyb3Bob25lLCBtb2JpbGUgZGV2aWNlcyB3aWxsIHNraXAgdGhlIGZpbGUgc2VsZWN0aW9uIGFuZCBjaG9vc2UgdGhlIG1pY3JvcGhvbmVcbiAgICAgICAgICogSWYgY2FtY29yZGVyLCBtb2JpbGUgZGV2aWNlcyB3aWxsIHNraXAgdGhlIGZpbGUgc2VsZWN0aW9uIGFuZCBjaG9vc2UgdGhlIGNhbWVyYSBpbiB2aWRlbyBtb2RlXG4gICAgICAgICAqIE9uIGFwcGxlIGRldmljZXMgbXVsdGlwbGUgbXVzdCBiZSBzZXQgdG8gZmFsc2UuICBBY2NlcHRlZEZpbGVzIG1heSBuZWVkIHRvXG4gICAgICAgICAqIGJlIHNldCB0byBhbiBhcHByb3ByaWF0ZSBtaW1lIHR5cGUgKGUuZy4gXCJpbWFnZS8qXCIsIFwiYXVkaW8vKlwiLCBvciBcInZpZGVvLypcIikuXG4gICAgICAgICAqL1xuICAgICAgICBjYXB0dXJlOiBudWxsLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAqKkRlcHJlY2F0ZWQqKi4gVXNlIGByZW5hbWVGaWxlYCBpbnN0ZWFkLlxuICAgICAgICAgKi9cbiAgICAgICAgcmVuYW1lRmlsZW5hbWU6IG51bGwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgZnVuY3Rpb24gdGhhdCBpcyBpbnZva2VkIGJlZm9yZSB0aGUgZmlsZSBpcyB1cGxvYWRlZCB0byB0aGUgc2VydmVyIGFuZCByZW5hbWVzIHRoZSBmaWxlLlxuICAgICAgICAgKiBUaGlzIGZ1bmN0aW9uIGdldHMgdGhlIGBGaWxlYCBhcyBhcmd1bWVudCBhbmQgY2FuIHVzZSB0aGUgYGZpbGUubmFtZWAuIFRoZSBhY3R1YWwgbmFtZSBvZiB0aGVcbiAgICAgICAgICogZmlsZSB0aGF0IGdldHMgdXNlZCBkdXJpbmcgdGhlIHVwbG9hZCBjYW4gYmUgYWNjZXNzZWQgdGhyb3VnaCBgZmlsZS51cGxvYWQuZmlsZW5hbWVgLlxuICAgICAgICAgKi9cbiAgICAgICAgcmVuYW1lRmlsZTogbnVsbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYHRydWVgIHRoZSBmYWxsYmFjayB3aWxsIGJlIGZvcmNlZC4gVGhpcyBpcyB2ZXJ5IHVzZWZ1bCB0byB0ZXN0IHlvdXIgc2VydmVyXG4gICAgICAgICAqIGltcGxlbWVudGF0aW9ucyBmaXJzdCBhbmQgbWFrZSBzdXJlIHRoYXQgZXZlcnl0aGluZyB3b3JrcyBhc1xuICAgICAgICAgKiBleHBlY3RlZCB3aXRob3V0IGRyb3B6b25lIGlmIHlvdSBleHBlcmllbmNlIHByb2JsZW1zLCBhbmQgdG8gdGVzdFxuICAgICAgICAgKiBob3cgeW91ciBmYWxsYmFja3Mgd2lsbCBsb29rLlxuICAgICAgICAgKi9cbiAgICAgICAgZm9yY2VGYWxsYmFjazogZmFsc2UsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0ZXh0IHVzZWQgYmVmb3JlIGFueSBmaWxlcyBhcmUgZHJvcHBlZC5cbiAgICAgICAgICovXG4gICAgICAgIGRpY3REZWZhdWx0TWVzc2FnZTogXCJEcm9wIGZpbGVzIGhlcmUgdG8gdXBsb2FkXCIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0ZXh0IHRoYXQgcmVwbGFjZXMgdGhlIGRlZmF1bHQgbWVzc2FnZSB0ZXh0IGl0IHRoZSBicm93c2VyIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAgICAgICAqL1xuICAgICAgICBkaWN0RmFsbGJhY2tNZXNzYWdlOiBcIllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGRyYWcnbidkcm9wIGZpbGUgdXBsb2Fkcy5cIixcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHRleHQgdGhhdCB3aWxsIGJlIGFkZGVkIGJlZm9yZSB0aGUgZmFsbGJhY2sgZm9ybS5cbiAgICAgICAgICogSWYgeW91IHByb3ZpZGUgYSAgZmFsbGJhY2sgZWxlbWVudCB5b3Vyc2VsZiwgb3IgaWYgdGhpcyBvcHRpb24gaXMgYG51bGxgIHRoaXMgd2lsbFxuICAgICAgICAgKiBiZSBpZ25vcmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZGljdEZhbGxiYWNrVGV4dDogXCJQbGVhc2UgdXNlIHRoZSBmYWxsYmFjayBmb3JtIGJlbG93IHRvIHVwbG9hZCB5b3VyIGZpbGVzIGxpa2UgaW4gdGhlIG9sZGVuIGRheXMuXCIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHRoZSBmaWxlc2l6ZSBpcyB0b28gYmlnLlxuICAgICAgICAgKiBge3tmaWxlc2l6ZX19YCBhbmQgYHt7bWF4RmlsZXNpemV9fWAgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSByZXNwZWN0aXZlIGNvbmZpZ3VyYXRpb24gdmFsdWVzLlxuICAgICAgICAgKi9cbiAgICAgICAgZGljdEZpbGVUb29CaWc6IFwiRmlsZSBpcyB0b28gYmlnICh7e2ZpbGVzaXplfX1NaUIpLiBNYXggZmlsZXNpemU6IHt7bWF4RmlsZXNpemV9fU1pQi5cIixcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdGhlIGZpbGUgZG9lc24ndCBtYXRjaCB0aGUgZmlsZSB0eXBlLlxuICAgICAgICAgKi9cbiAgICAgICAgZGljdEludmFsaWRGaWxlVHlwZTogXCJZb3UgY2FuJ3QgdXBsb2FkIGZpbGVzIG9mIHRoaXMgdHlwZS5cIixcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdGhlIHNlcnZlciByZXNwb25zZSB3YXMgaW52YWxpZC5cbiAgICAgICAgICogYHt7c3RhdHVzQ29kZX19YCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIHNlcnZlcnMgc3RhdHVzIGNvZGUuXG4gICAgICAgICAqL1xuICAgICAgICBkaWN0UmVzcG9uc2VFcnJvcjogXCJTZXJ2ZXIgcmVzcG9uZGVkIHdpdGgge3tzdGF0dXNDb2RlfX0gY29kZS5cIixcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgYGFkZFJlbW92ZUxpbmtzYCBpcyB0cnVlLCB0aGUgdGV4dCB0byBiZSB1c2VkIGZvciB0aGUgY2FuY2VsIHVwbG9hZCBsaW5rLlxuICAgICAgICAgKi9cbiAgICAgICAgZGljdENhbmNlbFVwbG9hZDogXCJDYW5jZWwgdXBsb2FkXCIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB0ZXh0IHRoYXQgaXMgZGlzcGxheWVkIGlmIGFuIHVwbG9hZCB3YXMgbWFudWFsbHkgY2FuY2VsZWRcbiAgICAgICAgICovXG4gICAgICAgIGRpY3RVcGxvYWRDYW5jZWxlZDogXCJVcGxvYWQgY2FuY2VsZWQuXCIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGBhZGRSZW1vdmVMaW5rc2AgaXMgdHJ1ZSwgdGhlIHRleHQgdG8gYmUgdXNlZCBmb3IgY29uZmlybWF0aW9uIHdoZW4gY2FuY2VsbGluZyB1cGxvYWQuXG4gICAgICAgICAqL1xuICAgICAgICBkaWN0Q2FuY2VsVXBsb2FkQ29uZmlybWF0aW9uOiBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjYW5jZWwgdGhpcyB1cGxvYWQ/XCIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIGBhZGRSZW1vdmVMaW5rc2AgaXMgdHJ1ZSwgdGhlIHRleHQgdG8gYmUgdXNlZCB0byByZW1vdmUgYSBmaWxlLlxuICAgICAgICAgKi9cbiAgICAgICAgZGljdFJlbW92ZUZpbGU6IFwiUmVtb3ZlIGZpbGVcIixcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdGhpcyBpcyBub3QgbnVsbCwgdGhlbiB0aGUgdXNlciB3aWxsIGJlIHByb21wdGVkIGJlZm9yZSByZW1vdmluZyBhIGZpbGUuXG4gICAgICAgICAqL1xuICAgICAgICBkaWN0UmVtb3ZlRmlsZUNvbmZpcm1hdGlvbjogbnVsbCxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzcGxheWVkIGlmIGBtYXhGaWxlc2AgaXMgc3QgYW5kIGV4Y2VlZGVkLlxuICAgICAgICAgKiBUaGUgc3RyaW5nIGB7e21heEZpbGVzfX1gIHdpbGwgYmUgcmVwbGFjZWQgYnkgdGhlIGNvbmZpZ3VyYXRpb24gdmFsdWUuXG4gICAgICAgICAqL1xuICAgICAgICBkaWN0TWF4RmlsZXNFeGNlZWRlZDogXCJZb3UgY2FuIG5vdCB1cGxvYWQgYW55IG1vcmUgZmlsZXMuXCIsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFsbG93cyB5b3UgdG8gdHJhbnNsYXRlIHRoZSBkaWZmZXJlbnQgdW5pdHMuIFN0YXJ0aW5nIHdpdGggYHRiYCBmb3IgdGVyYWJ5dGVzIGFuZCBnb2luZyBkb3duIHRvXG4gICAgICAgICAqIGBiYCBmb3IgYnl0ZXMuXG4gICAgICAgICAqL1xuICAgICAgICBkaWN0RmlsZVNpemVVbml0czogeyB0YjogXCJUQlwiLCBnYjogXCJHQlwiLCBtYjogXCJNQlwiLCBrYjogXCJLQlwiLCBiOiBcImJcIiB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FsbGVkIHdoZW4gZHJvcHpvbmUgaW5pdGlhbGl6ZWRcbiAgICAgICAgICogWW91IGNhbiBhZGQgZXZlbnQgbGlzdGVuZXJzIGhlcmVcbiAgICAgICAgICovXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7fSxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYW4gYmUgYW4gKipvYmplY3QqKiBvZiBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgdG8gdHJhbnNmZXIgdG8gdGhlIHNlcnZlciwgKipvcioqIGEgYEZ1bmN0aW9uYFxuICAgICAgICAgKiB0aGF0IGdldHMgaW52b2tlZCB3aXRoIHRoZSBgZmlsZXNgLCBgeGhyYCBhbmQsIGlmIGl0J3MgYSBjaHVua2VkIHVwbG9hZCwgYGNodW5rYCBhcmd1bWVudHMuIEluIGNhc2VcbiAgICAgICAgICogb2YgYSBmdW5jdGlvbiwgdGhpcyBuZWVkcyB0byByZXR1cm4gYSBtYXAuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGRvZXMgbm90aGluZyBmb3Igbm9ybWFsIHVwbG9hZHMsIGJ1dCBhZGRzIHJlbGV2YW50IGluZm9ybWF0aW9uIGZvclxuICAgICAgICAgKiBjaHVua2VkIHVwbG9hZHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoaXMgaXMgdGhlIHNhbWUgYXMgYWRkaW5nIGhpZGRlbiBpbnB1dCBmaWVsZHMgaW4gdGhlIGZvcm0gZWxlbWVudC5cbiAgICAgICAgICovXG4gICAgICAgIHBhcmFtczogZnVuY3Rpb24gcGFyYW1zKGZpbGVzLCB4aHIsIGNodW5rKSB7XG4gICAgICAgICAgaWYgKGNodW5rKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBkenV1aWQ6IGNodW5rLmZpbGUudXBsb2FkLnV1aWQsXG4gICAgICAgICAgICAgIGR6Y2h1bmtpbmRleDogY2h1bmsuaW5kZXgsXG4gICAgICAgICAgICAgIGR6dG90YWxmaWxlc2l6ZTogY2h1bmsuZmlsZS5zaXplLFxuICAgICAgICAgICAgICBkemNodW5rc2l6ZTogdGhpcy5vcHRpb25zLmNodW5rU2l6ZSxcbiAgICAgICAgICAgICAgZHp0b3RhbGNodW5rY291bnQ6IGNodW5rLmZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudCxcbiAgICAgICAgICAgICAgZHpjaHVua2J5dGVvZmZzZXQ6IGNodW5rLmluZGV4ICogdGhpcy5vcHRpb25zLmNodW5rU2l6ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQSBmdW5jdGlvbiB0aGF0IGdldHMgYSBbZmlsZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9ET00vRmlsZSlcbiAgICAgICAgICogYW5kIGEgYGRvbmVgIGZ1bmN0aW9uIGFzIHBhcmFtZXRlcnMuXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIHRoZSBkb25lIGZ1bmN0aW9uIGlzIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIHRoZSBmaWxlIGlzIFwiYWNjZXB0ZWRcIiBhbmQgd2lsbFxuICAgICAgICAgKiBiZSBwcm9jZXNzZWQuIElmIHlvdSBwYXNzIGFuIGVycm9yIG1lc3NhZ2UsIHRoZSBmaWxlIGlzIHJlamVjdGVkLCBhbmQgdGhlIGVycm9yXG4gICAgICAgICAqIG1lc3NhZ2Ugd2lsbCBiZSBkaXNwbGF5ZWQuXG4gICAgICAgICAqIFRoaXMgZnVuY3Rpb24gd2lsbCBub3QgYmUgY2FsbGVkIGlmIHRoZSBmaWxlIGlzIHRvbyBiaWcgb3IgZG9lc24ndCBtYXRjaCB0aGUgbWltZSB0eXBlcy5cbiAgICAgICAgICovXG4gICAgICAgIGFjY2VwdDogZnVuY3Rpb24gYWNjZXB0KGZpbGUsIGRvbmUpIHtcbiAgICAgICAgICByZXR1cm4gZG9uZSgpO1xuICAgICAgICB9LFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIGFsbCBjaHVua3MgaGF2ZSBiZWVuIHVwbG9hZGVkIGZvciBhIGZpbGUuXG4gICAgICAgICAqIEl0IGdldHMgdGhlIGZpbGUgZm9yIHdoaWNoIHRoZSBjaHVua3MgaGF2ZSBiZWVuIHVwbG9hZGVkIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsXG4gICAgICAgICAqIGFuZCB0aGUgYGRvbmVgIGZ1bmN0aW9uIGFzIHNlY29uZC4gYGRvbmUoKWAgbmVlZHMgdG8gYmUgaW52b2tlZCB3aGVuIGV2ZXJ5dGhpbmdcbiAgICAgICAgICogbmVlZGVkIHRvIGZpbmlzaCB0aGUgdXBsb2FkIHByb2Nlc3MgaXMgZG9uZS5cbiAgICAgICAgICovXG4gICAgICAgIGNodW5rc1VwbG9hZGVkOiBmdW5jdGlvbiBjaHVua3NVcGxvYWRlZChmaWxlLCBkb25lKSB7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIGNhbGxlZCB3aGVuIHRoZSBicm93c2VyIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAgICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHNob3dzIHRoZSBmYWxsYmFjayBpbnB1dCBmaWVsZCBhbmQgYWRkc1xuICAgICAgICAgKiBhIHRleHQuXG4gICAgICAgICAqL1xuICAgICAgICBmYWxsYmFjazogZnVuY3Rpb24gZmFsbGJhY2soKSB7XG4gICAgICAgICAgLy8gVGhpcyBjb2RlIHNob3VsZCBwYXNzIGluIElFNy4uLiA6KFxuICAgICAgICAgIHZhciBtZXNzYWdlRWxlbWVudCA9IHZvaWQgMDtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lID0gdGhpcy5lbGVtZW50LmNsYXNzTmFtZSArIFwiIGR6LWJyb3dzZXItbm90LXN1cHBvcnRlZFwiO1xuXG4gICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHRoaXMuZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImRpdlwiKSwgX2lzQXJyYXkyID0gdHJ1ZSwgX2kyID0gMCwgX2l0ZXJhdG9yMiA9IF9pc0FycmF5MiA/IF9pdGVyYXRvcjIgOiBfaXRlcmF0b3IyW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICB2YXIgX3JlZjI7XG5cbiAgICAgICAgICAgIGlmIChfaXNBcnJheTIpIHtcbiAgICAgICAgICAgICAgaWYgKF9pMiA+PSBfaXRlcmF0b3IyLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgIF9yZWYyID0gX2l0ZXJhdG9yMltfaTIrK107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfaTIgPSBfaXRlcmF0b3IyLm5leHQoKTtcbiAgICAgICAgICAgICAgaWYgKF9pMi5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgX3JlZjIgPSBfaTIudmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjaGlsZCA9IF9yZWYyO1xuXG4gICAgICAgICAgICBpZiAoLyhefCApZHotbWVzc2FnZSgkfCApLy50ZXN0KGNoaWxkLmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQgPSBjaGlsZDtcbiAgICAgICAgICAgICAgY2hpbGQuY2xhc3NOYW1lID0gXCJkei1tZXNzYWdlXCI7IC8vIFJlbW92ZXMgdGhlICdkei1kZWZhdWx0JyBjbGFzc1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFtZXNzYWdlRWxlbWVudCkge1xuICAgICAgICAgICAgbWVzc2FnZUVsZW1lbnQgPSBEcm9wem9uZS5jcmVhdGVFbGVtZW50KFwiPGRpdiBjbGFzcz1cXFwiZHotbWVzc2FnZVxcXCI+PHNwYW4+PC9zcGFuPjwvZGl2PlwiKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlRWxlbWVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHNwYW4gPSBtZXNzYWdlRWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNwYW5cIilbMF07XG4gICAgICAgICAgaWYgKHNwYW4pIHtcbiAgICAgICAgICAgIGlmIChzcGFuLnRleHRDb250ZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IHRoaXMub3B0aW9ucy5kaWN0RmFsbGJhY2tNZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzcGFuLmlubmVyVGV4dCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHNwYW4uaW5uZXJUZXh0ID0gdGhpcy5vcHRpb25zLmRpY3RGYWxsYmFja01lc3NhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmdldEZhbGxiYWNrRm9ybSgpKTtcbiAgICAgICAgfSxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIGNhbGxlZCB0byBjYWxjdWxhdGUgdGhlIHRodW1ibmFpbCBkaW1lbnNpb25zLlxuICAgICAgICAgKlxuICAgICAgICAgKiBJdCBnZXRzIGBmaWxlYCwgYHdpZHRoYCBhbmQgYGhlaWdodGAgKGJvdGggbWF5IGJlIGBudWxsYCkgYXMgcGFyYW1ldGVycyBhbmQgbXVzdCByZXR1cm4gYW4gb2JqZWN0IGNvbnRhaW5pbmc6XG4gICAgICAgICAqXG4gICAgICAgICAqICAtIGBzcmNXaWR0aGAgJiBgc3JjSGVpZ2h0YCAocmVxdWlyZWQpXG4gICAgICAgICAqICAtIGB0cmdXaWR0aGAgJiBgdHJnSGVpZ2h0YCAocmVxdWlyZWQpXG4gICAgICAgICAqICAtIGBzcmNYYCAmIGBzcmNZYCAob3B0aW9uYWwsIGRlZmF1bHQgYDBgKVxuICAgICAgICAgKiAgLSBgdHJnWGAgJiBgdHJnWWAgKG9wdGlvbmFsLCBkZWZhdWx0IGAwYClcbiAgICAgICAgICpcbiAgICAgICAgICogVGhvc2UgdmFsdWVzIGFyZSBnb2luZyB0byBiZSB1c2VkIGJ5IGBjdHguZHJhd0ltYWdlKClgLlxuICAgICAgICAgKi9cbiAgICAgICAgcmVzaXplOiBmdW5jdGlvbiByZXNpemUoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kKSB7XG4gICAgICAgICAgdmFyIGluZm8gPSB7XG4gICAgICAgICAgICBzcmNYOiAwLFxuICAgICAgICAgICAgc3JjWTogMCxcbiAgICAgICAgICAgIHNyY1dpZHRoOiBmaWxlLndpZHRoLFxuICAgICAgICAgICAgc3JjSGVpZ2h0OiBmaWxlLmhlaWdodFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YXIgc3JjUmF0aW8gPSBmaWxlLndpZHRoIC8gZmlsZS5oZWlnaHQ7XG5cbiAgICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IGNhbGN1bGF0ZSBkaW1lbnNpb25zIGlmIG5vdCBzcGVjaWZpZWRcbiAgICAgICAgICBpZiAod2lkdGggPT0gbnVsbCAmJiBoZWlnaHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgd2lkdGggPSBpbmZvLnNyY1dpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gaW5mby5zcmNIZWlnaHQ7XG4gICAgICAgICAgfSBlbHNlIGlmICh3aWR0aCA9PSBudWxsKSB7XG4gICAgICAgICAgICB3aWR0aCA9IGhlaWdodCAqIHNyY1JhdGlvO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaGVpZ2h0ID09IG51bGwpIHtcbiAgICAgICAgICAgIGhlaWdodCA9IHdpZHRoIC8gc3JjUmF0aW87XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTWFrZSBzdXJlIGltYWdlcyBhcmVuJ3QgdXBzY2FsZWRcbiAgICAgICAgICB3aWR0aCA9IE1hdGgubWluKHdpZHRoLCBpbmZvLnNyY1dpZHRoKTtcbiAgICAgICAgICBoZWlnaHQgPSBNYXRoLm1pbihoZWlnaHQsIGluZm8uc3JjSGVpZ2h0KTtcblxuICAgICAgICAgIHZhciB0cmdSYXRpbyA9IHdpZHRoIC8gaGVpZ2h0O1xuXG4gICAgICAgICAgaWYgKGluZm8uc3JjV2lkdGggPiB3aWR0aCB8fCBpbmZvLnNyY0hlaWdodCA+IGhlaWdodCkge1xuICAgICAgICAgICAgLy8gSW1hZ2UgaXMgYmlnZ2VyIGFuZCBuZWVkcyByZXNjYWxpbmdcbiAgICAgICAgICAgIGlmIChyZXNpemVNZXRob2QgPT09ICdjcm9wJykge1xuICAgICAgICAgICAgICBpZiAoc3JjUmF0aW8gPiB0cmdSYXRpbykge1xuICAgICAgICAgICAgICAgIGluZm8uc3JjSGVpZ2h0ID0gZmlsZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgaW5mby5zcmNXaWR0aCA9IGluZm8uc3JjSGVpZ2h0ICogdHJnUmF0aW87XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5mby5zcmNXaWR0aCA9IGZpbGUud2lkdGg7XG4gICAgICAgICAgICAgICAgaW5mby5zcmNIZWlnaHQgPSBpbmZvLnNyY1dpZHRoIC8gdHJnUmF0aW87XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzaXplTWV0aG9kID09PSAnY29udGFpbicpIHtcbiAgICAgICAgICAgICAgLy8gTWV0aG9kICdjb250YWluJ1xuICAgICAgICAgICAgICBpZiAoc3JjUmF0aW8gPiB0cmdSYXRpbykge1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IHdpZHRoIC8gc3JjUmF0aW87XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSBoZWlnaHQgKiBzcmNSYXRpbztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biByZXNpemVNZXRob2QgJ1wiICsgcmVzaXplTWV0aG9kICsgXCInXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGluZm8uc3JjWCA9IChmaWxlLndpZHRoIC0gaW5mby5zcmNXaWR0aCkgLyAyO1xuICAgICAgICAgIGluZm8uc3JjWSA9IChmaWxlLmhlaWdodCAtIGluZm8uc3JjSGVpZ2h0KSAvIDI7XG5cbiAgICAgICAgICBpbmZvLnRyZ1dpZHRoID0gd2lkdGg7XG4gICAgICAgICAgaW5mby50cmdIZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgfSxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYW4gYmUgdXNlZCB0byB0cmFuc2Zvcm0gdGhlIGZpbGUgKGZvciBleGFtcGxlLCByZXNpemUgYW4gaW1hZ2UgaWYgbmVjZXNzYXJ5KS5cbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gdXNlcyBgcmVzaXplV2lkdGhgIGFuZCBgcmVzaXplSGVpZ2h0YCAoaWYgcHJvdmlkZWQpIGFuZCByZXNpemVzXG4gICAgICAgICAqIGltYWdlcyBhY2NvcmRpbmcgdG8gdGhvc2UgZGltZW5zaW9ucy5cbiAgICAgICAgICpcbiAgICAgICAgICogR2V0cyB0aGUgYGZpbGVgIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsIGFuZCBhIGBkb25lKClgIGZ1bmN0aW9uIGFzIHRoZSBzZWNvbmQsIHRoYXQgbmVlZHNcbiAgICAgICAgICogdG8gYmUgaW52b2tlZCB3aXRoIHRoZSBmaWxlIHdoZW4gdGhlIHRyYW5zZm9ybWF0aW9uIGlzIGRvbmUuXG4gICAgICAgICAqL1xuICAgICAgICB0cmFuc2Zvcm1GaWxlOiBmdW5jdGlvbiB0cmFuc2Zvcm1GaWxlKGZpbGUsIGRvbmUpIHtcbiAgICAgICAgICBpZiAoKHRoaXMub3B0aW9ucy5yZXNpemVXaWR0aCB8fCB0aGlzLm9wdGlvbnMucmVzaXplSGVpZ2h0KSAmJiBmaWxlLnR5cGUubWF0Y2goL2ltYWdlLiovKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVzaXplSW1hZ2UoZmlsZSwgdGhpcy5vcHRpb25zLnJlc2l6ZVdpZHRoLCB0aGlzLm9wdGlvbnMucmVzaXplSGVpZ2h0LCB0aGlzLm9wdGlvbnMucmVzaXplTWV0aG9kLCBkb25lKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRvbmUoZmlsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgc3RyaW5nIHRoYXQgY29udGFpbnMgdGhlIHRlbXBsYXRlIHVzZWQgZm9yIGVhY2ggZHJvcHBlZFxuICAgICAgICAgKiBmaWxlLiBDaGFuZ2UgaXQgdG8gZnVsZmlsbCB5b3VyIG5lZWRzIGJ1dCBtYWtlIHN1cmUgdG8gcHJvcGVybHlcbiAgICAgICAgICogcHJvdmlkZSBhbGwgZWxlbWVudHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIHlvdSB3YW50IHRvIHVzZSBhbiBhY3R1YWwgSFRNTCBlbGVtZW50IGluc3RlYWQgb2YgcHJvdmlkaW5nIGEgU3RyaW5nXG4gICAgICAgICAqIGFzIGEgY29uZmlnIG9wdGlvbiwgeW91IGNvdWxkIGNyZWF0ZSBhIGRpdiB3aXRoIHRoZSBpZCBgdHBsYCxcbiAgICAgICAgICogcHV0IHRoZSB0ZW1wbGF0ZSBpbnNpZGUgaXQgYW5kIHByb3ZpZGUgdGhlIGVsZW1lbnQgbGlrZSB0aGlzOlxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgZG9jdW1lbnRcbiAgICAgICAgICogICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyN0cGwnKVxuICAgICAgICAgKiAgICAgICAuaW5uZXJIVE1MXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBwcmV2aWV3VGVtcGxhdGU6IFwiPGRpdiBjbGFzcz1cXFwiZHotcHJldmlldyBkei1maWxlLXByZXZpZXdcXFwiPlxcbiAgPGRpdiBjbGFzcz1cXFwiZHotaW1hZ2VcXFwiPjxpbWcgZGF0YS1kei10aHVtYm5haWwgLz48L2Rpdj5cXG4gIDxkaXYgY2xhc3M9XFxcImR6LWRldGFpbHNcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJkei1zaXplXFxcIj48c3BhbiBkYXRhLWR6LXNpemU+PC9zcGFuPjwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJkei1maWxlbmFtZVxcXCI+PHNwYW4gZGF0YS1kei1uYW1lPjwvc3Bhbj48L2Rpdj5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cXFwiZHotcHJvZ3Jlc3NcXFwiPjxzcGFuIGNsYXNzPVxcXCJkei11cGxvYWRcXFwiIGRhdGEtZHotdXBsb2FkcHJvZ3Jlc3M+PC9zcGFuPjwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cXFwiZHotZXJyb3ItbWVzc2FnZVxcXCI+PHNwYW4gZGF0YS1kei1lcnJvcm1lc3NhZ2U+PC9zcGFuPjwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cXFwiZHotc3VjY2Vzcy1tYXJrXFxcIj5cXG4gICAgPHN2ZyB3aWR0aD1cXFwiNTRweFxcXCIgaGVpZ2h0PVxcXCI1NHB4XFxcIiB2aWV3Qm94PVxcXCIwIDAgNTQgNTRcXFwiIHZlcnNpb249XFxcIjEuMVxcXCIgeG1sbnM9XFxcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXFxcIiB4bWxuczp4bGluaz1cXFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1xcXCIgeG1sbnM6c2tldGNoPVxcXCJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnNcXFwiPlxcbiAgICAgIDx0aXRsZT5DaGVjazwvdGl0bGU+XFxuICAgICAgPGRlZnM+PC9kZWZzPlxcbiAgICAgIDxnIGlkPVxcXCJQYWdlLTFcXFwiIHN0cm9rZT1cXFwibm9uZVxcXCIgc3Ryb2tlLXdpZHRoPVxcXCIxXFxcIiBmaWxsPVxcXCJub25lXFxcIiBmaWxsLXJ1bGU9XFxcImV2ZW5vZGRcXFwiIHNrZXRjaDp0eXBlPVxcXCJNU1BhZ2VcXFwiPlxcbiAgICAgICAgPHBhdGggZD1cXFwiTTIzLjUsMzEuODQzMTQ1OCBMMTcuNTg1MjQxOSwyNS45MjgzODc3IEMxNi4wMjQ4MjUzLDI0LjM2Nzk3MTEgMTMuNDkxMDI5NCwyNC4zNjY4MzUgMTEuOTI4OTMyMiwyNS45Mjg5MzIyIEMxMC4zNzAwMTM2LDI3LjQ4Nzg1MDggMTAuMzY2NTkxMiwzMC4wMjM0NDU1IDExLjkyODM4NzcsMzEuNTg1MjQxOSBMMjAuNDE0NzU4MSw0MC4wNzE2MTIzIEMyMC41MTMzOTk5LDQwLjE3MDI1NDEgMjAuNjE1OTMxNSw0MC4yNjI2NjQ5IDIwLjcyMTg2MTUsNDAuMzQ4ODQzNSBDMjIuMjgzNTY2OSw0MS44NzI1NjUxIDI0Ljc5NDIzNCw0MS44NjI2MjAyIDI2LjM0NjE1NjQsNDAuMzEwNjk3OCBMNDMuMzEwNjk3OCwyMy4zNDYxNTY0IEM0NC44NzcxMDIxLDIxLjc3OTc1MjEgNDQuODc1ODA1NywxOS4yNDgzODg3IDQzLjMxMzcwODUsMTcuNjg2MjkxNSBDNDEuNzU0Nzg5OSwxNi4xMjczNzI5IDM5LjIxNzYwMzUsMTYuMTI1NTQyMiAzNy42NTM4NDM2LDE3LjY4OTMwMjIgTDIzLjUsMzEuODQzMTQ1OCBaIE0yNyw1MyBDNDEuMzU5NDAzNSw1MyA1Myw0MS4zNTk0MDM1IDUzLDI3IEM1MywxMi42NDA1OTY1IDQxLjM1OTQwMzUsMSAyNywxIEMxMi42NDA1OTY1LDEgMSwxMi42NDA1OTY1IDEsMjcgQzEsNDEuMzU5NDAzNSAxMi42NDA1OTY1LDUzIDI3LDUzIFpcXFwiIGlkPVxcXCJPdmFsLTJcXFwiIHN0cm9rZS1vcGFjaXR5PVxcXCIwLjE5ODc5NDE1OFxcXCIgc3Ryb2tlPVxcXCIjNzQ3NDc0XFxcIiBmaWxsLW9wYWNpdHk9XFxcIjAuODE2NTE5NDc1XFxcIiBmaWxsPVxcXCIjRkZGRkZGXFxcIiBza2V0Y2g6dHlwZT1cXFwiTVNTaGFwZUdyb3VwXFxcIj48L3BhdGg+XFxuICAgICAgPC9nPlxcbiAgICA8L3N2Zz5cXG4gIDwvZGl2PlxcbiAgPGRpdiBjbGFzcz1cXFwiZHotZXJyb3ItbWFya1xcXCI+XFxuICAgIDxzdmcgd2lkdGg9XFxcIjU0cHhcXFwiIGhlaWdodD1cXFwiNTRweFxcXCIgdmlld0JveD1cXFwiMCAwIDU0IDU0XFxcIiB2ZXJzaW9uPVxcXCIxLjFcXFwiIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgeG1sbnM6eGxpbms9XFxcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcXFwiIHhtbG5zOnNrZXRjaD1cXFwiaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zXFxcIj5cXG4gICAgICA8dGl0bGU+RXJyb3I8L3RpdGxlPlxcbiAgICAgIDxkZWZzPjwvZGVmcz5cXG4gICAgICA8ZyBpZD1cXFwiUGFnZS0xXFxcIiBzdHJva2U9XFxcIm5vbmVcXFwiIHN0cm9rZS13aWR0aD1cXFwiMVxcXCIgZmlsbD1cXFwibm9uZVxcXCIgZmlsbC1ydWxlPVxcXCJldmVub2RkXFxcIiBza2V0Y2g6dHlwZT1cXFwiTVNQYWdlXFxcIj5cXG4gICAgICAgIDxnIGlkPVxcXCJDaGVjay0rLU92YWwtMlxcXCIgc2tldGNoOnR5cGU9XFxcIk1TTGF5ZXJHcm91cFxcXCIgc3Ryb2tlPVxcXCIjNzQ3NDc0XFxcIiBzdHJva2Utb3BhY2l0eT1cXFwiMC4xOTg3OTQxNThcXFwiIGZpbGw9XFxcIiNGRkZGRkZcXFwiIGZpbGwtb3BhY2l0eT1cXFwiMC44MTY1MTk0NzVcXFwiPlxcbiAgICAgICAgICA8cGF0aCBkPVxcXCJNMzIuNjU2ODU0MiwyOSBMMzguMzEwNjk3OCwyMy4zNDYxNTY0IEMzOS44NzcxMDIxLDIxLjc3OTc1MjEgMzkuODc1ODA1NywxOS4yNDgzODg3IDM4LjMxMzcwODUsMTcuNjg2MjkxNSBDMzYuNzU0Nzg5OSwxNi4xMjczNzI5IDM0LjIxNzYwMzUsMTYuMTI1NTQyMiAzMi42NTM4NDM2LDE3LjY4OTMwMjIgTDI3LDIzLjM0MzE0NTggTDIxLjM0NjE1NjQsMTcuNjg5MzAyMiBDMTkuNzgyMzk2NSwxNi4xMjU1NDIyIDE3LjI0NTIxMDEsMTYuMTI3MzcyOSAxNS42ODYyOTE1LDE3LjY4NjI5MTUgQzE0LjEyNDE5NDMsMTkuMjQ4Mzg4NyAxNC4xMjI4OTc5LDIxLjc3OTc1MjEgMTUuNjg5MzAyMiwyMy4zNDYxNTY0IEwyMS4zNDMxNDU4LDI5IEwxNS42ODkzMDIyLDM0LjY1Mzg0MzYgQzE0LjEyMjg5NzksMzYuMjIwMjQ3OSAxNC4xMjQxOTQzLDM4Ljc1MTYxMTMgMTUuNjg2MjkxNSw0MC4zMTM3MDg1IEMxNy4yNDUyMTAxLDQxLjg3MjYyNzEgMTkuNzgyMzk2NSw0MS44NzQ0NTc4IDIxLjM0NjE1NjQsNDAuMzEwNjk3OCBMMjcsMzQuNjU2ODU0MiBMMzIuNjUzODQzNiw0MC4zMTA2OTc4IEMzNC4yMTc2MDM1LDQxLjg3NDQ1NzggMzYuNzU0Nzg5OSw0MS44NzI2MjcxIDM4LjMxMzcwODUsNDAuMzEzNzA4NSBDMzkuODc1ODA1NywzOC43NTE2MTEzIDM5Ljg3NzEwMjEsMzYuMjIwMjQ3OSAzOC4zMTA2OTc4LDM0LjY1Mzg0MzYgTDMyLjY1Njg1NDIsMjkgWiBNMjcsNTMgQzQxLjM1OTQwMzUsNTMgNTMsNDEuMzU5NDAzNSA1MywyNyBDNTMsMTIuNjQwNTk2NSA0MS4zNTk0MDM1LDEgMjcsMSBDMTIuNjQwNTk2NSwxIDEsMTIuNjQwNTk2NSAxLDI3IEMxLDQxLjM1OTQwMzUgMTIuNjQwNTk2NSw1MyAyNyw1MyBaXFxcIiBpZD1cXFwiT3ZhbC0yXFxcIiBza2V0Y2g6dHlwZT1cXFwiTVNTaGFwZUdyb3VwXFxcIj48L3BhdGg+XFxuICAgICAgICA8L2c+XFxuICAgICAgPC9nPlxcbiAgICA8L3N2Zz5cXG4gIDwvZGl2PlxcbjwvZGl2PlwiLFxuXG4gICAgICAgIC8vIEVORCBPUFRJT05TXG4gICAgICAgIC8vIChSZXF1aXJlZCBieSB0aGUgZHJvcHpvbmUgZG9jdW1lbnRhdGlvbiBwYXJzZXIpXG5cblxuICAgICAgICAvKlxuICAgICAgICAgVGhvc2UgZnVuY3Rpb25zIHJlZ2lzdGVyIHRoZW1zZWx2ZXMgdG8gdGhlIGV2ZW50cyBvbiBpbml0IGFuZCBoYW5kbGUgYWxsXG4gICAgICAgICB0aGUgdXNlciBpbnRlcmZhY2Ugc3BlY2lmaWMgc3R1ZmYuIE92ZXJ3cml0aW5nIHRoZW0gd29uJ3QgYnJlYWsgdGhlIHVwbG9hZFxuICAgICAgICAgYnV0IGNhbiBicmVhayB0aGUgd2F5IGl0J3MgZGlzcGxheWVkLlxuICAgICAgICAgWW91IGNhbiBvdmVyd3JpdGUgdGhlbSBpZiB5b3UgZG9uJ3QgbGlrZSB0aGUgZGVmYXVsdCBiZWhhdmlvci4gSWYgeW91IGp1c3RcbiAgICAgICAgIHdhbnQgdG8gYWRkIGFuIGFkZGl0aW9uYWwgZXZlbnQgaGFuZGxlciwgcmVnaXN0ZXIgaXQgb24gdGhlIGRyb3B6b25lIG9iamVjdFxuICAgICAgICAgYW5kIGRvbid0IG92ZXJ3cml0ZSB0aG9zZSBvcHRpb25zLlxuICAgICAgICAgKi9cblxuICAgICAgICAvLyBUaG9zZSBhcmUgc2VsZiBleHBsYW5hdG9yeSBhbmQgc2ltcGx5IGNvbmNlcm4gdGhlIERyYWduRHJvcC5cbiAgICAgICAgZHJvcDogZnVuY3Rpb24gZHJvcChlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHotZHJhZy1ob3ZlclwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZHJhZ3N0YXJ0OiBmdW5jdGlvbiBkcmFnc3RhcnQoZSkge30sXG4gICAgICAgIGRyYWdlbmQ6IGZ1bmN0aW9uIGRyYWdlbmQoZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImR6LWRyYWctaG92ZXJcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGRyYWdlbnRlcjogZnVuY3Rpb24gZHJhZ2VudGVyKGUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1kcmFnLWhvdmVyXCIpO1xuICAgICAgICB9LFxuICAgICAgICBkcmFnb3ZlcjogZnVuY3Rpb24gZHJhZ292ZXIoZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LWRyYWctaG92ZXJcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGRyYWdsZWF2ZTogZnVuY3Rpb24gZHJhZ2xlYXZlKGUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkei1kcmFnLWhvdmVyXCIpO1xuICAgICAgICB9LFxuICAgICAgICBwYXN0ZTogZnVuY3Rpb24gcGFzdGUoZSkge30sXG5cblxuICAgICAgICAvLyBDYWxsZWQgd2hlbmV2ZXIgdGhlcmUgYXJlIG5vIGZpbGVzIGxlZnQgaW4gdGhlIGRyb3B6b25lIGFueW1vcmUsIGFuZCB0aGVcbiAgICAgICAgLy8gZHJvcHpvbmUgc2hvdWxkIGJlIGRpc3BsYXllZCBhcyBpZiBpbiB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImR6LXN0YXJ0ZWRcIik7XG4gICAgICAgIH0sXG5cblxuICAgICAgICAvLyBDYWxsZWQgd2hlbiBhIGZpbGUgaXMgYWRkZWQgdG8gdGhlIHF1ZXVlXG4gICAgICAgIC8vIFJlY2VpdmVzIGBmaWxlYFxuICAgICAgICBhZGRlZGZpbGU6IGZ1bmN0aW9uIGFkZGVkZmlsZShmaWxlKSB7XG4gICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICBpZiAodGhpcy5lbGVtZW50ID09PSB0aGlzLnByZXZpZXdzQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LXN0YXJ0ZWRcIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMucHJldmlld3NDb250YWluZXIpIHtcbiAgICAgICAgICAgIGZpbGUucHJldmlld0VsZW1lbnQgPSBEcm9wem9uZS5jcmVhdGVFbGVtZW50KHRoaXMub3B0aW9ucy5wcmV2aWV3VGVtcGxhdGUudHJpbSgpKTtcbiAgICAgICAgICAgIGZpbGUucHJldmlld1RlbXBsYXRlID0gZmlsZS5wcmV2aWV3RWxlbWVudDsgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcblxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3c0NvbnRhaW5lci5hcHBlbmRDaGlsZChmaWxlLnByZXZpZXdFbGVtZW50KTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1kei1uYW1lXVwiKSwgX2lzQXJyYXkzID0gdHJ1ZSwgX2kzID0gMCwgX2l0ZXJhdG9yMyA9IF9pc0FycmF5MyA/IF9pdGVyYXRvcjMgOiBfaXRlcmF0b3IzW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICAgIHZhciBfcmVmMztcblxuICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkzKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9pMyA+PSBfaXRlcmF0b3IzLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgX3JlZjMgPSBfaXRlcmF0b3IzW19pMysrXTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfaTMgPSBfaXRlcmF0b3IzLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoX2kzLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICAgIF9yZWYzID0gX2kzLnZhbHVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIG5vZGUgPSBfcmVmMztcblxuICAgICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gZmlsZS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNCA9IGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWR6LXNpemVdXCIpLCBfaXNBcnJheTQgPSB0cnVlLCBfaTQgPSAwLCBfaXRlcmF0b3I0ID0gX2lzQXJyYXk0ID8gX2l0ZXJhdG9yNCA6IF9pdGVyYXRvcjRbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgICAgaWYgKF9pc0FycmF5NCkge1xuICAgICAgICAgICAgICAgIGlmIChfaTQgPj0gX2l0ZXJhdG9yNC5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgIG5vZGUgPSBfaXRlcmF0b3I0W19pNCsrXTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfaTQgPSBfaXRlcmF0b3I0Lm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoX2k0LmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICAgIG5vZGUgPSBfaTQudmFsdWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBub2RlLmlubmVySFRNTCA9IHRoaXMuZmlsZXNpemUoZmlsZS5zaXplKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hZGRSZW1vdmVMaW5rcykge1xuICAgICAgICAgICAgICBmaWxlLl9yZW1vdmVMaW5rID0gRHJvcHpvbmUuY3JlYXRlRWxlbWVudChcIjxhIGNsYXNzPVxcXCJkei1yZW1vdmVcXFwiIGhyZWY9XFxcImphdmFzY3JpcHQ6dW5kZWZpbmVkO1xcXCIgZGF0YS1kei1yZW1vdmU+XCIgKyB0aGlzLm9wdGlvbnMuZGljdFJlbW92ZUZpbGUgKyBcIjwvYT5cIik7XG4gICAgICAgICAgICAgIGZpbGUucHJldmlld0VsZW1lbnQuYXBwZW5kQ2hpbGQoZmlsZS5fcmVtb3ZlTGluayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciByZW1vdmVGaWxlRXZlbnQgPSBmdW5jdGlvbiByZW1vdmVGaWxlRXZlbnQoZSkge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgIGlmIChmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuVVBMT0FESU5HKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERyb3B6b25lLmNvbmZpcm0oX3RoaXMyLm9wdGlvbnMuZGljdENhbmNlbFVwbG9hZENvbmZpcm1hdGlvbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5yZW1vdmVGaWxlKGZpbGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChfdGhpczIub3B0aW9ucy5kaWN0UmVtb3ZlRmlsZUNvbmZpcm1hdGlvbikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIERyb3B6b25lLmNvbmZpcm0oX3RoaXMyLm9wdGlvbnMuZGljdFJlbW92ZUZpbGVDb25maXJtYXRpb24sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5yZW1vdmVGaWxlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIucmVtb3ZlRmlsZShmaWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjUgPSBmaWxlLnByZXZpZXdFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1kei1yZW1vdmVdXCIpLCBfaXNBcnJheTUgPSB0cnVlLCBfaTUgPSAwLCBfaXRlcmF0b3I1ID0gX2lzQXJyYXk1ID8gX2l0ZXJhdG9yNSA6IF9pdGVyYXRvcjVbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgICAgdmFyIF9yZWY0O1xuXG4gICAgICAgICAgICAgIGlmIChfaXNBcnJheTUpIHtcbiAgICAgICAgICAgICAgICBpZiAoX2k1ID49IF9pdGVyYXRvcjUubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICBfcmVmNCA9IF9pdGVyYXRvcjVbX2k1KytdO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9pNSA9IF9pdGVyYXRvcjUubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChfaTUuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgX3JlZjQgPSBfaTUudmFsdWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB2YXIgcmVtb3ZlTGluayA9IF9yZWY0O1xuXG4gICAgICAgICAgICAgIHJlbW92ZUxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlbW92ZUZpbGVFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG5cbiAgICAgICAgLy8gQ2FsbGVkIHdoZW5ldmVyIGEgZmlsZSBpcyByZW1vdmVkLlxuICAgICAgICByZW1vdmVkZmlsZTogZnVuY3Rpb24gcmVtb3ZlZGZpbGUoZmlsZSkge1xuICAgICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50ICE9IG51bGwgJiYgZmlsZS5wcmV2aWV3RWxlbWVudC5wYXJlbnROb2RlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZpbGUucHJldmlld0VsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmaWxlLnByZXZpZXdFbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZU1heEZpbGVzUmVhY2hlZENsYXNzKCk7XG4gICAgICAgIH0sXG5cblxuICAgICAgICAvLyBDYWxsZWQgd2hlbiBhIHRodW1ibmFpbCBoYXMgYmVlbiBnZW5lcmF0ZWRcbiAgICAgICAgLy8gUmVjZWl2ZXMgYGZpbGVgIGFuZCBgZGF0YVVybGBcbiAgICAgICAgdGh1bWJuYWlsOiBmdW5jdGlvbiB0aHVtYm5haWwoZmlsZSwgZGF0YVVybCkge1xuICAgICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG4gICAgICAgICAgICBmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkei1maWxlLXByZXZpZXdcIik7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I2ID0gZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtZHotdGh1bWJuYWlsXVwiKSwgX2lzQXJyYXk2ID0gdHJ1ZSwgX2k2ID0gMCwgX2l0ZXJhdG9yNiA9IF9pc0FycmF5NiA/IF9pdGVyYXRvcjYgOiBfaXRlcmF0b3I2W1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICAgIHZhciBfcmVmNTtcblxuICAgICAgICAgICAgICBpZiAoX2lzQXJyYXk2KSB7XG4gICAgICAgICAgICAgICAgaWYgKF9pNiA+PSBfaXRlcmF0b3I2Lmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgX3JlZjUgPSBfaXRlcmF0b3I2W19pNisrXTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfaTYgPSBfaXRlcmF0b3I2Lm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoX2k2LmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICAgIF9yZWY1ID0gX2k2LnZhbHVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIHRodW1ibmFpbEVsZW1lbnQgPSBfcmVmNTtcblxuICAgICAgICAgICAgICB0aHVtYm5haWxFbGVtZW50LmFsdCA9IGZpbGUubmFtZTtcbiAgICAgICAgICAgICAgdGh1bWJuYWlsRWxlbWVudC5zcmMgPSBkYXRhVXJsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1pbWFnZS1wcmV2aWV3XCIpO1xuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuXG5cbiAgICAgICAgLy8gQ2FsbGVkIHdoZW5ldmVyIGFuIGVycm9yIG9jY3Vyc1xuICAgICAgICAvLyBSZWNlaXZlcyBgZmlsZWAgYW5kIGBtZXNzYWdlYFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoZmlsZSwgbWVzc2FnZSkge1xuICAgICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG4gICAgICAgICAgICBmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1lcnJvclwiKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gXCJTdHJpbmdcIiAmJiBtZXNzYWdlLmVycm9yKSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlLmVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNyA9IGZpbGUucHJldmlld0VsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWR6LWVycm9ybWVzc2FnZV1cIiksIF9pc0FycmF5NyA9IHRydWUsIF9pNyA9IDAsIF9pdGVyYXRvcjcgPSBfaXNBcnJheTcgPyBfaXRlcmF0b3I3IDogX2l0ZXJhdG9yN1tTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgICB2YXIgX3JlZjY7XG5cbiAgICAgICAgICAgICAgaWYgKF9pc0FycmF5Nykge1xuICAgICAgICAgICAgICAgIGlmIChfaTcgPj0gX2l0ZXJhdG9yNy5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgIF9yZWY2ID0gX2l0ZXJhdG9yN1tfaTcrK107XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX2k3ID0gX2l0ZXJhdG9yNy5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKF9pNy5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICBfcmVmNiA9IF9pNy52YWx1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBub2RlID0gX3JlZjY7XG5cbiAgICAgICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcm11bHRpcGxlOiBmdW5jdGlvbiBlcnJvcm11bHRpcGxlKCkge30sXG5cblxuICAgICAgICAvLyBDYWxsZWQgd2hlbiBhIGZpbGUgZ2V0cyBwcm9jZXNzZWQuIFNpbmNlIHRoZXJlIGlzIGEgY3VlLCBub3QgYWxsIGFkZGVkXG4gICAgICAgIC8vIGZpbGVzIGFyZSBwcm9jZXNzZWQgaW1tZWRpYXRlbHkuXG4gICAgICAgIC8vIFJlY2VpdmVzIGBmaWxlYFxuICAgICAgICBwcm9jZXNzaW5nOiBmdW5jdGlvbiBwcm9jZXNzaW5nKGZpbGUpIHtcbiAgICAgICAgICBpZiAoZmlsZS5wcmV2aWV3RWxlbWVudCkge1xuICAgICAgICAgICAgZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZHotcHJvY2Vzc2luZ1wiKTtcbiAgICAgICAgICAgIGlmIChmaWxlLl9yZW1vdmVMaW5rKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmaWxlLl9yZW1vdmVMaW5rLnRleHRDb250ZW50ID0gdGhpcy5vcHRpb25zLmRpY3RDYW5jZWxVcGxvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwcm9jZXNzaW5nbXVsdGlwbGU6IGZ1bmN0aW9uIHByb2Nlc3NpbmdtdWx0aXBsZSgpIHt9LFxuXG5cbiAgICAgICAgLy8gQ2FsbGVkIHdoZW5ldmVyIHRoZSB1cGxvYWQgcHJvZ3Jlc3MgZ2V0cyB1cGRhdGVkLlxuICAgICAgICAvLyBSZWNlaXZlcyBgZmlsZWAsIGBwcm9ncmVzc2AgKHBlcmNlbnRhZ2UgMC0xMDApIGFuZCBgYnl0ZXNTZW50YC5cbiAgICAgICAgLy8gVG8gZ2V0IHRoZSB0b3RhbCBudW1iZXIgb2YgYnl0ZXMgb2YgdGhlIGZpbGUsIHVzZSBgZmlsZS5zaXplYFxuICAgICAgICB1cGxvYWRwcm9ncmVzczogZnVuY3Rpb24gdXBsb2FkcHJvZ3Jlc3MoZmlsZSwgcHJvZ3Jlc3MsIGJ5dGVzU2VudCkge1xuICAgICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I4ID0gZmlsZS5wcmV2aWV3RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtZHotdXBsb2FkcHJvZ3Jlc3NdXCIpLCBfaXNBcnJheTggPSB0cnVlLCBfaTggPSAwLCBfaXRlcmF0b3I4ID0gX2lzQXJyYXk4ID8gX2l0ZXJhdG9yOCA6IF9pdGVyYXRvcjhbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgICAgdmFyIF9yZWY3O1xuXG4gICAgICAgICAgICAgIGlmIChfaXNBcnJheTgpIHtcbiAgICAgICAgICAgICAgICBpZiAoX2k4ID49IF9pdGVyYXRvcjgubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICBfcmVmNyA9IF9pdGVyYXRvcjhbX2k4KytdO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9pOCA9IF9pdGVyYXRvcjgubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChfaTguZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgX3JlZjcgPSBfaTgudmFsdWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB2YXIgbm9kZSA9IF9yZWY3O1xuXG4gICAgICAgICAgICAgIG5vZGUubm9kZU5hbWUgPT09ICdQUk9HUkVTUycgPyBub2RlLnZhbHVlID0gcHJvZ3Jlc3MgOiBub2RlLnN0eWxlLndpZHRoID0gcHJvZ3Jlc3MgKyBcIiVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG5cblxuICAgICAgICAvLyBDYWxsZWQgd2hlbmV2ZXIgdGhlIHRvdGFsIHVwbG9hZCBwcm9ncmVzcyBnZXRzIHVwZGF0ZWQuXG4gICAgICAgIC8vIENhbGxlZCB3aXRoIHRvdGFsVXBsb2FkUHJvZ3Jlc3MgKDAtMTAwKSwgdG90YWxCeXRlcyBhbmQgdG90YWxCeXRlc1NlbnRcbiAgICAgICAgdG90YWx1cGxvYWRwcm9ncmVzczogZnVuY3Rpb24gdG90YWx1cGxvYWRwcm9ncmVzcygpIHt9LFxuXG5cbiAgICAgICAgLy8gQ2FsbGVkIGp1c3QgYmVmb3JlIHRoZSBmaWxlIGlzIHNlbnQuIEdldHMgdGhlIGB4aHJgIG9iamVjdCBhcyBzZWNvbmRcbiAgICAgICAgLy8gcGFyYW1ldGVyLCBzbyB5b3UgY2FuIG1vZGlmeSBpdCAoZm9yIGV4YW1wbGUgdG8gYWRkIGEgQ1NSRiB0b2tlbikgYW5kIGFcbiAgICAgICAgLy8gYGZvcm1EYXRhYCBvYmplY3QgdG8gYWRkIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG4gICAgICAgIHNlbmRpbmc6IGZ1bmN0aW9uIHNlbmRpbmcoKSB7fSxcbiAgICAgICAgc2VuZGluZ211bHRpcGxlOiBmdW5jdGlvbiBzZW5kaW5nbXVsdGlwbGUoKSB7fSxcblxuXG4gICAgICAgIC8vIFdoZW4gdGhlIGNvbXBsZXRlIHVwbG9hZCBpcyBmaW5pc2hlZCBhbmQgc3VjY2Vzc2Z1bFxuICAgICAgICAvLyBSZWNlaXZlcyBgZmlsZWBcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gc3VjY2VzcyhmaWxlKSB7XG4gICAgICAgICAgaWYgKGZpbGUucHJldmlld0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWxlLnByZXZpZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkei1zdWNjZXNzXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2Vzc211bHRpcGxlOiBmdW5jdGlvbiBzdWNjZXNzbXVsdGlwbGUoKSB7fSxcblxuXG4gICAgICAgIC8vIFdoZW4gdGhlIHVwbG9hZCBpcyBjYW5jZWxlZC5cbiAgICAgICAgY2FuY2VsZWQ6IGZ1bmN0aW9uIGNhbmNlbGVkKGZpbGUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KFwiZXJyb3JcIiwgZmlsZSwgdGhpcy5vcHRpb25zLmRpY3RVcGxvYWRDYW5jZWxlZCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmNlbGVkbXVsdGlwbGU6IGZ1bmN0aW9uIGNhbmNlbGVkbXVsdGlwbGUoKSB7fSxcblxuXG4gICAgICAgIC8vIFdoZW4gdGhlIHVwbG9hZCBpcyBmaW5pc2hlZCwgZWl0aGVyIHdpdGggc3VjY2VzcyBvciBhbiBlcnJvci5cbiAgICAgICAgLy8gUmVjZWl2ZXMgYGZpbGVgXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZShmaWxlKSB7XG4gICAgICAgICAgaWYgKGZpbGUuX3JlbW92ZUxpbmspIHtcbiAgICAgICAgICAgIGZpbGUuX3JlbW92ZUxpbmsudGV4dENvbnRlbnQgPSB0aGlzLm9wdGlvbnMuZGljdFJlbW92ZUZpbGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmaWxlLnByZXZpZXdFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZmlsZS5wcmV2aWV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZHotY29tcGxldGVcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZW11bHRpcGxlOiBmdW5jdGlvbiBjb21wbGV0ZW11bHRpcGxlKCkge30sXG4gICAgICAgIG1heGZpbGVzZXhjZWVkZWQ6IGZ1bmN0aW9uIG1heGZpbGVzZXhjZWVkZWQoKSB7fSxcbiAgICAgICAgbWF4ZmlsZXNyZWFjaGVkOiBmdW5jdGlvbiBtYXhmaWxlc3JlYWNoZWQoKSB7fSxcbiAgICAgICAgcXVldWVjb21wbGV0ZTogZnVuY3Rpb24gcXVldWVjb21wbGV0ZSgpIHt9LFxuICAgICAgICBhZGRlZGZpbGVzOiBmdW5jdGlvbiBhZGRlZGZpbGVzKCkge31cbiAgICAgIH07XG5cbiAgICAgIHRoaXMucHJvdG90eXBlLl90aHVtYm5haWxRdWV1ZSA9IFtdO1xuICAgICAgdGhpcy5wcm90b3R5cGUuX3Byb2Nlc3NpbmdUaHVtYm5haWwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBnbG9iYWwgdXRpbGl0eVxuXG4gIH0sIHtcbiAgICBrZXk6IFwiZXh0ZW5kXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgb2JqZWN0cyA9IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgb2JqZWN0c1tfa2V5MiAtIDFdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yOSA9IG9iamVjdHMsIF9pc0FycmF5OSA9IHRydWUsIF9pOSA9IDAsIF9pdGVyYXRvcjkgPSBfaXNBcnJheTkgPyBfaXRlcmF0b3I5IDogX2l0ZXJhdG9yOVtTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICB2YXIgX3JlZjg7XG5cbiAgICAgICAgaWYgKF9pc0FycmF5OSkge1xuICAgICAgICAgIGlmIChfaTkgPj0gX2l0ZXJhdG9yOS5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgIF9yZWY4ID0gX2l0ZXJhdG9yOVtfaTkrK107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2k5ID0gX2l0ZXJhdG9yOS5uZXh0KCk7XG4gICAgICAgICAgaWYgKF9pOS5kb25lKSBicmVhaztcbiAgICAgICAgICBfcmVmOCA9IF9pOS52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvYmplY3QgPSBfcmVmODtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgdmFyIHZhbCA9IG9iamVjdFtrZXldO1xuICAgICAgICAgIHRhcmdldFtrZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgfV0pO1xuXG4gIGZ1bmN0aW9uIERyb3B6b25lKGVsLCBvcHRpb25zKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERyb3B6b25lKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChEcm9wem9uZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKERyb3B6b25lKSkuY2FsbCh0aGlzKSk7XG5cbiAgICB2YXIgZmFsbGJhY2sgPSB2b2lkIDAsXG4gICAgICAgIGxlZnQgPSB2b2lkIDA7XG4gICAgX3RoaXMuZWxlbWVudCA9IGVsO1xuICAgIC8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBzaW5jZSB0aGUgdmVyc2lvbiB3YXMgaW4gdGhlIHByb3RvdHlwZSBwcmV2aW91c2x5XG4gICAgX3RoaXMudmVyc2lvbiA9IERyb3B6b25lLnZlcnNpb247XG5cbiAgICBfdGhpcy5kZWZhdWx0T3B0aW9ucy5wcmV2aWV3VGVtcGxhdGUgPSBfdGhpcy5kZWZhdWx0T3B0aW9ucy5wcmV2aWV3VGVtcGxhdGUucmVwbGFjZSgvXFxuKi9nLCBcIlwiKTtcblxuICAgIF90aGlzLmNsaWNrYWJsZUVsZW1lbnRzID0gW107XG4gICAgX3RoaXMubGlzdGVuZXJzID0gW107XG4gICAgX3RoaXMuZmlsZXMgPSBbXTsgLy8gQWxsIGZpbGVzXG5cbiAgICBpZiAodHlwZW9mIF90aGlzLmVsZW1lbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIF90aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKF90aGlzLmVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIE5vdCBjaGVja2luZyBpZiBpbnN0YW5jZSBvZiBIVE1MRWxlbWVudCBvciBFbGVtZW50IHNpbmNlIElFOSBpcyBleHRyZW1lbHkgd2VpcmQuXG4gICAgaWYgKCFfdGhpcy5lbGVtZW50IHx8IF90aGlzLmVsZW1lbnQubm9kZVR5cGUgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkcm9wem9uZSBlbGVtZW50LlwiKTtcbiAgICB9XG5cbiAgICBpZiAoX3RoaXMuZWxlbWVudC5kcm9wem9uZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRHJvcHpvbmUgYWxyZWFkeSBhdHRhY2hlZC5cIik7XG4gICAgfVxuXG4gICAgLy8gTm93IGFkZCB0aGlzIGRyb3B6b25lIHRvIHRoZSBpbnN0YW5jZXMuXG4gICAgRHJvcHpvbmUuaW5zdGFuY2VzLnB1c2goX3RoaXMpO1xuXG4gICAgLy8gUHV0IHRoZSBkcm9wem9uZSBpbnNpZGUgdGhlIGVsZW1lbnQgaXRzZWxmLlxuICAgIF90aGlzLmVsZW1lbnQuZHJvcHpvbmUgPSBfdGhpcztcblxuICAgIHZhciBlbGVtZW50T3B0aW9ucyA9IChsZWZ0ID0gRHJvcHpvbmUub3B0aW9uc0ZvckVsZW1lbnQoX3RoaXMuZWxlbWVudCkpICE9IG51bGwgPyBsZWZ0IDoge307XG5cbiAgICBfdGhpcy5vcHRpb25zID0gRHJvcHpvbmUuZXh0ZW5kKHt9LCBfdGhpcy5kZWZhdWx0T3B0aW9ucywgZWxlbWVudE9wdGlvbnMsIG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMgOiB7fSk7XG5cbiAgICAvLyBJZiB0aGUgYnJvd3NlciBmYWlsZWQsIGp1c3QgY2FsbCB0aGUgZmFsbGJhY2sgYW5kIGxlYXZlXG4gICAgaWYgKF90aGlzLm9wdGlvbnMuZm9yY2VGYWxsYmFjayB8fCAhRHJvcHpvbmUuaXNCcm93c2VyU3VwcG9ydGVkKCkpIHtcbiAgICAgIHZhciBfcmV0O1xuXG4gICAgICByZXR1cm4gX3JldCA9IF90aGlzLm9wdGlvbnMuZmFsbGJhY2suY2FsbChfdGhpcyksIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKF90aGlzLCBfcmV0KTtcbiAgICB9XG5cbiAgICAvLyBAb3B0aW9ucy51cmwgPSBAZWxlbWVudC5nZXRBdHRyaWJ1dGUgXCJhY3Rpb25cIiB1bmxlc3MgQG9wdGlvbnMudXJsP1xuICAgIGlmIChfdGhpcy5vcHRpb25zLnVybCA9PSBudWxsKSB7XG4gICAgICBfdGhpcy5vcHRpb25zLnVybCA9IF90aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiYWN0aW9uXCIpO1xuICAgIH1cblxuICAgIGlmICghX3RoaXMub3B0aW9ucy51cmwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIFVSTCBwcm92aWRlZC5cIik7XG4gICAgfVxuXG4gICAgaWYgKF90aGlzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcyAmJiBfdGhpcy5vcHRpb25zLmFjY2VwdGVkTWltZVR5cGVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgY2FuJ3QgcHJvdmlkZSBib3RoICdhY2NlcHRlZEZpbGVzJyBhbmQgJ2FjY2VwdGVkTWltZVR5cGVzJy4gJ2FjY2VwdGVkTWltZVR5cGVzJyBpcyBkZXByZWNhdGVkLlwiKTtcbiAgICB9XG5cbiAgICBpZiAoX3RoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSAmJiBfdGhpcy5vcHRpb25zLmNodW5raW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBjYW5ub3Qgc2V0IGJvdGg6IHVwbG9hZE11bHRpcGxlIGFuZCBjaHVua2luZy4nKTtcbiAgICB9XG5cbiAgICAvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgIGlmIChfdGhpcy5vcHRpb25zLmFjY2VwdGVkTWltZVR5cGVzKSB7XG4gICAgICBfdGhpcy5vcHRpb25zLmFjY2VwdGVkRmlsZXMgPSBfdGhpcy5vcHRpb25zLmFjY2VwdGVkTWltZVR5cGVzO1xuICAgICAgZGVsZXRlIF90aGlzLm9wdGlvbnMuYWNjZXB0ZWRNaW1lVHlwZXM7XG4gICAgfVxuXG4gICAgLy8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgICBpZiAoX3RoaXMub3B0aW9ucy5yZW5hbWVGaWxlbmFtZSAhPSBudWxsKSB7XG4gICAgICBfdGhpcy5vcHRpb25zLnJlbmFtZUZpbGUgPSBmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICByZXR1cm4gX3RoaXMub3B0aW9ucy5yZW5hbWVGaWxlbmFtZS5jYWxsKF90aGlzLCBmaWxlLm5hbWUsIGZpbGUpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBfdGhpcy5vcHRpb25zLm1ldGhvZCA9IF90aGlzLm9wdGlvbnMubWV0aG9kLnRvVXBwZXJDYXNlKCk7XG5cbiAgICBpZiAoKGZhbGxiYWNrID0gX3RoaXMuZ2V0RXhpc3RpbmdGYWxsYmFjaygpKSAmJiBmYWxsYmFjay5wYXJlbnROb2RlKSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIGZhbGxiYWNrXG4gICAgICBmYWxsYmFjay5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGZhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvLyBEaXNwbGF5IHByZXZpZXdzIGluIHRoZSBwcmV2aWV3c0NvbnRhaW5lciBlbGVtZW50IG9yIHRoZSBEcm9wem9uZSBlbGVtZW50IHVubGVzcyBleHBsaWNpdGx5IHNldCB0byBmYWxzZVxuICAgIGlmIChfdGhpcy5vcHRpb25zLnByZXZpZXdzQ29udGFpbmVyICE9PSBmYWxzZSkge1xuICAgICAgaWYgKF90aGlzLm9wdGlvbnMucHJldmlld3NDb250YWluZXIpIHtcbiAgICAgICAgX3RoaXMucHJldmlld3NDb250YWluZXIgPSBEcm9wem9uZS5nZXRFbGVtZW50KF90aGlzLm9wdGlvbnMucHJldmlld3NDb250YWluZXIsIFwicHJldmlld3NDb250YWluZXJcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5wcmV2aWV3c0NvbnRhaW5lciA9IF90aGlzLmVsZW1lbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKF90aGlzLm9wdGlvbnMuY2xpY2thYmxlKSB7XG4gICAgICBpZiAoX3RoaXMub3B0aW9ucy5jbGlja2FibGUgPT09IHRydWUpIHtcbiAgICAgICAgX3RoaXMuY2xpY2thYmxlRWxlbWVudHMgPSBbX3RoaXMuZWxlbWVudF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5jbGlja2FibGVFbGVtZW50cyA9IERyb3B6b25lLmdldEVsZW1lbnRzKF90aGlzLm9wdGlvbnMuY2xpY2thYmxlLCBcImNsaWNrYWJsZVwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfdGhpcy5pbml0KCk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhbGwgZmlsZXMgdGhhdCBoYXZlIGJlZW4gYWNjZXB0ZWRcblxuXG4gIF9jcmVhdGVDbGFzcyhEcm9wem9uZSwgW3tcbiAgICBrZXk6IFwiZ2V0QWNjZXB0ZWRGaWxlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBY2NlcHRlZEZpbGVzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsZXMuZmlsdGVyKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHJldHVybiBmaWxlLmFjY2VwdGVkO1xuICAgICAgfSkubWFwKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHJldHVybiBmaWxlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyBhbGwgZmlsZXMgdGhhdCBoYXZlIGJlZW4gcmVqZWN0ZWRcbiAgICAvLyBOb3Qgc3VyZSB3aGVuIHRoYXQncyBnb2luZyB0byBiZSB1c2VmdWwsIGJ1dCBhZGRlZCBmb3IgY29tcGxldGVuZXNzLlxuXG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0UmVqZWN0ZWRGaWxlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRSZWplY3RlZEZpbGVzKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsZXMuZmlsdGVyKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHJldHVybiAhZmlsZS5hY2NlcHRlZDtcbiAgICAgIH0pLm1hcChmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICByZXR1cm4gZmlsZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRGaWxlc1dpdGhTdGF0dXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RmlsZXNXaXRoU3RhdHVzKHN0YXR1cykge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsZXMuZmlsdGVyKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHJldHVybiBmaWxlLnN0YXR1cyA9PT0gc3RhdHVzO1xuICAgICAgfSkubWFwKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHJldHVybiBmaWxlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyBhbGwgZmlsZXMgdGhhdCBhcmUgaW4gdGhlIHF1ZXVlXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRRdWV1ZWRGaWxlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRRdWV1ZWRGaWxlcygpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEZpbGVzV2l0aFN0YXR1cyhEcm9wem9uZS5RVUVVRUQpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRVcGxvYWRpbmdGaWxlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRVcGxvYWRpbmdGaWxlcygpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEZpbGVzV2l0aFN0YXR1cyhEcm9wem9uZS5VUExPQURJTkcpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRBZGRlZEZpbGVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEFkZGVkRmlsZXMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRGaWxlc1dpdGhTdGF0dXMoRHJvcHpvbmUuQURERUQpO1xuICAgIH1cblxuICAgIC8vIEZpbGVzIHRoYXQgYXJlIGVpdGhlciBxdWV1ZWQgb3IgdXBsb2FkaW5nXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRBY3RpdmVGaWxlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBY3RpdmVGaWxlcygpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbGVzLmZpbHRlcihmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICByZXR1cm4gZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLlVQTE9BRElORyB8fCBmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuUVVFVUVEO1xuICAgICAgfSkubWFwKGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHJldHVybiBmaWxlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgd2hlbiBEcm9wem9uZSBpcyBpbml0aWFsaXplZC4gWW91XG4gICAgLy8gY2FuIChhbmQgc2hvdWxkKSBzZXR1cCBldmVudCBsaXN0ZW5lcnMgaW5zaWRlIHRoaXMgZnVuY3Rpb24uXG5cbiAgfSwge1xuICAgIGtleTogXCJpbml0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgLy8gSW4gY2FzZSBpdCBpc24ndCBzZXQgYWxyZWFkeVxuICAgICAgaWYgKHRoaXMuZWxlbWVudC50YWdOYW1lID09PSBcImZvcm1cIikge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZW5jdHlwZVwiLCBcIm11bHRpcGFydC9mb3JtLWRhdGFcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJvcHpvbmVcIikgJiYgIXRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmR6LW1lc3NhZ2VcIikpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKERyb3B6b25lLmNyZWF0ZUVsZW1lbnQoXCI8ZGl2IGNsYXNzPVxcXCJkei1kZWZhdWx0IGR6LW1lc3NhZ2VcXFwiPjxzcGFuPlwiICsgdGhpcy5vcHRpb25zLmRpY3REZWZhdWx0TWVzc2FnZSArIFwiPC9zcGFuPjwvZGl2PlwiKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNsaWNrYWJsZUVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgICB2YXIgc2V0dXBIaWRkZW5GaWxlSW5wdXQgPSBmdW5jdGlvbiBzZXR1cEhpZGRlbkZpbGVJbnB1dCgpIHtcbiAgICAgICAgICBpZiAoX3RoaXMzLmhpZGRlbkZpbGVJbnB1dCkge1xuICAgICAgICAgICAgX3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKF90aGlzMy5oaWRkZW5GaWxlSW5wdXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpczMuaGlkZGVuRmlsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgIF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImZpbGVcIik7XG4gICAgICAgICAgaWYgKF90aGlzMy5vcHRpb25zLm1heEZpbGVzID09PSBudWxsIHx8IF90aGlzMy5vcHRpb25zLm1heEZpbGVzID4gMSkge1xuICAgICAgICAgICAgX3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiLCBcIm11bHRpcGxlXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpczMuaGlkZGVuRmlsZUlucHV0LmNsYXNzTmFtZSA9IFwiZHotaGlkZGVuLWlucHV0XCI7XG5cbiAgICAgICAgICBpZiAoX3RoaXMzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgX3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJhY2NlcHRcIiwgX3RoaXMzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChfdGhpczMub3B0aW9ucy5jYXB0dXJlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBfdGhpczMuaGlkZGVuRmlsZUlucHV0LnNldEF0dHJpYnV0ZShcImNhcHR1cmVcIiwgX3RoaXMzLm9wdGlvbnMuY2FwdHVyZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTm90IHNldHRpbmcgYGRpc3BsYXk9XCJub25lXCJgIGJlY2F1c2Ugc29tZSBicm93c2VycyBkb24ndCBhY2NlcHQgY2xpY2tzXG4gICAgICAgICAgLy8gb24gZWxlbWVudHMgdGhhdCBhcmVuJ3QgZGlzcGxheWVkLlxuICAgICAgICAgIF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgICAgX3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICAgICAgICBfdGhpczMuaGlkZGVuRmlsZUlucHV0LnN0eWxlLnRvcCA9IFwiMFwiO1xuICAgICAgICAgIF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUubGVmdCA9IFwiMFwiO1xuICAgICAgICAgIF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuc3R5bGUuaGVpZ2h0ID0gXCIwXCI7XG4gICAgICAgICAgX3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5zdHlsZS53aWR0aCA9IFwiMFwiO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoX3RoaXMzLm9wdGlvbnMuaGlkZGVuSW5wdXRDb250YWluZXIpLmFwcGVuZENoaWxkKF90aGlzMy5oaWRkZW5GaWxlSW5wdXQpO1xuICAgICAgICAgIHJldHVybiBfdGhpczMuaGlkZGVuRmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGZpbGVzID0gX3RoaXMzLmhpZGRlbkZpbGVJbnB1dC5maWxlcztcblxuICAgICAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IxMCA9IGZpbGVzLCBfaXNBcnJheTEwID0gdHJ1ZSwgX2kxMCA9IDAsIF9pdGVyYXRvcjEwID0gX2lzQXJyYXkxMCA/IF9pdGVyYXRvcjEwIDogX2l0ZXJhdG9yMTBbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgICAgICB2YXIgX3JlZjk7XG5cbiAgICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkxMCkge1xuICAgICAgICAgICAgICAgICAgaWYgKF9pMTAgPj0gX2l0ZXJhdG9yMTAubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICAgIF9yZWY5ID0gX2l0ZXJhdG9yMTBbX2kxMCsrXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgX2kxMCA9IF9pdGVyYXRvcjEwLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChfaTEwLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgX3JlZjkgPSBfaTEwLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBmaWxlID0gX3JlZjk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczMuYWRkRmlsZShmaWxlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMzLmVtaXQoXCJhZGRlZGZpbGVzXCIsIGZpbGVzKTtcbiAgICAgICAgICAgIHJldHVybiBzZXR1cEhpZGRlbkZpbGVJbnB1dCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBzZXR1cEhpZGRlbkZpbGVJbnB1dCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLlVSTCA9IHdpbmRvdy5VUkwgIT09IG51bGwgPyB3aW5kb3cuVVJMIDogd2luZG93LndlYmtpdFVSTDtcblxuICAgICAgLy8gU2V0dXAgYWxsIGV2ZW50IGxpc3RlbmVycyBvbiB0aGUgRHJvcHpvbmUgb2JqZWN0IGl0c2VsZi5cbiAgICAgIC8vIFRoZXkncmUgbm90IGluIEBzZXR1cEV2ZW50TGlzdGVuZXJzKCkgYmVjYXVzZSB0aGV5IHNob3VsZG4ndCBiZSByZW1vdmVkXG4gICAgICAvLyBhZ2FpbiB3aGVuIHRoZSBkcm9wem9uZSBnZXRzIGRpc2FibGVkLlxuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMTEgPSB0aGlzLmV2ZW50cywgX2lzQXJyYXkxMSA9IHRydWUsIF9pMTEgPSAwLCBfaXRlcmF0b3IxMSA9IF9pc0FycmF5MTEgPyBfaXRlcmF0b3IxMSA6IF9pdGVyYXRvcjExW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgIHZhciBfcmVmMTA7XG5cbiAgICAgICAgaWYgKF9pc0FycmF5MTEpIHtcbiAgICAgICAgICBpZiAoX2kxMSA+PSBfaXRlcmF0b3IxMS5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgIF9yZWYxMCA9IF9pdGVyYXRvcjExW19pMTErK107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2kxMSA9IF9pdGVyYXRvcjExLm5leHQoKTtcbiAgICAgICAgICBpZiAoX2kxMS5kb25lKSBicmVhaztcbiAgICAgICAgICBfcmVmMTAgPSBfaTExLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGV2ZW50TmFtZSA9IF9yZWYxMDtcblxuICAgICAgICB0aGlzLm9uKGV2ZW50TmFtZSwgdGhpcy5vcHRpb25zW2V2ZW50TmFtZV0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm9uKFwidXBsb2FkcHJvZ3Jlc3NcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMzLnVwZGF0ZVRvdGFsVXBsb2FkUHJvZ3Jlc3MoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLm9uKFwicmVtb3ZlZGZpbGVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMzLnVwZGF0ZVRvdGFsVXBsb2FkUHJvZ3Jlc3MoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLm9uKFwiY2FuY2VsZWRcIiwgZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMy5lbWl0KFwiY29tcGxldGVcIiwgZmlsZSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gRW1pdCBhIGBxdWV1ZWNvbXBsZXRlYCBldmVudCBpZiBhbGwgZmlsZXMgZmluaXNoZWQgdXBsb2FkaW5nLlxuICAgICAgdGhpcy5vbihcImNvbXBsZXRlXCIsIGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIGlmIChfdGhpczMuZ2V0QWRkZWRGaWxlcygpLmxlbmd0aCA9PT0gMCAmJiBfdGhpczMuZ2V0VXBsb2FkaW5nRmlsZXMoKS5sZW5ndGggPT09IDAgJiYgX3RoaXMzLmdldFF1ZXVlZEZpbGVzKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgLy8gVGhpcyBuZWVkcyB0byBiZSBkZWZlcnJlZCBzbyB0aGF0IGBxdWV1ZWNvbXBsZXRlYCByZWFsbHkgdHJpZ2dlcnMgYWZ0ZXIgYGNvbXBsZXRlYFxuICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpczMuZW1pdChcInF1ZXVlY29tcGxldGVcIik7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB2YXIgbm9Qcm9wYWdhdGlvbiA9IGZ1bmN0aW9uIG5vUHJvcGFnYXRpb24oZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gQ3JlYXRlIHRoZSBsaXN0ZW5lcnNcbiAgICAgIHRoaXMubGlzdGVuZXJzID0gW3tcbiAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICBcImRyYWdzdGFydFwiOiBmdW5jdGlvbiBkcmFnc3RhcnQoZSkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzMy5lbWl0KFwiZHJhZ3N0YXJ0XCIsIGUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkcmFnZW50ZXJcIjogZnVuY3Rpb24gZHJhZ2VudGVyKGUpIHtcbiAgICAgICAgICAgIG5vUHJvcGFnYXRpb24oZSk7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMzLmVtaXQoXCJkcmFnZW50ZXJcIiwgZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRyYWdvdmVyXCI6IGZ1bmN0aW9uIGRyYWdvdmVyKGUpIHtcbiAgICAgICAgICAgIC8vIE1ha2VzIGl0IHBvc3NpYmxlIHRvIGRyYWcgZmlsZXMgZnJvbSBjaHJvbWUncyBkb3dubG9hZCBiYXJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTk1MjY0MzAvZHJhZy1hbmQtZHJvcC1maWxlLXVwbG9hZHMtZnJvbS1jaHJvbWUtZG93bmxvYWRzLWJhclxuICAgICAgICAgICAgLy8gVHJ5IGlzIHJlcXVpcmVkIHRvIHByZXZlbnQgYnVnIGluIEludGVybmV0IEV4cGxvcmVyIDExIChTQ1JJUFQ2NTUzNSBleGNlcHRpb24pXG4gICAgICAgICAgICB2YXIgZWZjdCA9IHZvaWQgMDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGVmY3QgPSBlLmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgICAgICAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnID09PSBlZmN0IHx8ICdsaW5rTW92ZScgPT09IGVmY3QgPyAnbW92ZScgOiAnY29weSc7XG5cbiAgICAgICAgICAgIG5vUHJvcGFnYXRpb24oZSk7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMzLmVtaXQoXCJkcmFnb3ZlclwiLCBlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZHJhZ2xlYXZlXCI6IGZ1bmN0aW9uIGRyYWdsZWF2ZShlKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMzLmVtaXQoXCJkcmFnbGVhdmVcIiwgZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRyb3BcIjogZnVuY3Rpb24gZHJvcChlKSB7XG4gICAgICAgICAgICBub1Byb3BhZ2F0aW9uKGUpO1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzMy5kcm9wKGUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJkcmFnZW5kXCI6IGZ1bmN0aW9uIGRyYWdlbmQoZSkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzMy5lbWl0KFwiZHJhZ2VuZFwiLCBlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBUaGlzIGlzIGRpc2FibGVkIHJpZ2h0IG5vdywgYmVjYXVzZSB0aGUgYnJvd3NlcnMgZG9uJ3QgaW1wbGVtZW50IGl0IHByb3Blcmx5LlxuICAgICAgICAgIC8vIFwicGFzdGVcIjogKGUpID0+XG4gICAgICAgICAgLy8gICBub1Byb3BhZ2F0aW9uIGVcbiAgICAgICAgICAvLyAgIEBwYXN0ZSBlXG4gICAgICAgIH0gfV07XG5cbiAgICAgIHRoaXMuY2xpY2thYmxlRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoY2xpY2thYmxlRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gX3RoaXMzLmxpc3RlbmVycy5wdXNoKHtcbiAgICAgICAgICBlbGVtZW50OiBjbGlja2FibGVFbGVtZW50LFxuICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgXCJjbGlja1wiOiBmdW5jdGlvbiBjbGljayhldnQpIHtcbiAgICAgICAgICAgICAgLy8gT25seSB0aGUgYWN0dWFsIGRyb3B6b25lIG9yIHRoZSBtZXNzYWdlIGVsZW1lbnQgc2hvdWxkIHRyaWdnZXIgZmlsZSBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgaWYgKGNsaWNrYWJsZUVsZW1lbnQgIT09IF90aGlzMy5lbGVtZW50IHx8IGV2dC50YXJnZXQgPT09IF90aGlzMy5lbGVtZW50IHx8IERyb3B6b25lLmVsZW1lbnRJbnNpZGUoZXZ0LnRhcmdldCwgX3RoaXMzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5kei1tZXNzYWdlXCIpKSkge1xuICAgICAgICAgICAgICAgIF90aGlzMy5oaWRkZW5GaWxlSW5wdXQuY2xpY2soKTsgLy8gRm9yd2FyZCB0aGUgY2xpY2tcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZW5hYmxlKCk7XG5cbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaW5pdC5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIC8vIE5vdCBmdWxseSB0ZXN0ZWQgeWV0XG5cbiAgfSwge1xuICAgIGtleTogXCJkZXN0cm95XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsRmlsZXModHJ1ZSk7XG4gICAgICBpZiAodGhpcy5oaWRkZW5GaWxlSW5wdXQgIT0gbnVsbCA/IHRoaXMuaGlkZGVuRmlsZUlucHV0LnBhcmVudE5vZGUgOiB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5oaWRkZW5GaWxlSW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmhpZGRlbkZpbGVJbnB1dCk7XG4gICAgICAgIHRoaXMuaGlkZGVuRmlsZUlucHV0ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnQuZHJvcHpvbmU7XG4gICAgICByZXR1cm4gRHJvcHpvbmUuaW5zdGFuY2VzLnNwbGljZShEcm9wem9uZS5pbnN0YW5jZXMuaW5kZXhPZih0aGlzKSwgMSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVwZGF0ZVRvdGFsVXBsb2FkUHJvZ3Jlc3NcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlVG90YWxVcGxvYWRQcm9ncmVzcygpIHtcbiAgICAgIHZhciB0b3RhbFVwbG9hZFByb2dyZXNzID0gdm9pZCAwO1xuICAgICAgdmFyIHRvdGFsQnl0ZXNTZW50ID0gMDtcbiAgICAgIHZhciB0b3RhbEJ5dGVzID0gMDtcblxuICAgICAgdmFyIGFjdGl2ZUZpbGVzID0gdGhpcy5nZXRBY3RpdmVGaWxlcygpO1xuXG4gICAgICBpZiAoYWN0aXZlRmlsZXMubGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjEyID0gdGhpcy5nZXRBY3RpdmVGaWxlcygpLCBfaXNBcnJheTEyID0gdHJ1ZSwgX2kxMiA9IDAsIF9pdGVyYXRvcjEyID0gX2lzQXJyYXkxMiA/IF9pdGVyYXRvcjEyIDogX2l0ZXJhdG9yMTJbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICB2YXIgX3JlZjExO1xuXG4gICAgICAgICAgaWYgKF9pc0FycmF5MTIpIHtcbiAgICAgICAgICAgIGlmIChfaTEyID49IF9pdGVyYXRvcjEyLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmMTEgPSBfaXRlcmF0b3IxMltfaTEyKytdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfaTEyID0gX2l0ZXJhdG9yMTIubmV4dCgpO1xuICAgICAgICAgICAgaWYgKF9pMTIuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmMTEgPSBfaTEyLnZhbHVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBmaWxlID0gX3JlZjExO1xuXG4gICAgICAgICAgdG90YWxCeXRlc1NlbnQgKz0gZmlsZS51cGxvYWQuYnl0ZXNTZW50O1xuICAgICAgICAgIHRvdGFsQnl0ZXMgKz0gZmlsZS51cGxvYWQudG90YWw7XG4gICAgICAgIH1cbiAgICAgICAgdG90YWxVcGxvYWRQcm9ncmVzcyA9IDEwMCAqIHRvdGFsQnl0ZXNTZW50IC8gdG90YWxCeXRlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvdGFsVXBsb2FkUHJvZ3Jlc3MgPSAxMDA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJ0b3RhbHVwbG9hZHByb2dyZXNzXCIsIHRvdGFsVXBsb2FkUHJvZ3Jlc3MsIHRvdGFsQnl0ZXMsIHRvdGFsQnl0ZXNTZW50KTtcbiAgICB9XG5cbiAgICAvLyBAb3B0aW9ucy5wYXJhbU5hbWUgY2FuIGJlIGEgZnVuY3Rpb24gdGFraW5nIG9uZSBwYXJhbWV0ZXIgcmF0aGVyIHRoYW4gYSBzdHJpbmcuXG4gICAgLy8gQSBwYXJhbWV0ZXIgbmFtZSBmb3IgYSBmaWxlIGlzIG9idGFpbmVkIHNpbXBseSBieSBjYWxsaW5nIHRoaXMgd2l0aCBhbiBpbmRleCBudW1iZXIuXG5cbiAgfSwge1xuICAgIGtleTogXCJfZ2V0UGFyYW1OYW1lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRQYXJhbU5hbWUobikge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMucGFyYW1OYW1lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5wYXJhbU5hbWUobik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJcIiArIHRoaXMub3B0aW9ucy5wYXJhbU5hbWUgKyAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlID8gXCJbXCIgKyBuICsgXCJdXCIgOiBcIlwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiBAb3B0aW9ucy5yZW5hbWVGaWxlIGlzIGEgZnVuY3Rpb24sXG4gICAgLy8gdGhlIGZ1bmN0aW9uIHdpbGwgYmUgdXNlZCB0byByZW5hbWUgdGhlIGZpbGUubmFtZSBiZWZvcmUgYXBwZW5kaW5nIGl0IHRvIHRoZSBmb3JtRGF0YVxuXG4gIH0sIHtcbiAgICBrZXk6IFwiX3JlbmFtZUZpbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3JlbmFtZUZpbGUoZmlsZSkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMucmVuYW1lRmlsZSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBmaWxlLm5hbWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnJlbmFtZUZpbGUoZmlsZSk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJucyBhIGZvcm0gdGhhdCBjYW4gYmUgdXNlZCBhcyBmYWxsYmFjayBpZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IERyYWduRHJvcFxuICAgIC8vXG4gICAgLy8gSWYgdGhlIGRyb3B6b25lIGlzIGFscmVhZHkgYSBmb3JtLCBvbmx5IHRoZSBpbnB1dCBmaWVsZCBhbmQgYnV0dG9uIGFyZSByZXR1cm5lZC4gT3RoZXJ3aXNlIGEgY29tcGxldGUgZm9ybSBlbGVtZW50IGlzIHByb3ZpZGVkLlxuICAgIC8vIFRoaXMgY29kZSBoYXMgdG8gcGFzcyBpbiBJRTcgOihcblxuICB9LCB7XG4gICAga2V5OiBcImdldEZhbGxiYWNrRm9ybVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRGYWxsYmFja0Zvcm0oKSB7XG4gICAgICB2YXIgZXhpc3RpbmdGYWxsYmFjayA9IHZvaWQgMCxcbiAgICAgICAgICBmb3JtID0gdm9pZCAwO1xuICAgICAgaWYgKGV4aXN0aW5nRmFsbGJhY2sgPSB0aGlzLmdldEV4aXN0aW5nRmFsbGJhY2soKSkge1xuICAgICAgICByZXR1cm4gZXhpc3RpbmdGYWxsYmFjaztcbiAgICAgIH1cblxuICAgICAgdmFyIGZpZWxkc1N0cmluZyA9IFwiPGRpdiBjbGFzcz1cXFwiZHotZmFsbGJhY2tcXFwiPlwiO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kaWN0RmFsbGJhY2tUZXh0KSB7XG4gICAgICAgIGZpZWxkc1N0cmluZyArPSBcIjxwPlwiICsgdGhpcy5vcHRpb25zLmRpY3RGYWxsYmFja1RleHQgKyBcIjwvcD5cIjtcbiAgICAgIH1cbiAgICAgIGZpZWxkc1N0cmluZyArPSBcIjxpbnB1dCB0eXBlPVxcXCJmaWxlXFxcIiBuYW1lPVxcXCJcIiArIHRoaXMuX2dldFBhcmFtTmFtZSgwKSArIFwiXFxcIiBcIiArICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUgPyAnbXVsdGlwbGU9XCJtdWx0aXBsZVwiJyA6IHVuZGVmaW5lZCkgKyBcIiAvPjxpbnB1dCB0eXBlPVxcXCJzdWJtaXRcXFwiIHZhbHVlPVxcXCJVcGxvYWQhXFxcIj48L2Rpdj5cIjtcblxuICAgICAgdmFyIGZpZWxkcyA9IERyb3B6b25lLmNyZWF0ZUVsZW1lbnQoZmllbGRzU3RyaW5nKTtcbiAgICAgIGlmICh0aGlzLmVsZW1lbnQudGFnTmFtZSAhPT0gXCJGT1JNXCIpIHtcbiAgICAgICAgZm9ybSA9IERyb3B6b25lLmNyZWF0ZUVsZW1lbnQoXCI8Zm9ybSBhY3Rpb249XFxcIlwiICsgdGhpcy5vcHRpb25zLnVybCArIFwiXFxcIiBlbmN0eXBlPVxcXCJtdWx0aXBhcnQvZm9ybS1kYXRhXFxcIiBtZXRob2Q9XFxcIlwiICsgdGhpcy5vcHRpb25zLm1ldGhvZCArIFwiXFxcIj48L2Zvcm0+XCIpO1xuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGZpZWxkcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgZW5jdHlwZSBhbmQgbWV0aG9kIGF0dHJpYnV0ZXMgYXJlIHNldCBwcm9wZXJseVxuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZW5jdHlwZVwiLCBcIm11bHRpcGFydC9mb3JtLWRhdGFcIik7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZXRob2RcIiwgdGhpcy5vcHRpb25zLm1ldGhvZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZm9ybSAhPSBudWxsID8gZm9ybSA6IGZpZWxkcztcbiAgICB9XG5cbiAgICAvLyBSZXR1cm5zIHRoZSBmYWxsYmFjayBlbGVtZW50cyBpZiB0aGV5IGV4aXN0IGFscmVhZHlcbiAgICAvL1xuICAgIC8vIFRoaXMgY29kZSBoYXMgdG8gcGFzcyBpbiBJRTcgOihcblxuICB9LCB7XG4gICAga2V5OiBcImdldEV4aXN0aW5nRmFsbGJhY2tcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RXhpc3RpbmdGYWxsYmFjaygpIHtcbiAgICAgIHZhciBnZXRGYWxsYmFjayA9IGZ1bmN0aW9uIGdldEZhbGxiYWNrKGVsZW1lbnRzKSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjEzID0gZWxlbWVudHMsIF9pc0FycmF5MTMgPSB0cnVlLCBfaTEzID0gMCwgX2l0ZXJhdG9yMTMgPSBfaXNBcnJheTEzID8gX2l0ZXJhdG9yMTMgOiBfaXRlcmF0b3IxM1tTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgIHZhciBfcmVmMTI7XG5cbiAgICAgICAgICBpZiAoX2lzQXJyYXkxMykge1xuICAgICAgICAgICAgaWYgKF9pMTMgPj0gX2l0ZXJhdG9yMTMubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYxMiA9IF9pdGVyYXRvcjEzW19pMTMrK107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9pMTMgPSBfaXRlcmF0b3IxMy5uZXh0KCk7XG4gICAgICAgICAgICBpZiAoX2kxMy5kb25lKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYxMiA9IF9pMTMudmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGVsID0gX3JlZjEyO1xuXG4gICAgICAgICAgaWYgKC8oXnwgKWZhbGxiYWNrKCR8ICkvLnRlc3QoZWwuY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdmFyIF9hcnIgPSBbXCJkaXZcIiwgXCJmb3JtXCJdO1xuICAgICAgZm9yICh2YXIgX2kxNCA9IDA7IF9pMTQgPCBfYXJyLmxlbmd0aDsgX2kxNCsrKSB7XG4gICAgICAgIHZhciB0YWdOYW1lID0gX2FycltfaTE0XTtcbiAgICAgICAgdmFyIGZhbGxiYWNrO1xuICAgICAgICBpZiAoZmFsbGJhY2sgPSBnZXRGYWxsYmFjayh0aGlzLmVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnTmFtZSkpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbGxiYWNrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWN0aXZhdGVzIGFsbCBsaXN0ZW5lcnMgc3RvcmVkIGluIEBsaXN0ZW5lcnNcblxuICB9LCB7XG4gICAga2V5OiBcInNldHVwRXZlbnRMaXN0ZW5lcnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0dXBFdmVudExpc3RlbmVycygpIHtcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVycy5tYXAoZnVuY3Rpb24gKGVsZW1lbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgZm9yICh2YXIgZXZlbnQgaW4gZWxlbWVudExpc3RlbmVycy5ldmVudHMpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGVsZW1lbnRMaXN0ZW5lcnMuZXZlbnRzW2V2ZW50XTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVsZW1lbnRMaXN0ZW5lcnMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gRGVhY3RpdmF0ZXMgYWxsIGxpc3RlbmVycyBzdG9yZWQgaW4gQGxpc3RlbmVyc1xuXG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlRXZlbnRMaXN0ZW5lcnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnMubWFwKGZ1bmN0aW9uIChlbGVtZW50TGlzdGVuZXJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGV2ZW50IGluIGVsZW1lbnRMaXN0ZW5lcnMuZXZlbnRzKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBlbGVtZW50TGlzdGVuZXJzLmV2ZW50c1tldmVudF07XG4gICAgICAgICAgICByZXN1bHQucHVzaChlbGVtZW50TGlzdGVuZXJzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIsIGZhbHNlKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0oKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycyBhbmQgY2FuY2VscyBhbGwgZmlsZXMgaW4gdGhlIHF1ZXVlIG9yIGJlaW5nIHByb2Nlc3NlZC5cblxuICB9LCB7XG4gICAga2V5OiBcImRpc2FibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB0aGlzLmNsaWNrYWJsZUVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImR6LWNsaWNrYWJsZVwiKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWU7XG5cbiAgICAgIHJldHVybiB0aGlzLmZpbGVzLm1hcChmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICByZXR1cm4gX3RoaXM0LmNhbmNlbFVwbG9hZChmaWxlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlbmFibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgZGVsZXRlIHRoaXMuZGlzYWJsZWQ7XG4gICAgICB0aGlzLmNsaWNrYWJsZUVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LWNsaWNrYWJsZVwiKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXMuc2V0dXBFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIC8vIFJldHVybnMgYSBuaWNlbHkgZm9ybWF0dGVkIGZpbGVzaXplXG5cbiAgfSwge1xuICAgIGtleTogXCJmaWxlc2l6ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmaWxlc2l6ZShzaXplKSB7XG4gICAgICB2YXIgc2VsZWN0ZWRTaXplID0gMDtcbiAgICAgIHZhciBzZWxlY3RlZFVuaXQgPSBcImJcIjtcblxuICAgICAgaWYgKHNpemUgPiAwKSB7XG4gICAgICAgIHZhciB1bml0cyA9IFsndGInLCAnZ2InLCAnbWInLCAna2InLCAnYiddO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdW5pdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgdW5pdCA9IHVuaXRzW2ldO1xuICAgICAgICAgIHZhciBjdXRvZmYgPSBNYXRoLnBvdyh0aGlzLm9wdGlvbnMuZmlsZXNpemVCYXNlLCA0IC0gaSkgLyAxMDtcblxuICAgICAgICAgIGlmIChzaXplID49IGN1dG9mZikge1xuICAgICAgICAgICAgc2VsZWN0ZWRTaXplID0gc2l6ZSAvIE1hdGgucG93KHRoaXMub3B0aW9ucy5maWxlc2l6ZUJhc2UsIDQgLSBpKTtcbiAgICAgICAgICAgIHNlbGVjdGVkVW5pdCA9IHVuaXQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZWxlY3RlZFNpemUgPSBNYXRoLnJvdW5kKDEwICogc2VsZWN0ZWRTaXplKSAvIDEwOyAvLyBDdXR0aW5nIG9mIGRpZ2l0c1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gXCI8c3Ryb25nPlwiICsgc2VsZWN0ZWRTaXplICsgXCI8L3N0cm9uZz4gXCIgKyB0aGlzLm9wdGlvbnMuZGljdEZpbGVTaXplVW5pdHNbc2VsZWN0ZWRVbml0XTtcbiAgICB9XG5cbiAgICAvLyBBZGRzIG9yIHJlbW92ZXMgdGhlIGBkei1tYXgtZmlsZXMtcmVhY2hlZGAgY2xhc3MgZnJvbSB0aGUgZm9ybS5cblxuICB9LCB7XG4gICAga2V5OiBcIl91cGRhdGVNYXhGaWxlc1JlYWNoZWRDbGFzc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlTWF4RmlsZXNSZWFjaGVkQ2xhc3MoKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm1heEZpbGVzICE9IG51bGwgJiYgdGhpcy5nZXRBY2NlcHRlZEZpbGVzKCkubGVuZ3RoID49IHRoaXMub3B0aW9ucy5tYXhGaWxlcykge1xuICAgICAgICBpZiAodGhpcy5nZXRBY2NlcHRlZEZpbGVzKCkubGVuZ3RoID09PSB0aGlzLm9wdGlvbnMubWF4RmlsZXMpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoJ21heGZpbGVzcmVhY2hlZCcsIHRoaXMuZmlsZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImR6LW1heC1maWxlcy1yZWFjaGVkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZHotbWF4LWZpbGVzLXJlYWNoZWRcIik7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImRyb3BcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZHJvcChlKSB7XG4gICAgICBpZiAoIWUuZGF0YVRyYW5zZmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZW1pdChcImRyb3BcIiwgZSk7XG5cbiAgICAgIC8vIENvbnZlcnQgdGhlIEZpbGVMaXN0IHRvIGFuIEFycmF5XG4gICAgICAvLyBUaGlzIGlzIG5lY2Vzc2FyeSBmb3IgSUUxMVxuICAgICAgdmFyIGZpbGVzID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGUuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZpbGVzW2ldID0gZS5kYXRhVHJhbnNmZXIuZmlsZXNbaV07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZW1pdChcImFkZGVkZmlsZXNcIiwgZmlsZXMpO1xuXG4gICAgICAvLyBFdmVuIGlmIGl0J3MgYSBmb2xkZXIsIGZpbGVzLmxlbmd0aCB3aWxsIGNvbnRhaW4gdGhlIGZvbGRlcnMuXG4gICAgICBpZiAoZmlsZXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBpdGVtcyA9IGUuZGF0YVRyYW5zZmVyLml0ZW1zO1xuXG4gICAgICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGggJiYgaXRlbXNbMF0ud2Via2l0R2V0QXNFbnRyeSAhPSBudWxsKSB7XG4gICAgICAgICAgLy8gVGhlIGJyb3dzZXIgc3VwcG9ydHMgZHJvcHBpbmcgb2YgZm9sZGVycywgc28gaGFuZGxlIGl0ZW1zIGluc3RlYWQgb2YgZmlsZXNcbiAgICAgICAgICB0aGlzLl9hZGRGaWxlc0Zyb21JdGVtcyhpdGVtcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVGaWxlcyhmaWxlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicGFzdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGFzdGUoZSkge1xuICAgICAgaWYgKF9fZ3VhcmRfXyhlICE9IG51bGwgPyBlLmNsaXBib2FyZERhdGEgOiB1bmRlZmluZWQsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiB4Lml0ZW1zO1xuICAgICAgfSkgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZW1pdChcInBhc3RlXCIsIGUpO1xuICAgICAgdmFyIGl0ZW1zID0gZS5jbGlwYm9hcmREYXRhLml0ZW1zO1xuXG5cbiAgICAgIGlmIChpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZEZpbGVzRnJvbUl0ZW1zKGl0ZW1zKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFuZGxlRmlsZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlRmlsZXMoZmlsZXMpIHtcbiAgICAgIGZvciAodmFyIF9pdGVyYXRvcjE0ID0gZmlsZXMsIF9pc0FycmF5MTQgPSB0cnVlLCBfaTE1ID0gMCwgX2l0ZXJhdG9yMTQgPSBfaXNBcnJheTE0ID8gX2l0ZXJhdG9yMTQgOiBfaXRlcmF0b3IxNFtTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICB2YXIgX3JlZjEzO1xuXG4gICAgICAgIGlmIChfaXNBcnJheTE0KSB7XG4gICAgICAgICAgaWYgKF9pMTUgPj0gX2l0ZXJhdG9yMTQubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICBfcmVmMTMgPSBfaXRlcmF0b3IxNFtfaTE1KytdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9pMTUgPSBfaXRlcmF0b3IxNC5uZXh0KCk7XG4gICAgICAgICAgaWYgKF9pMTUuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgX3JlZjEzID0gX2kxNS52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmaWxlID0gX3JlZjEzO1xuXG4gICAgICAgIHRoaXMuYWRkRmlsZShmaWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXaGVuIGEgZm9sZGVyIGlzIGRyb3BwZWQgKG9yIGZpbGVzIGFyZSBwYXN0ZWQpLCBpdGVtcyBtdXN0IGJlIGhhbmRsZWRcbiAgICAvLyBpbnN0ZWFkIG9mIGZpbGVzLlxuXG4gIH0sIHtcbiAgICBrZXk6IFwiX2FkZEZpbGVzRnJvbUl0ZW1zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9hZGRGaWxlc0Zyb21JdGVtcyhpdGVtcykge1xuICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMTUgPSBpdGVtcywgX2lzQXJyYXkxNSA9IHRydWUsIF9pMTYgPSAwLCBfaXRlcmF0b3IxNSA9IF9pc0FycmF5MTUgPyBfaXRlcmF0b3IxNSA6IF9pdGVyYXRvcjE1W1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgdmFyIF9yZWYxNDtcblxuICAgICAgICAgIGlmIChfaXNBcnJheTE1KSB7XG4gICAgICAgICAgICBpZiAoX2kxNiA+PSBfaXRlcmF0b3IxNS5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZjE0ID0gX2l0ZXJhdG9yMTVbX2kxNisrXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX2kxNiA9IF9pdGVyYXRvcjE1Lm5leHQoKTtcbiAgICAgICAgICAgIGlmIChfaTE2LmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZjE0ID0gX2kxNi52YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXRlbSA9IF9yZWYxNDtcblxuICAgICAgICAgIHZhciBlbnRyeTtcbiAgICAgICAgICBpZiAoaXRlbS53ZWJraXRHZXRBc0VudHJ5ICE9IG51bGwgJiYgKGVudHJ5ID0gaXRlbS53ZWJraXRHZXRBc0VudHJ5KCkpKSB7XG4gICAgICAgICAgICBpZiAoZW50cnkuaXNGaWxlKSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKF90aGlzNS5hZGRGaWxlKGl0ZW0uZ2V0QXNGaWxlKCkpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW50cnkuaXNEaXJlY3RvcnkpIHtcbiAgICAgICAgICAgICAgLy8gQXBwZW5kIGFsbCBmaWxlcyBmcm9tIHRoYXQgZGlyZWN0b3J5IHRvIGZpbGVzXG4gICAgICAgICAgICAgIHJlc3VsdC5wdXNoKF90aGlzNS5fYWRkRmlsZXNGcm9tRGlyZWN0b3J5KGVudHJ5LCBlbnRyeS5uYW1lKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXN1bHQucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5nZXRBc0ZpbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0ua2luZCA9PSBudWxsIHx8IGl0ZW0ua2luZCA9PT0gXCJmaWxlXCIpIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2goX3RoaXM1LmFkZEZpbGUoaXRlbS5nZXRBc0ZpbGUoKSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzdWx0LnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0oKTtcbiAgICB9XG5cbiAgICAvLyBHb2VzIHRocm91Z2ggdGhlIGRpcmVjdG9yeSwgYW5kIGFkZHMgZWFjaCBmaWxlIGl0IGZpbmRzIHJlY3Vyc2l2ZWx5XG5cbiAgfSwge1xuICAgIGtleTogXCJfYWRkRmlsZXNGcm9tRGlyZWN0b3J5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9hZGRGaWxlc0Zyb21EaXJlY3RvcnkoZGlyZWN0b3J5LCBwYXRoKSB7XG4gICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgdmFyIGRpclJlYWRlciA9IGRpcmVjdG9yeS5jcmVhdGVSZWFkZXIoKTtcblxuICAgICAgdmFyIGVycm9ySGFuZGxlciA9IGZ1bmN0aW9uIGVycm9ySGFuZGxlcihlcnJvcikge1xuICAgICAgICByZXR1cm4gX19ndWFyZE1ldGhvZF9fKGNvbnNvbGUsICdsb2cnLCBmdW5jdGlvbiAobykge1xuICAgICAgICAgIHJldHVybiBvLmxvZyhlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgdmFyIHJlYWRFbnRyaWVzID0gZnVuY3Rpb24gcmVhZEVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiBkaXJSZWFkZXIucmVhZEVudHJpZXMoZnVuY3Rpb24gKGVudHJpZXMpIHtcbiAgICAgICAgICBpZiAoZW50cmllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IxNiA9IGVudHJpZXMsIF9pc0FycmF5MTYgPSB0cnVlLCBfaTE3ID0gMCwgX2l0ZXJhdG9yMTYgPSBfaXNBcnJheTE2ID8gX2l0ZXJhdG9yMTYgOiBfaXRlcmF0b3IxNltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgICB2YXIgX3JlZjE1O1xuXG4gICAgICAgICAgICAgIGlmIChfaXNBcnJheTE2KSB7XG4gICAgICAgICAgICAgICAgaWYgKF9pMTcgPj0gX2l0ZXJhdG9yMTYubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICBfcmVmMTUgPSBfaXRlcmF0b3IxNltfaTE3KytdO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9pMTcgPSBfaXRlcmF0b3IxNi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKF9pMTcuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgX3JlZjE1ID0gX2kxNy52YWx1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IF9yZWYxNTtcblxuICAgICAgICAgICAgICBpZiAoZW50cnkuaXNGaWxlKSB7XG4gICAgICAgICAgICAgICAgZW50cnkuZmlsZShmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKF90aGlzNi5vcHRpb25zLmlnbm9yZUhpZGRlbkZpbGVzICYmIGZpbGUubmFtZS5zdWJzdHJpbmcoMCwgMSkgPT09ICcuJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBmaWxlLmZ1bGxQYXRoID0gcGF0aCArIFwiL1wiICsgZmlsZS5uYW1lO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzNi5hZGRGaWxlKGZpbGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgX3RoaXM2Ll9hZGRGaWxlc0Zyb21EaXJlY3RvcnkoZW50cnksIHBhdGggKyBcIi9cIiArIGVudHJ5Lm5hbWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNhbGwgcmVhZEVudHJpZXMoKSBhZ2Fpbiwgc2luY2UgYnJvd3NlciBvbmx5IGhhbmRsZVxuICAgICAgICAgICAgLy8gdGhlIGZpcnN0IDEwMCBlbnRyaWVzLlxuICAgICAgICAgICAgLy8gU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRGlyZWN0b3J5UmVhZGVyI3JlYWRFbnRyaWVzXG4gICAgICAgICAgICByZWFkRW50cmllcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSwgZXJyb3JIYW5kbGVyKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiByZWFkRW50cmllcygpO1xuICAgIH1cblxuICAgIC8vIElmIGBkb25lKClgIGlzIGNhbGxlZCB3aXRob3V0IGFyZ3VtZW50IHRoZSBmaWxlIGlzIGFjY2VwdGVkXG4gICAgLy8gSWYgeW91IGNhbGwgaXQgd2l0aCBhbiBlcnJvciBtZXNzYWdlLCB0aGUgZmlsZSBpcyByZWplY3RlZFxuICAgIC8vIChUaGlzIGFsbG93cyBmb3IgYXN5bmNocm9ub3VzIHZhbGlkYXRpb24pXG4gICAgLy9cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGNoZWNrcyB0aGUgZmlsZXNpemUsIGFuZCBpZiB0aGUgZmlsZS50eXBlIHBhc3NlcyB0aGVcbiAgICAvLyBgYWNjZXB0ZWRGaWxlc2AgY2hlY2suXG5cbiAgfSwge1xuICAgIGtleTogXCJhY2NlcHRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gYWNjZXB0KGZpbGUsIGRvbmUpIHtcbiAgICAgIGlmIChmaWxlLnNpemUgPiB0aGlzLm9wdGlvbnMubWF4RmlsZXNpemUgKiAxMDI0ICogMTAyNCkge1xuICAgICAgICByZXR1cm4gZG9uZSh0aGlzLm9wdGlvbnMuZGljdEZpbGVUb29CaWcucmVwbGFjZShcInt7ZmlsZXNpemV9fVwiLCBNYXRoLnJvdW5kKGZpbGUuc2l6ZSAvIDEwMjQgLyAxMC4yNCkgLyAxMDApLnJlcGxhY2UoXCJ7e21heEZpbGVzaXplfX1cIiwgdGhpcy5vcHRpb25zLm1heEZpbGVzaXplKSk7XG4gICAgICB9IGVsc2UgaWYgKCFEcm9wem9uZS5pc1ZhbGlkRmlsZShmaWxlLCB0aGlzLm9wdGlvbnMuYWNjZXB0ZWRGaWxlcykpIHtcbiAgICAgICAgcmV0dXJuIGRvbmUodGhpcy5vcHRpb25zLmRpY3RJbnZhbGlkRmlsZVR5cGUpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMubWF4RmlsZXMgIT0gbnVsbCAmJiB0aGlzLmdldEFjY2VwdGVkRmlsZXMoKS5sZW5ndGggPj0gdGhpcy5vcHRpb25zLm1heEZpbGVzKSB7XG4gICAgICAgIGRvbmUodGhpcy5vcHRpb25zLmRpY3RNYXhGaWxlc0V4Y2VlZGVkLnJlcGxhY2UoXCJ7e21heEZpbGVzfX1cIiwgdGhpcy5vcHRpb25zLm1heEZpbGVzKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmVtaXQoXCJtYXhmaWxlc2V4Y2VlZGVkXCIsIGZpbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5hY2NlcHQuY2FsbCh0aGlzLCBmaWxlLCBkb25lKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYWRkRmlsZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRGaWxlKGZpbGUpIHtcbiAgICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgICBmaWxlLnVwbG9hZCA9IHtcbiAgICAgICAgdXVpZDogRHJvcHpvbmUudXVpZHY0KCksXG4gICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAvLyBTZXR0aW5nIHRoZSB0b3RhbCB1cGxvYWQgc2l6ZSB0byBmaWxlLnNpemUgZm9yIHRoZSBiZWdpbm5pbmdcbiAgICAgICAgLy8gSXQncyBhY3R1YWwgZGlmZmVyZW50IHRoYW4gdGhlIHNpemUgdG8gYmUgdHJhbnNtaXR0ZWQuXG4gICAgICAgIHRvdGFsOiBmaWxlLnNpemUsXG4gICAgICAgIGJ5dGVzU2VudDogMCxcbiAgICAgICAgZmlsZW5hbWU6IHRoaXMuX3JlbmFtZUZpbGUoZmlsZSksXG4gICAgICAgIGNodW5rZWQ6IHRoaXMub3B0aW9ucy5jaHVua2luZyAmJiAodGhpcy5vcHRpb25zLmZvcmNlQ2h1bmtpbmcgfHwgZmlsZS5zaXplID4gdGhpcy5vcHRpb25zLmNodW5rU2l6ZSksXG4gICAgICAgIHRvdGFsQ2h1bmtDb3VudDogTWF0aC5jZWlsKGZpbGUuc2l6ZSAvIHRoaXMub3B0aW9ucy5jaHVua1NpemUpXG4gICAgICB9O1xuICAgICAgdGhpcy5maWxlcy5wdXNoKGZpbGUpO1xuXG4gICAgICBmaWxlLnN0YXR1cyA9IERyb3B6b25lLkFEREVEO1xuXG4gICAgICB0aGlzLmVtaXQoXCJhZGRlZGZpbGVcIiwgZmlsZSk7XG5cbiAgICAgIHRoaXMuX2VucXVldWVUaHVtYm5haWwoZmlsZSk7XG5cbiAgICAgIHJldHVybiB0aGlzLmFjY2VwdChmaWxlLCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgZmlsZS5hY2NlcHRlZCA9IGZhbHNlO1xuICAgICAgICAgIF90aGlzNy5fZXJyb3JQcm9jZXNzaW5nKFtmaWxlXSwgZXJyb3IpOyAvLyBXaWxsIHNldCB0aGUgZmlsZS5zdGF0dXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmaWxlLmFjY2VwdGVkID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoX3RoaXM3Lm9wdGlvbnMuYXV0b1F1ZXVlKSB7XG4gICAgICAgICAgICBfdGhpczcuZW5xdWV1ZUZpbGUoZmlsZSk7XG4gICAgICAgICAgfSAvLyBXaWxsIHNldCAuYWNjZXB0ZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzNy5fdXBkYXRlTWF4RmlsZXNSZWFjaGVkQ2xhc3MoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFdyYXBwZXIgZm9yIGVucXVldWVGaWxlXG5cbiAgfSwge1xuICAgIGtleTogXCJlbnF1ZXVlRmlsZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5xdWV1ZUZpbGVzKGZpbGVzKSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IxNyA9IGZpbGVzLCBfaXNBcnJheTE3ID0gdHJ1ZSwgX2kxOCA9IDAsIF9pdGVyYXRvcjE3ID0gX2lzQXJyYXkxNyA/IF9pdGVyYXRvcjE3IDogX2l0ZXJhdG9yMTdbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgdmFyIF9yZWYxNjtcblxuICAgICAgICBpZiAoX2lzQXJyYXkxNykge1xuICAgICAgICAgIGlmIChfaTE4ID49IF9pdGVyYXRvcjE3Lmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgX3JlZjE2ID0gX2l0ZXJhdG9yMTdbX2kxOCsrXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfaTE4ID0gX2l0ZXJhdG9yMTcubmV4dCgpO1xuICAgICAgICAgIGlmIChfaTE4LmRvbmUpIGJyZWFrO1xuICAgICAgICAgIF9yZWYxNiA9IF9pMTgudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZmlsZSA9IF9yZWYxNjtcblxuICAgICAgICB0aGlzLmVucXVldWVGaWxlKGZpbGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImVucXVldWVGaWxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVucXVldWVGaWxlKGZpbGUpIHtcbiAgICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgICBpZiAoZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLkFEREVEICYmIGZpbGUuYWNjZXB0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgZmlsZS5zdGF0dXMgPSBEcm9wem9uZS5RVUVVRUQ7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b1Byb2Nlc3NRdWV1ZSkge1xuICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpczgucHJvY2Vzc1F1ZXVlKCk7XG4gICAgICAgICAgfSwgMCk7IC8vIERlZmVycmluZyB0aGUgY2FsbFxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIGZpbGUgY2FuJ3QgYmUgcXVldWVkIGJlY2F1c2UgaXQgaGFzIGFscmVhZHkgYmVlbiBwcm9jZXNzZWQgb3Igd2FzIHJlamVjdGVkLlwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2VucXVldWVUaHVtYm5haWxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2VucXVldWVUaHVtYm5haWwoZmlsZSkge1xuICAgICAgdmFyIF90aGlzOSA9IHRoaXM7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY3JlYXRlSW1hZ2VUaHVtYm5haWxzICYmIGZpbGUudHlwZS5tYXRjaCgvaW1hZ2UuKi8pICYmIGZpbGUuc2l6ZSA8PSB0aGlzLm9wdGlvbnMubWF4VGh1bWJuYWlsRmlsZXNpemUgKiAxMDI0ICogMTAyNCkge1xuICAgICAgICB0aGlzLl90aHVtYm5haWxRdWV1ZS5wdXNoKGZpbGUpO1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzOS5fcHJvY2Vzc1RodW1ibmFpbFF1ZXVlKCk7XG4gICAgICAgIH0sIDApOyAvLyBEZWZlcnJpbmcgdGhlIGNhbGxcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3Byb2Nlc3NUaHVtYm5haWxRdWV1ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcHJvY2Vzc1RodW1ibmFpbFF1ZXVlKCkge1xuICAgICAgdmFyIF90aGlzMTAgPSB0aGlzO1xuXG4gICAgICBpZiAodGhpcy5fcHJvY2Vzc2luZ1RodW1ibmFpbCB8fCB0aGlzLl90aHVtYm5haWxRdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9wcm9jZXNzaW5nVGh1bWJuYWlsID0gdHJ1ZTtcbiAgICAgIHZhciBmaWxlID0gdGhpcy5fdGh1bWJuYWlsUXVldWUuc2hpZnQoKTtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVRodW1ibmFpbChmaWxlLCB0aGlzLm9wdGlvbnMudGh1bWJuYWlsV2lkdGgsIHRoaXMub3B0aW9ucy50aHVtYm5haWxIZWlnaHQsIHRoaXMub3B0aW9ucy50aHVtYm5haWxNZXRob2QsIHRydWUsIGZ1bmN0aW9uIChkYXRhVXJsKSB7XG4gICAgICAgIF90aGlzMTAuZW1pdChcInRodW1ibmFpbFwiLCBmaWxlLCBkYXRhVXJsKTtcbiAgICAgICAgX3RoaXMxMC5fcHJvY2Vzc2luZ1RodW1ibmFpbCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gX3RoaXMxMC5fcHJvY2Vzc1RodW1ibmFpbFF1ZXVlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBDYW4gYmUgY2FsbGVkIGJ5IHRoZSB1c2VyIHRvIHJlbW92ZSBhIGZpbGVcblxuICB9LCB7XG4gICAga2V5OiBcInJlbW92ZUZpbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlRmlsZShmaWxlKSB7XG4gICAgICBpZiAoZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLlVQTE9BRElORykge1xuICAgICAgICB0aGlzLmNhbmNlbFVwbG9hZChmaWxlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlsZXMgPSB3aXRob3V0KHRoaXMuZmlsZXMsIGZpbGUpO1xuXG4gICAgICB0aGlzLmVtaXQoXCJyZW1vdmVkZmlsZVwiLCBmaWxlKTtcbiAgICAgIGlmICh0aGlzLmZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbWl0KFwicmVzZXRcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlcyBhbGwgZmlsZXMgdGhhdCBhcmVuJ3QgY3VycmVudGx5IHByb2Nlc3NlZCBmcm9tIHRoZSBsaXN0XG5cbiAgfSwge1xuICAgIGtleTogXCJyZW1vdmVBbGxGaWxlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVBbGxGaWxlcyhjYW5jZWxJZk5lY2Vzc2FyeSkge1xuICAgICAgLy8gQ3JlYXRlIGEgY29weSBvZiBmaWxlcyBzaW5jZSByZW1vdmVGaWxlKCkgY2hhbmdlcyB0aGUgQGZpbGVzIGFycmF5LlxuICAgICAgaWYgKGNhbmNlbElmTmVjZXNzYXJ5ID09IG51bGwpIHtcbiAgICAgICAgY2FuY2VsSWZOZWNlc3NhcnkgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIF9pdGVyYXRvcjE4ID0gdGhpcy5maWxlcy5zbGljZSgpLCBfaXNBcnJheTE4ID0gdHJ1ZSwgX2kxOSA9IDAsIF9pdGVyYXRvcjE4ID0gX2lzQXJyYXkxOCA/IF9pdGVyYXRvcjE4IDogX2l0ZXJhdG9yMThbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgdmFyIF9yZWYxNztcblxuICAgICAgICBpZiAoX2lzQXJyYXkxOCkge1xuICAgICAgICAgIGlmIChfaTE5ID49IF9pdGVyYXRvcjE4Lmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgX3JlZjE3ID0gX2l0ZXJhdG9yMThbX2kxOSsrXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfaTE5ID0gX2l0ZXJhdG9yMTgubmV4dCgpO1xuICAgICAgICAgIGlmIChfaTE5LmRvbmUpIGJyZWFrO1xuICAgICAgICAgIF9yZWYxNyA9IF9pMTkudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZmlsZSA9IF9yZWYxNztcblxuICAgICAgICBpZiAoZmlsZS5zdGF0dXMgIT09IERyb3B6b25lLlVQTE9BRElORyB8fCBjYW5jZWxJZk5lY2Vzc2FyeSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlRmlsZShmaWxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gUmVzaXplcyBhbiBpbWFnZSBiZWZvcmUgaXQgZ2V0cyBzZW50IHRvIHRoZSBzZXJ2ZXIuIFRoaXMgZnVuY3Rpb24gaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2ZcbiAgICAvLyBgb3B0aW9ucy50cmFuc2Zvcm1GaWxlYCBpZiBgcmVzaXplV2lkdGhgIG9yIGByZXNpemVIZWlnaHRgIGFyZSBzZXQuIFRoZSBjYWxsYmFjayBpcyBpbnZva2VkIHdpdGhcbiAgICAvLyB0aGUgcmVzaXplZCBibG9iLlxuXG4gIH0sIHtcbiAgICBrZXk6IFwicmVzaXplSW1hZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVzaXplSW1hZ2UoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBjYWxsYmFjaykge1xuICAgICAgdmFyIF90aGlzMTEgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVUaHVtYm5haWwoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBmYWxzZSwgZnVuY3Rpb24gKGRhdGFVcmwsIGNhbnZhcykge1xuICAgICAgICBpZiAoY2FudmFzID09IG51bGwpIHtcbiAgICAgICAgICAvLyBUaGUgaW1hZ2UgaGFzIG5vdCBiZWVuIHJlc2l6ZWRcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZmlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHJlc2l6ZU1pbWVUeXBlID0gX3RoaXMxMS5vcHRpb25zLnJlc2l6ZU1pbWVUeXBlO1xuXG4gICAgICAgICAgaWYgKHJlc2l6ZU1pbWVUeXBlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJlc2l6ZU1pbWVUeXBlID0gZmlsZS50eXBlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgcmVzaXplZERhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKHJlc2l6ZU1pbWVUeXBlLCBfdGhpczExLm9wdGlvbnMucmVzaXplUXVhbGl0eSk7XG4gICAgICAgICAgaWYgKHJlc2l6ZU1pbWVUeXBlID09PSAnaW1hZ2UvanBlZycgfHwgcmVzaXplTWltZVR5cGUgPT09ICdpbWFnZS9qcGcnKSB7XG4gICAgICAgICAgICAvLyBOb3cgYWRkIHRoZSBvcmlnaW5hbCBFWElGIGluZm9ybWF0aW9uXG4gICAgICAgICAgICByZXNpemVkRGF0YVVSTCA9IEV4aWZSZXN0b3JlLnJlc3RvcmUoZmlsZS5kYXRhVVJMLCByZXNpemVkRGF0YVVSTCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhEcm9wem9uZS5kYXRhVVJJdG9CbG9iKHJlc2l6ZWREYXRhVVJMKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjcmVhdGVUaHVtYm5haWxcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlVGh1bWJuYWlsKGZpbGUsIHdpZHRoLCBoZWlnaHQsIHJlc2l6ZU1ldGhvZCwgZml4T3JpZW50YXRpb24sIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgX3RoaXMxMiA9IHRoaXM7XG5cbiAgICAgIHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgZmlsZS5kYXRhVVJMID0gZmlsZVJlYWRlci5yZXN1bHQ7XG5cbiAgICAgICAgLy8gRG9uJ3QgYm90aGVyIGNyZWF0aW5nIGEgdGh1bWJuYWlsIGZvciBTVkcgaW1hZ2VzIHNpbmNlIHRoZXkncmUgdmVjdG9yXG4gICAgICAgIGlmIChmaWxlLnR5cGUgPT09IFwiaW1hZ2Uvc3ZnK3htbFwiKSB7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGZpbGVSZWFkZXIucmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIF90aGlzMTIuY3JlYXRlVGh1bWJuYWlsRnJvbVVybChmaWxlLCB3aWR0aCwgaGVpZ2h0LCByZXNpemVNZXRob2QsIGZpeE9yaWVudGF0aW9uLCBjYWxsYmFjayk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjcmVhdGVUaHVtYm5haWxGcm9tVXJsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVRodW1ibmFpbEZyb21VcmwoZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kLCBmaXhPcmllbnRhdGlvbiwgY2FsbGJhY2ssIGNyb3NzT3JpZ2luKSB7XG4gICAgICB2YXIgX3RoaXMxMyA9IHRoaXM7XG5cbiAgICAgIC8vIE5vdCB1c2luZyBgbmV3IEltYWdlYCBoZXJlIGJlY2F1c2Ugb2YgYSBidWcgaW4gbGF0ZXN0IENocm9tZSB2ZXJzaW9ucy5cbiAgICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZW55by9kcm9wem9uZS9wdWxsLzIyNlxuICAgICAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG5cbiAgICAgIGlmIChjcm9zc09yaWdpbikge1xuICAgICAgICBpbWcuY3Jvc3NPcmlnaW4gPSBjcm9zc09yaWdpbjtcbiAgICAgIH1cblxuICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxvYWRFeGlmID0gZnVuY3Rpb24gbG9hZEV4aWYoY2FsbGJhY2spIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soMSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0eXBlb2YgRVhJRiAhPT0gJ3VuZGVmaW5lZCcgJiYgRVhJRiAhPT0gbnVsbCAmJiBmaXhPcmllbnRhdGlvbikge1xuICAgICAgICAgIGxvYWRFeGlmID0gZnVuY3Rpb24gbG9hZEV4aWYoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBFWElGLmdldERhdGEoaW1nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhFWElGLmdldFRhZyh0aGlzLCAnT3JpZW50YXRpb24nKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxvYWRFeGlmKGZ1bmN0aW9uIChvcmllbnRhdGlvbikge1xuICAgICAgICAgIGZpbGUud2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgICAgZmlsZS5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuXG4gICAgICAgICAgdmFyIHJlc2l6ZUluZm8gPSBfdGhpczEzLm9wdGlvbnMucmVzaXplLmNhbGwoX3RoaXMxMywgZmlsZSwgd2lkdGgsIGhlaWdodCwgcmVzaXplTWV0aG9kKTtcblxuICAgICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgICAgY2FudmFzLndpZHRoID0gcmVzaXplSW5mby50cmdXaWR0aDtcbiAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gcmVzaXplSW5mby50cmdIZWlnaHQ7XG5cbiAgICAgICAgICBpZiAob3JpZW50YXRpb24gPiA0KSB7XG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSByZXNpemVJbmZvLnRyZ0hlaWdodDtcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSByZXNpemVJbmZvLnRyZ1dpZHRoO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN3aXRjaCAob3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgLy8gaG9yaXpvbnRhbCBmbGlwXG4gICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoY2FudmFzLndpZHRoLCAwKTtcbiAgICAgICAgICAgICAgY3R4LnNjYWxlKC0xLCAxKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIC8vIDE4MMKwIHJvdGF0ZSBsZWZ0XG4gICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgY3R4LnJvdGF0ZShNYXRoLlBJKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgIC8vIHZlcnRpY2FsIGZsaXBcbiAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSgwLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgY3R4LnNjYWxlKDEsIC0xKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgIC8vIHZlcnRpY2FsIGZsaXAgKyA5MCByb3RhdGUgcmlnaHRcbiAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgwLjUgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgICAgY3R4LnNjYWxlKDEsIC0xKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgIC8vIDkwwrAgcm90YXRlIHJpZ2h0XG4gICAgICAgICAgICAgIGN0eC5yb3RhdGUoMC41ICogTWF0aC5QSSk7XG4gICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoMCwgLWNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgLy8gaG9yaXpvbnRhbCBmbGlwICsgOTAgcm90YXRlIHJpZ2h0XG4gICAgICAgICAgICAgIGN0eC5yb3RhdGUoMC41ICogTWF0aC5QSSk7XG4gICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoY2FudmFzLndpZHRoLCAtY2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgICAgIGN0eC5zY2FsZSgtMSwgMSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAvLyA5MMKwIHJvdGF0ZSBsZWZ0XG4gICAgICAgICAgICAgIGN0eC5yb3RhdGUoLTAuNSAqIE1hdGguUEkpO1xuICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKC1jYW52YXMud2lkdGgsIDApO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBUaGlzIGlzIGEgYnVnZml4IGZvciBpT1MnIHNjYWxpbmcgYnVnLlxuICAgICAgICAgIGRyYXdJbWFnZUlPU0ZpeChjdHgsIGltZywgcmVzaXplSW5mby5zcmNYICE9IG51bGwgPyByZXNpemVJbmZvLnNyY1ggOiAwLCByZXNpemVJbmZvLnNyY1kgIT0gbnVsbCA/IHJlc2l6ZUluZm8uc3JjWSA6IDAsIHJlc2l6ZUluZm8uc3JjV2lkdGgsIHJlc2l6ZUluZm8uc3JjSGVpZ2h0LCByZXNpemVJbmZvLnRyZ1ggIT0gbnVsbCA/IHJlc2l6ZUluZm8udHJnWCA6IDAsIHJlc2l6ZUluZm8udHJnWSAhPSBudWxsID8gcmVzaXplSW5mby50cmdZIDogMCwgcmVzaXplSW5mby50cmdXaWR0aCwgcmVzaXplSW5mby50cmdIZWlnaHQpO1xuXG4gICAgICAgICAgdmFyIHRodW1ibmFpbCA9IGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG5cbiAgICAgICAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRodW1ibmFpbCwgY2FudmFzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgaWYgKGNhbGxiYWNrICE9IG51bGwpIHtcbiAgICAgICAgaW1nLm9uZXJyb3IgPSBjYWxsYmFjaztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGltZy5zcmMgPSBmaWxlLmRhdGFVUkw7XG4gICAgfVxuXG4gICAgLy8gR29lcyB0aHJvdWdoIHRoZSBxdWV1ZSBhbmQgcHJvY2Vzc2VzIGZpbGVzIGlmIHRoZXJlIGFyZW4ndCB0b28gbWFueSBhbHJlYWR5LlxuXG4gIH0sIHtcbiAgICBrZXk6IFwicHJvY2Vzc1F1ZXVlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByb2Nlc3NRdWV1ZSgpIHtcbiAgICAgIHZhciBwYXJhbGxlbFVwbG9hZHMgPSB0aGlzLm9wdGlvbnMucGFyYWxsZWxVcGxvYWRzO1xuXG4gICAgICB2YXIgcHJvY2Vzc2luZ0xlbmd0aCA9IHRoaXMuZ2V0VXBsb2FkaW5nRmlsZXMoKS5sZW5ndGg7XG4gICAgICB2YXIgaSA9IHByb2Nlc3NpbmdMZW5ndGg7XG5cbiAgICAgIC8vIFRoZXJlIGFyZSBhbHJlYWR5IGF0IGxlYXN0IGFzIG1hbnkgZmlsZXMgdXBsb2FkaW5nIHRoYW4gc2hvdWxkIGJlXG4gICAgICBpZiAocHJvY2Vzc2luZ0xlbmd0aCA+PSBwYXJhbGxlbFVwbG9hZHMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgcXVldWVkRmlsZXMgPSB0aGlzLmdldFF1ZXVlZEZpbGVzKCk7XG5cbiAgICAgIGlmICghKHF1ZXVlZEZpbGVzLmxlbmd0aCA+IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xuICAgICAgICAvLyBUaGUgZmlsZXMgc2hvdWxkIGJlIHVwbG9hZGVkIGluIG9uZSByZXF1ZXN0XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NGaWxlcyhxdWV1ZWRGaWxlcy5zbGljZSgwLCBwYXJhbGxlbFVwbG9hZHMgLSBwcm9jZXNzaW5nTGVuZ3RoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAoaSA8IHBhcmFsbGVsVXBsb2Fkcykge1xuICAgICAgICAgIGlmICghcXVldWVkRmlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSAvLyBOb3RoaW5nIGxlZnQgdG8gcHJvY2Vzc1xuICAgICAgICAgIHRoaXMucHJvY2Vzc0ZpbGUocXVldWVkRmlsZXMuc2hpZnQoKSk7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gV3JhcHBlciBmb3IgYHByb2Nlc3NGaWxlc2BcblxuICB9LCB7XG4gICAga2V5OiBcInByb2Nlc3NGaWxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHByb2Nlc3NGaWxlKGZpbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NGaWxlcyhbZmlsZV0pO1xuICAgIH1cblxuICAgIC8vIExvYWRzIHRoZSBmaWxlLCB0aGVuIGNhbGxzIGZpbmlzaGVkTG9hZGluZygpXG5cbiAgfSwge1xuICAgIGtleTogXCJwcm9jZXNzRmlsZXNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHJvY2Vzc0ZpbGVzKGZpbGVzKSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IxOSA9IGZpbGVzLCBfaXNBcnJheTE5ID0gdHJ1ZSwgX2kyMCA9IDAsIF9pdGVyYXRvcjE5ID0gX2lzQXJyYXkxOSA/IF9pdGVyYXRvcjE5IDogX2l0ZXJhdG9yMTlbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgdmFyIF9yZWYxODtcblxuICAgICAgICBpZiAoX2lzQXJyYXkxOSkge1xuICAgICAgICAgIGlmIChfaTIwID49IF9pdGVyYXRvcjE5Lmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgX3JlZjE4ID0gX2l0ZXJhdG9yMTlbX2kyMCsrXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfaTIwID0gX2l0ZXJhdG9yMTkubmV4dCgpO1xuICAgICAgICAgIGlmIChfaTIwLmRvbmUpIGJyZWFrO1xuICAgICAgICAgIF9yZWYxOCA9IF9pMjAudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZmlsZSA9IF9yZWYxODtcblxuICAgICAgICBmaWxlLnByb2Nlc3NpbmcgPSB0cnVlOyAvLyBCYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgICAgICBmaWxlLnN0YXR1cyA9IERyb3B6b25lLlVQTE9BRElORztcblxuICAgICAgICB0aGlzLmVtaXQoXCJwcm9jZXNzaW5nXCIsIGZpbGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuZW1pdChcInByb2Nlc3NpbmdtdWx0aXBsZVwiLCBmaWxlcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnVwbG9hZEZpbGVzKGZpbGVzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2dldEZpbGVzV2l0aFhoclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0RmlsZXNXaXRoWGhyKHhocikge1xuICAgICAgdmFyIGZpbGVzID0gdm9pZCAwO1xuICAgICAgcmV0dXJuIGZpbGVzID0gdGhpcy5maWxlcy5maWx0ZXIoZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgcmV0dXJuIGZpbGUueGhyID09PSB4aHI7XG4gICAgICB9KS5tYXAoZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgcmV0dXJuIGZpbGU7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBDYW5jZWxzIHRoZSBmaWxlIHVwbG9hZCBhbmQgc2V0cyB0aGUgc3RhdHVzIHRvIENBTkNFTEVEXG4gICAgLy8gKippZioqIHRoZSBmaWxlIGlzIGFjdHVhbGx5IGJlaW5nIHVwbG9hZGVkLlxuICAgIC8vIElmIGl0J3Mgc3RpbGwgaW4gdGhlIHF1ZXVlLCB0aGUgZmlsZSBpcyBiZWluZyByZW1vdmVkIGZyb20gaXQgYW5kIHRoZSBzdGF0dXNcbiAgICAvLyBzZXQgdG8gQ0FOQ0VMRUQuXG5cbiAgfSwge1xuICAgIGtleTogXCJjYW5jZWxVcGxvYWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2FuY2VsVXBsb2FkKGZpbGUpIHtcbiAgICAgIGlmIChmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuVVBMT0FESU5HKSB7XG4gICAgICAgIHZhciBncm91cGVkRmlsZXMgPSB0aGlzLl9nZXRGaWxlc1dpdGhYaHIoZmlsZS54aHIpO1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyMCA9IGdyb3VwZWRGaWxlcywgX2lzQXJyYXkyMCA9IHRydWUsIF9pMjEgPSAwLCBfaXRlcmF0b3IyMCA9IF9pc0FycmF5MjAgPyBfaXRlcmF0b3IyMCA6IF9pdGVyYXRvcjIwW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgdmFyIF9yZWYxOTtcblxuICAgICAgICAgIGlmIChfaXNBcnJheTIwKSB7XG4gICAgICAgICAgICBpZiAoX2kyMSA+PSBfaXRlcmF0b3IyMC5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZjE5ID0gX2l0ZXJhdG9yMjBbX2kyMSsrXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX2kyMSA9IF9pdGVyYXRvcjIwLm5leHQoKTtcbiAgICAgICAgICAgIGlmIChfaTIxLmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZjE5ID0gX2kyMS52YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgZ3JvdXBlZEZpbGUgPSBfcmVmMTk7XG5cbiAgICAgICAgICBncm91cGVkRmlsZS5zdGF0dXMgPSBEcm9wem9uZS5DQU5DRUxFRDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGZpbGUueGhyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGZpbGUueGhyLmFib3J0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMjEgPSBncm91cGVkRmlsZXMsIF9pc0FycmF5MjEgPSB0cnVlLCBfaTIyID0gMCwgX2l0ZXJhdG9yMjEgPSBfaXNBcnJheTIxID8gX2l0ZXJhdG9yMjEgOiBfaXRlcmF0b3IyMVtTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgIHZhciBfcmVmMjA7XG5cbiAgICAgICAgICBpZiAoX2lzQXJyYXkyMSkge1xuICAgICAgICAgICAgaWYgKF9pMjIgPj0gX2l0ZXJhdG9yMjEubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYyMCA9IF9pdGVyYXRvcjIxW19pMjIrK107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9pMjIgPSBfaXRlcmF0b3IyMS5uZXh0KCk7XG4gICAgICAgICAgICBpZiAoX2kyMi5kb25lKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYyMCA9IF9pMjIudmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIF9ncm91cGVkRmlsZSA9IF9yZWYyMDtcblxuICAgICAgICAgIHRoaXMuZW1pdChcImNhbmNlbGVkXCIsIF9ncm91cGVkRmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xuICAgICAgICAgIHRoaXMuZW1pdChcImNhbmNlbGVkbXVsdGlwbGVcIiwgZ3JvdXBlZEZpbGVzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChmaWxlLnN0YXR1cyA9PT0gRHJvcHpvbmUuQURERUQgfHwgZmlsZS5zdGF0dXMgPT09IERyb3B6b25lLlFVRVVFRCkge1xuICAgICAgICBmaWxlLnN0YXR1cyA9IERyb3B6b25lLkNBTkNFTEVEO1xuICAgICAgICB0aGlzLmVtaXQoXCJjYW5jZWxlZFwiLCBmaWxlKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xuICAgICAgICAgIHRoaXMuZW1pdChcImNhbmNlbGVkbXVsdGlwbGVcIiwgW2ZpbGVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9Qcm9jZXNzUXVldWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlc29sdmVPcHRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVzb2x2ZU9wdGlvbihvcHRpb24pIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4zID4gMSA/IF9sZW4zIC0gMSA6IDApLCBfa2V5MyA9IDE7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgICAgICBhcmdzW19rZXkzIC0gMV0gPSBhcmd1bWVudHNbX2tleTNdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvcHRpb247XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInVwbG9hZEZpbGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBsb2FkRmlsZShmaWxlKSB7XG4gICAgICByZXR1cm4gdGhpcy51cGxvYWRGaWxlcyhbZmlsZV0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1cGxvYWRGaWxlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGxvYWRGaWxlcyhmaWxlcykge1xuICAgICAgdmFyIF90aGlzMTQgPSB0aGlzO1xuXG4gICAgICB0aGlzLl90cmFuc2Zvcm1GaWxlcyhmaWxlcywgZnVuY3Rpb24gKHRyYW5zZm9ybWVkRmlsZXMpIHtcbiAgICAgICAgaWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkKSB7XG4gICAgICAgICAgLy8gVGhpcyBmaWxlIHNob3VsZCBiZSBzZW50IGluIGNodW5rcyFcblxuICAgICAgICAgIC8vIElmIHRoZSBjaHVua2luZyBvcHRpb24gaXMgc2V0LCB3ZSAqKmtub3cqKiB0aGF0IHRoZXJlIGNhbiBvbmx5IGJlICoqb25lKiogZmlsZSwgc2luY2VcbiAgICAgICAgICAvLyB1cGxvYWRNdWx0aXBsZSBpcyBub3QgYWxsb3dlZCB3aXRoIHRoaXMgb3B0aW9uLlxuICAgICAgICAgIHZhciBmaWxlID0gZmlsZXNbMF07XG4gICAgICAgICAgdmFyIHRyYW5zZm9ybWVkRmlsZSA9IHRyYW5zZm9ybWVkRmlsZXNbMF07XG4gICAgICAgICAgdmFyIHN0YXJ0ZWRDaHVua0NvdW50ID0gMDtcblxuICAgICAgICAgIGZpbGUudXBsb2FkLmNodW5rcyA9IFtdO1xuXG4gICAgICAgICAgdmFyIGhhbmRsZU5leHRDaHVuayA9IGZ1bmN0aW9uIGhhbmRsZU5leHRDaHVuaygpIHtcbiAgICAgICAgICAgIHZhciBjaHVua0luZGV4ID0gMDtcblxuICAgICAgICAgICAgLy8gRmluZCB0aGUgbmV4dCBpdGVtIGluIGZpbGUudXBsb2FkLmNodW5rcyB0aGF0IGlzIG5vdCBkZWZpbmVkIHlldC5cbiAgICAgICAgICAgIHdoaWxlIChmaWxlLnVwbG9hZC5jaHVua3NbY2h1bmtJbmRleF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBjaHVua0luZGV4Kys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRoaXMgbWVhbnMsIHRoYXQgYWxsIGNodW5rcyBoYXZlIGFscmVhZHkgYmVlbiBzdGFydGVkLlxuICAgICAgICAgICAgaWYgKGNodW5rSW5kZXggPj0gZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50KSByZXR1cm47XG5cbiAgICAgICAgICAgIHN0YXJ0ZWRDaHVua0NvdW50Kys7XG5cbiAgICAgICAgICAgIHZhciBzdGFydCA9IGNodW5rSW5kZXggKiBfdGhpczE0Lm9wdGlvbnMuY2h1bmtTaXplO1xuICAgICAgICAgICAgdmFyIGVuZCA9IE1hdGgubWluKHN0YXJ0ICsgX3RoaXMxNC5vcHRpb25zLmNodW5rU2l6ZSwgZmlsZS5zaXplKTtcblxuICAgICAgICAgICAgdmFyIGRhdGFCbG9jayA9IHtcbiAgICAgICAgICAgICAgbmFtZTogX3RoaXMxNC5fZ2V0UGFyYW1OYW1lKDApLFxuICAgICAgICAgICAgICBkYXRhOiB0cmFuc2Zvcm1lZEZpbGUud2Via2l0U2xpY2UgPyB0cmFuc2Zvcm1lZEZpbGUud2Via2l0U2xpY2Uoc3RhcnQsIGVuZCkgOiB0cmFuc2Zvcm1lZEZpbGUuc2xpY2Uoc3RhcnQsIGVuZCksXG4gICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlLnVwbG9hZC5maWxlbmFtZSxcbiAgICAgICAgICAgICAgY2h1bmtJbmRleDogY2h1bmtJbmRleFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZmlsZS51cGxvYWQuY2h1bmtzW2NodW5rSW5kZXhdID0ge1xuICAgICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgICBpbmRleDogY2h1bmtJbmRleCxcbiAgICAgICAgICAgICAgZGF0YUJsb2NrOiBkYXRhQmxvY2ssIC8vIEluIGNhc2Ugd2Ugd2FudCB0byByZXRyeS5cbiAgICAgICAgICAgICAgc3RhdHVzOiBEcm9wem9uZS5VUExPQURJTkcsXG4gICAgICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgICAgICByZXRyaWVzOiAwIC8vIFRoZSBudW1iZXIgb2YgdGltZXMgdGhpcyBibG9jayBoYXMgYmVlbiByZXRyaWVkLlxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgX3RoaXMxNC5fdXBsb2FkRGF0YShmaWxlcywgW2RhdGFCbG9ja10pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBmaWxlLnVwbG9hZC5maW5pc2hlZENodW5rVXBsb2FkID0gZnVuY3Rpb24gKGNodW5rKSB7XG4gICAgICAgICAgICB2YXIgYWxsRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgY2h1bmsuc3RhdHVzID0gRHJvcHpvbmUuU1VDQ0VTUztcblxuICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIGRhdGEgZnJvbSB0aGUgY2h1bmtcbiAgICAgICAgICAgIGNodW5rLmRhdGFCbG9jayA9IG51bGw7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZS51cGxvYWQudG90YWxDaHVua0NvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZU5leHRDaHVuaygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChmaWxlLnVwbG9hZC5jaHVua3NbaV0uc3RhdHVzICE9PSBEcm9wem9uZS5TVUNDRVNTKSB7XG4gICAgICAgICAgICAgICAgYWxsRmluaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWxsRmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgX3RoaXMxNC5vcHRpb25zLmNodW5rc1VwbG9hZGVkKGZpbGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpczE0Ll9maW5pc2hlZChmaWxlcywgJycsIG51bGwpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKF90aGlzMTQub3B0aW9ucy5wYXJhbGxlbENodW5rVXBsb2Fkcykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgICBoYW5kbGVOZXh0Q2h1bmsoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGFuZGxlTmV4dENodW5rKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBkYXRhQmxvY2tzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgX2kyMyA9IDA7IF9pMjMgPCBmaWxlcy5sZW5ndGg7IF9pMjMrKykge1xuICAgICAgICAgICAgZGF0YUJsb2Nrc1tfaTIzXSA9IHtcbiAgICAgICAgICAgICAgbmFtZTogX3RoaXMxNC5fZ2V0UGFyYW1OYW1lKF9pMjMpLFxuICAgICAgICAgICAgICBkYXRhOiB0cmFuc2Zvcm1lZEZpbGVzW19pMjNdLFxuICAgICAgICAgICAgICBmaWxlbmFtZTogZmlsZXNbX2kyM10udXBsb2FkLmZpbGVuYW1lXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpczE0Ll91cGxvYWREYXRhKGZpbGVzLCBkYXRhQmxvY2tzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8vIFJldHVybnMgdGhlIHJpZ2h0IGNodW5rIGZvciBnaXZlbiBmaWxlIGFuZCB4aHJcblxuICB9LCB7XG4gICAga2V5OiBcIl9nZXRDaHVua1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0Q2h1bmsoZmlsZSwgeGhyKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudDsgaSsrKSB7XG4gICAgICAgIGlmIChmaWxlLnVwbG9hZC5jaHVua3NbaV0gIT09IHVuZGVmaW5lZCAmJiBmaWxlLnVwbG9hZC5jaHVua3NbaV0ueGhyID09PSB4aHIpIHtcbiAgICAgICAgICByZXR1cm4gZmlsZS51cGxvYWQuY2h1bmtzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhY3R1YWxseSB1cGxvYWRzIHRoZSBmaWxlKHMpIHRvIHRoZSBzZXJ2ZXIuXG4gICAgLy8gSWYgZGF0YUJsb2NrcyBjb250YWlucyB0aGUgYWN0dWFsIGRhdGEgdG8gdXBsb2FkIChtZWFuaW5nLCB0aGF0IHRoaXMgY291bGQgZWl0aGVyIGJlIHRyYW5zZm9ybWVkXG4gICAgLy8gZmlsZXMsIG9yIGluZGl2aWR1YWwgY2h1bmtzIGZvciBjaHVua2VkIHVwbG9hZCkuXG5cbiAgfSwge1xuICAgIGtleTogXCJfdXBsb2FkRGF0YVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBsb2FkRGF0YShmaWxlcywgZGF0YUJsb2Nrcykge1xuICAgICAgdmFyIF90aGlzMTUgPSB0aGlzO1xuXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIC8vIFB1dCB0aGUgeGhyIG9iamVjdCBpbiB0aGUgZmlsZSBvYmplY3RzIHRvIGJlIGFibGUgdG8gcmVmZXJlbmNlIGl0IGxhdGVyLlxuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMjIgPSBmaWxlcywgX2lzQXJyYXkyMiA9IHRydWUsIF9pMjQgPSAwLCBfaXRlcmF0b3IyMiA9IF9pc0FycmF5MjIgPyBfaXRlcmF0b3IyMiA6IF9pdGVyYXRvcjIyW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgIHZhciBfcmVmMjE7XG5cbiAgICAgICAgaWYgKF9pc0FycmF5MjIpIHtcbiAgICAgICAgICBpZiAoX2kyNCA+PSBfaXRlcmF0b3IyMi5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgIF9yZWYyMSA9IF9pdGVyYXRvcjIyW19pMjQrK107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2kyNCA9IF9pdGVyYXRvcjIyLm5leHQoKTtcbiAgICAgICAgICBpZiAoX2kyNC5kb25lKSBicmVhaztcbiAgICAgICAgICBfcmVmMjEgPSBfaTI0LnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpbGUgPSBfcmVmMjE7XG5cbiAgICAgICAgZmlsZS54aHIgPSB4aHI7XG4gICAgICB9XG4gICAgICBpZiAoZmlsZXNbMF0udXBsb2FkLmNodW5rZWQpIHtcbiAgICAgICAgLy8gUHV0IHRoZSB4aHIgb2JqZWN0IGluIHRoZSByaWdodCBjaHVuayBvYmplY3QsIHNvIGl0IGNhbiBiZSBhc3NvY2lhdGVkIGxhdGVyLCBhbmQgZm91bmQgd2l0aCBfZ2V0Q2h1bmtcbiAgICAgICAgZmlsZXNbMF0udXBsb2FkLmNodW5rc1tkYXRhQmxvY2tzWzBdLmNodW5rSW5kZXhdLnhociA9IHhocjtcbiAgICAgIH1cblxuICAgICAgdmFyIG1ldGhvZCA9IHRoaXMucmVzb2x2ZU9wdGlvbih0aGlzLm9wdGlvbnMubWV0aG9kLCBmaWxlcyk7XG4gICAgICB2YXIgdXJsID0gdGhpcy5yZXNvbHZlT3B0aW9uKHRoaXMub3B0aW9ucy51cmwsIGZpbGVzKTtcbiAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcblxuICAgICAgLy8gU2V0dGluZyB0aGUgdGltZW91dCBhZnRlciBvcGVuIGJlY2F1c2Ugb2YgSUUxMSBpc3N1ZTogaHR0cHM6Ly9naXRsYWIuY29tL21lbm8vZHJvcHpvbmUvaXNzdWVzLzhcbiAgICAgIHhoci50aW1lb3V0ID0gdGhpcy5yZXNvbHZlT3B0aW9uKHRoaXMub3B0aW9ucy50aW1lb3V0LCBmaWxlcyk7XG5cbiAgICAgIC8vIEhhcyB0byBiZSBhZnRlciBgLm9wZW4oKWAuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZW55by9kcm9wem9uZS9pc3N1ZXMvMTc5XG4gICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gISF0aGlzLm9wdGlvbnMud2l0aENyZWRlbnRpYWxzO1xuXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgX3RoaXMxNS5fZmluaXNoZWRVcGxvYWRpbmcoZmlsZXMsIHhociwgZSk7XG4gICAgICB9O1xuXG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMxNS5faGFuZGxlVXBsb2FkRXJyb3IoZmlsZXMsIHhocik7XG4gICAgICB9O1xuXG4gICAgICAvLyBTb21lIGJyb3dzZXJzIGRvIG5vdCBoYXZlIHRoZSAudXBsb2FkIHByb3BlcnR5XG4gICAgICB2YXIgcHJvZ3Jlc3NPYmogPSB4aHIudXBsb2FkICE9IG51bGwgPyB4aHIudXBsb2FkIDogeGhyO1xuICAgICAgcHJvZ3Jlc3NPYmoub25wcm9ncmVzcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiBfdGhpczE1Ll91cGRhdGVGaWxlc1VwbG9hZFByb2dyZXNzKGZpbGVzLCB4aHIsIGUpO1xuICAgICAgfTtcblxuICAgICAgdmFyIGhlYWRlcnMgPSB7XG4gICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJuby1jYWNoZVwiLFxuICAgICAgICBcIlgtUmVxdWVzdGVkLVdpdGhcIjogXCJYTUxIdHRwUmVxdWVzdFwiXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgRHJvcHpvbmUuZXh0ZW5kKGhlYWRlcnMsIHRoaXMub3B0aW9ucy5oZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaGVhZGVyTmFtZSBpbiBoZWFkZXJzKSB7XG4gICAgICAgIHZhciBoZWFkZXJWYWx1ZSA9IGhlYWRlcnNbaGVhZGVyTmFtZV07XG4gICAgICAgIGlmIChoZWFkZXJWYWx1ZSkge1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlck5hbWUsIGhlYWRlclZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgICAgLy8gQWRkaW5nIGFsbCBAb3B0aW9ucyBwYXJhbWV0ZXJzXG4gICAgICBpZiAodGhpcy5vcHRpb25zLnBhcmFtcykge1xuICAgICAgICB2YXIgYWRkaXRpb25hbFBhcmFtcyA9IHRoaXMub3B0aW9ucy5wYXJhbXM7XG4gICAgICAgIGlmICh0eXBlb2YgYWRkaXRpb25hbFBhcmFtcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGFkZGl0aW9uYWxQYXJhbXMgPSBhZGRpdGlvbmFsUGFyYW1zLmNhbGwodGhpcywgZmlsZXMsIHhociwgZmlsZXNbMF0udXBsb2FkLmNodW5rZWQgPyB0aGlzLl9nZXRDaHVuayhmaWxlc1swXSwgeGhyKSA6IG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIGFkZGl0aW9uYWxQYXJhbXMpIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBhZGRpdGlvbmFsUGFyYW1zW2tleV07XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIExldCB0aGUgdXNlciBhZGQgYWRkaXRpb25hbCBkYXRhIGlmIG5lY2Vzc2FyeVxuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMjMgPSBmaWxlcywgX2lzQXJyYXkyMyA9IHRydWUsIF9pMjUgPSAwLCBfaXRlcmF0b3IyMyA9IF9pc0FycmF5MjMgPyBfaXRlcmF0b3IyMyA6IF9pdGVyYXRvcjIzW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgIHZhciBfcmVmMjI7XG5cbiAgICAgICAgaWYgKF9pc0FycmF5MjMpIHtcbiAgICAgICAgICBpZiAoX2kyNSA+PSBfaXRlcmF0b3IyMy5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgIF9yZWYyMiA9IF9pdGVyYXRvcjIzW19pMjUrK107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2kyNSA9IF9pdGVyYXRvcjIzLm5leHQoKTtcbiAgICAgICAgICBpZiAoX2kyNS5kb25lKSBicmVhaztcbiAgICAgICAgICBfcmVmMjIgPSBfaTI1LnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9maWxlID0gX3JlZjIyO1xuXG4gICAgICAgIHRoaXMuZW1pdChcInNlbmRpbmdcIiwgX2ZpbGUsIHhociwgZm9ybURhdGEpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMub3B0aW9ucy51cGxvYWRNdWx0aXBsZSkge1xuICAgICAgICB0aGlzLmVtaXQoXCJzZW5kaW5nbXVsdGlwbGVcIiwgZmlsZXMsIHhociwgZm9ybURhdGEpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9hZGRGb3JtRWxlbWVudERhdGEoZm9ybURhdGEpO1xuXG4gICAgICAvLyBGaW5hbGx5IGFkZCB0aGUgZmlsZXNcbiAgICAgIC8vIEhhcyB0byBiZSBsYXN0IGJlY2F1c2Ugc29tZSBzZXJ2ZXJzIChlZzogUzMpIGV4cGVjdCB0aGUgZmlsZSB0byBiZSB0aGUgbGFzdCBwYXJhbWV0ZXJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YUJsb2Nrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGF0YUJsb2NrID0gZGF0YUJsb2Nrc1tpXTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKGRhdGFCbG9jay5uYW1lLCBkYXRhQmxvY2suZGF0YSwgZGF0YUJsb2NrLmZpbGVuYW1lKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdWJtaXRSZXF1ZXN0KHhociwgZm9ybURhdGEsIGZpbGVzKTtcbiAgICB9XG5cbiAgICAvLyBUcmFuc2Zvcm1zIGFsbCBmaWxlcyB3aXRoIHRoaXMub3B0aW9ucy50cmFuc2Zvcm1GaWxlIGFuZCBpbnZva2VzIGRvbmUgd2l0aCB0aGUgdHJhbnNmb3JtZWQgZmlsZXMgd2hlbiBkb25lLlxuXG4gIH0sIHtcbiAgICBrZXk6IFwiX3RyYW5zZm9ybUZpbGVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF90cmFuc2Zvcm1GaWxlcyhmaWxlcywgZG9uZSkge1xuICAgICAgdmFyIF90aGlzMTYgPSB0aGlzO1xuXG4gICAgICB2YXIgdHJhbnNmb3JtZWRGaWxlcyA9IFtdO1xuICAgICAgLy8gQ2x1bXN5IHdheSBvZiBoYW5kbGluZyBhc3luY2hyb25vdXMgY2FsbHMsIHVudGlsIEkgZ2V0IHRvIGFkZCBhIHByb3BlciBGdXR1cmUgbGlicmFyeS5cbiAgICAgIHZhciBkb25lQ291bnRlciA9IDA7XG5cbiAgICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKGkpIHtcbiAgICAgICAgX3RoaXMxNi5vcHRpb25zLnRyYW5zZm9ybUZpbGUuY2FsbChfdGhpczE2LCBmaWxlc1tpXSwgZnVuY3Rpb24gKHRyYW5zZm9ybWVkRmlsZSkge1xuICAgICAgICAgIHRyYW5zZm9ybWVkRmlsZXNbaV0gPSB0cmFuc2Zvcm1lZEZpbGU7XG4gICAgICAgICAgaWYgKCsrZG9uZUNvdW50ZXIgPT09IGZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZG9uZSh0cmFuc2Zvcm1lZEZpbGVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBfbG9vcChpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUYWtlcyBjYXJlIG9mIGFkZGluZyBvdGhlciBpbnB1dCBlbGVtZW50cyBvZiB0aGUgZm9ybSB0byB0aGUgQUpBWCByZXF1ZXN0XG5cbiAgfSwge1xuICAgIGtleTogXCJfYWRkRm9ybUVsZW1lbnREYXRhXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9hZGRGb3JtRWxlbWVudERhdGEoZm9ybURhdGEpIHtcbiAgICAgIC8vIFRha2UgY2FyZSBvZiBvdGhlciBpbnB1dCBlbGVtZW50c1xuICAgICAgaWYgKHRoaXMuZWxlbWVudC50YWdOYW1lID09PSBcIkZPUk1cIikge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyNCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIGJ1dHRvblwiKSwgX2lzQXJyYXkyNCA9IHRydWUsIF9pMjYgPSAwLCBfaXRlcmF0b3IyNCA9IF9pc0FycmF5MjQgPyBfaXRlcmF0b3IyNCA6IF9pdGVyYXRvcjI0W1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgdmFyIF9yZWYyMztcblxuICAgICAgICAgIGlmIChfaXNBcnJheTI0KSB7XG4gICAgICAgICAgICBpZiAoX2kyNiA+PSBfaXRlcmF0b3IyNC5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZjIzID0gX2l0ZXJhdG9yMjRbX2kyNisrXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX2kyNiA9IF9pdGVyYXRvcjI0Lm5leHQoKTtcbiAgICAgICAgICAgIGlmIChfaTI2LmRvbmUpIGJyZWFrO1xuICAgICAgICAgICAgX3JlZjIzID0gX2kyNi52YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaW5wdXQgPSBfcmVmMjM7XG5cbiAgICAgICAgICB2YXIgaW5wdXROYW1lID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcbiAgICAgICAgICB2YXIgaW5wdXRUeXBlID0gaW5wdXQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKTtcbiAgICAgICAgICBpZiAoaW5wdXRUeXBlKSBpbnB1dFR5cGUgPSBpbnB1dFR5cGUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgIC8vIElmIHRoZSBpbnB1dCBkb2Vzbid0IGhhdmUgYSBuYW1lLCB3ZSBjYW4ndCB1c2UgaXQuXG4gICAgICAgICAgaWYgKHR5cGVvZiBpbnB1dE5hbWUgPT09ICd1bmRlZmluZWQnIHx8IGlucHV0TmFtZSA9PT0gbnVsbCkgY29udGludWU7XG5cbiAgICAgICAgICBpZiAoaW5wdXQudGFnTmFtZSA9PT0gXCJTRUxFQ1RcIiAmJiBpbnB1dC5oYXNBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiKSkge1xuICAgICAgICAgICAgLy8gUG9zc2libHkgbXVsdGlwbGUgdmFsdWVzXG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyNSA9IGlucHV0Lm9wdGlvbnMsIF9pc0FycmF5MjUgPSB0cnVlLCBfaTI3ID0gMCwgX2l0ZXJhdG9yMjUgPSBfaXNBcnJheTI1ID8gX2l0ZXJhdG9yMjUgOiBfaXRlcmF0b3IyNVtTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgICB2YXIgX3JlZjI0O1xuXG4gICAgICAgICAgICAgIGlmIChfaXNBcnJheTI1KSB7XG4gICAgICAgICAgICAgICAgaWYgKF9pMjcgPj0gX2l0ZXJhdG9yMjUubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICBfcmVmMjQgPSBfaXRlcmF0b3IyNVtfaTI3KytdO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9pMjcgPSBfaXRlcmF0b3IyNS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKF9pMjcuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgX3JlZjI0ID0gX2kyNy52YWx1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBvcHRpb24gPSBfcmVmMjQ7XG5cbiAgICAgICAgICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChpbnB1dE5hbWUsIG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKCFpbnB1dFR5cGUgfHwgaW5wdXRUeXBlICE9PSBcImNoZWNrYm94XCIgJiYgaW5wdXRUeXBlICE9PSBcInJhZGlvXCIgfHwgaW5wdXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGlucHV0TmFtZSwgaW5wdXQudmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEludm9rZWQgd2hlbiB0aGVyZSBpcyBuZXcgcHJvZ3Jlc3MgaW5mb3JtYXRpb24gYWJvdXQgZ2l2ZW4gZmlsZXMuXG4gICAgLy8gSWYgZSBpcyBub3QgcHJvdmlkZWQsIGl0IGlzIGFzc3VtZWQgdGhhdCB0aGUgdXBsb2FkIGlzIGZpbmlzaGVkLlxuXG4gIH0sIHtcbiAgICBrZXk6IFwiX3VwZGF0ZUZpbGVzVXBsb2FkUHJvZ3Jlc3NcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZUZpbGVzVXBsb2FkUHJvZ3Jlc3MoZmlsZXMsIHhociwgZSkge1xuICAgICAgdmFyIHByb2dyZXNzID0gdm9pZCAwO1xuICAgICAgaWYgKHR5cGVvZiBlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwcm9ncmVzcyA9IDEwMCAqIGUubG9hZGVkIC8gZS50b3RhbDtcblxuICAgICAgICBpZiAoZmlsZXNbMF0udXBsb2FkLmNodW5rZWQpIHtcbiAgICAgICAgICB2YXIgZmlsZSA9IGZpbGVzWzBdO1xuICAgICAgICAgIC8vIFNpbmNlIHRoaXMgaXMgYSBjaHVua2VkIHVwbG9hZCwgd2UgbmVlZCB0byB1cGRhdGUgdGhlIGFwcHJvcHJpYXRlIGNodW5rIHByb2dyZXNzLlxuICAgICAgICAgIHZhciBjaHVuayA9IHRoaXMuX2dldENodW5rKGZpbGUsIHhocik7XG4gICAgICAgICAgY2h1bmsucHJvZ3Jlc3MgPSBwcm9ncmVzcztcbiAgICAgICAgICBjaHVuay50b3RhbCA9IGUudG90YWw7XG4gICAgICAgICAgY2h1bmsuYnl0ZXNTZW50ID0gZS5sb2FkZWQ7XG4gICAgICAgICAgdmFyIGZpbGVQcm9ncmVzcyA9IDAsXG4gICAgICAgICAgICAgIGZpbGVUb3RhbCA9IHZvaWQgMCxcbiAgICAgICAgICAgICAgZmlsZUJ5dGVzU2VudCA9IHZvaWQgMDtcbiAgICAgICAgICBmaWxlLnVwbG9hZC5wcm9ncmVzcyA9IDA7XG4gICAgICAgICAgZmlsZS51cGxvYWQudG90YWwgPSAwO1xuICAgICAgICAgIGZpbGUudXBsb2FkLmJ5dGVzU2VudCA9IDA7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlLnVwbG9hZC50b3RhbENodW5rQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgaWYgKGZpbGUudXBsb2FkLmNodW5rc1tpXSAhPT0gdW5kZWZpbmVkICYmIGZpbGUudXBsb2FkLmNodW5rc1tpXS5wcm9ncmVzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGZpbGUudXBsb2FkLnByb2dyZXNzICs9IGZpbGUudXBsb2FkLmNodW5rc1tpXS5wcm9ncmVzcztcbiAgICAgICAgICAgICAgZmlsZS51cGxvYWQudG90YWwgKz0gZmlsZS51cGxvYWQuY2h1bmtzW2ldLnRvdGFsO1xuICAgICAgICAgICAgICBmaWxlLnVwbG9hZC5ieXRlc1NlbnQgKz0gZmlsZS51cGxvYWQuY2h1bmtzW2ldLmJ5dGVzU2VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZmlsZS51cGxvYWQucHJvZ3Jlc3MgPSBmaWxlLnVwbG9hZC5wcm9ncmVzcyAvIGZpbGUudXBsb2FkLnRvdGFsQ2h1bmtDb3VudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyNiA9IGZpbGVzLCBfaXNBcnJheTI2ID0gdHJ1ZSwgX2kyOCA9IDAsIF9pdGVyYXRvcjI2ID0gX2lzQXJyYXkyNiA/IF9pdGVyYXRvcjI2IDogX2l0ZXJhdG9yMjZbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgIHZhciBfcmVmMjU7XG5cbiAgICAgICAgICAgIGlmIChfaXNBcnJheTI2KSB7XG4gICAgICAgICAgICAgIGlmIChfaTI4ID49IF9pdGVyYXRvcjI2Lmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgIF9yZWYyNSA9IF9pdGVyYXRvcjI2W19pMjgrK107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfaTI4ID0gX2l0ZXJhdG9yMjYubmV4dCgpO1xuICAgICAgICAgICAgICBpZiAoX2kyOC5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgX3JlZjI1ID0gX2kyOC52YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIF9maWxlMiA9IF9yZWYyNTtcblxuICAgICAgICAgICAgX2ZpbGUyLnVwbG9hZC5wcm9ncmVzcyA9IHByb2dyZXNzO1xuICAgICAgICAgICAgX2ZpbGUyLnVwbG9hZC50b3RhbCA9IGUudG90YWw7XG4gICAgICAgICAgICBfZmlsZTIudXBsb2FkLmJ5dGVzU2VudCA9IGUubG9hZGVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyNyA9IGZpbGVzLCBfaXNBcnJheTI3ID0gdHJ1ZSwgX2kyOSA9IDAsIF9pdGVyYXRvcjI3ID0gX2lzQXJyYXkyNyA/IF9pdGVyYXRvcjI3IDogX2l0ZXJhdG9yMjdbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICB2YXIgX3JlZjI2O1xuXG4gICAgICAgICAgaWYgKF9pc0FycmF5MjcpIHtcbiAgICAgICAgICAgIGlmIChfaTI5ID49IF9pdGVyYXRvcjI3Lmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmMjYgPSBfaXRlcmF0b3IyN1tfaTI5KytdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfaTI5ID0gX2l0ZXJhdG9yMjcubmV4dCgpO1xuICAgICAgICAgICAgaWYgKF9pMjkuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmMjYgPSBfaTI5LnZhbHVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfZmlsZTMgPSBfcmVmMjY7XG5cbiAgICAgICAgICB0aGlzLmVtaXQoXCJ1cGxvYWRwcm9ncmVzc1wiLCBfZmlsZTMsIF9maWxlMy51cGxvYWQucHJvZ3Jlc3MsIF9maWxlMy51cGxvYWQuYnl0ZXNTZW50KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ2FsbGVkIHdoZW4gdGhlIGZpbGUgZmluaXNoZWQgdXBsb2FkaW5nXG5cbiAgICAgICAgdmFyIGFsbEZpbGVzRmluaXNoZWQgPSB0cnVlO1xuXG4gICAgICAgIHByb2dyZXNzID0gMTAwO1xuXG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjI4ID0gZmlsZXMsIF9pc0FycmF5MjggPSB0cnVlLCBfaTMwID0gMCwgX2l0ZXJhdG9yMjggPSBfaXNBcnJheTI4ID8gX2l0ZXJhdG9yMjggOiBfaXRlcmF0b3IyOFtTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgIHZhciBfcmVmMjc7XG5cbiAgICAgICAgICBpZiAoX2lzQXJyYXkyOCkge1xuICAgICAgICAgICAgaWYgKF9pMzAgPj0gX2l0ZXJhdG9yMjgubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYyNyA9IF9pdGVyYXRvcjI4W19pMzArK107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9pMzAgPSBfaXRlcmF0b3IyOC5uZXh0KCk7XG4gICAgICAgICAgICBpZiAoX2kzMC5kb25lKSBicmVhaztcbiAgICAgICAgICAgIF9yZWYyNyA9IF9pMzAudmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIF9maWxlNCA9IF9yZWYyNztcblxuICAgICAgICAgIGlmIChfZmlsZTQudXBsb2FkLnByb2dyZXNzICE9PSAxMDAgfHwgX2ZpbGU0LnVwbG9hZC5ieXRlc1NlbnQgIT09IF9maWxlNC51cGxvYWQudG90YWwpIHtcbiAgICAgICAgICAgIGFsbEZpbGVzRmluaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgX2ZpbGU0LnVwbG9hZC5wcm9ncmVzcyA9IHByb2dyZXNzO1xuICAgICAgICAgIF9maWxlNC51cGxvYWQuYnl0ZXNTZW50ID0gX2ZpbGU0LnVwbG9hZC50b3RhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vdGhpbmcgdG8gZG8sIGFsbCBmaWxlcyBhbHJlYWR5IGF0IDEwMCVcbiAgICAgICAgaWYgKGFsbEZpbGVzRmluaXNoZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyOSA9IGZpbGVzLCBfaXNBcnJheTI5ID0gdHJ1ZSwgX2kzMSA9IDAsIF9pdGVyYXRvcjI5ID0gX2lzQXJyYXkyOSA/IF9pdGVyYXRvcjI5IDogX2l0ZXJhdG9yMjlbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICB2YXIgX3JlZjI4O1xuXG4gICAgICAgICAgaWYgKF9pc0FycmF5MjkpIHtcbiAgICAgICAgICAgIGlmIChfaTMxID49IF9pdGVyYXRvcjI5Lmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmMjggPSBfaXRlcmF0b3IyOVtfaTMxKytdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfaTMxID0gX2l0ZXJhdG9yMjkubmV4dCgpO1xuICAgICAgICAgICAgaWYgKF9pMzEuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmMjggPSBfaTMxLnZhbHVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfZmlsZTUgPSBfcmVmMjg7XG5cbiAgICAgICAgICB0aGlzLmVtaXQoXCJ1cGxvYWRwcm9ncmVzc1wiLCBfZmlsZTUsIHByb2dyZXNzLCBfZmlsZTUudXBsb2FkLmJ5dGVzU2VudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2ZpbmlzaGVkVXBsb2FkaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9maW5pc2hlZFVwbG9hZGluZyhmaWxlcywgeGhyLCBlKSB7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB2b2lkIDA7XG5cbiAgICAgIGlmIChmaWxlc1swXS5zdGF0dXMgPT09IERyb3B6b25lLkNBTkNFTEVEKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHhoci5yZXNwb25zZVR5cGUgIT09ICdhcnJheWJ1ZmZlcicgJiYgeGhyLnJlc3BvbnNlVHlwZSAhPT0gJ2Jsb2InKSB7XG4gICAgICAgIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dDtcblxuICAgICAgICBpZiAoeGhyLmdldFJlc3BvbnNlSGVhZGVyKFwiY29udGVudC10eXBlXCIpICYmIH54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJjb250ZW50LXR5cGVcIikuaW5kZXhPZihcImFwcGxpY2F0aW9uL2pzb25cIikpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgZSA9IGVycm9yO1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBcIkludmFsaWQgSlNPTiByZXNwb25zZSBmcm9tIHNlcnZlci5cIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fdXBkYXRlRmlsZXNVcGxvYWRQcm9ncmVzcyhmaWxlcyk7XG5cbiAgICAgIGlmICghKDIwMCA8PSB4aHIuc3RhdHVzICYmIHhoci5zdGF0dXMgPCAzMDApKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZVVwbG9hZEVycm9yKGZpbGVzLCB4aHIsIHJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmaWxlc1swXS51cGxvYWQuY2h1bmtlZCkge1xuICAgICAgICAgIGZpbGVzWzBdLnVwbG9hZC5maW5pc2hlZENodW5rVXBsb2FkKHRoaXMuX2dldENodW5rKGZpbGVzWzBdLCB4aHIpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9maW5pc2hlZChmaWxlcywgcmVzcG9uc2UsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9oYW5kbGVVcGxvYWRFcnJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVXBsb2FkRXJyb3IoZmlsZXMsIHhociwgcmVzcG9uc2UpIHtcbiAgICAgIGlmIChmaWxlc1swXS5zdGF0dXMgPT09IERyb3B6b25lLkNBTkNFTEVEKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbGVzWzBdLnVwbG9hZC5jaHVua2VkICYmIHRoaXMub3B0aW9ucy5yZXRyeUNodW5rcykge1xuICAgICAgICB2YXIgY2h1bmsgPSB0aGlzLl9nZXRDaHVuayhmaWxlc1swXSwgeGhyKTtcbiAgICAgICAgaWYgKGNodW5rLnJldHJpZXMrKyA8IHRoaXMub3B0aW9ucy5yZXRyeUNodW5rc0xpbWl0KSB7XG4gICAgICAgICAgdGhpcy5fdXBsb2FkRGF0YShmaWxlcywgW2NodW5rLmRhdGFCbG9ja10pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1JldHJpZWQgdGhpcyBjaHVuayB0b28gb2Z0ZW4uIEdpdmluZyB1cC4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IzMCA9IGZpbGVzLCBfaXNBcnJheTMwID0gdHJ1ZSwgX2kzMiA9IDAsIF9pdGVyYXRvcjMwID0gX2lzQXJyYXkzMCA/IF9pdGVyYXRvcjMwIDogX2l0ZXJhdG9yMzBbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgdmFyIF9yZWYyOTtcblxuICAgICAgICBpZiAoX2lzQXJyYXkzMCkge1xuICAgICAgICAgIGlmIChfaTMyID49IF9pdGVyYXRvcjMwLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgX3JlZjI5ID0gX2l0ZXJhdG9yMzBbX2kzMisrXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfaTMyID0gX2l0ZXJhdG9yMzAubmV4dCgpO1xuICAgICAgICAgIGlmIChfaTMyLmRvbmUpIGJyZWFrO1xuICAgICAgICAgIF9yZWYyOSA9IF9pMzIudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZmlsZSA9IF9yZWYyOTtcblxuICAgICAgICB0aGlzLl9lcnJvclByb2Nlc3NpbmcoZmlsZXMsIHJlc3BvbnNlIHx8IHRoaXMub3B0aW9ucy5kaWN0UmVzcG9uc2VFcnJvci5yZXBsYWNlKFwie3tzdGF0dXNDb2RlfX1cIiwgeGhyLnN0YXR1cyksIHhocik7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInN1Ym1pdFJlcXVlc3RcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3VibWl0UmVxdWVzdCh4aHIsIGZvcm1EYXRhLCBmaWxlcykge1xuICAgICAgeGhyLnNlbmQoZm9ybURhdGEpO1xuICAgIH1cblxuICAgIC8vIENhbGxlZCBpbnRlcm5hbGx5IHdoZW4gcHJvY2Vzc2luZyBpcyBmaW5pc2hlZC5cbiAgICAvLyBJbmRpdmlkdWFsIGNhbGxiYWNrcyBoYXZlIHRvIGJlIGNhbGxlZCBpbiB0aGUgYXBwcm9wcmlhdGUgc2VjdGlvbnMuXG5cbiAgfSwge1xuICAgIGtleTogXCJfZmluaXNoZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2ZpbmlzaGVkKGZpbGVzLCByZXNwb25zZVRleHQsIGUpIHtcbiAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMxID0gZmlsZXMsIF9pc0FycmF5MzEgPSB0cnVlLCBfaTMzID0gMCwgX2l0ZXJhdG9yMzEgPSBfaXNBcnJheTMxID8gX2l0ZXJhdG9yMzEgOiBfaXRlcmF0b3IzMVtTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICB2YXIgX3JlZjMwO1xuXG4gICAgICAgIGlmIChfaXNBcnJheTMxKSB7XG4gICAgICAgICAgaWYgKF9pMzMgPj0gX2l0ZXJhdG9yMzEubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICBfcmVmMzAgPSBfaXRlcmF0b3IzMVtfaTMzKytdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9pMzMgPSBfaXRlcmF0b3IzMS5uZXh0KCk7XG4gICAgICAgICAgaWYgKF9pMzMuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgX3JlZjMwID0gX2kzMy52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmaWxlID0gX3JlZjMwO1xuXG4gICAgICAgIGZpbGUuc3RhdHVzID0gRHJvcHpvbmUuU1VDQ0VTUztcbiAgICAgICAgdGhpcy5lbWl0KFwic3VjY2Vzc1wiLCBmaWxlLCByZXNwb25zZVRleHQsIGUpO1xuICAgICAgICB0aGlzLmVtaXQoXCJjb21wbGV0ZVwiLCBmaWxlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudXBsb2FkTXVsdGlwbGUpIHtcbiAgICAgICAgdGhpcy5lbWl0KFwic3VjY2Vzc211bHRpcGxlXCIsIGZpbGVzLCByZXNwb25zZVRleHQsIGUpO1xuICAgICAgICB0aGlzLmVtaXQoXCJjb21wbGV0ZW11bHRpcGxlXCIsIGZpbGVzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvUHJvY2Vzc1F1ZXVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NRdWV1ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENhbGxlZCBpbnRlcm5hbGx5IHdoZW4gcHJvY2Vzc2luZyBpcyBmaW5pc2hlZC5cbiAgICAvLyBJbmRpdmlkdWFsIGNhbGxiYWNrcyBoYXZlIHRvIGJlIGNhbGxlZCBpbiB0aGUgYXBwcm9wcmlhdGUgc2VjdGlvbnMuXG5cbiAgfSwge1xuICAgIGtleTogXCJfZXJyb3JQcm9jZXNzaW5nXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9lcnJvclByb2Nlc3NpbmcoZmlsZXMsIG1lc3NhZ2UsIHhocikge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMzIgPSBmaWxlcywgX2lzQXJyYXkzMiA9IHRydWUsIF9pMzQgPSAwLCBfaXRlcmF0b3IzMiA9IF9pc0FycmF5MzIgPyBfaXRlcmF0b3IzMiA6IF9pdGVyYXRvcjMyW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgIHZhciBfcmVmMzE7XG5cbiAgICAgICAgaWYgKF9pc0FycmF5MzIpIHtcbiAgICAgICAgICBpZiAoX2kzNCA+PSBfaXRlcmF0b3IzMi5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgIF9yZWYzMSA9IF9pdGVyYXRvcjMyW19pMzQrK107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2kzNCA9IF9pdGVyYXRvcjMyLm5leHQoKTtcbiAgICAgICAgICBpZiAoX2kzNC5kb25lKSBicmVhaztcbiAgICAgICAgICBfcmVmMzEgPSBfaTM0LnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpbGUgPSBfcmVmMzE7XG5cbiAgICAgICAgZmlsZS5zdGF0dXMgPSBEcm9wem9uZS5FUlJPUjtcbiAgICAgICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgZmlsZSwgbWVzc2FnZSwgeGhyKTtcbiAgICAgICAgdGhpcy5lbWl0KFwiY29tcGxldGVcIiwgZmlsZSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnVwbG9hZE11bHRpcGxlKSB7XG4gICAgICAgIHRoaXMuZW1pdChcImVycm9ybXVsdGlwbGVcIiwgZmlsZXMsIG1lc3NhZ2UsIHhocik7XG4gICAgICAgIHRoaXMuZW1pdChcImNvbXBsZXRlbXVsdGlwbGVcIiwgZmlsZXMpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9Qcm9jZXNzUXVldWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwidXVpZHY0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHV1aWR2NCgpIHtcbiAgICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIHZhciByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMCxcbiAgICAgICAgICAgIHYgPSBjID09PSAneCcgPyByIDogciAmIDB4MyB8IDB4ODtcbiAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIERyb3B6b25lO1xufShFbWl0dGVyKTtcblxuRHJvcHpvbmUuaW5pdENsYXNzKCk7XG5cbkRyb3B6b25lLnZlcnNpb24gPSBcIjUuNC4wXCI7XG5cbi8vIFRoaXMgaXMgYSBtYXAgb2Ygb3B0aW9ucyBmb3IgeW91ciBkaWZmZXJlbnQgZHJvcHpvbmVzLiBBZGQgY29uZmlndXJhdGlvbnNcbi8vIHRvIHRoaXMgb2JqZWN0IGZvciB5b3VyIGRpZmZlcmVudCBkcm9wem9uZSBlbGVtZW5zLlxuLy9cbi8vIEV4YW1wbGU6XG4vL1xuLy8gICAgIERyb3B6b25lLm9wdGlvbnMubXlEcm9wem9uZUVsZW1lbnRJZCA9IHsgbWF4RmlsZXNpemU6IDEgfTtcbi8vXG4vLyBUbyBkaXNhYmxlIGF1dG9EaXNjb3ZlciBmb3IgYSBzcGVjaWZpYyBlbGVtZW50LCB5b3UgY2FuIHNldCBgZmFsc2VgIGFzIGFuIG9wdGlvbjpcbi8vXG4vLyAgICAgRHJvcHpvbmUub3B0aW9ucy5teURpc2FibGVkRWxlbWVudElkID0gZmFsc2U7XG4vL1xuLy8gQW5kIGluIGh0bWw6XG4vL1xuLy8gICAgIDxmb3JtIGFjdGlvbj1cIi91cGxvYWRcIiBpZD1cIm15LWRyb3B6b25lLWVsZW1lbnQtaWRcIiBjbGFzcz1cImRyb3B6b25lXCI+PC9mb3JtPlxuRHJvcHpvbmUub3B0aW9ucyA9IHt9O1xuXG4vLyBSZXR1cm5zIHRoZSBvcHRpb25zIGZvciBhbiBlbGVtZW50IG9yIHVuZGVmaW5lZCBpZiBub25lIGF2YWlsYWJsZS5cbkRyb3B6b25lLm9wdGlvbnNGb3JFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgLy8gR2V0IHRoZSBgRHJvcHpvbmUub3B0aW9ucy5lbGVtZW50SWRgIGZvciB0aGlzIGVsZW1lbnQgaWYgaXQgZXhpc3RzXG4gIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZShcImlkXCIpKSB7XG4gICAgcmV0dXJuIERyb3B6b25lLm9wdGlvbnNbY2FtZWxpemUoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJpZFwiKSldO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn07XG5cbi8vIEhvbGRzIGEgbGlzdCBvZiBhbGwgZHJvcHpvbmUgaW5zdGFuY2VzXG5Ecm9wem9uZS5pbnN0YW5jZXMgPSBbXTtcblxuLy8gUmV0dXJucyB0aGUgZHJvcHpvbmUgZm9yIGdpdmVuIGVsZW1lbnQgaWYgYW55XG5Ecm9wem9uZS5mb3JFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XG4gIH1cbiAgaWYgKChlbGVtZW50ICE9IG51bGwgPyBlbGVtZW50LmRyb3B6b25lIDogdW5kZWZpbmVkKSA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gRHJvcHpvbmUgZm91bmQgZm9yIGdpdmVuIGVsZW1lbnQuIFRoaXMgaXMgcHJvYmFibHkgYmVjYXVzZSB5b3UncmUgdHJ5aW5nIHRvIGFjY2VzcyBpdCBiZWZvcmUgRHJvcHpvbmUgaGFkIHRoZSB0aW1lIHRvIGluaXRpYWxpemUuIFVzZSB0aGUgYGluaXRgIG9wdGlvbiB0byBzZXR1cCBhbnkgYWRkaXRpb25hbCBvYnNlcnZlcnMgb24geW91ciBEcm9wem9uZS5cIik7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQuZHJvcHpvbmU7XG59O1xuXG4vLyBTZXQgdG8gZmFsc2UgaWYgeW91IGRvbid0IHdhbnQgRHJvcHpvbmUgdG8gYXV0b21hdGljYWxseSBmaW5kIGFuZCBhdHRhY2ggdG8gLmRyb3B6b25lIGVsZW1lbnRzLlxuRHJvcHpvbmUuYXV0b0Rpc2NvdmVyID0gdHJ1ZTtcblxuLy8gTG9va3MgZm9yIGFsbCAuZHJvcHpvbmUgZWxlbWVudHMgYW5kIGNyZWF0ZXMgYSBkcm9wem9uZSBmb3IgdGhlbVxuRHJvcHpvbmUuZGlzY292ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBkcm9wem9uZXMgPSB2b2lkIDA7XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKSB7XG4gICAgZHJvcHpvbmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kcm9wem9uZVwiKTtcbiAgfSBlbHNlIHtcbiAgICBkcm9wem9uZXMgPSBbXTtcbiAgICAvLyBJRSA6KFxuICAgIHZhciBjaGVja0VsZW1lbnRzID0gZnVuY3Rpb24gY2hlY2tFbGVtZW50cyhlbGVtZW50cykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IzMyA9IGVsZW1lbnRzLCBfaXNBcnJheTMzID0gdHJ1ZSwgX2kzNSA9IDAsIF9pdGVyYXRvcjMzID0gX2lzQXJyYXkzMyA/IF9pdGVyYXRvcjMzIDogX2l0ZXJhdG9yMzNbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICB2YXIgX3JlZjMyO1xuXG4gICAgICAgICAgaWYgKF9pc0FycmF5MzMpIHtcbiAgICAgICAgICAgIGlmIChfaTM1ID49IF9pdGVyYXRvcjMzLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmMzIgPSBfaXRlcmF0b3IzM1tfaTM1KytdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfaTM1ID0gX2l0ZXJhdG9yMzMubmV4dCgpO1xuICAgICAgICAgICAgaWYgKF9pMzUuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICBfcmVmMzIgPSBfaTM1LnZhbHVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBlbCA9IF9yZWYzMjtcblxuICAgICAgICAgIGlmICgvKF58IClkcm9wem9uZSgkfCApLy50ZXN0KGVsLmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGRyb3B6b25lcy5wdXNoKGVsKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KCk7XG4gICAgfTtcbiAgICBjaGVja0VsZW1lbnRzKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZGl2XCIpKTtcbiAgICBjaGVja0VsZW1lbnRzKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZm9ybVwiKSk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IzNCA9IGRyb3B6b25lcywgX2lzQXJyYXkzNCA9IHRydWUsIF9pMzYgPSAwLCBfaXRlcmF0b3IzNCA9IF9pc0FycmF5MzQgPyBfaXRlcmF0b3IzNCA6IF9pdGVyYXRvcjM0W1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICB2YXIgX3JlZjMzO1xuXG4gICAgICBpZiAoX2lzQXJyYXkzNCkge1xuICAgICAgICBpZiAoX2kzNiA+PSBfaXRlcmF0b3IzNC5sZW5ndGgpIGJyZWFrO1xuICAgICAgICBfcmVmMzMgPSBfaXRlcmF0b3IzNFtfaTM2KytdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2kzNiA9IF9pdGVyYXRvcjM0Lm5leHQoKTtcbiAgICAgICAgaWYgKF9pMzYuZG9uZSkgYnJlYWs7XG4gICAgICAgIF9yZWYzMyA9IF9pMzYudmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBkcm9wem9uZSA9IF9yZWYzMztcblxuICAgICAgLy8gQ3JlYXRlIGEgZHJvcHpvbmUgdW5sZXNzIGF1dG8gZGlzY292ZXIgaGFzIGJlZW4gZGlzYWJsZWQgZm9yIHNwZWNpZmljIGVsZW1lbnRcbiAgICAgIGlmIChEcm9wem9uZS5vcHRpb25zRm9yRWxlbWVudChkcm9wem9uZSkgIT09IGZhbHNlKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKG5ldyBEcm9wem9uZShkcm9wem9uZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0LnB1c2godW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSgpO1xufTtcblxuLy8gU2luY2UgdGhlIHdob2xlIERyYWcnbidEcm9wIEFQSSBpcyBwcmV0dHkgbmV3LCBzb21lIGJyb3dzZXJzIGltcGxlbWVudCBpdCxcbi8vIGJ1dCBub3QgY29ycmVjdGx5LlxuLy8gU28gSSBjcmVhdGVkIGEgYmxhY2tsaXN0IG9mIHVzZXJBZ2VudHMuIFllcywgeWVzLiBCcm93c2VyIHNuaWZmaW5nLCBJIGtub3cuXG4vLyBCdXQgd2hhdCB0byBkbyB3aGVuIGJyb3dzZXJzICp0aGVvcmV0aWNhbGx5KiBzdXBwb3J0IGFuIEFQSSwgYnV0IGNyYXNoXG4vLyB3aGVuIHVzaW5nIGl0LlxuLy9cbi8vIFRoaXMgaXMgYSBsaXN0IG9mIHJlZ3VsYXIgZXhwcmVzc2lvbnMgdGVzdGVkIGFnYWluc3QgbmF2aWdhdG9yLnVzZXJBZ2VudFxuLy9cbi8vICoqIEl0IHNob3VsZCBvbmx5IGJlIHVzZWQgb24gYnJvd3NlciB0aGF0ICpkbyogc3VwcG9ydCB0aGUgQVBJLCBidXRcbi8vIGluY29ycmVjdGx5ICoqXG4vL1xuRHJvcHpvbmUuYmxhY2tsaXN0ZWRCcm93c2VycyA9IFtcbi8vIFRoZSBtYWMgb3MgYW5kIHdpbmRvd3MgcGhvbmUgdmVyc2lvbiBvZiBvcGVyYSAxMiBzZWVtcyB0byBoYXZlIGEgcHJvYmxlbSB3aXRoIHRoZSBGaWxlIGRyYWcnbidkcm9wIEFQSS5cbi9vcGVyYS4qKE1hY2ludG9zaHxXaW5kb3dzIFBob25lKS4qdmVyc2lvblxcLzEyL2ldO1xuXG4vLyBDaGVja3MgaWYgdGhlIGJyb3dzZXIgaXMgc3VwcG9ydGVkXG5Ecm9wem9uZS5pc0Jyb3dzZXJTdXBwb3J0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjYXBhYmxlQnJvd3NlciA9IHRydWU7XG5cbiAgaWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYiAmJiB3aW5kb3cuRm9ybURhdGEgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcikge1xuICAgIGlmICghKFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIikpKSB7XG4gICAgICBjYXBhYmxlQnJvd3NlciA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgQVBJLCBidXQgbWF5IGJlIGJsYWNrbGlzdGVkLlxuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMzUgPSBEcm9wem9uZS5ibGFja2xpc3RlZEJyb3dzZXJzLCBfaXNBcnJheTM1ID0gdHJ1ZSwgX2kzNyA9IDAsIF9pdGVyYXRvcjM1ID0gX2lzQXJyYXkzNSA/IF9pdGVyYXRvcjM1IDogX2l0ZXJhdG9yMzVbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgdmFyIF9yZWYzNDtcblxuICAgICAgICBpZiAoX2lzQXJyYXkzNSkge1xuICAgICAgICAgIGlmIChfaTM3ID49IF9pdGVyYXRvcjM1Lmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgX3JlZjM0ID0gX2l0ZXJhdG9yMzVbX2kzNysrXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfaTM3ID0gX2l0ZXJhdG9yMzUubmV4dCgpO1xuICAgICAgICAgIGlmIChfaTM3LmRvbmUpIGJyZWFrO1xuICAgICAgICAgIF9yZWYzNCA9IF9pMzcudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVnZXggPSBfcmVmMzQ7XG5cbiAgICAgICAgaWYgKHJlZ2V4LnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgICBjYXBhYmxlQnJvd3NlciA9IGZhbHNlO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNhcGFibGVCcm93c2VyID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gY2FwYWJsZUJyb3dzZXI7XG59O1xuXG5Ecm9wem9uZS5kYXRhVVJJdG9CbG9iID0gZnVuY3Rpb24gKGRhdGFVUkkpIHtcbiAgLy8gY29udmVydCBiYXNlNjQgdG8gcmF3IGJpbmFyeSBkYXRhIGhlbGQgaW4gYSBzdHJpbmdcbiAgLy8gZG9lc24ndCBoYW5kbGUgVVJMRW5jb2RlZCBEYXRhVVJJcyAtIHNlZSBTTyBhbnN3ZXIgIzY4NTAyNzYgZm9yIGNvZGUgdGhhdCBkb2VzIHRoaXNcbiAgdmFyIGJ5dGVTdHJpbmcgPSBhdG9iKGRhdGFVUkkuc3BsaXQoJywnKVsxXSk7XG5cbiAgLy8gc2VwYXJhdGUgb3V0IHRoZSBtaW1lIGNvbXBvbmVudFxuICB2YXIgbWltZVN0cmluZyA9IGRhdGFVUkkuc3BsaXQoJywnKVswXS5zcGxpdCgnOicpWzFdLnNwbGl0KCc7JylbMF07XG5cbiAgLy8gd3JpdGUgdGhlIGJ5dGVzIG9mIHRoZSBzdHJpbmcgdG8gYW4gQXJyYXlCdWZmZXJcbiAgdmFyIGFiID0gbmV3IEFycmF5QnVmZmVyKGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgdmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuICBmb3IgKHZhciBpID0gMCwgZW5kID0gYnl0ZVN0cmluZy5sZW5ndGgsIGFzYyA9IDAgPD0gZW5kOyBhc2MgPyBpIDw9IGVuZCA6IGkgPj0gZW5kOyBhc2MgPyBpKysgOiBpLS0pIHtcbiAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgfVxuXG4gIC8vIHdyaXRlIHRoZSBBcnJheUJ1ZmZlciB0byBhIGJsb2JcbiAgcmV0dXJuIG5ldyBCbG9iKFthYl0sIHsgdHlwZTogbWltZVN0cmluZyB9KTtcbn07XG5cbi8vIFJldHVybnMgYW4gYXJyYXkgd2l0aG91dCB0aGUgcmVqZWN0ZWQgaXRlbVxudmFyIHdpdGhvdXQgPSBmdW5jdGlvbiB3aXRob3V0KGxpc3QsIHJlamVjdGVkSXRlbSkge1xuICByZXR1cm4gbGlzdC5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbSAhPT0gcmVqZWN0ZWRJdGVtO1xuICB9KS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICByZXR1cm4gaXRlbTtcbiAgfSk7XG59O1xuXG4vLyBhYmMtZGVmX2doaSAtPiBhYmNEZWZHaGlcbnZhciBjYW1lbGl6ZSA9IGZ1bmN0aW9uIGNhbWVsaXplKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXC1fXShcXHcpL2csIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBtYXRjaC5jaGFyQXQoMSkudG9VcHBlckNhc2UoKTtcbiAgfSk7XG59O1xuXG4vLyBDcmVhdGVzIGFuIGVsZW1lbnQgZnJvbSBzdHJpbmdcbkRyb3B6b25lLmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkaXYuaW5uZXJIVE1MID0gc3RyaW5nO1xuICByZXR1cm4gZGl2LmNoaWxkTm9kZXNbMF07XG59O1xuXG4vLyBUZXN0cyBpZiBnaXZlbiBlbGVtZW50IGlzIGluc2lkZSAob3Igc2ltcGx5IGlzKSB0aGUgY29udGFpbmVyXG5Ecm9wem9uZS5lbGVtZW50SW5zaWRlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNvbnRhaW5lcikge1xuICBpZiAoZWxlbWVudCA9PT0gY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gQ29mZmVlc2NyaXB0IGRvZXNuJ3Qgc3VwcG9ydCBkby93aGlsZSBsb29wc1xuICB3aGlsZSAoZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgIGlmIChlbGVtZW50ID09PSBjb250YWluZXIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5Ecm9wem9uZS5nZXRFbGVtZW50ID0gZnVuY3Rpb24gKGVsLCBuYW1lKSB7XG4gIHZhciBlbGVtZW50ID0gdm9pZCAwO1xuICBpZiAodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKSB7XG4gICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICB9IGVsc2UgaWYgKGVsLm5vZGVUeXBlICE9IG51bGwpIHtcbiAgICBlbGVtZW50ID0gZWw7XG4gIH1cbiAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYFwiICsgbmFtZSArIFwiYCBvcHRpb24gcHJvdmlkZWQuIFBsZWFzZSBwcm92aWRlIGEgQ1NTIHNlbGVjdG9yIG9yIGEgcGxhaW4gSFRNTCBlbGVtZW50LlwiKTtcbiAgfVxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbkRyb3B6b25lLmdldEVsZW1lbnRzID0gZnVuY3Rpb24gKGVscywgbmFtZSkge1xuICB2YXIgZWwgPSB2b2lkIDAsXG4gICAgICBlbGVtZW50cyA9IHZvaWQgMDtcbiAgaWYgKGVscyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgZWxlbWVudHMgPSBbXTtcbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMzYgPSBlbHMsIF9pc0FycmF5MzYgPSB0cnVlLCBfaTM4ID0gMCwgX2l0ZXJhdG9yMzYgPSBfaXNBcnJheTM2ID8gX2l0ZXJhdG9yMzYgOiBfaXRlcmF0b3IzNltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICBpZiAoX2lzQXJyYXkzNikge1xuICAgICAgICAgIGlmIChfaTM4ID49IF9pdGVyYXRvcjM2Lmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgZWwgPSBfaXRlcmF0b3IzNltfaTM4KytdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9pMzggPSBfaXRlcmF0b3IzNi5uZXh0KCk7XG4gICAgICAgICAgaWYgKF9pMzguZG9uZSkgYnJlYWs7XG4gICAgICAgICAgZWwgPSBfaTM4LnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudHMucHVzaCh0aGlzLmdldEVsZW1lbnQoZWwsIG5hbWUpKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlbGVtZW50cyA9IG51bGw7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbHMgPT09IFwic3RyaW5nXCIpIHtcbiAgICBlbGVtZW50cyA9IFtdO1xuICAgIGZvciAodmFyIF9pdGVyYXRvcjM3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbHMpLCBfaXNBcnJheTM3ID0gdHJ1ZSwgX2kzOSA9IDAsIF9pdGVyYXRvcjM3ID0gX2lzQXJyYXkzNyA/IF9pdGVyYXRvcjM3IDogX2l0ZXJhdG9yMzdbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgIGlmIChfaXNBcnJheTM3KSB7XG4gICAgICAgIGlmIChfaTM5ID49IF9pdGVyYXRvcjM3Lmxlbmd0aCkgYnJlYWs7XG4gICAgICAgIGVsID0gX2l0ZXJhdG9yMzdbX2kzOSsrXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9pMzkgPSBfaXRlcmF0b3IzNy5uZXh0KCk7XG4gICAgICAgIGlmIChfaTM5LmRvbmUpIGJyZWFrO1xuICAgICAgICBlbCA9IF9pMzkudmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGVsZW1lbnRzLnB1c2goZWwpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChlbHMubm9kZVR5cGUgIT0gbnVsbCkge1xuICAgIGVsZW1lbnRzID0gW2Vsc107XG4gIH1cblxuICBpZiAoZWxlbWVudHMgPT0gbnVsbCB8fCAhZWxlbWVudHMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBgXCIgKyBuYW1lICsgXCJgIG9wdGlvbiBwcm92aWRlZC4gUGxlYXNlIHByb3ZpZGUgYSBDU1Mgc2VsZWN0b3IsIGEgcGxhaW4gSFRNTCBlbGVtZW50IG9yIGEgbGlzdCBvZiB0aG9zZS5cIik7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudHM7XG59O1xuXG4vLyBBc2tzIHRoZSB1c2VyIHRoZSBxdWVzdGlvbiBhbmQgY2FsbHMgYWNjZXB0ZWQgb3IgcmVqZWN0ZWQgYWNjb3JkaW5nbHlcbi8vXG4vLyBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBqdXN0IHVzZXMgYHdpbmRvdy5jb25maXJtYCBhbmQgdGhlbiBjYWxscyB0aGVcbi8vIGFwcHJvcHJpYXRlIGNhbGxiYWNrLlxuRHJvcHpvbmUuY29uZmlybSA9IGZ1bmN0aW9uIChxdWVzdGlvbiwgYWNjZXB0ZWQsIHJlamVjdGVkKSB7XG4gIGlmICh3aW5kb3cuY29uZmlybShxdWVzdGlvbikpIHtcbiAgICByZXR1cm4gYWNjZXB0ZWQoKTtcbiAgfSBlbHNlIGlmIChyZWplY3RlZCAhPSBudWxsKSB7XG4gICAgcmV0dXJuIHJlamVjdGVkKCk7XG4gIH1cbn07XG5cbi8vIFZhbGlkYXRlcyB0aGUgbWltZSB0eXBlIGxpa2UgdGhpczpcbi8vXG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0hUTUwvRWxlbWVudC9pbnB1dCNhdHRyLWFjY2VwdFxuRHJvcHpvbmUuaXNWYWxpZEZpbGUgPSBmdW5jdGlvbiAoZmlsZSwgYWNjZXB0ZWRGaWxlcykge1xuICBpZiAoIWFjY2VwdGVkRmlsZXMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSAvLyBJZiB0aGVyZSBhcmUgbm8gYWNjZXB0ZWQgbWltZSB0eXBlcywgaXQncyBPS1xuICBhY2NlcHRlZEZpbGVzID0gYWNjZXB0ZWRGaWxlcy5zcGxpdChcIixcIik7XG5cbiAgdmFyIG1pbWVUeXBlID0gZmlsZS50eXBlO1xuICB2YXIgYmFzZU1pbWVUeXBlID0gbWltZVR5cGUucmVwbGFjZSgvXFwvLiokLywgXCJcIik7XG5cbiAgZm9yICh2YXIgX2l0ZXJhdG9yMzggPSBhY2NlcHRlZEZpbGVzLCBfaXNBcnJheTM4ID0gdHJ1ZSwgX2k0MCA9IDAsIF9pdGVyYXRvcjM4ID0gX2lzQXJyYXkzOCA/IF9pdGVyYXRvcjM4IDogX2l0ZXJhdG9yMzhbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICB2YXIgX3JlZjM1O1xuXG4gICAgaWYgKF9pc0FycmF5MzgpIHtcbiAgICAgIGlmIChfaTQwID49IF9pdGVyYXRvcjM4Lmxlbmd0aCkgYnJlYWs7XG4gICAgICBfcmVmMzUgPSBfaXRlcmF0b3IzOFtfaTQwKytdO1xuICAgIH0gZWxzZSB7XG4gICAgICBfaTQwID0gX2l0ZXJhdG9yMzgubmV4dCgpO1xuICAgICAgaWYgKF9pNDAuZG9uZSkgYnJlYWs7XG4gICAgICBfcmVmMzUgPSBfaTQwLnZhbHVlO1xuICAgIH1cblxuICAgIHZhciB2YWxpZFR5cGUgPSBfcmVmMzU7XG5cbiAgICB2YWxpZFR5cGUgPSB2YWxpZFR5cGUudHJpbSgpO1xuICAgIGlmICh2YWxpZFR5cGUuY2hhckF0KDApID09PSBcIi5cIikge1xuICAgICAgaWYgKGZpbGUubmFtZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YodmFsaWRUeXBlLnRvTG93ZXJDYXNlKCksIGZpbGUubmFtZS5sZW5ndGggLSB2YWxpZFR5cGUubGVuZ3RoKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgvXFwvXFwqJC8udGVzdCh2YWxpZFR5cGUpKSB7XG4gICAgICAvLyBUaGlzIGlzIHNvbWV0aGluZyBsaWtlIGEgaW1hZ2UvKiBtaW1lIHR5cGVcbiAgICAgIGlmIChiYXNlTWltZVR5cGUgPT09IHZhbGlkVHlwZS5yZXBsYWNlKC9cXC8uKiQvLCBcIlwiKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG1pbWVUeXBlID09PSB2YWxpZFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLy8gQXVnbWVudCBqUXVlcnlcbmlmICh0eXBlb2YgalF1ZXJ5ICE9PSAndW5kZWZpbmVkJyAmJiBqUXVlcnkgIT09IG51bGwpIHtcbiAgalF1ZXJ5LmZuLmRyb3B6b25lID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgRHJvcHpvbmUodGhpcywgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH07XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUgIT09IG51bGwpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBEcm9wem9uZTtcbn0gZWxzZSB7XG4gIHdpbmRvdy5Ecm9wem9uZSA9IERyb3B6b25lO1xufVxuXG4vLyBEcm9wem9uZSBmaWxlIHN0YXR1cyBjb2Rlc1xuRHJvcHpvbmUuQURERUQgPSBcImFkZGVkXCI7XG5cbkRyb3B6b25lLlFVRVVFRCA9IFwicXVldWVkXCI7XG4vLyBGb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuIE5vdywgaWYgYSBmaWxlIGlzIGFjY2VwdGVkLCBpdCdzIGVpdGhlciBxdWV1ZWRcbi8vIG9yIHVwbG9hZGluZy5cbkRyb3B6b25lLkFDQ0VQVEVEID0gRHJvcHpvbmUuUVVFVUVEO1xuXG5Ecm9wem9uZS5VUExPQURJTkcgPSBcInVwbG9hZGluZ1wiO1xuRHJvcHpvbmUuUFJPQ0VTU0lORyA9IERyb3B6b25lLlVQTE9BRElORzsgLy8gYWxpYXNcblxuRHJvcHpvbmUuQ0FOQ0VMRUQgPSBcImNhbmNlbGVkXCI7XG5Ecm9wem9uZS5FUlJPUiA9IFwiZXJyb3JcIjtcbkRyb3B6b25lLlNVQ0NFU1MgPSBcInN1Y2Nlc3NcIjtcblxuLypcblxuIEJ1Z2ZpeCBmb3IgaU9TIDYgYW5kIDdcbiBTb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTE5MjkwOTkvaHRtbDUtY2FudmFzLWRyYXdpbWFnZS1yYXRpby1idWctaW9zXG4gYmFzZWQgb24gdGhlIHdvcmsgb2YgaHR0cHM6Ly9naXRodWIuY29tL3N0b21pdGEvaW9zLWltYWdlZmlsZS1tZWdhcGl4ZWxcblxuICovXG5cbi8vIERldGVjdGluZyB2ZXJ0aWNhbCBzcXVhc2ggaW4gbG9hZGVkIGltYWdlLlxuLy8gRml4ZXMgYSBidWcgd2hpY2ggc3F1YXNoIGltYWdlIHZlcnRpY2FsbHkgd2hpbGUgZHJhd2luZyBpbnRvIGNhbnZhcyBmb3Igc29tZSBpbWFnZXMuXG4vLyBUaGlzIGlzIGEgYnVnIGluIGlPUzYgZGV2aWNlcy4gVGhpcyBmdW5jdGlvbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zdG9taXRhL2lvcy1pbWFnZWZpbGUtbWVnYXBpeGVsXG52YXIgZGV0ZWN0VmVydGljYWxTcXVhc2ggPSBmdW5jdGlvbiBkZXRlY3RWZXJ0aWNhbFNxdWFzaChpbWcpIHtcbiAgdmFyIGl3ID0gaW1nLm5hdHVyYWxXaWR0aDtcbiAgdmFyIGloID0gaW1nLm5hdHVyYWxIZWlnaHQ7XG4gIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICBjYW52YXMud2lkdGggPSAxO1xuICBjYW52YXMuaGVpZ2h0ID0gaWg7XG4gIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG5cbiAgdmFyIF9jdHgkZ2V0SW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgxLCAwLCAxLCBpaCksXG4gICAgICBkYXRhID0gX2N0eCRnZXRJbWFnZURhdGEuZGF0YTtcblxuICAvLyBzZWFyY2ggaW1hZ2UgZWRnZSBwaXhlbCBwb3NpdGlvbiBpbiBjYXNlIGl0IGlzIHNxdWFzaGVkIHZlcnRpY2FsbHkuXG5cblxuICB2YXIgc3kgPSAwO1xuICB2YXIgZXkgPSBpaDtcbiAgdmFyIHB5ID0gaWg7XG4gIHdoaWxlIChweSA+IHN5KSB7XG4gICAgdmFyIGFscGhhID0gZGF0YVsocHkgLSAxKSAqIDQgKyAzXTtcblxuICAgIGlmIChhbHBoYSA9PT0gMCkge1xuICAgICAgZXkgPSBweTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3kgPSBweTtcbiAgICB9XG5cbiAgICBweSA9IGV5ICsgc3kgPj4gMTtcbiAgfVxuICB2YXIgcmF0aW8gPSBweSAvIGloO1xuXG4gIGlmIChyYXRpbyA9PT0gMCkge1xuICAgIHJldHVybiAxO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiByYXRpbztcbiAgfVxufTtcblxuLy8gQSByZXBsYWNlbWVudCBmb3IgY29udGV4dC5kcmF3SW1hZ2Vcbi8vIChhcmdzIGFyZSBmb3Igc291cmNlIGFuZCBkZXN0aW5hdGlvbikuXG52YXIgZHJhd0ltYWdlSU9TRml4ID0gZnVuY3Rpb24gZHJhd0ltYWdlSU9TRml4KGN0eCwgaW1nLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpIHtcbiAgdmFyIHZlcnRTcXVhc2hSYXRpbyA9IGRldGVjdFZlcnRpY2FsU3F1YXNoKGltZyk7XG4gIHJldHVybiBjdHguZHJhd0ltYWdlKGltZywgc3gsIHN5LCBzdywgc2gsIGR4LCBkeSwgZHcsIGRoIC8gdmVydFNxdWFzaFJhdGlvKTtcbn07XG5cbi8vIEJhc2VkIG9uIE1pbmlmeUpwZWdcbi8vIFNvdXJjZTogaHR0cDovL3d3dy5wZXJyeS5jei9maWxlcy9FeGlmUmVzdG9yZXIuanNcbi8vIGh0dHA6Ly9lbGljb24uYmxvZzU3LmZjMi5jb20vYmxvZy1lbnRyeS0yMDYuaHRtbFxuXG52YXIgRXhpZlJlc3RvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEV4aWZSZXN0b3JlKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFeGlmUmVzdG9yZSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRXhpZlJlc3RvcmUsIG51bGwsIFt7XG4gICAga2V5OiBcImluaXRDbGFzc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0Q2xhc3MoKSB7XG4gICAgICB0aGlzLktFWV9TVFIgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlbmNvZGU2NFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmNvZGU2NChpbnB1dCkge1xuICAgICAgdmFyIG91dHB1dCA9ICcnO1xuICAgICAgdmFyIGNocjEgPSB1bmRlZmluZWQ7XG4gICAgICB2YXIgY2hyMiA9IHVuZGVmaW5lZDtcbiAgICAgIHZhciBjaHIzID0gJyc7XG4gICAgICB2YXIgZW5jMSA9IHVuZGVmaW5lZDtcbiAgICAgIHZhciBlbmMyID0gdW5kZWZpbmVkO1xuICAgICAgdmFyIGVuYzMgPSB1bmRlZmluZWQ7XG4gICAgICB2YXIgZW5jNCA9ICcnO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY2hyMSA9IGlucHV0W2krK107XG4gICAgICAgIGNocjIgPSBpbnB1dFtpKytdO1xuICAgICAgICBjaHIzID0gaW5wdXRbaSsrXTtcbiAgICAgICAgZW5jMSA9IGNocjEgPj4gMjtcbiAgICAgICAgZW5jMiA9IChjaHIxICYgMykgPDwgNCB8IGNocjIgPj4gNDtcbiAgICAgICAgZW5jMyA9IChjaHIyICYgMTUpIDw8IDIgfCBjaHIzID4+IDY7XG4gICAgICAgIGVuYzQgPSBjaHIzICYgNjM7XG4gICAgICAgIGlmIChpc05hTihjaHIyKSkge1xuICAgICAgICAgIGVuYzMgPSBlbmM0ID0gNjQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNOYU4oY2hyMykpIHtcbiAgICAgICAgICBlbmM0ID0gNjQ7XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0ICsgdGhpcy5LRVlfU1RSLmNoYXJBdChlbmMxKSArIHRoaXMuS0VZX1NUUi5jaGFyQXQoZW5jMikgKyB0aGlzLktFWV9TVFIuY2hhckF0KGVuYzMpICsgdGhpcy5LRVlfU1RSLmNoYXJBdChlbmM0KTtcbiAgICAgICAgY2hyMSA9IGNocjIgPSBjaHIzID0gJyc7XG4gICAgICAgIGVuYzEgPSBlbmMyID0gZW5jMyA9IGVuYzQgPSAnJztcbiAgICAgICAgaWYgKCEoaSA8IGlucHV0Lmxlbmd0aCkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVzdG9yZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZXN0b3JlKG9yaWdGaWxlQmFzZTY0LCByZXNpemVkRmlsZUJhc2U2NCkge1xuICAgICAgaWYgKCFvcmlnRmlsZUJhc2U2NC5tYXRjaCgnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnKSkge1xuICAgICAgICByZXR1cm4gcmVzaXplZEZpbGVCYXNlNjQ7XG4gICAgICB9XG4gICAgICB2YXIgcmF3SW1hZ2UgPSB0aGlzLmRlY29kZTY0KG9yaWdGaWxlQmFzZTY0LnJlcGxhY2UoJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJywgJycpKTtcbiAgICAgIHZhciBzZWdtZW50cyA9IHRoaXMuc2xpY2UyU2VnbWVudHMocmF3SW1hZ2UpO1xuICAgICAgdmFyIGltYWdlID0gdGhpcy5leGlmTWFuaXB1bGF0aW9uKHJlc2l6ZWRGaWxlQmFzZTY0LCBzZWdtZW50cyk7XG4gICAgICByZXR1cm4gXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiICsgdGhpcy5lbmNvZGU2NChpbWFnZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImV4aWZNYW5pcHVsYXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZXhpZk1hbmlwdWxhdGlvbihyZXNpemVkRmlsZUJhc2U2NCwgc2VnbWVudHMpIHtcbiAgICAgIHZhciBleGlmQXJyYXkgPSB0aGlzLmdldEV4aWZBcnJheShzZWdtZW50cyk7XG4gICAgICB2YXIgbmV3SW1hZ2VBcnJheSA9IHRoaXMuaW5zZXJ0RXhpZihyZXNpemVkRmlsZUJhc2U2NCwgZXhpZkFycmF5KTtcbiAgICAgIHZhciBhQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkobmV3SW1hZ2VBcnJheSk7XG4gICAgICByZXR1cm4gYUJ1ZmZlcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0RXhpZkFycmF5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldEV4aWZBcnJheShzZWdtZW50cykge1xuICAgICAgdmFyIHNlZyA9IHVuZGVmaW5lZDtcbiAgICAgIHZhciB4ID0gMDtcbiAgICAgIHdoaWxlICh4IDwgc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgIHNlZyA9IHNlZ21lbnRzW3hdO1xuICAgICAgICBpZiAoc2VnWzBdID09PSAyNTUgJiBzZWdbMV0gPT09IDIyNSkge1xuICAgICAgICAgIHJldHVybiBzZWc7XG4gICAgICAgIH1cbiAgICAgICAgeCsrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpbnNlcnRFeGlmXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluc2VydEV4aWYocmVzaXplZEZpbGVCYXNlNjQsIGV4aWZBcnJheSkge1xuICAgICAgdmFyIGltYWdlRGF0YSA9IHJlc2l6ZWRGaWxlQmFzZTY0LnJlcGxhY2UoJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJywgJycpO1xuICAgICAgdmFyIGJ1ZiA9IHRoaXMuZGVjb2RlNjQoaW1hZ2VEYXRhKTtcbiAgICAgIHZhciBzZXBhcmF0ZVBvaW50ID0gYnVmLmluZGV4T2YoMjU1LCAzKTtcbiAgICAgIHZhciBtYWUgPSBidWYuc2xpY2UoMCwgc2VwYXJhdGVQb2ludCk7XG4gICAgICB2YXIgYXRvID0gYnVmLnNsaWNlKHNlcGFyYXRlUG9pbnQpO1xuICAgICAgdmFyIGFycmF5ID0gbWFlO1xuICAgICAgYXJyYXkgPSBhcnJheS5jb25jYXQoZXhpZkFycmF5KTtcbiAgICAgIGFycmF5ID0gYXJyYXkuY29uY2F0KGF0byk7XG4gICAgICByZXR1cm4gYXJyYXk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNsaWNlMlNlZ21lbnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNsaWNlMlNlZ21lbnRzKHJhd0ltYWdlQXJyYXkpIHtcbiAgICAgIHZhciBoZWFkID0gMDtcbiAgICAgIHZhciBzZWdtZW50cyA9IFtdO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGxlbmd0aDtcbiAgICAgICAgaWYgKHJhd0ltYWdlQXJyYXlbaGVhZF0gPT09IDI1NSAmIHJhd0ltYWdlQXJyYXlbaGVhZCArIDFdID09PSAyMTgpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmF3SW1hZ2VBcnJheVtoZWFkXSA9PT0gMjU1ICYgcmF3SW1hZ2VBcnJheVtoZWFkICsgMV0gPT09IDIxNikge1xuICAgICAgICAgIGhlYWQgKz0gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZW5ndGggPSByYXdJbWFnZUFycmF5W2hlYWQgKyAyXSAqIDI1NiArIHJhd0ltYWdlQXJyYXlbaGVhZCArIDNdO1xuICAgICAgICAgIHZhciBlbmRQb2ludCA9IGhlYWQgKyBsZW5ndGggKyAyO1xuICAgICAgICAgIHZhciBzZWcgPSByYXdJbWFnZUFycmF5LnNsaWNlKGhlYWQsIGVuZFBvaW50KTtcbiAgICAgICAgICBzZWdtZW50cy5wdXNoKHNlZyk7XG4gICAgICAgICAgaGVhZCA9IGVuZFBvaW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChoZWFkID4gcmF3SW1hZ2VBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNlZ21lbnRzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZWNvZGU2NFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZWNvZGU2NChpbnB1dCkge1xuICAgICAgdmFyIG91dHB1dCA9ICcnO1xuICAgICAgdmFyIGNocjEgPSB1bmRlZmluZWQ7XG4gICAgICB2YXIgY2hyMiA9IHVuZGVmaW5lZDtcbiAgICAgIHZhciBjaHIzID0gJyc7XG4gICAgICB2YXIgZW5jMSA9IHVuZGVmaW5lZDtcbiAgICAgIHZhciBlbmMyID0gdW5kZWZpbmVkO1xuICAgICAgdmFyIGVuYzMgPSB1bmRlZmluZWQ7XG4gICAgICB2YXIgZW5jNCA9ICcnO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgLy8gcmVtb3ZlIGFsbCBjaGFyYWN0ZXJzIHRoYXQgYXJlIG5vdCBBLVosIGEteiwgMC05LCArLCAvLCBvciA9XG4gICAgICB2YXIgYmFzZTY0dGVzdCA9IC9bXkEtWmEtejAtOVxcK1xcL1xcPV0vZztcbiAgICAgIGlmIChiYXNlNjR0ZXN0LmV4ZWMoaW5wdXQpKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignVGhlcmUgd2VyZSBpbnZhbGlkIGJhc2U2NCBjaGFyYWN0ZXJzIGluIHRoZSBpbnB1dCB0ZXh0LlxcblZhbGlkIGJhc2U2NCBjaGFyYWN0ZXJzIGFyZSBBLVosIGEteiwgMC05LCBcXCcrXFwnLCBcXCcvXFwnLGFuZCBcXCc9XFwnXFxuRXhwZWN0IGVycm9ycyBpbiBkZWNvZGluZy4nKTtcbiAgICAgIH1cbiAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTlcXCtcXC9cXD1dL2csICcnKTtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGVuYzEgPSB0aGlzLktFWV9TVFIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XG4gICAgICAgIGVuYzIgPSB0aGlzLktFWV9TVFIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XG4gICAgICAgIGVuYzMgPSB0aGlzLktFWV9TVFIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XG4gICAgICAgIGVuYzQgPSB0aGlzLktFWV9TVFIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XG4gICAgICAgIGNocjEgPSBlbmMxIDw8IDIgfCBlbmMyID4+IDQ7XG4gICAgICAgIGNocjIgPSAoZW5jMiAmIDE1KSA8PCA0IHwgZW5jMyA+PiAyO1xuICAgICAgICBjaHIzID0gKGVuYzMgJiAzKSA8PCA2IHwgZW5jNDtcbiAgICAgICAgYnVmLnB1c2goY2hyMSk7XG4gICAgICAgIGlmIChlbmMzICE9PSA2NCkge1xuICAgICAgICAgIGJ1Zi5wdXNoKGNocjIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbmM0ICE9PSA2NCkge1xuICAgICAgICAgIGJ1Zi5wdXNoKGNocjMpO1xuICAgICAgICB9XG4gICAgICAgIGNocjEgPSBjaHIyID0gY2hyMyA9ICcnO1xuICAgICAgICBlbmMxID0gZW5jMiA9IGVuYzMgPSBlbmM0ID0gJyc7XG4gICAgICAgIGlmICghKGkgPCBpbnB1dC5sZW5ndGgpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBidWY7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEV4aWZSZXN0b3JlO1xufSgpO1xuXG5FeGlmUmVzdG9yZS5pbml0Q2xhc3MoKTtcblxuLypcbiAqIGNvbnRlbnRsb2FkZWQuanNcbiAqXG4gKiBBdXRob3I6IERpZWdvIFBlcmluaSAoZGllZ28ucGVyaW5pIGF0IGdtYWlsLmNvbSlcbiAqIFN1bW1hcnk6IGNyb3NzLWJyb3dzZXIgd3JhcHBlciBmb3IgRE9NQ29udGVudExvYWRlZFxuICogVXBkYXRlZDogMjAxMDEwMjBcbiAqIExpY2Vuc2U6IE1JVFxuICogVmVyc2lvbjogMS4yXG4gKlxuICogVVJMOlxuICogaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0NvbnRlbnRMb2FkZWQvXG4gKiBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vQ29udGVudExvYWRlZC9NSVQtTElDRU5TRVxuICovXG5cbi8vIEB3aW4gd2luZG93IHJlZmVyZW5jZVxuLy8gQGZuIGZ1bmN0aW9uIHJlZmVyZW5jZVxudmFyIGNvbnRlbnRMb2FkZWQgPSBmdW5jdGlvbiBjb250ZW50TG9hZGVkKHdpbiwgZm4pIHtcbiAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgdmFyIHRvcCA9IHRydWU7XG4gIHZhciBkb2MgPSB3aW4uZG9jdW1lbnQ7XG4gIHZhciByb290ID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgdmFyIGFkZCA9IGRvYy5hZGRFdmVudExpc3RlbmVyID8gXCJhZGRFdmVudExpc3RlbmVyXCIgOiBcImF0dGFjaEV2ZW50XCI7XG4gIHZhciByZW0gPSBkb2MuYWRkRXZlbnRMaXN0ZW5lciA/IFwicmVtb3ZlRXZlbnRMaXN0ZW5lclwiIDogXCJkZXRhY2hFdmVudFwiO1xuICB2YXIgcHJlID0gZG9jLmFkZEV2ZW50TGlzdGVuZXIgPyBcIlwiIDogXCJvblwiO1xuICB2YXIgaW5pdCA9IGZ1bmN0aW9uIGluaXQoZSkge1xuICAgIGlmIChlLnR5cGUgPT09IFwicmVhZHlzdGF0ZWNoYW5nZVwiICYmIGRvYy5yZWFkeVN0YXRlICE9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgKGUudHlwZSA9PT0gXCJsb2FkXCIgPyB3aW4gOiBkb2MpW3JlbV0ocHJlICsgZS50eXBlLCBpbml0LCBmYWxzZSk7XG4gICAgaWYgKCFkb25lICYmIChkb25lID0gdHJ1ZSkpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHdpbiwgZS50eXBlIHx8IGUpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgcG9sbCA9IGZ1bmN0aW9uIHBvbGwoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJvb3QuZG9TY3JvbGwoXCJsZWZ0XCIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHNldFRpbWVvdXQocG9sbCwgNTApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gaW5pdChcInBvbGxcIik7XG4gIH07XG5cbiAgaWYgKGRvYy5yZWFkeVN0YXRlICE9PSBcImNvbXBsZXRlXCIpIHtcbiAgICBpZiAoZG9jLmNyZWF0ZUV2ZW50T2JqZWN0ICYmIHJvb3QuZG9TY3JvbGwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRvcCA9ICF3aW4uZnJhbWVFbGVtZW50O1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgICBpZiAodG9wKSB7XG4gICAgICAgIHBvbGwoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZG9jW2FkZF0ocHJlICsgXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQsIGZhbHNlKTtcbiAgICBkb2NbYWRkXShwcmUgKyBcInJlYWR5c3RhdGVjaGFuZ2VcIiwgaW5pdCwgZmFsc2UpO1xuICAgIHJldHVybiB3aW5bYWRkXShwcmUgKyBcImxvYWRcIiwgaW5pdCwgZmFsc2UpO1xuICB9XG59O1xuXG4vLyBBcyBhIHNpbmdsZSBmdW5jdGlvbiB0byBiZSBhYmxlIHRvIHdyaXRlIHRlc3RzLlxuRHJvcHpvbmUuX2F1dG9EaXNjb3ZlckZ1bmN0aW9uID0gZnVuY3Rpb24gKCkge1xuICBpZiAoRHJvcHpvbmUuYXV0b0Rpc2NvdmVyKSB7XG4gICAgcmV0dXJuIERyb3B6b25lLmRpc2NvdmVyKCk7XG4gIH1cbn07XG5jb250ZW50TG9hZGVkKHdpbmRvdywgRHJvcHpvbmUuX2F1dG9EaXNjb3ZlckZ1bmN0aW9uKTtcblxuZnVuY3Rpb24gX19ndWFyZF9fKHZhbHVlLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IG51bGwgPyB0cmFuc2Zvcm0odmFsdWUpIDogdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gX19ndWFyZE1ldGhvZF9fKG9iaiwgbWV0aG9kTmFtZSwgdHJhbnNmb3JtKSB7XG4gIGlmICh0eXBlb2Ygb2JqICE9PSAndW5kZWZpbmVkJyAmJiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9ialttZXRob2ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0cmFuc2Zvcm0ob2JqLCBtZXRob2ROYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kcm9wem9uZS9kaXN0L2Ryb3B6b25lLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gd2luZG93WyckJ107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ3aW5kb3dbJyQnXVwiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9