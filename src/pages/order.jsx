import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import style from '../components/order-info/order.module.css'
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/actions/ws-action";
import OrderInfo from "../components/order-info/order-info";
import Loader from "../components/UI/loader/loader";
const Order = ({ data, wsStart, wsClose }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (data === null) {
      dispatch({ type: wsStart });
      return () => dispatch({ type: wsClose });
    }
  }, []);

  return <div className={style.order}>{data ? <OrderInfo data={data} /> : <Loader />}</div>;
};

export default Order;
