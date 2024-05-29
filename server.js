const http = require("http");
const app = require("./app");
const config = require("./config/config");
const WebSocket = require("ws");
const User = require("./models/User");
const Item = require("./models/Item");
const Bid = require("./models/Bid");
const server = http.createServer(app);
const { Server } = require("socket.io");
const wss = new WebSocket.Server({ server });
const io = new Server(server);

wss.on("connection", (ws) => {
  console.log("new cilent connected");

  ws.on("message", async (message) => {
    const data = JSON.parse(message);

    if (data.type === "bid") {
      try {
        const { itemId, userId, amount } = data;
        // Save the bid to the database
        const bid = await Bid.create({
          item_id: itemId,
          user_id: userId,
          amount,
        });

        // Fetch the updated list of bids for the item
        const bids = await Bid.findAll({
          where: { item_id: itemId },
          include: [{ model: Item }, { model: User }],
        });

        // Notify all connected clients about the new bid
        const updateMessage = JSON.stringify({ type: "update", bids });
        wss.clients.forEach((client) => {
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
  });
});

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
