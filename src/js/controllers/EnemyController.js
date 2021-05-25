class EnemyController {
  constructor(coords, gameState) {
    this.x = coords.x;
    this.y = coords.y;
    this.gameState = gameState;
    this.general;
    this.captains = [];
    this.privates = [];
  }

  setup() {
    this.fillEnemies();
    this.general.setup();
    this.captains.forEach((e) => e.setup());
    this.privates.forEach((e) => e.setup());
  }

  draw() {
    if (this.borderReached(this.captains)) {
      this.captains.forEach((e) => e.reverseX());
    }
    if (this.borderReached(this.privates)) {
      this.privates.forEach((e) => e.reverseX());
    }

    if (!this.general.canMoveRight() || !this.general.canMoveLeft()) {
      this.general.reverseX();
    }
    this.captains.forEach((e) => e.draw());
    this.privates.forEach((e) => e.draw());
    this.general.draw();
  }

  borderReached = (enemies) =>
    enemies.some((e) => !e.canMoveRight() || !e.canMoveLeft());

  fillEnemies() {
    this.general = new Enemy(
      EnemyFactory.coords(windowWidth / 2, 15),
      null,
      ENEMY_TYPES[0],
      this.mapHBLeft,
      this.mapHBRight
    );
    Array.from(Array(6), (_, k) =>
      this.captains.push(
        new Enemy(
          EnemyFactory.coords(70 * (k * 2) + 50, 125),
          null,
          ENEMY_TYPES[1],
          this.mapHBLeft,
          this.mapHBRight
        )
      )
    );

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 4; j++) {
        this.privates.push(
          new Enemy(
            EnemyFactory.coords(70 * ((i + 1) * 2) + 50, 200 + (j + 1) * 100),
            null,
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
