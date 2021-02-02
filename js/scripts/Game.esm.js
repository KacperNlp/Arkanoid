import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from "./Common.esm.js";
import { DATALOADED_EVENT_NAME } from "./Loader.esm.js";
import { gameLevels } from "./gameLevels.esm.js";
import { canvas } from "./Canvas.esm.js";
import { media } from "./Media.esm.js";
import { GameState } from "./GameState.esm.js";
import { resultScreen } from "./ResultScreen.esm.js";
import { userData } from "./UserData.esm.js";
import { mainMenu } from "./MainMenu.esm.js";
import { backToMenu } from "./BackToMenu.esm.js";
import { Sprite } from "./Sprite.esm.js";
import { Paddle, PADDLE_SPEED } from "./Paddle.esm.js";
import {
  keyboardControl,
  MOVE_LEFT,
  MOVE_RIGHT,
  PAUSE,
} from "./KeyboardControl.esm.js";
import { Ball } from "./Ball.esm.js";

class Game extends Common {
  constructor() {
    super();
  }

  playLevel(level) {
    window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel);

    this.ball = new Ball();
    this.paddle = new Paddle();
    this.background = new Sprite(0, 33, 800, 450, media.backgroundImage, 0, 0);
    this.gameState = new GameState(level);

    this.changeVisibilityOfScreen(canvas.element, VISIBLE_SCREEN);
    this.changeVisibilityOfScreen(mainMenu.miniSettingsLayer, VISIBLE_SCREEN);
    this.changeVisibilityOfScreen(backToMenu.element, HIDDEN_SCREEN);

    media.isInLevel = true;
    media.playBackgroundMusic();

    this.animate();
  }

  animate() {
    this.ball.moveAndCheckCollision(this.gameState.getGameBoard());
    this.#checkCollisionWithPaddle();
    this.#handleGameControle();
    this.#drawSprites();
    this.#checksEndGame();
  }

  #checkCollisionWithPaddle() {
    const { directionX, directionY } = this.ball;

    if (directionY < 0) return;

    const vector = {
      directionX,
      directionY,
    };

    if (this.ball.checkCollisionWithAnotherSprite(vector, this.paddle)) {
      this.ball.reverseDirectionY();
    }
  }

  #handleGameControle() {
    const { clickedKey: key } = keyboardControl;

    this.#handlePause();

    if (this.gameState.isPaused || !key) return;

    switch (key) {
      case MOVE_RIGHT:
        for (let i = PADDLE_SPEED; i && this.paddle.moveRight(); i--);
        break;

      case MOVE_LEFT:
        for (let i = PADDLE_SPEED; i && this.paddle.moveLeft(); i--);
        break;
    }
  }

  #drawSprites() {
    this.background.draw(0, 1.25);
    this.#drawBlocks();
    this.ball.draw();
    this.paddle.draw();
  }

  #checksEndGame() {
    if (this.ball.ballIsOutOfTheMap()) {
      media.isInLevel = false;
      media.stopBackgroundMusice();

      resultScreen.viewResultScreen(true);
    } else {
      this.animationFrame = window.requestAnimationFrame(() => this.animate());
    }
  }

  #handlePause() {
    const { clickedKey: key } = keyboardControl;

    if (key === PAUSE && !this.gameState.isPaused) {
      keyboardControl.clickedKey = null;
      this.gameState.isPaused = true;
    } else if (key === PAUSE && this.gameState.isPaused) {
      keyboardControl.clickedKey = null;
      this.gameState.isPaused = false;
    }
  }

  #drawBlocks() {
    this.gameState.getGameBoard().forEach((block) => block.draw());
  }

  swap(firstDiamond, secondDiamond) {
    [
      firstDiamond.x,
      firstDiamond.y,
      firstDiamond.match,
      firstDiamond.kind,
      firstDiamond.alpha,
      secondDiamond.x,
      secondDiamond.y,
      secondDiamond.match,
      secondDiamond.kind,
      secondDiamond.alpha,
    ] = [
      secondDiamond.x,
      secondDiamond.y,
      secondDiamond.match,
      secondDiamond.kind,
      secondDiamond.alpha,
      firstDiamond.x,
      firstDiamond.y,
      firstDiamond.match,
      firstDiamond.kind,
      firstDiamond.alpha,
    ];

    this.gameState.setIsMoving(true);
  }
}

export const game = new Game();
