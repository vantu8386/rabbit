const dotenv = require("dotenv");
dotenv.config();
const mysql2 = require("mysql2");

const db = mysql2.createPool({
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("ket noi that bai");
  } else {
    console.log("ket noi thanh cong");
  }
});

module.exports = db.promise();
