document.addEventListener('DOMContentLoaded', () => {
    /* 
    ========================================
    Theme Toggle Logic
    ========================================
    */
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        body.className = currentTheme;
    }

    themeBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else if (body.classList.contains('light-mode')) {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            // Default check
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    /* 
    ========================================
    Mobile Menu Toggle
    ========================================
    */
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    let isMenuOpen = false;

    function toggleMenu() {
        if (!isMenuOpen) {
            menuBtn.classList.add('open');
            mobileMenu.classList.add('active');
            isMenuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            mobileMenu.classList.remove('active');
            isMenuOpen = false;
        }
    }

    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(isMenuOpen) toggleMenu();
        });
    });

    /* 
    ========================================
    Navbar Scroll Effect
    ========================================
    */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* 
    ========================================
    Scroll Reveal Animations
    ========================================
    */
    const revealElements = document.querySelectorAll('.section-title, .about-text, .image-wrapper, .skill-category, .project-card, .timeline-item, .contact-card');
    
    // Initial setup
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    // Run on load and scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    /* 
    ========================================
    Custom Cursor Logic
    ========================================
    */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only apply if custom cursor elements exist
    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding a slight delay to the outline for physical feel
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 250, fill: "forwards" });
        });

        const hoverPlains = document.querySelectorAll('a, button, .menu-btn');
        hoverPlains.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
            });
        });
    }
});
