var View = function (game, $el) {
  this.$el = $el;
  this.game = game;
  this.setupTowers();
  this.render();
  this.clickTower();
};

View.prototype.setupTowers = function () {
  let $tower1 = $("<ul></ul>");
  let $tower2 = $("<ul></ul>");
  let $tower3 = $("<ul></ul>");
  $tower1.addClass("x0");
  this.$el.append($tower1);
  $tower2.addClass("x1");
  this.$el.append($tower2);
  $tower3.addClass("x2");
  this.$el.append($tower3);
  let $ring1 = $("<li><div></div></li>");
  let $ring2 = $("<li><div></div></li>");
  let $ring3 = $("<li><div></div></li>");
  $ring1.children().addClass("y2");
  this.$el.children().append($ring1);
  $ring2.children().addClass("y1");
  this.$el.children().append($ring2);
  $ring3.children().addClass("y0");
  this.$el.children().append($ring3);
};

View.prototype.clickTower = function () {
  let pos = [];
  let $towers = $("ul");
  $towers.on("click", (event) => {
    if (this.game.isWon()) return ;
    let $tower = $(event.currentTarget);
    if (pos.length === 2) pos = [];
    let col = parseInt($tower.attr('class').slice(1));
    pos.push(col);
    $tower.css("border-bottom","10px solid red");
    if (pos.length === 2) {
      if (this.game.isValidMove(...pos)) {
        this.game.move(...pos);
        this.render();
        if (this.game.isWon()) {
          let $message = $(`<h1>you won!</h1>`);
          this.$el.css("text-align", "center");
          $('body').append($message);
        }
      }
      else {
        alert ("Invalid move");
      }
      $towers.removeAttr('style');
    }
  });
};

View.prototype.render = function () {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      let val = this.game.towers[i][j];
      let ring = `ul.x${i} div.y${j}`;
      let $ring = $(ring);
      if (val === undefined) {
        $ring.hide();
        continue;
      }
      $ring.show();
      let size = 75 * val;
      $ring.css("width",`${size}px`);
    }
  }
};



module.exports = View;
