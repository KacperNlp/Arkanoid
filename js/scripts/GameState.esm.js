export class GameState {
  constructor(level, pointToWin, diamonds, diamondsSpriteImages) {
    const _gameBoard = "";

    this._pointsToWin = pointToWin;
    this._level = level;

    this.getGameBoard = () => _gameBoard;
    this.isPlayerWinner = () => _playerPoints >= this._pointsToWin;
  }

  get level() {
    return this._level;
  }
}
