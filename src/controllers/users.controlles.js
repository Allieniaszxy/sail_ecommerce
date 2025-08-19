const userModel = require("../models/users.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const signUp = await userModel.create({
      name,
      email,
      password: hash,
    });
    res.status(200).json({
      message: "New user created",
      data: signUp,
    });
  } catch (error) {
    res.status(400).json({
      message: "error creating user",
      data: error,
    });
  }
};

const signInUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    const signIn = await userModel.find0ne({ email });
    if (signIn) {
      const checkPassword = await bcrypt.compare(password, checkPassword);
      if (checkPassword) {
        const token = jwt.sign(
          {
            _id: signIn._id,
          },
          "prometheus",
          { expiresIn: "30mins" }
        );
        const { password, ...info } = signIn.doc;
        res.status(200).json({
          message: "user logged in successfully",
          data: signIn,
        });
      } else {
        res.status(400).json({
          message: "incorrect password",
        });
      }
    } else {
      res.status(404).json({
        message: "mail not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "error signing in user",
      data: error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const getUsers = await userModel.find();
    res.status(200).json({
      message: "all users gotten successfully",
      data: getUsers,
    });
  } catch (error) {
    res.status(200).json({
      message: "error getting users",
      data: error,
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const getOne = await userModel.find0ne(req.params.id);
    res.status(200).json({
      message: "single user gotten successfully",
      data: getOne,
    });
  } catch (error) {
    res.status(400).json({
      message: "error getting single user",
      data: error,
    });
  }
};

const deleteOneUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};

const updateOneUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User details updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating user details",
      error: error.message,
    });
  }
};

module.exports = {
  signUpUsers,
  signInUsers,
  getAllUsers,
  getOneUser,
  deleteOneUser,
  updateOneUser,
};
