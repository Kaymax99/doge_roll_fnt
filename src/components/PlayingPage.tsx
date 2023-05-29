import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { preventDragOffCanvas, snapControls, gridSize, addGrid, customContextMenu, deleteSelected, moveTokenIndex, createNewToken } from "../hooks/canvasLogic";
import { DnDCharacterCard } from "./characterSheet/DnDCharacterCard";
import { Button, Form, Modal } from "react-bootstrap";
import { DnDCharacterSheet } from "./characterSheet/DnDCharacterSheet";
import { getDeleteContent, saveOnUnload } from "../hooks/fetch/gameFetches";
import { CaretRightFill } from "react-bootstrap-icons"
import logo from "../assets/img/logo.png"
import { Link, useNavigate, useParams } from "react-router-dom";
import { genTokenId, useAppSelector } from "../hooks/hooks";
import testcoin from "../assets/img/character-sheet/Untitled-1.png"
import DnDCharacter from "./characterSheet/DnDCharacter";
import { ChevronRight, Boxes, Map } from "react-bootstrap-icons"
import { ImageId, ObjectId } from "../hooks/customFabric";
import { ICoords, INewTokenData, MAP_LAYER, TOKEN_LAYER, tokenDB } from "../types/Interfaces";

const initTokCreationState:INewTokenData = {
    url: null
}

export const PlayingPage = () => {
    const [sidebarOpen, setSideBarOpen] = useState(false);
    const sidebarClass = sidebarOpen ? "sidebar open" : "sidebar"; 
    const [charactersArray, setCharactersArray] = useState<DnDCharacter[]>();
    const [dragAndDrop, setDragAndDrop] = useState(false);
    const canvas = useRef<fabric.Canvas>();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [showTokCreation, setShowTokCreation] = useState(false);
    const handleShowTokCreation = () => setShowTokCreation(true);
    const handleCloseTokCreation = () => setShowTokCreation(false);
    const { gameId } = useParams<{gameId: string}>();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.content);
    const accessToken = user?.accessToken ? user.accessToken : "";
    const canvasTokens = useRef<ObjectId[]>([]);
    const canvasTokensDB = useRef<tokenDB[]>([]);
    const [lastRightClickCoords, setLastRightClickCoords] = useState<ICoords>({x: undefined, y: undefined});
    const [newTokenData, setNewTokenData] = useState<INewTokenData>(initTokCreationState);
    const [currentLayer, setCurrentLayer] = useState<string>(); 
    const selectedLayer = useRef<string>();
    const currentActiveObj = canvas?.current?.getActiveObject() as ObjectId


    useEffect( () => {
        selectedLayer.current = TOKEN_LAYER
        setCurrentLayer(TOKEN_LAYER)
        checkGameValidity();
        retrieveCharacters();
        retrieveTokens();
        //creating canvas
        canvas.current = new fabric.Canvas("gameScreen", {
            width: 800,
            height: 800,
            fireRightClick: true,
        });
        // creating grid
        addGrid(canvas.current);

        //activating canvas tokens logic
        canvas.current.on('object:moving', preventDragOffCanvas);
        canvas.current.on("object:modified",(e) => snapControls(e, updateToken));
        canvas.current.on("mouse:down", (e) => customContextMenu(e, canvas.current, setLastRightClickCoords));
        window.addEventListener("keydown", (e) => {
            if (e.key === "Delete" && canvas.current) {
                const activeObjs:ObjectId[] = canvas.current.getActiveObjects()
                activeObjs.forEach((obj) => canvasTokens.current = [...canvasTokens.current.filter(function(token) {
                    return token.id !== obj.id
                })])
                activeObjs.forEach((obj) => canvasTokensDB.current = [...canvasTokensDB.current.filter(function(token) {
                    return token.id !== obj.id
                })])
                deleteSelected(canvas.current)
                canvas.current.discardActiveObject().renderAll()
            }
        }, false);

        if (dragAndDropSupported () !== true) {
            alert("Your browser does not support Drag and Drop, some functionality will not work.")
        }

        window.onbeforeunload = (e) =>{
            saveOnUnload("campaigns/tokens/" + gameId, canvasTokensDB.current, accessToken)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        if (charactersArray && !dragAndDrop) {
            enableDragAndDrop()
        }
    })
    useEffect(() => () => 
        saveOnUnload("campaigns/tokens/" + gameId, canvasTokensDB.current, accessToken)
    , [] );
    
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
                if (img) {
                    console.log(img.height)
                    const id = genTokenId();
                    const layer = selectedLayer.current === TOKEN_LAYER ? TOKEN_LAYER : MAP_LAYER
                    const newImage = new ImageId(img, {
                        id: id,
                        layer: layer,
                        left: Math.round(x / gridSize) * gridSize,
                        top: Math.round(y / gridSize) * gridSize,
                        transparentCorners: false,
                        cornerColor: "#CA9534",
                        borderColor: "#CA9534",
                        cornerSize: 10,
                        snapAngle: 45,
                    });
                    const originalSize = newImage.getOriginalSize()
                    newImage.width = originalSize.width
                    newImage.height = originalSize.width
                    newImage.scaleToHeight(gridSize)
                    newImage.scaleToWidth(gridSize)
                    const newImageDB: tokenDB = {
                        id: id,
                        layer: layer,
                        leftValue: newImage.left,
                        topValue: newImage.top,
                        width: newImage.width,
                        height: newImage.height,
                        scaleX: newImage.scaleX,
                        scaleY: newImage.scaleY,
                        currentSrc: newImage.getElement().src
                    }
                    canvasTokens.current = [...canvasTokens.current, newImage as ObjectId]
                    canvasTokensDB.current = [...canvasTokensDB.current, newImageDB]
                    canvas?.current?.add(newImage).renderAll()
                    if (selectedLayer.current === TOKEN_LAYER) {
                        canvas?.current?.bringToFront(newImage);
                    } else {
                        canvas?.current?.sendToBack(newImage);
                    }
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
        const game = await getDeleteContent("campaigns/" + gameId, "GET", accessToken)
        if (!game || game?.user.id !== user?.id) {
            navigate("/404")
        }
    }
    
    function dragAndDropSupported() {
        return 'draggable' in document.createElement('span');
    }
    const retrieveCharacters = async () => {
        const characters = await getDeleteContent("characters/filter/campaign/" + gameId, "GET", accessToken);
        if (characters) {
            setCharactersArray(characters.sort((a: { id: number; },b: { id: number; }) => (a.id > b.id) ? 1: -1))
        }
    }
    const retrieveTokens = async () => {
        const tokens: tokenDB[] = await getDeleteContent("campaigns/tokens/" + gameId, "GET", accessToken)
        canvasTokensDB.current = [...tokens]
        canvasTokensDB.current.forEach((token) => {
            const image = new Image();
            image.src = token.currentSrc as "string";
            const newImage = new ImageId(image, {
                id: token.id,
                layer: token.layer,
                left: token.leftValue,
                top: token.topValue,
                scaleX: token.scaleX,
                scaleY: token.scaleY,
                angle: token.angle,
                transparentCorners: false,
                cornerColor: "#CA9534",
                borderColor: "#CA9534",
                cornerSize: 10,
                snapAngle: 45,
            })
            const originalSize = newImage.getOriginalSize()
            newImage.width = originalSize.width
            newImage.height = originalSize.width
            // if width/height multiplied by their respective scale is not divisible by the grid size, 
            // scale the token to the closest size that is a multiple of the gridsize.
            if (token.width && token.height && token.scaleX && token.scaleY) {
                if ((token.width * token.scaleX) % gridSize !== 0 || (token.height * token.scaleX)  % gridSize !== 0) {
                    newImage.scaleToWidth((Math.round((token.width * token.scaleX) / gridSize)) * gridSize)
                    newImage.scaleToHeight((Math.round((token.width * token.scaleX) / gridSize)) * gridSize)
                }
            }
            canvasTokens.current = [...canvasTokens.current, newImage as ObjectId]
            canvas?.current?.add(newImage);
            if (token.layer === MAP_LAYER) {
                canvas?.current?.sendToBack(newImage).renderAll()
            } else {
                canvas?.current?.bringToFront(newImage).renderAll()
            }
        })
        selectTokenLayer();
    }
    const handleViewSidebar = () => {
      setSideBarOpen(!sidebarOpen);
    };
    const selectMapLayer = () => {
        selectedLayer.current = MAP_LAYER;
        setCurrentLayer(MAP_LAYER)
        canvasTokens.current.filter(function(token) {
            return token.layer === MAP_LAYER
        }).forEach((token) => {
            token.selectable = true
            token.evented = true
            canvas.current?.bringForward(token).renderAll()
        })
        canvasTokens.current.filter(function(token) {
            return token.layer === TOKEN_LAYER
        }).forEach((token) => {
            token.selectable = false
            token.evented = false
            token.opacity = 0.5
        })
        canvas.current?.renderAll()
    }
    const selectTokenLayer = () => {
        selectedLayer.current = TOKEN_LAYER;
        setCurrentLayer(TOKEN_LAYER)
        canvasTokens.current.filter(function(token) {
            return token.layer === MAP_LAYER
        }).forEach((token) => {
            token.selectable = false
            token.evented = false
            canvas.current?.sendBackwards(token).renderAll()
        })
        canvasTokens.current.filter(function(token) {
            return token.layer === TOKEN_LAYER
        }).forEach((token) => {
            token.selectable = true
            token.evented = true
            token.opacity = 1
        })
        canvas.current?.renderAll()
    }

    const handleTokDataChange = (name: string, value: any)  => {
        setNewTokenData({...newTokenData, [name]: value})
    }

    const cancelTokCreation = () => {
        handleCloseTokCreation()
        setNewTokenData(initTokCreationState)
    }
    const updateToken = (obj: ObjectId) => {
        canvasTokens.current = [...canvasTokens.current.filter(function(token) {
            return token.id !== obj.id
        }), obj]

        const token = canvasTokensDB.current.find(tok => tok.id === obj.id)
        if (token && obj) {
            token.angle = obj.angle
            token.height = obj.height
            token.width = obj.width
            token.topValue = obj.top
            token.leftValue = obj.left
            token.scaleX = obj.scaleX
            token.scaleY = obj.scaleY
            token.layer = obj.layer
            canvasTokensDB.current = [...canvasTokensDB.current.filter(function(token) {
                return token.id !== obj.id
            }), token]
        }
        console.log(canvasTokens)
        console.log(canvasTokensDB)
    }

    const handleTokenCreation = (newImage: ImageId, newImageDB: tokenDB) => {
        if (canvas.current) {
            canvasTokens.current = [...canvasTokens.current, newImage as ObjectId]
            canvasTokensDB.current = [...canvasTokensDB.current, newImageDB]
            if (currentLayer === TOKEN_LAYER) {
                canvas.current.bringToFront(newImage);
            } else {
                canvas.current.sendToBack(newImage);
            }
        }
        setNewTokenData(initTokCreationState)
        handleCloseTokCreation()
    }

    return (
        <div className="overflow-scroll playingPage pt-5">
            <div id="canvasContainer" className="position-relative">
                <canvas id="gameScreen" width="800" height="800"></canvas>
            </div>
            <div className={sidebarClass}>
                <div className="mx-auto text-center mb-2 mt-1">
                    <Link to={"/"}><img src={logo} alt="logo" id="dogeLogo"/></Link>
                </div>
                <div className="text-center mb-1">
                    <Button variant="secondary" className="my-2 mx-auto text-light" onClick={handleShow}>Create new Character</Button>
                </div>
                <DnDCharacterSheet show={show} handleClose={handleClose} character={undefined} updateChars={retrieveCharacters} gameId={gameId} token={accessToken}/>
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
                                <img className="charCardPic ms-2" src="https://i.imgur.com/j6hFdKJ.jpg"/>
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
                <div className="gameControlsWrapper">
                    <div className="gameControlsContent">
                        <ul className="gameControlsMenu">
                            <li className="gameControlsItem layer">
                                <div>
                                    {currentLayer === MAP_LAYER ? <Map/> : currentLayer === TOKEN_LAYER ? <Boxes/> : "?"}
                                </div>
                                <ul className="gameControlsLayer">
                                    <li className="gameControlsItem">
                                        <span onClick={selectMapLayer}>
                                            <Map className="me-1"/> Map layer
                                        </span>
                                    </li>
                                    <li className="gameControlsItem">
                                        <span onClick={selectTokenLayer}>
                                            <Boxes className="me-1"/>Token layer
                                        </span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Modal show={showTokCreation} onHide={cancelTokCreation}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Insert url</Form.Label>
                    <Form.Control
                    type="text"
                    value={newTokenData.url? newTokenData.url : ""}
                    onChange={(e) => {
                        handleTokDataChange("url", e.target.value)
                    }}
                    />
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    <Button variant="danger" onClick={cancelTokCreation}>
                        Discard
                    </Button>
                    <Button variant="secondary" className="text-light" onClick={() => createNewToken(canvas.current, newTokenData, lastRightClickCoords, handleTokenCreation, selectedLayer.current)}>
                        Create Token
                    </Button>
                </Modal.Footer>
            </Modal>

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
                                    <span onClick={handleShowTokCreation}>From URL</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="tokenCTMWrapper">
                <div className="tokenCTMContent">
                    <ul className="tokenCTMMenu">
                        <li className="tokenCTMItem">
                            <span onClick={() => moveTokenIndex(canvas.current, "front")}>To Front</span>
                        </li>
                        <li className="tokenCTMItem">
                            <span onClick={() => moveTokenIndex(canvas.current, "back")}>To Back</span>
                        </li>
                        <li className="tokenCTMItem">
                            <span onClick={() => moveTokenIndex(canvas.current, "forward")}>Move Forward</span>
                        </li>
                        <li className="tokenCTMItem">
                            <span onClick={() => moveTokenIndex(canvas.current, "backwards")}>Move Back</span>
                        </li>
                        <li className="tokenCTMItem">
                            <span onClick={() => deleteSelected(canvas.current)}>Delete</span>
                        </li>
                        <li className="tokenCTMItem send2Layer">
                            <div>
                                <span>Layer</span>
                            </div>
                            <ChevronRight/>
                            <ul className="send2LayerMenu">
                                <li className={currentActiveObj?.layer === MAP_LAYER ? "tokenCTMItem current" : "tokenCTMItem"}>
                                    <span onClick={() => {
                                        if (canvas.current) {
                                            const activeObjects: ObjectId[] = canvas.current.getActiveObjects()
                                                activeObjects.forEach((obj) => {
                                                    if (obj.layer === MAP_LAYER) {
                                                        return
                                                    } else {
                                                        obj.selectable = false
                                                        obj.evented = false
                                                        obj.layer = MAP_LAYER
                                                        canvasTokens.current = [...canvasTokens.current.filter(function(token) {
                                                            return token.id !== obj.id
                                                        }), obj]
                                                        const token = canvasTokensDB.current.find(tok => tok.id === obj.id)
                                                        if (token) {
                                                            token.layer = obj.layer
                                                            canvasTokensDB.current = [...canvasTokensDB.current.filter(function(token) {
                                                                return token.id !== obj.id
                                                            }), token]
                                                        }
                                                        canvas?.current?.sendToBack(obj);
                                                    }
                                                })
                                            }
                                        }}>Map layer
                                    </span>
                                </li>
                                <li className={currentActiveObj?.layer === TOKEN_LAYER ? "tokenCTMItem current" : "tokenCTMItem"}>
                                    <span onClick={() => {
                                        if (canvas.current) {
                                            const activeObjects: ObjectId[]  = canvas.current.getActiveObjects()
                                                activeObjects.forEach((obj) => {
                                                    if (obj.layer === TOKEN_LAYER) {
                                                        return
                                                    } else {
                                                        obj.selectable = false
                                                        obj.evented = false
                                                        obj.opacity = 0.5;
                                                        obj.layer = TOKEN_LAYER
                                                        canvasTokens.current = [...canvasTokens.current.filter(function(token) {
                                                            return token.id !== obj.id
                                                        }), obj]
                                                        const token = canvasTokensDB.current.find(tok => tok.id === obj.id)
                                                        if (token) {
                                                            token.layer = obj.layer
                                                            canvasTokensDB.current = [...canvasTokensDB.current.filter(function(token) {
                                                                return token.id !== obj.id
                                                            }), token]
                                                        }
                                                        canvas?.current?.bringToFront(obj);
                                                    }
                                                })
                                            }
                                        }}>
                                        Token layer
                                    </span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}