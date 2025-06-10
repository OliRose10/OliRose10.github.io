// === Indie Rock Movement & Interactivity by Copilot ===

// --- Typewriter effect ---
document.addEventListener("DOMContentLoaded", function () {
  const typewriter = document.getElementById("typewriterText");
  if (typewriter) {
    const text = "Specialist finance, tax & business support for musicians, indie labels & creatives.";
    let i = 0;
    typewriter.textContent = "";
    function typing() {
      if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(typing, 23 + Math.random() * 22);
      }
    }
    typing();
  }

  // --- Fade-in on scroll for .fade-in (legacy; prefer .scroll-fade-in now) ---
  function handleFadeIn() {
    document.querySelectorAll('.fade-in').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', handleFadeIn);
  window.addEventListener('resize', handleFadeIn);
  handleFadeIn();

  // --- FAQ Accordion ---
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", function () {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.toggle("open");
      document.querySelectorAll(".faq-item").forEach((other) => {
        if (other !== item) other.classList.remove("open");
      });
      btn.setAttribute("aria-expanded", isOpen);
    });
    btn.setAttribute("aria-expanded", "false");
  });

  // --- Back to Top Button ---
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 320) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Theme toggle (light/dark) ---
  const themeBtn = document.getElementById("themeToggleBtn");
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeBtn) {
      const icon = themeBtn.querySelector("i");
      const label = themeBtn.querySelector(".theme-toggle-text");
      if (theme === "dark") {
        icon.className = "fa-solid fa-moon";
        label.textContent = "Dark";
      } else {
        icon.className = "fa-solid fa-sun";
        label.textContent = "Light";
      }
    }
    localStorage.setItem("olirose-theme", theme);
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      let theme = document.documentElement.getAttribute("data-theme");
      setTheme(theme === "light" ? "dark" : "light");
    });
    let saved = localStorage.getItem("olirose-theme");
    if (saved) {
      setTheme(saved);
    } else {
      setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
  }

  // --- Nav active link (works for nav not using #navMenu id) ---
  document.querySelectorAll("nav .nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      document.querySelectorAll("nav .nav-link").forEach((l) => {
        l.classList.remove("active");
        l.removeAttribute("aria-current");
      });
      this.classList.add("active");
      this.setAttribute("aria-current", "page");
    });
  });

  // --- Skip-link Accessibility ---
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function (e) {
      const mainContent = document.getElementById('mainContent');
      if (mainContent) mainContent.setAttribute('tabindex', '-1');
      setTimeout(() => mainContent && mainContent.focus(), 10);
    });
  }
});

// --- Staggered scroll-fade-in animation ---
function revealOnScroll() {
  document.querySelectorAll('.scroll-fade-in').forEach((el, idx) => {
    if (!el.classList.contains('revealed')) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        setTimeout(() => el.classList.add('revealed'), idx * 90);
      }
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// --- Parallax hero on scroll and mousemove ---
const heroSection = document.querySelector('.hero-section');
const heroBgFloat = document.querySelector('.hero-bg-float');
window.addEventListener('scroll', () => {
  if (heroBgFloat) {
    let y = window.scrollY * 0.28;
    heroBgFloat.style.transform = `translateY(${y}px)`;
  }
});
if (heroSection) {
  heroSection.addEventListener('mousemove', e => {
    const { width, left } = heroSection.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const heroTitle = heroSection.querySelector('.hero-title');
    if (heroTitle) heroTitle.style.transform = `translateX(${x * 16}px) scale(1.03)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    const heroTitle = heroSection.querySelector('.hero-title');
    if (heroTitle) heroTitle.style.transform = '';
  });
}

// --- Floating notes/music icons ---
const notes = [
  '<i class="fa-solid fa-music"></i>',
  '<i class="fa-solid fa-guitar"></i>',
  '<i class="fa-solid fa-headphones"></i>',
  '<i class="fa-solid fa-star"></i>'
];
const container = document.getElementById('floating-notes');
function spawnNote() {
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'floating-note';
  el.innerHTML = notes[Math.floor(Math.random() * notes.length)];
  el.style.left = Math.random() * 96 + 'vw';
  el.style.fontSize = (1 + Math.random() * 1.8) + 'em';
  el.style.animationDuration = (12 + Math.random() * 12) + 's';
  container.appendChild(el);
  setTimeout(() => el.remove(), 18000);
}
setInterval(spawnNote, 1300);
for (let i = 0; i < 6; i++) spawnNote();

// --- Stats Counter Animation (with thousands separator and animation on scroll) ---
function animateStats() {
  document.querySelectorAll('.stat-number').forEach(function (el) {
    if (el.dataset.animated) return; // Only animate once
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    let start = 0;
    let duration = 1300 + Math.random() * 300;
    let increment = Math.ceil(target / (duration / 20));
    function run() {
      start += increment;
      if (start > target) start = target;
      el.textContent = start.toLocaleString();
      if (start < target) setTimeout(run, 20);
      else el.dataset.animated = "true";
    }
    run();
  });
}
function isInView(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}
window.addEventListener('scroll', () => {
  document.querySelectorAll('.stats-row').forEach(row => {
    if (isInView(row)) animateStats();
  });
});
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.stats-row').forEach(row => {
    if (isInView(row)) animateStats();
  });
});

// --- Testimonial Carousel: auto-scroll, pause on hover/focus, keyboard/swipe ---
(function () {
  const track = document.querySelector('.carousel-track');
  const items = Array.from(document.querySelectorAll('.carousel-item'));
  const dots = Array.from(document.querySelectorAll('.carousel-dot'));
  if (!track || items.length === 0 || dots.length === 0) return;

  let current = 0, timer = null, paused = false;

  function show(index) {
    items.forEach((item, i) => item.classList.toggle('active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    current = index;
    resetTimer();
  }
  function next() { show((current + 1) % items.length); }
  function prev() { show((current - 1 + items.length) % items.length); }

  function resetTimer() {
    if (timer) clearTimeout(timer);
    if (!paused) timer = setTimeout(next, 6000);
  }

  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  if (prevBtn) prevBtn.onclick = prev;
  if (nextBtn) nextBtn.onclick = next;
  dots.forEach((dot, i) => dot.onclick = () => show(i));
  const carousel = document.querySelector('.testimonial-carousel');
  if (carousel) {
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });
    // Pause auto scroll on hover/focus
    ['mouseenter', 'focusin'].forEach(evt =>
      carousel.addEventListener(evt, () => { paused = true; if (timer) clearTimeout(timer); })
    );
    ['mouseleave', 'focusout'].forEach(evt =>
      carousel.addEventListener(evt, () => { paused = false; resetTimer(); })
    );
  }
  // Touch swipe
  let startX = 0;
  track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  track.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 40) prev();
    if (startX - endX > 40) next();
  });

  show(0);
})();
