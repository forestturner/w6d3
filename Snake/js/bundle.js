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

	const View = __webpack_require__ (2);
	
	$( () => {
	  let $board = $(".board");
	  let view = new View($board);
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__ (3);
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	const DIRECTIONS = ['N','E','S','W'];
	class Snake  {
	  constructor() {
	    this.direction = "N";
	    this.segments = [new Coord( [10,10] ) ];
	
	  }
	
	}
	
	Snake.prototype.turn = function (direction) {
	  let current = DIRECTIONS.indexOf(this.direction);
	  current += 2;
	  current = (current % 4);
	  if(direction === DIRECTIONS[current]) return;
	  this.direction = direction;
	};
	
	Snake.prototype.move = function () {
	  this.segments.unshift(this.segments[0].plus(this.direction));
	  this.segments.pop();
	};
	
	
	class Coord {
	  constructor(pos) {
	    this.pos = pos;
	  }
	  plus(direction) {
	    switch(direction) {
	      case "N":
	        return new Coord([this.pos[0],this.pos[1]--]);
	      case "S":
	        return new Coord([this.pos[0],this.pos[1]++]);
	      case "E":
	        return new Coord([this.pos[0]++,this.pos[1]]);
	      case "W":
	        return new Coord([this.pos[0]--,this.pos[1]]);
	      default:
	        console.log("wtf");
	    }
	  }
	}
	
	
	class Board {
	  constructor() {
	    this.snake = new Snake;
	    this.apple = this.getRandomCoord();
	   }
	   getRandomCoord() {
	     let x = Math.floor(Math.random() * 20 );
	     let y = Math.floor(Math.random() * 20 );
	     return new Coord([x,y]);
	   }
	}
	
	
	module.exports = Board;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map