const Player = (mark) => {
  function play(position) {
    Gameboard.updateBoard(this, position);
  }
  function setMark(mark) {
    this.mark = mark;
  }
  return { mark, play, setMark };
};
