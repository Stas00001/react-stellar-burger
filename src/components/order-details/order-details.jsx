import React from "react";
import popupStyle from "./order-details.module.css";
import done from "../../images/done.svg";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/modal";
import { CLEAR_ORDER } from "../../services/actions/order";
import { CLEAR_CONSTRUCTOR } from "../../services/actions/ingredients";
const OrderDetails = (props) => {
  const { order } = useSelector((store) => store.order);
  const [modalOrder, setModalOrder] = React.useState(false);
  const dispatch = useDispatch()
  React.useEffect(() => {
    if(order) {
        setModalOrder(true);
    } 
  }, [order])
  
  React.useEffect(() => {
    if(!modalOrder) {
      setTimeout(() => {
        dispatch({
          type: CLEAR_ORDER
        })
        dispatch({
          type: CLEAR_CONSTRUCTOR
        })
      }, 300)
    }
  }, [modalOrder])
  

  return (
    <Modal active={modalOrder} setActive={setModalOrder}>
    <div className={`${popupStyle.popup} pb-30 pt-30`}>
      {order && (
        <p
          className={`${popupStyle["popup__text-number"]} text text_type_digits-large pb-8`}
        >
          {order.order.number}
        </p>
      )}
      <p className={`text text_type_main-medium pb-15`}>идентификатор заказа</p>
      <img src={done} alt="done" onClick={() => setModalOrder(false)} />
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
