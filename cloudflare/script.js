function encrypt() {
    const realUrl = document.getElementById("realUrl").value;
    const key = document.getElementById("keyEnc").value;
    if (!realUrl || !key) {
        document.getElementById("outputEnc").textContent = "URLとキーを入力してください。";
        return;
    }
    const encrypted = CryptoJS.AES.encrypt(realUrl, key).toString();
    const fakeUrl = `https://www.google.com/search?q=${encodeURIComponent(encrypted)}`;
    document.getElementById("outputEnc").innerHTML =
        `偽装URL: <a href="${fakeUrl}" target="_blank">${fakeUrl}</a>`;
}

function decrypt() {
    const fakeUrl = document.getElementById("fakeUrl").value;
    const key = document.getElementById("keyDec").value;
    const match = fakeUrl.match(/q=([^&]+)/);
    if (!match || !key) {
        document.getElementById("outputDec").textContent = "偽装URLとキーを正しく入力してください。";
        return;
    }
    try {
        const decodedParam = decodeURIComponent(match[1]);
        const decrypted = CryptoJS.AES.decrypt(decodedParam, key).toString(CryptoJS.enc.Utf8);
        if (!decrypted) throw new Error();
        document.getElementById("outputDec").innerHTML =
            `元のURL: <a href="${decrypted}" target="_blank">${decrypted}</a>`;
    } catch (e) {
        document.getElementById("outputDec").textContent = "復号に失敗しました。キーが間違っている可能性があります。";
    }
}
