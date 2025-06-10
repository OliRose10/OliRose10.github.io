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

  /* --- Typewriter Effect --- */
  const typedElement = document.getElementById("typed");
  const typewriterTexts = ["Expert Strategies", "Custom Solutions", "Inspiring Growth"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 150;
  const pauseSpeed = 2000;

  function typewriter() {
    const currentText = typewriterTexts[textIndex];
    if (isDeleting) {
      typedElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        setTimeout(typewriter, 500);
      } else {
        setTimeout(typewriter, typeSpeed / 2);
      }
    } else {
      typedElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typewriter, pauseSpeed);
      } else {
        setTimeout(typewriter, typeSpeed);
      }
    }
  }
  if (typedElement) {
    typewriter();
  }

  /* --- Portfolio Filter --- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");
      portfolioItems.forEach(item => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block";
          item.classList.add("animate__animated", "animate__fadeIn");
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  /* --- Statistics Counter Animation --- */
  const statNumbers = document.querySelectorAll(".stat-number");
  const statsSection = document.getElementById("statistics");
  let statsStarted = false;

  const statsObserverOptions = {
    root: null,
    threshold: 0.5
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsStarted) {
        statNumbers.forEach(number => {
          const target = +number.getAttribute("data-target");
          const updateCount = () => {
            const current = +number.textContent;
            const increment = target / 200;
            if (current < target) {
              number.textContent = Math.ceil(current + increment);
              setTimeout(updateCount, 20);
            } else {
              number.textContent = target;
            }
          };
          updateCount();
        });
        statsStarted = true;
        observer.unobserve(statsSection);
      }
    });
  }, statsObserverOptions);

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  /* --- Scroll Progress Bar Update --- */
  const scrollProgress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + "%";
  });

  /* --- Header Shrink on Scroll & Parallax Hero Background --- */
  const header = document.querySelector("header");
  const heroBackground = document.querySelector(".hero-background");
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      header.classList.add("header-shrink");
      heroBackground.style.transform = `translateY(${window.pageYOffset * 0.2}px)`;
    } else {
      header.classList.remove("header-shrink");
      heroBackground.style.transform = "translateY(0)";
    }
  });

  /* --- Social Share Button Functionality --- */
  const shareButtons = document.querySelectorAll(".share-btn");
  shareButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const platform = btn.getAttribute("data-platform");
      const pageUrl = encodeURIComponent(window.location.href);
      const pageTitle = encodeURIComponent(document.title);
      let shareUrl = "";
      if (platform === "facebook") {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
      } else if (platform === "twitter") {
        shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
      } else if (platform === "linkedin") {
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
      }
      window.open(shareUrl, '_blank', 'width=600,height=400');
    });
  });
});
