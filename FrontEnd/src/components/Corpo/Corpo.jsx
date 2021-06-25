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
			perguntaCurrente: "",
			timer: 0,
			timerControl: 0,
		}
	}

	componentDidMount() {
		setInterval(() => this.time(), 1000);
		this.getPergunta();
	}

	getPergunta() {
		fetch("/perguntas")
			.then(response => response.json())
			.then(questions => this.setState(
				{
					pergunta: questions.question,
					resposta_A: questions.options[0],
					resposta_B: questions.options[1],
					resposta_C: questions.options[2],
					resposta_D: questions.options[3],
					resposta: questions.answer,
					perguntaCurrente: `${questions.numPergunta}/27`,
					timerControl: questions.numPergunta,
					timer: questions.timerControl
				}))
	}

	getPontosA() {
		if (this.state.resposta_A.key === this.state.resposta) {
			fetch("/maisPontosP1", { method: 'POST' })
		}

		if (this.state.resposta_A.key !== this.state.resposta) {
			fetch("/menosPontosP1", { method: 'DELETE' })
		}
	}

	getPontosB() {
		if (this.state.resposta_B.key === this.state.resposta) {
			fetch("/maisPontosP1", { method: 'POST' })
		}

		if (this.state.resposta_B.key !== this.state.resposta) {
			fetch("/menosPontosP1", { method: 'DELETE' })
		}
	}

	getPontosC() {
		if (this.state.resposta_C.key === this.state.resposta) {
			fetch("/maisPontosP1", { method: 'POST' })
		}

		if (this.state.resposta_C.key !== this.state.resposta) {
			fetch("/menosPontosP1", { method: 'DELETE' })
		}
	}

	getPontosD() {
		if (this.state.resposta_D.key === this.state.resposta) {
			fetch("/maisPontosP1", { method: 'POST' })
		}

		if (this.state.resposta_D.key !== this.state.resposta) {
			fetch("/menosPontosP1", { method: 'DELETE' })
		}
	}

    time() {

		if (this.state.timer - 1 === 0) {
			if (this.state.timerControl > 10 && this.state.timerControl < 20) {
				fetch("/numeroPergunta", { method: 'POST' })
				this.getPergunta()
				this.setState({ timer: 40 })
			} else if (this.state.timerControl > 20) {
				fetch("/numeroPergunta", { method: 'POST' })
				this.getPergunta()
				this.setState({ timer : 50 })
			} else {
				fetch("/numeroPergunta", { method: 'POST' })
				this.getPergunta()
				this.setState({ timer : 30 })
			}

		}

        this.setState((state) => { 
            return {timer: state.timer - 1}
        })
    }

	render() {
		return (
			<div className="Card">
				<h2>{this.state.timer}</h2>
				<br/>
				<h2>{this.state.perguntaCurrente}</h2>
				<br />

				<h1>{this.state.pergunta}</h1>
				<br />
				<div className="box1">
					<button onClick={async (valor) => {
						try {
							const res = await fetch("/numeroPergunta", {
								method: 'POST',
								headers: {
									"Content-Type": "application/json"
								}
							})
						} catch (err) {
							console.log(err);
						}
						this.getPontosA()
						this.getPergunta()
					}}><img src="/assets/imagens/poke_icon.png" />{this.state.resposta_A.text}</button>

					<button onClick={async (valor) => {
						try {
							const res = await fetch("/numeroPergunta", {
								method: 'POST',
								headers: {
									"Content-Type": "application/json"
								}
							})
						} catch (err) {
							console.log(err);
						}
						this.getPontosB()
						this.getPergunta()
					}}><img src="/assets/imagens/poke_icon.png" />{this.state.resposta_B.text}</button>

					<button onClick={async (valor) => {
						try {
							const res = await fetch("/numeroPergunta", {
								method: 'POST',
								headers: {
									"Content-Type": "application/json"
								}
							})
						} catch (err) {
							console.log(err);
						}
						this.getPontosC()
						this.getPergunta()
					}}><img src="/assets/imagens/poke_icon.png" />{this.state.resposta_C.text}</button>

					<button onClick={async (valor) => {
						try {
							const res = await fetch("/numeroPergunta", {
								method: 'POST',
								headers: {
									"Content-Type": "application/json"
								}
							})
						} catch (err) {
							console.log(err);
						}
						this.getPontosD()
						this.getPergunta()
					}}><img src="/assets/imagens/poke_icon.png" />{this.state.resposta_D.text}</button>
				</div>
			</div>
		)
	}
}

