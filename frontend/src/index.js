// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.css'; // Import global CSS

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
