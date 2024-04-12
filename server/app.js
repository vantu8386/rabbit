const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const port = process.env.PORT;
const app = express();

const registerRoute = require("./src/routes/register.routes");
const changePassRoute = require("./src/routes/changePass.routes");
const orderRoute = require("./src/routes/order.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/register", registerRoute);
app.use("/api/v1/changePass", changePassRoute);
app.use("/api/v1/order", orderRoute);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
