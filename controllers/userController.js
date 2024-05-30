const User = require("../models/User");
const authService = require("../services/authService");
function validatePassword(enteredPassword, storedPassword) {
  return enteredPassword == storedPassword;
}

exports.register = async (req, res) => {
  console.log(req.body);
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

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { dataValues } = await User.findOne({ where: { username } });
    if (false || !validatePassword(password, dataValues.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = authService.generateToken(dataValues.id, dataValues.role);
    res.status(200).json({ dataValues, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.profile = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
