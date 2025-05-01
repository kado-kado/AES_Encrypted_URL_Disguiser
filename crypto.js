const CryptoJS = require("crypto-js");

function encryptUrl(realUrl, password) {
    const encrypted = CryptoJS.AES.encrypt(realUrl, password).toString();
    return encodeURIComponent(encrypted);
}

function decryptUrl(encryptedUrl, password) {
    try {
        const decoded = decodeURIComponent(encryptedUrl);
        const bytes = CryptoJS.AES.decrypt(decoded, password);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (err) {
        return null;
    }
}

module.exports = { encryptUrl, decryptUrl };