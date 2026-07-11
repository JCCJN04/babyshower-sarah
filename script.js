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
});
