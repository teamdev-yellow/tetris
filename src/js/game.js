import { showGameScreen, showMainScreen, showGameOverScreen} from "./display.js";
import {
  currMino,
  createTetrimino,
  setCurrMino,
  setNextMino,
  run,
  resetTetrimino,
} from "./tetrimino.js";
import { setHomeBtnListner, setStartBtnListner, initUserInput } from "./controls.js";
import { generateBoard, cleanPlayGround, blocks } from "./playground.js";
import { initScore, getFallSpeed, score, level } from "./score.js";

let timerId;

// (仮のゲーム開始関数)
export function init() {
  setStartBtnListner(true);
  generateBoard();
  createTetrimino();
  setNextMino();
  setCurrMino();
  setNextMino();
}

export function startGame() {
  init();
  showGameScreen();
  initUserInput(true);
  setHomeBtnListner(true);
  setStartBtnListner(false);
  initScore();
  startTimer();
}

function startTimer() {
  clearInterval(timerId);
  timerId = setInterval(run, getFallSpeed());
}

function quit(){
    restore();
    cleanPlayGround();
    initUserInput(false);
    setHomeBtnListner(false);
    setStartBtnListner(true);
    //音楽の停止
}

function restore() {
  clearInterval(timerId);
  timerId = null;
  resetTetrimino();
  initScore();
}

export function backMenu() {
  quit();
  showMainScreen();
}

export function gameOver() {
  if (
    currMino.shape.some((index) =>
      blocks[currMino.position + index].classList.contains("taken")
    )
  ) {
    clearInterval(timerId);
    showGameOverScreen(score, level);
  }
}

export function pause(){
    clearInterval(timerId);
}
