class EnemyController {
  constructor(coords, gameState, sounds, bullets) {
    this.x = coords.x;
    this.y = coords.y;
    this.gameState = gameState;
    this.sounds = sounds;
    this.warriors = [];
    this.initialFireRate = 60;
    this.fireRate = this.initialFireRate;
    this.bullets = bullets;
    this.takeLifeCallback = () => {};
  }

  setup(playerController) {
    this.warriors = [];
    this.fillEnemies();
    this.warriors.forEach((e) => {
      e.setup(playerController);
      e.takeLifeCallback = this.takeLifeCallback;
    });
  }

  gameOver = () => {
    this.warriors.forEach((e) => e.death());
  };

  draw() {
    if (this.borderReached(this.warriors)) {
      this.warriors.forEach((e) => e.reverseX());
    }
    this.warriors.forEach((e) => e.draw());
    this.shoot();
  }

  borderReached = (enemies) =>
    enemies.some((e) => !e.canMoveRight() || !e.canMoveLeft());

  shoot() {
    if (frameCount % this.fireRate === 0) {
      if (!this.bullets.enemyBullet.canShoot) {
        let chosen = Math.floor(Math.random() * this.warriors.length);
        this.warriors[chosen].shoot();
      }
    }
  }

  fillEnemies() {
    this.warriors.push(
      new Enemy(
        EnemyFactory.coords(windowWidth / 2 - ENEMIES.GENERAL.width / 2, 65),
        this.sounds,
        ENEMY_TYPES[0],
        this.bullets.enemyBullet,
        this.bullets.playerBullet
      )
    );
    Array.from(Array(6), (_, k) =>
      this.warriors.push(
        new Enemy(
          EnemyFactory.coords(70 * (k * 2) + 50, 195),
          this.sounds,
          ENEMY_TYPES[1],
          this.bullets.enemyBullet,
          this.bullets.playerBullet
        )
      )
    );

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 4; j++) {
        this.warriors.push(
          new Enemy(
            EnemyFactory.coords(70 * ((i + 1) * 2) + 50, 250 + (j + 1) * 100),
            this.sounds,
            ENEMY_TYPES[2],
            this.bullets.enemyBullet,
            this.bullets.playerBullet
          )
        );
      }
    }
  }
}

const EnemyControllerFactory = {
  coords: (x, y) => ({ x, y }),
};
