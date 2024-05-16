import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './pages/LoginPage';

// Exemplo de uso da API exposta pelo preload
window.electron.ipcRenderer.send('channel-name', 'Hello from Renderer');

ReactDOM.render(<LoginPage />, document.getElementById('root'));