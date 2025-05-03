# AES URL

**AES Encrypted URL Disguiser**

Encrypt any URL using AES and disguise it as a Google search query. This tool allows you to securely share URLs by disguising them in a way that only the intended recipient can decrypt.

---

## Features

* AES encryption of URLs using a custom password
* Output disguised URLs like `https://www.google.com/search?q=...`
* Supports optional expiration-based key formats (`today`, `3day`, `1week`)
* Easy decryption with the same password
* Simple CLI-based tool that works offline

---

## Installation

### **1. Use GitHub**

**Clone the repository**

```bash
git clone https://github.com/kado-kado/aes-url.git
cd aes-url
```

**Install dependencies**

```bash
npm install
```

**Global installation (`npm link`)**

```bash
npm link
```

This makes the `aes-url` command available globally on your system.

---

### **2. Use npm**

```bash
npm i aes-url -g
```

---

## Usage

### 1. **Encrypt a URL**

Encrypt a URL and disguise it as a Google search query:

```bash
aes-url encode -u https://example.com/secret -p myPassword
```

This will output a disguised URL like:

```
https://www.google.com/search?q=U2FsdGVkX1...
```

You can also specify an encryption type:

```bash
aes-url encode -u https://example.com/secret -p myPassword -t today
```

---

### 2. **Decrypt a disguised URL**

Decrypt a disguised Google search URL to retrieve the original URL:

```bash
aes-url decode -u "https://www.google.com/search?q=U2FsdGVkX1..." -p myPassword
```

To try decoding with expiration-based formats:

```bash
aes-url decode -u "https://www.google.com/search?q=..." -p myPassword -t 3day
```

The output includes the decrypted URL and the creation date:

```
https://example.com/secret
```

---

## 🔐 Type Option (`-t`)

The `-t` or `--type` option controls how the password is modified with date-based patterns to support time-limited encryption.

| Type    | Description                                                  | Password format example (with `-p mypass`) |
| ------- | ------------------------------------------------------------ | ------------------------------------------ |
| `any`   | Use the plain password directly (default)                    | `mypass`                                   |
| `today` | Append today's date (`yyyy-mm-dd`) to the password           | `mypass-2025-05-03`                        |
| `3day`  | Try the last 3 days in format `yyyy/mm/dd` during decryption | `mypass2025/05/03`, `2025/05/02`, ...      |
| `1week` | Try the last 7 days in format `yyyy:mm:dd` during decryption | `mypass2025:05:03`, `2025:05:02`, ...      |

This allows you to create temporary URLs that expire after a set period, adding an extra layer of security.

---

## Help

To view the available commands and options:

```bash
aes-url --help
aes-url encode --help
aes-url decode --help
```

---

## License

MIT License