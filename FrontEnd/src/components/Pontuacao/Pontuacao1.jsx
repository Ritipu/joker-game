import React from 'react';
import './Pontuacao1.css';


export default class PontuacaoP1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pontos1: 0
        }
    }

    componentDidMount() {
        setInterval(() => this.pontuacao(), 200)
    }

    pontuacao() {
        fetch("/pontosP1")
            .then(res => res.json())
            .then(teste => this.setState(
                {
                    pontos1: teste
                }
            ))
    }

    render() {
		return (
			<div className="pontos1">
				<h4>PontuaçãoP1: {this.state.pontos1}</h4>
			</div>
		)
	}
}