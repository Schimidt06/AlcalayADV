/* =============================================
   ALCALAY ADV — PREMIUM JAVASCRIPT
   Dark + Gold | Bank Debt Law Firm
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================
     PRELOADER
  ========================= */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.remove(), 900);
      initAOS();
    }, 1000);
  });

  /* ========================
     CUSTOM CURSOR
  ========================= */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    const animate = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
      requestAnimationFrame(animate);
    };
    animate();

    document.querySelectorAll('a, button, .servico-card, .numero-item, .problema-item, .depoimento-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        follower.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        follower.classList.remove('hovered');
      });
    });
  }

  /* ========================
     SCROLL PROGRESS
  ========================= */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }, { passive: true });

  /* ========================
     HEADER — scroll effect
  ========================= */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ========================
     HAMBURGER / MOBILE MENU
  ========================= */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-link, .mobile-whatsapp').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ========================
     SMOOTH SCROLL
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80; // Fixed offset for premium header
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ========================
     AOS — Scroll Animations
  ========================= */
  function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute('data-aos-delay') || 50);
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  /* ========================
     COUNTER ANIMATION
  ========================= */
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(c => counterObserver.observe(c));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.round(easeOut(progress) * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ========================
     TESTIMONIAL — MOBILE CAROUSEL
  ========================= */
  const depoGrid = document.querySelector('.depoimentos-grid');
  const dotsContainer = document.getElementById('depo-dots');
  const prevBtn = document.getElementById('depo-prev');
  const nextBtn = document.getElementById('depo-next');
  const depoControls = document.querySelector('.depo-controls');

  if (depoGrid) {
    const cards = Array.from(depoGrid.querySelectorAll('.depoimento-card'));
    let current = 0;
    let isMobile = window.innerWidth <= 900;

    // Create dots
    const buildDots = () => {
      dotsContainer.innerHTML = '';
      if (!isMobile) return;
      cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('depo-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    };

    const goTo = (idx) => {
      if (!isMobile) return;
      current = Math.max(0, Math.min(idx, cards.length - 1));
      cards.forEach((card, i) => {
        card.style.display = i === current ? 'block' : 'none';
      });
      dotsContainer.querySelectorAll('.depo-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    };

    const activateMobile = () => {
      isMobile = true;
      depoGrid.classList.add('mobile-active');
      depoGrid.style.display = 'flex';
      depoGrid.style.flexDirection = 'column';
      if (depoControls) depoControls.style.display = 'flex';
      buildDots();
      goTo(0);
    };

    const deactivateMobile = () => {
      isMobile = false;
      depoGrid.style.display = '';
      cards.forEach(card => card.style.display = '');
      dotsContainer.innerHTML = '';
      if (depoControls) depoControls.style.display = '';
    };

    const checkMobile = () => {
      if (window.innerWidth <= 900 && !isMobile) activateMobile();
      else if (window.innerWidth > 900 && isMobile) deactivateMobile();
    };

    window.addEventListener('resize', checkMobile);
    checkMobile();

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto slide on mobile
    let autoSlide = setInterval(() => {
      if (isMobile) goTo(current >= cards.length - 1 ? 0 : current + 1);
    }, 5000);
  }

  /* ========================
     CONTACT FORM
  ========================= */
  const form = document.getElementById('contato-form');
  const formSuccess = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('form-submit');
      btn.disabled = true;
      const span = btn.querySelector('span');
      const originalText = span.textContent;
      span.textContent = 'Enviando...';

      setTimeout(() => {
        form.querySelectorAll('input, select, textarea').forEach(f => f.value = '');
        btn.disabled = false;
        span.textContent = originalText;
        if (formSuccess) {
          formSuccess.classList.add('show');
          setTimeout(() => formSuccess.classList.remove('show'), 6000);
        }
      }, 1400);
    });
  }

  /* ========================
     PHONE MASK
  ========================= */
  const telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function() {
      let v = this.value.replace(/\D/g, '').substring(0, 11);
      if (v.length > 10) {
        v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
      } else if (v.length > 6) {
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      } else if (v.length > 0) {
        v = v.replace(/^(\d*)/, '($1');
      }
      this.value = v;
    });
  }

  /* ========================
     WHATSAPP FLOAT — show after scroll
  ========================= */
  const wppFloat = document.getElementById('whatsapp-float');
  if (wppFloat) {
    wppFloat.style.opacity = '0';
    wppFloat.style.transform = 'scale(0.7) translateY(10px)';
    wppFloat.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s';

    const showWpp = () => {
      if (window.scrollY > 400) {
        wppFloat.style.opacity = '1';
        wppFloat.style.transform = 'scale(1) translateY(0)';
      } else {
        wppFloat.style.opacity = '0';
        wppFloat.style.transform = 'scale(0.7) translateY(10px)';
      }
    };
    window.addEventListener('scroll', showWpp, { passive: true });
  }

  /* ========================
     NAV — active section highlight
  ========================= */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let currentSection = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 180) {
        currentSection = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === '#' + currentSection;
      link.style.color = isActive ? 'var(--gold)' : '';
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ========================
     HERO — Subtle parallax on image
  ========================= */
  const heroRight = document.querySelector('.hero-right');
  if (heroRight) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroImg = heroRight.querySelector('.hero-img');
      if (heroImg && scrolled < window.innerHeight) {
        heroImg.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    }, { passive: true });
  }

  /* ========================
     GOLD LINE SEPARATOR ANIMATION
  ========================= */
  const lineElements = document.querySelectorAll('.sobre-line-deco, .eyebrow-line');
  if (lineElements.length) {
    const lineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          lineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    lineElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 1s ease';
      lineObserver.observe(el);
    });
  }

});
