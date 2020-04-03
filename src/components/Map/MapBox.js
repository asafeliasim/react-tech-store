import React,{useState,useEffect} from 'react';
import ReactMapGL,{Marker} from 'react-map-gl';
import {FaFlag} from 'react-icons/fa';
import axios from 'axios';
const api = 'pk.eyJ1IjoiYXNhZmVsaWFzaW0iLCJhIjoiY2szbmV6bjN2MDlodzNkbzZxMm5hMXdzMyJ9.8N4XyIX5y-SyphxY8DJTBw';

export default function MapBox(){

   const [viewPort, setViewport] = useState({
      latitude:32.075250,
      longitude:34.804720,
      width:'100vw',
      height:'400px',
      zoom: 16,
  });
  const [data,setData] = useState([]);
  // useEffect get the data of the branches from db and return array [data]
  useEffect(()=>{
     axios
         .get('http://localhost:3001/branches')
         .then(result=>setData(result.data))
  },[data]);

  return (
      <ReactMapGL {...viewPort} mapboxApiAccessToken={api}
      onViewportChange={viewPort=>{
          setViewport(viewPort)
      }}
      >
          {
              data.map(b=>(
                  <Marker latitude={b.latitude} longitude={b.longitude}>
                      <FaFlag style={{color:'red'}}/>
                  </Marker>
              ))
          }
      </ReactMapGL>
  )
};
