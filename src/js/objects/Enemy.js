class Enemy {
  constructor(coords, sound, imagePath) {
    this.x = coords.x;
    this.y = coords.y;
    this.width = ENEMY_SPECS.width;
    this.height = ENEMY_SPECS.height;
    this.sound = sound;
    this.img = createImg(imagePath, "Enemy");
    this.speed = 3;
    this.hb = new HitBox(
      HitBoxFactory.coords(this.x - ENEMY_SPECS.hb, this.y - ENEMY_SPECS.hb),
      HitBoxFactory.squareDims(80, 80)
    );
  }

  draw() {
    this.img.position(this.x, this.y);
    this.img.size(this.width, this.height);
    this.move();
  }

  moveLeft() {
    if (this.hb.x >= 10) {
      this.x -= this.speed;
      this.hb.x -= this.speed;
    }
  }

  moveRight() {
    if (this.hb.x <= windowWidth - ENEMY_SPECS.width - 10) {
      this.x += this.speed;
      this.hb.x += this.speed;
    }
  }

  move() {
    // this.moveRight();
  }
}

const EnemyFactory = {
  coords: (x, y) => ({ x, y }),
};
