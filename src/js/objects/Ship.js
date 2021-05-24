class Ship {
  constructor(coords, controllSettings, sound) {
    this.x = coords.x;
    this.y = coords.y;
    this.width = SHIP_SPECS.width;
    this.height = SHIP_SPECS.height;
    this.sound = sound;
    this.img = createImg("src/assets/sprites/ship/ship.gif", "Player");
    this.controllSettings = controllSettings;
    this.speed = 4;
    this.hb = new HitBox(
      HitBoxFactory.coords(this.x, this.y - SHIP_SPECS.hb),
      HitBoxFactory.squareDims(56, 78)
    );
    this.bullets = [];
  }

  draw() {
    this.img.position(this.x, this.y);
    this.img.size(this.width, this.height);
    this.move();
    this.bullets.forEach((b) => b.draw());
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
    this.bullets.push(
      new Bullet(
        BulletFactory.coords(
          this.hb.x + BULLET_SPECS.width / 2,
          this.hb.y - BULLET_SPECS.height - 20
        ),
        "src/assets/sprites/bullet/player-bullet.gif",
        BULLET_TYPES.PLAYER,
        sound
      )
    );
  }

  death() {
    this.img = createImg(
      "src/assets/sprites/others/explosion.gif",
      "PlayerDeath"
    );
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
