import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import App from './App.jsx'
import "./index.css";
import axios from 'axios';

// set axios auth header globally from stored token (will be overridden if Sidebar also sets it)
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </StrictMode>,
)
