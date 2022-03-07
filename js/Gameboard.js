const Gameboard = (() => {
  let difficulty;
  let cpuMark;
  let playing = false;
  let legalMoves = [];
  const mainGrid = document.querySelector("main");
  let cells = [];
  function init(human) {
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
    return false;
  }
  function updateBoard(player, position) {
    if (isLegalMove(position)) {
      placeMark(player.mark, position);
      //check if win
      playing != isWinningMove(player.mark, position);
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
    // out of moves
    if (legalMoves.length === 0) {
      playing = false;
    }
    //check if gameover
    playing != isWinningMove(cpuMark, position);
  }
  function changeDifficulty(diff) {
    this.difficulty = diff;
  }
  return { init, updateBoard, displayBoard, getTurn, playCpu };
})();
