const View = require ('./ttt-view.js');
const Game = require ('./game.js');

$( () => {
  let game = new Game();
  let $board = $(".ttt");
  let view = new View(game, $board);
  view.setupBoard();
  view.bindEvents();
});
