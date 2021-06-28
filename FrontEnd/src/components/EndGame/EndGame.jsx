import React from 'react';
import './EndGame.css';
import StartGame from '../StartGame/StartGame'

export default class EndGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pontos: 0
        }
    }

    componentDidMount() {
        this.adicionaJokerPontos();
        this.getPontos();
    }

    adicionaJokerPontos() {
        fetch("/pontosJoker");
    }

    getPontos() {
        fetch('/pontosScreen')
        .then(response => response.json())
        .then(pontos => this.setState({
            pontos: pontos
        }))
    }

    refresh() {
        window.location.reload()
    }

    render() {
        return (
            
                <div className="bgEndGame" style={{ backgroundImage: 'url(./assets/imagens/endGame.png' }}>
                    <div className="space"></div>
                    <p className="congrats">Parabéns {this.props.nomeJogador}!</p>
                    <p className="pontos">Acabaste com: <br /> <br />  {this.state.pontos} pontos</p>
                    <button onClick={this.refresh}> <img src="./assets/imagens/pokeball.png" /> Restart</button>
                </div>
        )
    }
}