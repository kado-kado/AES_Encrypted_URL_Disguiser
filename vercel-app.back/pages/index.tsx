import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [pass, setPass] = useState("");
  const [type, setType] = useState("any");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

  const handleEncrypt = async () => {
    const res = await fetch("/api/encrypt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, pass, type }),
    });
    const data = await res.json();
    setResult(data.encryptedUrl || data.error);
  };

  const handleDecrypt = async () => {
    const res = await fetch("/api/decrypt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, pass, type }),
    });
    const data = await res.json();
    setResult(data.decryptedUrl || data.error);
  };

  const boxStyle = {
    background: "#e0e0e0",
    borderRadius: "20px",
    boxShadow: "7px 7px 15px #bebebe, -7px -7px 15px #ffffff",
    padding: "2rem",
    maxWidth: "600px",
    margin: "2rem auto",
    fontFamily: "sans-serif",
  };

  const inputStyle = {
    width: "100%",
    marginBottom: "1rem",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "10px",
    boxShadow: "inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff",
    background: "#e0e0e0",
    outline: "none",
  };

  const buttonStyle = {
    padding: "0.5rem 1.5rem",
    border: "none",
    borderRadius: "12px",
    background: "#e0e0e0",
    boxShadow: "7px 7px 15px #bebebe, -7px -7px 15px #ffffff",
    cursor: "pointer",
    marginTop: "1rem",
    marginRight: "1rem",
  };

  return (
    <div style={boxStyle}>
      <h1 style={{ textAlign: "center" }}>AES URL Disguiser</h1>
      <input
        placeholder="URL or disguised link"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={inputStyle}
      />
      <input
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        style={inputStyle}
      />
      <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle}>
        <option value="any">any</option>
        <option value="today">today</option>
        <option value="3day">3day</option>
        <option value="1week">1week</option>
      </select>
      <div style={{ textAlign: "center" }}>
        <button onClick={handleEncrypt} style={buttonStyle}>
          Encrypt
        </button>
        <button onClick={handleDecrypt} style={buttonStyle}>
          Decrypt
        </button>
      </div>
      {result && (
        <p style={{ marginTop: "2rem", wordBreak: "break-word", textAlign: "center" }}>
          {result}
        </p>
      )}
    </div>
  );
}