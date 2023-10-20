import ingredientsCategoriesStyle from "./ingredients-categories.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import IngredientsCategoriesItem from "../ingredients-categories-item/ingredients-categories-item";
import { TIngredient } from "../../types/types";
import { FC, RefObject } from "react";

type TProps = {
  title: string;
  data: Array<TIngredient>;
  refTab?: RefObject<HTMLHeadingElement>;
}
const IngredientsCategories : FC<TProps> = (props) => {
  return (
    <>
    <h3 ref={props.refTab} className="text text_type_main-medium pb-6">
      {props.title}
    </h3>
    <div  className={`${ingredientsCategoriesStyle.card} pr-4 pl-4`}>
      {props.data.map((data, index) => (
        <IngredientsCategoriesItem key={data._id}  data = {data}/>
      ))}
    </div>
    </>
  );
};


export default IngredientsCategories;
