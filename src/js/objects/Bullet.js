class Bullet {
  constructor(coords, imagePath, type, sound) {
    this.x = coords.x;
    this.y = coords.y;
    this.img = createImg(imagePath, "Bullet");
    this.width = BULLET_SPECS.width;
    this.height = BULLET_SPECS.height;
    this.type = type;
    this.sound = sound;
    this.hb = new HitBox(
      HitBoxFactory.coords(this.x - BULLET_SPECS.hb, this.y - BULLET_SPECS.hb),
      HitBoxFactory.squareDims(27, 50)
    );
    this.speed = 3;
  }

  draw() {
    this.img.position(this.x, this.y);
    this.img.size(this.width, this.height);
    this.move();
  }

  move() {
    if (this.type === BULLET_TYPES.PLAYER) {
      this.y -= this.speed;
      this.hb.y -= this.speed;
    } else {
      this.y += this.speed;
      this.hb.y += this.speed;
    }
  }
}

const BulletFactory = {
  coords: (x, y) => ({ x, y }),
};
