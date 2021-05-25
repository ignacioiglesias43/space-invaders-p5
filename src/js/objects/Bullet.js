class Bullet {
  constructor(coords, imagePath, type, sound) {
    this.x = coords.x;
    this.y = coords.y;
    this.img = createImg(imagePath, "Bullet");
    this.type = type;
    this.width = BULLETS[type].width;
    this.height = BULLETS[type].height;
    this.sound = sound;
    this.hb = new HitBox(
      HitBoxFactory.coords(
        this.x - BULLETS[type].hb,
        this.y - BULLETS[type].hb
      ),
      HitBoxFactory.squareDims(this.width + 5, this.height + 5)
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

  destroy() {
    this.img.remove();
  }
}

const BulletFactory = {
  coords: (x, y) => ({ x, y }),
};
