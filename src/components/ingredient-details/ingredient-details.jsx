import React from "react";
import popupStyle from "./ingredient-details.module.css";
import { ingredientPropType } from "../../utils/prop-types";

const IngredientDetails = (props) => {
  const ingredients = props.data;
  return (
    <div className={`${popupStyle.popup__ingredient}`}>
      <p className={`text text_type_main-large`}>Детали ингредиента</p>
      <img
        className={`${popupStyle.popup__image} pb-4`}
        src={ingredients.image}
        alt={ingredients.name}
      />
      <p
        className={`${popupStyle.popup__text} text text_type_main-medium mb-8`}
      >
        {ingredients.name}
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
            {ingredients.calories}
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
            {ingredients.proteins}
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
            {ingredients.fat}
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
            {ingredients.carbohydrates}
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
