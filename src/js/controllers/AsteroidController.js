class AsteroidController {
  constructor(coords, gameState) {
    this.x = coords.x;
    this.y = coords.y;
    this.gameState = gameState;
    this.asteroids = [];
  }

  setup() {
    Array.from(Array(10), (_, k) =>
      this.asteroids.push(
        new Asteroid(
          AsteroidFactory.coords(
            ASTEROID_SPECS.width * (k * 2) + 150,
            windowHeight - (125 + ASTEROID_SPECS.height)
          )
        )
      )
    );
  }

  draw() {
    this.asteroids.forEach((a) => a.draw());
  }
}

const AsteroidControllerFactory = {
  coords: (x, y) => ({ x, y }),
};
