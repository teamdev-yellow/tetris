const mainMenu = document.getElementById("main-menu");
const gameScreen = document.getElementById("game-screen");

export function showMainScreen() {
  gameScreen.classList.add("hide");
  mainMenu.classList.remove("hide");
}

export function showGameScreen() {
  gameScreen.classList.remove("hide");
  mainMenu.classList.add("hide");
}
