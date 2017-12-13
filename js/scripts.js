function Player(type) {
  this.type = type;
}

function Space(x, y) {
  this.x = x;
  this.y = y;
  this.marked = "";
}

function Board() {
  this.spaces = [];
}

Board.prototype.makeSpaces = function() {
  for (var i=0; i<3; i++) {
    this.spaces.push(new Space(i, 0));
    this.spaces.push(new Space(i, 1));
    this.spaces.push(new Space(i, 2));
  }
}

Board.prototype.score = function() {
  for (var i=0; i< 3; i++) {
    if (this.spaces[i] === this.spaces[i + 3]) && (this.spaces[i] === this.spaces[i + 6]){
      return this.spaces[i].marked;
    }
    if (this.spaces[i*3] === this.spaces[i*3 + 1]) && (this.spaces[i*3] === this.spaces[i*3 + 2]){
      return this.spaces[i*3].marked;
    }
  }
}

$(document).ready(function() {
  // debugger;
  var player = new Player("X");
  newBoard = new Board();
  newBoard.makeSpaces();

  $("#next-turn").click(function() {
    // debugger;
    $("td.temp").addClass(player.type);
    var spaceNumber = $("td.temp").attr('id');
    newBoard.spaces[spaceNumber].marked = player.type;
    $("td.temp").removeClass("temp");
    if (player.type === "X") {
      player.type = "O";
    }
    else {
      player.type = "X"
    }

  });
  $("td").click(function() {
    if ($(this).hasClass("X") || $(this).hasClass("O")) {
    }
    else {
      $(".temp").empty();
      $("td.temp").removeClass("temp");
      $(this).toggleClass("temp");
      $(this).text(player.type);
    }
  });
})
