class Enemy {
  constructor(coords, sounds, type) {
    this.x = coords.x;
    this.y = coords.y;
    this.width = 0;
    this.height = 0;
    this.sounds = sounds;
    this.type = type;
    this.img;
    this.speed = 3;
    this.hb;
    this.bullets = [];
  }

  setup() {
    const enemyType = ENEMIES[this.type];
    this.img = createImg(enemyType.source, this.type);
    this.width = enemyType.width;
    this.height = enemyType.height;
    this.hb = new HitBox(
      HitBoxFactory.coords(this.x - enemyType.hb, this.y - enemyType.hb),
      HitBoxFactory.squareDims(enemyType.width + 10, enemyType.height + 10)
    );
  }

  draw() {
    this.img.position(this.x, this.y);
    this.img.size(this.width, this.height);
    this.move();
    this.bullets.forEach((b) => b.draw());
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
    this.bullets.push(
      new Bullet(
        BulletFactory.coords(
          this.hb.x + this.width / 2 - BULLETS.enemy.width / 2,
          this.hb.y + this.height + 20
        ),
        "src/assets/sprites/bullet/enemy-bullet.gif",
        BULLET_TYPES.ENEMY
      )
    );
    const index = ENEMY_TYPES.indexOf(this.type);
    this.sounds[0][index].play();
    this.sounds[0][index].setVolume(0.3);
  }

  death() {
    this.img = createImg(
      "src/assets/sprites/others/explosion.gif",
      "EnemyDeath"
    );
  }
}

const EnemyFactory = {
  coords: (x, y) => ({ x, y }),
};
