import { Container } from "react-bootstrap"
import { fabric } from "fabric";
import { useEffect } from "react";


export const GamePage = () => {
    
    useEffect( () => {
        const canvas = new fabric.Canvas("gameScreen");
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20
          });
          canvas.add(rect);
    }, [])
    //testing some funcionalities, I'll get back to this later

    return (
        <>
                <canvas id="gameScreen" className="w-100 h-100"></canvas>
        </>
    )
}