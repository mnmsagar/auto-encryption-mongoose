require("dotenv").config();
const bcrypt = require("bcrypt");
const { User } = require("../models/users.schema");
const jwt = require("jsonwebtoken");
const hashedPasswordGenerator = (password) => {
  return bcrypt.hashSync(password, 10);
};
var encrypt = require("mongoose-encryption");

exports.userSignUp = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = hashedPasswordGenerator(password);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    // Save the new user to the database
    await newUser.save();
    const token = jwt.sign(newUser.email, process.env.SECRET_KEY);

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser, token });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.userLogIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  // Check if the password is correct
  let isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const token = jwt.sign(user.email, process.env.SECRET_KEY);
  // If user exists and password is correct, login successful
  res.status(200).json({ message: "Login successful", user, token });
};

exports.getProfileByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const messageToSearchWith = new User({ email });
    messageToSearchWith.encryptFieldsSync();
    const data = await User.find({ email: messageToSearchWith.email });
    return res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal error in fetching profile!!",
    });
  }
};
