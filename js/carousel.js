// Bulletproof Carousel: consistent timing, never gets stuck, resets on every navigation
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
  let userInteracted = false;

  function show(i) {
    idx = i;
    items.forEach((it, j) => it.classList.toggle('active', j === i));
    dots.forEach((dot, j) => dot.classList.toggle('active', j === i));
    resetInterval();
  }
  function nextItem() {
    show((idx + 1) % len);
  }
  function prevItem() {
    show((idx - 1 + len) % len);
  }

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

  // Navigation buttons
  if (next) next.addEventListener('click', () => { userInteracted = true; nextItem(); });
  if (prev) prev.addEventListener('click', () => { userInteracted = true; prevItem(); });

  // Dot navigation
  dots.forEach((dot, i) => dot.addEventListener('click', () => { userInteracted = true; show(i); }));

  // Keyboard navigation (when carousel is focused)
  if (carousel) {
    carousel.tabIndex = 0; // Focusable for accessibility
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { userInteracted = true; prevItem(); e.preventDefault(); }
      if (e.key === 'ArrowRight') { userInteracted = true; nextItem(); e.preventDefault(); }
    });
    // Pause/resume on hover/focus
    ['mouseenter', 'focusin'].forEach(evt =>
      carousel.addEventListener(evt, () => { paused = true; clearCarouselInterval(); })
    );
    ['mouseleave', 'focusout'].forEach(evt =>
      carousel.addEventListener(evt, () => { paused = false; resetInterval(); })
    );
  }

  // Touch swipe support for mobile
  let startX = null;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; paused = true; clearCarouselInterval(); }, {passive:true});
  track.addEventListener('touchend', e => {
    if (startX === null) return;
    let dx = e.changedTouches[0].clientX - startX;
    userInteracted = true;
    if (dx < -40) nextItem();
    else if (dx > 40) prevItem();
    startX = null;
    setTimeout(() => { paused = false; resetInterval(); }, 350);
  });

  show(0); // Initialize and start the timer
});
