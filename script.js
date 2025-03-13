const car = document.querySelectorAll('.watch-pic');
const box = document.querySelectorAll('.watch-box');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let counter = 0;
let totalImages = car.length;

prev.addEventListener('click', () => {
    if (counter === 0) {
        disableTransition(0); 
        counter = totalImages - 1;
        car[3].style.transition = 'transform 0.5s ease-out';
        box[3].style.transition = 'transform 0.5s ease-out';
        move(); 
        setTimeout(enableTransition, 50); 
    } else {
        counter--;
        move();
    }
});

next.addEventListener('click', () => {
    if (counter === totalImages - 1) {
        disableTransition(totalImages - 1);
        counter = 0; 
        car[0].style.transition = 'transform 0.5s ease-out';
        box[0].style.transition = 'transform 0.5s ease-out';
        move();
        setTimeout(enableTransition, 50);
    } else {
        counter++;
        move();
    }
});

const move = () => {
    car.forEach((item) => {
        item.style.transform = `translateX(-${counter * 110}%)`;
    });

    box.forEach((item) => {
        item.style.transform = `translateY(-${counter * 100}vh)`;
    });
};

const disableTransition = (disableIndex) => {
    car.forEach((item,index) =>  {
        if (index !== disableIndex) {
            item.style.transition = "none";
        }
    });
    box.forEach((item,index) => {
      if (index !== disableIndex) {
        item.style.transition = "none";
      }
    });
};

const enableTransition = () => {
    car.forEach((item) => item.style.transition = "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)");
    box.forEach((item) => item.style.transition = "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)");
};

enableTransition();
// For Demo Purpose [Changing input group text on focus]
$(function () {
    $("input, select").on("focus", function () {
      $(this).parent().find(".input-group-text").css("border-color", "#80bdff")
    })
    $("input, select").on("blur", function () {
      $(this).parent().find(".input-group-text").css("border-color", "#ced4da")
    })
  })
  document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".swiper", {
      slidesPerView: 3,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        1024: { slidesPerView: 3 },
        768: { slidesPerView: 2 },
        480: { slidesPerView: 1 },
      },
    });
  });
  
  