import React from 'react';
import './Pontuacao2.css';


export default class Pontuacao1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pontos2: 0
        }
    }

    componentDidMount() {
        this.arrayPop();
    }

    arrayPop() {
        fetch("/pontos2")
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
			<div className="pontos2">
				{
					this.state.pontos2
				}
			</div>
		)
	}
}