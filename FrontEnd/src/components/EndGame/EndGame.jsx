import React from 'react';
import './EndGame.css';

export default class EndGame extends React.Component {

	async componentDidMount() {
		await this.adicionaJokerPontos();
		await this.props.pontosCalculo();
	}

	async adicionaJokerPontos() {
		await fetch("/pontosJoker");
	}

	refresh() {
		window.location.reload()
	}

	render() {
		return (
			<div>
				<h1>Parabens {this.props.nomeJogador}! Acabaste com: {this.props.pontosDisplay} pontos</h1>
				<button onClick={async (valor) => {
					await fetch("/restartState", {
						method: 'POST',
						headers: { "Content-Type": "application/json" }
					})
					this.refresh()
				}
				}
				>
					Restart Game</button>
			</div>
		)
	}
}

