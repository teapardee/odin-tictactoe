// Player Factory

const createPlayer = (position, name, marker) => {
  return { position, name, marker };
};

// Gameboard Module

var gameBoard = (function () {
  //Cache DOM
  const gameContainer = document.getElementById('game-screen');

  //Initialize variables & gameboard
  var game = [];

  _init();

  function _init() {
    playerOneTurn = true;
    //Create Tiles
    for (i = 0; i < 9; i++) {
      game.push(' ');
      var gameTile = document.createElement('div');
      gameTile.className = 'tiles';
      gameTile.dataset.indexNumber = i;
      gameTile.addEventListener('click', (e) => {
        return gameController.tileSelection(e);
      });
      gameContainer.appendChild(gameTile);
    }
  }

  function updatePosition(index, marker) {
    game[index] = marker;
    render();
  }

  function checkTile(indexNumber) {
    let tileValue = game[indexNumber];
    return tileValue === ' ' ? true : false;
  }

  // Create an array of index positions for a given marker
  function reducePositions(inputMarker) {
    let m = inputMarker;
    return game.reduce(function (acc, curr, index, marker) {
      if (curr === m) {
        acc.push(index);
      }
      return acc;
    }, []);
  }

  function renderWinner(args) {
    const newArr = args;
    for (i = 0; i < newArr.length; i++) {
      var currentTile = document.querySelector(
        `[data-index-number='${newArr[i]}`
      );
      currentTile.style.backgroundColor = 'rgba(0, 128, 0, 0.7)';
    }
  }

  function render() {
    for (i = 0; i < 9; i++) {
      var currentTile = document.querySelector(`[data-index-number='${i}`);
      currentTile.innerHTML = `${game[i]}`;
      currentTile.style.backgroundColor = 'grey';
    }
  }

  function resetGameBoard() {
    game = [];
    for (i = 0; i < 9; i++) {
      game[i] = ' ';
    }
    render();
  }

  return {
    render,
    renderWinner,
    updatePosition,
    checkTile,
    reducePositions,
    resetGameBoard,
  };
})();

// Controls Flow of Game

var gameController = (function () {
  //Initialize Variables

  let playerOneTurn = '';
  let winnerDeclared = false;

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function _toggleTurn() {
    playerOneTurn = !playerOneTurn;
  }

  function _checkForWinner(activeMarker) {
    let markerPositions = gameBoard.reducePositions(activeMarker);

    //Compare winning combos array to active player's positions
    for (var i = 0; i < winningCombos.length; i++) {
      if (winningCombos[i].every((r) => markerPositions.includes(r))) {
        gameBoard.renderWinner(winningCombos[i]);
        displayController.announceWinner();
        stopGame();
      }
    }
  }

  // function _checkForTie() {
  //   for(i=0;i<9,i++){

  //   }
  // }

  function stopGame() {
    winnerDeclared = true;
  }

  function resetGameController() {
    playerOneTurn = '';
    winnerDeclared = false;
  }

  function tileSelection(e) {
    let indexNumber = e.currentTarget.getAttribute('data-index-number');
    if (gameBoard.checkTile(indexNumber) === true && winnerDeclared === false) {
      if (playerOneTurn === true) {
        gameBoard.updatePosition(indexNumber, 'X');
        _checkForWinner('X');
      } else {
        gameBoard.updatePosition(indexNumber, 'O');
        _checkForWinner('O');
      }
      _toggleTurn();
    } else {
    }
  }
  return { tileSelection, stopGame, resetGameController };
})();

// Display Controller

var displayController = (function () {
  //Intialize Variables
  let showWinnerScreen = false;

  //Cache DOM
  const winnerScreen = document.getElementById('winner-screen');
  const resetBtn = document.getElementById('reset-btn');
  const replayBtn = document.getElementById('replay-btn');

  _init();

  function _init() {
    resetBtn.addEventListener('click', fullReset);
    replayBtn.addEventListener('click', fullReset);
  }

  function _toggleWinnerScreen() {
    showWinnerScreen = !showWinnerScreen;

    if (showWinnerScreen === true) {
      winnerScreen.style.display = 'flex';
    } else {
      winnerScreen.style.display = 'none';
    }
  }

  function announceWinner() {
    winnerScreen.style.display = 'flex';
    resetBtn.style.display = 'none';
  }

  function fullReset() {
    winnerScreen.style.display = 'none';
    resetBtn.style.display = 'flex';
    gameController.resetGameController();
    gameBoard.resetGameBoard();
  }

  return {
    fullReset,
    announceWinner,
  };
})();
