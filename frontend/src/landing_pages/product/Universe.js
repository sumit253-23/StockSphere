import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container">
      <div className="row text-center">
        <h1>The StockSphere Universe</h1>
        <p >
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col-4 p-3 mt-5">
          <img className="" style={{width:"40%"}} src="media/images/stockfundhouse.png" alt="Stock fund house" />
          <p >
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img style={{width:"40%"}} src="media/images/sensibullLogo.svg" alt="Sensibull" />
          <p>
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>
        <div className="col-4 p-5 ">
          <img src="media/images/goldenpiLogo.png" alt="GoldenPi" />
          <p>
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img style={{width:"40%"}} src="media/images/streakLogo.png" alt="Streak" />
          <p>
            
Systematic trading platform
that allows you to create and backtest
strategies without coding.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png" alt="Smallcase" />
          <p>
            
Thematic investing platform
that helps you invest in diversified
baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img style={{width:"40%"}} src="media/images/dittoLogo.png" alt="Ditto" />
          <p>
            
Personalized advice on life
and health insurance. No spam
and no mis-selling.
          </p>
        </div>
        <Link to="/signup" className='p-2 btn btn-primary fs-19.2px' style={{width:'22%',margin:"0 auto" }}>Sign up for free </Link>
      </div>
      
      
    </div>
  );
}

export default Universe;
