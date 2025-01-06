import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store, persistor } from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "./store/axiosInterceptors"; // Pastikan path sesuai


const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Public Sans',
      textTransform: 'none',
      // fontSize: 1,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <ThemeProvider theme={theme}>

      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ThemeProvider>

    </PersistGate>
  </Provider>
</StrictMode>
)
