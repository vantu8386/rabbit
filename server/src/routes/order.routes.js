const express = require("express");
const route = express.Router();
const orderController = require("../controllers/order.controller");
const encryptAndDecrypt = require("../middlewares/crypto.middleware");

route.post("/", orderController.order);

module.exports = route;
