const jwt = require("jsonwebtoken");
const config = require("../config/config");
const authService = require("../services/authService");
const Item = require("../models/Item");
const authMiddleware = {
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Malformed token" });
    }

    try {
      console.log("Token:", token);
      console.log("Secret:", config.jwtSecret);

      const decoded = authService.verifyToken(token);
      console.log("Decoded:", decoded);

      req.user = decoded;
      next();
    } catch (error) {
      console.error("JWT verification error:", error.message);
      res.status(401).json({ message: "Unauthorized: " + error.message });
    }
  },
  isAdmin: (req, res, next) => {
    // Assuming you have a user role stored in req.user.role after authentication
    if (req.user && req.user.role === "admin") {
      next(); // User is an admin, proceed to the next middleware/controller
    } else {
      res.status(403).json({
        message: "Unauthorized: You are not authorized to perform this action",
      });
    }
  },

  isItemOwnerOrAdmin: async (req, res, next) => {
    const itemId = req.params.id;
    const userId = req.user.id; // Assuming user information is stored in req.user after authentication
    console.log(userId);
    try {
      const item = await Item.findByPk(itemId);
      console.log(item);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      // Check if the user is the owner of the item or an admin
      if (item.user_id === userId || req.user.role === "admin") {
        next(); // User is the owner of the item or an admin, proceed to the next middleware/controller
      } else {
        res.status(403).json({
          message:
            "Unauthorized: You are not authorized to perform this action",
        });
      }
    } catch (error) {
      console.error("Error checking item ownership:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = authMiddleware;
