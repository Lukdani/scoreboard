import jsonTryParse from '../utils/jsonTryParse.js';
import {
  clearFromLocalStorage,
  getFromLocalStorage,
} from '../utils/localStorage.js';
import nameApostropher from '../utils/nameApostropher.js';

export default class GameController {
  constructor(gameModel, gameView) {
    this.gameModel = gameModel;
    this.gameView = gameView;

    // SETTING UP EVENT LISTENERS/DATA BINDING;
    this.gameView.listenHolesInput(this.handleHolesInputChanged);
    this.gameView.listenPlayerNameInput(this.handlePlayerNameChanged);
    this.gameView.listenStartGameClicked(this.handleStartGameClicked);
    this.gameView.listenRestoreGameClicked(
      this.handleRestoreGameClicked,
    );
    this.gameView.listenBeginReset(this.handleBeginReset);
    this.gameView.listenMute(this.handleMute);

    this.savedGame = jsonTryParse(getFromLocalStorage('scoreBoard'));
    if (this.savedGame) {
      this.gameView.setRestoreTitle(this.savedGame.restoreTime);
      this.gameView.toggleRestoreGameButton();
    }

    // ADDING EVENT LISTENER FOR STARTING GAME ON ENTER CLICK;
    window.addEventListener('keyup', this.handleEnterClicked); // Second parameter to addEventListener doesn't have to be an anonymous function, but can be an already declared function, if the only passed parameter is the event itself;
  } // CONSTRUCTOR END;

  // TOGGLER FOR DISABLING/ENABLING START BUTTON;
  handleToggleStartButton = () => {
    if (
      this.gameModel.game?.numberOfHoles > 0 &&
      this.gameModel.game?.playerName?.length > 0
    ) {
      this.gameView.toggleStartGameButton(false); // set DISABLED attribute of button to FALSE;
    } else {
      this.gameView.toggleStartGameButton(true); // set DISABLED attribute of button TRUE;
    }
  };

  setPlayerName = (newName) => {
    this.gameModel.setPlayerName(newName);
    this.gameView.updatePlayerNameLabel(
      `⛳️ ${nameApostropher(
        this.gameModel.game.playerName,
      )} scorecard 🏌️‍♂️🏌️‍♀️`,
    );
  };

  // INPUTS FOR PLAYER NAME AND #HOLES;
  handleHolesInputChanged = (numberOfHoles) => {
    this.gameModel.setNumberOfHoles(numberOfHoles);
    this.handleToggleStartButton();
  };

  handlePlayerNameChanged = (newName) => {
    this.setPlayerName(newName);
    this.handleToggleStartButton();
  };

  // RESTORE GAME;
  handleRestoreGameClicked = () => {
    this.savedGame = jsonTryParse(getFromLocalStorage('scoreBoard'));
    if (this.savedGame) {
      this.gameModel.resetGame(this.savedGame);
      this.setPlayerName(this.savedGame.playerName);
      this.handleStartGame();
    }
  };
  // START GAME;

  handleEnterClicked = (e) => {
    if (
      e.keyCode === 13 &&
      this.gameModel.game.playerName?.length > 0 &&
      this.gameModel.game.numberOfHoles > 0
    ) {
      this.handleStartGame();
      return;
    }
  };
  handleStartGameClicked = () => {
    this.handleStartGame();
  };

  handleStartGame = () => {
    for (
      let index = 0;
      index < this.gameModel.game.numberOfHoles;
      index++
    ) {
      const holeNumber = index + 1;
      this.gameView.addHole(
        holeNumber,
        this.gameModel.game.currentScore[holeNumber] || 0,
      );
      this.gameModel.setHoleScore(
        holeNumber,
        this.gameModel.game.currentScore[holeNumber],
      );
      this.gameView.listenIncrease(holeNumber, () =>
        this.handleIncrease(holeNumber),
      );
      this.gameView.listenDecrease(holeNumber, () =>
        this.handleDecrease(holeNumber),
      );
    }
    this.gameView.updateScore(
      this.gameModel.getTotalScore(),
      this.gameModel.getAveragePerHole(),
    );
    this.gameView.toggleGameView();
    this.gameModel.cacheGame();
  };

  // HANDLERS FOR DECREASE/INCREASE SCORE;
  handleIncrease = (holeNumber) => {
    this.gameModel.incrementHoleScore(holeNumber);
    this.gameView.updateHoleCount(
      holeNumber,
      this.gameModel.game.currentScore[holeNumber],
    );
    if (!this.gameModel.game.gameMuted)
      this.gameView.playSound('increase');
    this.gameView.toggleDisableDecrementButton(false, holeNumber);
    this.gameView.updateScore(
      this.gameModel.getTotalScore(),
      this.gameModel.getAveragePerHole(),
    );
  };

  handleDecrease = (holeNumber) => {
    this.gameModel.decrementHoleScore(holeNumber);
    this.gameView.updateHoleCount(
      holeNumber,
      this.gameModel.game.currentScore[holeNumber],
    );
    if (!this.gameModel.game.gameMuted)
      this.gameView.playSound('decrease');
    this.gameView.updateScore(
      this.gameModel.getTotalScore(),
      this.gameModel.getAveragePerHole(),
    );
    if (this.gameModel.game.currentScore[holeNumber] == 0)
      this.gameView.toggleDisableDecrementButton(true, holeNumber);
  };

  // RESET GAME;
  handleBeginReset = () => {
    //Reset model;
    this.gameModel.resetGame();

    //Reset view elements;
    this.gameView.clearScoreCard();
    this.gameView.setGameDataInputs(
      null,
      this.gameModel.game.defaultNumberOfHoles,
    );
    this.gameView.updatePlayerNameLabel('');
    this.gameView.listenBeginReset();
    this.handleToggleStartButton();
    this.gameView.toggleGameView(!!this.savedGame);
    this.gameView.focusPlayerNameInput();
    //Clear cached game;
    clearFromLocalStorage('scoreBoard');
  };

  handleMute = () => {
    this.gameModel.toggleMute();
    this.gameView.setMuteIcon(this.gameModel.game.gameMuted);
  };
}
