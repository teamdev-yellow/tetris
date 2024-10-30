import { backMenu, startGame } from "./game.js";
import { rotate, moveLeft, moveRight, run, hardDrop } from './tetrimino.js';
import { sounds, playAudio, soundsLoaded } from './audio.js';

const startBtn = document.getElementById("start-btn");
const homeBtn = document.getElementById("home-icon");
const replayBtn = document.getElementById("replay-btn");
const quitBtn = document.getElementById("quit-btn");

export function setHomeBtnListner(bool) {
  homeBtn.removeEventListener("click", backMenu);
  if (bool) {
    homeBtn.addEventListener("click", backMenu);
  }
}

export function setStartBtnListner(bool) {
  startBtn.removeEventListener("click", startGame);
  if (bool && soundsLoaded) {
    startBtn.addEventListener("click", () => {
        startGame();
        playAudio(sounds.click);
    });
  }}

export function setReplayBtnListener(bool) {
    replayBtn.removeEventListener('click', startGame);
    if (bool) {
        replayBtn.addEventListener('click', () => {
            console.log('replay');
            startGame();
        });
    }
}

export function setQuitBtnListener(bool) {
    quitBtn.removeEventListener('click', backMenu);
    if (bool) {
        quitBtn.addEventListener('click', () => {
            backMenu();
        });
    }
}

export function initUserInput(bool){
    document.removeEventListener('keydown', control);
    if(bool){
        document.addEventListener('keydown', control);
    }
    
}

function control(e){
    if(e.key === 'ArrowLeft'){
        moveLeft();
    } else if (e.key === 'ArrowRight'){
        moveRight();
    } else if (e.key === 'ArrowUp'){
        rotate();
    } else if (e.key === 'ArrowDown'){
        run();
    } else if (e.key === ' '){
        hardDrop();
    }
}

