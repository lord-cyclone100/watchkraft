document.addEventListener('DOMContentLoaded', () => {
    // Video background fallback logic
    const video = document.querySelector('.bg-video');
    const videoSources = [
      '/assets/watch-video.mp4',
      '/assets/watch-video-backup.mp4'
    ];
  
    function loadVideo(sourceIndex = 0) {
      if (sourceIndex >= videoSources.length) return;
  
      video.src = videoSources[sourceIndex];
      video.load();
  
      video.onerror = () => {
        loadVideo(sourceIndex + 1);
      };
    }
  
    loadVideo();
  
    // Scroll hint element
    const scrollHint = document.createElement('div');
    scrollHint.className = 'scroll-hint';
    scrollHint.innerHTML = '<i class="ri-arrow-down-line"></i>';
    document.body.appendChild(scrollHint);
  
    // Optional: Smooth scroll on scroll hint click (if scrolling enabled)
    scrollHint.addEventListener('click', () => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    });
  
    // Transition on "Explore Collections" button
    const ctaButton = document.querySelector('.cta-btn');
    if (ctaButton) {
      ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';
  
        setTimeout(() => {
          window.location.href = '/index.html';
        }, 500);
      });
    }
  });
  