const playground = document.getElementById("playground");
const startBtn = document.getElementById("start-btn");
const rows = 20; // プレイグラウンドの行数
const cols = 10; // プレイグラウンドの列数
let gameInterval;
let currentTetromino;
let currentPosition;
let board = Array.from({ length: rows }, () => Array(cols).fill(0)); // ゲームボードの初期化

const tetrominoes = {
  i: [[1, 1, 1, 1]],
  j: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  l: [
    [0, 0, 1],
    [1, 1, 1],
  ],
  o: [
    [1, 1],
    [1, 1],
  ],
  s: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  t: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
};

function init() {
  startBtn.addEventListener("click", startGame);
  drawBoard();
}

function startGame() {
  clearInterval(gameInterval);
  board = Array.from({ length: rows }, () => Array(cols).fill(0)); // ボードをリセット
  updateScore(0); // スコアをリセット
  currentTetromino = createTetromino();
  currentPosition = { row: 0, col: Math.floor(cols / 2) - 1 };
  drawTetromino();
  gameInterval = setInterval(updateGame, 1000); // 1秒ごとに更新
}

function updateGame() {
  if (!moveTetromino(1, 0)) {
    mergeTetromino();
    removeFullRows();
    currentTetromino = createTetromino();
    currentPosition = { row: 0, col: Math.floor(cols / 2) - 1 };
    if (!canPlaceTetromino(currentTetromino, currentPosition)) {
      displayFinalScore();
      clearInterval(gameInterval);
      return;
    }
  }
  drawTetromino();
}

function drawBoard() {
  playground.innerHTML = ""; // ボードをクリア
  board.forEach((row) => {
    row.forEach((cell) => {
      const div = document.createElement("div");
      div.className = "cell" + (cell ? " filled" : "");
      playground.appendChild(div);
    });
  });
}

function drawTetromino() {
  clearTetromino(); // 既存のテトリミノをクリア
  currentTetromino.shape.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell) {
        const x = currentPosition.col + c;
        const y = currentPosition.row + r;
        if (y >= 0) {
          // プレイグラウンド内の場合のみ描画
          board[y][x] = cell;
        }
      }
    });
  });
  drawBoard();
}

function clearTetromino() {
  currentTetromino.shape.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell) {
        const x = currentPosition.col + c;
        const y = currentPosition.row + r;
        if (y >= 0) {
          // プレイグラウンド内の場合のみクリア
          board[y][x] = 0;
        }
      }
    });
  });
}

function moveTetromino(rowChange, colChange) {
  const newPosition = {
    row: currentPosition.row + rowChange,
    col: currentPosition.col + colChange,
  };

  if (canPlaceTetromino(currentTetromino, newPosition)) {
    currentPosition = newPosition;
    return true; // 移動成功
  }
  return false; // 移動失敗
}

function canPlaceTetromino(tetromino, position) {
  for (let r = 0; r < tetromino.shape.length; r++) {
    for (let c = 0; c < tetromino.shape[r].length; c++) {
      if (tetromino.shape[r][c]) {
        const x = position.col + c;
        const y = position.row + r;

        if (x < 0 || x >= cols || y >= rows || (y >= 0 && board[y][x])) {
          return false; // プレイグラウンドの範囲外または他のブロックと衝突
        }
      }
    }
  }
  return true; // テトリミノを配置可能
}

function mergeTetromino() {
  currentTetromino.shape.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell) {
        const x = currentPosition.col + c;
        const y = currentPosition.row + r;
        if (y >= 0) {
          // プレイグラウンド内の場合のみマージ
          board[y][x] = cell;
        }
      }
    });
  });
}

function removeFullRows() {
  let rowsToRemove = [];
  board.forEach((row, r) => {
    if (row.every((cell) => cell)) {
      rowsToRemove.push(r);
    }
  });

  rowsToRemove.forEach((rowIndex) => {
    board.splice(rowIndex, 1);
    board.unshift(Array(cols).fill(0)); // 上に新しい行を追加
    updateScore(10); // スコアを更新
  });
}

function createTetromino() {
  const tetrominoKeys = Object.keys(tetrominoes);
  const randomKey =
    tetrominoKeys[Math.floor(Math.random() * tetrominoKeys.length)];
  return { shape: tetrominoes[randomKey] };
}

init();
