// pages/index.jsx（← .tsx を .jsx に変更）
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [pass, setPass] = useState('');
  const [type, setType] = useState('any');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('encode'); // ← 型注釈を削除！

  const submit = async () => {
    const res = await fetch(`/api/${mode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, pass, type }),
    });
    const data = await res.json();
    setResult(data.result || data.error);
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>{mode === 'encode' ? 'Encrypt URL' : 'Decrypt URL'}</h1>
      <label>URL: <input value={url} onChange={e => setUrl(e.target.value)} /></label><br />
      <label>Password: <input value={pass} onChange={e => setPass(e.target.value)} /></label><br />
      <label>Type:
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="any">any</option>
          <option value="today">today</option>
          <option value="3day">3day</option>
          <option value="1week">1week</option>
        </select>
      </label><br />
      <button onClick={submit}>Submit</button>
      <button onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}>
        Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
      </button>
      <p><strong>Result:</strong> {result}</p>
    </div>
  );
}
