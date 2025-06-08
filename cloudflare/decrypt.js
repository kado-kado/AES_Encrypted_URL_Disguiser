function decrypt() {
    const hash = window.location.hash.substring(1);
    const output = document.getElementById("output");
    output.innerHTML = ""; // 前の出力をクリア

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
        const base64 = hash
            .replace(/-/g, '+')
            .replace(/_/g, '/')
            .padEnd(hash.length + (4 - hash.length % 4) % 4, '=');

        const decrypted = CryptoJS.AES.decrypt(base64, key).toString(CryptoJS.enc.Utf8);
        if (!decrypted) throw new Error("復号結果が空です");

        if (!/^https?:\/\//i.test(decrypted)) {
            throw new Error("不正なリンク形式です。httpまたはhttpsで始まるURLのみ許可されています。");
        }

        output.innerHTML = `
            <h3>Decode</h3>
            <a href="${decrypted}" target="_blank" rel="noopener noreferrer">${decrypted}</a>
        `;
        alert('復号後のURLの安全性の保証はできません。')
    } catch (e) {
        output.textContent = "復号に失敗しました。キーが間違っているか、データが不正です。";
        console.error(e);
    }
}