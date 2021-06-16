import React from "react";
import axios from "axios";

export default class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 0
		}
	}

	incrementa = () => {
		axios.get("/contador").then(res => {
			console.log(res.data);
			this.setState({counter: res.data})
		})
	};

	render() {
		return (
			<div>
				<h1>Contador {this.state.counter}</h1>
				<button onClick={this.incrementa}>Incrementa</button>
			</div>
		)
	}
}