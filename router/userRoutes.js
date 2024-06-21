const express = require("express");
const {
  signUp,
  getInfo,
  updateBooks,
} = require("../controller/userController");
const Router = express.Router();

Router.route("/signup").post(signUp);
Router.route("/info").get(getInfo);
Router.patch("/update-books", updateBooks);

module.exports = Router;
