console.log('MAIN JS WORKS');

document.addEventListener('DOMContentLoaded', function () {

  // =========================
  // Текущий год
  // =========================

  const year = document.querySelector('[data-current-year]');

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // =========================
  // Активная ссылка меню
  // =========================

  const currentPage =
    window.location.pathname.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(function (link) {
    const linkPage = link.getAttribute('href');

    if (linkPage === currentPage) {
      link.classList.add('is-active');
    }
  });


  // =========================
  // Анимация появления блоков
  // =========================

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


  // =========================
  // Копирование контактов
  // =========================

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


  // =========================
  // СЛАЙДЕР НАВЫКОВ
  // =========================

  const slider = document.querySelector('[data-skills-slider]');
  const dotsContainer = document.querySelector('[data-skills-dots]');

  // Если слайдера на странице нет,
  // остальной JS всё равно продолжит работать
  if (!slider) return;

  const slides = Array.from(
    slider.querySelectorAll('.skill-slide')
  );

  const total = slides.length;

  if (!total) return;

  let current = 0;
  let autoplay = null;


  // =========================
  // Создание точек
  // =========================

  if (dotsContainer) {

    slides.forEach(function (_, index) {

      const dot = document.createElement('button');

      dot.type = 'button';
      dot.classList.add('skills-slider__dot');

      dot.addEventListener('click', function () {

        current = index;

        updateSlider();
        restartAutoplay();

      });

      dotsContainer.appendChild(dot);

    });

  }

  const dots = dotsContainer
    ? Array.from(
        dotsContainer.querySelectorAll('.skills-slider__dot')
      )
    : [];


  // =========================
  // Обновление слайдера
  // =========================

  function updateSlider() {

    slides.forEach(function (slide, index) {

      slide.classList.remove(
        'is-center',
        'is-left',
        'is-right',
        'is-hidden'
      );

      let position = index - current;


      // Зацикливание

      if (position > total / 2) {
        position -= total;
      }

      if (position < -total / 2) {
        position += total;
      }


      // Центральная карточка

      if (position === 0) {

        slide.classList.add('is-center');

      }

      // Левая карточка

      else if (position === -1) {

        slide.classList.add('is-left');

      }

      // Правая карточка

      else if (position === 1) {

        slide.classList.add('is-right');

      }

      // Все остальные

      else {

        slide.classList.add('is-hidden');

      }

    });


    // Активная точка

    dots.forEach(function (dot, index) {

      dot.classList.toggle(
        'is-active',
        index === current
      );

    });

  }


  // =========================
  // Следующий слайд
  // =========================

  function nextSlide() {

    current = (current + 1) % total;

    updateSlider();

  }


  // =========================
  // Автопрокрутка
  // =========================

  function startAutoplay() {

    clearInterval(autoplay);

    autoplay = setInterval(function () {

      nextSlide();

    }, 2000);

  }


  function restartAutoplay() {

    startAutoplay();

  }


  // =========================
  // Пауза при наведении
  // =========================

  slider.addEventListener('mouseenter', function () {

    clearInterval(autoplay);

  });


  slider.addEventListener('mouseleave', function () {

    startAutoplay();

  });


  // =========================
  // Запуск слайдера
  // =========================

  updateSlider();

  startAutoplay();

});
