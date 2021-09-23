import GameController from "./gameController.js";

window.onload = () => {
    const controller = new GameController();
    controller.setupEventListeners();
    controller.beginReset();
}
