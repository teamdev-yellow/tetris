import { backMenu, startGame } from "./game.js";
import {rotate, moveLeft, moveRight, run, hardDrop} from './tetrimino.js';

const startBtn = document.getElementById("start-btn");
const homeBtn = document.getElementById("home-icon");

export function setHomeBtnListner(bool) {
  homeBtn.removeEventListener("click", backMenu);
  if (bool) {
    homeBtn.addEventListener("click", backMenu);
  }
}

export function setStartBtnListner(bool) {
  startBtn.removeEventListener("click", startGame);
  if (bool) {
    startBtn.addEventListener("click", startGame);
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

