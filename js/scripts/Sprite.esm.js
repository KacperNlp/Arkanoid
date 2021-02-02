import { canvas } from "./Canvas.esm.js";

export class Sprite {
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
