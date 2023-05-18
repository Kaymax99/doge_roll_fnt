import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { preventDragOffCanvas, snapControls, gridSize, addGrid, removeGrid} from "../hooks/canvasLogic";
import { DnDCharacterCard } from "./characterSheet/DnDCharacterCard";
import { Button } from "react-bootstrap";
import { DnDCharacterSheet } from "./characterSheet/DnDCharacterSheet";
import { fetchCharacters } from "../hooks/fetch/gameFetches";
import { CaretRightFill } from "react-bootstrap-icons"
import logo from "../assets/img/logo.png"
import { Link } from "react-router-dom";


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
        fabric.Image.fromURL('https://i.imgur.com/bhNyhQ5.png', function(myImg) {
        const img1 = myImg.set({ left: 0, top: 0 ,width:gridSize*2,height:gridSize*2});
        canvas.current?.add(img1); 
        });
        canvas.current.add(block);

        //activating canvas logic
        canvas.current.on('object:moving', preventDragOffCanvas);
        canvas.current.on("object:modified",snapControls);

        console.log("Canvas drawn!")
        /* if (dragAndDropSupported () === true) {
            console.log("supported")
        } else {
            console.log("not supported")
        } */
        
    }, [])

    function dragAndDropSupported () {
        return 'draggable' in document.createElement('span');
    }
    

    const retrieveCharacters = async () => {
        const characters = await fetchCharacters("/all");
        setCharactersArray(characters.sort((a: { id: number; },b: { id: number; }) => (a.id > b.id) ? 1: -1))
    }

    const handleViewSidebar = () => {
      setSideBarOpen(!sidebarOpen);
    };
    const sidebarClass = sidebarOpen ? "sidebar open" : "sidebar";

      


    return (
        <div className="overflow-hidden">
            <canvas id="gameScreen" width="800" height="800"></canvas>
            <div className={sidebarClass}>
                <div className="mx-auto text-center mb-2">
                    <Link to={"/"}><img src={logo} alt="logo" id="dogeLogo"/></Link>
                </div>
                <div className="text-center mb-1">
                    <Button variant="secondary" className="my-2 mx-auto text-light" onClick={handleShow}>Create new Character</Button>
                </div>
                <DnDCharacterSheet show={show} handleClose={handleClose} character={undefined} updateChars={retrieveCharacters}/>
                <div>
                    <h3 className="ms-1">Characters</h3>
                    {charactersArray?.map( function(char, i) {
                        return (
                            <DnDCharacterCard 
                            key={"character-" + i} character={char} updateChars={retrieveCharacters} />
                        )
                    })}
                </div>
                <Button variant="secondary" onClick={handleViewSidebar} className={!sidebarOpen ? "sidebar-toggle" : "sidebar-toggle sidebarRotated"}>
                    <CaretRightFill/>
                </Button>
            </div>
        </div>
    )
}