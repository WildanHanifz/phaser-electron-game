import gameState from './GameState.js';

export default class SaveSystem {
  static async save() {
    if (!window.api) return;
    await window.api.saveGame(gameState);
  }

  static async load() {
    if (!window.api) return;
    const data = await window.api.loadGame();
    if (data) Object.assign(gameState, data);
  }
}
