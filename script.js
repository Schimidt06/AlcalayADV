/**
 * Alcalay Advocacia - Interatividade & Animações Premium
 * Foco corporativo, suave e responsivo
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Preloader Removal
       ========================================================================== */
    // Simulating loading time for premium feel, then removing preloader
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1200);

    /* ==========================================================================
       Header Dinâmico (Scroll Indicator)
       ========================================================================== */
    const header = document.getElementById('header');
    
    const darkSections = document.querySelectorAll('.dark-section');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');

            let overDark = false;
            darkSections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 50 && rect.bottom >= 50) overDark = true;
            });
            if (overDark) header.classList.add('dark-mode');
            else header.classList.remove('dark-mode');
        } else {
            header.classList.remove('scrolled', 'dark-mode');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger to set initial state
    handleScroll();

    /* ==========================================================================
       Hero — fundo rotativo (segmentos: agro, cidade, indústria)
       ========================================================================== */
    const heroSlides = document.querySelectorAll('.hero-bg-slide');
    const heroSegmentText = document.querySelector('.hero-segment-text');
    let heroSlideIndex = 0;
    const heroSlideIntervalMs = 3000; // Troca a cada 3 segundos conforme solicitado

    if (heroSlides.length > 1 && heroSegmentText) {
        const rotateHero = () => {
            heroSlides[heroSlideIndex].classList.remove('is-active');
            heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
            heroSlides[heroSlideIndex].classList.add('is-active');
            const label = heroSlides[heroSlideIndex].getAttribute('data-segment');
            if (label) heroSegmentText.textContent = label;
        };
        const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (motionOk) {
            setInterval(rotateHero, heroSlideIntervalMs);
        }
    }

    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const mobileBtn = document.querySelector('.menu-mobile-btn');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.nav-link-mobile');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('open');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('open');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* ==========================================================================
       Scroll Reveal Animations (Intersection Observer)
       ========================================================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger aninmation slightly before element comes fully into view
        threshold: 0.1
    };

    const revealElements = document.querySelectorAll('.slide-up-element');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed to only animate once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       Smooth Scroll para âncoras internas
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Se for apenas href="#", ignore (ex. logo)
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Compensa a altura do header fixo
                const headerHeight = header.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
