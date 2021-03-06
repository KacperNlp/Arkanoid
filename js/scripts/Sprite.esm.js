import { canvas } from "./Canvas.esm.js";

/**
 * @typedef {{x:number, y:number}} offset
 * class for creating Sprite object for elements
 */
export class Sprite {
  /**
   * Create a sprite object by this props
   * @param {!number} spriteX The x-axis of coordination of the top left corner of the sub-rectengle of the source image to draw into the destination context
   * @param {!number} spriteY The y-axis of coordination of the top left corner of the sub-rectengle of the source image to draw into the destination context
   * @param {!number} width The width of the sub-rectengle of the source image to draw into the destination context
   * @param {!number} height The height of the sub-rectengle of the source image to draw into the destination context
   * @param {!CanvasImageSource} spritesImage An element to draw into the context
   * @param {!number} posX Position sprite element of x-axis in canvas
   * @param {!number} posY Position sprite element of y-axis in canvas
   * @param {number} [numberOfSprites = 1] Default numberOfSprites = 1, number of sprite images in the main image
   * @param {offset} [offset ={x:0, y:0}] Default  = {x:0, y:0}, offset to draw
   */
  constructor(
    spriteX,
    spriteY,
    width,
    height,
    spritesImage,
    posX,
    posY,
    numberOfSprites = 1,
    offset = { x: 0, y: 0 }
  ) {
    /**
     * @type {!number}
     */
    this.alpha = 255;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.numberOfSprites = numberOfSprites;
    this.spritesImage = spritesImage;
    this.startSpriteX = spriteX;
    this.startSpriteY = spriteY;
    this.offset = { ...offset };
  }

  #canvas = canvas;

  /**
   * Method to draw the sprite into the canvas context
   * @param {number} [numberOfSprites = 0] number of index sprite to draw used to take position of image in sprite
   * @param {number} [ratio = 1] scale of sprite
   */
  draw(numberOfSprites = 0, ratio = 1) {
    if (numberOfSprites > this.numberOfSprites) return null;

    if (this.alpha !== 255) {
      this.#canvas.context.globalAlpha = this.alpha / 255;
    }

    const spritePosX = this.startSpriteX + numberOfSprites * this.width;

    this.#canvas.context.drawImage(
      this.spritesImage,
      spritePosX,
      this.startSpriteY,
      this.width,
      this.height,
      this.posX + this.offset.x,
      this.posY + this.offset.y,
      this.width * ratio,
      this.height * ratio
    );

    if (this.alpha !== 255) {
      this.#canvas.context.globalAlpha = 1;
    }
  }

  checkCollisionWithAnotherSprite(vector, anotherSprite) {
    const [
      vectorDirectionX,
      vectorDirectionY,
    ] = this.#getDirectionsOfCurrentElement(vector);

    if (
      vectorDirectionX > anotherSprite.posX &&
      vectorDirectionX < anotherSprite.posX + anotherSprite.width &&
      vectorDirectionY > anotherSprite.posY &&
      vectorDirectionY < anotherSprite.posY + anotherSprite.height
    ) {
      return true;
    }

    return false;
  }

  #getDirectionsOfCurrentElement(vector) {
    const { directionX, directionY } = vector;

    const vectorDirectionX =
      directionX < 0 ? this.posX : this.posX + this.width;
    const vectorDirectionY =
      directionY < 0 ? this.posY : this.posY + this.height;

    return [vectorDirectionX, vectorDirectionY];
  }
}
