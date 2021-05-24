class Asteroid {
  constructor(coords) {
    this.x = coords.x;
    this.y = coords.y;
    this.img = loadImage("src/assets/sprites/others/asteroid.png");
    this.width = ASTEROID_SPECS.width;
    this.height = ASTEROID_SPECS.height;
    this.hb = new HitBox(
      HitBoxFactory.coords(
        this.x - ASTEROID_SPECS.hb,
        this.y - ASTEROID_SPECS.hb
      ),
      HitBoxFactory.squareDims(82, 82)
    );
  }

  draw() {
    image(this.img, this.x, this.y, this.width, this.height);
  }
}

const AsteroidFactory = {
  coords: (x, y) => ({ x, y }),
};
