import React from 'react';
import Info from '../components/AboutPage/Info';
import Hero from "../components/Hero";
import aboutBcg from '../images/aboutBcg.jpeg';
import MapContainer from '../components/MapContainer';
/*
import {withScriptjs,withGoogleMap} from "react-google-maps";

const WrappedMap = withScriptjs(withGoogleMap(MapContainer));
*/

export default function AboutPage() {
    return(
        <>
            <Hero img={aboutBcg} />
            <Info/>
            {/*<div style={{width:"100vw",height:"100vh"}}>*/}
            {/*<WrappedMap googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
            'libraries=geometry,drawing,places&key=AIzaSyDCMcM8ZeU8sg3d9MwjPMYIzahdEmzgd9c'}
             loadingElement={<div style={{height:"80%"}} />}
             containerElement={<div style={{height:"80%"}} />}
             mapElement={<div style={{height:"80%"}} />}
            />*/}
            {/*</div>*/}
            <MapContainer />
        </>
    )
}
