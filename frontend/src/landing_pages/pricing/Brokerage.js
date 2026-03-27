import React from "react";
function Brokerage(){
  return(
    <div className="container">
      <div className="row p-5 mt-5 text-center border-top">
        <div className="col p-4">
          <a href="/pricing" style={{textDecoration:"none"}}><h3 className="fs-5">Brokerage calculator</h3>
          <ul className=" text-muted"style={{textAlign:"left"}}>
            <li> Call & Trade aur RMS auto-squareoff par ₹50 + GST per order ka additional charge lagta hai.</li>
            <li> Digital contract notes e-mail ke through bheje jaate hain.</li>
            <li> Agar physical (paper) contract note chahiye ho, to ₹20 per contract note charge hota hai. Courier charges alag se apply hote hain.</li>
            <li> NRI account (Non-PIS) ke liye equity trades par 0.5% ya ₹100 per executed order charge hota hai (jo bhi kam ho).</li>
            <li> NRI account (PIS) ke liye equity trades par 0.5% ya ₹200 per executed order charge hota hai (jo bhi kam ho).</li>
            <li> Agar account debit balance me ho, to har executed order par ₹20 ki jagah ₹40 charge</li>
            
          </ul>
          </a>
        
        </div>
        <div className="col p-4">
          <a href="/pricing" style={{textDecoration:"none"}}><h3 className="fs-5"> List of charges</h3>
          <ul className=" text-muted"style={{textAlign:"left"}}>
            <li> Call & Trade aur RMS auto-squareoff par ₹50 + GST per order ka additional charge lagta hai.</li>
            <li> Digital contract notes e-mail ke through bheje jaate hain.</li>
            <li> Agar physical (paper) contract note chahiye ho, to ₹20 per contract note charge hota hai. Courier charges alag se apply hote hain.</li>
            <li> NRI account (Non-PIS) ke liye equity trades par 0.5% ya ₹100 per executed order charge hota hai (jo bhi kam ho).</li>
            <li> NRI account (PIS) ke liye equity trades par 0.5% ya ₹200 per executed order charge hota hai (jo bhi kam ho).</li>
            <li> Agar account debit balance me ho, to har executed order par ₹20 ki jagah ₹40 charge</li>
            
          </ul>
          </a>
        </div>
        
       


      </div>
    </div>

  );
}
export default Brokerage;


