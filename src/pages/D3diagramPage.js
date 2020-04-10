import React from 'react';
import Title from '../components/Title';
import ChartWrapper from "../components/D3/ChartWrapper";

export default function D3diagramPage(){
    return(
        <div>
        <Title title="Selling diagram" center/>
            <div className="container justify-content-center mb-5 mx-auto">
                <ChartWrapper />
            </div>

        </div>
    )
}
