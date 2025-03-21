// Slider functionality
const car = document.querySelectorAll('.watch-pic');
const box = document.querySelectorAll('.watch-box');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let counter = 0;
let totalImages = car.length;

if (prev && next) {
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
}

function move() {
    car.forEach((item) => {
        item.style.transform = `translateX(-${counter * 110}%)`;
    });

    box.forEach((item) => {
        item.style.transform = `translateY(-${counter * 100}vh)`;
    });
}

function disableTransition(disableIndex) {
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
}

function enableTransition() {
    car.forEach((item) => item.style.transition = "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)");
    box.forEach((item) => item.style.transition = "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)");
}

if (car.length > 0) {
    enableTransition();
}

// jQuery input focus effects
$(document).ready(function() {
    $("input, select").on("focus", function() {
        $(this).parent().find(".input-group-text").css("border-color", "#80bdff");
    });
    
    $("input, select").on("blur", function() {
        $(this).parent().find(".input-group-text").css("border-color", "#ced4da");
    });
});

// Filter functionality
const dropdownButton = document.getElementById('dropdownButton');
const dropdownFilters = document.getElementById('dropdownFilters');

dropdownButton.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownFilters.classList.toggle('show');
    const icon = dropdownButton.querySelector('i');
    icon.style.transform = dropdownFilters.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
});

document.addEventListener('click', (e) => {
    if (!dropdownButton.contains(e.target) && !dropdownFilters.contains(e.target)) {
        dropdownFilters.classList.remove('show');
        const icon = dropdownButton.querySelector('i');
        icon.style.transform = 'rotate(0deg)';
    }
});

function handleSearch(event) {
    if (event.key === "Enter") {
        const searchQuery = document.getElementById("searchInput").value;
        console.log("Search Query:", searchQuery);
        window.location.href = `product.html?search=${searchQuery}`;
    }
}

function applyFilters() {
    const category = document.getElementById("categoryFilter").value;
    const brand = document.getElementById("brandFilter").value;
    window.location.href = `product.html?gender=${category}&brand=${brand}`;
}

// Cart functionality
let cart = [];

function addToCart(productName) {
    cart.push(productName);
    updateCartCount();
    showNotification(`${productName} added to cart!`);
}

function updateCartCount() {
    const cartIcon = document.querySelector('.ri-shopping-cart-2-line');
    if (cartIcon) {
        cartIcon.setAttribute('data-count', cart.length);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Initialize cart count on load
document.addEventListener('DOMContentLoaded', updateCartCount);

// Product filtering
document.addEventListener("DOMContentLoaded", function() {
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

// JavaScript to add 'visible' class when in viewport
document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.querySelector(".about-section");

    function revealOnScroll() {
        const sectionPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (sectionPosition < screenPosition) {
            aboutSection.classList.add("visible");
        }
    }

    // Ensure section appears if already in view on load
    revealOnScroll();

    window.addEventListener("scroll", revealOnScroll);
});
