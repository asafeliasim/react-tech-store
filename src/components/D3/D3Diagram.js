import * as d3 from 'd3';
import React from "react";
const url = "http://localhost:3001/productsApi";
const MARGIN = {TOP:10,BOTTOM:50,LEFT:70,RIGHT:10};
const WIDTH = 800- MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;



export default class D3Diagram{

    constructor(element){
        const svg =
            d3.select(element)
                .append("svg")
                .attr("width",WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
                .attr("height",HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
                .append("g")
                .attr("transform", `translate(${MARGIN.LEFT},${MARGIN.TOP})`);
        d3.json(url).then(data=>{
            const y = d3.scaleLinear()
                .domain([d3.min(data,d=>d.countOfBuy),d3.max(data,d=> d.countOfBuy)])
                .range([HEIGHT,0]);

            const x = d3.scaleBand()
                .domain(data.map(d=>d.title))
                .range([0,WIDTH])
                .padding(0.4);

            const xAxisCall = d3.axisBottom(x);
            svg.append("g")
                .attr("transform",`translate(0,${HEIGHT})`)
                .call(xAxisCall);

            svg.append("text")
                .attr("x",WIDTH / 2)
                .attr("y",HEIGHT + 50)
                .attr("text-anchor","middle")
                .text("Products");

            svg.append("text")
                .attr("x",-(HEIGHT / 2))
                .attr("y",-50)
                .attr("text-anchor","middle")
                .text("Amount of interest")
                .attr("transform","rotate(-90)");

            const yAxisCall = d3.axisLeft(y);
            svg.append("g").call(yAxisCall);

            const rects = svg.selectAll("rect")
                .data(data);

            rects.enter().append("rect")
                .attr('x',d=>x(d.title))
                .attr('y',d=>y(d.countOfBuy))
                .attr('width',x.bandwidth)
                .attr('height',d=>HEIGHT - y(d.countOfBuy))
                .attr('fill','blue')
        });

    }

}
