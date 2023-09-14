import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./oreders-list.module.css";
import OrdersIngredients from "../orders-ingredients/orders-ingedients";
const OrdersListItem = ({ data, path}) => {
  const [state, setState] = useState({
    status: null,
    totalPrice: 0,
  });
  const { items } = useSelector((store) => store.ingredients);
  const exceptionalIngredients = data.ingredients.filter((item, index) => {
    return data.ingredients.indexOf(item) === index;
  });
  const counter = (id) => {
    return data.ingredients.filter((item) => item === id).length;
  };
  useMemo(() => {
    if (items.length !== 0) {
      const ingredient = data.ingredients.map((item) =>
        items.find((data) => data._id === item)
      );
        const totalPrice = ingredient.reduce((acc, item) => acc + item.price, 0);
      setState({ ...state, status: data.status, totalPrice: totalPrice });
    }
  }, [data.status]);
  return (
    <Link to={`${path}/${data._id}`} className={style.item}>
      <p className={`${style.number} text text_type_digits-default`}>
        #{data.number}
      </p>
      <p
        className={`${style.date} text text_type_main-default  text_color_inactive`}
      >
        <FormattedDate date={new Date(data.createdAt)} />
      </p>
      <p className={`${style.name} text_type_main-medium`}>{data.name}</p>
      {state.status === "pending" && (
        <p className={`${style.status} text_type_main-medium`}> Готовиться</p>
      )}
      {state.status === "done" && <p className={`${style.status} text_type_main-medium`}> Выполнен</p>}
      {state.status === "created" && (
        <p className={`${style.status}text_type_main-medium`}> Создан</p>
      )}
      <div className={style.ingredients}>
        {exceptionalIngredients.slice(0, 6).reverse().map((item) => {
         return <OrdersIngredients key={item} id={item} counter={counter(item)} />;
        })}
      </div>
      <div className={style.price}>
        <p className="text text_type_digits-medium">{state.totalPrice}</p>
        <CurrencyIcon />
      </div>
    </Link>
  );
};

export default OrdersListItem;
