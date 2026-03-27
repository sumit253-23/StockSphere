import React from 'react';
import { Link } from "react-router-dom";

function Hero() {
  return ( 
    <div className="container p-5">
      <div className="row text-center">

        {/* IMAGE */}
        <img 
          src="/media/images/homeHero.png" 
          alt="StockSphere dashboard preview" 
          className="mb-5 img-fluid"
        />

        {/* TEXT */}
        <h1 className="mt-5">Invest in everything</h1>

        <p>
          Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more
        </p>

        {/* BUTTON */}
        <Link 
          to="/signup"
          className="p-2 btn btn-primary"
          style={{ width: '22%', margin: "0 auto", fontSize: "19px" }}
        >
          Sign up for free
        </Link>

      </div>
    </div>
  );
}

export default Hero;
