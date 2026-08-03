/* Master JS file — no dependencies. */

const header = document.getElementById('site-header');
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = [...document.querySelectorAll('.nav__list a')];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* --- Mobile navigation -------------------------------------------------- */

const setNavOpen = (open) => {
  nav.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
};

navToggle.addEventListener('click', () => {
  setNavOpen(!nav.classList.contains('is-open'));
});

nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setNavOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) {
    setNavOpen(false);
    navToggle.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!nav.classList.contains('is-open')) return;
  if (!nav.contains(event.target) && !navToggle.contains(event.target)) setNavOpen(false);
});

/* --- Header state ------------------------------------------------------- */

const updateHeader = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 40);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

/* --- Scroll reveal ------------------------------------------------------ */

const revealables = [...document.querySelectorAll('[data-reveal]')];

if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, index) => {
          // Stagger items that come into view together.
          entry.target.style.setProperty('--reveal-delay', `${index * 70}ms`);
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
  );

  revealables.forEach((el) => revealObserver.observe(el));
}

/* --- Active section in the nav ------------------------------------------ */

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  const spyObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActive(visible.target.id);
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.25, 0.5] }
  );

  sections.forEach((section) => spyObserver.observe(section));
}

/* --- Age ---------------------------------------------------------------- */

/* Keeps the "j'ai N ans" sentence from going stale. Set the real date in the
   data-birthdate attribute in index.html. */
const ageEl = document.querySelector('[data-age]');

if (ageEl?.dataset.birthdate) {
  const birth = new Date(ageEl.dataset.birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDelta = today.getMonth() - birth.getMonth();

  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birth.getDate())) age -= 1;

  if (Number.isFinite(age) && age > 0) ageEl.textContent = String(age);
}
