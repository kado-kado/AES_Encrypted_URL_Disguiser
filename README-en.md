# AES URL

**AES Encrypted URL Disguiser**  
Encrypt any URL using AES and disguise it as a Google search query. This tool allows you to securely share URLs by disguising them in a way that only the intended recipient can decrypt.

## Features

- AES encryption of URLs using a custom password
- Output disguised URLs like `https://www.google.com/search?q=...`
- Easy decryption with the same password
- Simple CLI-based tool that works offline

## Installation

### 1. **Clone the repository**

```bash
git clone https://github.com/yourname/aes-url.git
cd aes-url
````

### 2. **Install dependencies**

Install required libraries using npm.

```bash
npm install
```

### 3. **Global installation (`npm link`)**

To make the CLI tool globally available on your system, use `npm link`:

```bash
npm link
```

This will make the `aes-url` command available globally.

---

## Usage

### 1. **Encrypt a URL**

To encrypt a URL and disguise it as a Google search query:

```bash
aes-url encode -u https://example.com/secret -p myPassword
```

This will output a disguised URL like:

```
https://www.google.com/search?q=U2FsdGVkX1...
```

### 2. **Decrypt a disguised URL**

To decrypt a disguised Google search URL and retrieve the original URL:

```bash
aes-url decode -u "https://www.google.com/search?q=U2FsdGVkX1..." -p myPassword
```

This will output the original URL:

```
https://example.com/secret
```

---

## Help

To view the available commands and options, use the `--help` flag:

```bash
aes-url --help
aes-url encode --help
aes-url decode --help
```

---

## License

MIT License