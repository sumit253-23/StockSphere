import React from "react";

function CreateTicket() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">

        <h1 className="fs-2 text-center">
          To create a ticket, select a relevant topic
        </h1>

        <div className="col p-5 mt-5 mb-5">

          <h4>
            <i className="fa fa-plus-circle me-2 " aria-hidden="true"></i>
            AccountOpening
          </h4>

          <ul className="list-unstyled">
            <li><a href="/support">Online Account Opening</a></li>
            <li><a href="/support">Offline Account Opening</a></li>
            <li><a href="/support">Company, Partnership and HUF Account Opening</a></li>
            <li><a href="/support">NRI Account Opening</a></li>
            <li><a href="/support">Charges at StockSphere</a></li>
            <li><a href="/support">StockSphere IDFC FIRST Bank 3-in-1 Account</a></li>
            <li><a href="/support">Getting Started</a></li>
          </ul>

          <h4>
            <i className="fa fa-plus-circle me-2 " aria-hidden="true"></i>
            Fund
          </h4>

          <ul className="list-unstyled">
            <li><a href="/support">Adding Funds</a></li>
            <li><a href="/support">Fund Withdrawal</a></li>
            <li><a href="/support">eMandates</a></li>
            <li><a href="/support">Adding Bank Accounts</a></li>
          </ul>

        </div>

        <div className="col p-5 mt-5 mb-5">

          <h4>
            <i className="fa fa-plus-circle  " aria-hidden="true"></i>YourStockSphereAccount 
          </h4>

          <ul className="list-unstyled">
            <li><a href="/support">Login Credentials</a></li>
            <li><a href="/support">Account Modification and Segment Addition</a></li>
            <li><a href="/support">DP ID and bank details</a></li>
            <li><a href="/support">Your Profile</a></li>
            <li><a href="/support">Transfer and conversion of shares</a></li>
          </ul>

          <h4 className="mt-5">
            <i className="fa fa-plus-circle me-2 mt-5" aria-hidden="true"></i>
            Console
          </h4>

          <ul className="list-unstyled">
            <li><a href="/support">Adding Funds</a></li>
            <li><a href="/support">Fund Withdrawal</a></li>
            <li><a href="/support">eMandates</a></li>
            <li><a href="/support">Adding Bank Accounts</a></li>
          </ul>

        </div>

        <div className="col p-5 mt-5 mb-5">

          <h4>
            <i className="fa fa-check-circle" aria-hidden="true"></i>YourStockSphereAccount
          </h4>

          <ul className="list-unstyled">
            <li><a href="/support">Margin/Leverage, Product and Order types</a></li>
            <li><a href="/support">Kite Web and Mobile</a></li>
            <li><a href="/support">Trading FAQs</a></li>
            <li><a href="/support">Corporate Actions</a></li>
            <li><a href="/support">Sentinel</a></li>
            <li><a href="/support">Kite API</a></li>
            <li><a href="/support">Pi and other platforms</a></li>
            <li><a href="/support">Stockreports+</a></li>
          </ul> 

          <h4 className="">
            <i className="fa fa-th-list" aria-hidden="true"></i>Coin
          </h4>
          <ul className="list-unstyled">
            <li><a href="/support">Understanding Mutual Funds</a></li>
            <li><a href="/support">About Coin</a></li>
            <li><a href="/support">Buying and Selling through Coin</a></li>
            <li><a href="/support">Starting an SIP</a></li>
            <li><a href="/support">Managing your Portfolio</a></li>
            <li><a href="/support">Coin App</a></li>
            <li><a href="/support">Moving to Coin</a></li>
            <li><a href="/support">Government Securities</a></li>
          </ul>

        </div>

      </div>
    </div>
  );
}

export default CreateTicket;
