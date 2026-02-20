/* ============================================================
   DHRUV SINGH — PORTFOLIO JAVASCRIPT
============================================================ */

'use strict';

/* ---------- NAVBAR: scroll effect + active link ---------- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function handleNavScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', handleNavScroll, { passive: true });

/* ---------- HAMBURGER MENU ---------- */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close on link click
navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  }
});

/* ---------- TYPED TEXT EFFECT ---------- */
const typedEl = document.getElementById('typed-text');
const phrases = [
  'Computer Science Student',
  'Software Dev Intern Seeker',
  'ML Enthusiast',
  'Problem Solver',
  'Full-Stack Builder',
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingPaused = false;

function typeLoop() {
  if (typingPaused) return;

  const currentPhrase = phrases[phraseIdx];

  if (isDeleting) {
    typedEl.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
  }

  let delay = isDeleting ? 50 : 80;

  if (!isDeleting && charIdx === currentPhrase.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 300;
  }

  setTimeout(typeLoop, delay);
}

// Start after a short delay
setTimeout(typeLoop, 600);

/* ---------- SCROLL REVEAL ANIMATION ---------- */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
        );
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 300);

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

/* ---------- PROGRESS BARS ANIMATION ---------- */
const progressFills = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.dataset.width;
        // Small delay so the reveal animation plays first
        setTimeout(() => {
          fill.style.width = targetWidth + '%';
        }, 200);
        progressObserver.unobserve(fill);
      }
    });
  },
  { threshold: 0.3 }
);

progressFills.forEach(fill => progressObserver.observe(fill));

/* ---------- CONTACT FORM ---------- */
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;

  // Loading state
  btn.innerHTML = 'Sending… <span class="btn-arrow">⏳</span>';
  btn.disabled = true;

  // Simulate send (replace with real backend/emailjs integration)
  setTimeout(() => {
    btn.innerHTML = 'Sent! ✓';
    btn.style.background = 'var(--success)';
    formSuccess.classList.add('show');
    form.reset();

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
      formSuccess.classList.remove('show');
    }, 4000);
  }, 1200);
});

/* ---------- SMOOTH SCROLL for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---------- CURSOR BLINK (handled by CSS, nothing extra needed) ---------- */

/* ---------- PROJECT CARDS — tilt effect on desktop ---------- */
function applyTilt(card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
}

// Only apply tilt on non-touch devices
if (!('ontouchstart' in window)) {
  document.querySelectorAll('.project-card, .achieve-card').forEach(applyTilt);
}

/* ---------- STAT COUNTER ANIMATION ---------- */
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(el) {
  const text = el.textContent.trim();
  const numMatch = text.match(/[\d.]+/);
  if (!numMatch) return;

  const endVal = parseFloat(numMatch[0]);
  const suffix = text.replace(numMatch[0], '');
  const duration = 1500;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quart
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = endVal * eased;
    el.textContent = (Number.isInteger(endVal) ? Math.floor(current) : current.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach(el => counterObserver.observe(el));

/* ---------- KEYBOARD NAV: close mobile menu on Escape ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
    closeLightbox();
  }
});

/* ---------- PDF LIGHTBOX ---------- */
const lightbox   = document.getElementById('pdf-lightbox');
const lbIframe   = document.getElementById('lb-iframe');
const lbTitle    = document.getElementById('lb-title');
const lbDownload = document.getElementById('lb-download');
const lbClose    = document.getElementById('lb-close');
const lbBackdrop = document.getElementById('lb-backdrop');

function openLightbox(pdfSrc, title) {
  lbTitle.textContent   = title;
  lbIframe.src          = pdfSrc;
  lbDownload.href       = pdfSrc;
  lbDownload.download   = title.replace(/\s+/g, '_') + '.pdf';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  // Delay clearing src so the close animation plays cleanly
  setTimeout(() => { lbIframe.src = ''; }, 350);
}

lbClose.addEventListener('click', closeLightbox);
lbBackdrop.addEventListener('click', closeLightbox);

// Wire each cert card's "View Certificate" button
document.querySelectorAll('.cert-card').forEach(card => {
  const btn    = card.querySelector('.cert-view-btn');
  const pdfSrc = card.dataset.pdf;
  const title  = card.dataset.title;

  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(pdfSrc, title);
    });
  }

  // Clicking anywhere on the preview area also opens lightbox
  const preview = card.querySelector('.cert-preview');
  if (preview) {
    preview.addEventListener('click', () => openLightbox(pdfSrc, title));
  }
});

/* ---------- INIT ---------- */
handleNavScroll();
