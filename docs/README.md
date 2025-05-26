# AES_Encrypted_URL_Disguiser

**AES 暗号化URL偽装ツール**

任意のURLをAESで暗号化し、Google検索クエリに偽装して出力します。意図した相手のみが復号できるようにURLを安全に共有するためのCLIツールです。



---

## 特徴

* 任意のパスワードを使ってURLをAES暗号化
* `https://www.google.com/search?q=...` のような偽装URLを出力
* 有効期限付きの暗号化 (`today`, `3day`, `1week`) に対応
* 同じパスワードで簡単に復号可能
* オフラインでも動作するシンプルなCLIツール

---

## インストール

### **1. GitHubを使う場合**

**リポジトリをクローン**

```bash
git clone https://github.com/kado-kado/AES_Encrypted_URL_Disguiser.git
cd AES_Encrypted_URL_Disguiser
```

**依存パッケージをインストール**

```bash
npm install
```

**グローバルにインストール（npm link）**

```bash
npm link
```

これで aes-url コマンドがシステム全体で使用可能になります。

---

### **2. npmを使う場合**

```bash
npm i aes-url -g
```

---

## 使い方

### **1. URLを暗号化する**

URLをAESで暗号化し、指定されたホスティングサービスのURLとして偽装します。

```bash
aes-url encode -u https://example.com/secret -p myPassword -o c
```

出力例（Cloudflareの場合）

```bash
https://aes-url.pages.dev/d/#U2FsdGVkX1...
```

利用可能なURLオプション（-o）

- g : Google
- v : Vercel
- c : Cloudflare（デフォルト）
- n : Netlify

---

### **2. 偽装URLを復号する**

Google検索風の偽装URLを元のURLに復号します。

```bash
aes-url decode -u "https://aes-url.pages.dev/d/#U2FsdGVkX1..." -p myPassword
```

有効期限つきの形式で復号する場合。

```bash
aes-url decode -u "https://aes-url.pages.dev/d/#..." -p myPassword -t 3day
```

出力例

```bash
https://example.com/secret
```

---

## **タイプオプション（-t）**

-t または --type オプションを使用すると、パスワードを日付と組み合わせた形式に変換して、有効期限付きの暗号化・復号ができます。

| タイプ | 説明 | パスワード変換例（-p mypass） |
| --- | --- | --- |
| any | 常に同じパスワードで暗号化・復号（デフォルト） | mypass |
| today | 暗号化・復号時の日付（yyyy-mm-dd）を付けてパスワードを変換 | mypass-2025-05-03 |
| 3day | 過去3日分のパスワード候補（yyyy/mm/dd形式）で復号を試みる | mypass2025/05/03, 2025/05/02, … |
| 1week | 過去7日分のパスワード候補（yyyy:mm:dd形式）で復号を試みる | mypass2025:05:03, 2025:05:02, … |

このオプションを使うことで、期間限定のURL共有が可能になり、セキュリティが向上します。

---

## **URLオプション（-o）**

-o オプションを使用することで、暗号化されたURLを異なるホスティングサービスで偽装することができます。

| オプション | 説明 | 出力されるURL例 |
| --- | --- | --- |
| g | Google（https://www.google.com/search?q=...） | https://www.google.com/search?q=U2FsdGVkX1... |
| v | Vercel（https://aes-url.vercel.app/decode/...） | https://aes-url.vercel.app/decode/#U2FsdGVkX1... |
| c | Cloudflare（デフォルト） | https://aes-url.pages.dev/d/#U2FsdGVkX1... |
| n | Netlify（https://aes-url.netlify.app/decode/...） | https://aes-url.netlify.app/decode/#U2FsdGVkX1... |

このオプションを使用することで、任意のホスティングサービスで偽装URLを出力できます。

---

## 注意

web版では、より手軽に使うえることを目指しています。
そのため、CLIで期限を指定したものは、Web版では復号化ができない場合がございます。

---

## ヘルプ

利用可能なコマンドやオプションを表示するには、--help を使用します：

```bash
aes-url --help
aes-url encode --help
aes-url decode --help
```


---

## ライセンス

MIT License