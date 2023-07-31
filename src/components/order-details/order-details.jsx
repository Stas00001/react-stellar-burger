import React from "react";
import popupStyle from "./order-details.module.css";
import done from "../../images/done.svg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const OrderDetails = (props) => {
  const { order } = useSelector((store) => store.order);
  return (
    <div className={`${popupStyle.popup} pb-30 pt-30`}>
      {order && (
        <p
          className={`${popupStyle["popup__text-number"]} text text_type_digits-large pb-8`}
        >
          {order.order.number}
        </p>
      )}
      <p className={`text text_type_main-medium pb-15`}>идентификатор заказа</p>
      <img src={done} alt="" onClick={props.popupClose} />
      <p className={`text text_type_main-small pt-15`}>
        Ваш заказ начали готовить
      </p>
      <p className={`text text_type_main-small text_color_inactive pt-2`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
OrderDetails.propTypes = {
  popupClose: PropTypes.func.isRequired,
};

export default OrderDetails;