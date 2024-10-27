export let score = 0;
export let level = 1;
let linesCleared = 0;
let comboCount = 0;
let lastLinesCleared = 0;

// スコアとレベルの表示を管理する要素を取得
const maxLevel = 15;
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");

// スコアを初期化する関数
function resetScore() {
  score = 0;
  level = 1;
  linesCleared = 0;
  comboCount = 0;
  lastLinesCleared = 0;
  scoreDisplay.textContent = score; // スコアを画面に表示
  levelDisplay.textContent = level; // レベルを画面に表示
}

// ブロックの落下速度を計算する関数
export function getFallSpeed() {
  return 1000 * Math.pow(0.8 - (level - 1) * 0.007, level - 1);
}

// スコアとレベルを更新する関数
export function updateScore(lines) {
  // 各ライン消去数に応じた基本スコア
  const lineScores = [0, 100, 300, 500, 800];
  const points = lineScores[lines] * level;

  // バック・トゥ・バックボーナス
  if (lastLinesCleared > 0 && lines > 0) {
    score += points * 1.5; // 1.5倍のスコアを加算
  } else {
    score += points; // 通常のスコアを加算
  }

  // コンボスコアの計算
  if (lines > 0) {
    comboCount++;
    let comboBonus = 50 + (comboCount - 1) * 50; // 50ポイントずつ加算
    score += comboBonus; // コンボボーナスを加算
  } else {
    comboCount = 0; // コンボが続かなかった場合、カウントをリセット
  }

  linesCleared += lines;
  lastLinesCleared = lines; // 最後に消去したライン数を更新
  scoreDisplay.textContent = score; // 新しいスコアを画面に表示

  // レベルアップの処理
  if (linesCleared >= level * 10 && level < maxLevel) {
    level++;
    levelDisplay.textContent = level; // 新しいレベルを画面に表示
  }
}

// ゲームオーバー時にスコアを表示する関数
function displayFinalScore() {
  alert(`ゲームオーバー\n最終スコア: ${score}\nレベル: ${level}`);
}

// 必要に応じて、スコアを更新するための関数を呼び出す
// 例: removeFullRows()の中で使用

// 初期化関数
export function initScore() {
  resetScore(); // スコアをリセット
}

// ゲーム開始時に呼び出す初期化関数
initScore();
