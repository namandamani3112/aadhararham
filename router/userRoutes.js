const express = require("express");
const {
  signUp,
  getInfo, 
} = require("../controller/userController");
const Router = express.Router();

Router.route("/signup").post(signUp);
Router.route("/info").get(getInfo);

module.exports = Router;
