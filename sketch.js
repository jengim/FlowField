let inc = 0.1;
let scl = 10;
let cols, rows;
let zoff = 0;
let fr;
let particles = [];
let flowfield;

//text
let font;
function preload() {
  font = loadFont("Font/alfa.ttf");
}
let myFontSize = 200
let points;
let bounds;
let text;
text = 'hello'
let startPoints;

let numberOfPoints;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  //text
  stroke(0);
  points = font.textToPoints(text, 0, 0, myFontSize, {
    sampleFactor: 0.2,
    simplifyThreshold: 0
  });
numberOfPoints = points.length;
console.log(numberOfPoints)

// for (let i = 0; i < numberOfPoints; i++) {
//   particles[i] = new Particle();
// }

for (p of points) {
  particles.push(new Particle(p.x,p.y))
}
  bounds = font.textBounds(text, 0, 0, myFontSize);
  //end text
  console.log(points) 

}


function start() {
  startPoints = font.textToPoints(text, 0, 0, myFontSize);
  points = startPoints;
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 10;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
      strokeWeight(3);
      /*push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      line(0, 0, scl, 0);
      pop();*/
    }
    yoff += inc;
    zoff += 0.0009;
  }
  for (let i = 0; i < particles.length; i++) {
  particles[i].follow(flowfield);
  particles[i].update();
  particles[i].edges();
  particles[i].show();
  }
  //text
  translate(200, 350);
  for (p of points) {
    point(p.x, p.y);
  }
  //end text

  //fr.html(floor(frameRate()));
}
