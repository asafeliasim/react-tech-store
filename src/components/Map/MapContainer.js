import axios from 'react';
import React from 'react';

export default class MapContainer{
    state={
        branches: axios.get('http://localhost:3001/branches')
    }

}


/*
import React,{Component} from 'react';
import {Map,InfoWindow,GoogleApiWrapper} from "google-maps-react";
import axios from 'axios';
import {FaFlag} from 'react-icons/fa';
//import {ReactBingmaps,MapIcons,pushPins } from 'react-bingmaps';
import ReactMapGL,{ Marker } from 'react-map-gl';
import './map.css';


export class MapContainer extends Component {
        state= {
            latitude:32.075250,
            longitude:34.804720,
            width:'100vw',
            height:'400px',
            zoom: 16
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

        });


    }

    render(){
        const api = 'pk.eyJ1IjoiYXNhZmVsaWFzaW0iLCJhIjoiY2szbmV6bjN2MDlodzNkbzZxMm5hMXdzMyJ9.8N4XyIX5y-SyphxY8DJTBw';
        return(
            <ReactMapGL {...this.state} mapboxApiAccessToken={api}>
                <Marker latitude={this.state.latitude} longitude={this.state.longitude}>
                    <FaFlag style={{color:'red'}}/>
                </Marker>
            </ReactMapGL>
        )
         /!* return(
         <div className="map">
           <ReactBingmaps
             bingmapKey="AnfCjbtW1vdOZwBMCsn4D7nfV7WOR72Inv3vnd-jX8xYETed-u4eBFHzsblAw6-K"
             center = {[32.075250, 34.804720]}
             boundary = {this.state.boundary}
             pushPins = {'[32.075250, 34.804720],p10'}
             zoom={14}
             >
             </ReactBingmaps>
         </div>
         );*!/
     /!*   const markerTemplate = this.state.coordinates.map((c,index)=>
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
        );*!/
    }

}

export default GoogleApiWrapper({
    apiKey:"AIzaSyDCMcM8ZeU8sg3d9MwjPMYIzahdEmzgd9c"
})(MapContainer)
*/
