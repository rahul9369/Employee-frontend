import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => (
  <div className="App">
    <Navbar />
    <Outlet /> {/* This renders the child routes */}
  </div>
);

export default AppLayout;
