const config = window.SOE_CONFIG || { globalYoutube: 'https://www.youtube.com/', links: {} };

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const managedVideos = document.querySelectorAll('.managed-video');
const fadeItems = document.querySelectorAll('.fade-up');
const sectionAnchors = document.querySelectorAll('.main-nav a, .page-index a, .mobile-menu a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');

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

const playedOnce = new WeakSet();
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const video = entry.target;
    if (entry.isIntersecting) {
      if (!playedOnce.has(video)) {
        video.currentTime = 0;
        video.play().catch(() => {});
        playedOnce.add(video);
      } else {
        video.play().catch(() => {});
      }
    } else {
      video.pause();
    }
  });
}, { threshold: 0.7 });

managedVideos.forEach(video => {
  video.muted = true;
  video.playsInline = true;
  video.loop = false;
  videoObserver.observe(video);
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    const navKey = entry.target.dataset.nav;
    sectionAnchors.forEach((anchor) => {
      const hrefId = anchor.getAttribute('href')?.replace('#', '');
      const dataTarget = anchor.dataset.target;
      const isPageIndex = !!dataTarget;
      const shouldActivate = isPageIndex ? dataTarget === id : hrefId === id || (navKey && hrefId === `page-${({home:'01',about:'02',film:'03',animation:'04',commercial:'06',works:'09',contact:'13'})[navKey]}`);
      anchor.classList.toggle('active', shouldActivate);
    });
  });
}, { threshold: 0.65 });
sections.forEach(section => sectionObserver.observe(section));
