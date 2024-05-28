const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const config = require("./config/config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const bidRoutes = require("./routes/bidRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/users", userRoutes);
// app.use("/items", itemRoutes);
// app.use("/bids", bidRoutes);
// app.use("/notifications", notificationRoutes);

module.exports = app;
