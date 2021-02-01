export const MOVE_LEFT = 37;
export const MOVE_RIGHT = 39;
export const PAUSE = 80;

class KeyboardControl {
  constructor() {
    this.clickedKey = null;
    this.#handleEvent();
  }

  #handleEvent() {
    this.#startMove();
    this.#stopMove();
  }

  #startMove() {
    window.addEventListener("keydown", ({ keyCode }) => {
      this.clickedKey = keyCode;
    });
  }

  #stopMove() {
    window.addEventListener("keyup", () => {
      this.clickedKey = null;
    });
  }
}

export const keyboardControl = new KeyboardControl();
