import React, { useState, useContext } from "react";
import api from "../api/axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  // ✅ Correct way
  const { closeBuyWindow } = useContext(GeneralContext);

  // ✅ BUY
  const handleBuyClick = async () => {
    await api.post("/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
    });

    closeBuyWindow(); // ✅ correct
  };

  // ✅ SELL
  const handleSellClick = async () => {
    await api.post("/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "SELL",
    });

    closeBuyWindow(); // ✅ correct
  };

  // ❌ Cancel
  const handleCancelClick = () => {
    closeBuyWindow(); // ✅ correct
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
  <button className="btn btn-blue" onClick={handleBuyClick}>
    Buy
  </button>

  <button className="btn btn-red" onClick={handleSellClick}>
    Sell
  </button>

  <button className="btn btn-grey" onClick={handleCancelClick}>
    Cancel
  </button>
</div>
        
      </div>
    </div>
  );
};

export default BuyActionWindow;
