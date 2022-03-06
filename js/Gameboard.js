const Gameboard = (() => {
  const mainGrid = document.querySelector("main");
  let cells = [];
  function init() {
    for (let i = 0; i < 3; i++) {
      cells.push([]);
      for (let j = 0; j < 3; j++) {
        //add div to main
        let cell = document.createElement("div");
        cell.classList.add("cell");
        mainGrid.append(cell);
        cells[i].push({ content: "", node: cell });
      }
    }
  }
  function isLegalMove(mark, position) {
    if (
      cells.length > position.i &&
      position.i >= 0 &&
      cells.length > position.j &&
      position.j >= 0
    ) {
      if (cells[position.i][position.j].content === "") {
        return true;
      } else {
        console.log("position already marked");
        return false;
      }
    } else {
      console.log("position out of bound");
      return false;
    }
  }
  function isWinningMove(mark, position) {
    return false;
  }
  function updateBoard(mark, position) {
    if (isLegalMove(mark, position)) {
      cells[position.i][position.j].content = mark;

      //add img with mark to the cell
      let img = document.createElement("img");
      if (mark == "X") img.src = "./../assets/x.svg";
      else img.src = "./../assets/circle.svg";
      cells[position.i][position.j].node.append(img);
      //check if win
      isWinningMove(mark, position);
      return true;
    }
    return false;
  }
  function displayBoard() {
    console.log(cells);
  }
  return { init, updateBoard, displayBoard };
})();
