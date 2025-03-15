// cursor.js
document.addEventListener('DOMContentLoaded', () => {
    // Create cursor element dynamically if not present
    if (!document.querySelector('.custom-cursor')) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = `
            <div class="cursor-inner"></div>
            <div class="cursor-second-hand"></div>
        `;
        document.body.appendChild(cursor);
    }

    const cursor = document.querySelector('.custom-cursor');

    // Show cursor initially if mouse is already on page
    let isMouseOnPage = false;

    // Update cursor position and ensure it stays visible
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px'; // Use clientX for viewport positioning
        cursor.style.top = e.clientY + 'px';   // Use clientY for viewport positioning
        cursor.style.display = 'block';        // Always show when mouse moves
        isMouseOnPage = true;
    });

    // Hide cursor only when mouse leaves the entire document
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
        isMouseOnPage = false;
    });

    // Show cursor when mouse re-enters
    document.addEventListener('mouseenter', () => {
        if (!isMouseOnPage) {
            cursor.style.display = 'block';
            isMouseOnPage = true;
        }
    });

    // Ensure cursor stays visible during interactions
    document.addEventListener('mousedown', (e) => {
        cursor.style.display = 'block'; // Keep visible on click
    });

    document.addEventListener('mouseup', (e) => {
        cursor.style.display = 'block'; // Keep visible after click
    });
});