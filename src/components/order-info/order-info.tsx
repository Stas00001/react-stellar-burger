import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useSelector } from "../../types/hooks";
import style from "./order.module.css";
import OrdersIngredients from "../orders-ingredients/orders-ingedients";
import { TIngredient, TOrder } from "../../types/types";
import { FC } from "react";
import Loader from "../UI/loader/loader";
type TProps = {
  data: Array<TOrder>;
  modal: boolean;
};

const OrderInfo: FC<TProps> = ({ data, modal }) => {
  const { id } = useParams();
  const { items } = useSelector((store) => store.ingredients);
  const orderData = data.find((item) => item._id === id);
  const ingredients = items.filter((item : TIngredient) => orderData?.ingredients.includes(item._id))
  const totalPrice = ingredients.reduce(
    (acc: number, item: TIngredient): number => acc + item.price,
    0
  );
  const counter = (id: string) => {
    return orderData?.ingredients.filter((item) => item === id).length;
  };
  const exceptionalIngredients = orderData?.ingredients.filter(
    (item, index) => {
      return orderData.ingredients.indexOf(item) === index;
    }
  );
  return (
    <>
      {orderData === undefined ? (
        <Loader />
      ) : (
        <div className={modal ? `${style.modal}` : `${style.container} mb-10`}>
          <p className={`${style} text text_type_digits-default mb-10`}>
            #{orderData.number}
          </p>
          <p className={`${style} text text_type_main-medium mb-3`}>
            {orderData.name}
          </p>
          {orderData.status === "pending" && (
            <p className={`${style.status} text text_type_main-medium mb-6`}>
              {" "}
              Готовиться
            </p>
          )}
          {orderData.status === "done" && (
            <p
              className={`${style.status} ${style.done} text text_type_main-medium mb-6`}
            >
              {" "}
              Выполнен
            </p>
          )}
          {orderData?.status === "created" && (
            <p className={`${style.status} text text_type_main-medium mb-6`}>
              {" "}
              Создан
            </p>
          )}
          <p className={`${style}  text text_type_main-medium mb-6`}>Состав:</p>
          <ul className={`${style.list} custom-scroll`}>
            {exceptionalIngredients?.map((item) => {
              const info = items.find((items) => items._id === item);
              return (
                <li className={`${style.item}`} key={info!._id}>
                  <div className={`${style.ingredient}`}>
                    <OrdersIngredients id={item} />
                    <p className="text text_type_main-default ml-4">
                      {info!.name}
                    </p>
                  </div>
                  <div className={`${style.price}`}>
                    <p className="text text_type_digits-default mr-2">
                      {counter(item)} x {info!.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={`${style["date-price"]}`}>
            <p className="text text_type_main-default">
              <FormattedDate date={new Date(orderData.createdAt)} />
            </p>
            <div className={style.price}>
              <p className="text text_type_digits-medium">{totalPrice}</p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderInfo;
