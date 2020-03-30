import React,{Component} from 'react';
import {Map,InfoWindow,GoogleApiWrapper,Marker} from "google-maps-react";
import axios from 'axios';
export class MapContainer extends Component {

    state={
      coordinates:[

      ]
    };
    async componentDidMount() {
        const branches = await axios.get('http://localhost:3001/branches');
        console.log(branches);
        branches.data.map(async branch => {
            let coordinates = await axios.get(`http://localhost:3001/geocode/${branch.address}`);
            let obj={
                longitude: coordinates.data.longitude,
                latitude: coordinates.data.latitude
            };
            console.log(obj)
            this.setState({coordinates:[...this.state.coordinates,obj]});
            console.log(this.state);
        });


    }
    render(){
        const markerTemplate = this.state.coordinates.map((c,index)=>
            <Marker
                key={index}
                position={{lat: c.latitude, lng: c.longitude}}
            />
        );
        return (
            <Map google={this.props.google}
                 zoom={14}
                 initialCenter={{
                     lat: 32.0729592,
                     lng: 34.8072057
                 }}
            >
                {markerTemplate}
            </Map>
        );
    }

}

export default GoogleApiWrapper({
    apiKey:"AIzaSyDgRDotNU3O6JtOCxD2XJRiro4JuoHsm4g"
})(MapContainer)
