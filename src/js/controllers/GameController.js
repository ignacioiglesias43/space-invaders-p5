class GameController {
  constructor(
    coords,
    gameState,
    font,
    controllers,
    gameOverSound,
    points = 0,
    lives = 3
  ) {
    this.x = coords.x;
    this.y = coords.y;
    this.gameState = gameState;
    this.gameOverSound = gameOverSound;
    this.points = points;
    this.lives = lives;
    this.printLives = [];
    this.font = font;
    this.ship = null;
    this.asteroids = controllers.asteroidController;
    this.ship = controllers.playerController;
    this.enemies = controllers.enemiesController;
    this.enemies.takeLifeCallback = this.takeLife;
    this.ship.pointsCallback = this.pointsPlusPlus;
    this.logo = createImg("src/assets/sprites/ship/ship.gif", "logo");
    this.moveKeys = loadImage("src/assets/sprites/instructions/arrow-keys.png");
    this.shootKey = loadImage("src/assets/sprites/instructions/space.png");
  }

  setup() {
    this.ship.setup(this.enemies);
    this.enemies.setup(this.ship);
    this.ship.wonCallback = () => (this.gameState = GAME_STATES.WIN);
    this.asteroids.setup();
    Array.from(Array(this.lives), () =>
      this.printLives.push(
        createImg("src/assets/sprites/ship/ship.gif", "life")
      )
    );
    textFont(this.font);
  }

  pointsPlusPlus = (point) => (this.points += point);

  takeLife = () => {
    this.lives--;
    const element = this.printLives.pop();
    element.remove();
    if (this.lives === 0) {
      this.gameState = GAME_STATES.GAME_OVER;
      this.enemies.gameOver();
      this.ship.ship.death();
      this.gameOverSound.play();
      this.gameOverSound.setVolume(0.1);
    }
  };

  gameOver() {
    this.printLives.forEach((life) => life.remove());
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    push();
    fill(0);
    text("GAME OVER", windowWidth / 2, windowHeight / 2 + 3);
    pop();
    text("GAME OVER", windowWidth / 2, windowHeight / 2);
    push();
    fill(0);
    text(`Score: ${this.points}`, windowWidth / 2, windowHeight / 2 + 73);
    pop();
    text(`Score: ${this.points}`, windowWidth / 2, windowHeight / 2 + 70);
    push();
    fill(0);
    text("PRESS ENTER TO PLAY AGAIN", windowWidth / 2, windowHeight / 2 + 136);
    pop();
    text("PRESS ENTER TO PLAY AGAIN", windowWidth / 2, windowHeight / 2 + 133);

    if (keyIsDown(ENTER)) {
      this.reset();
    }
  }

  win() {
    this.printLives.forEach((life) => life.remove());
    this.ship.ship.death();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    push();
    fill(0);
    text("YOU WON", windowWidth / 2, windowHeight / 2 + 3);
    pop();
    text("YOU WON", windowWidth / 2, windowHeight / 2);
    push();
    fill(0);
    text(`Score: ${this.points}`, windowWidth / 2, windowHeight / 2 + 73);
    pop();
    text(`Score: ${this.points}`, windowWidth / 2, windowHeight / 2 + 70);
    push();
    fill(0);
    text("PRESS ENTER TO PLAY AGAIN", windowWidth / 2, windowHeight / 2 + 136);
    pop();
    text("PRESS ENTER TO PLAY AGAIN", windowWidth / 2, windowHeight / 2 + 133);

    if (keyIsDown(ENTER)) {
      this.reset();
    }
  }

  draw() {
    if (this.gameState === GAME_STATES.ON_PLAY) {
      this.play();
    } else if (this.gameState === GAME_STATES.GAME_OVER) {
      this.gameOver();
    } else if (this.gameState === GAME_STATES.MENU) {
      this.menu();
    } else if (this.gameState === GAME_STATES.WIN) {
      this.win();
    }
  }

  menu() {
    this.logo.position(
      windowWidth / 2 - SHIP_SPECS.width / 2,
      windowHeight / 2
    );
    this.logo.size(SHIP_SPECS.width, SHIP_SPECS.height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    push();
    fill(0);
    text("SPACE INVADERS", windowWidth / 2, windowHeight / 2 - 73);
    pop();
    text("SPACE INVADERS", windowWidth / 2, windowHeight / 2 - 70);
    push();
    fill(0);
    text("PRESS ENTER TO PLAY", windowWidth / 2, windowHeight / 2 + 143);
    pop();
    text("PRESS ENTER TO PLAY", windowWidth / 2, windowHeight / 2 + 140);
    image(
      this.moveKeys,
      windowWidth / 2 - 166,
      windowHeight / 2 - 250,
      166,
      113.5
    );
    image(
      this.shootKey,
      windowWidth / 2 + 20,
      windowHeight / 2 - 263,
      166,
      166
    );
    push();
    fill(0);
    text("CONTROLLS", windowWidth / 2, windowHeight / 2 - 297);
    pop();
    text("CONTROLLS", windowWidth / 2, windowHeight / 2 - 300);

    if (keyIsDown(ENTER)) {
      this.logo.remove();
      this.gameState = GAME_STATES.ON_PLAY;
    }
  }

  play() {
    this.ship.draw();
    this.enemies.draw();
    this.asteroids.draw();
    textSize(30);
    push();
    fill(0);
    text(`Score: ${this.points}`, windowWidth / 2, this.y + 52);
    pop();
    fill(255);
    text(`Score: ${this.points}`, windowWidth / 2, this.y + 50);
    push();
    fill(0);
    text("Health: ", this.x + 270, this.y + 52);
    pop();
    text("Health: ", this.x + 270, this.y + 50);
    this.printLives.forEach((life, index) => {
      life.position(this.x + 410 + SHIP_SPECS.width * index, this.y + 20);
      life.size(SHIP_SPECS.width - 20, SHIP_SPECS.height - 20);
    });
    if (this.enemies.warriors.length === 0) {
      this.gameState = GAME_STATES.WIN;
    }
  }

  reset() {
    this.ship.setup(this.enemies);
    this.enemies.setup(this.ship);
    this.asteroids.setup();
    this.lives = 3;
    this.points = 0;
    this.printLives = [];
    Array.from(Array(this.lives), () =>
      this.printLives.push(
        createImg("src/assets/sprites/ship/ship.gif", "life")
      )
    );
    this.gameState = GAME_STATES.ON_PLAY;
  }
}

const GameFactory = {
  coords: (x, y) => ({ x, y }),
};
