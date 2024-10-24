import {playground} from './display.js';


export let currMino = null;
export let nextMino = {
    name: "",
    position: 4,
    rotation: 0,
    shape: []
}
export const column = 10;
export let tetoriminoList = [];
let blocks = Array.from(playground.querySelectorAll('div'));

export const tetriminoes = {
    l: [
        [column, 2, column + 1, column + 2],
        [1, column + 1, column * 2 + 1, column * 2 + 2],
        [column, column + 1, column + 2, column * 2],
        [0, 1, column + 1, column * 2 + 1]
    ],

    t: [
        [1, column, column + 1, column + 2],
        [1, column + 1, column + 2, column * 2 + 1],
        [column, column + 1, column + 2, column * 2 + 1],
        [1, column, column + 1, column * 2 + 1]
    ],

    s: [
        [1, 2, column, column + 1],
        [1, column + 1, column + 2, column * 2 + 2],
        [column + 1, column + 2, column * 2, column * 2 + 1],
        [0, column, column + 1, column * 2 + 1]
    ],

    z: [
        [0, 1, column + 1, column + 2],
        [2, column + 1, column + 2, column * 2 + 1],
        [column, column + 1, column * 2 + 1, column * 2 + 2],
        [1, column, column + 1, column * 2]
    ],

    j: [
        [0, column, column + 1, column + 2],
        [1, 2, column + 1, column * 2 + 1],
        [column, column + 1, column + 2, column * 2 + 2],
        [1, column + 1, column * 2, column * 2 + 1]
    ],

    i: [
        [column, column + 1, column + 2, column + 3],
        [2, column + 2, column * 2 + 2, column * 3 + 2],
        [column * 2, column * 2 + 1, column * 2 + 2, column * 2 + 3],
        [1, column + 1, column * 2 + 1, column * 3 + 1]
    ],

    o: [
        [0, 1, column,  column + 1],
        [0, 1, column, column + 1],
        [0, 1, column, column + 1],
        [0, 1, column, column + 1]
    ]
}

export function createTetromino(){
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
            createTetromino();
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

export function moveDown(){
    undraw();
    currMino.position += column;
    draw();
    freeze();
}

export function moveLeft(){
    undraw();
    const isAtLeftEdge = currMino.shape.some(index => (currMino.position + index) % column === 0);
    
    // 条件1: 左壁上に位置しているか && 条件2: 左側に他のテトリミノの有無
    if (!isAtLeftEdge && !lateralBlock('left')) currMino.position -= 1;
    draw();
}

export function moveRight(){
    undraw();
    const isAtRightEdge = currMino.shape.some(index => (currMino.position + index) % column === 9);
    
    // 条件1: 左壁上に位置しているか && 条件2: 左側に他のテトリミノの有無
    if (!isAtRightEdge && !lateralBlock('right')) currMino.position += 1;
    draw();
}

function rotate(){
    console.log('rotate');
    undraw();
    currMino.rotation++;
    if (currMino.rotation === currMino.shape.length){
        currMino.rotation = 0;
    }
    currMino.shape = tetriminoes[currMino.name][currMino.rotation];
    draw();
}

export function freeze(){
    if (currMino.shape.some(index => blocks[currMino.position + index + column].classList.contains('taken'))){
        currMino.shape.forEach(index => blocks[currMino.position + index].classList.add('taken'));
        setCurrMino();
        setNextMino();
        draw();
        // displayNextShape();
    }
}

function lateralBlock(side) {
    let x;
    side === 'right' ? (x = 1) : (x = -1);
    return currMino.shape.some((index) =>
        blocks[currMino.position + index + x].classList.contains('taken')
    );
}

export function control(e){
    console.log(e.key);
    if(e.key === 'ArrowLeft'){
        moveLeft();
    } else if (e.key === 'ArrowRight'){
        moveRight();
    } else if (e.key === 'ArrowUp'){
        rotate();
    } else if (e.key === 'ArrowDown'){
        moveDown();
    }
}

