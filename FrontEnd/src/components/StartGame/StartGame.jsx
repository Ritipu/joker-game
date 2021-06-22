import React from 'react';
import './StartGame.css';
import Corpo from '../Corpo/Corpo'
import Joker from '../Joker/Joker'
import Timer from '../Timer/Timer'
import PontuacaoP1 from '../Pontuacao/Pontuacao1'
import PontuacaoP2 from '../Pontuacao/Pontuacao2'
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
              <source src="/assets/videos/intro.mp4" type="video/mp4"/>
            </video>

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

{/* <PontuacaoP1 />
            <PontuacaoP2 />
            <Timer />
            <Joker onClick={() => console.log(this.subtraiRespostaErrada("a"))}/>
            <Corpo />
            <video className="videos" loop autoPlay mute>
              <source src="/assets/videos/perguntasMedias.mp4" type="video/mp4"/>
            </video> */}