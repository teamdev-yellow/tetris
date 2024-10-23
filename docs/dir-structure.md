# フォルダ構成

```
tetris/
├── index.html
└── src/
		├── css/
		│   ├── style.css
		├── js/
		│   ├── main.js
		│   ├── game.js
		│   ├── tetrimino.js
		│   ├── playground.js
		│   ├── display.js
		│   ├── controls.js
		│   ├── score.js
		└── assets/
		    └── audio/
```

## ディレクトリ構造の詳細


### ルートディレクトリ

- index.html - メインのHTMLファイル


### js/

- main.js - ゲーム全体の制御を行う。
- game.js - ゲームの全体のロジック。ゲームループ、ステート管理。
- tetromino.js - テトリミノの定義、形状、回転ロジックなど。
- playground.js - ゲームフィールド（グリッド）の管理。ブロックの配置やライン消去の処理。
- display.js - ゲーム画面のUIの管理
- controls.js - ユーザー入力の管理（キー操作のハンドリング）。
- score.js - スコアやレベルアップの計算。


### **styles/**

- style.css - ゲームのデザインやスタイルを設定するCSSファイル。


### **assets/**

- sounds/ - 効果音やBGMを格納するフォルダ。
