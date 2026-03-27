import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  const tryDemoLink = tryDemo || "/product";
  const learnMoreLink = learnMore || "/product";
  const googlePlayLink = googlePlay || "https://play.google.com/store";
  const appStoreLink = appStore || "https://www.apple.com/app-store/";

  return(
    <div className="container mt-5">
      <div className="row">
        <div className="col-6   ">
          <img src={imageURL} alt={productName} />
        </div>

        <div className=" col-6 p-5 mt-5 ">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <div className="d-flex gap-5" >
            <a href={tryDemoLink}>Try Demo <i className="fa fa-long-arrow-right" aria-hidden="true"></i> </a>
          <a href={learnMoreLink} style={{marginLeft:"50px"}}>Learn More <i className="fa fa-long-arrow-right" aria-hidden="true"></i> </a>
          </div>
          <div className=" d-flex gap-5">
            <a href={googlePlayLink}><img src="media/images/googlePlayBadge.svg" alt={`${productName} on Google Play`} /></a>
          <a href={appStoreLink}><img src="media/images/appstoreBadge.svg" alt={`${productName} on the App Store`} /></a>
          </div>
        </div>

      </div>
    </div>
   
  );
}
export default LeftSection;
