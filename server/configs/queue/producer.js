// producer.js
const dotenv = require("dotenv");
dotenv.config();
const open = require("amqplib").connect(process.env.AMQP_SERVER);

const publishMessage = (payload) =>
  open
    .then((connection) => connection.createChannel())
    .then((channel) => {
      let queue = "defaultQueue";
      switch (payload.type) {
        case "verify_register":
          queue = "registerOTP";
          break;
        case "verify_change_pass":
          queue = "changePass";
          break;
        case "verify_order":
          queue = "orderOTP";
          break;
        default:
          console.log(
            "Không có loại hành động nào được xác định cho mã OTP này. Tin nhắn sẽ được gửi vào hàng đợi mặc định."
          );
      }
      console.log("Đã gửi vào hàng đợi:", payload);
      return channel.assertQueue(queue).then(() => {
        return new Promise((resolve, reject) => {
          try {
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), {
              persistent: true,
              contentType: "application/json",
            });
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      });
    })
    .catch((error) => console.warn(error));

module.exports = publishMessage;
