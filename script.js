// Right click disable Comprehensive protection
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// // Optional: Disable keyboard shortcuts for dev tools
document.addEventListener('keydown', function(e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.ctrlKey && e.shiftKey && e.key === 'J') || 
        (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        return false;
    }
});
// --------------------------------------------------------------------
// Mobile menu toggle
document.querySelector(".menu-toggle").addEventListener("click", function () {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
    
    // Toggle menu icon
    const icon = this.querySelector("i");
    if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
    } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
    }
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        document.querySelector(".nav-links").classList.remove("active");
        document.querySelector(".menu-toggle i").classList.remove("fa-times");
        document.querySelector(".menu-toggle i").classList.add("fa-bars");
    });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    const navLinks = document.querySelector(".nav-links");
    const menuToggle = document.querySelector(".menu-toggle");
    
    if (navLinks.classList.contains("active") && 
        !navLinks.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        navLinks.classList.remove("active");
        menuToggle.querySelector("i").classList.remove("fa-times");
        menuToggle.querySelector("i").classList.add("fa-bars");
    }
});

// Header scroll effect
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === current) {
            link.classList.add("active");
        }
    });
});

// Form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
});

// Newsletter subscription
document.querySelector(".newsletter-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for subscribing to our newsletter!");
    this.reset();
});

// Initialize particles.js
particlesJS("particles-js", {
    particles: {
        number: { 
            value: 80, 
            density: { 
                enable: true, 
                value_area: 800 
            } 
        },
        color: { value: "#00f2fe" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#6a11cb",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
        },
    },
    retina_detect: true,
});

// Scroll functionality for team section
const scrollContainer = document.querySelector(".scrollable-team");
const scrollLeftBtn = document.querySelector(".scroll-btn.left");
const scrollRightBtn = document.querySelector(".scroll-btn.right");

// Only add scroll buttons functionality if they exist (for desktop)
if (scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener("click", () => {
        scrollContainer.scrollBy({
            left: -300,
            behavior: "smooth",
        });
    });

    scrollRightBtn.addEventListener("click", () => {
        scrollContainer.scrollBy({
            left: 300,
            behavior: "smooth",
        });
    });

    // Hide scroll buttons when at the edges
    const checkScrollButtons = () => {
        if (scrollContainer.scrollLeft <= 10) {
            scrollLeftBtn.style.opacity = "0.5";
            scrollLeftBtn.style.cursor = "default";
        } else {
            scrollLeftBtn.style.opacity = "1";
            scrollLeftBtn.style.cursor = "pointer";
        }

        if (
            scrollContainer.scrollLeft >=
            scrollContainer.scrollWidth - scrollContainer.clientWidth - 10
        ) {
            scrollRightBtn.style.opacity = "0.5";
            scrollRightBtn.style.cursor = "default";
        } else {
            scrollRightBtn.style.opacity = "1";
            scrollRightBtn.style.cursor = "pointer";
        }
    };

    scrollContainer.addEventListener("scroll", checkScrollButtons);
    window.addEventListener("resize", checkScrollButtons);
    checkScrollButtons(); // Initial check
}

// Touch swipe for team section on mobile
let startX;
let scrollLeft;

scrollContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('touchmove', (e) => {
    if (!startX) return;
    const x = e.touches[0].pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    scrollContainer.scrollLeft = scrollLeft - walk;
});

// Prevent default on touch events to improve scrolling
scrollContainer.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Lazy loading for images
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Your scroll handling code here
}, 100));

// Add loading state for better UX
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add a simple animation for elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.event-card, .project-card, .team-member, .feature').forEach(el => {
    observer.observe(el);
});