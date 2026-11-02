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

// Keep the decorative animation looping without an on-page pause control.
const video = document.querySelector('.orb-video');
const art = document.querySelector('.orb-art');
if (video && art) {
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  const play = () => video.play().catch(() => {});
  video.addEventListener('playing', () => art.classList.add('is-playing'));
  video.addEventListener('error', () => art.classList.remove('is-playing'));
  video.querySelectorAll('source').forEach(source => source.addEventListener('error', () => art.classList.remove('is-playing')));
  video.addEventListener('canplay', play);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) play(); });
  play();
}

