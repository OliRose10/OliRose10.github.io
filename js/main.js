// === Indie Rock Movement & Interactivity by Copilot ===

document.addEventListener("DOMContentLoaded", function () {
  // --- Typewriter effect ---
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

  const galleryTrack = document.querySelector('.gallery-track');
  if (galleryTrack) {
    function setGalleryTrackHeight() {
      let max = 0;
      galleryTrack.querySelectorAll('.gallery-slide').forEach(slide => {
        const prevDisplay = slide.style.display;
        slide.style.display = 'block';
        const h = slide.offsetHeight;
        if (h > max) max = h;
        slide.style.display = prevDisplay;
      });
      galleryTrack.style.height = max + 'px';
    }
    setGalleryTrackHeight();
    window.addEventListener('resize', setGalleryTrackHeight);
  }

  // --- Prevent testimonial carousel from causing page jumps ---
  const carouselTrack = document.querySelector('.carousel-track');
  if (carouselTrack) {
    function setCarouselTrackHeight() {
      let max = 0;
      carouselTrack.querySelectorAll('.carousel-item').forEach(item => {
        const prevDisplay = item.style.display;
        item.style.display = 'block';
        const h = item.offsetHeight;
        if (h > max) max = h;
        item.style.display = prevDisplay;
      });
      carouselTrack.style.height = max + 'px';
    }
    setCarouselTrackHeight();
    window.addEventListener('resize', setCarouselTrackHeight);
  }

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

  // --- Hamburger Navigation (modern, accessible, mobile friendly) ---
  const nav = document.querySelector('nav');
  const hamburger = document.querySelector('.hamburger');
  if (nav && hamburger) {
    function closeNav() {
      nav.classList.remove('nav-open');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    function openNav() {
      nav.classList.add('nav-open');
      hamburger.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      const firstLink = nav.querySelector('.nav-link');
      if (firstLink) firstLink.focus();
    }
    hamburger.addEventListener('click', function () {
      if (nav.classList.contains('nav-open')) {
        closeNav();
      } else {
        openNav();
      }
    });
    // Close nav on link click
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeNav);
    });
    // Accessibility: close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
        closeNav();
      }
    });
    // Click outside nav closes it
    document.addEventListener('click', function (e) {
      if (
        nav.classList.contains('nav-open') &&
        !nav.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeNav();
      }
    });
    // Trap focus inside nav when open (for accessibility)
    nav.addEventListener('keydown', function (e) {
      if (!nav.classList.contains('nav-open')) return;
      const focusable = nav.querySelectorAll('.nav-link');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    });
  }

  // --- Nav active link highlight ---
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

  // --- Hide gallery image placeholder on image load (improvement) ---
  document.querySelectorAll('.gallery-slide').forEach(slide => {
    const img = slide.querySelector('img');
    const placeholder = slide.querySelector('.img-placeholder');
    if (img && placeholder) {
      img.addEventListener('load', () => {
        placeholder.style.display = 'none';
      });
      // Hide immediately if already cached
      if (img.complete) {
        placeholder.style.display = 'none';
      }
    }
  });

  // --- Stats Counter Animation ---
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

  // --- Testimonial Carousel: Pause only on interactive elements (not the whole section) ---
  (function () {
    const track = document.querySelector('.carousel-track');
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    if (!track || items.length === 0 || dots.length === 0) return;

    let current = 0, interval = null, paused = false;
    const INTERVAL_MS = 3500;

    function show(index) {
      items.forEach((item, i) => item.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      current = index;
      resetInterval();
    }
    function next() { show((current + 1) % items.length); }
    function prev() { show((current - 1 + items.length) % items.length); }

    function resetInterval() {
      if (interval) clearInterval(interval);
      if (!paused) interval = setInterval(next, INTERVAL_MS);
    }

    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    if (prevBtn) prevBtn.onclick = prev;
    if (nextBtn) nextBtn.onclick = next;
    dots.forEach((dot, i) => dot.onclick = () => show(i));

    // Pause/resume only when hovering over track, arrows, or dots (not the whole section)
    [track, prevBtn, nextBtn, ...dots].forEach(el => {
      if (!el) return;
      el.addEventListener('mouseenter', () => { paused = true; if (interval) clearInterval(interval); });
      el.addEventListener('mouseleave', () => { paused = false; resetInterval(); });
      el.addEventListener('focusin', () => { paused = true; if (interval) clearInterval(interval); });
      el.addEventListener('focusout', () => { paused = false; resetInterval(); });
    });

    // Keyboard nav (when focused)
    track.tabIndex = 0;
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });

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

  // --- Gallery Slideshow: Pause only on interactive elements (not the whole section) ---
  (function () {
    const track = document.querySelector('.gallery-track');
    const slides = Array.from(document.querySelectorAll('.gallery-slide'));
    const dots = Array.from(document.querySelectorAll('.gallery-dot'));
    if (!track || slides.length === 0 || dots.length === 0) return;

    let current = 0, interval = null, paused = false;
    const INTERVAL_MS = 3500;

    function show(index) {
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      current = index;
      resetInterval();
    }
    function next() { show((current + 1) % slides.length); }
    function prev() { show((current - 1 + slides.length) % slides.length); }

    function resetInterval() {
      if (interval) clearInterval(interval);
      if (!paused) interval = setInterval(next, INTERVAL_MS);
    }

    const prevBtn = document.querySelector('.gallery-btn.prev');
    const nextBtn = document.querySelector('.gallery-btn.next');
    if (prevBtn) prevBtn.onclick = prev;
    if (nextBtn) nextBtn.onclick = next;
    dots.forEach((dot, i) => dot.onclick = () => show(i));

    // Pause/resume only when hovering over track, arrows, or dots (not the whole section)
    [track, prevBtn, nextBtn, ...dots].forEach(el => {
      if (!el) return;
      el.addEventListener('mouseenter', () => { paused = true; if (interval) clearInterval(interval); });
      el.addEventListener('mouseleave', () => { paused = false; resetInterval(); });
      el.addEventListener('focusin', () => { paused = true; if (interval) clearInterval(interval); });
      el.addEventListener('focusout', () => { paused = false; resetInterval(); });
    });

    // Keyboard nav (when focused)
    track.tabIndex = 0;
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });

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
});

// --- Fast, reliable scroll-fade-in using IntersectionObserver ---
if ('IntersectionObserver' in window) {
  const fadeEls = document.querySelectorAll('.scroll-fade-in');
  const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => fadeObserver.observe(el));
} else {
  function revealFallback() {
    document.querySelectorAll('.scroll-fade-in').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (!el.classList.contains('revealed') && rect.top < window.innerHeight - 40) {
        el.classList.add('revealed');
      }
    });
  }
  window.addEventListener('scroll', revealFallback);
  window.addEventListener('DOMContentLoaded', revealFallback);
}

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

// --- Floating notes/music icons (SCATTERED START) ---
const notes = [
  '<i class="fa-solid fa-music"></i>',
  '<i class="fa-solid fa-guitar"></i>',
  '<i class="fa-solid fa-headphones"></i>',
  '<i class="fa-solid fa-star"></i>'
];
const container = document.getElementById('floating-notes');

function spawnNote(scattered = false) {
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'floating-note';
  el.innerHTML = notes[Math.floor(Math.random() * notes.length)];
  el.style.left = Math.random() * 96 + 'vw';
  el.style.fontSize = (1 + Math.random() * 1.8) + 'em';
  el.style.animationDuration = (12 + Math.random() * 12) + 's';

  if (scattered) {
    // Start scattered: random top position
    el.style.top = Math.random() * 96 + 'vh';
    el.style.transform = `translateY(0)`;
    // Use animation to float upward from wherever it starts
    el.style.animationName = 'floatNotesScatter';
  }
  container.appendChild(el);
  setTimeout(() => el.remove(), 18000);
}

// On load, scatter 12 notes over the screen (so they don't all rise from the bottom)
for (let i = 0; i < 12; i++) spawnNote(true);
// Afterward, continue to spawn from the bottom as before
setInterval(spawnNote, 1300);

// --- Ensure the new animation is present (add this to your CSS if missing) ---
// @keyframes floatNotesScatter {
//   0% { opacity: 0.12; transform: translateY(0); }
//   100% { opacity: 0.10; transform: translateY(-120vh); }
// }

function updateContactLogoForTheme() {
  var logo = document.getElementById('contactLogo');
  if (!logo) return;
  var theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark') {
    logo.src = 'images/Rose Above Logo - White.png';
  } else {
    logo.src = 'images/Rose Above Logo - Black.png';
  }
}
updateContactLogoForTheme();
const themeBtn = document.getElementById("themeToggleBtn");
if (themeBtn) {
  themeBtn.addEventListener("click", function () {
    setTimeout(updateContactLogoForTheme, 10);
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js');
  });
}
