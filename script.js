document.addEventListener('DOMContentLoaded', () => {
    // Add intersection observer for fade-in elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // To ensure elements above the fold are visible immediately
    setTimeout(() => {
        const headerSection = document.querySelector('.header-section');
        if (headerSection && !headerSection.classList.contains('visible')) {
            headerSection.classList.add('visible');
        }
    }, 100);

    // Music Player Logic
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');

    function setPlaying(playing) {
        iconPlay.style.display = playing ? 'none' : 'block';
        iconPause.style.display = playing ? 'block' : 'none';
    }

    if (bgMusic && musicBtn) {
        // Autoplay on first user gesture (browsers require interaction)
        const startMusic = () => {
            bgMusic.play().then(() => {
                setPlaying(true);
            }).catch(() => {});
            document.removeEventListener('click', startMusic);
            document.removeEventListener('touchstart', startMusic);
        };
        document.addEventListener('click', startMusic);
        document.addEventListener('touchstart', startMusic);

        // Try immediate autoplay (works in some browsers/contexts)
        bgMusic.play().then(() => setPlaying(true)).catch(() => {});

        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bgMusic.paused) {
                bgMusic.play();
                setPlaying(true);
            } else {
                bgMusic.pause();
                setPlaying(false);
            }
        });
    }
});
