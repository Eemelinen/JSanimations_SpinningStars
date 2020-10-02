const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];

class Particle {
  /**
  * ! Particle contructor */
  constructor(moveRadius, step, position, size) {
    this.moveRadius = moveRadius;
    this.step = step;
    this.position = position;
    this.size = size;
  }

  /**
  * ! Draw method for particle. Creting outside constructor saves resources. */
  draw() {
    let x = Math.cos(this.position) * this.moveRadius + canvas.width / 2;
    let y = Math.sin(this.position) * this.moveRadius + canvas.height / 2;
    ctx.beginPath();
    ctx.arc(x, y, this.moveRadius / 15, 0, Math.PI * 2);
    // drawStar(x, y, 6, this.size, this.size / 2);
    ctx.closePath();
    ctx.fillStyle = 'gold';
    ctx.fill();
  }

  /** 
  * ! Update method for particle */
  update() {
    this.position += this.step;
    this.draw();
  }
}

function init() {
  particleArray = [];
  for (let i = 0; i < 500; i++) {
    let moveRadius = Math.random() * canvas.width;
    let step = (Math.random() * 0.002) + 0.002;
    let position = Math.random() * (Math.PI * 2);
    let size = (Math.random() * 8) + 15;
    particleArray.push(new Particle(moveRadius, step, position, size));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}

/** 
 * ! Event listener for window size change. Rerender snowflakes */
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

function drawStar(positionX, positionY, spikes, outerRadius, innerRadius) {
  let rotation = Math.PI / 2 * 3;
  let x = positionX;
  let y = positionY;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(positionX, positionY - outerRadius);
  for(let i = 0; i < spikes; i++) {
    x = positionX + Math.cos(rotation) * outerRadius;
    y = positionY + Math.sin(rotation) * outerRadius;
    ctx.lineTo(x, y);
    rotation += step;

    x = positionX + Math.cos(rotation) * innerRadius;
    y = positionY + Math.sin(rotation) * innerRadius;
    ctx.lineTo(x, y);
    rotation += step;
  }
  ctx.lineTo(positionX, positionY - outerRadius);
  ctx.closePath();
}

init();
animate();
