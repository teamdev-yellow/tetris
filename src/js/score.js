let score = 0;
let level = 1;

// スコアとレベルの表示を管理する要素を取得
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");

// スコアを初期化する関数
function resetScore() {
  score = 0;
  level = 1;
  scoreDisplay.textContent = score; // スコアを画面に表示
  levelDisplay.textContent = level; // レベルを画面に表示
}

// スコアを更新する関数
function updateScore(points) {
  score += points; // スコアを更新
  scoreDisplay.textContent = score; // 新しいスコアを画面に表示

  // レベルアップの処理
  if (score >= level * 100) {
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
function initScore() {
  resetScore(); // スコアをリセット
}

// ゲーム開始時に呼び出す初期化関数
initScore();
