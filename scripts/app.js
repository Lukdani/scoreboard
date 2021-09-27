import GameController from './controllers/gameController.js';
import GameModel from './models/gameModel.js';
import GameView from './views/gameView.js';

window.onload = () => {
  const gameModel = new GameModel();
  const gameView = new GameView();

  new GameController(gameModel, gameView);
};
