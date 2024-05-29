const Bid = require("../models/Bid");
const Item = require("../models/Item");

const getAllBidsForItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const bids = await Bid.findAll({
      where: { item_id: itemId },
      include: [{ model: Item }],
    });
    res.status(200).json(bids);
  } catch (error) {
    console.error("Error retrieving bids:", error);
    res.status(500).json({ message: "Internal server error" + error.message });
  }
};

const placeBidOnItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const userId = req.user.id;
    const { bid_amount } = req.body;

    const newBid = await Bid.create({
      item_id: itemId,
      user_id: userId,
      bid_amount: bid_amount,
    });

    const bids = await Bid.findAll({
      where: { item_id: itemId },
      include: [{ model: Item }, { model: User }],
    });

    const updateMessage = JSON.stringify({ type: "update", bids });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(updateMessage);
      }
    });

    res.status(201).json(newBid);
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllBidsForItem, placeBidOnItem };
