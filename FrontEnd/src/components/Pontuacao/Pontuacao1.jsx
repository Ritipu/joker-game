import React from 'react';
import './Pontuacao.css';


export default class PontuacaoP1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pontos1: 0
        }
    }

    componentDidMount() {
        this.pontuacao()
    }

    pontuacao() {
        fetch("/pontos1")
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