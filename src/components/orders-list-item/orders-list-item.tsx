import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./oreders-list.module.css";
import OrdersIngredients from "../orders-ingredients/orders-ingedients";
import { TOrder } from "../../types/types";
import { useSelector } from "../../types/hooks";

type TProps= {
  path: string,
  data: TOrder
}

type TStatus = {
  status: string | null;
  totalPrice: number
}
const OrdersListItem: FC<TProps> = ({ data, path }) => {
  const location = useLocation();
  const [state, setState] = useState<TStatus>({
    status: null,
    totalPrice: 0,
  });
  const { items } = useSelector((store) => store.ingredients);
  const exceptionalIngredients = data.ingredients.filter((item, index) => {
    return data.ingredients.indexOf(item) === index;
  });
  const counter = (id:string) => {
    return data.ingredients.filter((item) => item === id).length;
  };
  useMemo(() => {
    if (items!.length !== 0) {
      const ingredient = data.ingredients.map((item) =>
        items!.find((data) => data._id === item)
      ).filter(Boolean);
      const totalPrice = ingredient?.reduce((acc, item) => acc + item?.price!, 0);
      setState({ ...state, status: data.status, totalPrice: totalPrice });
    }
  }, [data.status]);



  return (
    <li>
      <Link
        to={`${path}/${data._id}`}
        state={{ background: location }}
        className={style.item}
      >
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
        {state.status === "done" && (
          <p className={`${style.status} text_type_main-medium`}> Выполнен</p>
        )}
        {state.status === "created" && (
          <p className={`${style.status}text_type_main-medium`}> Создан</p>
        )}
        <div className={style.ingredients}>
          {exceptionalIngredients
            .slice(0, 6)
            .reverse()
            .map((item) => {
              return (

                <OrdersIngredients
                  key={item}
                  id={item}
                  counter={counter(item)}
                />
              );
            })}
        </div>
        <div className={style.price}>
          <p className="text text_type_digits-medium">{state.totalPrice}</p>
          <CurrencyIcon type="primary"/>
        </div>
      </Link>
    </li>
  );
};

export default OrdersListItem;
