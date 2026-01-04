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
    console.log('[Editor] disabled');
  }

  toggle() {
    this.enabled ? this.disable() : this.enable();
  }

  registerInput() {
    const scene = this.scene;

    // Spawn object
    scene.input.on('pointerdown', (pointer) => {
      if (!this.enabled) return;
      if (pointer.rightButtonDown()) return;

      const obj = scene.add.rectangle(
        pointer.worldX,
        pointer.worldY,
        50,
        50,
        0xff0000
      );

      obj.setInteractive({ draggable: true });
      obj.type = 'box';

      this.objects.push(obj);
    });

    // Drag object
    scene.input.on('drag', (_, gameObject, dragX, dragY) => {
      if (!this.enabled) return;
      gameObject.setPosition(dragX, dragY);
    });

    // Delete object (right click)
    scene.input.on('gameobjectdown', (pointer, gameObject) => {
      if (!this.enabled) return;

      if (pointer.rightButtonDown()) {
        gameObject.destroy();
        this.objects = this.objects.filter(o => o !== gameObject);
      }
    });

    // Keyboard shortcuts
    scene.input.keyboard.on('keydown-S', (e) => {
      if (this.enabled && e.ctrlKey) this.save();
    });

    scene.input.keyboard.on('keydown-L', (e) => {
      if (this.enabled && e.ctrlKey) this.load();
    });
  }

  save() {
    const data = this.objects.map(o => ({
      type: o.type,
      x: o.x,
      y: o.y
    }));

    localStorage.setItem('editor-level', JSON.stringify(data));
    console.log('[Editor] scene saved');
  }

  load() {
    const raw = localStorage.getItem('editor-level');
    if (!raw) return;

    this.clear();

    const data = JSON.parse(raw);
    data.forEach(item => {
      const obj = this.scene.add.rectangle(
        item.x,
        item.y,
        50,
        50,
        0xff0000
      );
      obj.setInteractive({ draggable: true });
      obj.type = item.type;
      this.objects.push(obj);
    });

    console.log('[Editor] scene loaded');
  }

  clear() {
    this.objects.forEach(o => o.destroy());
    this.objects = [];
  }
}
