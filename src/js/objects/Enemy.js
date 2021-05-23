class Enemy {
  constructor(coords, sound, imagePath) {
    this.x = coords.x;
    this.y = coords.y;
    this.width = SHIP_SPECS.width;
    this.height = SHIP_SPECS.height;
    this.sound = sound;
    this.img = createImg(imagePath, "Enemy");
  }

  draw() {
    this.img.position(this.x, this.y);
    this.img.size(this.width, this.height);
  }
}

const EnemyFactory = {
  coords: (x, y) => ({ x, y }),
};
