const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const bidRoutes = require("./routes/bidRoutes");

app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/bids", bidRoutes);
// app.use("/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
module.exports = app;
