import React from 'react';
import './Corpo.css';

export default class Corpo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pergunta: "",
            resposta_A: {key: "", value: ""},
            resposta_B: {key: "", value: ""},
            resposta_C: {key: "", value: ""},
            resposta_D: {key: "", value: ""},
            resposta: ""
        }
		  this.getPerguntaEasy = this.getPerguntaEasy.bind(this)
    }

    componentDidMount() {
        this.getPerguntaEasy();
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
        // fazer comparacao para encontrar uma resposta invalida e 
        // passar como prop para o StartGame
    }

    encontraPerguntaCerta(){
		if (this.state.resposta_A.key === this.state.resposta) {
			// return pontuacao + 100
		}

    }

    render() {
        return (
            <div className="Corpo">
                <h1>{this.state.pergunta}</h1>
                <br/>

                <button onClick={this.getPerguntaEasy}>A: {this.state.resposta_A.text}</button>
                <button onClick={this.getPerguntaEasy}>B: {this.state.resposta_B.text}</button>
                <button onClick={this.getPerguntaEasy}>C: {this.state.resposta_C.text}</button>
                <button onClick={this.getPerguntaEasy}>D: {this.state.resposta_D.text}</button>

            </div>
        )
    }
}

