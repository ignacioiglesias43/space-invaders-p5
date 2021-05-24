class HitBox {
  constructor(coords, dims) {
    this.x = coords.x;
    this.y = coords.y;
    // Square
    this.width = dims.width;
    this.height = dims.height;
  }

  // hbs = hitboxsquare
  wasHitSquare(hbs) {
    return (
      hbs.x < this.x + this.width &&
      hbs.x + hbs.width > this.x &&
      hbs.y < this.y + this.height &&
      hbs.y + hbs.height > this.y
    );
  }

  draw() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
}

const HitBoxFactory = {
  coords: (x, y) => {
    return { x, y };
  },
  squareDims: (width, height) => {
    return { width, height };
  },
};
