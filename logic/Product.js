document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
});

const products = [
    {
        id: 1,
        name: "Copper Alloy",
        price: 299.99,
        brand: "Casio",
        type: "Analog",
        material: "Metal",
        colors: ["gold", "silver"],
        stock: 5,
        description: "A luxurious timepiece crafted from premium copper alloy, featuring a stainless steel case and genuine leather band.",
        specs: [
            "Case Diameter: 42mm",
            "Water Resistance: 50m",
            "Movement: Japanese Quartz",
            "Band Width: 22mm"
        ],
        images: ["../assets/copper-watch.svg","../assets/copper-details-1.svg"]
    },
    {
        id: 2,
        name: "Silver Spark",
        price: 349.99,
        brand: "Titan",
        type: "Analog",
        material: "Metal",
        colors: ["black", "silver"],
        stock: 5,
        description: "A luxurious timepiece crafted from premium silver, featuring a stainless steel case and genuine leather band.",
        specs: [
            "Case Diameter: 42mm",
            "Water Resistance: 50m",
            "Movement: Japanese Quartz",
            "Band Width: 22mm"
        ],
        images: ["../assets/silver-watch.svg","../assets/silver-details-1.svg"]
    },
    {
        id: 3,
        name: "Leather Ivory",
        price: 279.99,
        brand: "Helix",
        type: "Digital",
        material: "Plastic",
        colors: ["black"],
        stock: 5,
        description: "A luxurious timepiece crafted from premium Leather, featuring a plastic case and genuine leather band.",
        specs: [
            "Case Diameter: 42mm",
            "Water Resistance: 50m",
            "Movement: Japanese Quartz",
            "Band Width: 22mm"
        ],
        images: ["/assets/leather-watch.svg","../assets/leather-details-1.svg"]
    },
    {
        id: 4,
        name: "Gold Noir",
        price: 399.99,
        brand: "Casio",
        type: "Analog",
        material: "Leather",
        colors: ["gold"],
        stock: 5,
        description: "A luxurious timepiece crafted from premium Gold, featuring a stainless steel case and genuine leather band.",
        specs: [
            "Case Diameter: 42mm",
            "Water Resistance: 50m",
            "Movement: Japanese Quartz",
            "Band Width: 22mm"
        ],
        images: ["/assets/gold-watch.svg","../assets/gold-details-1.svg"]
    }
];

function initializeFilters() {
    // Initialize event listeners
    const filterSelectors = [
        '#categoryFilter',
        '#brandFilter', 
        '#typeFilter',
        '#materialFilter'
    ];
    
    filterSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener('change', applyFilters);
        }
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => {
            option.classList.toggle('active');
            applyFilters();
        });
    });

    applyFilters(); // Initial filter
}

function applyFilters() {
    // Get filter values safely
    const getValue = id => {
        const element = document.getElementById(id);
        return element ? element.value : 'all';
    };
    
    const filters = {
        gender: getValue('categoryFilter'),
        brand: getValue('brandFilter'),
        type: getValue('typeFilter'),
        material: getValue('materialFilter'),
        colors: Array.from(document.querySelectorAll('.color-option.active'))
                     .map(btn => btn.dataset.color),
        search: (document.getElementById('searchInput')?.value || '').toLowerCase()
    };

    document.querySelectorAll('.product').forEach(product => {
        const matches = Object.entries(filters).every(([key, value]) => {
            // Skip empty filters
            if (!value || value === 'all' || (Array.isArray(value) && value.length === 0)) return true;
            
            // Handle color filter - FIXED SECTION
            if (key === 'colors') {
                const productColors = (product.dataset.color?.toLowerCase().split(' ') || []);
                // Check if ANY selected color matches ANY product color
                return value.length === 0 || value.some(selectedColor => 
                    productColors.includes(selectedColor.toLowerCase())
                );
            }
            
            // Handle search filter
            if (key === 'search') {
                const productName = product.querySelector('h2')?.textContent.toLowerCase() || '';
                return productName.includes(value);
            }

            // Handle other filters
            return product.dataset[key] === value;
        });

        product.style.display = matches ? 'block' : 'none';
        if (matches) animateProductAppearance(product);
    });
}

function animateProductAppearance(element) {
    element.style.opacity = 0;
    gsap.to(element, {
        duration: 0.5,
        opacity: 1,
        y: 0,
        ease: "power2.out"
    });
}

function toggleColorFilter(color) {
    const btn = document.querySelector(`.color-option[data-color="${color}"]`);
    btn.classList.toggle('active');
    applyFilters();
}


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".product").forEach(product => {
        let stock = parseInt(product.getAttribute("data-stock")) || 0;
        let stockStatus = product.querySelector(".stock-status");

        if (stock > 0) {
            stockStatus.innerHTML = `<span>🟢 In Stock</span>`;
        } else {
            stockStatus.innerHTML = `<span>🔴 Out of Stock</span>`;
            let cartButton = product.querySelector(".add-to-cart-btn");
            if (cartButton) cartButton.disabled = true; // Disable add to cart button
        }
    });
});

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

document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to product elements
    document.querySelectorAll('.product').forEach(product => {
        const productId = product.dataset.id;
        
        // Click handler for image
        product.querySelector('img').addEventListener('click', () => {
            window.location.href = `productDetails.html?id=${productId}`;
        });

        // Click handler for product title
        product.querySelector('h2').addEventListener('click', () => {
            window.location.href = `productDetails.html?id=${productId}`;
        });

        // Update Buy Now button
        const buyBtn = product.querySelector('.buy-now-btn');
        buyBtn.onclick = () => {
            window.location.href = `productDetails.html?id=${productId}`;
        };
    });
});