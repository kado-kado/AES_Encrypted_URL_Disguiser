function generatePassword(length = 16) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

function encrypt() {
    const realUrl = document.getElementById("urlInput").value.trim();
    let key1 = document.getElementById("passInput").value.trim();

    if (!realUrl) {
        alert("URLを入力してください。");
        return;
    }

    if (!key1) {
        key1 = generatePassword();
        document.getElementById("passInput").value = key1;
        alert("パスワードが自動生成されました。");
    }

    try {
        const encrypted = CryptoJS.AES.encrypt(realUrl, key1).toString();

        const base64url = encrypted
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        const fullUrl = `https://aes-url.pages.dev/d/#${base64url}`;
        window.generatedUrl = fullUrl;

        document.getElementById("output").innerHTML =
            `<h2>Encode</h2><br><a href="${fullUrl}" target="_blank">${fullUrl}</a><br><p><strong>パスワード：</strong>${key1}</p>`;
    } catch (e) {
        document.getElementById("output").textContent = "暗号化に失敗しました。";
    }
}