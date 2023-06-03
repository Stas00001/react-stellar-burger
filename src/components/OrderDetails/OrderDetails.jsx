import React from "react";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import popupStyle from './OrderDetails.module.css'
const OrderDetails = (props) => {
    return (
        <div className={`${popupStyle.popup} pb-30 pt-30`}>
            <p className={`${popupStyle['popup__text-number']} text text_type_digits-large pb-8`}>034536</p>
            <p className={`text text_type_main-medium pb-15`}>идентификатор заказа</p>
            <button onClick={props.popupClose} className={`${popupStyle.popup__button} `}> 
            <span class={popupStyle.checkmark}>
            <div class={popupStyle.checkmark_stem}></div>
            <div class={popupStyle.checkmark_kick}></div>
            </span>            
             </button>
            <p className={`text text_type_main-small pt-15`}>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-small text_color_inactive pt-2`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails