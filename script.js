document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  document.querySelectorAll('.photo-slot[data-photo]').forEach((slot) => {
    const image = slot.querySelector('.photo-image');
    if (!image) return;
    const showPhoto = () => {
      slot.classList.add('has-photo');
      slot.setAttribute('aria-label', slot.dataset.label || image.alt || 'Photo');
    };
    image.addEventListener('load', showPhoto);
    image.addEventListener('error', () => {
      image.hidden = true;
      slot.classList.remove('has-photo');
    });
    if (image.complete && image.naturalWidth > 0) showPhoto();
  });

  const countdown = document.querySelector('[data-countdown]');
  if (countdown) {
    const target = new Date(countdown.dataset.countdown).getTime();
    const update = () => {
      const remaining = Math.max(0, target - Date.now());
      const days = Math.floor(remaining / 86400000);
      const hours = Math.floor((remaining / 3600000) % 24);
      const minutes = Math.floor((remaining / 60000) % 60);
      const seconds = Math.floor((remaining / 1000) % 60);
      [['days', days], ['hours', hours], ['minutes', minutes], ['seconds', seconds]].forEach(([unit, value]) => {
        const element = countdown.querySelector(`[data-unit="${unit}"]`);
        if (element) element.textContent = String(value).padStart(2, '0');
      });
    };
    update();
    window.setInterval(update, 1000);
  }

  document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
});
