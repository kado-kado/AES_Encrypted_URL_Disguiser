// pages/api/decode.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { decryptUrl } from '../../lib/crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
        const { url, pass, type } = req.body;

        const match = url?.match(/[?&]q=([^&]+)/);
        if (!match || !pass) {
                return res.status(400).json({ error: 'Invalid URL or missing password' });
        }

        const decrypted = decryptUrl(match[1], pass, type || 'any');
        if (!decrypted) {
                return res.status(400).json({ error: 'Decryption failed' });
        }

        res.status(200).json({ result: decrypted });
}
