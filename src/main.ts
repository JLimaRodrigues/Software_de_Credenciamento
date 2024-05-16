import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import './backend/server';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Configuração do preload
      contextIsolation: true, // Habilitar isolamento de contexto
      enableRemoteModule: false // Desabilitar o módulo remoto por razões de segurança
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});