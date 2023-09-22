import React from "react";
import popupStyle from "./order-details.module.css";
import done from "../../images/done.svg";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/modal";
import { CLEAR_ORDER } from "../../services/actions/order";
import { CLEAR_CONSTRUCTOR } from "../../services/actions/ingredients";
const OrderDetails = () => {
  const { order } = useSelector((store) => store.order);
  const isModalOrder = Boolean(order);
  const dispatch = useDispatch();
  const close = () => {
      dispatch({
        type: CLEAR_ORDER,
      });
      dispatch({
        type: CLEAR_CONSTRUCTOR,
      });

  };
  
  return (
        <Modal
          active={isModalOrder}
          handleModalClose={close}
        >
          <div className={`${popupStyle.popup} pb-30 pt-30`}>
            {order && (
              <p
                className={`${popupStyle["popup__text-number"]} text text_type_digits-large pb-8`}
              >
                {order.order.number}
              </p>
            )}
            <p className={`text text_type_main-medium pb-15`}>
              идентификатор заказа
            </p>
            <img src={done} alt="done" onClick={close} />
            <p className={`text text_type_main-small pt-15`}>
              Ваш заказ начали готовить
            </p>
            <p className={`text text_type_main-small text_color_inactive pt-2`}>
              Дождитесь готовности на орбитальной станции
            </p>
          </div>
        </Modal>
  );
};

export default OrderDetails;
