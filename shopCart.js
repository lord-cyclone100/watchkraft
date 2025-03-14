let cart = JSON.parse(localStorage.getItem('cart')) || [];  //Loading cart - localstorage

//Updating the cart while page-reload
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

document.addEventListener('click', (event) => {
    if (event.target.matches('.product button')) {
        const productElement = event.target.closest('.product');

        const product = {
            name: productElement.querySelector('h2').textContent,
            price: parseFloat(productElement.querySelector('p').textContent.replace('$', '')),
            brand: productElement.querySelector('.brand').textContent,
            image: productElement.querySelector('img').src
        };

        addToCart(product);
    }
});


//cart count on page-reload
updateCartCount();


function loadCartItems() {
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
        row.innerHTML = `
            <td>
                <div class="product-cart">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <p>${item.name}</p>
                        <small>Price: $${item.price.toFixed(2)}</small>
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
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartContainer.appendChild(row);
    });

    updateTotal();
}

//updating total price
function updateTotal() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const delivery = cart.length > 0 ? 39.00 : 0;
    const total = subtotal + delivery;

    document.querySelector('.subtotal-value').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.delivery-value').textContent = `$${delivery.toFixed(2)}`;
    document.querySelector('.total-value').textContent = `$${total.toFixed(2)}`;
}

//Changing quantity
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

//removing product item
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}


if (document.querySelector('.cart-page')) {
    loadCartItems();
}
