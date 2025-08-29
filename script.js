// Theme toggle with localStorage
const toggle = document.getElementById('themeToggle');
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();

const THEME_KEY = 'prefers-dark';
function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  toggle.textContent = dark ? '☀️' : '🌙';
  toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
applyTheme(localStorage.getItem(THEME_KEY) === '1');

toggle.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark');
  applyTheme(dark);
  localStorage.setItem(THEME_KEY, dark ? '1' : '0');
});

// Smooth active nav highlighting on scroll
const sections = document.querySelectorAll('main .section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');

function onScroll() {
  let fromTop = window.scrollY + 120;
  sections.forEach(sec => {
    const id = sec.getAttribute('id');
    if (!id) return;
    const link = document.querySelector('.nav-links a[href="#' + id + '"]');
    if (!link) return;
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    if (fromTop >= top && fromTop < bottom) {
      navLinks.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', onScroll);
