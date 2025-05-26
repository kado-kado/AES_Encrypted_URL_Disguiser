# AES_Encrypted_URL_Disguiser

**AES Encrypted URL Disguise Tool**

Encrypts any URL with AES and outputs it disguised as a Google search query. This is a CLI tool for safely sharing URLs so that only the intended recipient can decrypt them.

---

## Features

* AES encrypt URLs using any password
* Outputs fake URLs like `https://www.google.com/search?q=...`
* Supports encryption with expiration dates (`today`, `3day`, `1week`)
* Easily decrypts with the same password
* Simple CLI tool that works offline

---

## Installation

### **1. If you use GitHub**

**Clone the repository**

```bash
git clone https://github.com/kado-kado/AES_Encrypted_URL_Disguiser.git
cd AES_Encrypted_URL_Disguiser
```

**Install dependencies**

```bash
npm install
```

**Install globally (npm link)**

```bash
npm link
```

The aes-url command will now be available system-wide.

---

### **2. Using npm**

```bash
npm i aes-url -g
```

---

## Usage

### **1. Encrypt URL**

Encrypts the URL with AES and disguises it as the URL of the specified hosting service.

```bash
aes-url encode -u https://example.com/secret -p myPassword -o c
```

Example output (for Cloudflare)

```bash
https://aes-url.pages.dev/d/#U2FsdGVkX1...
```

Available URL options (-o)

- g : Google
- v : Vercel
- c : Cloudflare (default)
- n : Netlify

---

### **2. Decrypt disguised URL**

Decodes a disguised Google search URL to the original URL.

```bash
aes-url decode -u "https://aes-url.pages.dev/d/#U2FsdGVkX1..." -p myPassword
```

To decrypt in a format with an expiration date.

```bash
aes-url decode -u "https://aes-url.pages.dev/d/#..." -p myPassword -t 3day
```

Example output

```bash
https://example.com/secret
```

---

## **Type option (-t)**

Using the -t or --type option allows you to convert the password into a format combined with a date and encrypt/decrypt with an expiration date.

| Type | Description | Password conversion example (-p mypass) |
| --- | --- | --- |
| any | Always encrypt and decrypt with the same password (default) | mypass |
| today | Convert password with date of encryption and decryption (yyyy-mm-dd) | mypass-2025-05-03 |
| 3day | Attempt decryption with password candidates from the past 3 days (yyyy/mm/dd format) | mypass2025/05/03, 2025/05/02, … |
| 1week | Attempt decryption with password candidates from the past 7 days (yyyy:mm:dd format) | mypass2025:05:03, 2025:05:02, … |

Using this option allows you to share the URL for a limited time, improving security.

---

## **URL options (-o)**

The -o option allows you to spoof the encrypted URL on different hosting services.

| Option | Description | Example of URL output |
| --- | --- | --- |
| g | Google (https://www.google.com/search?q=...) | https://www.google.com/search?q=U2FsdGVkX1... |
| v | Vercel (https://aes-url.vercel.app/decode/...) | https://aes-url.vercel.app/decode/#U2FsdGVkX1... |
| c | Cloudflare (default) | https://aes-url.pages.dev/d/#U2FsdGVkX1... |
| n | Netlify (https://aes-url.netlify.app/decode/...) | https://aes-url.netlify.app/decode/#U2FsdGVkX1... |

This option allows you to output a spoofed URL on any hosting service.

---

## Note

The web version aims to be easier to use.

Therefore, if you specify a deadline in the CLI, you may not be able to decrypt it in the web version.

---

## Help

Use --help to display available commands and options:

```bash
aes-url --help
aes-url encode --help
aes-url decode --help
```

---

## License

MIT License