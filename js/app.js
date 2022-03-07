const human = Player("X");
Gameboard.init(human);
const xButton = document.querySelector("#x-button");
xButton.addEventListener("click", () => {
  if (human.mark !== "X") {
    human.setMark("X");
    Gameboard.init(human);
  }
});
const oButton = document.querySelector("#o-button");
oButton.addEventListener("click", () => {
  if (human.mark !== "O") {
    human.setMark("O");
    Gameboard.init(human);
  }
});
