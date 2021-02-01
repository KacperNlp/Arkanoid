export class GameState {
  constructor(level, pointToWin) {
    const _gameBoard = "";

    this._pointsToWin = pointToWin;
    this._level = level;

    this.getGameBoard = () => _gameBoard;
    this.isPlayerWinner = () => _playerPoints >= this._pointsToWin;
  }

  #isPaused = false;

  get level() {
    return this._level;
  }

  get isPaused() {
    return this.#isPaused;
  }

  changePause(pause) {
    this.#isPaused = pause;
  }
}
