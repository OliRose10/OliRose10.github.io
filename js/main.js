// main.js — Modern, expanded, modular, and practical
// Author: OliRose10 | Last updated: 2025-06-10

// Preloader
window.addEventListener('load', function () {
  setTimeout(() => {
    document.getElementById('preloader').style.display = 'none';
  }, 800);
});

// Theme Switcher
(function(){
  const root = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn.querySelector('i');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let userTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
  setTheme(userTheme);

  themeToggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(current);
    localStorage.setItem('theme', current);
  });

  function setTheme(mode) {
    root.setAttribute('data-theme', mode);
    if (mode === 'dark') {
      themeToggleBtn.querySelector('span').textContent = 'Light Mode';
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      themeToggleBtn.querySelector('span').textContent = 'Dark Mode';
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }
})();

// Mobile Menu Toggle
(function(){
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const navMenu = document.getElementById('navMenu');
  let navOpen = false;
  menuToggleBtn.addEventListener('click', () => {
    navOpen = !navOpen;
    navMenu.classList.toggle('show', navOpen);
    menuToggleBtn.setAttribute('aria-expanded', navOpen);
    menuToggleBtn.querySelector('i').classList.toggle('fa-bars', !navOpen);
    menuToggleBtn.querySelector('i').classList.toggle('fa-xmark', navOpen);
    if (navOpen) navMenu.scrollIntoView({behavior: 'smooth'});
  });
  navMenu.querySelectorAll('.nav-link').forEach(link =>
    link.addEventListener('click', () => {
      if (window.innerWidth < 900 && navOpen) {
        navMenu.classList.remove('show');
        navOpen = false;
        menuToggleBtn.setAttribute('aria-expanded', false);
        menuToggleBtn.querySelector('i').classList.add('fa-bars');
        menuToggleBtn.querySelector('i').classList.remove('fa-xmark');
      }
    })
  );
})();

// Typewriter Effect
(function(){
  const el = document.getElementById('typewriterText');
  if (!el) return;
  const phrases = [
    "Finance, tax, and business for indie musicians.",
    "Clarity, trust, and real music industry expertise.",
    "Bookkeeping, tax returns, royalty management.",
    "Light & dark mode for your creative flow.",
    "Let’s make your money sing."
  ];
  let idx = 0, char = 0, erasing = false, pause = false;

  function typeLoop() {
    if (!el) return;
    let phrase = phrases[idx];
    if (!erasing) {
      el.textContent = phrase.slice(0, char+1);
      char++;
      if (char === phrase.length) {
        erasing = true;
        pause = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, char-1);
      char--;
      if (char === 0) {
        erasing = false;
        idx = (idx + 1) % phrases.length;
        pause = true;
        setTimeout(typeLoop, 900);
        return;
      }
    }
    setTimeout(typeLoop, pause ? 40 : (erasing ? 22 : 55));
    pause = false;
  }
  typeLoop();
})();

// Stats Counter Animation (Hero)
(function(){
  function animateCount(el, target, duration) {
    let start = 0;
    const step = () => {
      let now = +el.textContent.replace(/[^0-9]/g,"");
      let increment = Math.ceil((target - now) / 7);
      if (now < target) {
        el.textContent = now + increment;
        setTimeout(step, Math.max(10, duration / (target-now+1)));
      } else {
        el.textContent = target;
      }
    };
    step();
  }
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-number').forEach(el => {
      let val = parseInt(el.getAttribute('data-count'), 10);
      animateCount(el, val, 1200);
    });
  });
})();

// Tabs
(function(){
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');
  tabLinks.forEach(btn => btn.addEventListener('click', function () {
    tabLinks.forEach(b => b.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    this.classList.add('active');
    const tab = this.getAttribute('data-tab');
    document.getElementById(tab).classList.add('active');
  }));
})();

// FAQ Accordion
(function(){
  const faqs = document.querySelectorAll('.faq-item');
  faqs.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');
      faqs.forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
})();

// Portfolio Filter
(function(){
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(btn => btn.addEventListener('click', function() {
    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.getAttribute('data-filter');
    items.forEach(it => {
      if (filter === 'all' || it.dataset.category === filter) it.style.display = '';
      else it.style.display = 'none';
    });
  }));
})();

// Testimonials Carousel
(function(){
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const items = track.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let idx = 0;
  function update() {
    items.forEach((it,i) => it.classList.toggle('active', i === idx));
  }
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { idx = (idx-1+items.length)%items.length; update(); });
    nextBtn.addEventListener('click', () => { idx = (idx+1)%items.length; update(); });
  }
  // Auto-advance every 6s
  setInterval(() => {
    idx = (idx+1)%items.length; update();
  }, 6000);
})();

// Smooth Scroll to Anchors
(function(){
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// Newsletter Modal
(function(){
  const modal = document.getElementById('newsletterModal');
  const closeBtn = document.getElementById('modalClose');
  const showNewsletter = () => modal.classList.remove('hide');
  const hideNewsletter = () => modal.classList.add('hide');
  if (closeBtn) closeBtn.addEventListener('click', hideNewsletter);
  if (modal && !sessionStorage.getItem('newsletter_shown')) {
    setTimeout(() => {
      showNewsletter();
      sessionStorage.setItem('newsletter_shown', 'yes');
    }, 9000);
  }
  const subForm = document.getElementById('modalSubscribeForm');
  if (subForm) {
    subForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert("Thank you for subscribing!");
      hideNewsletter();
    });
  }
})();

// Standalone Newsletter Subscribe Section
(function(){
  const form = document.getElementById('subscribeForm');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const inp = form.querySelector('input[name="newsletterEmail"]');
      if (inp.value.trim().length > 3 && inp.value.includes('@')) {
        alert("Thank you for subscribing!");
        form.reset();
      } else {
        inp.classList.add('error');
      }
    });
  }
})();

// Live Chat Widget
(function(){
  const chatBtn = document.getElementById('chatToggle');
  const chatBox = document.getElementById('chatBox');
  const chatWidget = document.getElementById('liveChat');
  const chatClose = document.getElementById('chatClose');
  if (!chatBtn || !chatBox || !chatWidget) return;
  chatBtn.addEventListener('click', () => {
    chatBox.classList.toggle('hide');
    chatWidget.classList.toggle('active');
    if (!chatBox.classList.contains('hide')) {
      chatBox.querySelector('input[type="text"]').focus();
    }
  });
  if (chatClose) chatClose.addEventListener('click', () => chatBox.classList.add('hide'));
  // Basic chat form logic
  const chatForm = document.getElementById('chatForm');
  const chatMessages = chatBox.querySelector('.chat-messages');
  if (chatForm && chatMessages) {
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = chatForm.querySelector('input[type="text"]');
      const msg = input.value.trim();
      if (msg.length === 0) return;
      const div = document.createElement('p');
      div.className = 'chat-message user';
      div.textContent = msg;
      chatMessages.appendChild(div);
      input.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;
      setTimeout(() => {
        const reply = document.createElement('p');
        reply.className = 'chat-message bot';
        reply.textContent = "We'll get back to you ASAP!";
        chatMessages.appendChild(reply);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 700);
    });
  }
})();

// Back to Top Button
(function(){
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btn.classList.add('show');
    else btn.classList.remove('show');
  });
  btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
})();

// Contact Form Validation
(function(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input[required],textarea[required]').forEach(inp => {
      if (!inp.value.trim()) {
        inp.classList.add('error');
        valid = false;
      } else {
        inp.classList.remove('error');
      }
    });
    if (valid) {
      alert('Thank you for your message! We will reply soon.');
      form.reset();
    }
  });
})();

// Accessibility: Skip Link Focus
(function(){
  const skip = document.querySelector('.skip-link');
  if (skip) {
    skip.addEventListener('focus', () => skip.style.top = '0');
    skip.addEventListener('blur', () => skip.style.top = '-40px');
  }
})();

// Animate Sections on Scroll
(function(){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        entry.target.classList.remove('fade-in');
      }
    });
  }, { threshold: 0.22 });
  document.querySelectorAll('.fade-in').forEach(sec => observer.observe(sec));
})();
