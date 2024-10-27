import { updateScore } from "./score.js";
const rows = 20; // プレイグラウンドの行数
export const cols = 10; // プレイグラウンドの列数
let board = Array.from({ length: rows }, () => Array(cols).fill(0)); // ゲームボードの初期化
export const playground = document.getElementById("playground");
export let blocks;

export function generateBoard() {
  drawBoard();
  initBlocks();
}

export function drawBoard() {
  playground.innerHTML = ""; // ボードをクリア
  board.forEach((row) => {
    row.forEach((cell) => {
      const div = document.createElement("div");
      div.className = "cell" + (cell ? " filled" : "");
      playground.appendChild(div);
    });
  });

  for (let i = 0; i < 10; i++) {
    const div = document.createElement("div");
    div.classList.add("taken", "invisible");
    playground.appendChild(div);
  }
}

export function initBlocks() {
  blocks = Array.from(playground.querySelectorAll("div"));
}

export function cleanPlayGround() {
  while (playground.firstChild) {
    playground.removeChild(playground.firstChild);
  }
}

export function removeFullRows() {
  let linesCleared = 0;
  let comboCount = 0;

  for (let i = 0; i < 199; i += cols) {
    const row = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ];

    if (row.every((index) => blocks[index].classList.contains("taken"))) {
      linesCleared++;
      row.forEach((index) => {
        blocks[index].classList.remove("taken");
        blocks[index].classList.remove("i", "o", "t", "j", "l", "s", "z");
      });

      const blocksRemoved = blocks.splice(i, cols);
      blocks = blocksRemoved.concat(blocks);
      blocks.forEach((cell) => playground.appendChild(cell));
    }
  }

  // スコアとレベル更新
  if (linesCleared > 0) {
    updateScore(linesCleared);
  }
}
