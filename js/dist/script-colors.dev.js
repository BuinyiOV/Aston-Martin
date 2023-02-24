"use strict";

window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
};

function imagesInit() {
  var images = document.querySelectorAll('.car__image');

  if (images.length) {
    images.forEach(function (image) {
      var imageItem = image.querySelector('img');
      var padding = imageItem.offsetHeight / imageItem.offsetWidth * 100;
      image.style.paddingBottom = "".concat(padding, "%");
      imageItem.classList.add('init');
    });
  }
}

function gridInit() {
  var items = document.querySelector('.Aston-Martin__items');
  var itemsGrid = new Isotope(items, {
    itemSelector: '.car',
    masonry: {
      fitWidth: true,
      gutter: 20
    }
  });
  document.addEventListener('click', documentActions); //-----------------------------------------------------------------------

  function documentActions(e) {
    var targetElement = e.target;

    if (targetElement.closest('.filter-Aston-Martin__item')) {
      var filterItem = targetElement.closest('.filter-Aston-Martin__item');
      var filterValue = filterItem.dataset.filter;
      var filterActiveItem = document.querySelector('.filter-Aston-Martin__item.active');
      filterValue === "*" ? itemsGrid.arrange({
        filter: ""
      }) : itemsGrid.arrange({
        filter: "[data-filter=\"".concat(filterValue, "\"]")
      });
      filterActiveItem.classList.remove('active');
      filterItem.classList.add('active');
    }
  }
}

window.addEventListener('load', windowLoad);

function windowLoad() {
  imagesInit();
  gridInit();
} //-----------------------------------------------------------


var pageSlider = new Swiper('.slider', {
  speed: 1000,
  scrollbar: {
    el: ".slider__scrollbar",
    draggable: true
  },
  breakpoints: {
    "320": {
      slidesPerView: 1,
      centeredSlides: false
    },
    "992": {
      slidesPerView: 2,
      centeredSlides: true
    }
  }
});
var page = document.querySelector('.page-swiper');
var imagesSlider = document.querySelectorAll('.slide__picture');

if (imagesSlider.length) {
  var backgroundSlides = "";
  var textSlides = "";
  imagesSlider.forEach(function (image) {
    backgroundSlides += "\n\t\t<div class=\"background__slide swiper-slide\">\n\t\t<div class=\"background__image\">\n\t\t<img src=\"".concat(image.getAttribute('src'), "\" alt=\"").concat(image.alt, "\">\n\t\t</div>\n\t\t</div>\n\t\t");
    textSlides += "\n\t\t<div class=\"text__slide swiper-slide\">\n\t\t<span>".concat(image.dataset.title ? image.dataset.title : '', "</span>\n\t\t</div>\n\t\t\n\t\t");
  });
  var background = "\n\t<div class=\"background swiper\">\n\t<div class=\"background__wrapper swiper-wrapper\">\n".concat(backgroundSlides, "\n\t</div>\n\t</div>\n\t");
  var text = "\n\t<div class=\"text swiper\">\n\t<div class=\"text__wrapper swiper-wrapper\">\n".concat(textSlides, "\n\t</div>\n\t</div>\n\t");
  page.insertAdjacentHTML("afterbegin", background);
  page.insertAdjacentHTML("beforeend", text);
  var pageBgSlider = new Swiper('.background', {
    speed: 500
  });
  var pageTextSlider = new Swiper('.text', {
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    speed: 1000
  }); //Control

  pageSlider.controller.control = pageBgSlider;
  pageBgSlider.controller.control = pageTextSlider;
}

var speed = 800;
document.addEventListener("click", function (e) {
  var targetElement = e.target;
  var textBlock = document.querySelector('.text');
  textBlock.style.transitionDuration = "".concat(speed, "ms"); //Open image

  if (targetElement.closest('.slide')) {
    var slide = targetElement.closest('.slide');
    var slideImage = slide.querySelector('img');
    var activeImage = document.querySelector('.slide__picture.active');

    if (slide.classList.contains('swiper-slide-active')) {
      slideImage.classList.add('active');
      textBlock.classList.add('active');
      imageOpen(slideImage);
    } else {
      activeImage ? activeImage.classList.remove('active') : null;
      pageSlider.slideTo(getIndex(slide));
    }

    e.preventDefault();
  } //Close image------------------------------------------


  if (targetElement.closest('.open-image')) {
    var openImage = targetElement.closest('.open-image');

    var _activeImage = document.querySelector('.slide__picture.active');

    var imagePos = getImagePos(_activeImage);
    openImage.style.cssText = "\n\tposition: fixed;\nleft: ".concat(imagePos.left, "px;\ntop: ").concat(imagePos.top, "px;\nwidth: ").concat(imagePos.width, "px;\nheight: ").concat(imagePos.height, "px;\ntransition: all ").concat(speed, "ms;\n");
    setTimeout(function () {
      _activeImage.classList.remove('active');

      _activeImage.style.opacity = 1;
      openImage.remove();
    }, speed);
    textBlock.classList.remove('active');
  }
});

function getIndex(el) {
  return Array.from(el.parentNode.children).indexOf(el);
}

function imageOpen(image) {
  var imagePos = getImagePos(image);
  var openImage = image.cloneNode();
  var openImageBlock = document.createElement('div');
  openImageBlock.classList.add('open-image');
  openImageBlock.append(openImage);
  openImageBlock.style.cssText = "\nposition: fixed;\nleft: ".concat(imagePos.left, "px;\ntop: ").concat(imagePos.top, "px;\nwidth: ").concat(imagePos.width, "px;\nheight: ").concat(imagePos.height, "px;\ntransition: all ").concat(speed, "ms;\n");
  document.body.append(openImageBlock);
  setTimeout(function () {
    image.style.opacity = 0;
    openImageBlock.style.left = 0;
    openImageBlock.style.top = 0;
    openImageBlock.style.width = '100%';
    openImageBlock.style.height = '100%';
  }, 0);
}

function getImagePos(image) {
  return {
    left: image.getBoundingClientRect().left,
    top: image.getBoundingClientRect().top,
    width: image.offsetWidth,
    height: image.offsetHeight
  };
}