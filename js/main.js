(function () {
  'use strict';

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

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      let target;
      try {
        target = document.querySelector(href);
      } catch {
        return;
      }
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Scroll reveal (sin bloquear contenido si falla el script) ── */
  const revealEls = document.querySelectorAll('.reveal');

  function markVisibleInViewport() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.92 && rect.bottom > 0) {
        el.classList.add('is-visible');
      }
    });
  }

  if (revealEls.length && 'IntersectionObserver' in window) {
    markVisibleInViewport();
    document.documentElement.classList.add('js-reveal');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    revealEls.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        revealObserver.observe(el);
      }
    });
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ── Cookie banner ── */
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');

  function cookiesAccepted() {
    try {
      return localStorage.getItem('cookiesAccepted') === 'true';
    } catch {
      return false;
    }
  }

  if (cookieBanner && !cookiesAccepted()) {
    setTimeout(() => cookieBanner.classList.add('is-visible'), 1200);
  }

  cookieAccept?.addEventListener('click', () => {
    try {
      localStorage.setItem('cookiesAccepted', 'true');
    } catch {
      /* ignore */
    }
    cookieBanner?.classList.remove('is-visible');
  });
})();
