import React from "react";
import Layout from "./layouts/Layout";
import { Link } from "react-router-dom";

import "../styles/HomeStyles.css";
import Sidebar from "./admin/Sidebar";

const Home = () => {
  return (
    <Layout>
      <div id="landing" style={{ position: "relative" }}>
        <h1
          style={{
            position: "absolute",
            top: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "9999",
            color: "black",
            fontFamily: "fantasy",
            fontSize: "210px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "white" }}>MART</span>
        </h1>
        <Link
          to="./Home"
          align="center"
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "9999",
            fontFamily: "fantasy",
            fontSize: "20px",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              border: "none",
              borderRadius: "10px",
              backgroundColor: "orange",
              padding: "10px 20px",
              color: "white",
            }}
          >
            ORDER NOW
          </button>
        </Link>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
          data-interval="2000"
          data-pause="false"
          style={{ width: "150%", marginTop: "10px" }}
        >
          <div className="carousel-inner background-color:black">
            <div className="carousel-item active">
              <div
                className="home"
                style={{
                  backgroundImage: `url(./85.jpg)`,
                  backgroundSize: "cover",
                  borderRadius: "50px",
                }}
              ></div>
            </div>
            <div className="carousel-item">
              <div
                className="home"
                style={{
                  backgroundImage: `url(/images/96.jpg)`,
                  margin: "0px",
                  backgroundSize: "cover",
                  borderRadius: "50px",
                }}
              ></div>
            </div>
            <div className="carousel-item">
              <div
                className="home"
                style={{
                  backgroundImage: `url(/images/99.jpg)`,
                  margin: "0px",
                  borderRadius: "50px",
                }}
              ></div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden"></span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden"></span>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
