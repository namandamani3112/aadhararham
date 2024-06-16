const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const connectDatabase = require("./database/connection");
const bodyParser = require("body-parser");

const userRouter = require("./router/userRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
connectDatabase();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  await db.collection("users").createIndex({ mobile: 1 }, { unique: true });
});

app.get("/test", (req, res) => {
  res.status(200).send({
    "status code": res.statusCode,
    message: "Successfully tested!",
  });
});


app.use("/user", userRouter); 


app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
