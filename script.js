// ===== SCREEN 1 PARTICLES =====
const s1Particles = ['❤️','💕','✨','🌸','💖','⭐','💫','🌺'];
const ps1 = document.getElementById('particlesS1');

function spawnS1Particle() {
  const el = document.createElement('div');
  el.className = 'particle';
  el.textContent = s1Particles[Math.floor(Math.random() * s1Particles.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.animationDuration = (5 + Math.random() * 7) + 's';
  el.style.animationDelay = (Math.random() * 3) + 's';
  el.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
  ps1.appendChild(el);
  setTimeout(() => el.remove(), 14000);
}
const s1Interval = setInterval(spawnS1Particle, 400);

// ===== NO BUTTON RUNS AWAY =====
let noClickCount = 0;
function runAway(btn) {
  noClickCount++;
  const vw = window.innerWidth, vh = window.innerHeight;
  const maxX = vw - 120, maxY = vh - 60;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  btn.style.position = 'fixed';
  btn.style.left = x + 'px';
  btn.style.top = y + 'px';
  btn.style.zIndex = 999;
  btn.style.transition = 'left 0.3s ease, top 0.3s ease';
  if (noClickCount >= 4) {
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
  }
}

// ===== TRANSITION TO SCREEN 2 =====
function goToScreen2() {
  clearInterval(s1Interval);
  document.getElementById('screen1').classList.add('hidden');
  setTimeout(() => {
    document.getElementById('screen2').classList.remove('hidden');
    startScreen2();
  }, 500);
}

// ===== SCREEN 2 SETUP =====
const coinEmojis = ['🪙','💰','✨','🌟','🎊','🧧'];
function startScreen2() {
  const coinsDiv = document.getElementById('coins');
  function spawnCoin() {
    const el = document.createElement('div');
    el.className = 'coin-float';
    el.textContent = coinEmojis[Math.floor(Math.random() * coinEmojis.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.bottom = '-40px';
    el.style.animationDuration = (6 + Math.random() * 8) + 's';
    el.style.animationDelay = (Math.random() * 2) + 's';
    coinsDiv.appendChild(el);
    setTimeout(() => el.remove(), 18000);
  }
  setInterval(spawnCoin, 500);
}

// ===== OPEN ENVELOPE =====
let opened = false;
function openEnvelope() {
  if (opened) return;
  opened = true;

  const wrap = document.getElementById('envWrap');
  wrap.classList.add('opened');
  wrap.style.animationPlayState = 'paused';

  setTimeout(() => {
    spawnConfetti(120);
    spawnFireworks();
    setTimeout(() => {
      document.getElementById('birthdayMsg').classList.add('visible');
      continuousConfetti();
    }, 900);
  }, 700);
}

// ===== CONFETTI =====
const confettiColors = ['#FFD700','#FF69B4','#FF4444','#FFA500','#FF1493','#FFFF00','#00FF88','#FF6B6B','#fff'];
function spawnConfetti(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = '-10px';
      el.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      el.style.width = (6 + Math.random() * 8) + 'px';
      el.style.height = (6 + Math.random() * 8) + 'px';
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      el.style.animationDuration = (2.5 + Math.random() * 3) + 's';
      el.style.animationDelay = '0s';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    }, i * 18);
  }
}

function continuousConfetti() {
  let count = 0;
  const interval = setInterval(() => {
    spawnConfetti(15);
    count++;
    if (count > 15) clearInterval(interval);
  }, 600);
}

// ===== FIREWORKS =====
function spawnFireworks() {
  const positions = [
    [20,20],[80,15],[50,30],[10,40],[90,25],[60,10],[35,50],[75,40]
  ];
  positions.forEach((pos, i) => {
    setTimeout(() => launchFirework(pos[0], pos[1]), i * 180);
  });
}

function launchFirework(xPct, yPct) {
  const cx = window.innerWidth * xPct / 100;
  const cy = window.innerHeight * yPct / 100;
  const colors = ['#FFD700','#FF69B4','#FF4500','#00FFFF','#FF1493','#ADFF2F','#FFA500'];
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.className = 'firework-particle';
    const angle = (i / 20) * Math.PI * 2;
    const dist = 60 + Math.random() * 80;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    el.style.left = cx + 'px';
    el.style.top = cy + 'px';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.setProperty('--tx', `translate(${tx}px,${ty}px)`);
    el.style.animationDuration = (0.6 + Math.random() * 0.5) + 's';
    el.style.width = el.style.height = (4 + Math.random() * 5) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }
}