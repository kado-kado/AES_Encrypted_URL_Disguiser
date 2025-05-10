import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [pass, setPass] = useState("");
  const [type, setType] = useState("any");
  const [result, setResult] = useState("");

  const encrypt = async () => {
    const res = await fetch("/api/encrypt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, pass, type }),
    });
    const data = await res.json();
    setResult(data.encryptedUrl || data.error);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AES URL Disguiser</h1>
      <input
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <input
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="any">any</option>
        <option value="today">today</option>
        <option value="3day">3day</option>
        <option value="1week">1week</option>
      </select>
      <br />
      <button onClick={encrypt} style={{ marginTop: "1rem" }}>
        Encrypt
      </button>
      {result && (
        <p style={{ marginTop: "1rem", wordBreak: "break-all" }}>{result}</p>
      )}
    </div>
  );
}
