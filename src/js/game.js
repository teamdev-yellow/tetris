import {showGameScreen, showMainScreen} from './display.js';
import { currMino, nextMino, tetoriminoList, tetriminoes, createTetrimino, setCurrMino, setNextMino, draw, undraw, run, moveLeft, moveRight, control, resetTetrimino} from './tetrimino.js';
import {setHomeBtnListner, setStartBtnListner} from './controls.js';
import {generateBoard, cleanPlayGround, blocks} from './playground.js';
import {initScore} from './score.js';

let gameScore = 0;
let speed = 0;
let timerId;

// (仮のイベントリスナー)
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keyup', control);
})

// (仮のゲーム開始関数)
export function init(){
    setStartBtnListner(true);
    generateBoard();
    createTetrimino();
    setNextMino();
    setCurrMino();
    setNextMino();
}

export function startGame(){
    init();
    showGameScreen();
    setHomeBtnListner(true);
    setStartBtnListner(false);
    timerId = setInterval(run, 1000);
}

// quit game
function quit(){
    restore();
    cleanPlayGround();
    setHomeBtnListner(false);
    setStartBtnListner(true)
    //音楽の停止
}

function restore(){
    clearInterval(timerId);
    timerId = null;
    resetTetrimino();
    // スコアの初期化
    initScore();
}

// back menu
export function backMenu() {
    quit();
    showMainScreen();
}

export function gameOver(){
    if(currMino.shape.some(index => blocks[currMino.position + index].classList.contains('taken'))){
        clearInterval(timerId);
    }
}

// pause game

// resume game

// update score

// increase speed




