import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Menu />
      </div>
      <Footer />
    </div>
  );
}

export default App;
