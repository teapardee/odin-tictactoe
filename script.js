// Player Factory

const createPlayer = (position, name, marker) => {
  return { position, name, marker };
};

// Gameboard Module

var gameBoard = (function () {
  //Cache DOM
  const gameContainer = document.querySelector('.game-screen');

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

  function render() {
    for (i = 0; i < 9; i++) {
      var currentTile = document.querySelector(`[data-index-number='${i}`);
      currentTile.innerHTML = `${game[i]}`;
      currentTile.style.backgroundColor = 'grey';
    }
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

  function resetGameBoard() {
    game = [];
    for (i = 0; i < 9; i++) {
      game[i] = ' ';
    }
    render();
  }

  return {
    updatePosition,
    checkTile,
    reducePositions,
    render,
    renderWinner,
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

  function _checkForTie() {
    for (i = 0; i < 9; i++) {
      if (gameBoard.checkTile(i) === true) {
        return;
      }
    }
    displayController.announceWinner();
  }

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
      _checkForTie();
      _toggleTurn();
    } else {
    }
  }
  return { tileSelection, stopGame, resetGameController };
})();

// Display Controller

var displayController = (function () {
  let playerOne;
  let playerTwo;

  //Cache DOM
  const setupScreen = document.querySelector('.setup-screen');
  const winnerScreen = document.querySelector('.winner-screen');
  const resetBtn = document.getElementById('reset-btn');
  const replayBtn = document.getElementById('replay-btn');
  const beginBtn = document.getElementById('begin-btn');
  const setupTitle = document.getElementById('setup-title');
  const changeTeam = document.getElementById('change-team');
  const p1x = document.getElementById('p1x');
  const p1o = document.getElementById('p1o');
  const p2x = document.getElementById('p2x');
  const p2o = document.getElementById('p2o');

  _init();

  function _init() {
    resetBtn.addEventListener('click', fullReset);
    replayBtn.addEventListener('click', fullReset);
    beginBtn.addEventListener('click', _submitSetup);
    p1x.addEventListener('click', (e) => {
      return _markerSelection(e);
    });
    p1o.addEventListener('click', (e) => {
      return _markerSelection(e);
    });
    p2x.addEventListener('click', (e) => {
      return _markerSelection(e);
    });
    p2o.addEventListener('click', (e) => {
      return _markerSelection(e);
    });
    changeTeam.addEventListener('click', () => {
      window.location.reload();
    });
  }

  function _markerSelection(e) {
    let target = e.currentTarget.getAttribute('id');
    switch (target) {
      case 'p1x':
      case 'p2o':
        p1x.className = 'tiles selected';
        p2o.className = 'tiles selected';
        p1o.className = 'tiles unselected';
        p2x.className = 'tiles unselected';
        playerOne = 'X';
        playerTwo = 'O';
        break;
      case 'p1o':
      case 'p2x':
        p1o.className = 'tiles selected';
        p2x.className = 'tiles selected';
        p1x.className = 'tiles unselected';
        p2o.className = 'tiles unselected';
        playerOne = 'O';
        playerTwo = 'X';
        break;
    }
  }

  function _submitSetup() {
    if (playerOne !== undefined) {
      player1 = createPlayer(1, 'testName1', playerOne);
      player2 = createPlayer(2, 'testName2', playerTwo);
      setupScreen.classList.add('inactive');
      resetBtn.style.display = 'flex';
    } else {
      setupTitle.style.color = 'red';
    }
  }

  function announceWinner() {
    resetBtn.style.display = 'none';
    setTimeout(function () {
      winnerScreen.classList.remove('inactive');
    }, 500);
  }

  function fullReset() {
    winnerScreen.classList.add('inactive');
    resetBtn.style.display = 'flex';
    gameController.resetGameController();
    gameBoard.resetGameBoard();
  }

  return {
    announceWinner,
    fullReset,
  };
})();
