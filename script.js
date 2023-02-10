// Player Factory

const createPlayer = (position, name, marker) => {
  return { position, name, marker };
};

// Gameboard Module

var gameBoard = (function () {
  //cache DOM & create tiles
  const gameContainer = document.getElementById('game-container');

  _init();

  //player selections
  var selection = ['X', 'O', '', 'X', '', '', 'O', 'X', 'O'];

  function _init() {
    for (i = 0; i < 9; i++) {
      var gameTile = document.createElement('div');
      gameTile.className = 'tiles';
      gameTile.dataset.indexNumber = i;
      gameTile.addEventListener('click', tileSelection);
      gameContainer.appendChild(gameTile);
    }
  }

  function _render() {
    for (i = 0; i < 9; i++) {
      var currentTile = document.querySelector(`[data-index-number='${i}`);
      currentTile.innerHTML = `${selection[i]}`;
    }
  }

  function tileSelection() {
    console.log('future function');
    _render();
  }

  return {
    tileSelection: tileSelection,
  };
})();

// Controls Flow of Game

var gameFlow = (function () {
  console.log('furture game flow');
})();
