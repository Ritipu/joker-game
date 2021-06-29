import React from 'react';
import './StartGame.css';
import Jogo from '../Jogo/Jogo'

export default class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStart: false,
      nome: '',
      id: 0
    }

    this.jogo = this.jogo.bind(this);
    this.formChange = this.formChange.bind(this)
  }

  componentDidMount() {
    fetch('/geraID')
      .then(response => response.json())
      .then(response => this.setState({ id: response }))
    
    // 
  }


  sendName() {
    const nome = { nome: this.state.nome }
    fetch("/nome", {
      method: 'POST', body: JSON.stringify(nome) , headers: {"content-type": 'application/json'}
    })
  }
  
  jogo() {
    fetch(`/gravaJogo/${this.state.id}`)
    console.log(`Id do Jogo no StartGame: ${this.state.id}`)
    this.setState({ gameStart: true });
    this.sendName();
  }

  formChange(form) {
    this.setState({ nome: form.target.value });

  }

  // formSubmit(form) {
  //   form.preventDefault();
  // }

  render() {
    if (this.state.gameStart === false) {
      return (
        <div className="StartGame">
          <video className="videos" loop autoPlay muted>
            <source src="/assets/videos/intro.mp4" type="video/mp4" />
          </video>
          
          <audio className="audio" loop autoPlay>
              <source src="/assets/audio/startMusic.mp3" type="audio/mp3" />
          </audio>

          <img className="StartGame-logo" src="assets/logos/pokejoker.png" alt="Logo" />
          <p>QUESTIONS</p>

          <form onSubmit={this.jogo}>
            <input type="text" className="StartGame-input" placeholder="Who's that player?" required
              value={this.state.nome} onChange={this.formChange} />
            <br />
            <input type="image" className="StartGame-button" src="/assets/imagens/pokeball.png" alt="Submit"/>
          </form>

        </div>
      )
    } else {
      return (
        <div>
          <Jogo nomeJogador={this.state.nome} idJogo={this.state.id} />
        </div>
      )
    }
  }
}