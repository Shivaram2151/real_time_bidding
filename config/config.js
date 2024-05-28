require("dotenv").config;

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
  db: {
    host: process.env.DB_HOST || "localhost",
    name: process.env.DB_NAME || "real_time_bidding",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    dialect: "mysql",
  },
};
