import React from 'react';
import Info from '../components/AboutPage/Info';
import Hero from "../components/Hero";
import aboutBcg from '../images/aboutBcg.jpeg';
//import MapContainer from '../components/Map/MapContainer';
import MapBox from '../components/Map/MapBox';
import '../components/Map/map.css'
import {branches} from '../components/Map/MapContainer'
/*
import {withScriptjs,withGoogleMap} from "react-google-maps";

const WrappedMap = withScriptjs(withGoogleMap(MapContainer));
*/

export default function AboutPage() {
    //const branches = getBranches();
    return(
        <>
            <Hero img={aboutBcg} />
            <Info/>

            <MapBox />
        </>
    )
}
