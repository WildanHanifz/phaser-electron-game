export default class BoundingBoxSystem {
  constructor(scene) {
    this.scene = scene;
    this.enabled = false;
    this.graphics = scene.add.graphics();
    this.targets = [];
  }

  enable() {
    this.enabled = true;
    console.log('[BBox] enabled');
  }

  disable() {
    this.enabled = false;
    this.graphics.clear();
    console.log('[BBox] disabled');
  }

  toggle() {
    this.enabled ? this.disable() : this.enable();
  }

  /**
   * Register object to be debug-drawn
   */
  track(gameObject) {
    if (!this.targets.includes(gameObject)) {
      this.targets.push(gameObject);
    }
  }

  /**
   * Remove object from tracking
   */
  untrack(gameObject) {
    this.targets = this.targets.filter(o => o !== gameObject);
  }

  /**
   * Call in scene.update()
   */
  update() {
    if (!this.enabled) return;

    this.graphics.clear();
    this.graphics.lineStyle(1, 0x00ff00, 1);

    this.targets.forEach(obj => {
      if (!obj.active) return;

      const bounds = obj.getBounds();

      this.graphics.strokeRect(
        bounds.x,
        bounds.y,
        bounds.width,
        bounds.height
      );

      // origin marker
      this.graphics.fillStyle(0xff0000, 1);
      this.graphics.fillCircle(obj.x, obj.y, 2);
    });
  }

  clear() {
    this.targets = [];
    this.graphics.clear();
  }
}
