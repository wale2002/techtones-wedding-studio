const mongoose = require("mongoose");

const GiftSchema = new mongoose.Schema({
  registryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registry",
    required: true,
  },
  giverName: {
    type: String,
    required: true,
  },
  giverEmail: {
    type: String,
  },
  message: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

module.exports = mongoose.model("Gift", GiftSchema);
