import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import HomePage from "./landing_pages/home/HomePage";
import Login from "./landing_pages/login/Login";
import Signup from "./landing_pages/signup/Signup";
import AboutPage from "./landing_pages/about/AboutPage";
import ProductPage from "./landing_pages/product/ProductPage";
import PricingPage from "./landing_pages/pricing/PricingPage";
import SupportPage from "./landing_pages/support/SupportPage";
import Navbar from "./landing_pages/Navbar";
import Footer from "./landing_pages/Footer";
import Notfound from "./Notfound";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPage from "./dashboard/DashboardPage";

const App = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && <Navbar />}

      <div className={isDashboardRoute ? "" : "landing-page-shell"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>

      {!isDashboardRoute && <Footer />}
    </>
  );
};

export default App;
