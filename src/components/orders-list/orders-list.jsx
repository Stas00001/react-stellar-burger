import OrdersListItem from "../orders-list-item/orders-list-item";
import style from './orders-list.module.css'
const OrdersList = ({ path, dataOrder }) => {
  return (
    <ul className={`${style.list} custom-scroll`}>
      {dataOrder.orders?.map((item) => (
        <OrdersListItem path ={path} data={item} key={item._id} />
      ))}
    </ul>
  );
};

export default OrdersList;
