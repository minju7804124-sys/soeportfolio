
const config = window.SOE_CONFIG || { globalYoutube: 'https://www.youtube.com/', links: {} };

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const managedVideos = document.querySelectorAll('.managed-video');
const fadeItems = document.querySelectorAll('.fade-up');
const sectionAnchors = document.querySelectorAll('.main-nav a, .mobile-menu a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');
const keyToPage = { home:'01', about:'02', film:'03', animation:'04', commercial:'06', works:'09', contact:'13' };

function applyLinks() {
  document.querySelectorAll('[data-link-key]').forEach((link) => {
    const key = link.dataset.linkKey;
    link.href = config.links[key] || config.globalYoutube || 'https://www.youtube.com/';
  });
}
applyLinks();

if (menuToggle) {
  menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}
document.querySelectorAll('.mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
fadeItems.forEach(item => fadeObserver.observe(item));

managedVideos.forEach((video) => {
  const shell = video.closest('.page-shell');
  video.muted = true;
  video.playsInline = true;
  video.loop = false;
  video.preload = 'auto';
  video.addEventListener('ended', () => {
    if (shell) shell.classList.add('ended');
    video.pause();
  });
});

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const video = entry.target;
    const shell = video.closest('.page-shell');
    if (entry.isIntersecting) {
      if (shell?.classList.contains('ended')) return;
      video.play().catch(() => {});
    } else {
      if (!shell?.classList.contains('ended')) {
        video.pause();
      }
    }
  });
}, { threshold: 0.72 });
managedVideos.forEach(video => videoObserver.observe(video));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    const navKey = entry.target.dataset.nav;
    sectionAnchors.forEach((anchor) => {
      const hrefId = anchor.getAttribute('href')?.replace('#', '');
      const shouldActivate = hrefId === id || (navKey && hrefId === `page-${keyToPage[navKey]}`);
      anchor.classList.toggle('active', shouldActivate);
    });
  });
}, { threshold: 0.65 });
sections.forEach(section => sectionObserver.observe(section));
