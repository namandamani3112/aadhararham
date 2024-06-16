const mongoose = require("mongoose");

let transactionSchema = new mongoose.Schema({
  userName: {
    type: String,
    default: "",
  },
  aadharNumber: {
    type: String,
    unique: true,
    default: "",
  },
  date: {
    type: String,
    required: true,
  },
  
  books: {
    type: Map,
    of: Number, 
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
