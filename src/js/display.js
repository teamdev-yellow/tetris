const mainMenu = document.getElementById("main-menu");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over");

export function showMainScreen() {
  gameScreen.classList.add("hide");
  gameOverScreen.classList.add("hide");
  mainMenu.classList.remove("hide");
}

export function showGameScreen() {
  gameScreen.classList.remove("hide");
  mainMenu.classList.add("hide");
}

export function showGameOverScreen(score, level) {
  gameScreen.classList.add("hide");
  mainMenu.classList.add("hide");
  gameOverScreen.classList.remove("hide");
  gameOverScreen.style.display = "flex";
  document.getElementById("final-score").innerText = score;
  document.getElementById("final-level").innerText = level;
}
