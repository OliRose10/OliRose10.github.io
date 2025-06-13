// Advanced slideshow: autoplay, pause on hover/focus/touch, dots, arrows, keyboard, swipe, progress bar
document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slideshow-dot');
  const arrows = document.querySelectorAll('.slideshow-arrow');
  const progressBar = document.querySelector('.slideshow-progress');
  const slideshow = document.querySelector('.slideshow');
  let currentSlide = 0;
  let interval = 3500; // Faster and more standard
  let autoplayTimer = null;
  let progressTimer = null;
  let isPaused = false;
  let startTime = null;

  function showSlide(n, userTriggered = false) {
    currentSlide = n;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === n));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === n));
    resetProgressBar();
    if (!isPaused) {
      resetAutoplay();
    }
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length, true);
  }
  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length, true);
  }

  // Progress bar logic
  function resetProgressBar() {
    if (progressBar) progressBar.style.width = "0%";
    clearInterval(progressTimer);
    if (progressBar && !isPaused) {
      startTime = Date.now();
      progressTimer = setInterval(() => {
        let percent = Math.min(100, ((Date.now() - startTime) / interval) * 100);
        progressBar.style.width = percent + "%";
        if (percent >= 100) clearInterval(progressTimer);
      }, 20);
    }
  }

  // Autoplay logic
  function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, interval);
    resetProgressBar();
  }
  function pauseAutoplay() {
    isPaused = true;
    clearInterval(autoplayTimer);
    clearInterval(progressTimer);
    if (progressBar) progressBar.style.width = "0%";
  }
  function resumeAutoplay() {
    if (isPaused) {
      isPaused = false;
      resetAutoplay();
    }
  }

  // Arrow controls
  if (arrows[0]) arrows[0].onclick = prevSlide;
  if (arrows[1]) arrows[1].onclick = nextSlide;

  // Dots
  dots.forEach((dot, idx) => dot.onclick = () => showSlide(idx, true));

  // Keyboard: Only when slideshow is focused for accessibility
  if (slideshow) {
    slideshow.tabIndex = 0; // Make focusable
    slideshow.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { prevSlide(); e.preventDefault(); }
      if (e.key === "ArrowRight") { nextSlide(); e.preventDefault(); }
    });
  }

  // Pause on hover/focus/touch
  if (slideshow) {
    slideshow.addEventListener('mouseenter', pauseAutoplay);
    slideshow.addEventListener('mouseleave', resumeAutoplay);
    slideshow.addEventListener('focusin', pauseAutoplay);
    slideshow.addEventListener('focusout', resumeAutoplay);

    // Touch & swipe
    let startX = null;
    slideshow.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      pauseAutoplay();
    }, {passive:true});
    slideshow.addEventListener('touchend', e => {
      if (startX !== null) {
        let dx = e.changedTouches[0].clientX - startX;
        if (dx > 44) prevSlide();
        else if (dx < -44) nextSlide();
      }
      startX = null;
      setTimeout(resumeAutoplay, 350); // Resume after swipe
    });
  }

  // Initialize
  showSlide(0);
  resetAutoplay();
});
