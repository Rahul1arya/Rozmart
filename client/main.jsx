import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App.jsx';
import './index.css'; // Agar Tailwind ya CSS use kar raha hai

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
