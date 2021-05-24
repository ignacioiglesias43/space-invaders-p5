class GameController {
  constructor(coords, gameState, font, points = 0, lives = 3) {
    this.x = coords.x;
    this.y = coords.y;
    this.gameState = gameState;
    this.points = points;
    this.lives = lives;
    this.font = font;
    this.ship = null;

    this.enemies = [];
    this.asteroids = [];
  }

  setup() {
    this.ship = new Ship(
      ShipFactory.coords(windowWidth / 2, windowHeight - 100),
      ShipFactory.controllSettings(RIGHT_ARROW, LEFT_ARROW, ENTER)
    );

    this.fillEnemies();
    this.fillAsteroids();
  }

  fillEnemies() {
    Array.from(Array(5), (_, k) =>
      this.enemies.push(
        new Enemy(
          EnemyFactory.coords(ENEMY_SPECS.width * (k * 2) + 50, 50),
          null,
          "src/assets/sprites/enemies/enemy-medium.gif"
        )
      )
    );
  }

  fillAsteroids() {
    Array.from(Array(6), (_, k) =>
      this.enemies.push(
        new Asteroid(
          AsteroidFactory.coords(
            ASTEROID_SPECS.width * (k * 2) + 50,
            windowHeight - (150 + ASTEROID_SPECS.height)
          )
        )
      )
    );
  }

  draw() {
    this[gameState]();
  }

  play() {
    this.ship.draw();
    this.enemies.forEach((e) => e.draw());
  }

  pause() {
    fill(255);
    textAlign(CENTER);
    textSize(50);
    textFont(this.font);
    text(`Score: ${this.points}`, this.x + 200, this.y + 200);
    text("Health: ", this.x + windowWidth - 180, this.y);
  }
}

const GameFactory = {
  coords: (x, y) => ({ x, y }),
};
