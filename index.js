#!/usr/bin/env node

const { Command } = require("commander");
const { encryptUrl, decryptUrl } = require("./crypto");

function base64ToBase64Url(base64) {
    return base64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function base64UrlToBase64(base64Url) {
    return base64Url
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(base64Url.length + (4 - base64Url.length % 4) % 4, '=');
}

const program = new Command();

program
    .name("aes-url")
    .description("AES-encrypted URL disguiser CLI")
    .version("2.0.4");

const typeOptions = ["any", "today", "3day", "1week"];

program
    .command("encode")
    .description("Encrypt and disguise a URL")
    .requiredOption("-u, --url <url>", "URL to encrypt")
    .requiredOption("-p, --pass <password>", "Password for encryption")
    .option("-t, --type <type>", "Key format type: any, today, 3day, 1week", "any")
    .option("-o, --output <target>", "Output target: g (Google), v (Vercel), c (Cloudflare), n (Netlify)", "c")
    .action((options) => {
        if (!typeOptions.includes(options.type)) {
            console.error(`Invalid type: ${options.type}. Valid types are: ${typeOptions.join(", ")}`);
            process.exit(1);
        }

        const encrypted = encryptUrl(options.url, options.pass, options.type);
        const encryptedBase64Url = base64ToBase64Url(encrypted);

        const baseUrls = {
            g: `https://www.google.com/search?q=${encryptedBase64Url}`,
            v: `https://aes-url.vercel.app/decode/#${encryptedBase64Url}`,
            c: `https://aes-url.pages.dev/decode/#${encryptedBase64Url}`,
            n: `https://aes-url.netlify.app/decode/#${encryptedBase64Url}`,
        };

        const output = options.output.toLowerCase();

        if (!baseUrls[output]) {
            console.error(`Invalid output target: ${output}. Use one of: g, v, c, n`);
            process.exit(1);
        }

        console.log(baseUrls[output]);
    });

program
    .command("decode")
    .description("Decrypt a disguised URL")
    .requiredOption("-u, --url <url>", "Disguised URL to decrypt")
    .requiredOption("-p, --pass <password>", "Password for decryption")
    .option("-t, --type <type>", "Key format type used during encryption", "any")
    .action((options) => {
        if (!typeOptions.includes(options.type)) {
            console.error(`Invalid type: ${options.type}. Valid types are: ${typeOptions.join(", ")}`);
            process.exit(1);
        }

        let encValue = "";

        const hashMatch = options.url.match(/#(.+)$/);
        if (hashMatch) {
            encValue = hashMatch[1];
        }

        const queryMatch = options.url.match(/[?&]q=([^&]+)/);
        if (!encValue && queryMatch) {
            encValue = queryMatch[1];
        }

        if (!encValue) {
            console.error("暗号化データが見つかりませんでした。（q= または # のどちらも存在しない）");
            process.exit(1);
        }

        const decryptedBase64 = decryptUrl(encValue, options.pass, options.type);
        const decrypted = base64UrlToBase64(decryptedBase64); // Base64URLからBase64に変換

        console.log(decrypted || "復号に失敗しました（パスワード・形式・データの誤り）。");
    });

program.parse();