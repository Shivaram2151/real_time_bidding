const http = require("http");
const express = require("express");
const app = require("./app"); // Make sure this is your Express app
const config = require("./config/config");
const WebSocket = require("ws");
const User = require("./models/User");
const Item = require("./models/Item");
const Bid = require("./models/Bid");

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

let connectedClients = new Set();

let currentItem = {
  id: 1,
  name: "Antique Vase",
  description: "A beautiful antique vase from the 19th century.",
  startingPrice: 100,
  currentBid: 100,
  imageUrl:
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600",
  createdAt: new Date().toISOString(),
  bids: [],
};

wss.on("connection", (ws) => {
  console.log("New client connected");
  connectedClients.add(ws);
  ws.send(JSON.stringify({ type: "newItem", item: currentItem }));

  ws.on("message", async (message) => {
    const data = JSON.parse(message);

    if (data.type === "bid") {
      try {
        const { itemId, userId, amount } = data;
        console.log("data: " + JSON.stringify(data));
        // Save the bid to the database
        const bid = await Bid.create({
          item_id: itemId,
          user_id: userId,
          bid_amount: amount,
        });

        console.log("Created bid:" + bid);

        // Fetch the updated list of bids for the item
        const bids = await Bid.findAll({
          where: { item_id: itemId },
          include: [{ model: Item }, { model: User }],
        });
        console.log("all bids" + bids);

        // Notify all connected clients about the new bid
        const updateMessage = JSON.stringify({ type: "update", bids });
        connectedClients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(updateMessage);
          }
        });

        console.log("Bid placed and clients notified");
      } catch (error) {
        console.error("Error placing bid:", error);
        ws.send(
          JSON.stringify({ type: "error", message: "Error placing bid" })
        );
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    connectedClients.delete(ws);
  });
});

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
