import React from 'react';
import './Joker.css';


export default class Joker extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			joker: []
		}
	}

	componentDidMount() {
		this.arrayPop()
	}

	arrayPop() {
		fetch("/joker")
			.then(res => res.json())
			.then(arrayJoker => this.setState(
				{
					joker: arrayJoker
				}
			))
	}

	render() {
		return (
			<div className="joker">
				{
					this.state.joker.map((joker, i) => (
<<<<<<< Updated upstream
						<button key={i} onClick={async (valor) => {
							try {
								const res = await fetch("/joker", {
									method: 'DELETE',
									headers: {
										"Content-Type": "application/json"
									}
								})
							} catch (err) {
								console.log(err);
							}
							this.arrayPop()
						}}>
							{joker}
=======
						<button key={i} disabled={this.props.jokerState} onClick={this.keysENumeroJoker} className="joker-button">
							<img src="/assets/imagens/joker.svg" height="50px" className="joker-pikachu" alt="joker" />
>>>>>>> Stashed changes
						</button>
					))
				}
			</div>
		)
	}
}