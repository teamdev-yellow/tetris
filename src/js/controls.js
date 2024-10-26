import {backMenu, startGame, init} from './game.js';

const startBtn = document.getElementById("start-btn");
const homeBtn = document.getElementById("home-icon");

export function setHomeBtnListner(bool){
    homeBtn.removeEventListener('click', backMenu); // 既存リスナーを一旦解除
    if(bool){
        homeBtn.addEventListener('click', backMenu);
    }
}

export function setStartBtnListner(bool){
    startBtn.removeEventListener('click', startGame); // 既存リスナーを一旦解除
    if(bool){
        startBtn.addEventListener('click', startGame);
    }
}

