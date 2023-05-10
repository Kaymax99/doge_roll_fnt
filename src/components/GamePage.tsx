import { Col, Container } from "react-bootstrap"
import { fabric } from "fabric";
import { useEffect, useState } from "react";


export const GamePage = () => {

    useEffect( () => {
        const canvas = new fabric.Canvas("gameScreen");
    
          // creating grid
          const gridSize = 50;
          for (let i = 0; i < (800 / gridSize); i++) {
            canvas.add(new fabric.Line([ i * gridSize, 0, i * gridSize, 800], { stroke: '#ccc', selectable: false }));
            canvas.add(new fabric.Line([ 0, i * gridSize, 800, i * gridSize], { stroke: '#ccc', selectable: false }))
          }
          const block = new fabric.Rect({
            left: gridSize,
            top: gridSize,
            width: gridSize,
            height: gridSize,
            fill: 'red',
            originX: 'left',
            originY: 'top',
            centeredRotation: false,
            lockScalingX: false,
            lockScalingY: false,
            lockRotation: false,
            hasControls: true,
            cornerSize: 8,
            hasBorders: false,
            padding: 0
          });
  
          canvas.add(block);

            const snapOnDrop = (options: fabric.IEvent<MouseEvent>) => {
                const evt = options.e
                if (evt.altKey === false) {
                    if (options.target?.left && options.target?.top ) {
                        options.target?.set({
                        left: Math.round(options.target.left / gridSize) * gridSize,
                        top: Math.round(options.target.top / gridSize) * gridSize
                        })
                    }
                }
            }
            const snapResize = (options:fabric.IEvent<MouseEvent>) => {
                const evt = options.e
                    if (evt.altKey === false && options.action === "scale") {
                        console.log(options)
                        if (options.target && options.target.scaleX && options.target.scaleY) {
                            options.target.set({ opacity: 1 }); 
                            const newWidth = (Math.round(options.target.scaleX));
                            const newHeight = (Math.round(options.target.scaleY)); 
                            if (options.target.scaleX !== newWidth) {
                            options.target.set({ scaleX: newWidth, scaleY: newHeight});
                            }
                    }
                }
            
            }
                canvas.on("mouse:up",snapOnDrop);
                canvas.on("object:modified",snapResize);
            
          console.log("Canvas drawn!")
          
    }, [])
    //testing some funcionalities, I'll get back to this later

    const [sidebarOpen, setSideBarOpen] = useState(false);
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