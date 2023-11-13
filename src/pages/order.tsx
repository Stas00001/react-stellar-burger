import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FC, useEffect } from "react";
import style from "../components/order-info/order.module.css";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/actions/ws-action";
import OrderInfo from "../components/order-info/order-info";
import Loader from "../components/UI/loader/loader";
import { TOrder } from "../types/types";

type TProps  = {
  data: Array<TOrder>;
  wsStart: string,
  wsClose: string,
  modal: boolean 
}
const Order: FC<TProps> = ({ data, wsStart, wsClose, modal }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (data === null) {
      dispatch({ type: wsStart });
    }
    return () => {dispatch({ type: wsClose })};

  }, []);
  return (
    <>
      { data ? (
        <OrderInfo data={data} modal ={modal}/>
      ) : (
        <div className={style.order}>
          <Loader />{" "}
        </div>
      )}
    </>
  );
};

export default Order;
