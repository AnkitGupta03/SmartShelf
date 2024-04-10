const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (users.length === 0) {
    throw new ApiError(404, "No users found");
  }

  return res.status(200).json(new ApiResponse(200, users, "Users found"));
});

exports.createUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, gender, age, role } = req.body;

  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !gender ||
    !age ||
    !role
  ) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    gender,
    age,
    role,
  });

  return res.status(201).json(new ApiResponse(201, user, "User created"));
});

exports.getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "Please provide the user id");
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, "User found"));
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { email, firstName, lastName, age } = req.body;

  if (!userId) {
    throw new ApiError(400, "Please provide the user id");
  }

  if (!email || !firstName || !lastName || !age) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const user = await User.findByIdAndUpdate(
    {_id: userId},
    {
      email,
      firstName,
      lastName,
      age,
    },
    {
      new: true,
    }
  );

  return res.status(200).json(new ApiResponse(200, user, "User updated"));
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "Please provide the user id");
  }

  const user = await User.findByIdAndDelete({_id: userId});

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, "User deleted"));
});
