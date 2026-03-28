/* =============================================
   ALCALAY ADV — PREMIUM JAVASCRIPT
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================
     PRELOADER
  ========================= */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.remove(), 700);
      initAOS();
    }, 800);
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
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
      requestAnimationFrame(animate);
    };
    animate();

    document.querySelectorAll('a, button, .servico-card, .mercado-card').forEach(el => {
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

    document.querySelectorAll('.mobile-link').forEach(link => {
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
        const offset = header ? header.offsetHeight : 0;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ========================
     HERO CANVAS — Particle Field
  ========================= */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const PARTICLE_COUNT = 80;
    const GOLD = 'rgba(201,168,76,';
    const BLUE = 'rgba(50,130,220,';

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * w;
        this.y  = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r  = Math.random() * 1.4 + 0.4;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.65 ? GOLD : BLUE;
        this.life  = 0;
        this.maxLife = 300 + Math.random() * 400;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life > this.maxLife || this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = (1 - dist / 120) * 0.12;
            ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const heroLoop = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      requestAnimationFrame(heroLoop);
    };
    heroLoop();
  }

  /* ========================
     AOS — Scroll Animations
  ========================= */
  function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute('data-aos-delay') || 0);
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

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
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1800;
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
     TESTIMONIAL SLIDER
  ========================= */
  const track = document.getElementById('depoimento-track');
  const dotsContainer = document.getElementById('depo-dots');
  const prevBtn = document.getElementById('depo-prev');
  const nextBtn = document.getElementById('depo-next');

  if (track) {
    const cards = track.querySelectorAll('.depoimento-card');
    let current = 0;
    const total = cards.length;
    const visibleCount = window.innerWidth <= 900 ? 1 : 2;

    // Create dots
    const maxIndex = Math.max(0, total - visibleCount);
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('div');
      dot.classList.add('depo-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }

    const goTo = (idx) => {
      current = Math.max(0, Math.min(idx, maxIndex));
      const cardWidth = cards[0].offsetWidth + 28;
      track.style.transform = `translateX(-${current * cardWidth}px)`;
      dotsContainer.querySelectorAll('.depo-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    };

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto slide
    let autoSlide = setInterval(() => goTo(current >= maxIndex ? 0 : current + 1), 5000);
    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => goTo(current >= maxIndex ? 0 : current + 1), 5000);
    });
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
      btn.querySelector('span').textContent = 'Enviando...';

      // Simulate sending (replace with real API call)
      setTimeout(() => {
        form.querySelectorAll('input, select, textarea').forEach(f => f.value = '');
        btn.disabled = false;
        btn.querySelector('span').textContent = 'Enviar Mensagem';
        if (formSuccess) formSuccess.classList.add('show');
        setTimeout(() => formSuccess && formSuccess.classList.remove('show'), 6000);
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
    wppFloat.style.transform = 'scale(0.7)';
    wppFloat.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s';

    const showWpp = () => {
      if (window.scrollY > 300) {
        wppFloat.style.opacity = '1';
        wppFloat.style.transform = 'scale(1)';
      } else {
        wppFloat.style.opacity = '0';
        wppFloat.style.transform = 'scale(0.7)';
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
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 200) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

});
