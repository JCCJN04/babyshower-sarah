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
        let musicStarted = false;

        const startMusic = () => {
            if (musicStarted) return;
            musicStarted = true;
            bgMusic.play().then(() => setPlaying(true)).catch(() => {});
        };

        // Capture phase on document catches interactions before any child (except iframes)
        document.addEventListener('touchstart', startMusic, { capture: true, once: true });
        document.addEventListener('click', startMusic, { capture: true, once: true });

        // Also listen directly on the arch-card (above the Tally iframe)
        // so any tap on the invitation content triggers music
        const archCard = document.querySelector('.arch-card');
        if (archCard) {
            archCard.addEventListener('touchstart', startMusic, { once: true });
            archCard.addEventListener('click', startMusic, { once: true });
        }

        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bgMusic.paused) {
                bgMusic.play().then(() => setPlaying(true)).catch(() => {});
            } else {
                bgMusic.pause();
                setPlaying(false);
            }
        });
    }
});
