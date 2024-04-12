const crypto = require('crypto');

// Tạo hàm mã hóa dữ liệu
function encryptData(data, keyString, ivString) {
    const key = Buffer.from(keyString, 'utf-8');
    const iv = Buffer.from(ivString, 'utf-8');
    const jsonData = JSON.stringify(data);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encryptedData = cipher.update(jsonData, 'utf-8', 'base64');
    encryptedData += cipher.final('base64');
    return encryptedData;
}

// Tạo hàm giải mã dữ liệu
function decryptData(encryptedData, keyString, ivString) {
    const key = Buffer.from(keyString, 'utf-8');
    const iv = Buffer.from(ivString, 'utf-8');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decryptedData = decipher.update(encryptedData, 'base64', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return JSON.parse(decryptedData);
}

// Xuất các hàm
module.exports = {
    encryptData: encryptData,
    decryptData: decryptData
};
