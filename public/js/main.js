const canvas = document.getElementById("cnv");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "white";
ctx.font = "40px Verdana";
ctx.fillText("IQ..", 50, 50);
const data = ctx.getImageData(0, 0, 100, 100);

let pointArr = [];

const pointer = {
  x: null,
  y: null,
  radius: 60,
};

window.addEventListener("mousemove", (e) => {
  pointer.x = e.x;
  pointer.y = e.y;
  pointer.radius = 60;
});

class Point {
  constructor(x, y, c) {
    this.x = x + 100;
    this.color = c;
    this.y = y;
    this.size = 3;
    this.bX = this.x;
    this.bY = this.y;
    this.frequency = Math.random() * 10 + 5;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = pointer.x - this.x;
    let dy = pointer.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let fdx = dx / distance;
    let fdy = dy / distance;
    let mxd = pointer.radius;
    let ff = (mxd - distance) / mxd;
    let ddX = fdx * ff * this.frequency;
    let ddy = fdy * ff * this.frequency;

    if (distance < pointer.radius) {
      this.x -= ddX;
      this.y -= ddy;
    } else {
      if (this.x !== this.bX) {
        let dx = this.x - this.bX;
        this.x -= dx / 10;
      }
      if (this.y !== this.bY) {
        let dy = this.y - this.bY;
        this.y -= dy / 10;
      }
    }
  }
}

const run = () => {
  let palette = ["#4B4B4B", "#3F3F3F", "#2E2E2E", "black"];

  let color = palette.map((param) => {
    console.log(param);
    for (let y = 0, y2 = data.height; y < y2; y++) {
      for (let x = 0, x2 = data.width; x < x2; x++) {
        if (data.data[y * 4 * data.width + x * 4 + 1] > 128) {
          let posX = x;
          let posY = y;
          pointArr.push(new Point(posX * 6, posY * 6, param));
        }
      }
    }
  });
  return color;
};

const engine = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < pointArr.length; i++) {
    pointArr[i].draw();
    pointArr[i].update();
  }
  requestAnimationFrame(engine);
};

run();
engine();
