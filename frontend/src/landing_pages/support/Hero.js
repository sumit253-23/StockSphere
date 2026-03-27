import React from "react";

function Hero(){
  return (
     <section className="container-fluid" id="supportHero">
      <div className=" p-5"id="supportWrapper">
        <h4 className="">Support Portal</h4>
        <a href="/support" style={{color:"white"}}>Track Ticket</a>
      </div>
      <div className="row  p-5 ">
        <div className="col-6 ">
           <h1 className="fs-5 ">Search for an answer or browse help topics to create a ticket</h1>
           
           <input placeholder="Eg. how do I activate F&O"></input>
           <br/>
            <a href="/support"> Track account opening</a>
            <a href="/support"> Track segment activation</a>
            <a href="/support"> Intraday margins</a>
            <a href="/support"> Kite user manual</a>
            <a href="/support"> Learn how to create a ticket</a>

          

        </div>
        <div className="col-6  " >
          <h1 className="fs-5">Featured</h1>
          <ol>
            <li><a className="" href="/support">Current - Takeover and Delisting - January 2026 update</a>
          </li>
          <li><a href="/support">Latest Intraday Leverage MIS & CO</a></li>
          </ol>
        </div>
        
      </div>
     </section>
  );
}
export default Hero;
