import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import qs from "qs";
import axios from "axios";

import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import PizzaCard from "../components/PizzaCard";
import { Skeleton } from "../components/PizzaCard/Skeleton";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { setFilters } from "../redux/slices/filterSlice";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isSearch = useRef(true);
  const isMounted = useRef(false);

  const { categoryInd, sortBy } = useSelector((state) => state.filter);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    // получение параметров фильтрации из адресной строки и изменение их в редаксе
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
      isSearch.current = false;
    }
  }, []);

  useEffect(() => {
    // проверка нужно ли отправлять запрос на полуение пицц
    // при получении параметров и изменение данных в редаксе, вызывается текущий useEffect, который повторно отправляет запрос на те же данные
    if (isSearch.current) {
      axios
        .get(
          `https://eaed36219e51a8b4.mokky.dev/items?${
            categoryInd !== 0 ? `category=${categoryInd}` : ""
          }&sortBy=${sortBy}`
        )
        .then((res) => {
          setItems(res.data);
          setIsLoading(false);
        });
    }
    isSearch.current = true;

    // берет параметры фильтрации и вставляет ее в адресную строку
    // если приложение первый раз грузится тогда не вставляет параметры в адресную строку
    if (isMounted.current) {
      const queryStr = qs.stringify({
        categoryInd,
        sortBy,
      });
      navigate(`?${queryStr}`);
    }
    isMounted.current = true;
  }, [categoryInd, sortBy]);

  return (
    <div>
      <div className="flex py-8 justify-between items-center md:flex-col md:gap-4">
        <Categories />
        <SortPopup />
      </div>

      <h1 className="text-3xl font-bold mb-9 md:hidden">Все пиццы</h1>

      <div className="grid place-items-center grid-cols-4 gap-y-9 pb-24 2xl:grid-cols-3 xl:grid-cols-2 md:grid-cols-1">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : items.map((pizza) => <PizzaCard key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
