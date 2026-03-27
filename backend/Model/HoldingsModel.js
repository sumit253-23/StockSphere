const mongoose = require("mongoose");
const { HoldingsSchema } = require("../schemas/HoldingSchemas");
const HoldingsModel = mongoose.model("Holdings", HoldingsSchema);
module.exports = { HoldingsModel };
