import { nextBlocks } from "./playground.js";
import { tetriminoes, currMino } from "./tetrimino.js";

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
  // 次のミノの表示をクリア
  currMino.shape.forEach(index => {
    if(index > 3) index -= 6;
    if (currMino.name == "o") index += 1;
    index += 4;
    nextBlocks[index].classList.remove(currMino.name);
  });

  nextMino.shape.forEach(index => {
    if(index > 3) index -= 6;
    if (nextMino.name == "o") index += 1;
    index += 4;
    nextBlocks[index].classList.add(nextMino.name);
  });
}

