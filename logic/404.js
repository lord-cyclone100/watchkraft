// When the window loads, hide the loading overlay
window.addEventListener('load', function () {
    document.getElementById('loadingOverlay').classList.add('hidden');  // Add 'hidden' class to hide the overlay
});

// Global error handler for JavaScript runtime errors
window.addEventListener('error', function (event) {
    console.error('Error occurred: ', event.message,         // Log the error message
        ' at ', event.filename,                     // Log the file where the error occurred
        ':', event.lineno);                         // Log the line number of the error
});

// Global handler for unhandled promise rejections
window.addEventListener('unhandledrejection', function (event) {
    console.error('Unhandled promise rejection: ', event.reason);   // Log the rejection reason
});