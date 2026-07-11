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
        // Audio starts muted via autoplay attribute (browsers allow muted autoplay)
        // Unmute on first interaction with the page
        const unmute = () => {
            bgMusic.muted = false;
            if (bgMusic.paused) {
                bgMusic.play().catch(() => {});
            }
            setPlaying(true);
            document.removeEventListener('touchstart', unmute, true);
            document.removeEventListener('pointerdown', unmute, true);
            document.removeEventListener('keydown', unmute, true);
            document.removeEventListener('scroll', unmute, true);
        };
        // Use capture phase so it fires before any child handler
        document.addEventListener('touchstart', unmute, true);
        document.addEventListener('pointerdown', unmute, true);
        document.addEventListener('keydown', unmute, true);
        document.addEventListener('scroll', unmute, true);

        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bgMusic.paused) {
                bgMusic.muted = false;
                bgMusic.play();
                setPlaying(true);
            } else {
                bgMusic.pause();
                setPlaying(false);
            }
        });
    }
});
