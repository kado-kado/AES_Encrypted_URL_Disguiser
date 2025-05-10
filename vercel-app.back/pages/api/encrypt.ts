// pages/api/encrypt.ts
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
    const { url, pass, type = 'any' } = req.body

    const key = generateKeyVariants(pass, type)[0]
    const encrypted = CryptoJS.AES.encrypt(url, key).toString()
    const encryptedUrl = `https://aes-url.vercel.app/decode/${encodeURIComponent(encrypted)}`
    return res.status(200).json({ encryptedUrl })
  }
  res.status(405).json({ error: 'Method Not Allowed' })
}