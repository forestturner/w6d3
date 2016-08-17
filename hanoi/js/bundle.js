/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiView = __webpack_require__ (2);
	const HanoiGame = __webpack_require__ (3);
	
	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2,1], [], []];
	  }
	
	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];
	
	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }
	
	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }
	
	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }
	
	  print() {
	      console.log(JSON.stringify(this.towers));
	  }
	
	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }
	
	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }
	
	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}
	
	module.exports = Game;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map