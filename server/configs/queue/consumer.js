// consumer.js
const amqplib = require("amqplib");
const senMail = require("../../senEmail/senMail");
const amqp_url =
  "amqps://opglhnfw:pWyCayaOw4AZxqTLTsaE1zoWtpcelFxn@armadillo.rmq.cloudamqp.com/opglhnfw";

const { decryptData } = require("../../crypto/crypto");

const key = "12345678901234567890123456789012";
const iv = "1234567890123456";

const queues = ["registerOTP", "changePass", "orderOTP"];
const receiveQueue = async () => {
  try {
    const connection = await amqplib.connect(amqp_url);
    const channel = await connection.createChannel();

    for (const nameQueue of queues) {
      await channel.assertQueue(nameQueue, {
        durable: true,
      });

      await channel.consume(
        nameQueue,
        async (msg) => {
          const message = JSON.parse(msg.content.toString());

          try {
            const decryptedOTP = decryptData(message.otp, key, iv);
            await senMail.sendEmail(
              message.user_id,
              // message.otp,
              decryptedOTP,
              message.type,
              message.titleTomiru
            );

            channel.ack(msg);
          } catch (error) {
            console.error("Lỗi khi gửi email:", error);
          }
        },
        {
          noAck: false,
          prefetch: 100,
        }
      );
    }
  } catch (error) {
    console.log("Lỗi khi thiết lập kết nối:", error);
  }
};

receiveQueue();
