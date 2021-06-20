import './StartGame.css';
import Pergunta from '../Pergunta/Pergunta'
import React from 'react';

export default class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStart: false
    }
    this.jogo = this.jogo.bind(this);
  }

  jogo() {
    this.setState({ gameStart: true });
  }

  render() {
    if (this.state.gameStart === false) {
      return (
        <div className="StartGame-header">

            <video id="bg_intro" autoPlay loop>
              <source src="/assets/videos/intro.mov" type="video/mp4"/>
              <source src="/assets/videos/intro.mov" type="video/ogg"/>
            </video>

            <img className="LogoStartGame-logo" src="assets/logos/logo.png" alt="Logo" />
            <p>QUESTIONS</p>
            <input type="text" className="StartGame-input" placeholder="Who's that player?"></input>
            <button className="StartGame-button" onClick={this.jogo}>  <img src="/assets/imagens/pokeball.png" alt="Background" /> </button>
        </div>
      )
    } else {
      return (
        <div className="StartGame">
          <header className="StartGame-header">
            <Pergunta />
          </header>
        </div>
      )
    }
  }

}