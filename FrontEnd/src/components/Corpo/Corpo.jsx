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
    }

    encontraPerguntaCerta(){

    }

    render() {
        return (
            <div className="Corpo">
                <div className="Card">
                    <h2>{this.state.pergunta}</h2>
                    <div className="box1">
                        <button>
                            <img src="assets/imagens/poke_icon.png" />
                        {this.state.resposta_A.text}
                        </button><button>
                            <img src="assets/imagens/poke_icon.png" />
                        {this.state.resposta_B.text}
                        </button><button>
                            <img src="assets/imagens/poke_icon.png" />
                            {this.state.resposta_C.text}
                        </button><button>
                        <img src="assets/imagens/poke_icon.png" />
                        {this.state.resposta_D.text}
                        </button>      
                    </div>
                </div>    
            </div>
        )
    }
}

