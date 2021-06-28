import React from 'react';
import './EndGame.css';

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
            <div>
                <h1>Parabens {this.props.nomeJogador}! Acabaste com: {this.state.pontos} pontos</h1>
                <button onClick={fetch("/restartState", {
								method: 'POST',
								headers: {"Content-Type": "application/json"}
							}),
                            this.refresh
						}
                        >
                            Restart Game</button>
            </div>
        )
    }
}

