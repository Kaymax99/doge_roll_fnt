import { Col, Container } from "react-bootstrap"
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { preventDragOffCanvas, snapControls, gridSize, addGrid, removeGrid} from "../hooks/canvasLogic";


export const GamePage = () => {
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const canvas = useRef<fabric.Canvas>();

    useEffect( () => {
        //creating canvas
        canvas.current = new fabric.Canvas("gameScreen", {
            width: 800,
            height:800
        });
        // creating grid
        addGrid(canvas.current);

        const block = new fabric.Rect({
            left: gridSize,
            top: gridSize,
            width: gridSize,
            height: gridSize,
            fill: 'red',
            originX: 'left',
            originY: 'top',
            lockScalingX: false,
            lockScalingY: false,
            lockRotation: false,
            hasControls: true,
            transparentCorners: false,
            cornerColor: "#CA9534",
            borderColor: "#CA9534",
            cornerSize: 10,
            hasBorders: true,
            snapAngle:45,
            padding: 0,
            selectable:true
        });
        canvas.current.add(block);

        //activating canvas logic
        canvas.current.on('object:moving', preventDragOffCanvas);
        canvas.current.on("object:modified",snapControls);
            
        console.log("Canvas drawn!")
    }, [])

    const handleViewSidebar = () => {
      setSideBarOpen(!sidebarOpen);
    };
    const sidebarClass = sidebarOpen ? "sidebar open" : "sidebar";

    return (
        <div>
            <canvas id="gameScreen" width="800" height="800"></canvas>
            <div className={sidebarClass}>
                <div> Sliding </div>
                <div> Down </div>
                <div> The hill </div>
                <button onClick={handleViewSidebar} className="sidebar-toggle">
                    Toggle Sidebar
                </button>
            </div>
        </div>
    )
}