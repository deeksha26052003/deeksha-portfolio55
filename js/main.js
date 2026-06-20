function showPage(pageId) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  document.querySelectorAll('.nav-links a').forEach(function(a) { a.classList.remove('active-link'); });
  var page = document.getElementById(pageId);
  if (page) page.classList.add('active');
  var link = document.querySelector('.nav-links a[href="#' + pageId + '"]');
  if (link) link.classList.add('active-link');
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  var thumb = document.getElementById('toggleThumb');
  if (document.body.classList.contains('dark')) {
    thumb.style.transform = 'translateX(4px)';
    localStorage.setItem('theme', 'dark');
  } else {
    thumb.style.transform = 'translateX(0)';
    localStorage.setItem('theme', 'light');
  }
}

function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.querySelector('.nav-links').classList.toggle('open');
}

var currentSlide = 0;
var totalSlides = 4;

function changeSlide(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  updateCarousel();
}

function goToSlide(n) {
  currentSlide = n;
  updateCarousel();
}

function updateCarousel() {
  document.querySelectorAll('.carousel-card').forEach(function(c, i) {
    c.classList.toggle('active', i === currentSlide);
  });
  document.querySelectorAll('.dot').forEach(function(d, i) {
    d.classList.toggle('active', i === currentSlide);
  });
}

showPage('home');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

document.querySelectorAll('.nav-links a').forEach(function(a) {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    showPage(a.getAttribute('href').replace('#', ''));
    document.getElementById('hamburger').classList.remove('open');
    document.querySelector('.nav-links').classList.remove('open');
  });
});

var names = ["Deeksha 👩🏻‍💻", "a Software Developer 💻", "a Data Scientist 📊", "an AI/ML Engineer 🤖"];
var nameIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  var typedEl = document.getElementById('typed-name');
  if (!typedEl) return;
  var current = names[nameIndex];
  if (isDeleting) { typedEl.textContent = current.substring(0, charIndex - 1); charIndex--; }
  else { typedEl.textContent = current.substring(0, charIndex + 1); charIndex++; }
  if (!isDeleting && charIndex === current.length) setTimeout(function() { isDeleting = true; }, 1500);
  else if (isDeleting && charIndex === 0) { isDeleting = false; nameIndex = (nameIndex + 1) % names.length; }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

var spoken = false;
document.getElementById('home').addEventListener('click', function() {
  if (spoken) return;
  spoken = true;
  window.speechSynthesis.cancel();
  var u = new SpeechSynthesisUtterance("Hi! I'm Deeksha. I'm a Software Developer, Data Scientist, and AI ML Engineer. Welcome to my portfolio!");
  u.rate = 0.9; u.pitch = 1.3; u.volume = 1;
  var voices = window.speechSynthesis.getVoices();
  var female = voices.find(function(v) {
    return v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Victoria');
  });
  if (female) u.voice = female;
  window.speechSynthesis.speak(u);
});

particlesJS('particles-js', {
  particles: {
    number: { value: 60 },
    color: { value: '#e75480' },
    shape: { type: 'circle' },
    opacity: { value: 0.3 },
    size: { value: 3 },
    line_linked: {
      enable: true, distance: 150,
      color: '#e75480', opacity: 0.2, width: 1
    },
    move: {
      enable: true, speed: 2,
      direction: 'none', random: true, out_mode: 'out'
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: true, mode: 'push' }
    }
  }
});