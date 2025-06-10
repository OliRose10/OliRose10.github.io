// Advanced slideshow with: autoplay, pause on hover, dots, arrows, keyboard, swipe, progress bar
document.addEventListener("DOMContentLoaded", function() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slideshow-dot');
  const arrows = document.querySelectorAll('.slideshow-arrow');
  const progressBar = document.querySelector('.slideshow-progress');
  let autoplayTimer, progressTimer, progress = 0;
  let currentSlide = 0, isPaused = false, interval = 6000;

  function showSlide(n, userTriggered = false) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === n));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === n));
    if (progressBar) progressBar.style.width = "0%";
    currentSlide = n;
    progress = 0;
    if (!userTriggered) startProgressBar();
  }
  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }
  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }
  function startProgressBar() {
    if (!progressBar) return;
    progressBar.style.width = "0%";
    let start = Date.now();
    clearInterval(progressTimer);
    progressTimer = setInterval(() => {
      if (isPaused) return;
      let percent = Math.min(100, ((Date.now()-start)/interval)*100);
      progressBar.style.width = percent + "%";
      if (percent >= 100) clearInterval(progressTimer);
    }, 20);
  }
  function startAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(nextSlide, interval);
    startProgressBar();
  }
  function pauseAutoplay() {
    isPaused = true;
    clearInterval(autoplayTimer);
    clearInterval(progressTimer);
    if (progressBar) progressBar.style.width = "0%";
  }
  function resumeAutoplay() {
    isPaused = false;
    startAutoplay();
  }
  // Arrow controls
  if (arrows[0]) arrows[0].onclick = prevSlide;
  if (arrows[1]) arrows[1].onclick = nextSlide;
  // Dots
  dots.forEach((dot, idx) => dot.onclick = () => showSlide(idx, true));
  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });
  // Pause on hover/touch
  const slideshow = document.querySelector('.slideshow');
  if (slideshow) {
    slideshow.addEventListener('mouseenter', pauseAutoplay);
    slideshow.addEventListener('mouseleave', resumeAutoplay);
    slideshow.addEventListener('touchstart', pauseAutoplay);
    slideshow.addEventListener('touchend', resumeAutoplay);
    // Swipe
    let startX = null;
    slideshow.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
    slideshow.addEventListener('touchend', e => {
      if (startX !== null) {
        let dx = e.changedTouches[0].clientX - startX;
        if (dx > 44) prevSlide();
        else if (dx < -44) nextSlide();
      }
      startX = null;
    });
  }
  // Initialize
  showSlide(0);
  startAutoplay();
});
