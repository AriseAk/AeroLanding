window.onload = () => {
    const transition = document.querySelector('.page-transition');

    // Fade in the main content
    requestAnimationFrame(() => {
        transition.classList.add('visible');
    });

    // Fade out and remove birds after 6 seconds
    setTimeout(() => {
        const birds = document.querySelector('.bird-container');
        if (birds) {
            birds.classList.add('fade-out');
            setTimeout(() => birds.remove(), 1000); // Wait for fade animation
        }
    }, 6000);

    // Initialize all slideshows
    createSlideshow('first-slideshow', 3000);
    createSlideshow('second-slideshow', 5000);
    createSlideshow('third-slideshow', 7000);

    // Apply transition to all anchor (<a>) tags
    document.querySelectorAll('a').forEach(link => {
        if (link.href && !link.href.includes('#')) {
            link.addEventListener('click', e => handleNavigation(e, link.href));
        }
    });

    // Apply transition to all buttons using window.location.href
    document.querySelectorAll('button').forEach(button => {
        const onclick = button.getAttribute('onclick');
        if (onclick && onclick.includes("window.location.href")) {
            const match = onclick.match(/window\.location\.href\s*=\s*['"](.+?)['"]/);
            if (match) {
                const href = match[1];
                button.removeAttribute('onclick');
                button.addEventListener('click', e => handleNavigation(e, href));
            }
        }
    });
};

// Function to handle page exit transitions
function handleNavigation(event, href) {
    event.preventDefault();
    const transition = document.querySelector('.page-transition');
    transition.classList.remove('visible');
    transition.classList.add('exit');

    setTimeout(() => {
        window.location.href = href;
    }, 600); // Match CSS transition duration
}

// Slideshow function
function createSlideshow(containerId, interval) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const slides = container.querySelectorAll('img');
    let current = 0;

    slides.forEach((slide, index) => {
        slide.style.opacity = index === 0 ? '1' : '0';
        slide.style.transition = 'opacity 1s ease-in-out';
    });

    setInterval(() => {
        slides[current].style.opacity = '0';
        current = (current + 1) % slides.length;
        slides[current].style.opacity = '1';
    }, interval);
}
