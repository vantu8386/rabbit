const express = require("express");
const route = express.Router();
const changePassController = require("../controllers/changePass.controller");
const encryptAndDecrypt = require("../middlewares/crypto.middleware");

route.post(
  "/",
  encryptAndDecrypt.encode,
  // encryptAndDecrypt.decrypt,
  changePassController.changePass
);

module.exports = route;
