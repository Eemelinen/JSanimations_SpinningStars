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
    ctx.beginPath();
    ctx.arc(Math.cos(this.position) * this.moveRadius + canvas.width / 2,
    Math.sin(this.position) * this.moveRadius + canvas.height / 2,
    this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = 'white';
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
    let size = (Math.random() * 8) + 0.5;
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

init();
animate();
