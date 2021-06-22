import React from 'react';
import './Corpo.css';

export default class Corpo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pergunta: "",
			resposta_A: { key: "", value: "" },
			resposta_B: { key: "", value: "" },
			resposta_C: { key: "", value: "" },
			resposta_D: { key: "", value: "" },
			resposta: "",
			perguntaCurrente: ""
		}
	}

	componentDidMount() {
		this.getDificuldadePergunta();
	}

	getDificuldadePergunta() {
		// store na perguntaCurrente: "1/25"
		fetch("/numeroPergunta")
			.then(response => response.json())
			.then(response => this.setState({ perguntaCurrente: `${response}/27` }))

		fetch('/numeroPergunta')
			.then(response => response.json())
			.then(response =>
				response <= 10 ? this.getPerguntaEasy() :
					response > 10 && response <= 20 ? this.getPerguntaMedium() :
						response > 20 && response <= 27 ? this.getPerguntaHard() : undefined)
	}

	getPerguntaEasy() {
		fetch("/perguntasEasy")
			.then(response => response.json())
			.then(questions => this.setState(
				{
					pergunta: questions.question,
					resposta_A: questions.options[0],
					resposta_B: questions.options[1],
					resposta_C: questions.options[2],
					resposta_D: questions.options[3],
					resposta: questions.answer
				}))
	}

	getPerguntaMedium() {
		fetch("/perguntasMedium")
			.then(response => response.json())
			.then(questions => this.setState(
				{
					pergunta: questions.question,
					resposta_A: questions.options[0],
					resposta_B: questions.options[1],
					resposta_C: questions.options[2],
					resposta_D: questions.options[3],
					resposta: questions.answer
				}))
	}

	getPerguntaHard() {
		fetch("/perguntasHard")
			.then(response => response.json())
			.then(questions => this.setState(
				{
					pergunta: questions.question,
					resposta_A: questions.options[0],
					resposta_B: questions.options[1],
					resposta_C: questions.options[2],
					resposta_D: questions.options[3],
					resposta: questions.answer
				}))
	}

	encontraPerguntaCerta() {
		if (this.state.resposta_A.key === this.state.resposta) {
			// return pontuacao + 100
		}

	}

	render() {
		return (
			<div className="Corpo">
				<h2>{this.state.perguntaCurrente}</h2>
				<br />

				<h1>{this.state.pergunta}</h1>
				<br />

				<button onClick={async (valor) => {
					try {
						const res = await fetch("/numeroPergunta", {
							method: 'PUT',
							headers: {
								"Content-Type": "application/json"
							}
						})
					} catch (err) {
						console.log(err);
					}
					this.getDificuldadePergunta()
				}}>A: {this.state.resposta_A.text}</button>
				<button onClick={async (valor) => {
					try {
						const res = await fetch("/numeroPergunta", {
							method: 'PUT',
							headers: {
								"Content-Type": "application/json"
							}
						})
					} catch (err) {
						console.log(err);
					}
					this.getDificuldadePergunta()
				}}>B: {this.state.resposta_B.text}</button>
				<button onClick={async (valor) => {
					try {
						const res = await fetch("/numeroPergunta", {
							method: 'PUT',
							headers: {
								"Content-Type": "application/json"
							}
						})
					} catch (err) {
						console.log(err);
					}
					this.getDificuldadePergunta()
				}}>C: {this.state.resposta_C.text}</button>
				<button onClick={async (valor) => {
					try {
						const res = await fetch("/numeroPergunta", {
							method: 'PUT',
							headers: {
								"Content-Type": "application/json"
							}
						})
					} catch (err) {
						console.log(err);
					}
					this.getDificuldadePergunta()
				}}>D: {this.state.resposta_D.text}</button>

			</div>
		)
	}
}

