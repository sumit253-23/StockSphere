import React from 'react';

function Notfound() {
  return ( 
    <div className="container p-5" >
      <div className="row text-center">
         
 
        <h1 className='mt-5 mb-3'> 404 not found</h1>
        <p >
          Sorry the page you are looking for does not exist
        </p>
        <button className='p-2 btn btn-primary fs-19.2px mb-3' style={{width:'22%',margin:"0 auto" }}
        >Sign up for free 
        
        </button>
      </div>
    </div>
   );
}

export default Notfound;