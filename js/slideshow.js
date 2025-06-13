document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slideshow-dot');
  const arrows = document.querySelectorAll('.slideshow-arrow');
  const progressBar = document.querySelector('.slideshow-progress');
  const slideshow = document.querySelector('.slideshow');
  let currentSlide = 0;
  const interval = 3500;
  let autoplayTimer = null;
  let progressTimer = null;
  let isPaused = false;

  function showSlide(n) {
    currentSlide = n;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === n));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === n));
    resetTimers();
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }
  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  function resetTimers() {
    clearInterval(autoplayTimer);
    clearInterval(progressTimer);
    if (isPaused) {
      if (progressBar) progressBar.style.width = "0%";
      return;
    }
    let startTime = Date.now();
    if (progressBar) progressBar.style.width = "0%";
    progressTimer = setInterval(() => {
      if (isPaused) return;
      let percent = Math.min(100, ((Date.now() - startTime) / interval) * 100);
      if (progressBar) progressBar.style.width = percent + "%";
      if (percent >= 100) clearInterval(progressTimer);
    }, 20);
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, interval);
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
      resetTimers();
    }
  }

  // Controls
  if (arrows[0]) arrows[0].onclick = prevSlide;
  if (arrows[1]) arrows[1].onclick = nextSlide;
  dots.forEach((dot, idx) => dot.onclick = () => showSlide(idx));

  // Keyboard nav (when focused)
  if (slideshow) {
    slideshow.tabIndex = 0;
    slideshow.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { prevSlide(); e.preventDefault(); }
      if (e.key === "ArrowRight") { nextSlide(); e.preventDefault(); }
    });
  }

  // Pause/resume on hover/focus/touch
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
      setTimeout(resumeAutoplay, 350);
    });
  }

  // Initialize
  showSlide(0);
});
