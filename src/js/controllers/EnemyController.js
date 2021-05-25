class EnemyController {
  constructor(coords, gameState, sounds) {
    this.x = coords.x;
    this.y = coords.y;
    this.gameState = gameState;
    this.sounds = sounds;
    this.general;
    this.captain = [];
    this.private = [];
    this.initialFireRate = 60;
    this.fireRate = this.initialFireRate;
  }

  setup() {
    this.fillEnemies();
    this.general.setup();
    this.captain.forEach((e) => e.setup());
    this.private.forEach((e) => e.setup());
  }

  draw() {
    if (this.borderReached(this.captain)) {
      this.captain.forEach((e) => e.reverseX());
    }
    if (this.borderReached(this.private)) {
      this.private.forEach((e) => e.reverseX());
    }

    if (!this.general.canMoveRight() || !this.general.canMoveLeft()) {
      this.general.reverseX();
    }
    this.captain.forEach((e) => e.draw());
    this.private.forEach((e) => e.draw());
    this.general.draw();

    this.shoot();
  }

  borderReached = (enemies) =>
    enemies.some((e) => !e.canMoveRight() || !e.canMoveLeft());

  shoot() {
    if (frameCount % this.fireRate === 0) {
      const chosen = Math.floor(Math.random() * ENEMY_TYPES.length);
      if (chosen === 0) {
        this[ENEMY_TYPES[chosen].toLowerCase()].shoot();
      } else {
        const selected = Math.floor(
          Math.random() * this[ENEMY_TYPES[chosen].toLowerCase()].length
        );
        this[ENEMY_TYPES[chosen].toLowerCase()][selected].shoot();
      }
    }
  }

  fillEnemies() {
    this.general = new Enemy(
      EnemyFactory.coords(windowWidth / 2, 15),
      this.sounds,
      ENEMY_TYPES[0],
      this.mapHBLeft,
      this.mapHBRight
    );
    Array.from(Array(6), (_, k) =>
      this.captain.push(
        new Enemy(
          EnemyFactory.coords(70 * (k * 2) + 50, 125),
          this.sounds,
          ENEMY_TYPES[1],
          this.mapHBLeft,
          this.mapHBRight
        )
      )
    );

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 4; j++) {
        this.private.push(
          new Enemy(
            EnemyFactory.coords(70 * ((i + 1) * 2) + 50, 200 + (j + 1) * 100),
            this.sounds,
            ENEMY_TYPES[2],
            this.mapHBLeft,
            this.mapHBRight
          )
        );
      }
    }
  }
}

const EnemyControllerFactory = {
  coords: (x, y) => ({ x, y }),
};
