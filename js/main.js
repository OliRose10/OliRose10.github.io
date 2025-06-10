// Typewriter effect for hero
document.addEventListener("DOMContentLoaded", function() {
  const typewriter = document.getElementById('typewriterText');
  if (typewriter) {
    const text = "Specialist finance, tax & business support for musicians, indie labels & creatives.";
    let i = 0;
    function typing() {
      if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(typing, 27 + Math.random() * 30);
      } else {
        typewriter.textContent += " ";
      }
    }
    typing();
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
      const item = btn.closest('.faq-item');
      item.classList.toggle('open');
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
    });
  });

  // Back to Top Button
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Theme toggle (light/dark)
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      let theme = document.documentElement.getAttribute('data-theme');
      if (theme === "light") {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.querySelector('i').className = 'fa-solid fa-sun';
        themeBtn.querySelector('span').textContent = 'Light Mode';
        localStorage.setItem('olirose-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeBtn.querySelector('i').className = 'fa-solid fa-moon';
        themeBtn.querySelector('span').textContent = 'Dark Mode';
        localStorage.setItem('olirose-theme', 'light');
      }
    });
    // On load, set theme from storage
    let saved = localStorage.getItem('olirose-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
      themeBtn.querySelector('i').className = saved === "dark" ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      themeBtn.querySelector('span').textContent = saved === "dark" ? 'Light Mode' : 'Dark Mode';
    }
  }

  // Nav active link aria
  document.querySelectorAll('nav#navMenu .nav-link').forEach(link => {
    link.addEventListener('click', function() {
      document.querySelectorAll('nav#navMenu .nav-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('nav#navMenu .nav-link').forEach(l => l.removeAttribute('aria-current'));
      this.setAttribute('aria-current', 'page');
    });
  });
});
