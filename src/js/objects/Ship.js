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
  }

  draw() {
    this.img.position(this.x, this.y);
    this.img.size(this.width, this.height);
    this.move();
  }

  moveLeft() {
    if (this.x >= 10) {
      this.x -= this.speed;
    }
  }

  moveRight() {
    if (this.x <= windowWidth - SHIP_SPECS.width - 10) {
      this.x += this.speed;
    }
  }

  move() {
    this.controllSettings.forEach((controll) => {
      if (keyIsDown(controll.key)) {
        this[controll.name]();
      }
    });
  }

  shoot() {}
}

const ShipFactory = {
  coords: (x, y) => ({ x, y }),
  controllSettings: (moveRightKey, moveLeftKey) => [
    {
      name: "moveRight",
      key: moveRightKey,
    },
    {
      name: "moveLeft",
      key: moveLeftKey,
    },
  ],
};
