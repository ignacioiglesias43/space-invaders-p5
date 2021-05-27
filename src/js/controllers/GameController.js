class GameController {
  constructor(coords, gameState, font, sounds, bullets, points = 0, lives = 3) {
    this.x = coords.x;
    this.y = coords.y;
    this.gameState = gameState;
    this.points = points;
    this.lives = lives;
    this.font = font;
    this.ship = null;
    this.asteroids = [];
    this.sounds = sounds;
    this.bullets = bullets;
    this.enemies = new EnemyController(
      EnemyControllerFactory.coords(0, 0),
      this.gameState,
      [sounds.enemiesShootSound, sounds.enemyHitSound],
      this.bullets
    );
    this.ship = new PlayerController(
      PlayerFactory.coords(0, 0),
      this.gameState,
      [sounds.playerShootSound, sounds.playerHitSound],
      this.bullets
    );
  }

  setup() {
    this.ship.setup();
    this.enemies.setup();
    this.fillAsteroids();
  }

  fillAsteroids() {
    Array.from(Array(10), (_, k) =>
      this.asteroids.push(
        new Asteroid(
          AsteroidFactory.coords(
            ASTEROID_SPECS.width * (k * 2) + 150,
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
    this.enemies.draw();
    this.asteroids.forEach((a) => a.draw());
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
