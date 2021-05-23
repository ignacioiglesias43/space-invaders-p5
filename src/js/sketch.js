let backgroundImg;
let ship;
let gameFont;
let bgSoundFile;

function preload() {
  backgroundImg = loadImage(
    "src/assets/sprites/backgrounds/desert-backgorund-looped.png"
  );
  gameFont = loadFont("src/assets/fonts/kenvector_future_thin.ttf");
  bgSoundFile = loadSound("src/assets/sounds/spaceship shooter .wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship(
    ShipFactory.coords(windowWidth / 2, windowHeight - 100),
    ShipFactory.controllSettings(RIGHT_ARROW, LEFT_ARROW)
  );
  //   enemy = new Enemy(EnemyFactory.coords(50, 50));
  //   bgSoundFile.loop();
}

function draw() {
  background(backgroundImg);
  ship.draw();
  // console.log(key);
  //   enemy.draw();
}
