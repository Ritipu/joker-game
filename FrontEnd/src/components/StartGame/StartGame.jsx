import React from 'react';
import './StartGame.css';
import Jogo from '../Jogo/Jogo'

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

	subtraiRespostaErrada(resposta) {
		return resposta + "b"
	}

  render() {
    if (this.state.gameStart === false) {
      return (
        <div className="StartGame">
            <video class="videos" loop autoPlay mute>
              <source src="/assets/videos/intro.mp4" type="video/mp4" />
            </video>
            <audio class="audio" loop autoPlay>
              <source src="/assets/audio/startMusic.mp3" type="audio/mp3" />
            </audio>
            <img className="StartGame-logo" src="assets/logos/pokejoker.png" alt="Logo" />
            <p>QUESTIONS</p>
            <input type="text" className="StartGame-input" placeholder="Who's that player?"></input>
            <button className="StartGame-button" onClick={this.jogo}><img src="/assets/imagens/pokeball.png" alt="Background" /></button>
        </div>
      )
    } else {
      return (
        <div>
            <Jogo />
        </div>
      )
    }
  }

}
