const bellBtn = document.getElementById('bellBtn');
const bellSound = document.getElementById('bellSound');
const memeStage = document.getElementById('memeStage');
const arteta = document.getElementById('arteta-template');

function spawnMeme() {
  const img = new Image();
  img.src = arteta.src;
  img.className = 'meme-popup';
  // slight random horizontal offset so multiple taps don't stack perfectly
  const offset = (Math.random() - 0.5) * 60;
  img.style.marginLeft = offset + 'px';
  memeStage.appendChild(img);
  img.addEventListener('animationend', () => img.remove());
}

function playBell() {
  bellSound.currentTime = 0;
  bellSound.play().catch(() => {});
}

function ringBell() {
  // restart shake animation
  bellBtn.classList.remove('ringing');
  void bellBtn.offsetWidth; // reflow to restart
  bellBtn.classList.add('ringing');
  bellBtn.addEventListener('animationend', () => bellBtn.classList.remove('ringing'), { once: true });

  playBell();
  spawnMeme();

  // vibrate on mobile
  if (navigator.vibrate) navigator.vibrate([80, 30, 80]);
}

bellBtn.addEventListener('click', ringBell);
bellBtn.addEventListener('touchstart', (e) => { e.preventDefault(); ringBell(); }, { passive: false });
