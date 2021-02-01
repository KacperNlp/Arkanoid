import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./Canvas.esm.js";
import { media } from "./Media.esm.js";
import { Sprite } from "./Sprite.esm.js";

const PADDLE_HEIGHT = 23;
const PADDLE_POSITION_X_IN_SPRITE = 129;
const PADDLE_POSITION_Y_IN_SPRITE = 0;
export const PADDLE_SPEED = 15;
const PADDLE_WIDTH = 102;
const PADDLE_INITIAL_POSITION_X = CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2;
export const PADDLE_INITIAL_POSITION_Y = CANVAS_HEIGHT - PADDLE_HEIGHT - 10;

export class Paddle extends Sprite {
  constructor() {
    super(
      PADDLE_POSITION_X_IN_SPRITE,
      PADDLE_POSITION_Y_IN_SPRITE,
      PADDLE_WIDTH,
      PADDLE_HEIGHT,
      media.backgroundImage,
      PADDLE_INITIAL_POSITION_X,
      PADDLE_INITIAL_POSITION_Y
    );
  }

  moveLeft() {
    this.posX--;

    if (this.posX < 0) {
      this.posX = 0;
      return false;
    }

    return true;
  }

  moveRight() {
    this.posX++;

    if (this.posX + PADDLE_WIDTH > CANVAS_WIDTH) {
      this.posX = CANVAS_WIDTH - PADDLE_WIDTH;
      return false;
    }

    return true;
  }
}
