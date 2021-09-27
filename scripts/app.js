// import GameController from "./gameController.js";
import GameController from "./controller.js";
import GameModel from "./gameModel.js";
import GameView from "./gameView.js";

window.onload = () => {
    const gameModel = new GameModel();
    const gameView = new GameView();

    const controller = new GameController(gameModel, gameView);

    /*
    controller.setupEventListeners();
    controller.beginReset();
    */
}
