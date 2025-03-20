document.addEventListener('DOMContentLoaded', () => {
    // Video background control
    const video = document.querySelector('.bg-video');
    const videoSources = [
        'media/watch-video.mp4',
        'media/watch-video-backup.mp4'
    ];

    // Fallback video loading
    function loadVideo(sourceIndex = 0) {
        if (sourceIndex >= videoSources.length) return;
        
        video.src = videoSources[sourceIndex];
        video.load();
        
        video.onerror = () => {
            loadVideo(sourceIndex + 1);
        };
    }
    
    // Start video loading
    loadVideo();

    // Scroll hint animation
    const scrollHint = document.createElement('div');
    scrollHint.className = 'scroll-hint';
    scrollHint.innerHTML = '<i class="ri-arrow-down-line"></i>';
    document.body.appendChild(scrollHint);

    // Animate scroll hint
    setInterval(() => {
        scrollHint.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            scrollHint.style.transform = 'translateY(0)';
        }, 1000);
    }, 2000);

    // Smooth transition to main site
    document.querySelector('.cta-btn').addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add transition effect
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        // Navigate after transition
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    });
});