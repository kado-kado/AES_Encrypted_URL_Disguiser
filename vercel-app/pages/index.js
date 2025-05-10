import React, { useState } from 'react';
import Link from 'next/link';

const IndexPage = () => {
  const [url, setUrl] = useState('');
  const [password, setPassword] = useState('');
  const [encryptedUrl, setEncryptedUrl] = useState('');

  const handleEncode = async () => {
    const response = await fetch('/api/encode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, password, type: 'any' }), // 必要に応じて`type`を変更
    });
    const data = await response.json();
    setEncryptedUrl(data.encryptedUrl);
  };

  return (
    <div>
      <h1>AES URL Encryptor/Decryptor</h1>
      
      {/* エンコードフォーム */}
      <section>
        <h2>Encode URL</h2>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleEncode}>Encode</button>

        {encryptedUrl && (
          <div>
            <p>Encoded URL: </p>
            <Link href={`https://www.google.com/search?q=${encryptedUrl}`}>
              <a target="_blank" rel="noopener noreferrer">Open Encoded URL</a>
            </Link>
          </div>
        )}
      </section>

      {/* デコードリンク */}
      <section>
        <h2>Decode URL</h2>
        <Link href="/decode">
          <a>Go to Decode Page</a>
        </Link>
      </section>
    </div>
  );
};

export default IndexPage;