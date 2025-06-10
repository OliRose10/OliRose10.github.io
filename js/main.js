// Indie Rock Movement & Interactivity

document.addEventListener("DOMContentLoaded", function () {
  // Typewriter effect with indie-rock rawness
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
      } else {
        typewriter.textContent += " ";
      }
    }
    typing();
  }

  // Movement: Fade-in on scroll for .fade-in
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

  // FAQ: Accordion with punk snap
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

  // Back to Top Button: Slides up
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

  // Theme toggle (light/dark)
  const themeBtn = document.getElementById("themeToggleBtn");
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeBtn) {
      const icon = themeBtn.querySelector("i");
      const label = themeBtn.querySelector("span");
      if (theme === "dark") {
        icon.className = "fa-solid fa-sun";
        label.textContent = "Light Mode";
      } else {
        icon.className = "fa-solid fa-moon";
        label.textContent = "Dark Mode";
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

  // Nav active link
  document.querySelectorAll("nav#navMenu .nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      document.querySelectorAll("nav#navMenu .nav-link").forEach((l) => {
        l.classList.remove("active");
        l.removeAttribute("aria-current");
      });
      this.classList.add("active");
      this.setAttribute("aria-current", "page");
    });
  });

  // Skip-link Accessibility
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function (e) {
      const mainContent = document.getElementById('mainContent');
      if (mainContent) mainContent.setAttribute('tabindex', '-1');
      setTimeout(() => mainContent && mainContent.focus(), 10);
    });
  }
});
// Animated section/card reveal
function revealOnScroll() {
  document.querySelectorAll('.scroll-fade-in').forEach(el => {
    if (!el.classList.contains('revealed')) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        el.classList.add('revealed');
      }
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);
// Parallax hero on scroll and mousemove
const heroSection = document.querySelector('.hero-section');
const heroBgFloat = document.querySelector('.hero-bg-float');
window.addEventListener('scroll', () => {
  if(heroBgFloat) {
    let y = window.scrollY * 0.28;
    heroBgFloat.style.transform = `translateY(${y}px)`;
  }
});
if(heroSection) {
  heroSection.addEventListener('mousemove', e => {
    const {width, left} = heroSection.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    heroSection.querySelector('.hero-title').style.transform = `translateX(${x*16}px) scale(1.03)`;
  });
  heroSection.addEventListener('mouseleave', () => {
    heroSection.querySelector('.hero-title').style.transform = '';
  });
}
// Floating notes/music icons
const notes = ['<i class="fa-solid fa-music"></i>', '<i class="fa-solid fa-guitar"></i>', '<i class="fa-solid fa-headphones"></i>', '<i class="fa-solid fa-star"></i>'];
const container = document.getElementById('floating-notes');
function spawnNote() {
  if(!container) return;
  const el = document.createElement('div');
  el.className = 'floating-note';
  el.innerHTML = notes[Math.floor(Math.random()*notes.length)];
  el.style.left = Math.random()*96 + 'vw';
  el.style.fontSize = (1 + Math.random()*1.8) + 'em';
  el.style.animationDuration = (12 + Math.random()*12) + 's';
  container.appendChild(el);
  setTimeout(() => el.remove(), 18000);
}
setInterval(spawnNote, 1300);
for(let i=0;i<6;i++) spawnNote();
