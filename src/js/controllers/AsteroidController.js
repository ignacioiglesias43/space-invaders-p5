class AsteroidController {
  constructor(coords, gameState, sound) {
    this.x = coords.x;
    this.y = coords.y;
    this.gameState = gameState;
    this.asteroids = [];
    this.sound = sound;
  }

  setup() {
    this.asteroids = [];
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

  wasHit = () => {
    this.sound.play();
    this.sound.setVolume(0.3);
  };

  draw() {
    this.asteroids.forEach((a) => a.draw());
  }
}

const AsteroidControllerFactory = {
  coords: (x, y) => ({ x, y }),
};
