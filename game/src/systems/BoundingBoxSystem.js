export default class BoundingBoxSystem {
  constructor(scene) {
    this.scene = scene;
    this.graphics = scene.add.graphics();
    this.target = null;
  }

  show(target) {
    this.target = target;
  }

  hide() {
    this.target = null;
    this.graphics.clear();
  }

  update() {
    if (!this.target || !this.target.active) {
      this.graphics.clear();
      return;
    }

    this.graphics.clear();
    this.graphics.lineStyle(1, 0x00ff00, 1);

    const b = this.target.getBounds();
    this.graphics.strokeRect(b.x, b.y, b.width, b.height);

    // origin
    this.graphics.fillStyle(0xff0000, 1);
    this.graphics.fillCircle(this.target.x, this.target.y, 2);
  }
}
