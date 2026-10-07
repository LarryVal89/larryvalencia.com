/* ── Nav toggle ── */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ── Header scroll ── */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Hero slider ── */
const slides = document.querySelectorAll('.hero-slide');
const prevBtn = document.querySelector('.hero-prev');
const nextBtn = document.querySelector('.hero-next');
const pauseBtn = document.querySelector('.hero-pause');
const progressBar = document.querySelector('.hero-progress-bar');

let currentSlide = 0;
let isPaused = false;
let slideInterval = null;
const SLIDE_DURATION = 5000;
let progressRAF = null;
let slideStart = 0;

function goToSlide(index) {
  slides[currentSlide]?.classList.remove('is-active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide]?.classList.add('is-active');
  resetProgress();
}

function resetProgress() {
  slideStart = Date.now();
  if (progressBar) progressBar.style.width = '0%';
}

function animateProgress() {
  if (isPaused) return;
  const elapsed = Date.now() - slideStart;
  const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
  if (progressBar) progressBar.style.width = pct + '%';
  if (elapsed >= SLIDE_DURATION) {
    goToSlide(currentSlide + 1);
  } else {
    progressRAF = requestAnimationFrame(animateProgress);
  }
}

function startSlider() {
  resetProgress();
  cancelAnimationFrame(progressRAF);
  progressRAF = requestAnimationFrame(animateProgress);
}

function stopSlider() {
  cancelAnimationFrame(progressRAF);
}

prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));

pauseBtn?.addEventListener('click', () => {
  isPaused = !isPaused;
  if (isPaused) {
    stopSlider();
    pauseBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><polygon points="2,1 12,7 2,13"/></svg>';
    pauseBtn.setAttribute('aria-label', 'Reproducir slider');
  } else {
    slideStart = Date.now() - (parseFloat(progressBar?.style.width || '0') / 100 * SLIDE_DURATION);
    startSlider();
    pauseBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="1" y="1" width="4" height="12" rx="1"/><rect x="9" y="1" width="4" height="12" rx="1"/></svg>';
    pauseBtn.setAttribute('aria-label', 'Pausar slider');
  }
});

if (slides.length > 0) startSlider();

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ── Cookie banner ── */
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');

if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
  setTimeout(() => cookieBanner.classList.add('is-visible'), 1500);
}

cookieAccept?.addEventListener('click', () => {
  localStorage.setItem('cookiesAccepted', 'true');
  cookieBanner.classList.remove('is-visible');
});

/* ── Smooth anchor offset for fixed header ── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
