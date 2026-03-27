import  React from 'react';

function RightSection({ imageURL, productName, productDescription, learnMore }) {
  const learnMoreLink = learnMore || "/product";

  return (
    <div className="container mt-5">
      <div className="row">

        <div className="col p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>

          <div className="d-flex gap-5">
            <a href={learnMoreLink}>
              Learn More <i className="fa fa-long-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="col-6">
          <img src={imageURL} alt={productName} />
        </div>

      </div>
    </div>
  );
}

export default RightSection;
