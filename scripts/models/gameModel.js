import jsonTryStringify from '../utils/jsonTryStringify.js';
import { saveToLocalStorage } from '../utils/localStorage.js';

export default class GameModel {
  constructor() {
    this.game = {
      numberOfHoles: 0,
      playerName: '',
      currentScore: {},
      defaultNumberOfHoles: 12,
      gameMuted: false,
    };
  }

  // Functions to generate stats;
  getTotalScore = () => {
    return this.game.currentScore &&
      Object.values(this.game.currentScore).length > 0
      ? Object.values(this.game.currentScore).reduce(
          (prevScore, newScore) => prevScore + newScore,
        )
      : 0;
  };

  getAveragePerHole = () => {
    const numberOfPlayedHoles = Object.values(
      this.game.currentScore,
    ).filter((hole) => hole > 0)?.length;
    if (numberOfPlayedHoles && numberOfPlayedHoles > 0) {
      return this.getTotalScore() / numberOfPlayedHoles;
    }
    return 0;
  };

  // Functions to set game data;
  setNumberOfHoles = (numberOfHoles) => {
    this.game.numberOfHoles = numberOfHoles > 11 ? 12 : numberOfHoles;
  };

  setPlayerName = (name) => {
    this.game.playerName = name;
  };

  setCurrentScore = (score) => {
    this.game.currentScore = score;
    this.cacheGame();
  };

  setHoleScore = (holeNumber, initialScore) => {
    if (!this.game.currentScore) this.game.currentScore = { 1: 0 };
    this.game.currentScore[holeNumber] = initialScore || 0;
    this.cacheGame();
  };

  // Functions to increment hole scores;
  incrementHoleScore = (holeNumber) => {
    this.game.currentScore[holeNumber]++;
  };

  decrementHoleScore = (holeNumber) => {
    if (this.game.currentScore[holeNumber] < 1) return;
    this.game.currentScore[holeNumber]--;
  };

  // Functions to reset game;
  resetAllHoles = () => {
    Object.keys(this.game.currentScore).forEach(
      (key) => (this.currenScore[key] = 0),
    );
  };

  resetGame = (savedGame) => {
    this.game.numberOfHoles =
      savedGame?.numberOfHoles || this.game.defaultNumberOfHoles;
    this.game.playerName = savedGame?.playerName || '';
    this.game.currentScore = savedGame?.currentScore || {};
  };

  toggleMute = () => {
    this.game.gameMuted = !this.game.gameMuted;
  };

  // Function to cache game;
  cacheGame = () => {
    saveToLocalStorage(
      'scoreBoard',
      jsonTryStringify(
        Object.assign({}, this.game, {
          restoreTime: new Date(),
        }),
      ),
    );
  };
}
