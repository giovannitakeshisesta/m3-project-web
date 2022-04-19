import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {  BrowserRouter} from "react-router-dom";

import './styles/index.scss';
import { AuthContextProvider } from './contexts/AuthContext';

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
