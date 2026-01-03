export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    this.add.text(100, 100, 'MENU', {
      fontSize: '40px',
      fill: '#fff'
    });

    this.add.text(100, 180, 'Click to Start', {
      fontSize: '24px',
      fill: '#aaa'
    });

    this.input.once('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}
