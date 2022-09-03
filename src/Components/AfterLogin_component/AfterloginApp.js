import "./AfterloginApp.css";
import React from "react";
import Header from "../Header_component/Header";
import Navbar from "../Navbar_component/Navbar";
import { Outlet } from "react-router-dom";

const AfterloginApp = () => {

  return (
    <div className="After-login-app-Container">
      <div className="position-header">
        <Header />
      </div>
      <div className="Navbar-align">
        <div className="Navbar">
          <Navbar />
        </div>
        <div className="Routed-Components">
          <Outlet />
        </div>
      </div>
    </div>
  );
  
};

export default AfterloginApp;
