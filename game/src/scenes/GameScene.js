import gameState from '../systems/GameState.js';
import SaveSystem from '../systems/SaveSystem.js';
import EditorSystem from '../systems/EditorSystem.js';
import BoundingBoxSystem from '../systems/BoundingBoxSystem.js';


export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    // ======================
    // GAMEPLAY UI
    // ======================
    this.scoreText = this.add.text(100, 100, '', {
      fontSize: '32px',
      fill: '#00ffcc'
    });

    this.updateUI();

    const addBtn = this.add.text(100, 180, '[ ADD SCORE ]', {
      fill: '#ffffff'
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
      this.showTempMessage('SAVED ✔');
    });

    // ======================
    // DEV MODE EDITOR
    // ======================
    const DEV_MODE = !window.api; // browser / npm start

    if (DEV_MODE) {
      this.editor = new EditorSystem(this);
      this.bbox = new BoundingBoxSystem(this);
      this.editor.registerInput();

      this.input.keyboard.on('keydown-E', () => {
        this.editor.toggle();
      });

      this.input.keyboard.on('keydown-B', () => {
        this.bbox.toggle();
      });

      this.add.text(10, 10, 'DEV MODE | Press E to toggle editor', {
        fontSize: '12px',
        fill: '#ffff00'

      });
    }

    // ======================
    // EXIT TO MENU
    // ======================
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('MenuScene');
    });
  }

  updateUI() {
    this.scoreText.setText(`Score: ${gameState.player.score}`);
  }

  showTempMessage(text) {
    const msg = this.add.text(100, 270, text, {
      fill: '#0f0'
    });

    this.time.delayedCall(1500, () => {
      msg.destroy();
    });
  }

  update() {
    // update bounding box setiap frame (DEV MODE only)
    this.bbox?.update();
  }
}
