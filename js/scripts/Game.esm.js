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

class Game extends Common {
  constructor() {
    super();
  }

  playLevel() {
    window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel);

    this.paddle = new Paddle();
    this.background = new Sprite(0, 33, 800, 450, media.backgroundImage, 0, 0);
    this.gameState = new GameState();

    this.changeVisibilityOfScreen(canvas.element, VISIBLE_SCREEN);
    this.changeVisibilityOfScreen(mainMenu.miniSettingsLayer, VISIBLE_SCREEN);
    this.changeVisibilityOfScreen(backToMenu.element, HIDDEN_SCREEN);

    media.isInLevel = true;
    media.playBackgroundMusic();

    this.animate();
  }

  animate() {
    this.#handleGameControle();
    this.#drawSprites();
    this.#checksEndGame();
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
    this.paddle.draw();
  }

  #checksEndGame() {
    if (false) {
      media.isInLevel = false;
      media.stopBackgroundMusice();

      const isPlayerWinner = this.gameState.isPlayerWinner();
      const currentLevel = Number(this.gameState.level);
      const nextLevel = currentLevel + 1;
      const playerPoints = this.gameState.getPlayerPoints();

      if (!!gameLevels[this.gameState.level] && isPlayerWinner) {
        if (!userData.checkAvailabilityLevel(nextLevel)) {
          userData.addNewLevel(nextLevel);
        }
      }
      //update hight/best score in current level
      if (playerPoints > userData.getHightScore(currentLevel)) {
        userData.setHightScore(currentLevel, playerPoints);
      }

      resultScreen.viewResultScreen(
        isPlayerWinner,
        this.gameState.getPlayerPoints(),
        this.gameState.level
      );
    } else {
      this.animationFrame = window.requestAnimationFrame(() => this.animate());
    }
  }

  #handlePause() {
    const { clickedKey: key } = keyboardControl;

    if (key === PAUSE && !this.gameState.isPaused) {
      keyboardControl.clickedKey = null;
      this.gameState.changePause(true);
    } else if (key === PAUSE && this.gameState.isPaused) {
      keyboardControl.clickedKey = null;
      this.gameState.changePause(false);
    }
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
