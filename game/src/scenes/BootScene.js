export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    this.add.text(40, 40, 'Checking version...', {
      fill: '#fff',
      fontSize: '24px'
    });

    let finished = false;

    const proceed = () => {
      if (finished) return;
      finished = true;
      this.scene.start('MenuScene');
    };

    // 🔥 Tunggu updater
    if (window.updater) {
      window.updater.onDone(proceed);
    }

    // 🔥 HARD FAILSAFE (wajib)
    this.time.delayedCall(3500, proceed);
  }
}
