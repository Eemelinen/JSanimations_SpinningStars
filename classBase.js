const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];

let mouse = {
  x: null,
  y: null,
  // radius: (canvas.height / 80) * (canvas.width / 80),
};

window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
  }
)

class Particle {
  /**
  * ! Particle contructor */
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  /**
  * ! Draw method for particle. Creting outside constructor saves resources. */
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = '#8C5523';
    ctx.fill();
  }

  /** 
  * ! Update method for particle */
  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = - this.directionX
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = - this.directionY
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}