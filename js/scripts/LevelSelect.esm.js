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

  #canvas = canvas;
  #loader = loader;
  #game = game;
  #media = media;

  createButtons() {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }

    console.log(this.element);

    gameLevels.some((gameLevel) => this.createButton(gameLevel.level));
  }

  createButton(value) {
    if (!userData.checkAvailabilityLevel(value)) return;

    console.log(value);

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
    this.changeVisibilityOfScreen(this.#canvas.element, VISIBLE_SCREEN);
    this.loadLevel(event.currentTarget.value);
  };

  loadLevel(level) {
    if (this.#media.spriteSheet && this.#media.backgroundMusic) {
      this.#game.playLevel(level);
      return;
    }

    if (!this.#media.spriteSheet) {
      this.#media.spriteSheet = this.#loader.loadImage(
        "images/diamonds-transparent.png"
      );
    }

    if (!this.#media.backgroundMusic) {
      this.#media.backgroundMusic = this.#loader.loadSound(
        "/sounds/music-background.mp3"
      );
    }

    window.addEventListener(DATALOADED_EVENT_NAME, () =>
      this.#game.playLevel(level)
    );
  }
}

export const levelSelect = new LevelSelect();
