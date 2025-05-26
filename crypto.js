const CryptoJS = require("crypto-js");

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

function formatDate(date, sep) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return [yyyy, mm, dd].join(sep);
}

function generateKeyVariants(basePassword, type = "any") {
    if (type === "any") return [basePassword];

    const days = { today: 1, "3day": 3, "1week": 7 }[type] || 1;
    const sep = { today: "-", "3day": "/", "1week": ":" }[type] || "-";
    const keys = [];

    const now = new Date();
    for (let i = 0; i < days; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        const key = `${basePassword}${sep}${formatDate(date, sep)}`;
        keys.push(key);
    }

    return keys;
}

function encryptUrl(realUrl, basePassword, type = "any") {
    const key = generateKeyVariants(basePassword, type)[0];
    const encrypted = CryptoJS.AES.encrypt(realUrl, key).toString();
    return base64ToBase64Url(encrypted);
}

function decryptUrl(encryptedUrl, basePassword, type = "any") {
    const base64 = base64UrlToBase64(encryptedUrl);
    const keys = generateKeyVariants(basePassword, type);

    for (const key of keys) {
        try {
            const bytes = CryptoJS.AES.decrypt(base64, key);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            if (decrypted) return decrypted;
        } catch (_) {}
    }

    return null;
}

module.exports = { encryptUrl, decryptUrl };