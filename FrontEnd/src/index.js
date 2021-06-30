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


function onClickHandler(event) {
<<<<<<< Updated upstream
  console.log(event)
  console.log(event.target.tagName)
=======
  console.log(event.target.className)
>>>>>>> Stashed changes
  if (event.target.tagName === 'INPUT') {
    const audioObj = new Audio('/assets/audio/clickButton.wav');
    audioObj.play();
  }
  else if (event.target.tagName === 'IMG') {
    const audioObj = new Audio('/assets/audio/clickButton.wav');
    audioObj.play();
  }
  else if (event.target.className === 'joker-button') {
    const audioObj = new Audio('/assets/audio/pikachuSoundJoker.mp3');
    audioObj.play();
  } 
  else if (event.target.tagName === 'BUTTON') {
    const audioObj = new Audio('/assets/audio/clickButton.wav');
    audioObj.play();
  }
<<<<<<< Updated upstream
=======
  else if (event.target.className === 'pokeBola') {
    const audioObj = new Audio('/assets/audio/clickButton.wav');
    audioObj.play();
  } 
  else if (event.target.className === 'joker-pikachu') {
    const audioObj = new Audio('/assets/audio/pikachuSoundJoker.mp3');
    audioObj.play();
  }
  else if (event.target.className === 'joker') {
    const audioObj = new Audio('/assets/audio/pikachuSoundJoker.mp3');
    audioObj.play();
  }
>>>>>>> Stashed changes
  else {
    const audioObj = new Audio('/assets/audio/wrongClick.wav');
    audioObj.play();
  }
  
}

document.getElementById('root').addEventListener('click', onClickHandler)

// fetch("/")
//   .then(response => response.text())
//   .then(text => console.log("GET /api =>", text))
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
