import React, {Component} from 'react';
import socketIOClient from 'socket.io-client';

const endpoint = 'http://localhost:3001';

class Weather extends Component{
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint
        }
    }
    componentDidMount() {
        const {endpoint} = this.state
        const socket = socketIOClient(endpoint);
        socket.on('Powered by Dark Sky', data => this.setState({response:data}));
    }
    render(){
        const {response} = this.state;
        return(
            <div style={{textAlign:"center"}}>
                {
                    response? <p>The temperature in Giv'atayim is: {response} °F
                    </p>: <p>Loading....</p>
                }
            </div>
        )
    }
}
export default Weather;
