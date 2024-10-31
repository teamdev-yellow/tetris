import { blocks, cols, removeFullRows } from './playground.js';
import { gameOver } from './game.js';
import { drawNextMino } from './display.js';

export let currMino = null;
export let nextMino = {
    name: "",
    position: 4,
    rotation: 0,
    shape: []
}
export let tetoriminoList = []; // currMinoとnextMinoの後に降ってくるテトリミノのリスト

export const tetriminoes = {
    l: [
        [2, cols, cols + 1, cols + 2],
        [1, cols + 1, cols * 2 + 1, cols * 2 + 2],
        [cols, cols + 1, cols + 2, cols * 2],
        [0, 1, cols + 1, cols * 2 + 1]
    ],

    t: [
        [1, cols, cols + 1, cols + 2],
        [1, cols + 1, cols + 2, cols * 2 + 1],
        [cols, cols + 1, cols + 2, cols * 2 + 1],
        [1, cols, cols + 1, cols * 2 + 1]
    ],

    s: [
        [1, 2, cols, cols + 1],
        [1, cols + 1, cols + 2, cols * 2 + 2],
        [cols + 1, cols + 2, cols * 2, cols * 2 + 1],
        [0, cols, cols + 1, cols * 2 + 1]
    ],

    z: [
        [0, 1, cols + 1, cols + 2],
        [2, cols + 1, cols + 2, cols * 2 + 1],
        [cols, cols + 1, cols * 2 + 1, cols * 2 + 2],
        [1, cols, cols + 1, cols * 2]
    ],

    j: [
        [0, cols, cols + 1, cols + 2],
        [1, 2, cols + 1, cols * 2 + 1],
        [cols, cols + 1, cols + 2, cols * 2 + 2],
        [1, cols + 1, cols * 2, cols * 2 + 1]
    ],

    i: [
        [cols, cols + 1, cols + 2, cols + 3],
        [2, cols + 2, cols * 2 + 2, cols * 3 + 2],
        [cols * 2, cols * 2 + 1, cols * 2 + 2, cols * 2 + 3],
        [1, cols + 1, cols * 2 + 1, cols * 3 + 1]
    ],

    o: [
        [0, 1, cols,  cols + 1],
        [0, 1, cols, cols + 1],
        [0, 1, cols, cols + 1],
        [0, 1, cols, cols + 1]
    ]
}

export function resetTetrimino(){
    currMino = null;
    nextMino.name = "";
    nextMino.shape = [];
    tetoriminoList = [];
}

export function createTetrimino(){
    let newList = Object.keys(tetriminoes).sort(() => Math.random() - 0.5);
    tetoriminoList = newList.concat(tetoriminoList);
}

export function setCurrMino(){
    if (tetoriminoList.length) currMino = JSON.parse(JSON.stringify(nextMino));
} 

export function setNextMino(){
    if (tetoriminoList.length){
        nextMino.name = tetoriminoList.pop();
        nextMino.shape = tetriminoes[nextMino.name][nextMino.rotation];

        if (tetoriminoList.length < 6){
            createTetrimino();
        }
    }
}

export function draw(){
    currMino.shape.forEach(index => {
        blocks[currMino.position + index].classList.add(currMino.name);
    });
}

export function undraw(){
    currMino.shape.forEach(index => {
        blocks[currMino.position + index].classList.remove(currMino.name);
    });
}

export function run(){
    undraw();
    currMino.position += cols;
    if(freeze()){
        dropNextTetrimino();
    }
    removeFullRows();
    draw();
    gameOver();
}

export function moveLeft(){
    undraw();
    // 条件1: 左壁上に位置しているか && 条件2: 左側に他のテトリミノの有無
    if (!isAtEdge('left', currMino.shape) && !lateralBlock('left')) currMino.position -= 1;
    draw();
}

export function moveRight(){
    undraw();
    // 条件1: 左壁上に位置しているか && 条件2: 左側に他のテトリミノの有無
    if (!isAtEdge('right', currMino.shape) && !lateralBlock('right')) currMino.position += 1;
    draw();
}

export function rotate(){
    let prevShape = tetriminoes[currMino.name][currMino.rotation];
    undraw();

    // 回転させた時のrotationとshapeを新たに設定
    currMino.rotation++;

    if (currMino.rotation === currMino.shape.length){
        currMino.rotation = 0;
    }
    currMino.shape = tetriminoes[currMino.name][currMino.rotation];

    // 回転させた時にdivのクラスにtakenが存在したら元の状態に戻し、回転させないようにする
    if (currMino.shape.some((index) => blocks[currMino.position + index].classList.contains('taken'))){
        currMino.rotation--;
        if(currMino.rotation < 0){
            currMino.rotation = 3;
        }
        currMino.shape = tetriminoes[currMino.name][currMino.rotation];
        draw();
        return;
    }

    // 回転した時に左の壁を超えてしまう場合にpositionを調節
    if(isAtEdge('left', prevShape)){
        (currMino.name === 'i') ? adjustIPosition('right') : adjustPosition('right');
    }

    // 回転した時に右の壁を超えてしまう場合にpositionを調節
    if(isAtEdge('right', prevShape)){
        (currMino.name === 'i') ? adjustIPosition('left') : adjustPosition('left');
    }
    draw();
}

export function hardDrop(){
    undraw();
    while (canMoveDown()) {
        currMino.position += cols;
    }
    freeze();
    draw();
    dropNextTetrimino();
}

// iとo以外のテトリミノの現在位置が右の壁側か左の壁側かによって位置を修正する
function adjustPosition(side){
    if (!isAtEdge(side, currMino.shape) || currMino.name === 'o' || currMino.name === 'i') {
        return;
    }
    currMino.position += (side === 'left') ? -1 : 1;
}

// iのテトリミノの現在位置が右の壁側か左の壁側かによって位置を修正する
function adjustIPosition(side){
    if (!isAtEdge(side, currMino.shape) || currMino.name !== 'i') {
        return;
    }
    let adjustment = 0;
    if (side === 'right'){
        adjustment = (currMino.rotation === 2) ? 2 : 1;
    }  else {
        adjustment = (currMino.rotation === 2) ? 1 : 2;
    }
    currMino.position += (side === 'left') ? -adjustment : adjustment;
}

export function freeze(){
    if (!canMoveDown()){
        currMino.shape.forEach(index => blocks[currMino.position + index].classList.add('taken'));
        return true;
    }
    return false;
}

function dropNextTetrimino(){
    setCurrMino();
    setNextMino();
    drawNextMino(nextMino);
    draw();
}

// 右、もしくは左の壁に位置しているか確認
function isAtEdge(side, shape){
    if (side === 'right'){
        return shape.some(index => (currMino.position + index) % cols === 9);
    } else {
        return shape.some(index => (currMino.position + index) % cols === 0);
    }
}

// 左右にブロックがあるか確認
function lateralBlock(side) {
    let x;
    side === 'right' ? (x = 1) : (x = -1);
    return currMino.shape.some((index) => blocks[currMino.position + index + x].classList.contains('taken'));
}

function canMoveDown(){
    return !(currMino.shape.some(index => blocks[currMino.position + index + cols].classList.contains('taken')));
}
