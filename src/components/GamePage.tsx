import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { preventDragOffCanvas, snapControls, gridSize, addGrid, removeGrid} from "../hooks/canvasLogic";
import { DnDCharacterCard } from "./characterSheet/DnDCharacterCard";
import { Button } from "react-bootstrap";
import { DnDCharacterSheet } from "./characterSheet/DnDCharacterSheet";
import { fetchCharacters } from "../hooks/fetch/gameFetches";


export const GamePage = () => {
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const [charactersArray, setCharactersArray] = useState([])
    const canvas = useRef<fabric.Canvas>();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect( () => {
        retrieveCharacters();
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

    const retrieveCharacters = async () => {
        const characters = await fetchCharacters("/all");
        setCharactersArray(characters)
    }

    const handleViewSidebar = () => {
      setSideBarOpen(!sidebarOpen);
    };
    const sidebarClass = sidebarOpen ? "sidebar open" : "sidebar";


    /* const character1: DnDCharacter = {
        "name": "a"
    }
    const character2: DnDCharacter = {
        "name": "a"
    } */

    return (
        <div className="overflow-hidden">
            <canvas id="gameScreen" width="800" height="800"></canvas>
            <div className={sidebarClass}>
                <Button variant="secondary" className="my-2" onClick={handleShow}>Create new Character</Button>
                <DnDCharacterSheet show={show} handleClose={handleClose} character={undefined} updateChars={retrieveCharacters}/>
                {charactersArray?.map( function(char, i) {
                    return (
                        <DnDCharacterCard 
                        key={"character-" + i} character={char} updateChars={retrieveCharacters} />
                    )
                })}
                <button onClick={handleViewSidebar} className="sidebar-toggle">
                    Toggle Sidebar
                </button>
            </div>
        </div>
    )
}