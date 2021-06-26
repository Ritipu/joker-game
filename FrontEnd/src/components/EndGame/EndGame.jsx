import React from 'react';
import './EndGame.css';
import StartGame from '../StartGame/StartGame'

export default class EndGame extends React.Component {

    refresh() {
        window.location.reload()
    }
    render() {
        return (
            <div>
                <h1>Parabens {this.props.nomeJogador}! Acabaste com: {this.props.pontosFinais} pontos</h1>
                <button onClick={this.refresh}>Restart Game</button>
            </div>
        )
    }
}