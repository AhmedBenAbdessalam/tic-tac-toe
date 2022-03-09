const Score = (() => {
  const playerScoreDom = document.querySelector("#player-score");
  const cpuScoreDom = document.querySelector("#cpu-score");
  let playerScore = 0;
  let cpuScore = 0;
  function playerWin() {
    playerScore++;
    playerScoreDom.textContent = playerScore;
  }
  function cpuWin() {
    cpuScore++;
    cpuScoreDom.textContent = cpuScore;
  }
  return { playerWin, cpuWin };
})();

events.on("playerWin", Score.playerWin);
events.on("cpuWin", Score.cpuWin);
