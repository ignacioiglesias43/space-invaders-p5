class EnemyController {
  constructor(coords, gameState) {
    this.x = coords.x;
    this.y = coords.y;
    this.gameState = gameState;
    this.enemies = [];
  }

  setup() {
    this.fillEnemies();
    this.enemies.forEach((e) => e.setup());
  }

  draw() {
    this.enemies.forEach((e) => e.draw());
  }

  fillEnemies() {
    this.enemies.push(
      new Enemy(
        EnemyFactory.coords(windowWidth / 2, 15),
        null,
        ENEMY_TYPES[0],
        this.mapHBLeft,
        this.mapHBRight
      )
    );
    Array.from(Array(5), (_, k) =>
      this.enemies.push(
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
        this.enemies.push(
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
