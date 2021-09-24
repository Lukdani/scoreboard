import jsonTryStringify from "./utils/jsonTryStringify.js";

import { saveToLocalStorage } from "./utils/localStorage.js";

export default class ScoreBoard {
    constructor(gameName, holes, appContainer, currentScore) {
        this.gameName = gameName;
        this.numberOfHoles = holes;
        if (currentScore) {
            this.currentScore = currentScore;
            console.log(this.currentScore[1]);
            this.calculateTotalScore();
        }
        else if (!currentScore) {
            this.currentScore = {};
        }
        this.generateInputFields(appContainer);
        saveToLocalStorage("scoreBoard", jsonTryStringify({currentScore: this.currentScore, playerName: this.gameName, numberOfHoles: this.numberOfHoles}));
    }

  
    setTotalScore(newScore) {
        this.totalScore = newScore;
        document.querySelector("#totalScore").innerHTML = this.totalScore;
    }

    calculateTotalScore = () => {
        const calcuatedScore = Object.values(this.currentScore).reduce((prevValue, newValue) => prevValue + newValue);
        this.setTotalScore(calcuatedScore);
    }

    handleScore = (e, type) => {
        const hole = (e.currentTarget.getAttribute(type == "increase" ? "data-increase" : "data-decrease"));
        if (hole === null) return;

        let newScore = this.currentScore[hole] || 0;

        if (type == "decrease") {
            if (newScore > 0) newScore = newScore - 1;
            if (newScore === 0) e.currentTarget.disabled = true;
        }

        else if (type == "increase") {
            if (newScore === 0) {
                document.querySelector(`.buttonDecrease[data-decrease="${hole}"]`).disabled = false;
            }
            newScore++;
        }

        this.currentScore[hole] = newScore;
        this.setTotalScore()
        document.querySelector(`input[name="golfHole-${hole}"]`).setAttribute("value", this.currentScore[hole]);
        this.calculateTotalScore();
        saveToLocalStorage("scoreBoard", jsonTryStringify({currentScore: this.currentScore, playerName: this.gameName, numberOfHoles: this.numberOfHoles}));
    }

    resetGame(element) {
        element.innerHTML = "";
        this.setTotalScore(0);
    }

    generateInputFields(element) {
        document.addEventListener("keyup", (e) => {
            if (e.currentTarget["data-decrease"]) {
                console.log("Decrease button");
            }
            else if (e.currentTarget["data-increase"]) {
                console.log("Increase button");
            }
            console.log(e.currentTarget);
        })

        for (let index = 0; index < this.numberOfHoles; index++) {
            if (!this.currentScore[index + 1]) {
                this.currentScore[index +1] = 0;
            }

            const inputContainer = document.createElement("div");
            inputContainer.setAttribute("id", `golfHole-${index + 1}`);
            inputContainer.setAttribute("class", `golfHole`);
            element.appendChild(inputContainer);

            // Decrease button;
            const decreaseButton = document.createElement("button");
            decreaseButton.addEventListener("click", (e) => this.handleScore(e, "decrease"));
            decreaseButton.createTextNode = "-";
            decreaseButton.disabled = true;
            decreaseButton.setAttribute("class", "btn btn-danger buttonDecrease");
            decreaseButton.setAttribute("data-decrease", index +1);
            const decreaseText = document.createTextNode("-");
            decreaseButton.appendChild(decreaseText);
            inputContainer.appendChild(decreaseButton);

            // Input field;
            const inputField = document.createElement("input");
            inputField.setAttribute("name", `golfHole-${index + 1}`);
            inputField.setAttribute("value", this.currentScore[index + 1]);
            inputField.disabled = true;
            inputField.setAttribute("class", "holeInput");
            inputContainer.appendChild(inputField);

            // Increase button;
            const plusButton = document.createElement("button");
            plusButton.setAttribute("class", "btn btn-primary buttonIncrease");
            plusButton.setAttribute("data-increase", index +1);
            const plusText = document.createTextNode("+");
            plusButton.appendChild(plusText);
            inputContainer.appendChild(plusButton);
            plusButton.addEventListener("click", (e) => this.handleScore(e, "increase"));
        }
    }
}