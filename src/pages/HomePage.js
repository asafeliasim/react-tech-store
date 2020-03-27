import React from 'react';
import Hero from "../components/Hero";
import {Link} from 'react-router-dom'
import Services from '../components/HomePage/Services';
import Features from '../components/HomePage/Featured';
import Weather from "../components/Weather";

export default function HomePage() {
    return(
        <>
            <Hero title="awesome gadgets" max='true'>
                <Link to="/products" className="main-link"
                style={{margin:'2rem'}}>
                    Our Products
                </Link>
            </Hero>
            <Weather />
            <Services />
            <Features />

        </>
    )
}
