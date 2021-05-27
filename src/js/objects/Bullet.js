class Bullet {
  constructor(speed, imagePath, type, sound) {
    this.x = 0;
    this.y = 0;
    this.img = createImg(imagePath, "Bullet");
    this.type = type;
    this.width = BULLETS[type].width;
    this.height = BULLETS[type].height;
    this.hb = new HitBox(
      HitBoxFactory.coords(
        this.x - BULLETS[type].hb,
        this.y - BULLETS[type].hb
      ),
      HitBoxFactory.squareDims(this.width + 5, this.height + 5)
    );
    this.speed = speed;
    this.canShoot = false;
    this.hasCollided = false;
    this.sound = sound;
  }

  shoot(coords) {
    if (!this.canShoot) {
      this.canShoot = true;
      this.x = coords.x;
      this.hb.x = coords.x;
      this.y = coords.y;
      this.hb.y = coords.y;
      this.sound.play();
      this.sound.setVolume(0.3);
    }
  }

  draw() {
    if (this.canShoot) {
      this.img.position(this.x, this.y);
      this.img.size(this.width, this.height);
      this.move();
      if (this.borderReached()) {
        this.canShoot = false;
        // this.img.remove();
      }
    }
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

  reset() {
    this.canShoot = false;
    this.y = -100;
    this.hb.y = -100;
  }

  borderReached = () => this.hb.y < -100 || this.hb.y > windowHeight;

  destroy() {
    // this.img.remove();
    this.hasCollided = true;
  }
}

const BulletFactory = {
  coords: (x, y) => ({ x, y }),
};
