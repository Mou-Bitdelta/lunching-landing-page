// Change destinations here when campaign-specific download URLs are available.
const links = {
  ios: 'https://apps.apple.com/app/id6753858592',
  android: 'https://bitdelta.pro/platforms/bitdelta-terminal/',
  vip: 'https://bitdelta.pro/vip-account-bonus-terms-and-conditions/',
  x: 'https://x.com/bitdeltapro?s=20',
  facebook: 'https://www.facebook.com/bitdeltapro/reels/',
  instagram: 'https://www.instagram.com/bitdeltapro',
  telegram: 'https://bitdelta.pro/contact/'
};
document.querySelectorAll('[data-link]').forEach(a => {
  if (links[a.dataset.link]) a.href = links[a.dataset.link];
});

const video = document.querySelector('.orb-video');
const art = document.querySelector('.orb-art');
const control = document.querySelector('.motion-control');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let manuallyPaused = false;
const label = () => {
  const text = video.paused ? 'Play animation' : 'Pause animation';
  control.textContent = text;
  control.setAttribute('aria-label', text);
};
video.addEventListener('playing', () => {
  art.classList.add('is-playing');
  control.hidden = false;
  label();
});
video.addEventListener('pause', label);
video.addEventListener('error', () => {
  art.classList.remove('is-playing');
  control.hidden = true;
});
control.addEventListener('click', () => {
  manuallyPaused = !video.paused;
  if (video.paused) video.play().catch(() => {});
  else video.pause();
});
const observer = new IntersectionObserver(entries => {
  const visible = entries[0].isIntersecting;
  if (visible && !manuallyPaused && !reducedMotion.matches) video.play().catch(() => {});
  else video.pause();
}, {rootMargin:'150px'});
observer.observe(art);
const respectMotion = () => {
  if (reducedMotion.matches) { video.pause(); art.classList.remove('is-playing'); control.hidden = true; }
  else if (!manuallyPaused && art.getBoundingClientRect().top < innerHeight + 150 && art.getBoundingClientRect().bottom > -150) video.play().catch(() => {});
};
reducedMotion.addEventListener('change', respectMotion);
respectMotion();
document.addEventListener('visibilitychange', () => {
  if (document.hidden) video.pause();
  else if (!manuallyPaused && !reducedMotion.matches && art.getBoundingClientRect().top < innerHeight + 150 && art.getBoundingClientRect().bottom > -150) video.play().catch(() => {});
});
