"use client";
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import CustomToastContainer from "./components/CustomToastContainer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./pages/AdminDashboard";


const AppLayout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className={`${isLoginPage ? "" : "min-h-screen w-full"}`}>
    
      {!isLoginPage && <Header />}

      <div
        className={`${
          isLoginPage ? "" : "flex flex-col sm:flex-row max-w-full min-h-screen"
        }`}
      >
       
        {!isLoginPage && (
          <div className="w-[25%] mobile:hidden">
            <Sidebar />
          </div>
        )}

        <div
          className={`${
            isLoginPage
              ? "w-full mx-auto"
              : "w-full mx-auto py-20 px-16"
          }`}
        >
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <>
    <AppLayout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
      <CustomToastContainer />
    </AppLayout>
  </>
);

export default App;
