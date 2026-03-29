import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';
import { Toaster } from './components/ui/sonner';
import { Provider } from 'react-redux';
import store from './redux/store';
import { persistStore } from "redux-persist";  // fix import
import { PersistGate } from 'redux-persist/integration/react';  // fix import casing and path

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
