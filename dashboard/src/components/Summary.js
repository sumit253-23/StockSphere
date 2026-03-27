import React, { useEffect, useState } from "react";
import api from "../api/axios";   // 👈 use here

const Summary = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/api/summary")   // 👈 backend endpoint
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <div className="username">
        <h6>Hi, {data.userName}</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{data.margin}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{data.used}</span>
            </p>
            <p>
              Opening balance <span>{data.balance}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              {data.pnl} <small>{data.percentage}</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{data.current}</span>
            </p>
            <p>
              Investment <span>{data.investment}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;