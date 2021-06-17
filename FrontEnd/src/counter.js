import React from "react";

export default class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 0
		}
	}

	incrementa = () => {
		fetch("/contador").then(res => {
			return res.json();
		})
		.then(contador => {
			console.log(contador)
			this.setState({counter: contador})
		})
	}

	render() {
		return (
			<div>
				<h1>Contador {this.state.counter}</h1>
				<button onClick={this.incrementa}>Incrementa</button>
			</div>
		)
	}
}