// Player Factory

const createPlayer = (position, name, marker) => {
  return { position, name, marker };
};

// Gameboard Module

var gameBoard = (function () {
  //cache DOM & create tiles
  const gameContainer = document.getElementById('game-container');
  let playerOneTurn = '';
  const game = [];
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 5, 6],
  ];

  _init();

  function _init() {
    playerOneTurn = true;
    for (i = 0; i < 9; i++) {
      game.push(' ');
      var gameTile = document.createElement('div');
      gameTile.className = 'tiles';
      gameTile.dataset.indexNumber = i;
      gameTile.addEventListener('click', tileSelection);
      gameContainer.appendChild(gameTile);
    }
  }

  function _togglePlayer() {
    playerOneTurn = !playerOneTurn;
  }

  function _checkTile(indexNumber) {
    let tileValue = game[indexNumber];
    return tileValue === ' ' ? true : false;
  }

  function tileSelection(e) {
    let indexNumber = e.currentTarget.getAttribute('data-index-number');

    if (_checkTile(indexNumber) === true) {
      if (playerOneTurn === true) {
        game[indexNumber] = 'X';
        _checkForWinner('X');
      } else {
        game[indexNumber] = 'O';
        _checkForWinner('O');
      }
      _togglePlayer();
      render();
    }
  }

  function _retrieveMarkerPositions(inputMarker) {
    let m = inputMarker;
    return game.reduce(function (acc, curr, index, marker) {
      if (curr === m) {
        acc.push(index);
      }
      return acc;
    }, []);
  }

  function _checkForWinner(activeMarker) {
    // retrieve array of active player's positions
    let markerPositions = _retrieveMarkerPositions(activeMarker);

    //compare winning combos to active player's positions
    for (var i = 0; i < winningCombos.length; i++) {
      if (winningCombos[i].every((r) => markerPositions.includes(r))) {
        _renderWinner(winningCombos[i]);
      }
    }
  }

  function _renderWinner(args) {
    const newArr = args;
    console.log(newArr);
    for (i = 0; i < newArr.length; i++) {
      var currentTile = document.querySelector(
        `[data-index-number='${newArr[i]}`
      );
      currentTile.style.backgroundColor = 'green';
    }
  }

  function render() {
    for (i = 0; i < 9; i++) {
      var currentTile = document.querySelector(`[data-index-number='${i}`);
      currentTile.innerHTML = `${game[i]}`;
    }
  }

  function resetBoard() {
    console.log('future function');
    game = [];
    render();
  }

  return {
    render,
    resetBoard,
  };
})();

// Controls Flow of Game

var gameController = (function () {
  console.log('future game flow');

  return {};
})();
