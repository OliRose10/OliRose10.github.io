// main.js

document.addEventListener("DOMContentLoaded", () => {
  /* --- Preloader --- */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  });

  /* --- Dark Mode Toggle with LocalStorage --- */
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });

  /* --- Mobile Hamburger Menu --- */
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !expanded);
  });

  /* --- Interactive Tabs --- */
  const tabLinks = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");
  tabLinks.forEach(tab => {
    tab.addEventListener("click", () => {
      tabLinks.forEach(item => item.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));
      tab.classList.add("active");
      const tabId = tab.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  /* --- FAQ Accordion --- */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  /* --- Slider Control for Case Studies --- */
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) slide.classList.add("active");
    });
  }
  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });
  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  /* --- Modal Popup for Newsletter --- */
  const newsletterModal = document.getElementById("newsletterModal");
  const modalClose = document.getElementById("modalClose");
  setTimeout(() => {
    newsletterModal.style.display = "flex";
  }, 10000);
  modalClose.addEventListener("click", () => {
    newsletterModal.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === newsletterModal) {
      newsletterModal.style.display = "none";
    }
  });

  /* --- Live Chat Widget --- */
  const chatToggle = document.getElementById("chatToggle");
  const chatBox = document.getElementById("chatBox");
  const chatClose = document.getElementById("chatClose");
  chatToggle.addEventListener("click", () => {
    chatBox.classList.toggle("visible");
  });
  chatClose.addEventListener("click", () => {
    chatBox.classList.remove("visible");
  });

  /* --- Back to Top Button --- */
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
