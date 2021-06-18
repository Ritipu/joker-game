import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StartGame from './components/StartGame/StartGame';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <StartGame />
  </React.StrictMode>,
  document.getElementById('root')
);

// fetch("/")
//   .then(response => response.text())
//   .then(text => console.log("GET /api =>", text))
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
