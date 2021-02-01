import {canvas} from './Canvas.esm.js'

export class Sprite{
    constructor(posX, posY, width, height, spritesImage,  numberOfSprites = 1, offset = {x:0, y:0}){
        this.alpha = 255;
        this.width = width;
        this.height = height;
        this.numberOfSprites = numberOfSprites;
        this.spritesImage = spritesImage;
        this.offset = {...offset};
        this.x = posX;
        this.y = posY;
    }

    #canvas = canvas;

    draw(numberOfSprites = 0, ratio = 1){
        if(numberOfSprites > this.numberOfSprites) return null;
        
        if(this.alpha !== 255){
            this.#canvas.context.globalAlpha = this.alpha/255;
        }


        this.#canvas.context.drawImage(
            this.spritesImage,
            numberOfSprites * this.width,
            0,
            this.width,
            this.height,
            this.x + this.offset.x,
            this.y + this.offset.y,
            this.width * ratio,
            this.height * ratio,
        )

        if(this.alpha !== 255){
            this.#canvas.context.globalAlpha = 1;
        }
    }
}