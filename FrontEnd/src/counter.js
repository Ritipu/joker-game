import React from "react";

export default class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 0
		}
	}

	componentDidMount() {
		this.apanhaValor()
	}

	apanhaValor() {
		fetch("/contador").then(res => res.json())
			.then(contador => {
				this.setState({ counter: contador })
			})
	}

	render() {
		return (
			<div id="teste">
				<h1>Contador {this.state.counter}</h1>
				<button onClick={
					async (valor) => {
						try {
							const res = await fetch("/contador", {
								method: 'POST',
								headers: {
									"Content-Type": "application/json"
								}
							})
							this.apanhaValor()
						} catch (err) {
							console.log(err);
						}
					}
				}>Incrementa</button>
			</div>
		)
	}
}