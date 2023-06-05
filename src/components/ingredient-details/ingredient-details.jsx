import React from "react";
import PropTypes from "prop-types";
import popupStyle from "./ingredient-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientDetails = (props) => {
  const ingeredients = props.data;
  return (
    <div className={`${popupStyle.popup__ingeredient}`}>
      <p className={`text text_type_main-large`}>Детали ингредиента</p>
      <img
        className={`${popupStyle.popup__image} pb-4`}
        src={ingeredients.image}
        alt={ingeredients.name}
      />
      <p
        className={`${popupStyle.popup__text} text text_type_main-medium mb-8`}
      >
        {ingeredients.name}
      </p>
      <ul className={`${popupStyle.popup__list} mb-15`}>
        <li>
          <p
            className={`${popupStyle.popup__text} text text_type_main-default text_color_inactive`}
          >
            Калории,ккал
          </p>
          <p
            className={`${popupStyle.popup__text} text text_type_digits-default text_color_inactive`}
          >
            {ingeredients.calories}
          </p>
        </li>
        <li>
          <p
            className={`${popupStyle.popup__text} text text_type_main-default text_color_inactive`}
          >
            Белки, г
          </p>
          <p
            className={`${popupStyle.popup__text} text text_type_digits-default text_color_inactive`}
          >
            {ingeredients.proteins}
          </p>
        </li>
        <li>
          <p
            className={`${popupStyle.popup__text} text text_type_main-default text_color_inactive`}
          >
            Жиры, г
          </p>
          <p
            className={`${popupStyle.popup__text} text text_type_digits-default text_color_inactive`}
          >
            {ingeredients.fat}
          </p>
        </li>
        <li>
          <p
            className={`${popupStyle.popup__text} text text_type_main-default text_color_inactive`}
          >
            Углеводы, г
          </p>
          <p
            className={`${popupStyle.popup__text} text text_type_digits-default text_color_inactive`}
          >
            {ingeredients.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};
IngredientDetails.propTypes = {
  data: ingredientPropType.isRequired,
};

export default IngredientDetails;
