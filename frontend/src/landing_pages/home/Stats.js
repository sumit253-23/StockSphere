import React from 'react';

function Stats() {
  return ( 
    <div className='container p-3'>
      <div className='row'>

        {/* LEFT SIDE */}
        <div className='col-6 p-5'>
          <h3 className='fs-2'>Trust with confidence</h3>

          <div style={{ fontSize: "100%" }}>
            <h4 className='fs-4'>Customer-first always</h4>
            <p className='text-muted'>
              That's why 1.6+ crore customers trust StockSphere with ~ ₹6 lakh crores of equity investments, making us India’s largest broker; contributing to 15% of daily retail exchange volumes in India.
            </p>

            <h4 className='fs-4'>No spam or gimmicks</h4>
            <p className='text-muted'>
              No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. Our philosophies.
            </p>

            <h4 className='fs-4'>The StockSphere universe</h4>
            <p className='text-muted'>
              Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.
            </p>

            <h4 className='fs-4'>Do better with money</h4>
            <p className='text-muted'>
              With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='col-6 p-5'>
          <img 
            src='media/images/ecosystem.png' 
            alt='Ecosystem' 
            style={{ width: '90%' }} 
          />

          <div className='text-center'>
            <a href='/product' className='mx-5' style={{ textDecoration: "none" }}>
              Explore our products 
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>

            <a href='/product' style={{ textDecoration: "none" }}>
              Try Kite demo 
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Stats;
