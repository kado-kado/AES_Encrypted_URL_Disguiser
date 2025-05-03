#!/usr/bin/env node

const { Command } = require("commander");
const { encryptUrl, decryptUrl } = require("./crypto");

const program = new Command();

program
    .name("aes-url")
    .description("AES-encrypted URL disguiser CLI")
    .version("2.0.3");

const typeOptions = ["any", "today", "3day", "1week"];

program
    .command("encode")
    .description("Encrypt and disguise a URL")
    .requiredOption("-u, --url <url>", "URL to encrypt")
    .requiredOption("-p, --pass <password>", "Password for encryption")
    .option("-t, --type <type>", "Key format type: any, today, 3day, 1week", "any")
    .action((options) => {
        if (!typeOptions.includes(options.type)) {
            console.error(`Invalid type: ${options.type}. Valid types are: ${typeOptions.join(", ")}`);
            process.exit(1);
        }

        const encrypted = encryptUrl(options.url, options.pass, options.type);
        console.log(`https://www.google.com/search?q=${encrypted}`);
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

        const match = options.url.match(/[?&]q=([^&]+)/);
        if (!match) {
            console.error("Invalid disguised URL (missing q= parameter).");
            process.exit(1);
        }
        const decrypted = decryptUrl(match[1], options.pass, options.type);
        console.log(decrypted || "Decryption failed (wrong password, invalid type, or corrupt data).");
    });

program.parse();