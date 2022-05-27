import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <ToastContainer theme={"dark"} newestOnTop={true} limit={1} />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
