import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store,persistor} from './Store/store.js'

import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/Loader.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> 
     <Provider store={store}>
     <PersistGate loading={<div><Loader/></div>} persistor={persistor}>
    <App />
    </PersistGate>
 </Provider>
    </BrowserRouter>
 
);


reportWebVitals();
