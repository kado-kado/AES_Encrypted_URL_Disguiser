import CryptoJS from "crypto-js";

// 日付のフォーマット関数
function formatDate(date, sep) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return [yyyy, mm, dd].join(sep);
}

// キーの生成
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

// 暗号化処理
export default function handler(req, res) {
    if (req.method === 'POST') {
        const { url, pass, type = "any" } = req.body;

        // 無効なタイプの場合のエラーチェック
        const typeOptions = ["any", "today", "3day", "1week"];
        if (!typeOptions.includes(type)) {
            return res.status(400).json({ error: `Invalid type: ${type}. Valid types are: ${typeOptions.join(", ")}` });
        }

        const key = generateKeyVariants(pass, type)[0];
        const encrypted = CryptoJS.AES.encrypt(url, key).toString();
        const encryptedUrl = `https://www.google.com/search?q=${encodeURIComponent(encrypted)}`;
        
        res.status(200).json({ encryptedUrl });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
