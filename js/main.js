// Enhanced main.js for OliRose10.github.io

document.addEventListener("DOMContentLoaded", function () {
  // ==== Typewriter Effect for Hero ====
  const typewriter = document.getElementById("typewriterText");
  if (typewriter) {
    const text = "Specialist finance, tax & business support for musicians, indie labels & creatives.";
    let i = 0;
    function typing() {
      if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(typing, 23 + Math.random() * 22);
      } else {
        typewriter.textContent += " ";
      }
    }
    typewriter.textContent = ""; // Clear on reload
    typing();
  }

  // ==== FAQ Accordion ====
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", function () {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.toggle("open");
      // Close other open items
      document.querySelectorAll(".faq-item").forEach((other) => {
        if (other !== item) other.classList.remove("open");
      });
      // Accessibility: toggle aria-expanded
      btn.setAttribute("aria-expanded", isOpen);
    });
    // ARIA setup
    btn.setAttribute("aria-expanded", "false");
  });

  // ==== Back to Top Button ====
  const backToTop = document.getElementById("backToTop");
  if(backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==== Theme Toggle (Light/Dark) ====
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
    // On load: use saved, then system preference
    let saved = localStorage.getItem("olirose-theme");
    if (saved) {
      setTheme(saved);
    } else {
      setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    }
  }

  // ==== Nav Active Link & ARIA ====
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

  // ==== Skip-link Accessibility ====
  const skipLink = document.querySelector('.skip-link');
  if(skipLink) {
    skipLink.addEventListener('click', function(e) {
      const mainContent = document.getElementById('mainContent');
      if (mainContent) mainContent.setAttribute('tabindex', '-1');
      setTimeout(() => mainContent && mainContent.focus(), 10);
    });
  }
});
