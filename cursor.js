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

    // Update cursor position and show only when mouse moves
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
        cursor.style.display = 'block'; // Show cursor on movement
    });

    // Hide cursor when leaving the window
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });

    // Show cursor when entering the window
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
    });
});