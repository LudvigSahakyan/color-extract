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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\r\n * Prevent window pollution \r\n */\n\n(function () {\n  //Strings\n  var namespace = \"color_extract\";\n  var srcImg = \"assets/images\";\n  var browser = \"mobile\";\n  var langItems = [\"fr\", \"en\", \"de\"];\n  var dateUpload = \"?\"; //Numbers\n\n  var maxFileGallery = 20;\n  var maxFileSize = 10; //Boolean\n\n  var nightMode = false; //Arrays\n\n  var userInfos = [];\n  var images = JSON.parse(window.localStorage.getItem(namespace)) || [];\n  var menuItems = [];\n  var acceptableExtensions = [\"jpg\", \"png\", \"gif\", \"tiff\"]; //Nodes\n\n  var lang = window.document.querySelector(\"#lang\");\n  var welcome = window.document.querySelector(\"#welcome\");\n  var gallery = window.document.querySelector(\"#gallery\");\n  var colors = window.document.querySelector(\"#colors\");\n  var menu = window.document.querySelector(\"#menu\");\n  var upload = window.document.querySelector(\"#upload\");\n  var inputFile = window.document.querySelector(\"#file\");\n  var submitForm = window.document.querySelector(\"#submitForm\");\n  var deleteButton = window.document.querySelector(\"#delete\");\n  var galleryTitle = window.document.querySelector(\"#galleryTitle\");\n  var footer = window.document.querySelector(\"#bottom\");\n  var preview = window.document.querySelector(\"#preview\");\n  /**\r\n      * \r\n      * @param {String} tagName \r\n      * @param {String} text \r\n      * @param {HTMLElement} target \r\n      * @returns {HTMLElement}\r\n      */\n\n  function textInElement(tagName, text, target) {\n    if (\"string\" !== typeof tagName) {\n      throw new Error(\"tagName required\");\n    }\n\n    var tagNameContent = window.document.createElement(tagName);\n\n    if (\"undefined\" != typeof text && text !== null) {\n      tagNameContent.appendChild(window.document.createTextNode(text));\n    }\n\n    if (target instanceof HTMLElement) {\n      target.appendChild(tagNameContent);\n    }\n\n    return tagNameContent;\n  }\n  /**\r\n   * Add Image Items\r\n   * \r\n   * @param {String} imageName \r\n   * @param {String} imageSrc \r\n   * @param {Number} imageSize \r\n   * @param {String} imageExtension \r\n   * @param {String} imageAlt \r\n   * @param {Object} colorPalette\r\n   */\n\n\n  function pushImage(imageNameAndAlt, imageSrc, imageSize, imageExtension, colorPalette) {\n    images.push({\n      name: imageNameAndAlt,\n      src: imageSrc,\n      size: imageSize,\n      extension: imageExtension,\n      colors: colorPalette\n    });\n  }\n  /**\r\n   * Extension Check\r\n   * \r\n   * @param {Object} image \r\n   * @returns {Boolean}\r\n   */\n\n\n  function isExtensionValid(image) {\n    for (var _i = 0; _i < acceptableExtensions.length; _i++) {\n      var value = acceptableExtensions[_i];\n\n      if (image.extension === value) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n  /**\r\n   * is Gallery is Full\r\n   * \r\n   *@returns {Boolean} \r\n   */\n\n\n  function isGalleryFull() {\n    return images.length > maxFileGallery;\n  }\n  /**\r\n   * Add Menu Items\r\n   * \r\n   * @param {String} nameItem \r\n   * @param {String} nameUrl \r\n   */\n\n\n  function pushMenuItem(nameItem, nameUrl) {\n    menuItems.push({\n      name: nameItem,\n      url: nameUrl\n    });\n  }\n  /**\r\n   * Display Menu Items \r\n   */\n\n\n  function displayMenuItems() {\n    for (var _i2 = 0; _i2 < menuItems.length; _i2++) {\n      var value = menuItems[_i2];\n      var itemElementList = textInElement(\"li\", null, menu);\n      var itemElementLink = textInElement(\"a\", value.name, itemElementList);\n      itemElementList.setAttribute(\"class\", \"nav-item text-center\");\n      itemElementLink.setAttribute(\"href\", value.url);\n      itemElementLink.setAttribute(\"class\", \"nav-link\");\n    }\n  }\n  /**\r\n   * Display Lang items\r\n   */\n\n\n  function displayLangItems() {\n    for (var _i3 = 0; _i3 < langItems.length; _i3++) {\n      var value = langItems[_i3];\n      var langElement = textInElement(\"a\", value, lang);\n      langElement.setAttribute(\"href\", value);\n      langElement.setAttribute(\"role\", \"button\");\n      langElement.setAttribute(\"class\", \"text-decoration-none btn btn-light btn-sm\");\n    }\n  }\n  /**\r\n   * Display Welcome Item\r\n   */\n\n\n  function displayWelcomeItems() {\n    var welcomeMessageItems = [\"Welcome\"];\n\n    for (var _i4 = 0; _i4 < welcomeMessageItems.length; _i4++) {\n      var value = welcomeMessageItems[_i4];\n      var welcomeText = textInElement(\"h4\", value, welcome);\n      welcomeText.setAttribute(\"style\", \"color: white;\");\n    }\n  }\n  /**\r\n   * Display Gallery Text\r\n   */\n\n\n  function displayGalleryItems() {\n    var galleryMessageItems = [\"Gallery\"];\n\n    for (var _i5 = 0; _i5 < galleryMessageItems.length; _i5++) {\n      var value = galleryMessageItems[_i5];\n      var galleryText = textInElement(\"h4\", value, galleryTitle);\n      galleryText.setAttribute(\"style\", \"color: white;\");\n    }\n  }\n  /**\r\n   * @param {HTMLElement} imagePreviewElement \r\n   */\n\n\n  function registerEvent(imagePreviewElement) {\n    imagePreviewElement.onclick = function (event) {\n      onClickImage(event, this);\n    };\n  }\n  /**\r\n   * \r\n   * @param {Element} colorElement \r\n   */\n\n\n  function displayColors(colorElement) {\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n      for (var _iterator = colorElement[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n        var value = _step.value;\n        var divParent = textInElement(\"div\", null, colors);\n        var colorText = textInElement(\"p\", value.html_code, divParent);\n        divParent.setAttribute(\"style\", \"background-color:\" + value.html_code + \";'\");\n        colorText.setAttribute(\"style\", \"color:white;\");\n      }\n    } catch (err) {\n      _didIteratorError = true;\n      _iteratorError = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion && _iterator.return != null) {\n          _iterator.return();\n        }\n      } finally {\n        if (_didIteratorError) {\n          throw _iteratorError;\n        }\n      }\n    }\n  }\n  /**\r\n   * Preview\r\n   * \r\n   * @param {Event} event \r\n   * @param {HTMLElement} imagePreviewElement \r\n   */\n\n\n  function onClickImage(event, imagePreviewElement) {\n    deleteButton.innerHTML = \"\";\n    colors.innerHTML = \"\";\n    var deleteButtonElement = window.document.createElement(\"button\");\n    var deleteButtonText = window.document.createTextNode(\"delete\");\n    deleteButtonElement.appendChild(deleteButtonText);\n    deleteButton.appendChild(deleteButtonElement);\n    deleteButtonElement.setAttribute(\"class\", \"btn btn-light btn-md text-secondary\");\n    preview.style.backgroundImage = \"url(\" + imagePreviewElement.getAttribute(\"src\") + \")\";\n    var findRecentImage = images.find(function (elem) {\n      return elem.src === imagePreviewElement.getAttribute(\"src\");\n    });\n    displayColors(findRecentImage.colors.background_colors);\n    displayColors(findRecentImage.colors.foreground_colors);\n    displayColors(findRecentImage.colors.image_colors);\n    deleteButtonElement.addEventListener(\"click\", function (event) {\n      onClickDelete(event, imagePreviewElement);\n    });\n  }\n  /**\r\n   * Display Image Gallery\r\n   */\n\n\n  function displayImageGallery() {\n    gallery.innerHTML = \"\";\n    var _iteratorNormalCompletion2 = true;\n    var _didIteratorError2 = false;\n    var _iteratorError2 = undefined;\n\n    try {\n      for (var _iterator2 = images[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n        var value = _step2.value;\n\n        if (null === value.extension || isExtensionValid(value)) {\n          var divElement = window.document.createElement(\"div\");\n          var imageElement = window.document.createElement(\"img\");\n          gallery.appendChild(divElement);\n          divElement.appendChild(imageElement);\n          imageElement.setAttribute(\"alt\", value.name);\n          imageElement.setAttribute(\"src\", value.src);\n          imageElement.setAttribute(\"class\", \"img-fluid\");\n          imageElement.setAttribute(\"style\", \"max-width: 100%; heigt: auto;\");\n          divElement.setAttribute(\"class\", \"col-6 col-md-6 col-lg-4 col-xl-3 text-center bg-light border-right\");\n          divElement.setAttribute(\"style\", \"padding-top: 1em; padding-bottom: 1em;\");\n          registerEvent(imageElement);\n        }\n      }\n    } catch (err) {\n      _didIteratorError2 = true;\n      _iteratorError2 = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {\n          _iterator2.return();\n        }\n      } finally {\n        if (_didIteratorError2) {\n          throw _iteratorError2;\n        }\n      }\n    }\n  }\n  /**\r\n   * Delete\r\n   * \r\n   * @param {Event} event \r\n   * @param {HTMLElement} imagePreviewElement \r\n   */\n\n\n  function onClickDelete(event, imagePreviewElement) {\n    var findRecentImage = images.find(function (elem) {\n      return elem.src === imagePreviewElement.getAttribute(\"src\");\n    });\n    var findRecentImageKey = images.indexOf(findRecentImage);\n    images.splice(findRecentImageKey, 1);\n    window.localStorage.setItem(namespace, JSON.stringify(images));\n    displayImageGallery();\n    preview.style.backgroundImage = \"\";\n    deleteButton.innerHTML = \"\";\n  }\n  /**\r\n   * Upload\r\n   */\n\n\n  function displayUploadButton() {\n    if (!isGalleryFull()) {\n      var uploadButtonElement = textInElement(\"button\", \"upload an image\", upload);\n      uploadButtonElement.setAttribute(\"class\", \"btn btn-light btn-md text-secondary\");\n      var formForSubmit = textInElement(\"form\", null, submitForm);\n      var submitUrl = textInElement(\"input\", null, formForSubmit);\n      var submitButton = textInElement(\"input\", \"submit\", formForSubmit);\n      formForSubmit.setAttribute(\"action\", \"\");\n      formForSubmit.setAttribute(\"method\", \"GET\");\n      formForSubmit.setAttribute(\"class\", \"form-row\");\n      submitUrl.setAttribute(\"type\", \"url\");\n      submitUrl.setAttribute(\"required\", \"required\");\n      submitUrl.setAttribute(\"class\", \"bg-light text-secondary\");\n      submitUrl.setAttribute(\"placeholder\", \" or submit an url source \");\n      submitButton.setAttribute(\"type\", \"submit\");\n      submitButton.setAttribute(\"value\", \"send\");\n      submitButton.setAttribute(\"class\", \"btn btn-light btn-md text-secondary\");\n      submitButton.setAttribute(\"style\", \"margin-left:0.2em;\");\n      formForSubmit.addEventListener(\"submit\", onSubmitForm);\n      inputFile.addEventListener(\"change\", onChangeFile);\n      uploadButtonElement.addEventListener(\"click\", function () {\n        inputFile.click();\n      });\n      return;\n    }\n\n    var boldElement = textInElement(\"b\", \"Gallery is full\", upload);\n    boldElement.setAttribute(\"class\", \"text-secondary\");\n  }\n  /**\r\n   * \r\n   * @param {Event} event \r\n   * @param {Form} form \r\n   */\n\n\n  function onSubmitForm(event) {\n    event.preventDefault();\n    var xhr = new XMLHttpRequest();\n    xhr.open(\"GET\", \"https://api.imagga.com/v2/colors?image_url=\" + this.elements[0].value);\n    var form = this;\n\n    xhr.onload = function (event) {\n      var colorObject = JSON.parse(this.responseText);\n\n      if (200 === this.status) {\n        pushImage(form.elements[0].value, form.elements[0].value, null, null, colorObject.result.colors);\n        window.localStorage.setItem(namespace, JSON.stringify(images));\n        displayImageGallery();\n        gallery.lastChild.firstChild.onclick();\n        return;\n      }\n\n      alert(\"Format non pris en charge\");\n    };\n\n    xhr.setRequestHeader(\"Authorization\", \"Basic YWNjXzI0NzBjZTdjOTc4OGU1ZjpiMmQ4NjMxNmM0NWQ3OTQ5M2Y2NDFkZmFiOWNkZjkzYQ==\");\n    xhr.send();\n  }\n  /**\r\n   * \r\n   * @param {Event} event \r\n   * @param {File} uploadedFile \r\n   */\n\n\n  function onChangeFile(event) {\n    var xhr = new XMLHttpRequest();\n    xhr.open(\"POST\", \"https://api.imagga.com/v2/colors\");\n    var uploadedFile = this.files[0];\n\n    xhr.onload = function (event) {\n      if (200 === this.status) {\n        var colorObject = JSON.parse(this.responseText);\n        var reader = new FileReader();\n\n        reader.onload = function (event) {\n          pushImage(null, reader.result, null, null, colorObject.result.colors);\n          displayImageGallery();\n          gallery.lastChild.firstChild.onclick();\n          window.localStorage.setItem(namespace, JSON.stringify(images));\n        };\n\n        reader.onerror = function (event) {\n          alert(\"Lecture impossible\");\n        };\n\n        reader.readAsDataURL(uploadedFile);\n        return;\n      }\n\n      alert(\"Format non pris en charge\");\n    };\n\n    xhr.setRequestHeader(\"Authorization\", \"Basic YWNjXzI0NzBjZTdjOTc4OGU1ZjpiMmQ4NjMxNmM0NWQ3OTQ5M2Y2NDFkZmFiOWNkZjkzYQ==\");\n    var body = new FormData();\n    body.append(\"image\", this.files[0]);\n    xhr.send(body);\n  }\n  /**\r\n   * Display Extensions At Footer\r\n   */\n\n\n  function displayExtAtFooter() {\n    var extensionTitle = textInElement(\"h6\", \"Accepted extensions:\", footer);\n    var extensionItems = window.document.createElement(\"ul\");\n    footer.appendChild(extensionItems);\n    extensionTitle.setAttribute(\"style\", \"color:#FFFFFF; display: inline-block;\");\n\n    for (var _i6 = 0; _i6 < acceptableExtensions.length; _i6++) {\n      var value = acceptableExtensions[_i6];\n      var extensionItem = textInElement(\"li\", value, extensionItems);\n      extensionItem.setAttribute(\"style\", \"display: inline-block; width:3em; color:#FFFFFF; font-weight: bold;\");\n    }\n  } //\n\n\n  pushMenuItem(\"Home\", \"index.html\");\n  pushMenuItem(\"Gallery\", \"galerie.html\");\n  pushMenuItem(\"Contact\", \"contact.html\"); //\n\n  displayMenuItems();\n  displayLangItems();\n  displayWelcomeItems();\n  displayGalleryItems();\n  displayImageGallery();\n  displayUploadButton();\n  displayExtAtFooter(); //\n})();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/index.scss?");

/***/ }),

/***/ 0:
/*!*********************************************!*\
  !*** multi ./src/index.js ./src/index.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/index.js */\"./src/index.js\");\nmodule.exports = __webpack_require__(/*! ./src/index.scss */\"./src/index.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js_./src/index.scss?");

/***/ })

/******/ });