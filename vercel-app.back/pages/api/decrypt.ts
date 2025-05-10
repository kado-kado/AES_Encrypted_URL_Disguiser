// pages/api/decrypt.ts
import type { NextApiRequest, NextApiResponse } from 'next'
const CryptoJS = require('crypto-js');

function formatDate(date: Date, sep: string) {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return [yyyy, mm, dd].join(sep)
}

function generateKeyVariants(basePassword: string, type: string): string[] {
  const keys: string[] = []
  const now = new Date()

  if (type === 'any') return [basePassword]

  const days = { today: 1, '3day': 3, '1week': 7 }[type] || 1
  const sep = {
        "today": "-",
        "3day": "/",
        "1week": ":"
    }[type] || "-";

  for (let i = 0; i < days; i++) {
    const date = new Date(now)
    date.setDate(now.getDate() - i)
    const dateStr = formatDate(date, sep)
    keys.push(`${basePassword}${type === 'today' ? '-' : sep}${dateStr}`)
  }

  return keys
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url, pass, type = "any" } = req.body;

    // 無効なタイプの場合のエラーチェック
    const typeOptions = ["any", "today", "3day", "1week"];
    if (!typeOptions.includes(type)) {
      return res.status(400).json({ error: `Invalid type: ${type}. Valid types are: ${typeOptions.join(", ")}` });
    }

    // URLデコードと復号化処理
    const match = url.match(/[?&]decode\/([^&]+)/);
    if (!match) {
      return res.status(400).json({ error: 'Invalid disguised URL (missing q= parameter).' });
    }

    const decoded = decodeURIComponent(match[1]);
    const keys = generateKeyVariants(pass, type);
    let decrypted = null;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      try {
        const bytes = CryptoJS.AES.decrypt(decoded, key);
        decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (decrypted) break;
      } catch (_) {}
    }

    res.status(200).json({ decryptedUrl: decrypted || 'Decryption failed (wrong password, invalid type, or corrupt data).' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}