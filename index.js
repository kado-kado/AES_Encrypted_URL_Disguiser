#!/usr/bin/env node

const { Command } = require("commander");
const { encryptUrl, decryptUrl } = require("./crypto");

const program = new Command();

program
    .name("aes-url")
    .description("AES-encrypted URL disguiser CLI")
    .version("3.1.0");

program
    .command("encode")
    .description("Encrypt and disguise a URL")
    .requiredOption("-u, --url <url>", "URL to encrypt")
    .requiredOption("-p, --pass <password>", "Base password for encryption")
    .option("-t, --type <type>", "Password type: any, today, 3day, 1week", "any")
    .option("-o, --output <target>", "Output service: g, v, c, n", "c")
    .action((options) => {
        const encrypted = encryptUrl(options.url, options.pass, options.type);
        const baseUrls = {
            g: `https://www.google.com/search?q=${encrypted}`,
            v: `https://aes-url.vercel.app/decode/#${encrypted}`,
            c: `https://aes-url.pages.dev/d/#${encrypted}`,
            n: `https://aes-url.netlify.app/d/#${encrypted}`,
        };

        const outputUrl = baseUrls[options.output.toLowerCase()];
        if (!outputUrl) {
            console.error("Invalid output option. Use one of: g, v, c, n");
            process.exit(1);
        }

        console.log(outputUrl);
    });

program
    .command("decode")
    .description("Decrypt a disguised URL")
    .requiredOption("-u, --url <url>", "Disguised URL to decrypt")
    .requiredOption("-p, --pass <password>", "Base password for decryption")
    .option("-t, --type <type>", "Password type: any, today, 3day, 1week", "any")
    .action((options) => {
    try {
        const url = new URL(options.url);
        const hash = url.hash ? url.hash.substring(1) : null;
        const query = url.searchParams.get("q");

        const encryptedPart = hash || query;

        if (!encryptedPart) {
            console.error("暗号化されたデータが見つかりません。");
            process.exit(1);
        }

        const decrypted = decryptUrl(encryptedPart, options.pass, options.type);
        if (decrypted) {
            console.log(`Decrypted URL: ${decrypted}`);
        } else {
            console.log("Decryption failed. Please check your password and type.");
        }
    } catch (e) {
        console.error("URLの解析中にエラーが発生しました。正しい形式か確認してください。");
    }
});

program.parse();