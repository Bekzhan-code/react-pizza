import React, { useState } from "react";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories = () => {
  const [activeCategoryInd, setActiveCategoryInd] = useState(0);

  return (
    <ul className="flex gap-2">
      {categories.map((category, index) => (
        <li
          key={index}
          className={`font-semibold py-2 px-6 rounded-full cursor-pointer ${
            activeCategoryInd === index
              ? "bg-customBlack text-white"
              : "bg-white text-customBlack"
          }`}
          onClick={() => setActiveCategoryInd(index)}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
