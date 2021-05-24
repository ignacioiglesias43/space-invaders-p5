let backgroundImg;
let gameFont;
let bgSoundFile;
let gameController;
let gameState;

function preload() {
  backgroundImg = loadImage(
    "src/assets/sprites/backgrounds/desert-backgorund-looped.png"
  );
  gameFont = loadFont("src/assets/fonts/kenvector_future_thin.ttf");
  bgSoundFile = loadSound("src/assets/sounds/spaceship shooter .wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameState = GAME_STATES.ON_PLAY;
  gameController = new GameController(
    GameFactory.coords(0, 0),
    gameState,
    gameFont
  );

  gameController.setup();

  //   bgSoundFile.loop();
}

function draw() {
  background(backgroundImg);
  gameController.draw();
  // console.log(key);
  //   enemy.draw();
}
