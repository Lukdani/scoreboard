import ScoreBoard from "./scoreBoard.js";

export default function gameController() {
   var name = prompt("Name of the game");
    var numberOfHoles = prompt("Number of holes");

    const game = new ScoreBoard(name, numberOfHoles);
    const app = document.querySelector("#app");

    game.generateInputFields(app);

    const playerNameElement = document.querySelector("#playerName");
    playerNameElement.innerHTML = name || "";

    document.querySelector("#resetButton").addEventListener("click", () => {game.resetGame(app); game.generateInputFields(app)});
/*
    const increaseButtons = document.querySelectorAll(".buttonIncrease");
    increaseButtons.forEach(btn => {
        btn.addEventListener("click", game.handleIncrease);
    })

    const decreaseButtons = document.querySelectorAll(".buttonDecrease");
    decreaseButtons.forEach(btn => {
        btn.addEventListener("click", game.handleDecrease);
    })*/
}