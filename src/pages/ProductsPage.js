import React from 'react';
import Products from '../components/ProductsPage/Products';
import Hero from "../components/Hero";



export default function ProductPage() {
    return(
        <section>
         <video src={require('../asserts/video.mp4')} autoplay controls style={{width:"100%",height:'10%'}}/>
         <Products />
        </section>
    )
}
