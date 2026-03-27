require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { HoldingsModel } = require("./Model/HoldingsModel");
const { PositionsModel } = require("./Model/PositionsModel");
const { OrdersModel } = require("./Model/OrdersModel");
const { UserModel } = require("./Model/UserModel");
const authMiddleware = require("./Middleware/authMiddleware");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const defaultFunds = {
  availableMargin: 4043.1,
  usedMargin: 3757.3,
  availableCash: 4043.1,
  openingBalance: 4064.0,
  payin: 4064.0,
  span: 0,
  deliveryMargin: 0,
  exposure: 0,
  optionsPremium: 0,
  collateralLiquid: 0,
  collateralEquity: 0,
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/", authRoutes);

const formatAmount = (value) => Number(value || 0).toFixed(2);
const formatSignedPercent = (value) =>
  `${value >= 0 ? "+" : ""}${Number(value || 0).toFixed(2)}%`;

const getHoldings = async () => HoldingsModel.find({}).lean();
const getPositions = async () => PositionsModel.find({}).lean();
const getOrders = async () => OrdersModel.find({}).sort({ createdAt: -1 }).lean();

const sendHoldings = async (_req, res) => {
  try {
    const allHoldings = await getHoldings();
    res.json(allHoldings);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch holdings" });
  }
};

const sendPositions = async (_req, res) => {
  try {
    const allPositions = await getPositions();
    res.json(allPositions);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch positions" });
  }
};

const sendOrders = async (_req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch orders" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    const normalizedMode = String(mode || "").toUpperCase();

    if (!name || !qty || !price || !["BUY", "SELL"].includes(normalizedMode)) {
      return res.status(400).json({
        message: "Valid name, qty, price and mode are required",
      });
    }

    const newOrder = new OrdersModel({
      name,
      qty: Number(qty),
      price: Number(price),
      mode: normalizedMode,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order saved successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving order" });
  }
};

app.get("/allpositions", sendPositions);
app.get("/allHoldings", sendHoldings);
app.get("/orders", sendOrders);
app.post("/newOrder", createOrder);

app.get("/api/positions", authMiddleware, sendPositions);
app.get("/api/holdings", authMiddleware, sendHoldings);
app.get("/api/orders", authMiddleware, sendOrders);
app.post("/api/orders", authMiddleware, createOrder);

app.get("/api/summary", authMiddleware, async (req, res) => {
  try {
    const [user, holdings] = await Promise.all([
      UserModel.findById(req.user.id).lean(),
      getHoldings(),
    ]);

    const investment = holdings.reduce(
      (total, holding) => total + Number(holding.avg || 0) * Number(holding.qty || 0),
      0
    );
    const current = holdings.reduce(
      (total, holding) =>
        total + Number(holding.price || 0) * Number(holding.qty || 0),
      0
    );
    const pnl = current - investment;
    const percentage = investment === 0 ? 0 : (pnl / investment) * 100;

    res.json({
      userName: user?.username || "Investor",
      margin: formatAmount(defaultFunds.availableMargin),
      used: formatAmount(defaultFunds.usedMargin),
      balance: formatAmount(defaultFunds.openingBalance),
      pnl: formatAmount(pnl),
      percentage: formatSignedPercent(percentage),
      current: formatAmount(current),
      investment: formatAmount(investment),
      funds: {
        availableMargin: formatAmount(defaultFunds.availableMargin),
        usedMargin: formatAmount(defaultFunds.usedMargin),
        availableCash: formatAmount(defaultFunds.availableCash),
        openingBalance: formatAmount(defaultFunds.openingBalance),
        payin: formatAmount(defaultFunds.payin),
        span: formatAmount(defaultFunds.span),
        deliveryMargin: formatAmount(defaultFunds.deliveryMargin),
        exposure: formatAmount(defaultFunds.exposure),
        optionsPremium: formatAmount(defaultFunds.optionsPremium),
        collateralLiquid: formatAmount(defaultFunds.collateralLiquid),
        collateralEquity: formatAmount(defaultFunds.collateralEquity),
        totalCollateral: formatAmount(
          defaultFunds.collateralLiquid + defaultFunds.collateralEquity
        ),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch summary" });
  }
});





// here we send to dummy data to database mongoose so we create the route for that
// app.get('/addHolding',(req,res)=>{
//   let tempHoldings=[
    
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
//   {
//     name: "APPL",
//     qty: 5,
//     avg: 5.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   }

//   ];
//   tempHoldings.forEach((item)=>{
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,

//     });
//     newHolding.save();

//   });
//  res.send("Done");
// });

// app.get('/addPosition',(req,res)=>{
//   let tempPosition=[
//      {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   }];
//   tempPosition.forEach((item)=>{
//     let newPosition = new PositionsModel(
//       {
//          product: item.product,
//          name: item.name,
//          qty: item.qty,
//          avg: item.avg,
//          price: item.price,
//          net: item.net,
//          day: item.day,
//          isLoss: item.isLoss,

//       }
//     );
//     newPosition.save();
//   });
//   res.send("Done");
// });


mongoose.connect(uri).then(() => {
  console.log("Db is connected");

  app.listen(PORT, () => {
    console.log("app Started!");
  });

});
