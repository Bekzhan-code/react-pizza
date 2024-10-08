import React, { useState } from "react";

import { useAppDispatch } from "../../redux/store";
import { addItem } from "../../redux/slices/cartSlice";
import { useSelector } from "react-redux";

// TODO
// НУЖНО ПЕРЕНЕСТИ ЭТИ ЗНАЧЕНИЯ В ОТДЕЛЬНЫЙ ФАЙЛ ДЛЯ ДОСТУПА ИЗ ОДНОГО МЕСТА
const types = ["тонкое", "традиционное"];
const sizes = [26, 30, 40];

const PizzaCard = ({ id, title, imageUrl, price }) => {
  const [activeTypeId, setActiveTypeId] = useState(0);
  const [activeSizeId, setActiveSizeId] = useState(1);

  const itemCount = useSelector((state) =>
    state.cart.items
      .filter((item) => item.id === id)
      .reduce((acc, item) => acc + item.count, 0)
  );

  const dispatch = useAppDispatch();

  const handleAddItem = () => {
    dispatch(
      addItem({
        id,
        title,
        imageUrl,
        price,
        type: types[activeTypeId],
        size: sizes[activeSizeId],
      })
    );
  };

  const handleChangeSize = (sizeId) => {
    if (sizeId === 0 && activeTypeId === 0) setActiveTypeId(1);
    setActiveSizeId(sizeId);
  };

  return (
    <div className="flex flex-col items-center max-w-72">
      <img src={imageUrl} alt="pizza card" />
      <h3 className="text-lg font-extrabold min-h-16 text-center">{title}</h3>
      <div className="text-sm font-bold mb-4 w-full bg-gray-200 rounded p-2">
        <ul className="flex gap-2 mb-2 text-center">
          {types.map((type, i) => (
            <li
              className={`py-2 w-1/2  rounded cursor-pointer transition  ${
                activeTypeId === i ? "shadow-sm bg-white" : ""
              } ${
                activeSizeId === 0 && i === 0
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : ""
              }`}
              key={i}
              onClick={() => setActiveTypeId(i)}
            >
              {type}
            </li>
          ))}
        </ul>
        <ul className="flex gap-2 text-center">
          {sizes.map((size, i) => (
            <li
              className={`py-2 w-1/3 rounded cursor-pointer transition ${
                activeSizeId === i ? "shadow-sm bg-white" : ""
              }`}
              key={i}
              onClick={() => handleChangeSize(i)}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center w-full">
        <span className="text-2xl font-bold">от {price} ₽</span>
        <button
          className="flex gap-2 items-center rounded-full py-2 px-3 font-bold text-customLightOrange border border-customLightOrange transition hover:bg-customLightOrange hover:text-white"
          onClick={handleAddItem}
        >
          <svg
            className="hover:text-white"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="#EB5A1E"
            />
          </svg>
          <span>Добавить</span>
          {itemCount ? (
            <span className="text-sm text-white bg-customLightOrange rounded-full text-center w-5 h-5">
              {itemCount}
            </span>
          ) : (
            ""
          )}
        </button>
      </div>
    </div>
  );
};

export default PizzaCard;
