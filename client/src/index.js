import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import process from 'process';
window.process = process;

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);