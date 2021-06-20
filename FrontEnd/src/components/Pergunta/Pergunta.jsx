import React from 'react';
import './Pergunta.css';

class Pergunta extends React.Component {
    state = {
        questions: [],
    };

    componentDidMount() {
        fetch("../../../Backend/perguntas.json")
            .then(response => response.json())
            .then(questions => this.setState({ questions }))
    }

    render() {
        const {questions} = this.state;

        return (
            <div className="Pergunta">
                {questions.map(question => (
                    <div key={question.number}>
                        <p>{question.question}</p>
                    </div>
                ))}
            </div>
        )
    }
}


export default Pergunta;