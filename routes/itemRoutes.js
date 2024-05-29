const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const itemController = require("../controllers/itemController");

router.get("/items", itemController.getAllItems);
router.get("/items/:id", itemController.getItemById);
router.post("/items", authMiddleware.verifyToken, itemController.createItem);
router.put(
  "/items/:id",
  authMiddleware.verifyToken,
  authMiddleware.isItemOwnerOrAdmin,
  itemController.updateItem
);
router.delete(
  "/items/:id",
  authMiddleware.verifyToken,
  authMiddleware.isItemOwnerOrAdmin,
  itemController.deleteItem
);

module.exports = router;
