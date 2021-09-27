import generatePrizeEmoji from '../utils/generatePrizeEmoji.js';

export default class GameView {
  constructor() {
    // App root element;
    this.app = this.getElement('#appContainer');

    // SETING UP ELEMENTS;
    // Header section
    this.header = this.createElement('h1', ['text-dark', 'm4'], null);
    this.header.textContent =
      'Awezumm mini-golf-score-card-generator';

    this.subHeader = this.createElement('p', ['teaser'], null);
    this.subHeader.textContent =
      "That one thing you surely didn't know you needed in your life...";

    // Container for the dashboards
    this.gameDataContainer = this.createElement(
      'div',
      null,
      'gameDataContainer',
    );
    this.app.append(this.gameDataContainer);

    //Dashboard for showing game data;
    this.gameData = this.createElement(
      'div',
      ['hideElement'],
      'gameData',
    );

    this.playerNameLabel = this.createElement(
      'h3',
      ['text-accent'],
      'playerName',
    );

    this.playerScore = this.createElement('p', null, 'totalScore');

    this.beginReset = this.createElement(
      'button',
      ['btn', 'btn-secondary', 'btn-sm'],
      'beginReset',
    );
    this.beginReset.textContent = 'Reset';

    this.gameData.append(
      this.playerNameLabel,
      this.playerScore,
      this.beginReset,
    );
    this.gameDataContainer.append(this.gameData);

    // Dashboard for creating the scoreboard;
    this.gameDataInput = this.createElement(
      'div',
      null,
      'gameDataInput',
    );
    this.dataInputHeader = this.createElement(
      'h3',
      ['text-accent'],
      null,
    );
    this.dataInputHeader.textContent =
      'Giev me your data to begin... 💀';

    this.playerNameInputLabel = this.createElement('label');
    this.playerNameInputLabel.setAttribute('for', 'playerNameInput');
    this.playerNameInputLabel.textContent = 'Player name 🏌️‍♀️/🏌️‍♂️';
    this.playerNameInput = this.createElement(
      'input',
      ['gameDataInputField'],
      'playerNameInput',
    );

    this.holesInputLabel = this.createElement('label');
    this.holesInputLabel.setAttribute('for', 'holesInput');
    this.holesInputLabel.textContent = '# of holes (12 max) ⛳️';
    this.holesInput = this.createElement(
      'input',
      ['gameDataInputField'],
      'holesInput',
    );

    this.startGameButton = this.createElement(
      'button',
      ['btn', 'btn-success', 'btn-sm'],
      'startGame',
    );
    this.startGameButton.disabled = true;
    this.startGameButton.textContent = 'OK 👌';

    this.restoreGameButton = this.createElement(
      'button',
      ['btn', 'btn-danger', 'btn-sm', 'hideElement'],
      'restoreGame',
    );
    this.restoreGameButton.textContent = 'Restore from cache 😱';

    this.gameDataContainer.append(this.gameDataInput);

    this.gameDataInput.append(
      this.header,
      this.subHeader,
      this.playerNameInputLabel,
      this.playerNameInput,
      this.holesInputLabel,
      this.holesInput,
      this.startGameButton,
      this.restoreGameButton,
    );

    this.playerNameInput.focus();

    // The actual scorecard;
    this.scoreCard = this.createElement('div', null, 'scoreCard');
    this.gameData.appendChild(this.scoreCard);
  }
  // CONSTRUCTOR END

  // General UI helper functions;
  createElement(tag, classNames, id) {
    const element = document.createElement(tag);
    if (classNames?.length > 0)
      //Accepting an array for class, so that multiple classes can be added when creating an element;
      classNames.forEach((classElement) =>
        element.classList.add(classElement),
      );
    if (id) element.setAttribute('id', id);
    return element;
  }

  getElement(querySelector) {
    return document.querySelector(querySelector);
  }

  // Feature specific helper functions;
  addHole(holeNumber, initialScore) {
    const inputContainer = this.createElement(
      'div',
      ['golfHole'],
      `golfHole-${holeNumber}`,
    );

    this.scoreCard.appendChild(inputContainer);

    const buttonsContainer = this.createElement(
      'span',
      ['golfHole-buttonContainer'],
      null,
    );

    inputContainer.appendChild(buttonsContainer);

    // Indicator of hole number;
    const golfHoleIndicator = this.createElement('p', [
      'golfHole-indicator',
    ]);
    golfHoleIndicator.setAttribute('data-holeIndicator', holeNumber);
    golfHoleIndicator.innerHTML = holeNumber;
    buttonsContainer.appendChild(golfHoleIndicator);

    // Decrease button;
    const decreaseButton = this.createElement('button', [
      'btn',
      'btn-danger',
      'buttonDecrease',
    ]);
    decreaseButton.textContent = '-';
    decreaseButton.disabled = initialScore > 0 ? false : true;
    decreaseButton.setAttribute('data-decrease', holeNumber);
    buttonsContainer.appendChild(decreaseButton);

    // Input field;
    const inputField = this.createElement(
      'input',
      ['holeInput'],
      null,
    );
    inputField.setAttribute('name', `golfHole-${holeNumber}`);
    inputField.disabled = true;
    inputField.value = initialScore || 0;
    buttonsContainer.appendChild(inputField);

    // Increase button;
    const plusButton = this.createElement(
      'button',
      ['btn', 'btn-primary', 'buttonIncrease'],
      null,
    );
    plusButton.setAttribute('data-increase', holeNumber);
    plusButton.textContent = '+';
    buttonsContainer.appendChild(plusButton);
    this.scoreCard.appendChild(inputContainer);
  }

  //Functions to directly force update UI;
  updatePlayerNameLabel(playerName) {
    const label = this.getElement('#playerName');
    label.textContent = playerName;
  }

  updateScore(newScore, averageScore) {
    const label = this.getElement('#totalScore');
    label.innerHTML = `
    <span class="totalScore-label">Total score:</span>
    <span class="totalScore-value totalScore-value--fixedWidth"> ${
      newScore || 0
    } </span>
    <span class="totalScore-label">Estimated prize:</span> 
    <span class="totalScore-value"> ${generatePrizeEmoji(
      averageScore || 0,
    )}</span>
    ${`<span class="totalScore-label hideOnSmall">Average per hole:</span><span class="totalScore-label totalScore-label--fixedWidth hideOnSmall"> ${
      averageScore > 0 ? averageScore.toFixed(1) : '❓'
    } </span>`}`;
  }

  setRestoreTitle(title) {
    this.restoreGameButton.setAttribute('title', title);
  }

  updateHoleCount = (holeNumber, newValue) => {
    const inputElement = this.getElement(
      `input[name="golfHole-${holeNumber}"]`,
    );
    inputElement.value = newValue;
  };

  toggleDisableDecrementButton = (disable, holeNumber) => {
    const decreaseButton = this.getElement(
      `.buttonDecrease[data-decrease="${holeNumber}"]`,
    );
    if (decreaseButton.disabled !== disable)
      decreaseButton.disabled = disable;
  };

  // TODO: Consider if there is a better way to clear the scorecard;
  clearScoreCard = () => {
    this.scoreCard.innerHTML = '';
  };

  setGameDataInputs = (playerName, holesInput) => {
    this.playerNameInput.value = playerName || '';
    this.holesInput.value = holesInput || '';
  };

  // Focus setters;
  focusPlayerNameInput = () => {
    this.playerNameInput.focus();
  };

  // Data binding;
  listenHolesInput = (callBack) => {
    this.holesInput.addEventListener('input', (e) => {
      const value = +e.target.value;
      callBack(value);
    });
  };

  listenPlayerNameInput = (callBack) => {
    this.playerNameInput.addEventListener('input', (e) => {
      const value = e.target.value;
      callBack(value);
    });
  };

  listenStartGameClicked = (callBack) => {
    this.startGameButton.addEventListener('click', (e) => {
      if (callBack) callBack();
    });
  };

  listenRestoreGameClicked = (callBack) => {
    this.restoreGameButton.addEventListener('click', (e) => {
      if (callBack) callBack();
    });
  };

  listenIncrease = (holeNumber, callBack) => {
    const increaseButton = this.getElement(
      `.buttonIncrease[data-increase="${holeNumber}"]`,
    );
    increaseButton?.addEventListener('click', () => {
      callBack(holeNumber);
    });
  };

  listenDecrease = (holeNumber, callBack) => {
    const decreaseButton = this.getElement(
      `.buttonDecrease[data-decrease="${holeNumber}"]`,
    );
    decreaseButton?.addEventListener('click', () => {
      callBack(holeNumber);
    });
  };

  listenBeginReset = (callBack) => {
    this.beginReset.addEventListener('click', () => {
      if (callBack) callBack();
    });
  };

  // Helpers for conditional rendering of UI;
  toggleStartGameButton = (show) => {
    this.startGameButton.disabled = show;
  };

  toggleRestoreGameButton = () => {
    this.restoreGameButton.classList.toggle('hideElement');
  };

  toggleGameView = (showRestoreButton) => {
    this.gameData.classList.toggle('hideElement');
    this.gameDataInput.classList.toggle('hideElement');
    if (showRestoreButton) this.toggleRestoreGameButton();
  };
}
