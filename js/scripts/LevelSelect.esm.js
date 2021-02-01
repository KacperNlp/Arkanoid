import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from "./Common.esm.js";
import { canvas } from "./Canvas.esm.js";
import { loader, DATALOADED_EVENT_NAME } from "./Loader.esm.js";
import { gameLevels } from "./gameLevels.esm.js";
import { game } from "./Game.esm.js";
import { media } from "./Media.esm.js";
import { userData } from "./UserData.esm.js";

const LEVEL_SELECT_ID = "js-level-select-screen";
const LEVEL_SELECT_BUTTON_CLASS = "level-select__button";

class LevelSelect extends Common {
  constructor() {
    super(LEVEL_SELECT_ID);
  }

  createButtons() {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }

    gameLevels.some((gameLevel) => this.createButton(gameLevel.level));
  }

  createButton(value) {
    if (!userData.checkAvailabilityLevel(value)) return;

    const button = document.createElement("button");

    button.type = button;
    button.classList.add("level-select__button");
    button.textContent = value;
    button.value = value;

    button.addEventListener("click", this.buttonOnClickHandler);

    this.element.appendChild(button);
  }

  buttonOnClickHandler = (event) => {
    event.preventDefault();

    this.changeVisibilityOfScreen(this.element, HIDDEN_SCREEN);
    this.changeVisibilityOfScreen(canvas.element, VISIBLE_SCREEN);
    this.loadLevel(event.currentTarget.value);
  };

  loadLevel(level) {
    if (media.backgroundImage && media.backgroundMusic) {
      game.playLevel(level);
      return;
    }

    if (!media.backgroundImage) {
      media.backgroundImage = loader.loadImage("/images/spritessheet.png");
    }

    if (!media.backgroundMusic) {
      media.backgroundMusic = loader.loadSound(
        "/sounds/music-backgroundII.mp3"
      );
    }

    window.addEventListener(DATALOADED_EVENT_NAME, () => game.playLevel(level));
  }
}

export const levelSelect = new LevelSelect();
