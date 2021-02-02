import { media } from "./Media.esm.js";
import { Sprite } from "./Sprite.esm.js";

const BLOCK_WIDTH = 64;
const BLOCK_HEIGHT = 32;
const NUMBER_OF_BLOCKS_TYPES = 2;

export class Block extends Sprite {
  constructor(x, y, kind) {
    const blockPositionX = x * BLOCK_WIDTH + BLOCK_WIDTH / 2;
    const blockPositionY = y * BLOCK_HEIGHT;

    super(
      0,
      0,
      BLOCK_WIDTH,
      BLOCK_HEIGHT,
      media.backgroundImage,
      blockPositionX,
      blockPositionY,
      NUMBER_OF_BLOCKS_TYPES
    );
    this.kind = kind;
  }

  draw() {
    super.draw(this.kind);
  }
}
