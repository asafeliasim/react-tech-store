import React from 'react';
import Info from '../components/AboutPage/Info';
import Hero from "../components/Hero";
import aboutBcg from '../images/aboutBcg.jpeg';
import MapBox from '../components/Map/MapBox';
import '../components/Map/map.css'


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
