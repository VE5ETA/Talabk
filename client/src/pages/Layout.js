import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <div className="App">
      <ToastContainer newestOnTop={true} limit={1} />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
