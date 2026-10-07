/* ── Mobile nav ── */
const mobileToggle = document.querySelector('.mobile-nav-toggle');
const mobileDrawer = document.querySelector('.mobile-drawer');

function closeMobileNav() {
  mobileToggle?.classList.remove('is-active');
  mobileDrawer?.classList.remove('is-open');
  mobileToggle?.setAttribute('aria-expanded', 'false');
  mobileDrawer?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

mobileToggle?.addEventListener('click', () => {
  const open = !mobileDrawer?.classList.contains('is-open');
  mobileToggle.classList.toggle('is-active', open);
  mobileDrawer?.classList.toggle('is-open', open);
  mobileToggle.setAttribute('aria-expanded', String(open));
  mobileDrawer?.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileDrawer?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});

/* ── Smooth scroll (skip bare #) ── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

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
  { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ── Cookie banner ── */
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');

if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
  setTimeout(() => cookieBanner.classList.add('is-visible'), 1200);
}

cookieAccept?.addEventListener('click', () => {
  localStorage.setItem('cookiesAccepted', 'true');
  cookieBanner.classList.remove('is-visible');
});
