const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.resolve("./public")));

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const bidRoutes = require("./routes/bidRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.get("/", (req, res) => {
  res.sendFile("./public/index.html");
});
app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/bids", bidRoutes);
// app.use("/notifications", notificationRoutes);

module.exports = app;
