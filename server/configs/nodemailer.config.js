const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "nguyenvantu131197@gmail.com",
    pass: "fjyjxuvtfghsmqbw",
  },
});

module.exports = transporter;
