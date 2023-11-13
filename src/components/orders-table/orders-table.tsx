import { FC } from "react";
import { TOrder } from "../../types/types";
import style from "./orders-table.module.css";

type TProps = {
  arr: Array<TOrder>
  done?: boolean;
  status: string;
  name: string;
}

const OrdersTable :FC<TProps> = ({ arr, status, done, name }) => {
  const ready = arr.filter((item) => item.status === status);
  return (
    <div className={`${style.container}`}>
      <p className={`${style.name} text text_type_main-medium mb-6`}>
        {" "}
        {name}
      </p>
      <ul className={`${style.list}`}>
        {ready
          .slice(0, 10)
          .map((item, index) =>
            done ? (
              <li className={`${style.item} ${style.done} text text_type_digits-default`} key={index}>{item.number}</li>
            ) : (
              <li className={`${style.item} text text_type_digits-default`} key={index}>{item.number}</li>
            )
          )}
      </ul>
    </div>
  );
};

export default OrdersTable