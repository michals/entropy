document.addEventListener('DOMContentLoaded', function() {

  var game = document.getElementById('game');
  var cells = game.querySelectorAll('.board .cell');

  // window.board = new Board();
  var SIZE = 5;
  window.board = new Array(SIZE*SIZE);

  function generate() {
    Array.prototype.forEach.call(cells, function(cell, i) {
      cell.setAttribute("board_cell", i);
      if (Math.random() < 0.4) {
        window.board[i] = 0;
        cell.classList.remove('one');
        cell.classList.add('zero');
      } else {
        window.board[i] = 1;
        cell.classList.remove('zero');
        cell.classList.add('one');
      }
      cell.addEventListener('click', function(event) {
        console.log('click ' + i);
        window.board[i] = (window.board[i]) ? 0 : 1;
        cell.classList.toggle('one');
        cell.classList.toggle('zero');
      });
    });
  }

  generate();

  document.querySelector('#restart').addEventListener('click', function() {
    generate();
  });

});