class PlayerController {
  constructor(coords, gameState, sounds, bullets) {
    this.x = coords.x;
    this.y = coords.y;
    this.gameState = gameState;
    this.sounds = sounds;
    this.bullets = bullets;
  }

  setup() {
    this.ship = new Ship(
      ShipFactory.coords(windowWidth / 2, windowHeight - 100),
      ShipFactory.controllSettings(RIGHT_ARROW, LEFT_ARROW, 32),
      this.sounds,
      this.bullets.playerBullet,
      this.bullets.enemyBullet
    );
  }

  draw() {
    this.ship.draw();
  }
}

const PlayerFactory = {
  coords: (x, y) => ({ x, y }),
};
