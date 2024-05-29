const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Item = require("../models/Item");
const User = require("../models/User");
const Bid = sequelize.define(
  "Bid",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "items",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    bid_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "bids",
    timestamps: false,
  }
);

Item.hasMany(Bid, { foreignKey: "item_id" });
Bid.belongsTo(Item, { foreignKey: "item_id" });

User.hasMany(Bid, { foreignKey: "user_id" });
Bid.belongsTo(User, { foreignKey: "user_id" });

(async () => {
  try {
    await sequelize.sync();
    // console.log("The table for the bid model was just created!");
  } catch (error) {
    console.error("Unable to create table : ", error);
  }
})();

module.exports = Bid;
