import React from 'react';
import './Jogo.css';
import Corpo from '../Corpo/Corpo'
import Joker from '../Joker/Joker';
import EndGame from '../EndGame/EndGame';

export default class Jogo extends React.Component {

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

  render() {
    if(this.state.endGame === false) {
      return (
        <div className="Jogo">

          <video className="videos" src={this.getCorrectVideo()} loop autoPlay muted>
          </video>

          <audio className="audio" src={this.getCorrectAudio()} loop autoPlay>
          </audio>

          <div className="Pontos">
            <div className="ptPlayer1">
              <h2>{this.props.nomeJogador}</h2> <br/>
              <h2>{`Pontos: ${this.state.pontos}`}</h2>
            </div>
            <div className="box-logo">
              <img className="Logo-top" src="assets/logos/pokejoker.png" alt="Logo do Jogo" />
            </div>
            
            {/* <div className="ptPlayer2"><Pontuacao2 /></div> */}
          </div>

          <div className="Jogo1">

            <div className="joker"><Joker getJokerKey={() => this.apagarRespostaErradaComJoker()}
            jokerState={this.state.jokerState} 
            disableJoker={() => this.disableJoker()}/></div>
            
            <div className="jogo"><Corpo jokerKey={this.state.jokerKey} 
            clearJokerKey={() => this.clearJokerKey()} 
            videoControl={() => this.getPerguntaForVideo()}
            getEndGame={() => this.getEndGame()}
            enableJoker={() => this.enableJoker()}
            pontuacao={() => this.pontuacao()}
            /></div>

            <img className="Oak" src="/assets/imagens/oak.png" alt="Professor Carvalho" />
          </div>
        </div>
      )
    } else {
      return (
        <EndGame pontosCalculo={() => this.pontuacao()} pontosDisplay={this.state.pontos} nomeJogador={this.props.nomeJogador}/>
      )
    }
  }
}

