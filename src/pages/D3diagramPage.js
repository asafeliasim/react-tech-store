import React from 'react';
import Title from '../components/Title';
import ChartWrapper from "../components/D3/ChartWrapper";
import ChartWrapper2 from '../components/D3/ChartWrapper2';
export default function D3diagramPage(){
    return(
        <div>
        <Title title="Selling diagram" center/>
            <div className="container justify-content-center mb-5 mx-auto">
                <ChartWrapper />
                <ChartWrapper2 />
            </div>

        </div>
    )
}
