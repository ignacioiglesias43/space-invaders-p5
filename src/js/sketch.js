let backgroundImg;
let gameFont;
let bgSoundFile;
let gameController;
let gameState;
let playerShootSound;
let enemiesShootSound;
let enemyHitSound;
let playerHitSound;

function preload() {
  backgroundImg = loadImage(
    "src/assets/sprites/backgrounds/desert-backgorund-looped.png"
  );
  gameFont = loadFont("src/assets/fonts/kenvector_future_thin.ttf");
  bgSoundFile = loadSound("src/assets/sounds/spaceship shooter .wav");
  playerShootSound = loadSound("src/assets/sounds/Cancel or Gun (3).wav");
  enemiesShootSound = [
    loadSound("src/assets/sounds/Cancel or Gun (1).wav"),
    loadSound("src/assets/sounds/Cancel or Gun (2).wav"),
    loadSound("src/assets/sounds/Cancel or Gun (4).wav"),
  ];
  enemyHitSound = loadSound("src/assets/sounds/bonk.wav");
  playerHitSound = loadSound("src/assets/sounds/roblox.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameState = GAME_STATES.ON_PLAY;
  gameController = new GameController(
    GameFactory.coords(0, 0),
    gameState,
    gameFont,
    { playerShootSound, enemiesShootSound, enemyHitSound, playerHitSound }
  );

  gameController.setup();

  bgSoundFile.loop();
  bgSoundFile.setVolume(0.1);
}

function draw() {
  background(backgroundImg);
  gameController.draw();
}
