let wishList = JSON.parse(localStorage.getItem('wishList')) || [];  // Load wishList from localStorage

// Function to add/remove item from wishlist
function addToWishList(product, button) {
    const existingIndex = wishList.findIndex(item => item.name === product.name);

    if (existingIndex !== -1) {
        // Remove item if it already exists (toggle functionality)
        wishList.splice(existingIndex, 1);
        button.textContent = "❤️ Add to Wishlist"; // Change button text
    } else {
        wishList.push(product);
        button.textContent = "Remove from Wishlist"; // Change button text
    }

    localStorage.setItem('wishList', JSON.stringify(wishList));
    loadWishListItems(); // Refresh UI if on wishlist page
}

// Event listener for wishlist button clicks
document.addEventListener('click', (event) => {
    if (event.target.matches('.wishlist-btn')) {  
        event.stopPropagation(); // Prevents triggering other click events

        const productElement = event.target.closest('.product');
        const button = event.target;  

        const product = {
            name: productElement.querySelector('h2').textContent,
            price: parseFloat(productElement.querySelector('p').textContent.replace('$', '')),
            brand: productElement.querySelector('.brand').textContent,
            image: productElement.querySelector('img').src,
            stock:parseInt(productElement.getAttribute("data-stock")) || 0
        };

        addToWishList(product, button);
    }
});

// Function to update button text on page load (for previously saved wishlist items)
function updateWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        const productElement = button.closest('.product');
        const productName = productElement.querySelector('h2').textContent;

        const existingProduct = wishList.find(item => item.name === productName);
        if (existingProduct) {
            button.textContent = "Remove from Wishlist";
        } else {
            button.textContent = "❤️ Add to Wishlist";
        }
    });
}

// Call this function on page load
document.addEventListener('DOMContentLoaded', updateWishlistButtons);

function loadWishListItems() {
    const wishListContainer = document.querySelector(".wishList-page");
    if (!wishListContainer) return;

    wishListContainer.innerHTML = '';

    if (wishList.length === 0) {
        wishListContainer.innerHTML = `
            <div class="empty-wishList-container">
                <img src="./media/empty-cart.svg" alt="Empty Wish List">
                <p class="empty-cart">Your wish list feels empty 🛒</p>
                <button class="return-to-shop" onclick="window.location.href='Product.html'">Return to Shop</button>
            </div>
        `;
        return;
    }

    wishList.forEach((item) => {
        const row = document.createElement("div");
        row.classList.add("wishlist-item");
        row.innerHTML = `
            <div class="product-wishlist">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <p>${item.name}</p>
                    <small>Price: $${item.price.toFixed(2)}</small>
                    <p class="stock-status"></p>
                    <br>
                    <button class="cart-btn" data-name="${item.name}">Add to Cart</button>
                    <button class="remove-wishlist-btn" data-name="${item.name}">Remove</button>
                </div>
            </div>
        `;
        let stockStatus = row.querySelector(".stock-status");

        if (item.stock > 0) {
            stockStatus.innerHTML = `<span>🟢 In Stock</span>`;
        } else {
            stockStatus.innerHTML = `<span>🔴 Out of Stock</span>`;
            let cartButton = row.querySelector(".cart-btn");
            if (cartButton) cartButton.disabled = true; // Disable add to cart button
        };
    
        wishListContainer.appendChild(row);
    });

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-wishlist-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.getAttribute('data-name');
            removeFromWishList(productName);
        });
    });

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll('.cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.getAttribute('data-name');
            const product = wishList.find(item => item.name === productName);
            console.log(product);
            if (product) {
                addToCart(product); // Call the function from shopCart.js
                removeFromWishList(productName); // Remove item from wishlist after adding to cart
            }
        });
    });
}


// Function to remove an item from the wishlist
function removeFromWishList(productName) {
    wishList = wishList.filter(item => item.name !== productName);
    localStorage.setItem('wishList', JSON.stringify(wishList));
    loadWishListItems(); // Refresh wishlist page

    // Update all buttons on the main product page
    updateWishlistButtons();
}

// Ensure wishlist loads on page load
if (document.querySelector('.wishList-page')) {
    loadWishListItems();
}
