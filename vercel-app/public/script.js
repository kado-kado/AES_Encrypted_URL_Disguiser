document.getElementById('encodeButton').addEventListener('click', function() {
    const url = document.getElementById('url').value;
    const password = document.getElementById('password').value;
    const encodeType = document.getElementById('encodeType').value; // タイプを取得

    if (url && password) {
        const encrypted = encryptUrl(url, password, encodeType);
        const vercelUrl = `https://yourapp.vercel.app/${encrypted}`;
        document.getElementById('encryptedUrl').innerText = vercelUrl;
    } else {
        alert('URLとパスワードを入力してください。');
    }
});

document.getElementById('decodeButton').addEventListener('click', function() {
    const encryptedUrl = document.getElementById('encodedUrl').value;
    const password = document.getElementById('decryptPassword').value;
    const decodeType = document.getElementById('decodeType').value; // タイプを取得

    if (encryptedUrl && password) {
        const decrypted = decryptUrl(encryptedUrl, password, decodeType);
        document.getElementById('decryptedUrl').innerText = decrypted || "復号に失敗しました。";
    } else {
        alert('暗号化されたURLとパスワードを入力してください。');
    }
});

// URLパラメータからエンコード内容を抽出してデコードフォームに反映させる
function extractEncodedUrlFromParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const encryptedUrl = urlParams.get('q');  // Vercel URL に付加された `q` パラメータを取得
    if (encryptedUrl) {
        document.getElementById('encodedUrl').value = encryptedUrl;
    }
}

function generateKey(password, type) {
    const now = new Date();
    const types = {
        "today": 1,
        "3day": 3,
        "1week": 7
    };

    const days = types[type] || 1; // デフォルトは "today"
    let dateStr = formatDate(now, '-');
    for (let i = 0; i < days; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        dateStr = formatDate(date, '-');
    }

    return CryptoJS.enc.Utf8.parse(`${password}-${dateStr}`);
}

function formatDate(date, sep) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return [yyyy, mm, dd].join(sep);
}

function encryptUrl(url, password, type) {
    const key = generateKey(password, type);
    const encrypted = CryptoJS.AES.encrypt(url, key).toString();
    return encrypted;
}

function decryptUrl(encryptedUrl, password, type) {
    const key = generateKey(password, type);
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedUrl), key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
}

// ページ読み込み時にURLパラメータをチェック
window.onload = extractEncodedUrlFromParams;