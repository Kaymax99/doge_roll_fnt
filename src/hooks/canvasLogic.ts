import {fabric} from "fabric";
import { Dispatch, SetStateAction } from "react";
import { ICoords, INewTokenData } from "../components/PlayingPage";

export let gridSize = 50;
export let gridGroup: fabric.Group;

export const addGrid = (canvas: fabric.Canvas) => {
    const gridOptions = {
        stroke: '#ccc',
        strokeWidth: 1,
    }
    const gridLines = [];
    if (canvas.width && canvas.height) {
        for (let i = 1; i < (canvas.width / gridSize); i ++){
        gridLines.push(new fabric.Line([i * gridSize, 0, i * gridSize, canvas.width], gridOptions));
        }
        for (let i = 1; i < (canvas.height / gridSize); i ++){
        gridLines.push(new fabric.Line([0, i * gridSize, canvas.height, i * gridSize], gridOptions));
        }
        gridGroup = new fabric.Group(gridLines, {
        selectable: false,
        evented: false
        })
        gridGroup.addWithUpdate();
        canvas.add(gridGroup);
    }
}
export const removeGrid = (canvas: fabric.Canvas | undefined) => {
    if (canvas !== undefined){
        gridGroup && canvas.remove(gridGroup);
        gridGroup;
    }
  }

export const setGridSize = (newSize: number) => {
    gridSize = newSize
}

export const snapControls = (options:fabric.IEvent<MouseEvent>) => {
    const evt = options.e
    if (evt.altKey === false) {
        const action = options.transform?.action
        if (action === "scale" || action === "scaleX" || action === "scaleY")  {
            if (options.target && options.target.scaleX && options.target.scaleY && options.target.width && options.target.height) {
                const currentHeight = options.target.height * options.target.scaleX
                const currentWidth = options.target.width * options.target.scaleY
                const newHeight = Math.round(currentHeight / gridSize ) * gridSize
                const newWidth = Math.round(currentWidth / gridSize ) * gridSize

                if (currentHeight < gridSize || currentWidth < gridSize) {
                    options.target.scaleToHeight(gridSize)
                    options.target.scaleToWidth(gridSize)
                } else {
                    options.target.scaleToHeight(newHeight)
                    options.target.scaleToWidth(newWidth)
                } 
            }
        }
        if (action !== "rotate")
            if (options.target?.left && options.target?.top ) {
                options.target?.set({
                left: Math.round(options.target.left / gridSize) * gridSize,
                top: Math.round(options.target.top / gridSize) * gridSize
                })
            }
        }
    }

export const preventDragOffCanvas = (options:fabric.IEvent<MouseEvent>) =>{
    const target = options.target
    if (target?.getBoundingRect() && target.top && target.left && target.canvas?.height && target.canvas.width) {
        target.setCoords();
        if(target.getBoundingRect().top < 0 || target.getBoundingRect().left < 0) {
            target.top = Math.max(target.top, target.top-target.getBoundingRect().top);
            target.left = Math.max(target.left, target.left-target.getBoundingRect().left);
        }
        // bot-right corner
        if(target.getBoundingRect().top+target.getBoundingRect().height  > target.canvas.height || target.getBoundingRect().left+target.getBoundingRect().width  > target.canvas.width) {
            target.top = Math.min(target.top, target.canvas.height-target.getBoundingRect().height+target.top-target.getBoundingRect().top);
            target.left = Math.min(target.left, target.canvas.width-target.getBoundingRect().width+target.left-target.getBoundingRect().left);
        }
    }
}

export const customContextMenu = (options:fabric.IEvent<MouseEvent>, canvas:fabric.Canvas | undefined, setCoords: Dispatch<SetStateAction<ICoords>>) => {
    const selCanvas = document.querySelector(".upper-canvas");
    const contextMenu = document.querySelector<HTMLElement>(".custCTMWrapper");
    const tokenMenu = document.querySelector<HTMLElement>(".tokenCTMWrapper");
    const createMenu = contextMenu?.querySelector<HTMLElement>(".createMenu");
    const upperCanvas = document.querySelector(".upper-canvas");
    const activeObjects = canvas?.getActiveObjects();

    document.addEventListener("click", (e) => {
        if (e.target !== upperCanvas && canvas) {
            canvas.discardActiveObject().renderAll()
        }
    });

    if (options.button === 3) {
        if (selCanvas && contextMenu && createMenu && tokenMenu && activeObjects && canvas) {
            document.addEventListener("click", (e) => {
                contextMenu.style.visibility = "hidden";
                tokenMenu.style.visibility = "hidden"
            });
            document.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                let x = e.clientX, y = e.clientY
                const winWidth = window.innerWidth
                const cmWidth = contextMenu.offsetWidth
                const winHeight = window.innerHeight
                const cmHeight = contextMenu.offsetHeight

                if (x > (winWidth - cmWidth - createMenu.offsetWidth)) {
                    createMenu.style.left = "-200px"
                } else {
                    createMenu.style.left = ""
                    createMenu.style.right = "-200px"
                }
                x = x > winWidth - cmWidth ? winWidth - cmWidth : x
                y = y > winHeight - cmHeight ? winHeight - cmHeight : y

                setCoords({x,y})
                if (e.target === upperCanvas) {
                    if (activeObjects?.length === 0 ) {
                        tokenMenu.style.visibility = "hidden"
                        contextMenu.style.left = `${x}px`;
                        contextMenu.style.top = `${y}px`;
                        contextMenu.style.visibility = "visible"
                    } else {
                        contextMenu.style.visibility = "hidden"
                        tokenMenu.style.left = `${x}px`;
                        tokenMenu.style.top = `${y}px`;
                        tokenMenu.style.visibility = "visible"
                    }
                }
            });
        }
    }
}

export const deleteSelected = (canvas:fabric.Canvas | undefined) => {
    if (canvas) {
        const activeObjects = canvas.getActiveObjects()
        activeObjects.forEach((obj) => 
        canvas?.remove(obj));
    }
}
export const moveTokenIndex = (canvas:fabric.Canvas | undefined, action: string) => {
    if (canvas) {
        const activeObjects = canvas.getActiveObjects()
        activeObjects.forEach((obj) => {
            switch (action) {
                case "back":
                    canvas.sendToBack(obj)
                    canvas.discardActiveObject().renderAll()
                    break;
                case "front":
                    canvas.bringToFront(obj)
                    canvas.discardActiveObject().renderAll()
                    break;
                case "backwards":
                    canvas.sendBackwards(obj)
                    canvas.discardActiveObject().renderAll()
                    break;
                case "forward":
                    canvas.bringForward(obj)
                    canvas.discardActiveObject().renderAll()
                    break;
                default:
                    break;
            }
        })
    }
}
export const createNewToken = (canvas: fabric.Canvas | undefined, tokenData: INewTokenData, coords: ICoords, callbackFn: { (): void; (): void; }) => {
    const canvasObject = document.querySelector(".canvas-container");
    const pageContainer = document.querySelector(".playingPage");
    if (canvasObject && pageContainer) {
        const pageStyle = window.getComputedStyle(pageContainer)
        const nodeStyle = window.getComputedStyle(canvasObject)
        const offsetTop = Number(nodeStyle.getPropertyValue('margin-top').slice(0, -2))
        const offsetLeft = Number(nodeStyle.getPropertyValue('margin-left').slice(0, -2))
        const pageOffsetTop = Number(pageStyle.getPropertyValue('padding-top').slice(0, -2))

        const url = tokenData?.url
        console.log(url)
        
        if (canvas && coords?.x && coords?.y) {
            const image = new Image();
            image.src = url as "string";
            const y = coords.y - Number(offsetTop) - pageOffsetTop - 25;
            const x = coords.x - Number(offsetLeft) - 25;
            const newImage = new fabric.Image(image, {
                left: Math.round((x / gridSize) * gridSize),
                top: Math.round((y / gridSize) * gridSize),
                transparentCorners: false,
                cornerColor: "#CA9534",
                borderColor: "#CA9534",
                cornerSize: 10,
                snapAngle: 45,
            });
            newImage.scaleToHeight(gridSize)
            newImage.scaleToWidth(gridSize)
            console.log(newImage)
            canvas.add(newImage).renderAll()
        }
    }
    callbackFn()
}