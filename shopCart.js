let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Load cart from localStorage

// Dynamically update the year in the footer
document.querySelector(".year").textContent = new Date().getFullYear();

// Updating cart count on page reload
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Adding items to cart
function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
}

// Handle product button clicks
document.addEventListener('click', (event) => {
    if (event.target.matches('.add-to-cart-btn')) {  // Now only Add to Cart button works
        const productElement = event.target.closest('.product');

        const product = {
            name: productElement.querySelector('h2').textContent,
            price: parseFloat(productElement.querySelector('p').textContent.replace('$', '')) || 0,
            brand: productElement.querySelector('.brand').textContent,
            image: productElement.querySelector('img').src
        };

        addToCart(product);
    }
});


// Update cart count on page load
updateCartCount();

function loadCartItems() {
    cart = JSON.parse(localStorage.getItem('cart')) || []; // Reload latest cart data
    const cartContainer = document.querySelector('.cart-page table tbody');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        document.querySelector('.cart-page').innerHTML = `
            <div class="empty-cart-container">
                <img src="./media/empty-cart.svg" alt="Empty Cart">
                <p class="empty-cart">Your cart feels empty 🛒</p>
                <button class="return-to-shop" onclick="window.location.href='Product.html'">Return to Shop</button>
            </div>
        `;
        updateTotal();
        return;
    }

    cart.forEach((item, index) => {
        const row = document.createElement('tr');

        // Ensure item.price is valid before using .toFixed()
        let price = parseFloat(item.price) || 0;
        let subtotal = price * (item.quantity || 1);

        row.innerHTML = `
            <td>
                <div class="product-cart">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <p>${item.name}</p>
                        <small>Price: $${price.toFixed(2)}</small>
                        <br>
                        <a href="#" onclick="removeFromCart(${index})">Remove</a>
                    </div>
                </div>
            </td>
            <td>
                <div class="quantity-control">
                    <button onclick="changeQuantity(${index}, -1)">−</button>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </td>
            <td>$${subtotal.toFixed(2)}</td>  <!-- No more errors! -->
        `;

        cartContainer.appendChild(row);
    });

    updateTotal();
}

// Update total price
function updateTotal() {
    const subtotal = cart.reduce((total, item) => total + ((parseFloat(item.price) || 0) * (item.quantity || 1)), 0);
    const delivery = cart.length > 0 ? 39.00 : 0;
    const total = subtotal + delivery;

    document.querySelector('.subtotal-value').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.delivery-value').textContent = `$${delivery.toFixed(2)}`;
    document.querySelector('.total-value').textContent = `$${total.toFixed(2)}`;
}

// Changing quantity
function changeQuantity(index, amount) {
    if (cart[index].quantity + amount >= 1) {
        cart[index].quantity += amount;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    }
}

function updateQuantity(index, value) {
    const newValue = parseInt(value);
    if (!isNaN(newValue) && newValue >= 1) {
        cart[index].quantity = newValue;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    } else {
        loadCartItems();
    }
}

// Removing product from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}

// Load cart items when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadCartItems();
});

// Checkout modal handling
document.querySelector('.checkout-btn').addEventListener('click', () => {
    document.getElementById('payment-modal').style.display = 'block';
});

document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('payment-modal').style.display = 'none';
});

window.onclick = function (event) {
    const modal = document.getElementById('payment-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Show payment forms
function showATMForm() {
    document.getElementById('atm-form').style.display = 'block';
    document.getElementById('online-form').style.display = 'none';
}

function showOnlineForm() {
    document.getElementById('online-form').style.display = 'block';
    document.getElementById('atm-form').style.display = 'none';
}




/* 🚀 DARK MODE FUNCTIONALITY 🚀 */
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check if dark mode is enabled in localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }

    // Toggle dark mode on switch change
    darkModeToggle.addEventListener("change", function () {
        if (darkModeToggle.checked) {
            body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    });
});
