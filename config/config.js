require("dotenv").config;

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret:
    process.env.JWT_SECRET ||
    "3b9a6d3fcfe91703dba7ca79a955a9dfd92139ba41c53fc40e474c062bd5eddd56c338ff04c21c34f97545ea77b0985c357bebb56b9389962d5175ae149261a1",
  db: {
    host: process.env.DB_HOST || "localhost",
    name: process.env.DB_NAME || "real_time_bidding",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    dialect: "mysql",
  },
};
