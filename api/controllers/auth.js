import  User from "../models/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";

export const register =  AsyncHandler(async(req, res) => {
  //CHECK EXISTING USER
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export const login = AsyncHandler(async(req, res) => {
  // CHECK USER
  const user = await User.findOne({ where: { username: req.body.username } });
  if (!user) {
    return res.status(404).json("User not found!");
  }

  // CHECK PASSWORD
  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json("Wrong username or password!");
  }

  // GENERATE TOKEN
  const token = jwt.sign({ id: user.id }, "jwtkey");

  // RETURN USER DETAILS WITHOUT PASSWORD AND SET TOKEN IN COOKIE
  const { password, ...other } = user.toJSON();
  res.cookie("access_token", token, {
    httpOnly: true,
    //sameSite: "none",
    //secure: true,
  });
  res.status(200).json(other);
});

export const logout = AsyncHandler(async(req, res) => {
  res.clearCookie("access_token", {
    // sameSite: "none",
    // secure: true,
  }).status(200).json("User has been logged out.");
});

