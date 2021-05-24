class Enemy {
  constructor(coords, sound, type) {
    this.x = coords.x;
    this.y = coords.y;
    this.width = 0;
    this.height = 0;
    this.sound = sound;
    this.type = type;
    this.img;
    this.speed = 3;
    this.hb;
  }

  setup() {
    const enemyType = ENEMIES[this.type];
    this.img = createImg(enemyType.source, this.type);
    this.width = enemyType.width;
    this.height = enemyType.height;
    this.hb = new HitBox(
      HitBoxFactory.coords(this.x - enemyType.hb, this.y - enemyType.hb),
      HitBoxFactory.squareDims(80, 80)
    );
  }

  draw() {
    this.img.position(this.x, this.y);
    this.img.size(this.width, this.height);
    this.move();
  }

  moveLeft() {
    if (this.canMoveLeft()) {
      this.x -= this.speed;
      this.hb.x -= this.speed;
    }
  }

  moveRight() {
    if (this.canMoveRight()) {
      this.x += this.speed;
      this.hb.x += this.speed;
    }
  }

  canMoveRight = () => this.hb.x <= windowWidth - this.width - 10;
  canMoveLeft = () => this.hb.x >= 10;

  move() {
    this[ENEMIES[this.type].move]();
  }

  normalMove() {
    if (!this.canMoveRight() || !this.canMoveLeft()) {
      this.speed *= -1;
    }

    this.x -= this.speed;
    this.hb.x -= this.speed;
  }

  teamMove() {}

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
