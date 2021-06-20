import React from "react";

export default class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 0
		}
		this.ws = new WebSocket('ws://localhost:8080')
	}

	componentDidMount() {
		this.apanhaValor()

		this.ws.addEventListener('message', (event) => {
			if (event.data === 'update') {
				this.apanhaValor()
			}
		})
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
						} catch (err) {
							console.log(err);
						}
					}
				}>Incrementa</button>

				<button onClick={
					async (valor) => {
						try {
							const res = await fetch("/contador", {
								method: 'DELETE',
								headers: {
									"Content-Type": "application/json"
								}
							})
						} catch (err) {
							console.log(err);
						}
					}
				}>Decrementa por 10</button>
			</div>
		)
	}
}