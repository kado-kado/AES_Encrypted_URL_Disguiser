import { useState } from "react";

export default function Home() {
    const [url, setUrl] = useState("");
    const [pass, setPass] = useState("");
    const [type, setType] = useState("any");
    const [encryptedUrl, setEncryptedUrl] = useState("");
    const [decryptedUrl, setDecryptedUrl] = useState("");

    const encryptUrl = async () => {
        const res = await fetch("/api/encrypt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, pass, type })
        });
        const data = await res.json();
        setEncryptedUrl(data.encryptedUrl);
    };

    const decryptUrl = async () => {
        const res = await fetch("/api/decrypt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: encryptedUrl, pass, type })
        });
        const data = await res.json();
        setDecryptedUrl(data.decryptedUrl);
    };

    return (
        <div>
            <h1>AES URL Encryptor and Decryptor</h1>
            
            <div>
                <h2>Encrypt URL</h2>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL to encrypt" />
                <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="any">Any</option>
                    <option value="today">Today</option>
                    <option value="3day">3 Days</option>
                    <option value="1week">1 Week</option>
                </select>
                <button onClick={encryptUrl}>Encrypt</button>
                {encryptedUrl && <p>Encrypted URL: {encryptedUrl}</p>}
            </div>
            
            <div>
                <h2>Decrypt URL</h2>
                <input type="text" value={encryptedUrl} onChange={(e) => setEncryptedUrl(e.target.value)} placeholder="Encrypted URL" />
                <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" />
                <button onClick={decryptUrl}>Decrypt</button>
                {decryptedUrl && <p>Decrypted URL: {decryptedUrl}</p>}
            </div>
        </div>
    );
}
