import React, { useState } from "react";
import { useAppDispatch } from "../redux/store";
import { setSortType } from "../redux/slices/filterSlice";

// const sortOptions = ["популярности", "цене", "алфавиту"];
const sortOptions = [
  {
    name: "популярности",
    sortBy: "rating",
  },
  {
    name: "цене",
    sortBy: "price",
  },
  {
    name: "алфавиту",
    sortBy: "title",
  },
];

const SortPopup = () => {
  const [activeSortInd, setActiveSortInd] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useAppDispatch();

  const handleSortType = (index) => {
    setActiveSortInd(index);
    dispatch(setSortType(sortOptions[index].sortBy));
  };

  return (
    <div
      className="flex justify-between items-center gap-2 text-sm relative cursor-pointer"
      onClick={() => setIsVisible(!isVisible)}
    >
      <svg
        className={`${isVisible ? "rotate-180" : ""}`}
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
          fill="#2C2C2C"
        />
      </svg>
      <span className=" font-bold">Сортировка по:</span>
      <span className="text-customOrange">
        {sortOptions[activeSortInd].name}
      </span>

      {isVisible && (
        <ul className="absolute top-10 left-24 rounded-xl bg-white py-3 shadow-lg ">
          {sortOptions.map((obj, index) => (
            <li
              className={`py-2 px-4 cursor-pointer hover:bg-orange-50 ${
                activeSortInd === index ? "font-bold text-customOrange" : ""
              }`}
              key={index}
              onClick={() => handleSortType(index)}
            >
              {obj.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortPopup;
