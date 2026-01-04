const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('updater', {
  onDone: (cb) => ipcRenderer.on('update-done', cb)
});
