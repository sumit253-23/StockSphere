const mongoose = require("mongoose");

const { PositionSchema } = require("../schemas/PositionsSchema");

const PositionsModel = mongoose.model("position", PositionSchema);

module.exports = { PositionsModel };
