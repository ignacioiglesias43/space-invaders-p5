const SHIP_SPECS = { width: 54, height: 72, hb: 4 };

const ASTEROID_SPECS = { width: 80, height: 80, hb: 0.5, length: 10 };

const BULLETS = {
  enemy: {
    width: 28,
    height: 28,
    hb: 4,
  },
  player: {
    width: 21,
    height: 45,
    hb: 1,
  },
};

const GAME_STATES = {
  ON_PLAY: "play",
  GAME_OVER: "gameOver",
  MENU: "menu",
  WIN: "win",
};

const BULLET_TYPES = {
  ENEMY: "enemy",
  PLAYER: "player",
};

const ENEMIES = {
  GENERAL: {
    width: 90,
    height: 90,
    hb: 0.5,
    source: "src/assets/sprites/enemies/enemy-big.gif",
    points: 100,
  },
  CAPTAIN: {
    width: 70,
    height: 70,
    hb: 4,
    source: "src/assets/sprites/enemies/enemy-medium.gif",
    length: 6,
    points: 50,
  },
  PRIVATE: {
    width: 50,
    height: 50,
    hb: 6,
    source: "src/assets/sprites/enemies/enemy-small.gif",
    row: 7,
    column: 4,
    length: 28,
    points: 20,
  },
};

const ENEMY_TYPES = ["GENERAL", "CAPTAIN", "PRIVATE"];
