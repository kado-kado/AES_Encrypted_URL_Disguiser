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
    const { text, pass, type = 'any' } = req.body
    const keys = generateKeyVariants(pass, type)

    for (const key of keys) {
      try {
        const bytes = CryptoJS.AES.decrypt(text, key)
        const decrypted = bytes.toString(CryptoJS.enc.Utf8)
        if (decrypted) {
          return res.status(200).json({ decryptedUrl: decrypted })
        }
      } catch (_) {}
    }

    return res.status(200).json({ decryptedUrl: 'Decryption failed' })
  }
  res.status(405).json({ error: 'Method Not Allowed' })
}
