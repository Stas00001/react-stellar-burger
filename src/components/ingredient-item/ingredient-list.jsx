import style from "./ingredient-list.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
const IngredientList = (props) => {
  const { ingredients } = props;
  return (
    <ul className={`${style.constructor__list} mr-4`}>
      {ingredients.map((item, index) => (
        <li
          key={index}
          id={item._id}
          className={`${style["constructor__list-item"]}`}
        >
          <span>
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
};

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default IngredientList;
