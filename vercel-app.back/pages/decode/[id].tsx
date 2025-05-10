import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DecodePage = () => {
  const router = useRouter();
  const { id } = router.query; // URLのパラメータ ~ を取得
  const [decryptedUrl, setDecryptedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchDecryptedUrl = async () => {
        try {
          const response = await fetch('/api/decrypt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: id,  // URLパラメータ id を使って暗号化URLを送信
              pass: 'yourPasswordHere',  // 適切なパスワードを設定
              type: 'today',  // 必要なタイプを設定
            }),
          });
          const data = await response.json();
          setDecryptedUrl(data.decryptedUrl);  // 復号化結果をセット
        } catch (error) {
          console.error('Error during decryption:', error);
        }
      };
      fetchDecryptedUrl();
    }
  }, [id]);  // idが変更されるたびに再実行

  return (
    <div>
      <h1>Decoded URL</h1>
      {decryptedUrl ? (
        <p>Decrypted URL: {decryptedUrl}</p>  // 復号化されたURLを表示
      ) : (
        <p>Loading or Failed to decrypt URL...</p>  // 復号化中または失敗した場合
      )}
    </div>
  );
};

export default DecodePage;
