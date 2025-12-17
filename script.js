// Rocket Animation - Play once on page load
document.addEventListener('DOMContentLoaded', function() {
    const rocketContainer = document.getElementById('rocketContainer');
    const welcomePopup = document.getElementById('welcomePopup');
    
    // Check if animation has been played before (using sessionStorage)
    const animationPlayed = sessionStorage.getItem('welcomeAnimationPlayed');
    
    if (!animationPlayed && rocketContainer) {
        // Show welcome popup if it exists
        if (welcomePopup) {
            welcomePopup.classList.add('active');
            setTimeout(function() {
                welcomePopup.classList.remove('active');
            }, 3000);
        }
        
        // Create single rocket
        const rocket = document.createElement('div');
        rocket.className = 'rocket';
        rocket.innerHTML = '<i class="fas fa-rocket"></i>';
        
        rocketContainer.appendChild(rocket);
        
        // Trigger rocket animation
        setTimeout(function() {
            rocket.classList.add('active');
        }, 500);
        
        // Remove rocket after animation completes
        setTimeout(function() {
            rocket.remove();
            rocketContainer.remove();
            if (welcomePopup) welcomePopup.remove();
        }, 4000);
        
        // Mark as played
        sessionStorage.setItem('welcomeAnimationPlayed', 'true');
    } else {
        // If already played, remove elements
        if (rocketContainer) rocketContainer.remove();
        if (welcomePopup) welcomePopup.remove();
    }
});

// Enhanced JavaScript for Portfolio Website
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.querySelector('header');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const heroSubtitle = document.getElementById('rotating-profession');
    const ctaBtn = document.querySelector('.cta-btn');
    const hireBtns = document.querySelectorAll('.hire-btn');
    const aboutBtn = document.querySelector('.about-btn');
    const socialIcons = document.querySelectorAll('.social-icon');

    // Professions for typewriter effect
    const professions = [
        'Information Management Student',
        'Frontend Engineer', 
        'Jomlaa CMS Expert',
        'UI/UX Designer',
        'Web Developer',
        'Technology Enthusiast'
    ];

    // Typewriter Effect
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeWriter() {
        if (!heroSubtitle) return;
        
        const currentProfession = professions[professionIndex];
        
        if (isDeleting) {
            heroSubtitle.innerHTML = "I'm a " + currentProfession.substring(0, charIndex - 1) + '<span class="cursor">|</span>';
            charIndex--;
            typingSpeed = 75;
        } else {
            heroSubtitle.innerHTML = "I'm a " + currentProfession.substring(0, charIndex + 1) + '<span class="cursor">|</span>';
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentProfession.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Mobile Menu Toggle
    function toggleMobileMenu() {
        hamburger?.classList.toggle('active');
        navMenu?.classList.toggle('active');
        document.body.style.overflow = navMenu?.classList.contains('active') ? 'hidden' : 'auto';
    }

    // Smooth Scroll Navigation
    function smoothScroll(event) {
        const targetId = this.getAttribute('href');
        
        // Allow external links (not starting with #) to work normally
        if (!targetId || !targetId.startsWith('#')) {
            return; // Let the browser handle the navigation
        }
        
        event.preventDefault();
        if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header?.offsetHeight || 80;
                const offsetTop = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu
                if (navMenu?.classList.contains('active')) {
                    toggleMobileMenu();
                }

                // Update active state
                updateActiveNavLink(targetId);
            }
        }
    }

    // Update Active Navigation Link
    function updateActiveNavLink(activeId) {
        // Only manage "active" state for in-page hash links (e.g. "#about").
        // This prevents wiping the manually-set active state on other pages
        // where navbar links point to "index.html#..." or other pages.
        const hashNavLinks = Array.from(navLinks).filter(link => {
            const href = link.getAttribute('href') || '';
            return href.startsWith('#');
        });

        // If the page has no hash-based nav links, do nothing.
        if (!hashNavLinks.length) return;

        hashNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeId) {
                link.classList.add('active');
            }
        });
    }

    // Scroll-based Header Effects
    function handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    }

    // Scroll-based Active Navigation
    function updateActiveNavFromScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + (header?.offsetHeight || 80);

        let activeSection = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = section;
            }
        });

        if (activeSection) {
            const id = '#' + activeSection.getAttribute('id');
            updateActiveNavLink(id);
            
            // Update URL hash
            if (history.pushState) {
                history.pushState(null, null, id);
            }
        } else if (scrollPosition < 100) {
            updateActiveNavLink('#home');
        }
    }

    // Throttled scroll listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNavFromScroll, 50);
    });

    // Intersection Observer for Animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for multiple elements
                const siblings = entry.target.parentElement?.querySelectorAll('.animate-on-scroll');
                if (siblings && siblings.length > 1) {
                    siblings.forEach((sibling, index) => {
                        setTimeout(() => {
                            sibling.style.opacity = '1';
                            sibling.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Setup animations for elements
    function setupAnimations() {
        const animatedElements = document.querySelectorAll(
            '.hero-stats .stat, .about-highlights .highlight, .floating-card, .social-icon'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            el.style.transitionDelay = `${index * 0.1}s`;
            
            animationObserver.observe(el);
        });
    }

    // Button Click Handlers
    function handleButtonClick(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Add button-specific actions here
        if (button.classList.contains('cta-btn') || button.textContent.includes('Hire')) {
            // Scroll to contact section or show contact modal
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Fallback: show alert or modal
                showNotification('Contact section coming soon!', 'info');
            }
        } else if (button.textContent.includes('Download CV')) {
            // Handle CV download
            showNotification('CV download will be available soon!', 'info');
        }
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'info' ? 'info-circle' : 'check-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'info' ? 'var(--accent-primary)' : '#10b981',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Keyboard Navigation
    function handleKeyboard(event) {
        // Close mobile menu on Escape
        if (event.key === 'Escape' && navMenu?.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Navigate with arrow keys when menu is open
        if (navMenu?.classList.contains('active') && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            event.preventDefault();
            const currentActive = document.querySelector('.nav-link:focus') || document.querySelector('.nav-link.active');
            const navLinksArray = Array.from(navLinks);
            const currentIndex = navLinksArray.indexOf(currentActive);
            
            let nextIndex;
            if (event.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % navLinksArray.length;
            } else {
                nextIndex = currentIndex <= 0 ? navLinksArray.length - 1 : currentIndex - 1;
            }
            
            navLinksArray[nextIndex]?.focus();
        }
    }

    // Performance Optimized Scroll Handler
    let ticking = false;
    function optimizedScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Debounced Resize Handler
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Close mobile menu on resize to larger screen
            if (window.innerWidth >= 769 && navMenu?.classList.contains('active')) {
                toggleMobileMenu();
            }
        }, 250);
    }

    // Initialize Active Navigation from Hash
    function initializeActiveNav() {
        const hash = window.location.hash || '#home';
        updateActiveNavLink(hash);
        
        // Smooth scroll to section if hash exists
        if (hash !== '#home') {
            setTimeout(() => {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const headerHeight = header?.offsetHeight || 80;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }, 500);
        }
    }

    // Event Listeners
    hamburger?.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

    // Button event listeners
    [ctaBtn, ...hireBtns, aboutBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', handleButtonClick);
        }
    });

    // Social icons hover effects
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Global event listeners
    window.addEventListener('scroll', optimizedScrollHandler);
    window.addEventListener('resize', handleResize);
    window.addEventListener('hashchange', initializeActiveNav);
    document.addEventListener('keydown', handleKeyboard);

    // Handle clicks outside mobile menu
    document.addEventListener('click', (event) => {
        if (navMenu?.classList.contains('active') && 
            !navMenu.contains(event.target) && 
            !hamburger?.contains(event.target)) {
            toggleMobileMenu();
        }
    });

    // Initialize everything
    function init() {
        // Start typewriter effect
        if (heroSubtitle) {
            typeWriter();
        }
        
        // Setup animations
        setupAnimations();
        
        // Initialize navigation
        initializeActiveNav();
        
        // Initial scroll check
        handleScroll();
        
        // Add loaded class for CSS animations
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
        
        console.log('Portfolio website initialized successfully! 🚀');
    }

    // Contact form handling with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Check if EmailJS is configured
        const emailjsConfigured = typeof emailjs !== 'undefined' && 
                                   window.emailjsPublicKey && 
                                   window.emailjsServiceId && 
                                   window.emailjsTemplateId;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simple validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // If EmailJS is configured, use it
            if (emailjsConfigured && typeof emailjs !== 'undefined') {
                // Show loading state
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;

                // Prepare email parameters
                const emailParams = {
                    from_name: data.name,
                    from_email: data.email,
                    subject: data.subject,
                    message: data.message,
                    to_email: 'rifqiixp@gmail.com'
                };

                // Send email using EmailJS
                emailjs.send(window.emailjsServiceId, window.emailjsTemplateId, emailParams)
                    .then(function(response) {
                        console.log('Email sent successfully!', response.status, response.text);
                        showNotification('Thank you for your message! I will get back to you soon.', 'success');
                        contactForm.reset();
                    }, function(error) {
                        console.error('Email sending failed:', error);
                        // Fallback to mailto
                        sendViaMailto(data);
                    })
                    .finally(function() {
                        // Restore button state
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    });
            } else {
                // Fallback to mailto: if EmailJS is not configured
                sendViaMailto(data);
            }
        });

        // Fallback function using mailto:
        function sendViaMailto(data) {
            const subject = encodeURIComponent(data.subject);
            const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
            const mailtoLink = `mailto:rifqiixp@gmail.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Opening your email client... Please send the message.', 'success');
            
            // Reset form after a delay
            setTimeout(function() {
                contactForm.reset();
            }, 1000);
        }
    }

    // Initialize the application
    init();

    // Add CSS for ripple effect and notifications
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        button {
            position: relative;
            overflow: hidden;
        }
        
        .loaded {
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Focus styles for accessibility */
        .nav-link:focus-visible,
        .social-icon:focus-visible,
        .hire-btn:focus-visible,
        .cta-btn:focus-visible {
            outline: 2px solid var(--accent-primary);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// Background Music Control
document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const volumeControl = document.getElementById('volumeControl');
    
    if (backgroundMusic && musicToggle) {
        // Set initial volume
        backgroundMusic.volume = 0.5; // 50% volume
        
        // Try muted autoplay first (browsers allow this)
        backgroundMusic.muted = true;
        backgroundMusic.play().then(function() {
            // Unmute after a short delay
            setTimeout(function() {
                backgroundMusic.muted = false;
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'inline';
            }, 500);
        }).catch(function(error) {
            // If muted autoplay fails, try regular autoplay
            backgroundMusic.muted = false;
            backgroundMusic.play().catch(function(err) {
                console.log('Autoplay was prevented:', err);
                // Show play button if autoplay is blocked
                if (playIcon) playIcon.style.display = 'inline';
                if (pauseIcon) pauseIcon.style.display = 'none';
            });
        });
        
        // Enable autoplay on first user interaction (click anywhere)
        let userInteracted = false;
        function enableAutoplay() {
            if (!userInteracted && backgroundMusic.paused) {
                userInteracted = true;
                backgroundMusic.play().then(function() {
                    backgroundMusic.muted = false;
                    if (playIcon) playIcon.style.display = 'none';
                    if (pauseIcon) pauseIcon.style.display = 'inline';
                }).catch(function(err) {
                    console.log('Play on interaction failed:', err);
                });
            }
        }
        
        // Listen for any user interaction
        document.addEventListener('click', enableAutoplay, { once: true });
        document.addEventListener('touchstart', enableAutoplay, { once: true });
        document.addEventListener('keydown', enableAutoplay, { once: true });
        
        // Toggle play/pause
        musicToggle.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play().then(function() {
                    if (playIcon) playIcon.style.display = 'none';
                    if (pauseIcon) pauseIcon.style.display = 'inline';
                }).catch(function(error) {
                    console.log('Play failed:', error);
                });
            } else {
                backgroundMusic.pause();
                if (playIcon) playIcon.style.display = 'inline';
                if (pauseIcon) pauseIcon.style.display = 'none';
            }
        });
        
        // Volume control
        if (volumeControl) {
            volumeControl.addEventListener('input', function() {
                backgroundMusic.volume = this.value / 100;
            });
        }
        
        // Update play/pause icon based on audio state
        backgroundMusic.addEventListener('play', function() {
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'inline';
        });
        
        backgroundMusic.addEventListener('pause', function() {
            if (playIcon) playIcon.style.display = 'inline';
            if (pauseIcon) pauseIcon.style.display = 'none';
        });
    }
});

// Timeline interaction (click/hover to show content)
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const imgEl = document.getElementById('content-img');
    const titleEl = document.getElementById('content-title');
    const textEl = document.getElementById('content-text');

    const data = [
        {
            img: 'images/skbr.jpg',
            title: "Sekolah Rendah Kebangsaan Bukit Rimau (SKBR) ",
            text: '11, Persiaran Sungai Congkak 32/41, Bukit Rimau, 40460 Shah Alam, Selangor',
            link: 'https://maps.app.goo.gl/NEXcCAVJbFMGqKe79'
        },
        {
            img: 'images/smkpp161.jpg',
            title: 'Sekolah Menengah Kebangsaan Putrajaya Presint 16 SMKPP16(1)',
            text: 'Jalan P16G, Presint 16, 62150 Putrajaya, Wilayah Persekutuan Putrajaya',
            link: 'https://maps.app.goo.gl/mA1dXHS27saYanzGA'
        },
        {
            img: 'images/uitmsegamat.jpg',
            title: 'Universiti Teknologi MARA (UiTM) Segamat',
            text: 'Jalan Universiti Off, KM 12, Jalan Muar, Kemajuan Tanah Jementah Batu Sebelas, 85000 Segamat, Johor Darul Ta\'zim',
            link: 'https://maps.app.goo.gl/eeUL64UnYkDbg2Gr7'
        }
    ];

    if (!timelineItems.length || !imgEl || !titleEl || !textEl) return;

    function showContent(index) {
        const item = data[index];
        if (!item) return;
        timelineItems.forEach(el => el.classList.remove('active'));
        const active = Array.from(timelineItems).find(el => Number(el.dataset.index) === index);
        if (active) active.classList.add('active');
        imgEl.src = item.img;
        
        // Make title clickable with link
        if (item.link) {
            titleEl.innerHTML = `<a href="${item.link}" target="_blank" class="timeline-title-link">${item.title}</a>`;
        } else {
            titleEl.textContent = item.title;
        }
        
        textEl.textContent = item.text;
    }

    timelineItems.forEach(el => {
        const idx = Number(el.dataset.index);
        el.addEventListener('click', () => showContent(idx));
        el.addEventListener('mouseenter', () => showContent(idx));
        el.addEventListener('focus', () => showContent(idx));
    });

    showContent(0);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}

// Error handling
window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
});

// Service Worker Registration (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
// Live Date & Time (footer) - updates every second (only if the element exists)
document.addEventListener('DOMContentLoaded', function () {
    const el = document.getElementById('liveDateTime');
    if (!el) return;

    function updateLiveDateTime() {
        const now = new Date();
        el.textContent = now.toLocaleString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    updateLiveDateTime();
    setInterval(updateLiveDateTime, 1000);
});

// Service Worker Registration (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
