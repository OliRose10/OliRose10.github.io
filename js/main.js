// main.js for streamlined freelance finance site

// Preloader
window.addEventListener('load', function () {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
  }, 600);
});

// Theme Toggle
(function() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  const icon = btn.querySelector('i');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let mode = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
  setTheme(mode);

  btn.addEventListener('click', () => {
    mode = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(mode);
    localStorage.setItem('theme', mode);
  });

  function setTheme(mode) {
    root.setAttribute('data-theme', mode);
    if (mode === 'dark') {
      btn.querySelector('span').textContent = 'Light Mode';
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      btn.querySelector('span').textContent = 'Dark Mode';
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }
})();

// Mobile Menu Toggle
(function(){
  const menuBtn = document.getElementById('menuToggleBtn');
  const navMenu = document.getElementById('navMenu');
  if (!menuBtn || !navMenu) return;
  let open = false;
  menuBtn.addEventListener('click', () => {
    open = !open;
    navMenu.classList.toggle('show', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.querySelector('i').classList.toggle('fa-bars', !open);
    menuBtn.querySelector('i').classList.toggle('fa-xmark', open);
  });
  navMenu.querySelectorAll('.nav-link').forEach(link =>
    link.addEventListener('click', () => {
      if (window.innerWidth < 900 && open) {
        navMenu.classList.remove('show');
        open = false;
        menuBtn.setAttribute('aria-expanded', false);
        menuBtn.querySelector('i').classList.add('fa-bars');
        menuBtn.querySelector('i').classList.remove('fa-xmark');
      }
    })
  );
})();

// Typewriter Effect
(function(){
  const el = document.getElementById('typewriterText');
  if (!el) return;
  const phrases = [
    "Finance and tax, made simple for musicians.",
    "Bookkeeping, self-assessment, royalty tracking.",
    "Jargon-free, honest advice for creatives.",
    "Start your freelance journey with me."
  ];
  let idx = 0, char = 0, erasing = false, pause = false;
  function typeLoop() {
    if (!el) return;
    let phrase = phrases[idx];
    if (!erasing) {
      el.textContent = phrase.slice(0, char+1);
      char++;
      if (char === phrase.length) {
        erasing = true;
        pause = true;
        setTimeout(typeLoop, 1600); return;
      }
    } else {
      el.textContent = phrase.slice(0, char-1);
      char--;
      if (char === 0) {
        erasing = false; idx = (idx + 1) % phrases.length; pause = true;
        setTimeout(typeLoop, 800); return;
      }
    }
    setTimeout(typeLoop, pause ? 40 : (erasing ? 22 : 55));
    pause = false;
  }
  typeLoop();
})();

// Contact Form Validation
(function(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input[required],textarea[required]').forEach(inp => {
      if (!inp.value.trim()) {
        inp.classList.add('error'); valid = false;
      } else {
        inp.classList.remove('error');
      }
    });
    if (valid) {
      alert('Thank you for your message! I will reply soon.');
      form.reset();
    }
  });
})();

// FAQ Accordion
(function(){
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
})();

// Fade-in on Scroll
(function(){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        entry.target.classList.remove('fade-in');
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(sec => observer.observe(sec));
})();

// Accessibility: Skip Link
(function(){
  const skip = document.querySelector('.skip-link');
  if (skip) {
    skip.addEventListener('focus', () => skip.style.top = '0');
    skip.addEventListener('blur', () => skip.style.top = '-40px');
  }
})();
