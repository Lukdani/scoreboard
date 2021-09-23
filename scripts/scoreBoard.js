export default class ScoreBoard{
    constructor(gameName, holes) {
        this.gameName = gameName;
        this.numberOfHoles = holes;
    }

    currentScore = {};
    totalScore = 0;
  
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

        let newScore = this.currentScore[hole];

        if (type == "decrease") {
            if (newScore > 0) newScore = newScore - 1;
        }
        else if (type == "increase") {
            newScore++;
        }

        this.currentScore[hole] = newScore;
        document.querySelector(`input[name="golfHole-${hole}"]`).setAttribute("value", this.currentScore[hole]);
        this.calculateTotalScore();
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
            this.currentScore[index +1] = 0;
            const inputContainer = document.createElement("div");
            inputContainer.setAttribute("id", `golfHole-${index + 1}`);
            element.appendChild(inputContainer);

            // Decrease button;
            const decreaseButton = document.createElement("button");
            decreaseButton.addEventListener("click", (e) => this.handleScore(e, "decrease"));
            decreaseButton.createTextNode = "-";
            decreaseButton.setAttribute("class", "btn btn-primary buttonDecrease");
            decreaseButton.setAttribute("data-decrease", index +1);
            const decreaseText = document.createTextNode("-");
            decreaseButton.appendChild(decreaseText);
            inputContainer.appendChild(decreaseButton);

            // Input field;
            const inputField = document.createElement("input");
            inputField.setAttribute("name", `golfHole-${index + 1}`);
            inputField.setAttribute("value", 0);
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