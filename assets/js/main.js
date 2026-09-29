// Page behaviour: sticky header state, smart store links, scroll reveals, screenshot reel.

const STORE_URLS = {
  ios: 'https://apps.apple.com/us/app/skintheory-skin-acne-tracker/id1490049787',
  android: 'https://play.google.com/store/apps/details?id=com.skintheory.skintheory',
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.documentElement.classList.add('js');

initHeader();
initStoreLinks();
initReveals();
initReel();

function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const update = () => header.classList.toggle('is-stuck', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

// On a phone, "Get the app" goes straight to that phone's store.
function initStoreLinks() {
  const platform = detectPlatform();
  if (!platform) return;

  document.querySelectorAll('[data-store-link]').forEach((link) => {
    link.href = STORE_URLS[platform];
  });
}

function detectPlatform() {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return 'android';
  // iPadOS reports itself as a Mac, so check for touch as well.
  const isIpad = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/.test(ua) || isIpad) return 'ios';
  return null;
}

function initReveals() {
  const targets = document.querySelectorAll('[data-reveal], [data-draw]');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
  );
  targets.forEach((el) => observer.observe(el));
}

// Turns the screenshot strip into an endless marquee by cloning the set until
// it covers the viewport twice over, then sliding the track by one set width.
function initReel() {
  const reel = document.querySelector('[data-reel]');
  const track = reel?.querySelector('[data-reel-track]');
  const original = track?.firstElementChild;
  const toggle = reel?.querySelector('[data-reel-toggle]');
  if (!original || reducedMotion.matches) return;

  const SPEED = 26; // px per second

  const fill = () => {
    const setWidth = original.offsetWidth;
    if (!setWidth) return;

    const needed = Math.ceil(window.innerWidth / setWidth) + 1;
    while (track.children.length < needed) {
      const clone = original.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('img').forEach((img) => (img.alt = ''));
      track.append(clone);
    }
    reel.style.setProperty('--reel-shift', `${setWidth}px`);
    reel.style.setProperty('--reel-duration', `${setWidth / SPEED}s`);
  };

  fill();
  reel.scrollLeft = 0;
  reel.classList.add('is-animated');
  window.addEventListener('resize', fill);

  toggle?.addEventListener('click', () => {
    const paused = reel.classList.toggle('is-paused');
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.querySelector('.visually-hidden').textContent = paused
      ? 'Play the moving screenshots'
      : 'Pause the moving screenshots';
  });
}
