const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authService = {
  generateToken: (userId, userRole) => {
    const payload = { id: userId, role: userRole };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });
    return token;
  },

  verifyToken: (token) => {
    try {
      console.log("trigerred verfiy token");
      console.log(token);
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new Error("Invalid token " + error);
    }
  },
};

module.exports = authService;
