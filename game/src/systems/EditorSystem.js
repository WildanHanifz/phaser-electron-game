export default class EditorSystem {
  constructor(scene) {
    this.scene = scene;
    this.enabled = false;
    this.objects = [];
  }

  enable() {
    this.enabled = true;
    console.log('[Editor] enabled');
  }

  disable() {
    this.enabled = false;
    this.scene.resizeGizmo?.clear();
    this.scene.bbox?.hide();
    console.log('[Editor] disabled');
  }

  toggle() {
    this.enabled ? this.disable() : this.enable();
  }

  registerInput() {
    const scene = this.scene;

    // =====================
    // POINTER DOWN (SATU-SATUNYA)
    // =====================
    scene.input.on('pointerdown', (pointer, targets) => {
      if (!this.enabled) return;

      // filter hanya object editor (BUKAN gizmo / UI)
      const editorTarget = targets.find(t => t.getData?.('editorObject'));

      // =====================
      // RIGHT CLICK → DELETE
      // =====================
      if (pointer.rightButtonDown()) {
        if (editorTarget) {
          this.scene.resizeGizmo?.clear();
          this.scene.bbox?.hide();

          editorTarget.destroy();
          this.objects = this.objects.filter(o => o !== editorTarget);
        }
        return;
      }

      // =====================
      // LEFT CLICK → SELECT
      // =====================
      if (editorTarget) {
        this.scene.resizeGizmo.enable();
        this.scene.resizeGizmo.attach(editorTarget);
        return;
      }

      // =====================
      // LEFT CLICK EMPTY → SPAWN IMAGE
      // =====================
      const obj = scene.add.image(
        pointer.worldX,
        pointer.worldY,
        'test-img'
      );

      obj.setOrigin(0.5);
      obj.setDisplaySize(100, 100);
      obj.setDepth(10);
      obj.setInteractive({ draggable: true });

      // 🔥 PENANDA WAJIB
      obj.setData('editorObject', true);

      this.objects.push(obj);
    });

    // =====================
    // HOVER → BOUNDING BOX
    // =====================
    scene.input.on('gameobjectover', (_, obj) => {
      if (!this.enabled) return;
      if (!obj.getData?.('editorObject')) return;
      this.scene.bbox?.show(obj);
    });

    scene.input.on('gameobjectout', () => {
      if (!this.enabled) return;
      this.scene.bbox?.hide();
    });

    // =====================
    // DRAG OBJECT
    // =====================
    scene.input.on('drag', (_, obj, x, y) => {
      if (!this.enabled) return;
      if (!obj.getData?.('editorObject')) return;
      obj.setPosition(x, y);
    });
  }
}
