import React from 'react';
import './Corpo.css';

export default class Corpo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pergunta: "",
			respostas: [],
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
				respostas: [questions.options[0], // {"key": "a", "text": "1996"},
				questions.options[1],
				questions.options[2],
				questions.options[3]
				],
			perguntaCurrente: `${questions.numPergunta}/27`,
			timerControl: questions.numPergunta,
			timer: questions.timerControl
		}))
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

						try {
							await fetch("/pontos", {
								method: 'POST',
								body: JSON.stringify(res),
								headers: {
									"Content-Type": "application/json"
								}
							})
						}
						catch (err) {
							console.log(err);
						}
						this.state.timerControl < 27 ? this.gameController() : this.props.getEndGame()
					}}
					>
					<img src="/assets/imagens/poke_icon.png" className="pokeBola" alt="pergunta_pokeball"/>{res.text}
					</button>
					))
				}
				</div>
				</div>
				)
			}
		}