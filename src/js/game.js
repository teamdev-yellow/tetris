import { currMino, nextMino, column, tetoriminoList, tetriminoes, createTetromino, setCurrMino, setNextMino, draw, undraw, moveDown, moveLeft, moveRight, control} from './tetrimino.js';

// (仮のイベントリスナー)
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keyup', control);
})

// (仮のゲーム開始関数)
function startGame(){
    createTetromino();
    setNextMino();
    setCurrMino();
    setNextMino();
    setInterval(moveDown, 400);
}

// startGame();
