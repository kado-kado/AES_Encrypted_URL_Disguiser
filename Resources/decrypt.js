function decrypt() {
    const output = document.getElementById("output_de"); // 修正: output_de を正しく取得
    output.innerHTML = "";

    let hash = document.getElementById("encryptedBox").value.trim();
    if (!hash) {
        hash = window.location.hash ? window.location.hash.substring(1) : "";
    } else if (hash.includes('#')) {
        hash = hash.split('#')[1];
    }

    if (!hash) {
        output.textContent = "暗号化されたフラグメントが見つかりません。";
        return;
    }

    const key = document.getElementById("decryptKeyInput").value.trim();
    if (!key) {
        output.textContent = "復号キーが入力されていません。";
        return;
    }

    try {
        // Base64 URL -> 通常のBase64に変換
        const base64 = hash
            .replace(/-/g, '+')
            .replace(/_/g, '/')
            .padEnd(hash.length + (4 - hash.length % 4) % 4, '=');

        const decrypted = CryptoJS.AES.decrypt(base64, key).toString(CryptoJS.enc.Utf8);
        if (!decrypted) throw new Error("復号結果が空です");

        if (!/^https?:\/\//i.test(decrypted)) {
            throw new Error("不正な形式です。httpまたはhttpsで始まるURLのみ許可されています。");
        }

        output.innerHTML = `
            <h3>Decode</h3>
            <a href="${decrypted}" target="_blank" rel="noopener noreferrer">${decrypted}</a>
        `;
        alert('復号後のURLの安全性の保証はできません。');
    } catch (e) {
        output.textContent = "復号に失敗しました。キーが間違っているか、データが不正です。";
        console.error(e);
    }
}