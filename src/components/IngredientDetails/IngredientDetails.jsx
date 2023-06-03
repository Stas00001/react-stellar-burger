import React from "react";
import popupStyle from './IngredientDetails.module.css'
const IngredientDetails = (props) => {
    const data = props.data.ingeredients
    return (
          <div className={`${popupStyle.popup__ingeredient}`}>
                <p className={`text text_type_main-large`}>Детали ингредиента</p>
                <img className={`${popupStyle.popup__image} pb-4`} src={data.image} alt={data.name} />
                <p className={`${popupStyle.popup__text} text text_type_main-medium mb-8`}>{data.name}</p>
                <ul className={`${popupStyle.popup__list} mb-15`}>
                    <li><p className={`${popupStyle.popup__text} text text_type_main-default text_color_inactive`}>Калории,ккал</p><p className={`${popupStyle.popup__text} text text_type_digits-default text_color_inactive`}>{data.calories}</p></li>
                    <li><p className={`${popupStyle.popup__text} text text_type_main-default text_color_inactive`}>Белки, г</p><p className={`${popupStyle.popup__text} text text_type_digits-default text_color_inactive`}>{data.proteins}</p></li>
                    <li><p className={`${popupStyle.popup__text} text text_type_main-default text_color_inactive`}>Жиры, г</p><p className={`${popupStyle.popup__text} text text_type_digits-default text_color_inactive`}>{data.fat}</p></li>
                    <li><p className={`${popupStyle.popup__text} text text_type_main-default text_color_inactive`}>Углеводы, г</p><p className={`${popupStyle.popup__text} text text_type_digits-default text_color_inactive`}>{data.carbohydrates}</p></li>
                </ul>
           </div>     
    )
}

export default IngredientDetails