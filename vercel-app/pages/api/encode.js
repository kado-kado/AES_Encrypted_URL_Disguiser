const { encryptUrl } = require('../../lib/crypto.js');

export default function handler(req, res) {
    const { url, pass, type = "any", google } = req.query;

    if (!url || !pass) {
        return res.status(400).json({ error: "Missing url or pass" });
    }

    const encrypted = encryptUrl(url, pass, type);
    const fullUrl = google === "true"
        ? `https://www.google.com/search?q=${encrypted}`
        : `https://aes-url.vercel.app/decode/${encrypted}`;

    res.status(200).json({ encrypted: fullUrl });
}