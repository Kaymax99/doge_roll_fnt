import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { preventDragOffCanvas, snapControls, gridSize, addGrid } from "../hooks/canvasLogic";
import { DnDCharacterCard } from "./characterSheet/DnDCharacterCard";
import { Button } from "react-bootstrap";
import { DnDCharacterSheet } from "./characterSheet/DnDCharacterSheet";
import { getDeleteContent } from "../hooks/fetch/gameFetches";
import { CaretRightFill } from "react-bootstrap-icons"
import logo from "../assets/img/logo.png"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import testcoin from "../assets/img/character-sheet/Untitled-1.png"
import DnDCharacter from "./characterSheet/DnDCharacter";
import { ChevronRight } from "react-bootstrap-icons"


export const PlayingPage = () => {
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const [charactersArray, setCharactersArray] = useState<DnDCharacter[]>()
    const [dragAndDrop, setDragAndDrop] = useState(false)
    const canvas = useRef<fabric.Canvas>();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const { gameId } = useParams<{gameId: string}>();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.content);
    const token = user?.accessToken ? user.accessToken : "";
    
    useEffect( () => {
        checkGameValidity();
        retrieveCharacters();
        //creating canvas
        canvas.current = new fabric.Canvas("gameScreen", {
            width: 800,
            height: 800
        });
        // creating grid
        addGrid(canvas.current);
        console.log("Canvas drawn!")

        const block = new fabric.Rect({
            left: gridSize,
            top: gridSize,
            width: gridSize,
            height: gridSize,
            fill: 'red',
            originX: 'left',
            originY: 'top',
            lockRotation: false,
            transparentCorners: false,
            cornerColor: "#CA9534",
            borderColor: "#CA9534",
            cornerSize: 10,
            snapAngle:45,
            padding: 0,
            selectable:true
        });
        canvas.current.add(block);

        //activating canvas tokens logic
        canvas.current.on('object:moving', preventDragOffCanvas);
        canvas.current.on("object:modified",snapControls);
        window.addEventListener("keydown", (e) => {
            if (e.key === "Delete" && canvas.current) {
                const activeObjects = canvas.current.getActiveObjects()
                activeObjects.forEach((obj) => 
                canvas.current?.remove(obj));
            }
        }, false);

        if (dragAndDropSupported () !== true) {
            alert("Your browser does not support Drag and Drop, some functionality will not work.")
        }
        const selCanvas = document.querySelector(".upper-canvas"); 
        if (selCanvas) {
            /* console.log(selCanvas) */
            document.addEventListener("contextmenu", (e) => {
                 e.preventDefault();
                  /* // show a custom context menu */ 
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (charactersArray && !dragAndDrop) {
            enableDragAndDrop()
        }
      })

    const enableDragAndDrop = () => {
        setDragAndDrop(true);
        //adding event listeners for drag and drop functionalities
        const canvasContainer = document.getElementById("canvasContainer")
        canvasContainer?.addEventListener('dragenter', handleDragEnter, false);
        canvasContainer?.addEventListener('dragend', handleDragOver, false);
        canvasContainer?.addEventListener('dragleave', handleDragLeave, false);
        canvasContainer?.addEventListener('drop', handleDrop, false);
        let imageOffsetX: number, imageOffsetY: number;
        const canvasObject = document.querySelector(".canvas-container");

        //selecting all images with given tags and applying drag event listeners
        const images = document.querySelectorAll('.characterImages img');
        [].forEach.call(images, function (img: HTMLElement) {
            img.addEventListener('dragstart', handleDragStart, false);
            img.addEventListener('dragend', handleDragEnd, false);
            console.log(img)
        });


        function handleDragStart(this: HTMLElement, e: DragEvent) {
            [].forEach.call(images, function (img: HTMLElement) {
                img.classList.remove('img_dragging');
            });
            this.classList.add('img_dragging');
            imageOffsetX = e.clientX - this.offsetLeft;
            imageOffsetY = e.clientY - this.offsetTop;
            
        }

        function handleDragOver(e: DragEvent) {
            if (e.preventDefault && e.dataTransfer) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
            }
        }

        function handleDragEnter(this:HTMLElement) {
            this.classList.add('over');
        }

        function handleDragLeave(this:HTMLElement) {
            this.classList.remove('over');
        }

        function handleDrop(this: HTMLElement, e: DragEvent) {
            e = e || window.event;
            if (e.preventDefault) {
            e.preventDefault();
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            const img: HTMLImageElement | null = document.querySelector('.characterImages img.img_dragging');     
            const pageContainer = document.querySelector(".playingPage");
            if (canvasObject && pageContainer) {
                const pageStyle = window.getComputedStyle(pageContainer)
                const nodeStyle = window.getComputedStyle(canvasObject)
                const offsetLeft = Number(nodeStyle.getPropertyValue('margin-left').slice(0, -2))
                const offsetTop = Number(nodeStyle.getPropertyValue('margin-top').slice(0, -2))
                const pageOffsetTop = Number(pageStyle.getPropertyValue('padding-top').slice(0, -2))
                const y = e.clientY - Number(offsetTop) - imageOffsetY - pageOffsetTop;
                const x = e.clientX - Number(offsetLeft)  - imageOffsetX;
                console.log(x)
                if (img) {
                    const newImage = new fabric.Image(img, {
                        left: Math.round(x / gridSize) * gridSize,
                        top: Math.round(y / gridSize) * gridSize,
                        transparentCorners: false,
                        cornerColor: "#CA9534",
                        borderColor: "#CA9534",
                        cornerSize: 10,
                        snapAngle:45,
                    });
                    newImage.scaleToHeight(gridSize)
                    newImage.scaleToWidth(gridSize)
                    canvas?.current?.add(newImage);
                }
            }
        }

        function handleDragEnd() {
            [].forEach.call(images, function (img: HTMLElement) {
                img.classList.remove('img_dragging');
            });
        }
    }
    
    const checkGameValidity = async () => {
        const game = await getDeleteContent("campaigns/" + gameId, "GET", token)
        if (!game || game?.user.id !== user?.id) {
            navigate("/404")
        }
    }
    
    function dragAndDropSupported() {
        return 'draggable' in document.createElement('span');
    }
    const retrieveCharacters = async () => {
        const characters = await getDeleteContent("characters/filter/campaign/" + gameId, "GET", token);
        console.log("retrieveing chars")
        if (characters) {
            setCharactersArray(characters.sort((a: { id: number; },b: { id: number; }) => (a.id > b.id) ? 1: -1))
        }
    }

    const handleViewSidebar = () => {
      setSideBarOpen(!sidebarOpen);
    };
    const sidebarClass = sidebarOpen ? "sidebar open" : "sidebar";      


    return (
        <div className="overflow-scroll playingPage pt-5">
            <div id="canvasContainer">
                <canvas id="gameScreen" width="800" height="800"></canvas>
            </div>
            <div className={sidebarClass}>
                <div className="mx-auto text-center mb-2">
                    <Link to={"/"}><img src={logo} alt="logo" id="dogeLogo"/></Link>
                </div>
                <div className="text-center mb-1">
                    <Button variant="secondary" className="my-2 mx-auto text-light" onClick={handleShow}>Create new Character</Button>
                </div>
                <DnDCharacterSheet show={show} handleClose={handleClose} character={undefined} updateChars={retrieveCharacters} gameId={gameId} token={token}/>
                <div className="px-2">
                    <div className="gameSideBarCategory">
                        <h3 className="ms-2">Characters</h3>
                        <div className="characterImages">
                            {charactersArray?.map( function(char, i) {
                                return (
                                    <DnDCharacterCard 
                                    key={"character-" + i} character={char} updateChars={retrieveCharacters} Cssclasses="text-light"/>
                                )
                            })}
                        </div>
                    </div>
                    <div className="gameSideBarCategory">
                    <h3 className="ms-2">Testing Tokens</h3>
                        <div className="characterImages">
                            <div className="d-flex align-items-center gameSideBarEntry mx-2 py-1">
                                <img className="charCardPic ms-2" src="https://via.placeholder.com/100x100/848/fff"/>
                                <div className="text-light ms-2">
                                    100x100
                                </div>
                            </div>
                            <div className="d-flex align-items-center gameSideBarEntry mx-2 py-1">
                                <img className="charCardPic ms-2" src="https://via.placeholder.com/200x200/848/fff"/>
                                <div className="text-light ms-2">
                                    200x200
                                </div>
                            </div>
                            <div className="d-flex align-items-center gameSideBarEntry mx-2 py-1">
                                <img className="charCardPic ms-2" src={testcoin}/>
                                <div className="text-light ms-2">
                                    CP
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button variant="secondary" onClick={handleViewSidebar} className={!sidebarOpen ? "sidebar-toggle" : "sidebar-toggle sidebarRotated"}>
                    <CaretRightFill/>
                </Button>
            </div>
            <div className="custCTMWrapper">
                <div className="custCTMContent">
                    <ul className="custCTMMenu">
                        <li className="custCTMItem create">
                            <div>
                                <span>New Token</span>
                            </div>
                            <ChevronRight/>
                            <ul className="createMenu">
                                <li className="custCTMItem">
                                    <span>Generic</span>
                                </li>
                                <li className="custCTMItem">
                                    <span>Circle</span>
                                </li>
                                <li className="custCTMItem">
                                    <span>From URL</span>
                                </li>
                            </ul>
                        </li>
                        <li className="custCTMItem">
                            <span>preview</span>
                        </li>
                        <li className="custCTMItem">
                            <span>preview</span>
                        </li>
                        <li className="custCTMItem">
                            <span>preview</span>
                        </li>
                        <li className="custCTMItem">
                            <span>preview</span>
                        </li>
                        <div className="custCTMSetting">

                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}