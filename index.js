#!/usr/bin/env node

const { Command } = require("commander");
const { encryptUrl, decryptUrl } = require("./crypto");

const program = new Command();

program
    .name("aes-url")
    .description("AES-encrypted URL disguiser CLI")
    .version("1.0.3");

program
    .command("encode")
    .description("Encrypt and disguise a URL")
    .requiredOption("-u, --url <url>", "URL to encrypt")
    .requiredOption("-p, --pass <password>", "Password for encryption")
    .action((options) => {
        const encrypted = encryptUrl(options.url, options.pass);
        console.log(`https://www.google.com/search?q=${encrypted}`);
    });

program
    .command("decode")
    .description("Decrypt a disguised URL")
    .requiredOption("-u, --url <url>", "Disguised URL to decrypt")
    .requiredOption("-p, --pass <password>", "Password for decryption")
    .action((options) => {
        const match = options.url.match(/[?&]q=([^&]+)/);
        if (!match) {
            console.error("Invalid disguised URL (missing q= parameter).");
            process.exit(1);
        }
        const decrypted = decryptUrl(match[1], options.pass);
        console.log(decrypted || "Decryption failed (wrong password or invalid data).");
    });

program.parse();