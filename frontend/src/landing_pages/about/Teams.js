import React  from 'react';

function Teams(){
  return (
    <div className="container">
      <div className="row border-top  ">
        <h1 className=" text-center mt-5">
          People
        </h1>
      </div>

      <div className="row p-5 ">
        <div className="col-6 p-5 text-center">
          <img
            style={{
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src="/media/images/sumitkumar.jpeg"
            alt="Sumit kumar"
          />
          <h4>Sumit kumar</h4>
          <h3>Founder & CEO</h3>
        
        </div>

        <div className="col-6 p-5">
          <p>
           Sumit kumar bootstrapped and founded StockSphere in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, StockSphere has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>
            Playing basketball is his zen.
          </p>
          <p>Connect on <a href="/" style={({textDecoration:"none"})}>Homepage</a> / <a href="/support" style={({textDecoration:"none"})}>TradingQnA</a> / <a href="https://twitter.com" style={({textDecoration:"none"})}>Twitter</a></p>
        </div>
      </div>
    </div>
  );
}
export  default Teams;
