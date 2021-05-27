class GameController {
  constructor(coords, gameState, font, controllers, points = 0, lives = 1) {
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
  }

  setup() {
    this.ship.setup(this.enemies);
    this.enemies.setup(this.ship);
    this.fillAsteroids();
    textFont(this.font);
    textSize(30);
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
    this.printLives.forEach((life, index) => {
      life.remove();
    });
    fill(255);
    textAlign(CENTER);
    textSize(50);
    text("GAME OVER", this.x + 200, this.y + 200);
    text(`Score: ${this.points}`, this.x + 200, this.y + 200);
    text("Health: ", this.x + windowWidth - 180, this.y);
    pop();
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

  menu() {}

  play() {
    push();
    this.ship.draw();
    this.enemies.draw();
    this.asteroids.forEach((a) => a.draw());
    fill(255);
    text(`Score: ${this.points}`, this.x + 20, this.y + 50);
    text("Health: ", this.x + 270, this.y + 50);
    this.printLives.forEach((life, index) => {
      life.position(this.x + 410 + SHIP_SPECS.width * index, this.y + 20);
      life.size(SHIP_SPECS.width - 20, SHIP_SPECS.height - 20);
    });
    pop();
  }

  pause() {
    fill(255);
    textAlign(CENTER);
    textSize(50);
    text(`Score: ${this.points}`, this.x + 200, this.y + 200);
    text("Health: ", this.x + windowWidth - 180, this.y);
  }
}

const GameFactory = {
  coords: (x, y) => ({ x, y }),
};
