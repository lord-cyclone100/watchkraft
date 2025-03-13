// const car = document.querySelectorAll('.watch-pic');
// const box = document.querySelectorAll('.watch-box');
// const prev = document.querySelector('.prev');
// const next = document.querySelector('.next');

// counter = 0

// prev.addEventListener('click', ()=>{
//     counter = (counter - 1 + car.length) % car.length;
//     movePic()
//     moveBox()
// })

// next.addEventListener('click', ()=>{
//     counter = (counter + 1) % car.length;
//     movePic()
//     moveBox()
// })

// const movePic = ()=>{
//     car.forEach((item)=>{
//         item.style.transform = `translateX(-${counter * 110}%)`
//     })
// }

// const moveBox = ()=>{
//     box.forEach((item)=>{
//         item.style.transform = `translateY(-${counter * 100}vh)`
//     })
// }




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




//   Javascript code for handling Filters
// 1. Handling functions

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded"); // Debugging

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("keypress", handleSearch);
    } else {
        console.error("Search input not found!");
    }
});

function handleSearch(event) {
    console.log("Key pressed:", event.key); // Debugging
    if (event.key === "Enter") {
        const searchQuery = document.getElementById("searchInput").value;
        console.log("Search Query:", searchQuery); // Debugging
        window.location.href = `product.html?search=${searchQuery}`;
    }
}


  function applyFilters() {
      const category = document.getElementById("categoryFilter").value;
      const brand = document.getElementById("brandFilter").value;
      window.location.href = `product.html?gender=${category}&brand=${brand}`;
  }



  // 2. Handling products

  document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const gender = params.get("gender");
    const brand = params.get("brand");
    const searchQuery = params.get("search") ? params.get("search").toLowerCase() : null;

    document.querySelectorAll(".product").forEach(product => {
        let matchesGender = !gender || gender === "all" || product.getAttribute("data-gender") === gender;
        let matchesBrand = !brand || brand === "all" || product.getAttribute("data-brand") === brand;
        let matchesSearch = !searchQuery || product.querySelector("h2").innerText.toLowerCase().includes(searchQuery);

        if (matchesGender && matchesBrand && matchesSearch) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});



