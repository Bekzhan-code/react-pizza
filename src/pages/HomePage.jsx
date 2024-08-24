import React from "react";
import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";

const Home = () => {
  return (
    <div>
      <div className="flex py-8 justify-between items-center">
        <Categories />
        <SortPopup />
      </div>
    </div>
  );
};

export default Home;
