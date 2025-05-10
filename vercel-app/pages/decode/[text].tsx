// pages/decode/[text].tsx
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function DecodePage() {
  const router = useRouter()
  const { text } = router.query
  const [input, setInput] = useState('')
  const [pass, setPass] = useState('')
  const [type, setType] = useState('any')
  const [result, setResult] = useState('')

  useEffect(() => {
    if (typeof text === 'string') setInput(text)
  }, [text])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/decrypt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input, pass, type })
    })
    const data = await res.json()
    setResult(data.decryptedUrl || '復号失敗')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>復号</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>暗号化URL文字列：</label>
          <input value={input} readOnly style={{ width: '100%' }} />
        </div>
        <div>
          <label>パスワード：</label>
          <input value={pass} onChange={(e) => setPass(e.target.value)} required />
        </div>
        <div>
          <label>タイプ：</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="any">any</option>
            <option value="today">today</option>
            <option value="3day">3day</option>
            <option value="1week">1week</option>
          </select>
        </div>
        <button type="submit">復号</button>
      </form>
      {result && <p>結果: {result}</p>}
    </div>
  )
}