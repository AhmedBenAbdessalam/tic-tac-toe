const Player = (name, mark) => {
  function play(position) {
    Gameboard.updateBoard(mark, position);
  }
  return { name, mark, play };
};
