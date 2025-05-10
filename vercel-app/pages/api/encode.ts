// pages/api/encode.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { encryptUrl } from '../../lib/crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
        const { url, pass, type } = req.body;

        if (!url || !pass) {
                return res.status(400).json({ error: 'Missing url or pass' });
        }

        const encrypted = encryptUrl(url, pass, type || 'any');
        res.status(200).json({ result: `https://www.google.com/search?q=${encrypted}` });
}
