import './StartGame.css';
import Counter from '../../counter'
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
            <button className="StartGame-button" onClick={this.jogo}>  <img src="/assets/imagens/pokeball.png" alt="Background" /> </button>
          </header>
        </div>
      )
    } else {
      return (
        <div className="StartGame">
          <header className="StartGame-header">
           
            <Counter />
          </header>
        </div>
      )
    }
  }

}