// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Add active class to current nav link based on page
const currentPage = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    // Match root paths
    if ((currentPage === '/' || currentPage === '/index.html') && href === '/') {
        link.classList.add('active');
    } else if (currentPage.includes('creators') && href === '/creators') {
        link.classList.add('active');
    }
});

// Image carousel rotation for highlights
function initCarousels() {
    const carousels = document.querySelectorAll('.highlight-carousel');
    
    carousels.forEach((carousel, carouselIndex) => {
        const images = carousel.querySelectorAll('.highlight-img');
        let currentIndex = 0;
        
        // Start each carousel at a different offset for variety
        const startDelay = carouselIndex * 1000;
        
        function showNextImage() {
            // Remove active class from current image
            images[currentIndex].classList.remove('active');
            
            // Move to next image
            currentIndex = (currentIndex + 1) % images.length;
            
            // Add active class to next image
            images[currentIndex].classList.add('active');
        }
        
        // Start rotation after initial delay
        setTimeout(() => {
            // Change image every 3 seconds
            setInterval(showNextImage, 3000);
        }, startDelay);
    });
}

// Initialize carousels when page loads
if (document.querySelectorAll('.highlight-carousel').length > 0) {
    initCarousels();
}

// Add scroll animation to creator cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all creator cards
document.querySelectorAll('.creator-card').forEach(card => {
    observer.observe(card);
});

// Optional: Add parallax effect to hex background
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hexBg = document.querySelector('.hex-background');
            if (hexBg) {
                hexBg.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});