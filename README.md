# AES URL（AES暗号化URL偽装ツール）

**AES Encrypted URL Disguiser**
任意のURLをAES暗号化し、Google検索風のURLに偽装して安全に共有するCLIツールです。復号には同じパスワードが必要となるため、共有リンクの秘匿性が高まります。

## 特徴

- 任意のURLをAES方式で暗号化
- 暗号化された文字列を `https://www.google.com/search?q=...` のように偽装
- 同じパスワードを使って復号可能
- ローカルで完結、オフライン動作可
- CLIベースでシンプル操作

---

## インストール手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/yourname/aes-url.git
cd aes-url
````

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. CLIツールとしてグローバルにインストール

```bash
npm link
```

これで `aes-url` コマンドがどこからでも使えるようになります。

---

## 使い方

### ■ URLを暗号化（偽装）

```bash
aes-url encode -u https://example.com/secret -p 任意のパスワード
```

出力される偽装URL（例）：

```
https://www.google.com/search?q=U2FsdGVkX1...
```

### ■ 偽装URLを復号して元のURLに戻す

```bash
aes-url decode -u "https://www.google.com/search?q=U2FsdGVkX1..." -p 同じパスワード
```

出力される元のURL（例）：

```
https://example.com/secret
```

---

## ヘルプ表示

```bash
aes-url --help
aes-url encode --help
aes-url decode --help
```

---

## セキュリティに関する注意

* 復号には暗号化時と**同じパスワード**が必要です。
* パスワードを第三者と共有する際は、安全な手段を利用してください。
* 暗号化文字列はAESの特性上、短くはなりません（可視的にも複雑になります）。

---

## ライセンス

MIT License