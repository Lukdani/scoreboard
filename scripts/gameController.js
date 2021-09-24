import ScoreBoard from "./scoreBoard.js";
import jsonTryParse from "./utils/jsonTryParse.js";
import { getFromLocalStorage } from "./utils/localStorage.js";

export default class GameController {
  
    constructor() {

        // The container for the app;
        this.appElement = document.querySelector("#scoreCard");

        // Elements conditionally shown based on current state of the app;
        this.gameData = document.querySelector("#gameData");
        this.gameDataInput = document.querySelector("#gameDataInput")

        // Input fields for name and number of holes;
        this.playerNameInputElement = document.querySelector("#playerNameElementInput");
        this.holesInputElement = document.querySelector("#holesInputElement");
        
        // Buttons;
        this.resetButton = document.querySelector("#reset");
        this.restoreButton = document.querySelector("#restore");
        this.beginResetbutton = document.querySelector("#beginReset");

        // Label for player name;
        this.playerNameElement = document.querySelector("#playerName");
        
        // Game state;
        this.playerName = "";
        this.numberOfHoles = 12;
        this.game;
    }
   
    // Function to handle whether "OK" button should be disabled or not;
    toggleDisableResetButton = () => {
        if (this.playerName.length > 0 && this.numberOfHoles > 0) {
            this.resetButton.disabled = false;
        } 
        else {
            this.resetButton.disabled = true;
        }
    }

    // Function to setup event listeners to listen for button clicks etc;
    setupEventListeners = () => {
        this.playerNameInputElement.addEventListener("change", e => {
            const value = e.target.value;
            this.playerName = value;
            this.playerNameInputElement.value = this.playerName;
            this.toggleDisableResetButton();
        });
        
        this.holesInputElement.addEventListener("change", e => {

            let value = e.target.value;

            // Wrapping in try/catch to handle failed parsings;
            try {
                value = parseInt(value);

                // Only accepting numbers and defaulting to 12 if the user did not supply valid number or number above 12;
                if (isNaN(value)) {
                    e.currentTarget.value = this.numberOfHoles;
                }
                else if (!isNaN(value)) {
                    this.numberOfHoles = value > 12 ? 12 : value;
                    e.currentTarget.value = this.numberOfHoles;
                }   
            }
            catch(e) {
                console.log(e);
            }

            // Checking if the "OK" button should be enabled (which it should if user also supplied a username at this point);
            this.toggleDisableResetButton();
        })    

    this.resetButton.addEventListener("click", () => {this.resetGame(this.playerName, this.numberOfHoles, null);});

    this.beginResetbutton.addEventListener("click", () => {
        if (this.game != null) {
            this.game.resetGame(this.appElement);
        }
        this.toggleResetButtons  ();
    });

    this.restoreButton.addEventListener("click", () => this.restoreGame())

    }


    // Toggling view when state of the app changes;
    toggleResetButtons = () => {
        this.gameData.classList.toggle("hideElement");
        this.gameDataInput.classList.toggle("hideElement");
        this.beginResetbutton.classList.toggle("hideElement");

        // Only toggling the restore button, if there is a saved game in local storage AND if the view is currently showing the gameDataInput container;
        if (!this.gameDataInput.classList.contains("hideElement")) {
            const savedScoreBoard = getFromLocalStorage("scoreBoard");
            if (savedScoreBoard) {
                this.restoreButton.classList.toggle("hideElement");
            }
        }
    }

    beginReset() {
        this.toggleResetButtons();
        this.playerName = "";
        this.playerNameInputElement.value = "";
        this.playerNameInputElement.focus();
        this.holesInputElement = 0;
    }

    resetGame(playerName, numberOfHoles, currentScore) {
        this.toggleResetButtons();
        if (this.game != null) {
            this.game.resetGame(this.appElement);
        }
        this.startGame(playerName, numberOfHoles, currentScore);
    }

    startGame(playerName, numberOfHoles, currentScore) {
        this.game = new ScoreBoard(playerName, numberOfHoles, this.appElement, currentScore)
        this.playerNameElement.innerHTML = `${playerName || "Uknown"}'${playerName[playerName.length -1]?.toLowerCase() !== "s" ? 's' : ''} scorecard`;
    }    

    restoreGame() {
        const stringifiedSavedGame = getFromLocalStorage("scoreBoard")
        if (stringifiedSavedGame != null) {
               const parsedGame = jsonTryParse(stringifiedSavedGame);
               if (parsedGame) this.resetGame(parsedGame.playerName, parsedGame.numberOfHoles, parsedGame.currentScore)
            }
    }
}