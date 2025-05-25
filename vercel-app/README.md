# AES Encrypted URL Disguiser

このツールは、指定したURLをAES暗号化し、Google検索風の偽装URLに変換します。

復号には同じパスワードを使用することで、安全に本来のURLを隠して共有できます。

## 特長

- 完全ローカル動作（インターネット通信なし）
- パスワードによるAES暗号化・復号
- Google検索URLを偽装形式に活用（例：`https://www.google.com/search?q=...`）

## デモ

入力URL: https://example.com/ab/c/12345

パスワード: secretkey

→ 出力: https://www.google.com/search?q=U2FsdGVkX1+…

復号時に同じパスワードを使えば元のURLが復元されます。

## 使用技術

- HTML / JavaScript
- [CryptoJS](https://github.com/brix/crypto-js)（暗号化ライブラリ）

## ファイル構成

.

├── index.html         # メインアプリ（ブラウザで開くだけ）

├── README.md          # この説明ファイル

└── crypto-js/         # CryptoJSライブラリ（CDN不要な場合のみ）

## 使い方

### 1. ローカルで開く方法

1. このリポジトリをダウンロード or クローン
2. `index.html` をブラウザで開く（ダブルクリックでもOK）
3. 暗号化 or 復号のどちらかを選択し、必要な情報を入力

### 2. GitHub Pages で公開する

1. GitHubリポジトリの設定で Pages を有効化
2. `main`ブランチや `docs`フォルダを選択
3. 自分専用のツールとして公開URLを利用可能

## セキュリティ注意

- パスワードが漏洩すると復号される可能性があります。共有時は安全な手段で鍵を伝えてください。
- AES暗号は強力ですが、**短い鍵や推測されやすい鍵は避けてください**。

## ライセンス

MIT License