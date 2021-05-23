let backgroundImg;
let shipImg;

function preload() {
  backgroundImg = loadImage(
    "src/assets/sprites/backgrounds/desert-backgorund-looped.png"
  );
  shipImg = createImg("src/assets/sprites/ship/ship.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(backgroundImg);
  shipImg.position(windowWidth / 2, windowHeight - 100);
  shipImg.size(70, 70);
}
