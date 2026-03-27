import React from 'react';

function Education() {
  return ( 
    <div className='container mt-5'>
      <div className='row'>

        {/* LEFT IMAGE */}
        <div className='col-6 p-5'>
          <img 
            src='media/images/education.svg' 
            alt='Education' 
            style={{ width: "80%" }} 
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className='col-6 p-5 mt-5'>
          <h3>Free and open market education</h3>

          <p>
            Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.
          </p>

          <a 
            className='mt-5 d-inline-block'
            href='/product' 
            style={{ textDecoration: "none" }}
          >
            Varsity 
            <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
          </a>

          <p className='mt-5'>
            TradingQ&A, the most active trading and investment community in India for all your market related queries.
          </p>

          <a 
            href='/support' 
            style={{ textDecoration: "none" }}
          >
            TradingQ&A 
            <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
          </a>

        </div>

      </div>
    </div>
  );
}

export default Education;
