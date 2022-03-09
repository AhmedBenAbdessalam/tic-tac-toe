const Gameboard = (() => {
  let difficulty;
  let cpuMark;
  let player;
  let playing = false;
  let legalMoves = [];
  const mainGrid = document.querySelector("main");
  let cells = [];
  function init(human) {
    player = human;
    getDifficulty();
    //clear canvas
    mainGrid.textContent = "";
    cells = [];
    for (let i = 0; i < 3; i++) {
      cells.push([]);
      for (let j = 0; j < 3; j++) {
        //add a cell div to main
        legalMoves.push({ i, j });
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener(
          "click",
          (() => {
            if (playing) {
              human.play({ i, j });
            }
          }).bind(this)
        );
        mainGrid.append(cell);
        cells[i].push({ content: "", node: cell });
      }
    }

    playing = true;
    if (human.mark === "X") {
      cpuMark = "O";
    } else {
      cpuMark = "X";
      playCpu();
    }
  }
  function getDifficulty() {
    const difficultySelect = document.querySelector("#cpu-difficulty");
    difficulty = difficultySelect.value;
  }
  function isLegalMove(position) {
    return legalMoves.some((move) => {
      return move.i === position.i && move.j === position.j;
    });
  }
  function isWinningMove(mark, position) {
    //horizontal
    if (
      cells[0][position.j].content !== "" &&
      cells[0][position.j].content === cells[1][position.j].content &&
      cells[0][position.j].content === cells[2][position.j].content
    ) {
      if (mark === player.mark) {
        alert("You win!");
        events.emit("playerWin");
      } else {
        alert("You lose!");
        events.emit("cpuWin");
      }
      return true;
    }
    //vertical
    else if (
      cells[position.i][0].content !== "" &&
      cells[position.i][0].content === cells[position.i][1].content &&
      cells[position.i][0].content === cells[position.i][2].content
    ) {
      if (mark === player.mark) {
        alert("You win!");
        events.emit("playerWin");
      } else {
        alert("You lose!");
        events.emit("cpuWin");
      }
      return true;
    }
    //diagonal
    else if (
      (cells[0][0].content !== "" &&
        cells[0][0].content === cells[1][1].content &&
        cells[0][0].content === cells[2][2].content) ||
      (cells[0][2].content !== "" &&
        cells[0][2].content === cells[1][1].content &&
        cells[0][2].content === cells[2][0].content)
    ) {
      if (mark === player.mark) {
        alert("You win!");
        events.emit("playerWin");
      } else {
        alert("You lose!");
        events.emit("CpuWin");
      }
      return true;
    }

    return false;
  }
  function updateBoard(player, position) {
    if (isLegalMove(position)) {
      placeMark(player.mark, position);
      playCpu();

      return true;
    }
    return false;
  }
  function displayBoard() {
    console.log(cells);
  }
  function getTurn() {
    return turn;
  }

  function playCpu() {
    if (playing) {
      let pos;
      let i;
      switch (difficulty) {
        case "easy":
          i = Math.floor(Math.random() * legalMoves.length);
          pos = legalMoves[i];
          break;
        case "medium":
          i = Math.floor(Math.random() * legalMoves.length);
          pos = legalMoves[i];
          break;
        case "hard":
          i = Math.floor(Math.random() * legalMoves.length);
          pos = legalMoves[i];
          break;
        case "impossible":
          i = Math.floor(Math.random() * legalMoves.length);
          pos = legalMoves[i];
          break;
        default:
          i = Math.floor(Math.random() * legalMoves.length);
          pos = legalMoves[i];
      }
      placeMark(cpuMark, pos);
    }
  }
  function placeMark(mark, position) {
    cells[position.i][position.j].content = mark;

    //add img with mark to the cell
    let img = document.createElement("img");
    if (mark == "X") img.src = "./../assets/x.svg";
    else img.src = "./../assets/circle.svg";
    cells[position.i][position.j].node.append(img);
    //remove it from legal moves
    legalMoves = legalMoves.filter((move) => {
      return move.i != position.i || move.j != position.j;
    });
    //check if gameover
    playing = !isWinningMove(mark, position);
    // out of moves
    if (playing && legalMoves.length === 0) {
      playing = false;
      alert("It's a draw!");
    }
  }
  function changeDifficulty(diff) {
    this.difficulty = diff;
  }
  return { init, updateBoard, displayBoard, getTurn, playCpu };
})();
