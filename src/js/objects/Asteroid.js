class Asteroid {
  constructor(coords) {
    this.x = coords.x;
    this.y = coords.y;
    this.img = loadImage("src/assets/sprites/others/asteroid.png");
    this.imgInstance;
    this.width = ASTEROID_SPECS.width;
    this.height = ASTEROID_SPECS.height;
    this.lives = 4;
    this.hb = new HitBox(
      HitBoxFactory.coords(
        this.x - ASTEROID_SPECS.hb,
        this.y - ASTEROID_SPECS.hb
      ),
      HitBoxFactory.squareDims(82, 82)
    );
  }

  draw() {
    this.imgInstance = image(this.img, this.x, this.y, this.width, this.height);
  }

  death() {
    // this.imgInstance.remove();
    this.lives--;
  }
}

const AsteroidFactory = {
  coords: (x, y) => ({ x, y }),
};
