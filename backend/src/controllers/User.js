const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

const register = async function (req, res) {
  try {
    const data = req.body;

    const user = await User.register(data);
    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async function (req, res) {
  try {
    const data = req.body;

    const user = await User.login(data);
    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProfile = async function (req, res) {
  try {
    const id = req.user;

    const user = await User.getProfile(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProfile = async function (req, res) {
  try {
    const id = req.user;
    const data = req.body;

    const user = await User.updateProfile({ ...data, id: id });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePassword = async function (req, res) {
  try {
    const id = req.user;
    const data = req.body;

    const user = await User.updateProfile({ ...data, id: id });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateImage = async function (req, res) {
  try {
    const path = req.files.path;
    const id = req.user;

    const user = await User.updateImage({ path, id });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProfile = async function (req, res) {
  try {
    const id = req.user;
    const user = await User.deleteProfile(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  updatePassword,
  updateImage,
  deleteProfile,
};
