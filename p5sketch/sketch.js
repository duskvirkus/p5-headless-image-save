// Daniel Shiffman
// Self-Avoiding Walk

let grid;
let spacing = 200;
let cols, rows;
let path = [];
let spot;


function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  createCanvas(800, 800);
  cols = floor(width / spacing);
  rows = floor(height / spacing);
  // colorMode(HSB);
  background(51);
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }
  let i = floor(random(cols));
  let j = floor(random(rows));
  spot = grid[i][j];
  path.push(spot);
  spot.visited = true;
  // frameRate(1);
}

function isValid(i, j) {
  if (i < 0 || i >= cols || j < 0 || j >= rows) {
    return false;
  }
  return !grid[i][j].visited;
}

function draw() {

  for (let i = 0; i < 100000; i++) {
    spot = spot.nextSpot();
    if (!spot) {
      let stuck = path.pop();
      //noLoop();
      stuck.clear();
      spot = path[path.length - 1];
    } else {
      path.push(spot);
      spot.visited = true;
    }

    if (path.length === cols * rows) {
      console.log("Solved!");
      noLoop();
      // break;
    }
  }

  background(0);
  stroke(255);
  fill(255, 0);
  strokeWeight(1);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // square(i * spacing, j * spacing, spacing-1);
    }
  }



  translate(spacing * 0.5, spacing * 0.5);
  strokeWeight(spacing * 0.25);
  noFill();
  beginShape();
  curveVertex(path[0].x,path[0].y);
  stroke(255);
  
  for (let i = 0; i < path.length; i++) {
    let spot = path[i];
    curveVertex(spot.x, spot.y);
  }
  curveVertex(path[path.length-1].x,path[path.length-1].y);
  endShape();

  strokeWeight(spacing * 0.5);
  //point(spot.x, spot.y);

  noLoop();

  // save("randomwalk.png");

}