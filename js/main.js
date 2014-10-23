document.addEventListener('DOMContentLoaded', function() {

  var game = document.getElementById('game');
  var cells = game.querySelectorAll('.board .cell');

  // window.board = new Board();
  var SIZE = 5;
  window.shown = new Array(SIZE*SIZE);
  window.guess = new Array(SIZE*SIZE);

  var MODE_LOOK = "look", MODE_GUESS = "GUESS", mode = MODE_LOOK;

  Array.prototype.forEach.call(cells, function(cell, i) {
    cell.addEventListener('click', function(event) {
      if (mode === MODE_LOOK) {
        startGuessing();
        return;
      }
      window.guess[i] = (window.guess[i]) ? 0 : 1;
      cell.classList.toggle('one');
      cell.classList.toggle('zero');
      doesItMatch()
    }, true);
  });

  function doesItMatch() {
    var shownStr = window.shown.join(''),
        guessStr = window.guess.join('');
    console.log(shownStr);
    console.log(guessStr);
    if (shownStr === guessStr) {
      console.log("good job!");
      initialize();
    }
  }

  function giveup() {
    if (mode === MODE_LOOK) {
      return;
    }
    console.log("giveup");
    Array.prototype.forEach.call(cells, function(cell, i) {
      if (window.shown[i] === 1) {
        cell.classList.toggle('hint');
      }
    });
  }

  function startGuessing() {
    Array.prototype.forEach.call(cells, function(cell, i) {
      window.guess[i] = 0;
      cell.classList.remove('one');
      cell.classList.add('zero');
    });
    mode = MODE_GUESS;
    msg("Reconstruct bits.");
  }

  function msg(text) {
    game.querySelector('.controls .message').innerText = text;
  }

  function initialize() {
    mode = MODE_LOOK;
    msg("Try to remember bits amd click the board.");
    Array.prototype.forEach.call(cells, function(cell, i) {
      cell.setAttribute("board_cell", i);
      window.guess[i] = 0;
      cell.classList.remove('hint');
      if (Math.random() < 0.4) {
        window.shown[i] = 0;
        cell.classList.remove('one');
        cell.classList.add('zero');
      } else {
        window.shown[i] = 1;
        cell.classList.remove('zero');
        cell.classList.add('one');
      }
    });
  }

  initialize();

  document.querySelector('#restart').addEventListener('click', function() {
    initialize();
  });

  document.querySelector('#giveup').addEventListener('click', function() {
    giveup();
  });

});