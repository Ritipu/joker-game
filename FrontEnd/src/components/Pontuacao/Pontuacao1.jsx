import React from 'react';
import './Pontuacao1.css';


export default class Pontuacao1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pontos1: 0
        }
    }

    componentDidMount() {
        this.arrayPop()
    }

    arrayPop() {
        fetch("/pontos1")
            .then(res => res.json())
            .then(teste => this.setState(
                {
                    pontos1: teste
                }
            ))
        this.props.onClick()
    }

    render() {
		return (
			<div className="pontos1">
				{
					this.state.pontos1
				}
			</div>
		)
	}
}