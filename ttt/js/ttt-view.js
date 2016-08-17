var View = function (game, $el) {
  this.$el = $el;
  this.game = game;
};

View.prototype.mapCoords = function (index) {
  return ([Math.floor(index / 3), index % 3]);
};

View.prototype.bindEvents = function () {
  let $boxes = this.$el.children().children();
  $boxes.each( (idx,box) => {
    let $box = $(box);
    $box.on("click", event => {
      let coords = this.mapCoords(idx);
      if (this.game.isOver()) {
        return;
      }
      if (!this.game.board.isEmptyPos(coords)) {
        alert("invalid move");
        return;
      }
      this.game.playMove(coords);

      this.makeMove($box, coords);
      if (this.game.isOver()) {
        if (this.game.winner()) {
          let $message = $(`<h1>${this.game.winner()} has won!</h1>`);
          this.$el.css("text-align", "center");
          $('body').append($message);
        } else {
          let $message = $(`<h1>you both suck</h1>`);
          $message.css("text-align", "center");
          $('body').append($message);      }
      }
    });
  });
};

View.prototype.makeMove = function ($square, coords) {
  $square.addClass(this.game.board.grid[coords[0]][coords[1]]);
};

View.prototype.setupBoard = function () {
  this.$el.append("<ul></ul>");
  for (var i = 0; i < 9; i++) {
    this.$el.children().append("<li></li>");
  }
};

module.exports = View;
