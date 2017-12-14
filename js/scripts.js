function Player(type) {
  this.type = type;
}

function Space(x, y) {
  this.x = x;
  this.y = y;
  this.marked = "";
  this.score = 0;
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

Board.prototype.checkScore = function() {
  for (var i=0; i< 3; i++) {
    if ((this.spaces[i].score + this.spaces[i + 3].score + this.spaces[i + 6].score === 3 || this.spaces[i].score + this.spaces[i + 3].score + this.spaces[i + 6].score === -3)) {
      return this.spaces[i].marked;
    } else if ((this.spaces[i*3].score + this.spaces[i*3 + 1].score + this.spaces[i*3 + 2].score === 3 || this.spaces[i*3].score + this.spaces[i*3 + 1].score + this.spaces[i*3 + 2].score === -3)) {
      return this.spaces[i*3].marked;
    } else {
    }
  }

  if ((this.spaces[0].score + this.spaces[4].score + this.spaces[8].score === 3) || (this.spaces[0].score + this.spaces[4].score + this.spaces[8].score === -3)) {
    return this.spaces[0].marked;
  } else if ((this.spaces[2].score + this.spaces[4].score + this.spaces[6].score === 3) || (this.spaces[2].score + this.spaces[4].score + this.spaces[6].score === -3)) {
    return this.spaces[2].marked;
  } else {
  }
  return "no";
}

var markedValue = function(checkedValue) {
  if (checkedValue === "X") {
    return -1;
  } else if (checkedValue === "O") {
    return 1;
  } else {
    return 0;
  }
}

$(document).ready(function() {
  // debugger;
  $("#new-game").hide();
  // $("#next-turn").show();

  var player = new Player("X");
  newBoard = new Board();
  newBoard.makeSpaces();
  var str = "";

  $("#next-turn").click(function() {
    if ($("td").hasClass("temp") === false) {
    } else {
      $("td.temp").addClass(player.type);
      var spaceNumber = $("td.temp").attr('id');
      newBoard.spaces[spaceNumber].marked = player.type;
      newBoard.spaces[spaceNumber].score = markedValue(player.type);
      str = newBoard.checkScore();
      if (str !== "no") {
        $("#new-game").show();
        $("#next-turn").hide();
        if (player.type === "X") {
          $("#gameField").hide();
          $("#result").append('<img src="img/fx.png" alt="X" class="responsive-img">');
          $(".result").show();
        } else {
          $("#gameField").hide();
          $("#result").append('<img src="img/fo.png" alt="O" class="responsive-img">');
          $(".result").show();
        }

      }
      $("td.temp").removeClass("temp");
      if (player.type === "X") {
        player.type = "O";
      }
      else {
        player.type = "X"
      }
    }
  });

  $("td").click(function() {
    if ($(this).hasClass("X") || $(this).hasClass("O")) {
    }
    else {
      $(".temp").empty();
      $("td.temp").removeClass("temp");
      $(this).toggleClass("temp");
      // $(this).append(player.type);
      if (player.type === "X") {
        $(this).append('<img src="img/fx.png" alt="X" class="responsive-img">');
      } else if (player.type === "O") {
        $(this).append('<img src="img/fo.png" alt="O" class="responsive-img">');
      }
    }
  });
})
