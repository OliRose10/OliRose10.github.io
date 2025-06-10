document.addEventListener("DOMContentLoaded", function () {
  const stats = document.querySelectorAll('.stat-number');
  let animated = false;
  function animateStats() {
    if (animated) return;
    stats.forEach(stat => {
      const end = +stat.getAttribute('data-count');
      let start = 0;
      const inc = Math.max(1, Math.floor(end / 100));
      function update() {
        start += inc;
        if (start >= end) {
          stat.textContent = end.toLocaleString();
        } else {
          stat.textContent = start.toLocaleString();
          requestAnimationFrame(update);
        }
      }
      update();
    });
    animated = true;
  }
  // Animate when stats row is in viewport
  const row = document.querySelector('.stats-row');
  if (!row) return;
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) animateStats();
  }, { threshold: 0.3 });
  observer.observe(row);
});
