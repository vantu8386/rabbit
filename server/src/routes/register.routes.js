const express = require("express");
const route = express.Router();
const registerController = require("../controllers/register.controller");
const encryptAndDecrypt = require("../middlewares/crypto.middleware");

route.post("/",  registerController.register);

module.exports = route;
