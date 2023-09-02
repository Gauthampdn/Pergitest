import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TemplatesContextProvider } from './context/TemplatesContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TemplatesContextProvider>
        <App />
      </TemplatesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)