import React from "react";
import style from './ingredient-item.module.css'
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
const IngredientItem = (props) => {
    const {ingredients} = props
    return (
        <ul className={`${style.constructor__list} mr-4`}>
        {ingredients.map((item, index) => (
      <li
        key={index}
        id={item._id}
        className={`${style["constructor__list-item"]}`}
      >
        <span id={item._id}>
          {" "}
          <DragIcon />
        </span>
        <ConstructorElement
          onClick={props.onClick}
          extraClass={`${style.constructor__item} mr-4`}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
        />
      </li>
        ))}
        </ul>
    );
  }

  IngredientItem.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  };

  export default IngredientItem