const CryptoJS = require("crypto-js");

function formatDate(date, sep) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return [yyyy, mm, dd].join(sep);
}

function generateKeyVariants(basePassword, type) {
    const keys = [];
    const now = new Date();

    if (type === "any") {
        return [basePassword];
    }

    const days = {
        "today": 1,
        "3day": 3,
        "1week": 7
    }[type] || 1;

    const sep = {
        "today": "-",
        "3day": "/",
        "1week": ":"
    }[type];

    for (let i = 0; i < days; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        const dateStr = formatDate(date, sep);
        keys.push(`${basePassword}${type === "today" ? '-' : sep}${dateStr}`);
    }

    return keys;
}

function encryptUrl(realUrl, basePassword, type = "any") {
    const key = generateKeyVariants(basePassword, type)[0];
    const encrypted = CryptoJS.AES.encrypt(realUrl, key).toString();
    return encodeURIComponent(encrypted);
}

function decryptUrl(encryptedUrl, basePassword, type = "any") {
    const decoded = decodeURIComponent(encryptedUrl);
    const keys = generateKeyVariants(basePassword, type);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        try {
            const bytes = CryptoJS.AES.decrypt(decoded, key);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            if (decrypted) {
                return decrypted;
            }
        } catch (_) {
        }
    }

    return null;
}

module.exports = { encryptUrl, decryptUrl };