class Ship {
  constructor(coords, controllSettings, sounds, bullet, enemyBullet) {
    this.x = coords.x;
    this.y = coords.y;
    this.width = SHIP_SPECS.width;
    this.height = SHIP_SPECS.height;
    this.sounds = sounds;
    this.img = createImg("src/assets/sprites/ship/ship.gif", "Player");
    this.controllSettings = controllSettings;
    this.speed = 4;
    this.hb = new HitBox(
      HitBoxFactory.coords(this.x, this.y - SHIP_SPECS.hb),
      HitBoxFactory.squareDims(56, 78)
    );
    this.bullet = bullet;
    this.enemyBullet = enemyBullet;
    this.enemiesController;
    this.wasHitSound = sounds[1];
  }

  setup(enemiesController) {
    this.enemiesController = enemiesController;
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

  moveLeft() {
    if (this.hb.x >= 10) {
      this.x -= this.speed;
      this.hb.x -= this.speed;
    }
  }

  moveRight() {
    if (this.hb.x <= windowWidth - SHIP_SPECS.width - 10) {
      this.x += this.speed;
      this.hb.x += this.speed;
    }
  }

  move() {
    this.controllSettings.forEach((controll) => {
      if (keyIsDown(controll.key)) {
        this[controll.name]();
      }
    });
  }

  shoot() {
    this.bullet.shoot(
      BulletFactory.coords(
        this.hb.x + this.width / 2 - BULLETS.player.width / 2,
        this.hb.y - BULLETS.player.height - 20
      )
    );
  }

  bulletShotEnemy = () => {
    if (this.bulletSuccess(this.enemiesController.general.hb)) {
      this.bullet.reset();
      this.enemiesController.general.wasHit();
      this.enemiesController.general.death();
    }

    this.enemiesController.captain.forEach((e, index) => {
      if (this.bulletSuccess(e.hb)) {
        this.bullet.reset();
        e.wasHit();
        e.death();
        this.enemiesController.captain.splice(index, 1);
      }
    });

    this.enemiesController.private.forEach((e, index) => {
      if (this.bulletSuccess(e.hb)) {
        this.bullet.reset();
        e.wasHit();
        e.death();
        this.enemiesController.private.splice(index, 1);
      }
    });
  };

  bulletSuccess = (hb) => this.bullet.hb.wasHitSquare(hb);

  death() {
    this.img = createImg(
      "src/assets/sprites/others/explosion.gif",
      "PlayerDeath"
    );
    // this.img.remove();
  }
}

const ShipFactory = {
  coords: (x, y) => ({ x, y }),
  controllSettings: (moveRightKey, moveLeftKey, shootKey) => [
    {
      name: "moveRight",
      key: moveRightKey,
    },
    {
      name: "moveLeft",
      key: moveLeftKey,
    },
    {
      name: "shoot",
      key: shootKey,
    },
  ],
};
