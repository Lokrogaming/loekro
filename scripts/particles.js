const canvas = document.getElementById("redParticles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  const rect = canvas.parentElement.getBoundingClientRect();

  canvas.width = rect.width;
  canvas.height = rect.height;

  createParticles();
}

function createParticles() {
  particles = [];

  const amount = Math.min(
    400,
    Math.floor((canvas.width * canvas.height) / 10000)
  );

  for (let i = 0; i < amount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,

      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,

      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.2
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const particle of particles) {

    particle.x += particle.vx;
    particle.y += particle.vy;

    // Wrap around
    if (particle.x < 0) particle.x = canvas.width;
    if (particle.x > canvas.width) particle.x = 0;

    if (particle.y < 0) particle.y = canvas.height;
    if (particle.y > canvas.height) particle.y = 0;

    // Particle
    ctx.beginPath();

    ctx.arc(
      particle.x,
      particle.y,
      particle.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = `rgba(239, 68, 68, ${particle.opacity})`;
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

resizeCanvas();
draw();

window.addEventListener("resize", resizeCanvas);

