import {fabric} from "fabric";

export let gridSize = 50;
export let gridGroup: fabric.Group;

export const addGrid = (canvas: fabric.Canvas) => {
    if (gridGroup) return;
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
    console.log(options)
    if (evt.altKey === false) {
        const action = options.transform?.action
        if (action === "scale" || action === "scaleX" || action === "scaleY")  {
            if (options.target && options.target.scaleX && options.target.scaleY) {
                options.target.set({ opacity: 1 }); 
                const newWidth = (Math.round(options.target.scaleX));
                const newHeight = (Math.round(options.target.scaleY)); 

                if (options.target.scaleX !== newWidth || options.target.scaleY !== newHeight) {
                    if (newWidth < 1 || newHeight < 1) {
                        options.target.set({ scaleX: 1, scaleY: 1});
                    } else options.target.set({ scaleX: newWidth, scaleY: newHeight});
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



