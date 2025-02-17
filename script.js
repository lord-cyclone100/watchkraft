const car = document.querySelectorAll('.watch-pic');
const box = document.querySelectorAll('.watch-box');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

counter = 0

prev.addEventListener('click', ()=>{
    counter = (counter - 1 + car.length) % car.length;
    movePic()
    moveBox()
})

next.addEventListener('click', ()=>{
    counter = (counter + 1) % car.length;
    movePic()
    moveBox()
})

const movePic = ()=>{
    car.forEach((item)=>{
        item.style.transform = `translateX(-${counter * 110}%)`
    })
}

const moveBox = ()=>{
    box.forEach((item)=>{
        item.style.transform = `translateY(-${counter * 100}vh)`
    })
}