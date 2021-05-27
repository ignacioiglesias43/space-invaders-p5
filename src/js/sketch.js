let backgroundImg;
let gameFont;
let bgSoundFile;
let gameController;
let gameState;
let playerShootSound;
let enemiesShootSound;
let enemyHitSound;
let playerHitSound;
let gameOverSound;
let winSound;
let asteroidHitSound;
let playerBullet;
let enemyBullet;
let playerController;
let enemiesController;
let asteroidController;

function preload() {
  backgroundImg = loadImage(
    "src/assets/sprites/backgrounds/desert-backgorund-looped copia.png"
  );
  gameFont = loadFont("src/assets/fonts/kenvector_future_thin.ttf");
  bgSoundFile = loadSound("src/assets/sounds/spaceship shooter .wav");
  playerShootSound = loadSound("src/assets/sounds/Cancel or Gun (3).wav");
  gameOverSound = loadSound("src/assets/sounds/Game Over sound effect.wav");
  enemiesShootSound = [
    loadSound("src/assets/sounds/Cancel or Gun (1).wav"),
    loadSound("src/assets/sounds/Cancel or Gun (2).wav"),
    loadSound("src/assets/sounds/Cancel or Gun (4).wav"),
  ];
  enemyHitSound = loadSound("src/assets/sounds/bonk.wav");
  playerHitSound = loadSound("src/assets/sounds/roblox.wav");
  asteroidHitSound = loadSound("src/assets/sounds/rockhit.wav");
  winSound = loadSound("src/assets/sounds/win.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameState = GAME_STATES.MENU;
  setupControllers();
  gameController = new GameController(
    GameFactory.coords(0, 0),
    gameState,
    gameFont,
    { playerController, enemiesController, asteroidController },
    gameOverSound,
    winSound
  );

  gameController.setup();

  bgSoundFile.loop();
  bgSoundFile.setVolume(0.1);
}

function setupControllers() {
  playerBullet = new Bullet(
    13,
    "src/assets/sprites/bullet/player-bullet.gif",
    BULLET_TYPES.PLAYER,
    playerShootSound
  );
  enemyBullet = new Bullet(
    1,
    "src/assets/sprites/bullet/enemy-bullet.gif",
    BULLET_TYPES.ENEMY,
    enemiesShootSound[0]
  );

  enemiesController = new EnemyController(
    EnemyControllerFactory.coords(0, 0),
    gameState,
    [enemiesShootSound, enemyHitSound],
    { playerBullet, enemyBullet }
  );
  playerController = new PlayerController(
    PlayerFactory.coords(0, 0),
    gameState,
    [playerShootSound, playerHitSound],
    { playerBullet, enemyBullet }
  );
  asteroidController = new AsteroidController(
    AsteroidControllerFactory.coords(0, 0),
    gameState,
    asteroidHitSound
  );
}

function draw() {
  background(backgroundImg);
  gameController.draw();
}
