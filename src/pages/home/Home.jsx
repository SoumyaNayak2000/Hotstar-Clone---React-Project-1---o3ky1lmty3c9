import React from "react";
import "./home.scss";
import Slider from "../home/heroBanner/Slider"
import ProductionHouse from "../home/heroBanner/ProductionHouse"
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

const Home = () => {
  return (
    <div className="homePage">
      <Slider/>
      <ProductionHouse/>
      <Trending />
      <Popular/>
      <TopRated/>
    </div>
  );
};

export default Home;