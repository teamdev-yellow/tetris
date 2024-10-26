import {generateBoard, showGameScreen} from './display.js';
import { currMino, nextMino, column, tetoriminoList, tetriminoes, createTetromino, setCurrMino, setNextMino, draw, undraw, moveDown, moveLeft, moveRight, control} from './tetrimino.js';

let gameScore = 0;
let speed = 0;

// (仮のイベントリスナー)
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keyup', control);
})

// (仮のゲーム開始関数)
export function init(){
    generateBoard();
    createTetromino();
    setNextMino();
    setCurrMino();
    setNextMino();
}

export function startGame(){
    showGameScreen();
}

// pause game

// resume game

// quit game

// back menu

// update score

// increase speed




