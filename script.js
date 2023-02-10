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
      } else {
        game[indexNumber] = 'O';
      }
      _togglePlayer();
      render();
    }
  }

  function render() {
    for (i = 0; i < 9; i++) {
      var currentTile = document.querySelector(`[data-index-number='${i}`);
      currentTile.innerHTML = `${game[i]}`;
    }
    console.log(game);
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
