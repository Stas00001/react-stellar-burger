import React from "react";
import BurgerConstructorStyle from "./burger-construtor.module.css";
import PropTypes from "prop-types";
import IngredientItem from "../ingredient-item/ingredient-item";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
const BurgerConstructor = (props) => {
  const data = props.array;
  const { bun, ingredients } = React.useMemo(() => {
    return {
      bun: data.find((item) => item.type === "bun"),
      ingredients: data.filter((item) => item.type !== "bun"),
    };
  }, [data]);

  return (
    <div
      className={`${BurgerConstructorStyle.constructor} ml-4 mr-4 mb-10 mt-25`}
    >
        {bun && <ConstructorElement
          extraClass={`${BurgerConstructorStyle.constructor__item} mr-4`}
          type="top"
          isLocked={true}
          price={bun.price}
          text={`${bun.name} (вверх)`}
          thumbnail={bun.image}
        />}
      <div
        className={`${BurgerConstructorStyle.constructor__container}  mt-3 mb-3 custom-scroll`}
      >
        <IngredientItem  ingredients = {ingredients}/>
      </div>
        {bun && <ConstructorElement
          extraClass={`${BurgerConstructorStyle.constructor__item} mr-4`}
          type="bottom"
          isLocked={true}
          price={bun.price}
          text={`${bun.name} (низ)`}
          thumbnail={bun.image}
        />}
      <div className={`${BurgerConstructorStyle.constructor__price} mt-10`}>
        <p
          className={`${BurgerConstructorStyle.constructor__price_item} text text_type_digits-medium pr-10`}
        >
          {" "}
          600{" "}
          <span className="pl-1">
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <Button
          onClick={props.onClick}
          htmlType="button"
          type="primary"
          size="large"
        >
          Оформить заказ{" "}
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  array: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerConstructor;
