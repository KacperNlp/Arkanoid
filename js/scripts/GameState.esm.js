import { Block } from "./Block.esm.js";
import { gameLevels } from "./gameLevels.esm.js";

export class GameState {
  constructor(level) {
    const levelIndexInArray = Number(level) - 1;
    const _gameBoard = gameLevels[levelIndexInArray].board.map(
      ({ x, y, kind }) => new Block(x, y, kind)
    );

    this._level = level;

    this.getGameBoard = () => _gameBoard;
  }

  #isPaused = false;

  get level() {
    return this._level;
  }

  get isPaused() {
    return this.#isPaused;
  }

  set isPaused(pause) {
    this.#isPaused = pause;
  }
}
