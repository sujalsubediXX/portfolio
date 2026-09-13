const yearElement = document.querySelector('#datenow');
if (yearElement) yearElement.textContent = new Date().getFullYear();

const hamburger = document.querySelector('#hamburger');
const navLinks = document.querySelector('#navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }));
}

const themeOptions = document.querySelectorAll('.theme-option');
const themeValues = {
  dark: ['#1b1115', '#24171c', '#f6efed', '#bbaeb0', 'rgba(246,239,237,.13)', '#ef9eaf', '#8b5968'],
  light: ['#f8f2ef', '#fffaf8', '#26191d', '#715e63', 'rgba(38,25,29,.15)', '#b74460', '#c98a99']
};
const setTheme = (theme) => {
  document.body.dataset.theme = theme;
  themeOptions.forEach((option) => option.classList.toggle('active', option.dataset.theme === theme));
  const values = theme === 'light' ? themeValues.light : themeValues.dark;
  ['--bg', '--surface', '--text', '--muted', '--line', '--pink', '--pink-dim'].forEach((name, index) => {
    document.documentElement.style.setProperty(name, values[index]);
  });
  localStorage.setItem('portfolio-theme', theme);
};
themeOptions.forEach((option) => option.addEventListener('click', () => setTheme(option.dataset.theme)));
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) setTheme(savedTheme);

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach((item) => item.classList.toggle('active', item === button));
  projectCards.forEach((card) => card.classList.toggle('is-hidden', filter !== 'all' && !card.dataset.tech.includes(filter)));
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
