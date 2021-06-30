import React from 'react';
import './Jogo.css';
import Corpo from '../Corpo/Corpo'
import Joker from '../Joker/Joker';
import Pontuacao1 from '../Pontuacao/Pontuacao1';
import Pontuacao2 from '../Pontuacao/Pontuacao2';

export default class Jogo extends React.Component {
<<<<<<< Updated upstream
=======
  constructor(props) {
    super(props);
    this.state = {
      jokerKey: '',
      numPergunta: 0,
      endGame: false,
      jokerState: false,
      pontos: 0,
      jogador: ""
    }

    this.disableJoker = this.disableJoker.bind(this)
    this.enableJoker = this.enableJoker.bind(this)
  }
  componentDidMount() {
    this.getPerguntaForVideo();
    this.pontuacao();
  }

  async apagarRespostaErradaComJoker() {
    await fetch("/joker", { method: 'DELETE' })
      .then(response => response.json())
      .then(response => this.setState({ jokerKey: response }));
  }

  getPerguntaForVideo() {
    fetch("/video")
      .then(response => response.json())
      .then(response => this.setState({ numPergunta: response }));
  }

  getCorrectVideo() {

    if (this.state.numPergunta > 0 && this.state.numPergunta <= 10) {
      return "/assets/videos/perguntasFaceis.mp4" 
    }

    if (this.state.numPergunta > 10 && this.state.numPergunta <= 20) {
      return "/assets/videos/perguntasMedias.mp4"
    }

    if (this.state.numPergunta > 20 ) {
      return "/assets/videos/perguntasDificeis.mp4"
    }
  }

  getCorrectAudio() {

    if (this.state.numPergunta > 0 && this.state.numPergunta <= 10) {
      return "/assets/audio/easyMusic.mp3" 
    }

    if (this.state.numPergunta > 10 && this.state.numPergunta <= 20) {
      return "/assets/audio/mediumMusic.mp3"
    }

    if (this.state.numPergunta > 20 ) {
      return "/assets/audio/hardMusic.mp3"
    }
  }

  async pontuacao() {
   await fetch("/pontosScreen")
        .then(res => res.json())
        .then(pontos => this.setState(
            {
                pontos: pontos
            }
        ))
  }

	clearJokerKey() {
		this.setState({ jokerKey: '' });
	}

  async disableJoker() {
    this.setState({ jokerState: true });
  }

  enableJoker() {
    this.setState({ jokerState: false });
  }

  getEndGame() {
    this.setState({endGame: true})
  }

>>>>>>> Stashed changes

  render() {
    return (
      <div className="Jogo">
        <video className="videos" loop autoPlay mute>
          <source src="/assets/videos/perguntasFaceis.mp4" type="video/mp4" />
        </video>
        <audio class="audio" loop autoPlay>
          <source src="/assets/audio/easyMusic.mp3" type="audio/mp3" />
        </audio>
        <div className="Pontos">
          <div className="ptPlayer1"><Pontuacao1 /></div>
          <img className="Logo-top" src="assets/logos/pokejoker.png" alt="Logo do Jogo" />
          
          <div className="ptPlayer2"><Pontuacao2 /></div>
        </div>
        <div className="Jogo1">
          <div className="joker"><Joker/></div>
          <div className="jogo"><Corpo /></div>
          <img className="Oak" src="/assets/imagens/oak.png" alt="Professor Carvalho" />
        </div>
      </div>
    )
  }
}

