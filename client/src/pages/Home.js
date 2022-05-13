import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BuzCard from "../components/BuzCard";
import "../pages/Style/styles.min.css";

export default function Home() {
  return (
    <div>
      <Header />
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Talabk</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              With this shop hompeage template
            </p>
          </div>
        </div>
      </header>

      <section className="py-5">
        <div class="container mt-2 res-card">
          <div class="row">
            {/* example */}
            <BuzCard
              img="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg"
              tradeName="business name"
              type="coffe"
              Desc="This is a company that builds websites, web apps and e-commerce solutions."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
