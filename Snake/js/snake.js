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
