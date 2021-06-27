import React from 'react';
import './Corpo.css';

export default class Corpo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pergunta: "",
			respostas: [],
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
				respostas: [questions.options[0],
				questions.options[1],
				questions.options[2],
				questions.options[3]
				],
			resposta: questions.answer,
			perguntaCurrente: `${questions.numPergunta}/27`,
			timerControl: questions.numPergunta,
			timer: questions.timerControl
		}))
	}
	
	// TO_ DO
	// REFACTORIZAR A ATRIBUICAO DE PONTOS ÀS RESPOSTAS NO BACK END E FRONT END
	getPontos() {
		// if (this.state.resposta_A.key === this.state.resposta) {
		// 	fetch("/maisPontosP1", { method: 'POST' })
		// }
		
		// if (this.state.resposta_A.key !== this.state.resposta) {
		// 	fetch("/menosPontosP1", { method: 'DELETE' })
		// }
	}

	time() {
		
		if (this.state.timer - 1 === 0) {
			if (this.state.timerControl > 10 && this.state.timerControl < 20) {
				fetch("/numeroPergunta", { method: 'POST' })
				this.gameController()
				this.setState({ timer: 40 })
			} else if (this.state.timerControl > 20) {
				fetch("/numeroPergunta", { method: 'POST' })
				this.gameController()
				this.setState({ timer : 50 })
			} else {
				fetch("/numeroPergunta", { method: 'POST' })
				this.gameController()
				this.setState({ timer : 30 })
			}
			
		}
		
		this.setState((state) => { 
			return {timer: state.timer - 1}
		})
	}

	gameController() {
		this.props.videoControl();
		this.props.clearJokerKey();
		this.props.enableJoker();
		this.props.pontuacao();

		this.getPergunta()
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
			{
				this.state.respostas.map((res) => (
					<button key={res.key} 
					disabled={this.props.jokerKey.jokerKey !== res.key ? false : true}
					onClick={async (valor) => {
						try {
							await fetch("/numeroPergunta", {
								method: 'POST',
								headers: {
									"Content-Type": "application/json"
								}
							})
						} catch (err) {
							console.log(err);
						}
						this.state.timerControl < 27 ? this.gameController() : this.props.getEndGame()
					}}
					>
					<img src="/assets/imagens/poke_icon.png" alt="pergunta_pokeball"/>{res.text}
					</button>
					))
				}
				</div>
				</div>
				)
			}
		}