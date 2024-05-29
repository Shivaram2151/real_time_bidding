const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllBidsForItem,
  placeBidOnItem,
} = require("../controllers/bidController");

router.get("/items/:itemId/bids", getAllBidsForItem);

router.post("/items/:itemId/bids", authMiddleware.verifyToken, placeBidOnItem);

module.exports = router;
