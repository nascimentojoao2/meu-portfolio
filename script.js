
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const themeToggle = document.getElementById('themeToggle');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
}
if (themeToggle) {
  themeToggle.textContent = document.body.classList.contains('light') ? '☾' : '☀';
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '☾' : '☀';
  });
}

const preloader = document.getElementById('preloader');
if (preloader) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1700);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const dotsWrap = carousel.parentElement.querySelector('.carousel-dots');
  const thumbs = Array.from(carousel.parentElement.querySelectorAll('.carousel-thumb-btn'));
  const counter = carousel.querySelector('.carousel-counter');

  if (!slides.length || !dotsWrap) return;
  let index = 0;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir para imagem ${i + 1}`);
    dot.addEventListener('click', () => {
      index = i;
      render();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      index = i;
      render();
    });
  });

  function render() {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    thumbs.forEach((thumb, i) => thumb.classList.toggle('active', i === index));
    if (counter) counter.textContent = `${index + 1}/${slides.length}`;
  }

  prevBtn?.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });

  nextBtn?.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    render();
  });

  render();
});
