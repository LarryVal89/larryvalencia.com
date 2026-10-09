(function () {
  'use strict';

  const topbar = document.getElementById('topbar');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  function setOpen(open) {
    topbar?.classList.toggle('is-open', open);
    toggle?.classList.toggle('is-active', open);
    toggle?.setAttribute('aria-expanded', String(open));
  }

  toggle?.addEventListener('click', () => {
    setOpen(!topbar?.classList.contains('is-open'));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) setOpen(false);
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
