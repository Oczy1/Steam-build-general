import * as oczyFunctions from "./modules/functions.js";


oczyFunctions.isWebp();

oczyFunctions.scrollHandler();
//oczyFunctions.canva();




import Swiper, {Navigation} from 'swiper';



// export const swiper = new Swiper('.swiper', {
//   speed: 400,
//   spaceBetween: 100,
//   direction: 'horizontal',
//   loop: true,
//     modules: [Navigation],
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//       },
// });


// export const swipper = new Swiper('.swiper-parallax', {
//   speed: 400,
//   spaceBetween: 100,
//   direction: 'vertical',
//   loop: true,
   
// });



document.querySelectorAll('.page').forEach(n => {
  const slider = new Swiper(n.querySelector('.swiper'), {
    speed: 400,
    spaceBetween: 100,
    direction: 'horizontal',
    loop: true,
    modules: [Navigation],
    navigation: {
      nextEl: n.querySelector('.swiper-button-next'),
      prevEl: n.querySelector('.swiper-button-prev'),
    },
    spaceBetween: 10,
  });

  // const thumbs = new Swiper(n.querySelector('.swiper-parallax'), {
    
  //   spaceBetween: 1,
  //   centeredSlides: true,
  //   slidesPerView: 4,
  //   touchRatio: 0.2,
  //   freeMode: true,
  //   forceToAxis: true,
  //   mousewheel: {
  //     invert: true,
  //   },
  //   slideToClickedSlide: true,
  //   direction: 'vertical',

  //});

  //thumbs.mousewheel.enable();

  slider.controller.control = thumbs;
  //thumbs.controller.control = slider;
});

