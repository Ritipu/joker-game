import React from "react";

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }

        this.fetchMessages = this.fetchMessages.bind(this)
        this.ws = new WebSocket('ws://localhost:8080')
    }

    componentDidMount() {
        this.fetchMessages()

        this.ws.addEventListener('open', () => {
            this.ws.send('something')
        });

        this.ws.addEventListener('message', (event) => {
            if (event.data === 'update') {
                this.fetchMessages()
            }
        });
    }

    componentWillUnmount() {

    }

    fetchMessages() {
        fetch('/api/messages')
            .then(response => response.json())
            .then(json => this.setState({ 
                messages: json.messages.reserve()
            }))
    }

    render() {
        return (
            
        )
    }
}