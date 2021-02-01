import { canvas } from "./Canvas.esm.js";
import { Common, VISIBLE_SCREEN, HIDDEN_SCREEN } from "./Common.esm.js";
import { game } from "./Game.esm.js";
import { levelSelect } from "./LevelSelect.esm.js";
import { mainMenu } from "./MainMenu.esm.js";
import { userData } from "./UserData.esm.js";

const CLASS_FOR_WINNING_SCREEN = "end-screen--is-win";

const GAME_RESULT_SCREEN_CONTAINER_ID = "js-game-result-container";
const GAME_RESULT_ID = "js-game-result";
const GAME_RESULT_BACK_BUTTON_ID = "js-back-to-levels";
const GAME_RESULT_RESTART_LEVEL_ID = "js-restart-level";

class ResultScreen extends Common {
  constructor() {
    super(GAME_RESULT_SCREEN_CONTAINER_ID);

    this.bindToElements();
  }

  bindToElements() {
    this.gameResuleContainer = this.bindToElement(GAME_RESULT_ID);

    const backToLevelsButton = this.bindToElement(GAME_RESULT_BACK_BUTTON_ID);
    const restartLevelButton = this.bindToElement(GAME_RESULT_RESTART_LEVEL_ID);

    backToLevelsButton.addEventListener("click", this.#backButtonClick);
    restartLevelButton.addEventListener("click", this.#restartLevel);
  }

  viewResultScreen(isGameWin) {
    if (isGameWin) {
      this.element.classList.add(CLASS_FOR_WINNING_SCREEN);
    } else {
      this.element.classList.remove(CLASS_FOR_WINNING_SCREEN);
    }

    this.changeVisibilityOfScreen(this.element, VISIBLE_SCREEN);

    this.gameResuleContainer.textContent = isGameWin
      ? "Wygrałeś!"
      : "Przegrałeś!";
  }

  #backButtonClick = () => {
    this.changeVisibilityOfScreen(canvas.element, HIDDEN_SCREEN);
    this.changeVisibilityOfScreen(this.element, HIDDEN_SCREEN);
    this.changeVisibilityOfScreen(mainMenu.miniSettingsLayer, HIDDEN_SCREEN);
    mainMenu.showLevelScreen();
  };

  #restartLevel = () => {
    this.changeVisibilityOfScreen(this.element, HIDDEN_SCREEN);
    levelSelect.loadLevel(game.gameState.level);
  };
}

export const resultScreen = new ResultScreen();
