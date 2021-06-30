import React from 'react';
import './EndGame.css';

export default class EndGame extends React.Component {

	async componentDidMount() {
		await this.adicionaJokerPontos();
		await this.props.pontosCalculo();
	}

	async adicionaJokerPontos() {
		await fetch("/pontosJoker");
	}

	refresh() {
		window.location.reload()
	}

render() {
        return (
            
                <div className="bgEndGame" style={{ backgroundImage: 'url(./assets/imagens/endGame.png' }}>
					<audio className="audio" loop autoPlay>
              			<source src="/assets/audio/endCredits.mp3" type="audio/mp3" />
         			</audio>

                    <div className="space"></div>
                    <p className="congrats">Parabéns {this.props.nomeJogador}!</p>
                    <p className="pontos">Acabaste com: <br /> <br />  {this.props.pontosDisplay} pontos</p>
                    <button className="btnEndGame"onClick={this.refresh}> 
					<img src="./assets/imagens/pokeball.png" alt="Restart" className="btnEndGameImg"/> Restart</button>

                </div>
        )
    }
}
