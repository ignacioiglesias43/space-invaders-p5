class Enemy {
  constructor(coords, sounds, type, bullet, playerBullet) {
    this.x = coords.x;
    this.y = coords.y;
    this.width = 0;
    this.height = 0;
    this.sounds = sounds;
    this.type = type;
    this.img;
    this.speed = 3;
    this.hb;
    this.bullet = bullet;
    this.playerBullet = playerBullet;
    this.playerController;
    this.asteroidController;
    this.wasHitSound = sounds[1];
    this.takeLifeCallback = () => {};
    this.isDead = false;
  }

  setup(playerController, asteroidController) {
    const enemyType = ENEMIES[this.type];
    const index = ENEMY_TYPES.indexOf(this.type);
    this.img = createImg(enemyType.source, this.type);
    this.width = enemyType.width;
    this.height = enemyType.height;
    this.hb = new HitBox(
      HitBoxFactory.coords(this.x - enemyType.hb, this.y - enemyType.hb),
      HitBoxFactory.squareDims(enemyType.width + 10, enemyType.height + 10)
    );
    this.bullet.sound = this.sounds[0][index];
    this.playerController = playerController;
    this.asteroidController = asteroidController;
    this.isDead = false;
  }

  wasHit = () => {
    this.wasHitSound.play();
    this.wasHitSound.setVolume(0.3);
  };

  draw() {
    this.img.position(this.x, this.y);
    this.img.size(this.width, this.height);
    this.move();
    this.bullet.draw();
    if (this.bullet.canShoot) {
      this.bulletShotEnemy();
    }
  }

  canMoveRight = () => this.hb.x <= windowWidth - this.width - 10;
  canMoveLeft = () => this.hb.x >= 10;

  reverseX() {
    this.speed *= -1;
  }

  move() {
    this.x -= this.speed;
    this.hb.x -= this.speed;
  }

  shoot() {
    this.bullet.shoot(
      BulletFactory.coords(
        this.hb.x + this.width / 2 - BULLETS.enemy.width / 2,
        this.hb.y + this.height + 20
      )
    );
  }

  bulletShotEnemy = () => {
    if (this.bulletSuccess(this.playerController.ship.hb)) {
      this.bullet.reset();
      this.playerController.ship.wasHit();
      this.takeLifeCallback();
    }
    this.asteroidController.asteroids.forEach((a, index) => {
      if (this.bulletSuccess(a.hb)) {
        this.bullet.reset();
        a.death();
        this.asteroidController.wasHit();
        if (a.lives <= 0) {
          this.asteroidController.asteroids.splice(index, 1);
        }
      }
    });
  };

  bulletSuccess = (hb) => this.bullet.hb.wasHitSquare(hb);

  death() {
    this.img.remove();
    this.isDead = true;
  }
}

const EnemyFactory = {
  coords: (x, y) => ({ x, y }),
};
