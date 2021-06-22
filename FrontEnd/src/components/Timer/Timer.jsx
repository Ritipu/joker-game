import React from 'react';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: 30
        }
    }

    componentDidMount() {
       setInterval(() => this.time(), 1000);
    }

    time() {
 
        this.setState((state) => { 
            if (state.date - 1 === 0) {
                return {date: 30}
            }
            return {date: state.date - 1}
        })
    }

    render() {
        return (
            <div>
                <h3>{this.state.date}</h3>
            </div>
        )
    }
}