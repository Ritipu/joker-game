import React from 'react';
import './Jogo.css';
import Corpo from '../Corpo/Corpo'
import Joker from '../Joker/Joker';
import Pontuacao1 from '../Pontuacao/Pontuacao1';
import Pontuacao2 from '../Pontuacao/Pontuacao2';


export default class Jogo extends React.Component {
    render() {
        return (
              <div className="Jogo">
                <div className="Pontos">
                  <div className="ptPlayer1"><p>Player 1</p><Pontuacao1 /></div>
                  <img className="Logo-top" src="assets/logos/pokejoker.png" alt="Logo do Jogo" />
                  <div className="ptPlayer2"><p>Player 2</p><Pontuacao2 /></div>
                </div>
                <div className="Jogo1">
                  <div className="joker"><Joker /></div>
                  <div className="jogo"><Corpo /></div>
                  <img className="Oak" src="/assets/imagens/oak.png" alt="Professor Carvalho" />
                </div>                
              </div>
          )
    }
}