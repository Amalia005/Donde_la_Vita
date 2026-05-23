import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Punto de entrada de la aplicación React
const raiz = ReactDOM.createRoot(document.getElementById('raiz'));
raiz.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
