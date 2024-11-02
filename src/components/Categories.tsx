import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { setCategoryInd } from "../redux/slices/filterSlice";

const categories = ["Все", "Мясные", "Колбасные", "Сырные", "Микс", "Острые"];

const Categories = () => {
  // const [activeCategoryInd, setActiveCategoryInd] = useState(0);
  const activeCategoryInd = useSelector((state) => state.filter.categoryInd);
  const dispatch = useAppDispatch();

  return (
    <ul className="grid grid-flow-col gap-2 xl:grid-rows-2">
      {categories.map((category, index) => (
        <li
          key={index}
          className={`font-semibold py-2 px-6 rounded-full cursor-pointer text-center transition md:text-sm ${
            activeCategoryInd === index
              ? "bg-customBlack text-white"
              : "bg-white text-customBlack"
          }`}
          onClick={() => dispatch(setCategoryInd(index))}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
