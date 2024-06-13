const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Unauthorized" });
    }
  },
};

module.exports = authMiddleware;
