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
    });
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

  function startGuessing() {
    Array.prototype.forEach.call(cells, function(cell, i) {
      window.guess[i] = 0;
      cell.classList.remove('one');
      cell.classList.add('zero');
    });
    mode = MODE_GUESS;
  }

  function initialize() {
    mode = MODE_LOOK;
    Array.prototype.forEach.call(cells, function(cell, i) {
      cell.setAttribute("board_cell", i);
      window.guess[i] = 0;
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

});