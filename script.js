// Fundo dinâmico com movimento fluido de energia
const canvas = document.getElementById("energy-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
const numParticles = 50;

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.8,
    dy: (Math.random() - 0.5) * 0.8,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 0,
    canvas.width / 2, canvas.height / 2, canvas.width / 1.5
  );
  gradient.addColorStop(0, "#00142b");
  gradient.addColorStop(1, "#000000");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    ctx.beginPath();
    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
    glow.addColorStop(0, "rgba(0,160,255,0.6)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Brilho ambiente segue o cursor (e o toque no mobile)
const cursorGlow = document.getElementById("cursor-glow");

function moveGlow(x, y) {
  cursorGlow.style.left = `${x}px`;
  cursorGlow.style.top = `${y}px`;
}

// Mouse
document.addEventListener("mousemove", e => moveGlow(e.clientX, e.clientY), { passive: true });

// Touch
document.addEventListener("touchmove", e => {
  const t = e.touches[0];
  if (t) moveGlow(t.clientX, t.clientY);
}, { passive: true });

// Posição inicial (centro)
moveGlow(window.innerWidth / 2, window.innerHeight / 2);
