function Hero() {
  return (
    <div className="container">
      <div className="row mt-5 ">
        <p className=" text-center fs-3">
          We pioneered the discount broking model in India. Now, <br></br>we are breaking ground with our technology.
        </p>
      </div>

      <div className="row p-5 mt-5 border-top text-muted">
        <div className="col-6 p-5">
          <p>
            We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology.
          </p>
          <p>
            Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India
          </p>
          <p>
            Over 1.6+ crore clients place billions of orders every year through our powerful ecosystem.
          </p>
        </div>

        <div className="col-6 p-5">
          <p>
            In addition, we run a number of popular open online educational and community initiatives.
          </p>
          <p>
            <a href="/about" style={{ textDecoration: "none" }}>Rainmatter</a>, our fintech fund and incubator.
          </p>
          <p>
            We are always up to something new every day.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
