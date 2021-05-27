class GameController {
  constructor(coords, gameState, font, controllers, points = 0, lives = 3) {
    this.x = coords.x;
    this.y = coords.y;
    this.gameState = gameState;
    this.points = points;
    this.lives = lives;
    this.printLives = [
      createImg("src/assets/sprites/ship/ship.gif", "life"),
      createImg("src/assets/sprites/ship/ship.gif", "life"),
      createImg("src/assets/sprites/ship/ship.gif", "life"),
    ];
    this.font = font;
    this.ship = null;
    this.asteroids = [];
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
    this.fillAsteroids();
    textFont(this.font);
  }

  pointsPlusPlus = (point) => (this.points += point);

  takeLife = () => {
    this.lives--;
    const element = this.printLives.pop();
    element.remove();
    if (this.lives === 0) {
      this.gameState = GAME_STATES.GAME_OVER;
    }
  };

  gameOver() {
    push();
    this.printLives.forEach((life) => life.remove());
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    push();
    fill(0);
    text("GAME OVER", windowWidth / 2, 73);
    pop();
    text("GAME OVER", windowWidth / 2, 70);
    push();
    fill(0);
    text(`Score: ${this.points}`, windowWidth / 2, 143);
    pop();
    text(`Score: ${this.points}`, windowWidth / 2, 140);
    push();
    fill(0);
    text("PRESS ENTER TO PLAY AGAIN", windowWidth / 2, 203);
    pop();
    text("PRESS ENTER TO PLAY AGAIN", windowWidth / 2, 200);

    if (keyIsDown(ENTER)) {
      this.reset();
    }
  }

  fillAsteroids() {
    Array.from(Array(10), (_, k) =>
      this.asteroids.push(
        new Asteroid(
          AsteroidFactory.coords(
            ASTEROID_SPECS.width * (k * 2) + 150,
            windowHeight - (125 + ASTEROID_SPECS.height)
          )
        )
      )
    );
  }

  draw() {
    if (this.gameState === GAME_STATES.ON_PLAY) {
      this.play();
    } else if (this.gameState === GAME_STATES.GAME_OVER) {
      this.gameOver();
    } else if (this.gameState === GAME_STATES.MENU) {
      this.menu();
    } else {
      this.pause();
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
      this.gameState = GAME_STATES.ON_PLAY;
    }
  }

  play() {
    push();
    this.ship.draw();
    this.enemies.draw();
    this.asteroids.forEach((a) => a.draw());
    textSize(30);
    push();
    fill(0);
    text(`Score: ${this.points}`, this.x + 20, this.y + 52);
    pop();
    fill(255);
    text(`Score: ${this.points}`, this.x + 20, this.y + 50);
    push();
    fill(0);
    text("Health: ", this.x + 270, this.y + 52);
    pop();
    text("Health: ", this.x + 270, this.y + 50);
    this.printLives.forEach((life, index) => {
      life.position(this.x + 410 + SHIP_SPECS.width * index, this.y + 20);
      life.size(SHIP_SPECS.width - 20, SHIP_SPECS.height - 20);
    });
    pop();
  }

  pause() {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    text(`Score: ${this.points}`, this.x + 200, this.y + 200);
    text("Health: ", this.x + windowWidth - 180, this.y);
  }

  reset() {}
}

const GameFactory = {
  coords: (x, y) => ({ x, y }),
};
