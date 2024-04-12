const fs = require("fs");
const transporter = require("../configs/nodemailer.config");
const path = require("path");

const sendEmail = async (user_id, otp, type, titleTomiru) => {
  const htmlFilePath = path.resolve(__dirname, "../html/index.html");
  try {
    let htmlContent = fs.readFileSync(htmlFilePath, "utf8");
    htmlContent = htmlContent.replace("123456", otp);

    let mailOptions = {
      from: "nguyenvantu131197@gmail.com",
      to: "kimchibaby2k6@gmail.com",
      subject: titleTomiru,
      html: htmlContent,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email đã được gửi:", info.response);
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);
  }
};
module.exports = {
    sendEmail,
};
