const config = window.SOE_CONFIG || { globalYoutube: "https://www.youtube.com/", links: {} };

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const managedVideos = document.querySelectorAll('.managed-video');
const fadeItems = document.querySelectorAll('.fade-up');
const sectionAnchors = document.querySelectorAll('.main-nav a, .page-index a, .mobile-menu a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');

function applyLinks() {
  const globalDesktop = document.getElementById('globalYoutubeLink');
  const globalMobile = document.getElementById('mobileYoutubeLink');
  if (globalDesktop) globalDesktop.href = config.globalYoutube;
  if (globalMobile) globalMobile.href = config.globalYoutube;

  document.querySelectorAll('[data-link-key]').forEach((link) => {
    const key = link.dataset.linkKey;
    link.href = config.links[key] || config.globalYoutube || 'https://www.youtube.com/';
  });
}

applyLinks();

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

document.querySelectorAll('.mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

fadeItems.forEach(item => fadeObserver.observe(item));

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const video = entry.target;
    if (entry.isIntersecting) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });
}, { threshold: 0.45 });

managedVideos.forEach(video => {
  video.muted = true;
  video.playsInline = true;
  video.loop = true;
  videoObserver.observe(video);
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    sectionAnchors.forEach((anchor) => {
      const target = anchor.getAttribute('href')?.replace('#', '');
      anchor.classList.toggle('active', target === id || anchor.dataset.target === id);
    });
  });
}, { threshold: 0.45, rootMargin: '-20% 0px -35% 0px' });

sections.forEach(section => sectionObserver.observe(section));
