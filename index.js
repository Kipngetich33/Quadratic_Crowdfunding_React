import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/index.css';
import App from './src/App';
import reportWebVitals from './src/reportWebVitals';

// import {renderDOM, renderView} from './views/render.js';
import * as backend from './build/index.main.mjs';
import { loadStdlib } from '@reach-sh/stdlib';
const stdlib = loadStdlib(process.env);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();