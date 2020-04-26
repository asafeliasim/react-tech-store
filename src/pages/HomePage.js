import React, {useContext,useEffect} from 'react';
import Hero from "../components/Hero";
import {Link} from 'react-router-dom'
import Services from '../components/HomePage/Services';
import Features from '../components/HomePage/Featured';
import Weather from "../components/Weather";
import AuthContext from "../context/auth/AuthContext";
const HomePage=()=> {
    const authContext = useContext(AuthContext);
    useEffect(()=>{
        authContext.loadUser();
        //eslint-disable-next-line
    },[]);
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
};
export default HomePage;
