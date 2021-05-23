class GameController {
  constructor(coords, points, lives) {
    this.x = coords.x;
    this.y = coords.y;
  }
}

const GameFactory = {
  coords: (x, y) => ({ x, y }),
};
