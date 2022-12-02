import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './Contexts/CamisetaContext';
import ShopProvider from './Contexts/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ShopProvider>
          <App />
      </ShopProvider>
    </ThemeProvider>
  </React.StrictMode>
);