import logo from './assets/logos/logo.svg';
import './assets/css/App.css';
import Counter from './counter'
import React from 'react';

export default class App extends React.Component {
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
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <button onClick={this.jogo}>Start Game</button>
          </header>
        </div>
      )
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Counter />
          </header>
        </div>
      )
    }
  }

}