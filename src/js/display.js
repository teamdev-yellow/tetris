const mainMenu = document.getElementById("main-menu");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over");

export function showMainScreen() {
  gameScreen.classList.add("hide");
  gameOverScreen.style.display = "";
  gameOverScreen.classList.add("hide");
  mainMenu.classList.remove("hide");
}

export function showGameScreen() {
  gameOverScreen.style.display = "";
  gameOverScreen.classList.add("hide");
  mainMenu.classList.add("hide");
  gameScreen.classList.remove("hide");
}

export function showGameOverScreen(score, level) {
  gameScreen.classList.add("hide");
  mainMenu.classList.add("hide");
  gameOverScreen.classList.remove("hide");
  gameOverScreen.style.display = "flex";
  document.getElementById("final-score").innerText = score;
  document.getElementById("final-level").innerText = level;
}

export function drawNextMino(nextMino) {
  const nextBlocksContainer = document.getElementById("next-blocks-container");

  // 次のミノの表示をクリア
  nextBlocksContainer.innerHTML = ""; // 以前のブロックをクリア

  // 次のミノの形を描画
  nextMino.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        // セルが filled されている場合
        const nextBlock = document.createElement("div");
        nextBlock.classList.add("next-block", nextMino.type); // 型に応じたクラスを追加
        nextBlock.style.gridRowStart = y + 1; // 行位置
        nextBlock.style.gridColumnStart = x + 1; // 列位置
        nextBlocksContainer.appendChild(nextBlock);
      }
    });
  });
}
