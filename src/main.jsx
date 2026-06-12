import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppContextProvider from './context/AppContext.jsx'
///  backend connection
import axios from 'axios';
import { Provider } from 'react-redux'
import store from './store/index.js'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </Provider>
)
