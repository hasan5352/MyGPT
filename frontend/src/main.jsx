import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import App from './App.jsx'
import "./index.css";
import axios from 'axios';

// set axios base URL
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_API_URL;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </StrictMode>,
)
