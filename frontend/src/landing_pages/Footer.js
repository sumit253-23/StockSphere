import React from 'react';

function Footer() {
  return (  
    <div className='container border-top mt-5'style={{backgroundColor:"#f5f5f5"}}>
      <div className='row mt-5'style={{textDecoration:"none"}}>
        <div className="col">
  <img
    src="/media/images/brandlogo.png"
    alt="StockSphere logo"
    style={{ width: "60%" }}
  />

  <p className="fontSize:20">© 2010 - 2025, StockSphere Broking Ltd.</p>

  <p>All rights reserved.</p>

  <ul
    style={{
      display: "flex",
      justifyContent: "space-between",
      listStyle: "none",
      padding: 0,
      width: "70%"
    }}
  >
    <li><i className="fa fa-twitter-square" aria-hidden="true"></i></li>
    <li><i className="fa fa-facebook-official" aria-hidden="true"></i></li>
    <li><i className="fa fa-instagram" aria-hidden="true"></i></li>
    <li><i className="fa fa-linkedin-square" aria-hidden="true"></i></li>
  </ul>
</div>
        <div className='col ' >
          <p>Account</p>
          <a href="/signup" >Open demat account</a><br />
          <a href="/signup">NRI demat account</a><br />
          <a href="/signup">Minor demat account</a><br />
          <a href="/product">Commodity</a><br />
          <a href="/support">Dematerialisation</a><br />
          <a href="/support">Fund transfer</a><br />
          <a href="/product">MTF</a><br />
          <a href="/signup">Referral program</a>
        </div>
        <div className='col'>
          <p>Support</p>
         <a href="/support">Support portal</a><br />
         <a href="/support">How to file a complaint?</a><br />
         <a href="/support">Status of your complaints</a><br />
         <a href="/support">Bulletin</a><br />
         <a href="/support">Circular</a><br />
         <a href="/about">Z-Connect blog</a><br />
         <a href="/support">Downloads</a>
        </div>
        <div className='col'>
          <p>Company</p>
           <a href="/about">Philosophy</a><br />
           <a href="/about">Press & media</a><br />
           <a href="/about">Careers</a><br />
           <a href="/about">StockSphere Cares (CSR)</a><br />
           <a href="/product">StockSphere.tech</a><br />
           <a href="/product">Open source</a>
        </div>
        <div className='col'>
          <p>Quick Links</p>
           
           <a href="/product">Upcoming IPOs</a><br />
           <a href="/pricing">Brokerage charges</a><br />
           <a href="/product">Market holidays</a><br />
           <a href="/product">Economic calendar</a><br />
           <a href="/pricing">Calculators</a><br />
           <a href="/product">Markets</a><br />
           <a href="/product">Sectors</a>
        </div>
      </div>
         <div className='col mt-5 text-small text-muted' style={{fontSize:"12px"}}>
          <p>StockSphere Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through StockSphere Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Registered Address: StockSphere Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to <a href="mailto:complaints@stocksphere.com">complaints@stocksphere.com</a>, for DP related to dp@stocksphere.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF</p>
         <p>Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances

</p>
         <p><a href="/support">Smart Online Dispute Resolution | Grievances Redressal Mechanism</a></p>
         <p>Investments in securities market are subject to market risks; read all the related documents carefully before investing.</p>
         <p>Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.</p>
         <p>India's largest broker based on networth as per NSE. <a href="/about">NSE broker factsheet</a></p>
         <p>"Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of StockSphere and offering such services, please create a ticket here.</p>
         <p>*Customers availing insurance advisory services offered by Ditto (Tacterial Consulting Private Limited | IRDAI Registered Corporate Agent (Composite) License No CA0738) will not have access to the exchange investor grievance redressal forum, SEBI SCORES/ODR, or arbitration mechanism for such products.

</p>

         </div>
         <div className='col'style={{display:"flex", justifyContent:"space-between"}}>
          <a href="/about">NSE</a><br></br>
          <a href="/about">BSE</a><br></br>
          <a href="/about">MCX</a><br></br>
          <a href="/about">Terms & conditins</a><br></br>
          <a href="/about">Policies & Procedure</a><br></br>
          <a href="/about">Privacy policy</a><br></br>
          

         </div>

    </div>
  );
}

export default Footer;
