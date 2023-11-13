import { FC } from "react";
import { TOrder } from "../../types/types";
import OrdersListItem from "../orders-list-item/orders-list-item";
import style from "./orders-list.module.css";

type TProps = {
  path: string;
  dataOrder: Array<TOrder>
}
const OrdersList: FC<TProps> = ({ path, dataOrder }) => {
  return (
    <>
      {dataOrder?.length === 0 ? (
        <p className={`${style.text} text text_type_main-medium`}> Здесь будет ваше история заказов</p>
      ) : (
        <ul className={`${style.list} custom-scroll`}>
          {dataOrder?.map((item) => (
            <OrdersListItem path={path} data={item} key={item._id} />
          ))}
        </ul>
      )}
    </>
  );
};

export default OrdersList;
