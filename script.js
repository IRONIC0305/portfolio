// Mobile nav toggle, close-on-link-click, scroll-spy active link, footer year.

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Highlight the nav link for whichever section is currently in view.
const sections = document.querySelectorAll('main section[id]');
const linksBySectionId = new Map(
  Array.from(navLinks.querySelectorAll('a')).map((a) => [a.getAttribute('href').slice(1), a])
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const link = linksBySectionId.get(entry.target.id);
      if (!link) return;
      link.classList.toggle('is-active', entry.isIntersecting);
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((section) => observer.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();
