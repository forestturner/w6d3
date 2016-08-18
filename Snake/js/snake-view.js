const Board = require ('./snake.js');
var View = function ($el) {
  this.$el = $el;
  this.board = new Board();
  this.setupBoard();
  this.render();
};

View.prototype.mapCoords = function (coord) {
  return coord[1] * 20 +  coord[0];
};

View.prototype.setupBoard = function () {
  this.$el.append("<ul></ul>");
  for (var i = 0; i < 400; i++) {
    this.$el.children().append("<li></li>");
  }
};

View.prototype.render = function() {

  this.board.snake.segments.forEach( (el) => {
    let i = this.mapCoords(el.pos);
    let $box = $(`li:nth-child(${i})`);
    $box.css("background","black");
  });
};

module.exports = View;
