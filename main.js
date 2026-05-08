/* =============================================
   AUTO PLUS ATYRAU — MAIN JS v2
   ============================================= */

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

/* ---------- Burger menu ---------- */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
  const [s1, s2, s3] = burger.querySelectorAll('span');
  if (isOpen) {
    s1.style.transform = 'rotate(45deg) translate(5px, 5px)';
    s2.style.opacity   = '0';
    s3.style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    s1.style.transform = s2.style.opacity = s3.style.transform = '';
    s2.style.opacity = '';
  }
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const [s1, s2, s3] = burger.querySelectorAll('span');
    s1.style.transform = s2.style.opacity = s3.style.transform = '';
    s2.style.opacity = '';
  });
});

/* Close nav on outside click */
document.addEventListener('click', (e) => {
  if (navLinks?.classList.contains('open') && !navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    const [s1, s2, s3] = burger.querySelectorAll('span');
    s1.style.transform = s2.style.opacity = s3.style.transform = '';
    s2.style.opacity = '';
  }
});

/* ---------- Scroll Animations (AOS-like) ---------- */
const animEls = document.querySelectorAll('[data-aos]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.aosDelay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

animEls.forEach((el, i) => {
  el.style.transitionDelay = `${i * 60}ms`;
  observer.observe(el);
});

/* ---------- FAQ Accordion ---------- */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ---------- Counter animation ---------- */
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = '1';

  const raw     = el.textContent.trim();
  const num     = parseFloat(raw);
  if (isNaN(num)) return;

  const suffix  = raw.replace(/[\d.]/g, '');
  const isInt   = Number.isInteger(num);
  const dur     = 1400;
  const step    = num / (dur / 16);
  let current   = 0;

  const tick = () => {
    current = Math.min(current + step, num);
    el.textContent = (isInt ? Math.floor(current) : current.toFixed(0)) + suffix;
    if (current < num) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* Observe stats band + hero stats */
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.currentTarget.querySelectorAll('.stat-num, .sband-num').forEach(animateCounter);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.hero-stats, .stats-band-inner').forEach(el => counterObs.observe(el));

/* ---------- Active nav link ---------- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  link.classList.toggle('active', link.getAttribute('href') === currentPage);
});

/* ---------- Smooth hover for photo strip (pause on touch) ---------- */
const strip = document.querySelector('.strip-track');
if (strip) {
  strip.addEventListener('touchstart', () => strip.style.animationPlayState = 'paused', { passive: true });
  strip.addEventListener('touchend',   () => strip.style.animationPlayState = 'running');
}

/* ---------- Lazy-load image fade-in ---------- */
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.5s ease';
  if (img.complete) {
    img.style.opacity = '1';
  } else {
    img.addEventListener('load', () => img.style.opacity = '1');
  }
});
