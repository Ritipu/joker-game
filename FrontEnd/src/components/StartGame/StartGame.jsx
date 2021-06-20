import './StartGame.css';
import Counter from '../../counter'
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
        <div className="MenuStartGame">
          <header className="StartGame-header">
            <img className="LogoStartGame-logo" src="assets/logos/logo.png" alt="Logo" />
            <p>QUESTIONS</p>
            <input type="text" className="StartGame-input" placeholder="Who's that player?"></input>
            <button className="StartGame-button" onClick={this.jogo}>  <img src="/assets/imagens/pokeball.png" alt="Background" /> </button>
          </header>
        </div>
      )
    } else {
      return (
        <div className="StartGame">
          <header className="StartGame-header">
            <Pergunta />
            <Counter />
            <img src="/assets/imagens/oak.png" />
          </header>
        </div>
      )
    }
  }

}