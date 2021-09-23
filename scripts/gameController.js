import ScoreBoard from "./scoreBoard.js";

export default class GameController {
  
    constructor() {
        this.appElement = document.querySelector("#scoreCard");

        this.gameData = document.querySelector("#gameData");
        this.gameDataInput = document.querySelector("#gameDataInput")

        this.playerNameInputElement = document.querySelector("#playerNameElementInput");
        this.holesInputElement = document.querySelector("#holesInputElement");
        this.resetButton = document.querySelector("#reset");
    
        this.beginResetbutton = document.querySelector("#beginReset");
    
        this.playerNameElement = document.querySelector("#playerName");
        
        this.playerName = "";
        this.numberOfHoles = 0;
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
                value = +value;
            }
            catch(e) {
                console.log(e);
            }
            this.numberOfHoles = value;
            this.toggleDisableResetButton();
        })    

    this.resetButton.addEventListener("click", () => {this.resetGame();});

    this.beginResetbutton.addEventListener("click", () => {
        if (this.game != null) {
            this.game.resetGame(this.appElement);
        }
        this.toggleResetButtons  ();
    });

    }

    toggleResetButtons = () => {
        this.gameData.classList.toggle("hideElement");
        this.gameDataInput.classList.toggle("hideElement");
        this.beginResetbutton.classList.toggle("hideElement");
    }

    beginReset() {
        this.toggleResetButtons();
        this.playerName = "";
        this.playerNameInputElement.value = "";
        this.playerNameInputElement.focus();
        this.holesInputElement = 0;
    }

    resetGame() {
        this.toggleResetButtons();
        if (this.game != null) {
            this.game.resetGame(this.appElement);
        }
        this.startGame();
    }

    startGame() {
        this.game = new ScoreBoard(this.playerName, this.numberOfHoles)
        this.game.generateInputFields(this.appElement);
        this.playerNameElement.innerHTML = `${this.playerName || "Uknown"}'${this.playerName[this.playerName.length -1]?.toLowerCase() !== "s" ? 's' : ''} scorecard`;
    }    
}