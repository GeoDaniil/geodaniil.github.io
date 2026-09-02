document.addEventListener('DOMContentLoaded', function () {
  const year = document.querySelector('[data-current-year]');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(function (link) {
    const linkPage = link.getAttribute('href');

    if (linkPage === currentPage) {
      link.classList.add('is-active');
    }
  });

  const revealItems = document.querySelectorAll(
    '.home-photo-card, .home-summary-card, .info-card, .image-card, .section-note, .skills-panel, .experience-item, .soft-card, .contact-box'
  );

  revealItems.forEach(function (item) {
    item.classList.add('reveal');
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealItems.forEach(function (item) {
    observer.observe(item);
  });

  const contactBoxes = document.querySelectorAll('.contact-box');

  contactBoxes.forEach(function (box) {
    box.addEventListener('click', function () {
      const value = box.querySelector('p');

      if (!value) return;

      const text = value.textContent.trim();

      if (!text) return;

      navigator.clipboard.writeText(text).then(function () {
        box.classList.add('is-copied');

        setTimeout(function () {
          box.classList.remove('is-copied');
        }, 1200);
      });
    });
  });
});
