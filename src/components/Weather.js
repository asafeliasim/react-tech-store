import React, {Component} from 'react';
import socketIOClient from 'socket.io-client';
import '../App.css'
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
        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('Powered by Dark Sky', data => this.setState({response:data}));
    }

    render(){
        const {response} = this.state;
        const celsius = Math.abs((response -32)*5/9).toFixed(2);

        return(
            <div className="weather" style={{textAlign:"center"}}>
                {
                    celsius? <p>The temperature in Giv'atayim is: {celsius} °C
                    </p>: <p>Loading....</p>
                }
            </div>
        )
    }
}
export default Weather;
