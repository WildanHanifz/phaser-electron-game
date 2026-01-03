import VersionSystem from '../systems/VersionSystem.js';
import PatchSystem from '../systems/PatchSystem.js';
import SaveSystem from '../systems/SaveSystem.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  async create() {
    this.add.text(40, 40, 'Checking version...', { fill: '#fff' });

    await SaveSystem.load();

    const versionInfo = await VersionSystem.check();

    if (versionInfo.updateAvailable) {
      this.add.text(40, 80, 'Applying patch...', { fill: '#0f0' });
      await PatchSystem.apply(versionInfo.patch);
    }

    // ⬇⬇⬇ INI KUNCI
    this.scene.start('MenuScene');
  }
}
