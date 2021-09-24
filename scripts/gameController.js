import ScoreBoard from "./scoreBoard.js";
import jsonTryParse from "./utils/jsonTryParse.js";
import { getFromLocalStorage } from "./utils/localStorage.js";

export default class GameController {
  
    constructor() {
        this.appElement = document.querySelector("#scoreCard");

        this.gameData = document.querySelector("#gameData");
        this.gameDataInput = document.querySelector("#gameDataInput")

        this.playerNameInputElement = document.querySelector("#playerNameElementInput");
        this.holesInputElement = document.querySelector("#holesInputElement");
        this.resetButton = document.querySelector("#reset");

        this.restoreButton = document.querySelector("#restore");
    
        this.beginResetbutton = document.querySelector("#beginReset");
    
        this.playerNameElement = document.querySelector("#playerName");
        
        this.playerName = "";
        this.numberOfHoles = 12;
        this.game;
    }
   
    toggleDisableResetButton = () => {
        if (this.playerName.length > 0 && this.numberOfHoles > 0) {
            this.resetButton.disabled = false;
        } 
        else {
            this.resetButton.disabled = true;
        }
    }

    setupEventListeners = () => {
        this.playerNameInputElement.addEventListener("change", e => {
            const value = e.target.value;
            this.playerName = value;
            this.playerNameInputElement.value = this.playerName;
            this.toggleDisableResetButton();
        });
        
        this.holesInputElement.addEventListener("change", e => {
       
            let value = e.target.value;
            try {
                value = parseInt(value);
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
            this.toggleDisableResetButton();
        })    

    this.resetButton.addEventListener("click", () => {this.resetGame(this.playerName, this.numberOfHoles, null);});

    this.beginResetbutton.addEventListener("click", () => {
        if (this.game != null) {
            this.game.resetGame(this.appElement);
        }
        this.toggleResetButtons  ();
    });

    this.restoreButton.addEventListener("click", () => {this.restoreGame()})

    }

    toggleResetButtons = () => {
        this.gameData.classList.toggle("hideElement");
        this.gameDataInput.classList.toggle("hideElement");
        this.beginResetbutton.classList.toggle("hideElement");

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
            try {
               const parsedGame = jsonTryParse(stringifiedSavedGame);
               if (parsedGame) this.resetGame(parsedGame.playerName, parsedGame.numberOfHoles, parsedGame.currentScore)
            }
            catch(e) {
                console.log(e)
            }
        }
    }
}