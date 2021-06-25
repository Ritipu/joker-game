import React from 'react';
import './Jogo.css';
import Corpo from '../Corpo/Corpo'
import Joker from '../Joker/Joker';
import Pontuacao1 from '../Pontuacao/Pontuacao1';
import Pontuacao2 from '../Pontuacao/Pontuacao2';


export default class Jogo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Jogo">
        <video className="videos" loop autoPlay mute>
          <source src="/assets/videos/perguntasFaceis.mp4" type="video/mp4" />
        </video>
        <div className="Pontos">
          <div className="ptPlayer1"><br/><Pontuacao1 nomeJogador={this.props.nomeJogador}/></div>
          <img className="Logo-top" src="assets/logos/pokejoker.png" alt="Logo do Jogo" />
          {/* <div className="ptPlayer2"><Pontuacao2 /></div> */}
        </div>
        <div className="Jogo1">
          <div className="joker"><Joker/></div>
          <div className="jogo"><Corpo /></div>
          <img className="Oak" src="/assets/imagens/oak.png" alt="Professor Carvalho" />
        </div>
      </div>
    )
  }
}

