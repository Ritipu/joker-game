import React from 'react';
import './Joker.css';

export default class Joker extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			joker: [],
		}
		this.keysENumeroJoker = this.keysENumeroJoker.bind(this)
	}

	componentDidMount() {
		this.arrayPop()
	}

	async arrayPop() {
		await fetch("/joker")
			.then(res => res.json())
			.then(arrayJoker => this.setState(
				{
					joker: arrayJoker
				}
			))

	}

	async keysENumeroJoker() {
		await this.props.getJokerKey(); // gera chave do joker a apagar
		await this.arrayPop(); // apaga visualmente o joker
		await this.props.disableJoker(); // set disabled = true
	}
	
	render() {
		return (
			<div className="joker">
				{
					this.state.joker.map((joker, i) => (
						<button key={i} disabled={this.props.jokerState} onClick={this.keysENumeroJoker}>
							<img src="/assets/imagens/joker.svg" height="80px"alt="joker" className="Joker-button"/>
						</button>
					))
				}
			</div>
		)
	}
}