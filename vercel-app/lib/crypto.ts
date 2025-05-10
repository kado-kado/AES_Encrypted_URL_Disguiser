// lib/crypto.ts
import CryptoJS from 'crypto-js';

function formatDate(date: Date, sep: string): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return [yyyy, mm, dd].join(sep);
}


function generateKeyVariants(basePassword: string, type: string): string[] {
        const keys: string[] = [];
        const now = new Date();

        if (type === "any") {
                return [basePassword];
        }

        const days = {
                today: 1,
                '3day': 3,
                '1week': 7,
        }[type] || 1;

        const sep = {
                today: '-',
                '3day': '/',
                '1week': ':',
        }[type as keyof typeof type] || '-';

        for (let i = 0; i < days; i++) {
                const date = new Date(now);
                date.setDate(now.getDate() - i);
                const dateStr = formatDate(date, sep);
                keys.push(`${basePassword}${type === 'today' ? '-' : sep}${dateStr}`);
        }

        return keys;
}

export function encryptUrl(realUrl: string, basePassword: string, type = 'any') {
        const key = generateKeyVariants(basePassword, type)[0];
        const encrypted = CryptoJS.AES.encrypt(realUrl, key).toString();
        return encodeURIComponent(encrypted);
}

export function decryptUrl(encryptedUrl: string, basePassword: string, type = 'any') {
        const decoded = decodeURIComponent(encryptedUrl);
        const keys = generateKeyVariants(basePassword, type);

        for (let key of keys) {
                try {
                        const bytes = CryptoJS.AES.decrypt(decoded, key);
                        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
                        if (decrypted) return decrypted;
                } catch (_) {}
        }
        return null;
}
