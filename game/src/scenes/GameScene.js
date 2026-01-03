import gameState from '../systems/GameState.js';
import SaveSystem from '../systems/SaveSystem.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    this.scoreText = this.add.text(100, 100, '', {
      fontSize: '32px',
      fill: '#00ffcc'
    });

    this.updateUI();

    const addBtn = this.add.text(100, 180, '[ ADD SCORE ]', {
      fill: '#fff'
    }).setInteractive();

    addBtn.on('pointerdown', () => {
      gameState.addScore(10);
      this.updateUI();
    });

    const saveBtn = this.add.text(100, 230, '[ SAVE GAME ]', {
      fill: '#00ff00'
    }).setInteractive();

    saveBtn.on('pointerdown', async () => {
      await SaveSystem.save();
      this.add.text(100, 270, 'SAVED ✔', { fill: '#0f0' });
    });

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MenuScene');
    });
  }

  updateUI() {
    this.scoreText.setText(`Score: ${gameState.player.score}`);
  }
}
