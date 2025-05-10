import React, { useState } from 'react';
import { useRouter } from 'next/router';

const DecodePage = () => {
  const router = useRouter();
  const { query } = router;
  const [password, setPassword] = useState('');
  const [decodedUrl, setDecodedUrl] = useState('');
  const [error, setError] = useState('');

  const handleDecode = async () => {
    // クエリパラメータからエンコードされたURLを取得
    const encodedUrl = query.q;

    if (!encodedUrl) {
      setError('No URL provided to decode.');
      return;
    }

    // デコードリクエストを送信
    const response = await fetch('/api/decode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: encodedUrl, password }),
    });

    const data = await response.json();

    if (data.decodedUrl) {
      setDecodedUrl(data.decodedUrl);
    } else {
      setError('Failed to decode URL. Check the password or try again.');
    }
  };

  return (
    <div>
      <h1>Decode URL</h1>

      {/* デコードフォーム */}
      <section>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleDecode}>Decode</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {decodedUrl && (
          <div>
            <p>Decoded URL: <a href={decodedUrl} target="_blank" rel="noopener noreferrer">{decodedUrl}</a></p>
          </div>
        )}
      </section>
    </div>
  );
};

export default DecodePage;