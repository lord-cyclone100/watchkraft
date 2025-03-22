document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
});

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
