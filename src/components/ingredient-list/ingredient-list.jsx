import style from "./ingredient-list.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import { useDispatch, useSelector } from "react-redux";
import { changeIngredients } from "../../services/actions/ingredients";
import { useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const IngredientList = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((store) => store.ingredients);
  const moveElement = (dragIndex, hoverIndex) => {
    dispatch(changeIngredients(dragIndex, hoverIndex, ingredients));
  };
  const renderElement = useCallback(
    (item, index) => {
      return (
        <IngredientItem
          moveElement={moveElement}
          index={index}
          key={item.key}
          item={item}
          id={item._id}
          keys={item.key}
        />
      );
    },
    [ingredients]
  );
  return (
    <ul className={`${style.constructor__list} custom-scroll  mt-3 mb-3`}>
    {ingredients.map((item, index) => renderElement(item, index))}
  </ul>
  );
};


export default IngredientList;
