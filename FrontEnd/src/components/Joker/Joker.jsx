import React from 'react';
import './Joker.css';


export default class Joker extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			joker: [1, 1, 1, 1, 1, 1, 1]
		}
	}

	componentDidMount() {
		this.arrayPop()
	}

	arrayPop() {
		fetch("/joker")
			.then(res => res.json())
			.then(teste => this.setState(
				{
					joker: teste
				}
			))
	}

	render() {
		return (
			<div className="joker">
				{
					this.state.joker.map((joker, i) => (
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
						</button>
					))
				}
			</div>
		)
	}
}