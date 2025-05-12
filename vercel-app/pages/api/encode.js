const { encryptUrl } = require('../../lib/crypto.js');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url, password } = req.body;

    // リクエストデータをログに出力
    console.log('Received request:', { url, password });

    if (!url || !password) {
      return res.status(400).json({ error: 'URL and password are required.' });
    }

    // 暗号化処理
    try {
      const encryptedUrl = encryptUrl(url, password);
      return res.status(200).json({ encryptedUrl });
    } catch (error) {
      console.error('Encryption failed:', error);
      return res.status(500).json({ error: 'Encryption failed.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}