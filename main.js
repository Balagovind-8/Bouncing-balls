const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const CENTER = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 40 // Smaller center
};

let balls = [];

class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx *= -1;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }

  isInCenter() {
    const dx = this.x - CENTER.x;
    const dy = this.y - CENTER.y;
    return Math.sqrt(dx * dx + dy * dy) < CENTER.radius;
  }
}

function randomColor() {
  return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function createBall() {
  const radius = 18; // Slightly larger
  const x = Math.random() * (canvas.width - radius * 2) + radius;
  const y = Math.random() * (canvas.height - radius * 2) + radius;
  const dx = (Math.random() - 0.5) * 12; // Faster speed
  const dy = (Math.random() - 0.5) * 12;
  const color = randomColor();
  return new Ball(x, y, dx, dy, radius, color);
}

function drawCenterCircle() {
  ctx.beginPath();
  ctx.strokeStyle = "#00ffff";
  ctx.lineWidth = 3;
  ctx.arc(CENTER.x, CENTER.y, CENTER.radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCenterCircle();

  balls = balls.filter(ball => {
    ball.update();
    return !ball.isInCenter();
  });

  document.getElementById('ballCount').textContent = balls.length;

  requestAnimationFrame(animate);
}

// Initialize 25 bouncing balls
for (let i = 0; i < 25; i++) {
  balls.push(createBall());
}

animate();
