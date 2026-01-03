class GameState {
  constructor() {
    this.player = { score: 0 };
  }

  addScore(value) {
    this.player.score += value;
  }
}

export default new GameState();
