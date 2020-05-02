import React, { useRef, useState } from "react";


const Canvas = () => {

const [drawTitle, setDrawTitle] = useState("Draw!");
const canvasRef = useRef(null);
const handleCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.font = "100px";
    ctx.fillText("Tech-Store canvas drawing", 10, 25);
    setDrawTitle("Draw harder");  
};
return (
    <>
    <div className="row justify-content-center">
        <p className="is-size-3 title-secindery text-uppercase ml-4">WHO ARE WE?</p>
    </div>
   <div className="row justify-content-center">
        The cheapest e-store, with the latest devices.
        <p className="ml-4" style={{fontSize:'100px!important'}}>
        {" "}
        </p>
        
     </div>
      {/* canvas */}

    <div className="row justify-content-center mt-5">
        <button onClick={handleCanvas} className="btn btn-dark" style={{width:'150px',height:'50px'}}>
        {drawTitle}
        </button>
        <canvas width="200" ref={canvasRef} height="100"></canvas>
    </div>
   
    </>
);

};

export default Canvas;

