import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import PizzaCard from "../components/PizzaCard";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://eaed36219e51a8b4.mokky.dev/items")
      .then((res) => res.json())
      .then((arr) => setItems(arr));
  }, []);

  return (
    <div>
      <div className="flex py-8 justify-between items-center md:flex-col md:gap-4">
        <Categories />
        <SortPopup />
      </div>

      <h1 className="text-3xl font-bold mb-9 md:hidden">Все пиццы</h1>

      <div className="grid place-items-center grid-cols-4 gap-y-9 pb-24 2xl:grid-cols-3 xl:grid-cols-2 md:grid-cols-1">
        {items.map((pizza) => (
          <PizzaCard key={pizza.id} {...pizza} />
        ))}
      </div>
    </div>
  );
};

export default Home;
