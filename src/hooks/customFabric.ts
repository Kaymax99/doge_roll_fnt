import { fabric } from "fabric";

export interface IObjectOptionsId extends fabric.IObjectOptions {
    id?: string | undefined,
    layer?: string | undefined
}
export interface IRectOptions extends IObjectOptionsId, fabric.IRectOptions {}

export class RectId extends fabric.Rect {

    constructor(options?: IRectOptions){
        super(options)
    }
}
export interface IImageOptionsId extends IObjectOptionsId, fabric.IImageOptions {}
export class ImageId extends fabric.Image {
    constructor(element: string | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, options?: IImageOptionsId) {
        super(element, options)
    }
}

export interface ObjectId extends fabric.IObservable<fabric.Object>, IObjectOptionsId, fabric.IObjectAnimation<fabric.Object> {}
export class ObjectId extends fabric.Object {
    constructor(options?: ObjectId) {
        super(options)
    }
}