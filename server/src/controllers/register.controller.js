// register.controller.js
const db = require("../../utils/database");
const publishMessage = require("../../configs/queue/producer");

const register = async (req, res) => {
  const { user_id } = req.body;
  const otp = "register";
  const type = "verify_register";
  const titleTomiru = "Xác nhận đăng kí";
  const key = "12345678901234567890123456789012";
  const iv = "1234567890123456";
  try {
    const encryptedOTP = encryptData(otp, key, iv);
    await db.execute(
      `INSERT INTO user_otp (user_id, otp, type) VALUES (?, ?, ?)`,
      [user_id, encryptedOTP, type]
    );

    publishMessage({ user_id, otp: encryptedOTP, type, titleTomiru });
    res.status(200).json({
      message: "Yêu cầu gửi đã được đưa vào hàng đợi thành công",
    });
  } catch (error) {
    console.log("Lỗi khi đưa yêu cầu gửi email vào hàng đợi: " + error);
  }
};

module.exports = { register };
