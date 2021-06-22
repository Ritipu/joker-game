import React from 'react';
import './Pontuacao2.css';


export default class PontuacaoP2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pontos2: 0
        }
    }

    componentDidMount() {
        this.pontuacao();
    }

    pontuacao() {
        fetch("/pontos2")
            .then(res => res.json())
            .then(teste => this.setState(
                {
                    pontos2: teste
                }
            ))
    }

    render() {
		return (
			<div className="pontos2">
				<h4>PontuaçãoP2: {this.state.pontos2}</h4>
			</div>
		)
	}
}