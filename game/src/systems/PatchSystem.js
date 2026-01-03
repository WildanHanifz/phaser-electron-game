import gameState from './GameState.js';

export default class PatchSystem {
  static async apply(patchFile) {
    const res = await fetch(`http://localhost:3000/patches/${patchFile}`);
    const patch = await res.json();

    // apply config patch
    if (patch.config) {
      Object.assign(gameState, patch.config);
    }

    console.log('[PatchSystem]', patch.message);
  }
}
