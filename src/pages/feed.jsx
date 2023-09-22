import { useDispatch, useSelector } from "react-redux";
import style from "./feed.module.css";
import {
  wsConnectionStart,
  wsConnectionClosed,
  WS_CONNECTION_CLOSED,
} from "../services/actions/ws-action";
import { useEffect } from "react";
import { WS_CONNECTION_START } from "../services/actions/ws-action";
import OrdersList from "../components/orders-list/orders-list";
import OrdersTable from "../components/orders-table/orders-table";
import Loader from "../components/UI/loader/loader";
const Feed = ({ path }) => {
  const data = useSelector((store) => store.ws);
  const orders = useSelector((store) => store.ws.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    if (orders === null) {
      dispatch({
        type: WS_CONNECTION_START,
      });
    }
    return () =>
      dispatch({
        type: WS_CONNECTION_CLOSED,
      });
  }, [dispatch]);

  return (
    <div className={style.container}>
      {orders ? (
        <>
          <h2 className="text text_type_main-large mt-10 mb-5">
            Лента заказов
          </h2>

          <div className={style.block}>
            <div className={style.block__orders}>
              <OrdersList path={path} dataOrder={data}></OrdersList>
            </div>
            <div className={`${style["block__orders-info"]}`}>
              <div className={`${style.order__status} mb-15`}>
                {orders ? (
                  <>
                    <OrdersTable
                      done
                      arr={orders}
                      status={"done"}
                      name={"Готовы:"}
                    />
                    <OrdersTable
                      arr={orders}
                      status={"pending"}
                      name={"В работе:"}
                    />
                  </>
                ) : null}
              </div>
              <h2 className={`${style} text text_type_main-medium`}>
                Выполнено за все время:
              </h2>
              <p
                className={`${
                  style[`text-shadow`]
                } text text_type_digits-large mb-15`}
              >
                {data.total}
              </p>
              <h2 className={`${style} text text_type_main-medium`}>
                Выполнено за сегодня:
              </h2>
              <p
                className={`${
                  style[`text-shadow`]
                } text text_type_digits-large`}
              >
                {data.totalToday}
              </p>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Feed;
