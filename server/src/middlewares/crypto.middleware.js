// crypto.middleware.js
const { encryptData, decryptData } = require("../../crypto/crypto");

const key = "12345678901234567890123456789012";
const iv = "1234567890123456";

// const decrypt = (req, res, next) => {
//   req.decryptData = (data) => {
//     return decryptData(data, key, iv);
//   };
//   next();
// };
const encode = (req, res, next) => {
  req.encryptData = (data) => {
    return encryptData(data, key, iv);
  };
  next();
};

module.exports = { encode };
