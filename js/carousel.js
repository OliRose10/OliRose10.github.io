document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const items = track.querySelectorAll('.carousel-item');
  const prev = document.querySelector('.carousel-btn.prev');
  const next = document.querySelector('.carousel-btn.next');
  let idx = 0, len = items.length;

  function show(i) {
    items.forEach((it, j) => it.classList.toggle('active', j === i));
  }
  function nextItem() {
    idx = (idx + 1) % len;
    show(idx);
  }
  function prevItem() {
    idx = (idx - 1 + len) % len;
    show(idx);
  }
  next.addEventListener('click', nextItem);
  prev.addEventListener('click', prevItem);

  // Auto-scroll every 6s
  setInterval(nextItem, 6000);

  // Touch swipe support for mobile
  let startX = null;
  track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  track.addEventListener('touchend', e => {
    if (!startX) return;
    let dx = e.changedTouches[0].clientX - startX;
    if (dx < -40) nextItem();
    else if (dx > 40) prevItem();
    startX = null;
  });
});
