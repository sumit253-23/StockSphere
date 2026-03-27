const mongoose = require("mongoose");

const { OrderSchema } = require("../schemas/OrderSchema");

const OrdersModel = mongoose.model("order", OrderSchema);

module.exports = { OrdersModel };
