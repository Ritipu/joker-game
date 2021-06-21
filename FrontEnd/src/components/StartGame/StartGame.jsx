import './StartGame.css';
import Pergunta from '../Pergunta/Pergunta'
import Joker from '../Joker/Joker'
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

            <video class="videos" loop autoPlay mute>
              <source src="/assets/videos/intro.mp4" type="video/mp4"/>
            </video>

            <img className="LogoStartGame-logo" src="assets/logos/logo.png" alt="Logo" />
            <p>QUESTIONS</p>
            <input type="text" className="StartGame-input" placeholder="Who's that player?"></input>
            <button className="StartGame-button" onClick={this.jogo}>  <img src="/assets/imagens/pokeball.png" alt="Background" /> </button>
        </div>
      )
    } else {
      return (
        <div className="StartGame-header">
            <Joker/>
            <Pergunta />

            <video class="videos" loop autoPlay mute>
              <source src="/assets/videos/perguntasFaceis.mp4" type="video/mp4"/>
            </video>


        </div>
      )
    }
  }

}