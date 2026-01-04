const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');
const path = require('path');

let win;

autoUpdater.logger = log;
autoUpdater.autoDownload = false;

function sendDone() {
  if (win && win.webContents) {
    win.webContents.send('update-done');
  }
}

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, '../game/index.html'));

  win.once('ready-to-show', () => {
    autoUpdater.checkForUpdates();

    // ⬇⬇⬇ INI KUNCI NYAWA
    setTimeout(sendDone, 3000); // fallback HARD
  });
}

autoUpdater.on('update-available', () => {
  autoUpdater.downloadUpdate();
});

autoUpdater.on('update-not-available', sendDone);
autoUpdater.on('error', sendDone);

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});

app.whenReady().then(createWindow);
