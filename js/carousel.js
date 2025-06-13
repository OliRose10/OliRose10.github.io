document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const items = track.querySelectorAll('.carousel-item');
  const prev = document.querySelector('.carousel-btn.prev');
  const next = document.querySelector('.carousel-btn.next');
  const dots = document.querySelectorAll('.carousel-dot');
  const carousel = document.querySelector('.testimonial-carousel');
  let idx = 0, len = items.length;
  let intervalId = null;
  const INTERVAL_MS = 3500;
  let paused = false;

  function show(i) {
    idx = i;
    items.forEach((it, j) => it.classList.toggle('active', j === i));
    dots.forEach((dot, j) => dot.classList.toggle('active', j === i));
    resetInterval();
  }
  function nextItem() { show((idx + 1) % len); }
  function prevItem() { show((idx - 1 + len) % len); }

  function clearCarouselInterval() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
  }

  function resetInterval() {
    clearCarouselInterval();
    if (!paused) {
      intervalId = setInterval(nextItem, INTERVAL_MS);
    }
  }

  function pauseCarousel() {
    paused = true;
    clearCarouselInterval();
  }
  function resumeCarousel() {
    paused = false;
    resetInterval();
  }

  // Navigation buttons
  if (next) next.addEventListener('click', nextItem);
  if (prev) prev.addEventListener('click', prevItem);

  // Dot navigation
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));

  // Keyboard navigation (when carousel is focused)
  if (carousel) {
    carousel.tabIndex = 0; // Focusable for accessibility
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { prevItem(); e.preventDefault(); }
      if (e.key === 'ArrowRight') { nextItem(); e.preventDefault(); }
    });
    // Pause/resume on hover/focus
    carousel.addEventListener('mouseenter', pauseCarousel);
    carousel.addEventListener('mouseleave', resumeCarousel);
    carousel.addEventListener('focusin', pauseCarousel);
    carousel.addEventListener('focusout', resumeCarousel);
  }

  // Touch swipe support for mobile
  let startX = null;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; pauseCarousel(); }, {passive:true});
  track.addEventListener('touchend', e => {
    if (startX === null) return;
    let dx = e.changedTouches[0].clientX - startX;
    if (dx < -40) nextItem();
    else if (dx > 40) prevItem();
    startX = null;
    setTimeout(resumeCarousel, 350);
  });

  show(0); // Initialize and start the timer
});
