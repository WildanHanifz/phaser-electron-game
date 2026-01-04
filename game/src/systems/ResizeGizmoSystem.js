export default class ResizeGizmoSystem {
  constructor(scene) {
    this.scene = scene;
    this.enabled = false;
    this.target = null;
    this.handles = [];
    this.minSize = 20;
  }

  enable() {
    this.enabled = true;
    console.log('[ResizeGizmo] enabled');
  }

  clear() {
    this.handles.forEach(h => h.destroy());
    this.handles = [];
    this.target = null;
  }

  attach(target) {
    if (!this.enabled) return;

    this.clear();
    this.target = target;

    target.setOrigin(0.5);

    this.createHandles();
  }

  createHandles() {
    const b = this.target.getBounds();

    const corners = [
      [b.left, b.top],
      [b.right, b.top],
      [b.right, b.bottom],
      [b.left, b.bottom]
    ];

    corners.forEach(pos => {
      const h = this.scene.add.circle(pos[0], pos[1], 6, 0xffff00);
      h.setDepth(1000);
      h.setInteractive({ draggable: true });

      // ❗ HANDLE BUKAN EDITOR OBJECT
      h.setData('editorObject', false);

      h.on('drag', (_, x, y) => {
        this.resize(x, y);
      });

      this.handles.push(h);
    });
  }

  resize(x, y) {
    if (!this.target) return;

    console.log('RESIZE TARGET:', this.target);

    const cx = this.target.x;
    const cy = this.target.y;

    const w = Math.max(this.minSize, Math.abs(x - cx) * 2);
    const h = Math.max(this.minSize, Math.abs(y - cy) * 2);

    // 🔥 INI YANG AKHIRNYA BENAR
    this.target.setDisplaySize(w, h);

    this.updateHandles();
  }

  updateHandles() {
    if (!this.target) return;

    const b = this.target.getBounds();
    const pos = [
      [b.left, b.top],
      [b.right, b.top],
      [b.right, b.bottom],
      [b.left, b.bottom]
    ];

    this.handles.forEach((h, i) => {
      h.setPosition(pos[i][0], pos[i][1]);
    });
  }

  update() {
    if (!this.enabled || !this.target) return;
    this.updateHandles();
  }
}
