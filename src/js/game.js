import {
  showGameScreen,
  showMainScreen,
  showGameOverScreen,
  drawNextMino,
} from "./display.js";
import {
  currMino,
  createTetrimino,
  setCurrMino,
  setNextMino,
  run,
  resetTetrimino,
} from "./tetrimino.js";
import {
  setHomeBtnListner,
  setStartBtnListner,
  setQuitBtnListener,
  setReplayBtnListener,
  initUserInput,
} from "./controls.js";
import { generateBoard, cleanPlayGround, blocks } from "./playground.js";
import { initScore, getFallSpeed, score, level } from "./score.js";
import {
  loadSounds,
  playAudio,
  stopAudio,
  sounds,
  soundsLoaded,
} from "./audio.js";

let timerId;

export async function init() {
  await loadSounds();
  setStartBtnListner(true);
  generateBoard();
  createTetrimino();
  setNextMino();
  setCurrMino();
  setNextMino();
}

export async function startGame() {
  await init(); // 確実にサウンドがロードされた後に続行
  if (!soundsLoaded) {
    console.error("Sounds not loaded. Game cannot start.");
    return;
  }

  showGameScreen();
  playAudio(sounds.game);
  initUserInput(true);
  setHomeBtnListner(true);
  setStartBtnListner(false);
  setReplayBtnListener(false);
  setQuitBtnListener(false);
  initScore();
  startTimer();

  // 次のミノを生成し、表示
  const nextMino = createTetrimino();
  setNextMino(nextMino);
  drawNextMino(nextMino);
}

function startTimer() {
  clearInterval(timerId);
  timerId = setInterval(run, getFallSpeed());
}

function quit() {
  restore();
  cleanPlayGround();
  initUserInput(false);
  setHomeBtnListner(false);
  setStartBtnListner(true);
  setReplayBtnListener(false);
  setQuitBtnListener(false);
  stopAudio(sounds.gameover);
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
  setReplayBtnListener(false);
  setQuitBtnListener(false);
}

export function gameOver() {
  if (
    currMino.shape.some((index) =>
      blocks[currMino.position + index].classList.contains("taken")
    )
  ) {
    clearInterval(timerId);
    showGameOverScreen(score, level);
    stopAudio(sounds.game);
    playAudio(sounds.gameover);
    setReplayBtnListener(true);
    setQuitBtnListener(true);
    initUserInput(false);
    restore();
    cleanPlayGround();
  }
}

export function pause() {
  clearInterval(timerId);
}
