const { decryptUrl } = require('../../lib/crypto.js');

export default function handler(req, res) {
    const { url, pass, type = "any" } = req.query;

    if (!url || !pass) {
        return res.status(400).json({ error: "Missing url or pass" });
    }

    let encryptedPart;
    const googleMatch = url.match(/[?&]q=([^&]+)/);
    const decodeMatch = url.match(/\/decode\/([^/?#]+)/);

    if (googleMatch) {
        encryptedPart = googleMatch[1];
    } else if (decodeMatch) {
        encryptedPart = decodeMatch[1];
    } else {
        return res.status(400).json({ error: "Invalid URL format" });
    }

    const decrypted = decryptUrl(encryptedPart, pass, type);
    res.status(200).json({ decrypted: decrypted || null });
}