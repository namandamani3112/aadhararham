const express = require("express");
const {
  signUp,
  getInfo,
  updateBooks,
} = require("../controller/userController");
const Router = express.Router();

Router.route("/signup").post(signUp);
Router.get("/info/:aadharNumber?", getInfo); // Allow optional Aadhar number parameter
Router.patch("/update-books", updateBooks);

module.exports = Router;
