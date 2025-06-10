// Testimonial carousel with: autoplay, dots, arrows, keyboard, swipe
document.addEventListener("DOMContentLoaded", function() {
  const items = document.querySelectorAll('.carousel-item');
  const btnPrev = document.querySelector('.carousel-btn.prev');
  const btnNext = document.querySelector('.carousel-btn.next');
  const dots = document.querySelectorAll('.carousel-dot');
  let current = 0;
  let timer;
  function show(idx) {
    items.forEach((el,i)=>el.classList.toggle('active',i===idx));
    dots.forEach((d,i)=>d.classList.toggle('active',i===idx));
    current = idx;
  }
  function next() { show((current+1)%items.length);}
  function prev() { show((current-1+items.length)%items.length);}
  btnPrev && (btnPrev.onclick = prev);
  btnNext && (btnNext.onclick = next);
  dots.forEach((dot,i)=>dot.onclick=()=>show(i));
  // Autoplay
  function start() {
    timer = setInterval(next, 7500);
  }
  function stop() {
    clearInterval(timer);
  }
  document.querySelector('.testimonial-carousel').addEventListener('mouseenter', stop);
  document.querySelector('.testimonial-carousel').addEventListener('mouseleave', start);
  // Swipe
  let startX = null;
  let carousel = document.querySelector('.testimonial-carousel');
  carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
  carousel.addEventListener('touchend', e => {
    if (startX !== null) {
      let dx = e.changedTouches[0].clientX - startX;
      if (dx > 44) prev();
      else if (dx < -44) next();
    }
    startX = null;
  });
  // Keyboard
  carousel.addEventListener('keydown', (e)=>{
    if(e.key==="ArrowLeft") prev();
    if(e.key==="ArrowRight") next();
  });
  show(0);
  start();
});
