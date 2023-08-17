import React from "react";
import "./home.scss";
import Slider from "./homeComponents/Slider"
import ProductionHouse from "./homeComponents/ProductionHouse"
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