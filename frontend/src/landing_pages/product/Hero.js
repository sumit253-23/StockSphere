import React from 'react';

function Hero() {
  return (
    <div className="hero text-center mt-5  border-bottom ">
      <h1>StockSphere Products</h1>
      <h3 className='text-muted'>Sleek, modern, and intuitive trading platforms</h3>
      <p className='mt-3 mb-5'>Check out our <a href="/product" style={{textDecoration:"none"}}>investment offerings</a> →</p>
    </div>
  );
}

export default Hero;
