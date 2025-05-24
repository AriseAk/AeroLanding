
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function initApp() {
    const transition = document.querySelector('.page-transition');
    
    requestAnimationFrame(() => {
        transition.classList.add('visible');
    });

    setTimeout(async () => {
        const birds = document.querySelector('.bird-container');
        if (birds) {
            birds.classList.add('fade-out');
            await delay(1000);
            birds.remove();
        }
    }, 6000);

    initializeSlideshows();
    
    setupNavigation();
}

function initializeSlideshows() {
    createSlideshow('.first-slideshow', 5000);
    createSlideshow('.second-slideshow', 7000);
    createSlideshow('.third-slideshow', 9000);
}

async function handleNavigation(event, href) {
    event.preventDefault();
    const transition = document.querySelector('.page-transition');
    
    transition.classList.remove('visible');
    transition.classList.add('exit');
    
    await delay(600);
    window.location.href = href;
}

function createSlideshow(selector, interval) {
    const container = document.querySelector(selector);
    if (!container) return;

    const slides = container.querySelectorAll('img');
    let current = 0;

    slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === 0);
    });

    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, interval);
}

async function setupSidebar() {
    const hamburger = document.querySelector('.left img[src="/static/assets/hamburger.svg"]');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const navbar = document.querySelector('.navbar');
    const closeBtn = document.querySelector('.sidebar-close');

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            navbar.classList.remove('active');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            navbar.classList.remove('active');
        });
    }

    if (sidebar) {
        sidebar.addEventListener('click', (e) => e.stopPropagation());
    }
}


function setupNavigation() {
    document.querySelectorAll('a').forEach(link => {
        if (link.href && !link.href.includes('#')) {
            link.addEventListener('click', async (e) => {
                await handleNavigation(e, link.href);
            });
        }
    });

    document.querySelectorAll('button').forEach(button => {
        const onclick = button.getAttribute('onclick');
        if (onclick?.includes("window.location.href")) {
            const match = onclick.match(/window\.location\.href\s*=\s*['"](.+?)['"]/);
            if (match) {
                const href = match[1];
                button.removeAttribute('onclick');
                button.addEventListener('click', async (e) => {
                    await handleNavigation(e, href);
                });
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await initApp();
    await setupSidebar();
});
