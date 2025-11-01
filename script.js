// ===== Canvas: fundo de energia responsivo com DPR =====
const canvas = document.getElementById('energy-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas, { passive: true });

let particles = [];
const NUM = 50;

function seed() {
  particles = [];
  for (let i = 0; i < NUM; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
    });
  }
}
seed();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // fundo radial suave
  const g = ctx.createRadialGradient(
    window.innerWidth / 2, window.innerHeight / 2, 0,
    window.innerWidth / 2, window.innerHeight / 2, Math.max(window.innerWidth, window.innerHeight) * 0.75
  );
  g.addColorStop(0, '#00142b');
  g.addColorStop(1, '#000000');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > window.innerWidth) p.dx *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.dy *= -1;

    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
    glow.addColorStop(0, 'rgba(0,160,255,0.6)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}
draw();

// ===== Brilho segue cursor (desativado em dispositivos touch) =====
const cursorGlow = document.getElementById('cursor-glow');
const isTouch = matchMedia('(pointer: coarse)').matches;

if (!isTouch) {
  document.addEventListener('mousemove', e => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }, { passive: true });
} else {
  cursorGlow.style.display = 'none';
}
