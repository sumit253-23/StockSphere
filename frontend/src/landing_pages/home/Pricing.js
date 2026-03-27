import React from 'react';

function Pricing() {
  return ( 
    <div className='container p-5'>
      <div className='row'>

        <div className='col-4'>
          <h2>Unbeatable pricing</h2>

          <p>
            We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.
          </p>

          <a href='/pricing' style={{textDecoration:"none"}}>
            See pricing 
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>

        <div className='col-2'></div>

        <div className='col-6'>
          <div className='row text-center'>

            <div className='col p-3 border'>
              <h1 className='mb-3'>
                <i className="fa fa-inr" aria-hidden="true"></i>0
              </h1>
              <p>
                Free equity delivery and<br /> direct mutual funds
              </p>
            </div>

            <div className='col p-3 border'>
              <h1 className='mb-3'>
                <i className="fa fa-inr" aria-hidden="true"></i>20
              </h1>
              <p>intraday and F&O</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Pricing;
