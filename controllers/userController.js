const { where } = require("sequelize");
const User = require("../models/User");
const authService = require("../services/authService");

exports.register = async (res, req) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    const token = authService.generateToken(user.id, user.role);
    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (res, req) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = authService.generateToken(user.id, user.role);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.profile = async (res, req) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
