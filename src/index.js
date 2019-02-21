"use strict";
/**
 * Prevent window pollution 
 */
(function () {

   //Strings
   var namespace = "color_extract";
   var srcImg = "assets/images";
   var browser = "mobile";
   var langItems = ["fr", "en", "de"];
   var dateUpload = "?";
   //Numbers
   var maxFileGallery = 20;
   var maxFileSize = 10;
   //Boolean
   var nightMode = false;
   //Arrays
   var userInfos = [];
   var images = JSON.parse(window.localStorage.getItem(namespace)) || [];
   var menuItems = [];
   var acceptableExtensions = ["jpg", "png", "gif", "tiff"];
   //Nodes
   var lang = window.document.querySelector("#lang");
   var welcome = window.document.querySelector("#welcome");
   var gallery = window.document.querySelector("#gallery");
   var colors = window.document.querySelector("#colors");
   var menu = window.document.querySelector("#menu");
   var upload = window.document.querySelector("#upload");
   var inputFile = window.document.querySelector("#file");
   var submitForm = window.document.querySelector("#submitForm");
   var deleteButton = window.document.querySelector("#delete");
   var galleryTitle = window.document.querySelector("#galleryTitle");
   var footer = window.document.querySelector("#bottom");
   var preview = window.document.querySelector("#preview");

   /**
       * 
       * @param {String} tagName 
       * @param {String} text 
       * @param {HTMLElement} target 
       * @returns {HTMLElement}
       */
   function textInElement(tagName, text, target) {

      if ("string" !== typeof tagName) {
         throw new Error("tagName required");
      }
      var tagNameContent = window.document.createElement(tagName);

      if ("undefined" != typeof text && text !== null) {

         tagNameContent.appendChild(window.document.createTextNode(text));
      }
      if (target instanceof HTMLElement) {
         target.appendChild(tagNameContent);
      }
      return tagNameContent;

   }

   /**
    * Add Image Items
    * 
    * @param {String} imageName 
    * @param {String} imageSrc 
    * @param {Number} imageSize 
    * @param {String} imageExtension 
    * @param {String} imageAlt 
    * @param {Object} colorPalette
    */
   function pushImage(imageNameAndAlt, imageSrc, imageSize, imageExtension, colorPalette) {
      images.push({
         name: imageNameAndAlt,
         src: imageSrc,
         size: imageSize,
         extension: imageExtension,
         colors: colorPalette,
      });
   }

   /**
    * Extension Check
    * 
    * @param {Object} image 
    * @returns {Boolean}
    */
   function isExtensionValid(image) {
      for (let value of acceptableExtensions) {
         if (image.extension === value) {
            return true;
         }
      }
      return false;
   }

   /**
    * is Gallery is Full
    * 
    *@returns {Boolean} 
    */
   function isGalleryFull() {
      return (images.length > maxFileGallery);
   }

   /**
    * Add Menu Items
    * 
    * @param {String} nameItem 
    * @param {String} nameUrl 
    */
   function pushMenuItem(nameItem, nameUrl) {
      menuItems.push({
         name: nameItem,
         url: nameUrl,
      });
   }

   /**
    * Display Menu Items 
    */
   function displayMenuItems() {
      for (let value of menuItems) {
         var itemElementList = textInElement("li", null, menu);
         var itemElementLink = textInElement("a", value.name, itemElementList);
         itemElementList.setAttribute("class", "nav-item text-center");
         itemElementLink.setAttribute("href", value.url);
         itemElementLink.setAttribute("class", "nav-link");
      }
   }

   /**
    * Display Lang items
    */
   function displayLangItems() {
      for (let value of langItems) {
         var langElement = textInElement("a", value, lang);
         langElement.setAttribute("href", value);
         langElement.setAttribute("role", "button");
         langElement.setAttribute("class", "text-decoration-none btn btn-light btn-sm");
      }
   }

   /**
    * Display Welcome Item
    */
   function displayWelcomeItems() {
      var welcomeMessageItems = ["Welcome"];
      for (let value of welcomeMessageItems) {
         var welcomeText = textInElement("h4", value, welcome);
         welcomeText.setAttribute("style", "color: white;");

      }

   }

   /**
    * Display Gallery Text
    */
   function displayGalleryItems() {
      var galleryMessageItems = ["Gallery"];
      for (let value of galleryMessageItems) {
         var galleryText = textInElement("h4", value, galleryTitle);
         galleryText.setAttribute("style", "color: white;");
      }

   }
   /**
    * @param {HTMLElement} imagePreviewElement 
    */
   function registerEvent(imagePreviewElement) {
      imagePreviewElement.onclick = function (event) {
         onClickImage(event, this);
      };
   }

   /**
    * 
    * @param {Element} colorElement 
    */
   function displayColors(colorElement) {

      for (let value of colorElement) {

         var divParent = textInElement("div", null, colors);
         var colorText = textInElement("p", value.html_code, divParent);
         divParent.setAttribute("style", "background-color:" + value.html_code + ";'");
         colorText.setAttribute("style", "color:white;");
      }

   }

   /**
    * Preview
    * 
    * @param {Event} event 
    * @param {HTMLElement} imagePreviewElement 
    */
   function onClickImage(event, imagePreviewElement) {
      deleteButton.innerHTML = "";
      colors.innerHTML = "";
      var deleteButtonElement = window.document.createElement("button");
      var deleteButtonText = window.document.createTextNode("delete");
      deleteButtonElement.appendChild(deleteButtonText);
      deleteButton.appendChild(deleteButtonElement);
      deleteButtonElement.setAttribute("class", "btn btn-light btn-md text-secondary");
      preview.style.backgroundImage = "url(" + imagePreviewElement.getAttribute("src") + ")";

      var findRecentImage = images.find(function (elem) {
         return elem.src === imagePreviewElement.getAttribute("src");
      });

      displayColors(findRecentImage.colors.background_colors);
      displayColors(findRecentImage.colors.foreground_colors);
      displayColors(findRecentImage.colors.image_colors);


      deleteButtonElement.addEventListener("click", function (event) {
         onClickDelete(event, imagePreviewElement);
      });
   }

   /**
    * Display Image Gallery
    */
   function displayImageGallery() {
      gallery.innerHTML = "";

      for (let value of images) {
         if (null === value.extension || isExtensionValid(value)) {
            var divElement = window.document.createElement("div");
            var imageElement = window.document.createElement("img");
            gallery.appendChild(divElement);
            divElement.appendChild(imageElement);
            imageElement.setAttribute("alt", value.name);
            imageElement.setAttribute("src", value.src);
            imageElement.setAttribute("class", "img-fluid");
            imageElement.setAttribute("style", "max-width: 100%; heigt: auto;");
            divElement.setAttribute("class", "col-6 col-md-6 col-lg-4 col-xl-3 text-center bg-light border-right");
            divElement.setAttribute("style", "padding-top: 1em; padding-bottom: 1em;");
            registerEvent(imageElement);

         }

      }
   }



   /**
    * Delete
    * 
    * @param {Event} event 
    * @param {HTMLElement} imagePreviewElement 
    */
   function onClickDelete(event, imagePreviewElement) {
      var findRecentImage = images.find(function (elem) {
         return elem.src === imagePreviewElement.getAttribute("src");
      });
      var findRecentImageKey = images.indexOf(findRecentImage);
      images.splice(findRecentImageKey, 1);
      window.localStorage.setItem(namespace, JSON.stringify(images));
      displayImageGallery();
      preview.style.backgroundImage = "";
      deleteButton.innerHTML = "";
   }

   /**
    * Upload
    */
   function displayUploadButton() {
      if (!isGalleryFull()) {
         var uploadButtonElement = textInElement("button", "upload an image", upload);
         uploadButtonElement.setAttribute("class", "btn btn-light btn-md text-secondary");

         var formForSubmit = textInElement("form", null, submitForm);
         var submitUrl = textInElement("input", null, formForSubmit);
         var submitButton = textInElement("input", "submit", formForSubmit);
         formForSubmit.setAttribute("action", "");
         formForSubmit.setAttribute("method", "GET");
         formForSubmit.setAttribute("class", "form-row");
         submitUrl.setAttribute("type", "url");
         submitUrl.setAttribute("required", "required");
         submitUrl.setAttribute("class", "bg-light text-secondary");
         submitUrl.setAttribute("placeholder", " or submit an url source ");
         submitButton.setAttribute("type", "submit");
         submitButton.setAttribute("value", "send");
         submitButton.setAttribute("class", "btn btn-light btn-md text-secondary");
         submitButton.setAttribute("style", "margin-left:0.2em;");

         formForSubmit.addEventListener("submit", onSubmitForm);
         inputFile.addEventListener("change", onChangeFile);
         uploadButtonElement.addEventListener("click", function () {
            inputFile.click();
         });




         return;
      }
      var boldElement = textInElement("b", "Gallery is full", upload);
      boldElement.setAttribute("class", "text-secondary");
   }

   /**
    * 
    * @param {Event} event 
    * @param {Form} form 
    */
   function onSubmitForm(event) {
      event.preventDefault();
      var xhr = new XMLHttpRequest;
      xhr.open("GET", "https://api.imagga.com/v2/colors?image_url=" + this.elements[0].value);
      var form = this;
      xhr.onload = function (event) {
         var colorObject = JSON.parse(this.responseText);
         if (200 === this.status) {
            pushImage(
               form.elements[0].value,
               form.elements[0].value,
               null,
               null,
               colorObject.result.colors
            );
            window.localStorage.setItem(namespace, JSON.stringify(images));
            displayImageGallery();
            gallery.lastChild.firstChild.onclick();
            return;
         }
         alert("Format non pris en charge");
      };
      xhr.setRequestHeader(
         "Authorization",
         "Basic YWNjXzI0NzBjZTdjOTc4OGU1ZjpiMmQ4NjMxNmM0NWQ3OTQ5M2Y2NDFkZmFiOWNkZjkzYQ=="
      );
      xhr.send();
   }

   /**
    * 
    * @param {Event} event 
    * @param {File} uploadedFile 
    */
   function onChangeFile(event) {
      var xhr = new XMLHttpRequest;
      xhr.open("POST", "https://api.imagga.com/v2/colors");
      var uploadedFile = this.files[0];
      xhr.onload = function (event) {

         if (200 === this.status) {
            var colorObject = JSON.parse(this.responseText);
            var reader = new FileReader;
            reader.onload = function (event) {
               pushImage(
                  null,
                  reader.result,
                  null,
                  null,
                  colorObject.result.colors
               );
               displayImageGallery();
               gallery.lastChild.firstChild.onclick();
               window.localStorage.setItem(namespace, JSON.stringify(images));
            };
            reader.onerror = function (event) {
               alert("Lecture impossible");
            };
            reader.readAsDataURL(uploadedFile);

            return;
         }
         alert("Format non pris en charge");
      };

      xhr.setRequestHeader(
         "Authorization",
         "Basic YWNjXzI0NzBjZTdjOTc4OGU1ZjpiMmQ4NjMxNmM0NWQ3OTQ5M2Y2NDFkZmFiOWNkZjkzYQ=="
      );
      var body = new FormData;
      body.append("image", this.files[0]);
      xhr.send(body);
   }

   /**
    * Display Extensions At Footer
    */
   function displayExtAtFooter() {
      var extensionTitle = textInElement("h6", "Accepted extensions:", footer);
      var extensionItems = window.document.createElement("ul");
      footer.appendChild(extensionItems);
      extensionTitle.setAttribute("style", "color:#FFFFFF; display: inline-block;");
      for (let value of acceptableExtensions) {
         var extensionItem = textInElement("li", value, extensionItems);
         extensionItem.setAttribute("style", "display: inline-block; width:3em; color:#FFFFFF; font-weight: bold;");
      }
   }

   //
   pushMenuItem("Home", "index.html");
   pushMenuItem("Gallery", "galerie.html");
   pushMenuItem("Contact", "contact.html");
   //
   displayMenuItems();
   displayLangItems();
   displayWelcomeItems();
   displayGalleryItems();
   displayImageGallery();
   displayUploadButton();
   displayExtAtFooter();
   //
})(); 