import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./Canvas.esm.js";
import { media } from "./Media.esm.js";
import { Sprite } from "./Sprite.esm.js";
import { PADDLE_INITIAL_POSITION_Y } from "./Paddle.esm.js";

const BALL_SIZE = 22;
const BALL_SPRITE_POSITION_X = 232;
const BALL_SPRITE_POSITION_Y = 0;
const BALL_INITIAL_POSITION_X = CANVAS_WIDTH / 2 - BALL_SIZE / 2;
const BALL_INITIAL_POSITION_Y = PADDLE_INITIAL_POSITION_Y - BALL_SIZE;

export class Ball extends Sprite {
  constructor() {
    super(
      BALL_SPRITE_POSITION_X,
      BALL_SPRITE_POSITION_Y,
      BALL_SIZE,
      BALL_SIZE,
      media.backgroundImage,
      BALL_INITIAL_POSITION_X,
      BALL_INITIAL_POSITION_Y
    );

    this.directionX = -6;
    this.directionY = -5;
  }

  moveAndCheckCollision(blocks) {
    const { directionX, directionY } = this;
    const hittedBlock = [];

    const vector = {
      directionX,
      directionY,
    };

    this.posX += directionX;

    blocks.forEach((block, id) => {
      if (this.checkCollisionWithAnotherSprite(vector, block)) {
        hittedBlock.push(id);
        this.#reverseDirectionX();
      }
    });

    this.posY += directionY;

    blocks.forEach((block, id) => {
      if (this.checkCollisionWithAnotherSprite(vector, block)) {
        if (!hittedBlock.includes(id)) {
          hittedBlock.push(id);
        }
        this.reverseDirectionY();
      }
    });

    if (this.posX < 0 || this.posX > CANVAS_WIDTH - BALL_SIZE) {
      this.#reverseDirectionX();
    }

    if (this.posY < 0) {
      this.reverseDirectionY();
    }

    hittedBlock.forEach((id) => {
      const { kind } = blocks[id];
      if (!!kind) {
        blocks[id].kind--;
      } else if (!kind) {
        blocks.splice(id, 1);
      }
    });
  }

  #reverseDirectionX() {
    this.directionX = -this.directionX;
  }

  reverseDirectionY() {
    this.directionY = -this.directionY;
  }

  ballIsOutOfTheMap() {
    return this.posY + BALL_SIZE > CANVAS_HEIGHT;
  }
}
