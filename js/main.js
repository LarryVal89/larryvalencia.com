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

  const form = document.getElementById('lead-form');
  const status = document.getElementById('form-status');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const nombre = String(data.get('nombre') || '').trim();
    const email = String(data.get('email') || '').trim();
    const tipo = String(data.get('tipo') || '').trim();
    const presupuesto = String(data.get('presupuesto') || '').trim();
    const body = [
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      `Tipo de proyecto: ${tipo}`,
      `Presupuesto estimado: ${presupuesto}`
    ].join('\n');
    const subject = `Llamada estratégica — ${nombre}`;
    window.location.href = `mailto:valencialarry1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) {
      status.textContent = 'Se abrió tu correo para enviar la solicitud. Si no se abrió, escribe a valencialarry1@gmail.com.';
    }
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
