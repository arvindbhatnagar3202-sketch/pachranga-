/* ============================================
   PACHRANGA CAFE — ANTI-GRAVITY SCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ————— PARTICLES —————
  const particlesContainer = document.getElementById('particles');
  const PARTICLE_COUNT = 30;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = (Math.random() * 8).toFixed(2) + 's';
    p.style.animationDuration = (6 + Math.random() * 6).toFixed(2) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
    particlesContainer.appendChild(p);
  }

  // ————— NAVBAR SCROLL —————
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // ————— HAMBURGER —————
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ————— DROP-BOUNCE ON LOAD —————
  const agElements = document.querySelectorAll('.ag-element');

  agElements.forEach((el, i) => {
    el.style.animationDelay = (0.1 + i * 0.08) + 's';
    el.classList.add('drop-in');
  });

  // ————— SCROLL REVEAL —————
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ————— MENU TABS —————
  const tabs = document.querySelectorAll('.menu-tab');
  const menuCards = document.querySelectorAll('.menu-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.category;

      menuCards.forEach(card => {
        const match = cat === 'all' || card.dataset.category === cat;
        card.style.display = match ? '' : 'none';
        if (match) {
          card.style.animation = 'none';
          card.offsetHeight; // trigger reflow
          card.style.animation = 'dropBounce 0.5s ease both';
        }
      });
    });
  });

  // ————— BUTTON EXPLOSION PARTICLES —————
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      createExplosion(e.clientX, e.clientY, 12);
    });
  });

  function createExplosion(x, y, count) {
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('explosion-particle');
      const angle = (Math.PI * 2 * i) / count;
      const dist = 60 + Math.random() * 80;
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      p.style.setProperty('--ex', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--ey', Math.sin(angle) * dist + 'px');
      p.style.width = p.style.height = (3 + Math.random() * 5) + 'px';
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }
  }

  // ————— ANTI-GRAVITY MODE —————
  const agTrigger = document.getElementById('agTrigger');
  let antigravityActive = false;
  const originalTransforms = new Map();

  agTrigger.addEventListener('click', (e) => {
    createExplosion(e.clientX, e.clientY, 20);
    antigravityActive = !antigravityActive;

    const allScatter = document.querySelectorAll('.ag-element, .menu-card, .gallery-item, .stat-item');

    if (antigravityActive) {
      // SCATTER
      allScatter.forEach(el => {
        const rect = el.getBoundingClientRect();
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;

        // Save original transform
        originalTransforms.set(el, el.style.transform);

        const dx = (rect.left + rect.width / 2 - cx);
        const dy = (rect.top + rect.height / 2 - cy);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const factor = 1.5 + Math.random() * 2;
        const moveX = (dx / dist) * dist * factor * (0.3 + Math.random() * 0.5);
        const moveY = (dy / dist) * dist * factor * (0.3 + Math.random() * 0.5);
        const rot = -180 + Math.random() * 360;

        el.style.transition = 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease';
        el.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${rot}deg) scale(${0.6 + Math.random() * 0.4})`;
        el.style.opacity = (0.4 + Math.random() * 0.4).toFixed(2);
      });

      agTrigger.style.background = '#ff3939';
      agTrigger.style.boxShadow = '0 0 25px rgba(255, 57, 57, 0.5)';
    } else {
      // RESTORE
      allScatter.forEach(el => {
        el.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease';
        el.style.transform = originalTransforms.get(el) || '';
        el.style.opacity = '';
      });

      agTrigger.style.background = '';
      agTrigger.style.boxShadow = '';
    }
  });

  // ————— CONTACT FORM —————
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.textContent = 'SENT ✓';
    btn.style.background = '#22c55e';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 2500);
  });

  // ————— SMOOTH SCROLL (fallback for older browsers) —————
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ————— CURSOR GLOW TRAIL (subtle) —————
  let lastTrail = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrail < 50) return; // throttle
    lastTrail = now;

    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(57, 255, 20, 0.3);
      pointer-events: none;
      z-index: 9998;
      transition: opacity 0.6s ease, transform 0.6s ease;
    `;
    document.body.appendChild(trail);

    requestAnimationFrame(() => {
      trail.style.opacity = '0';
      trail.style.transform = 'scale(3)';
    });

    setTimeout(() => trail.remove(), 700);
  });
});
