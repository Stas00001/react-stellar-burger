import React from "react";
import BurgerConstructorStyle from "./burger-construtor.module.css";
import IngredientItem from "../ingredient-item/ingredient-item";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import { IngredientsContext, IngredientsItemContext, OrderContext, PriceContext } from "../../utils/use-context";
import { postIngredients } from "../../utils/api";


const BurgerConstructor = (props) => {
  const [order, setOrder] = React.useContext(OrderContext)
  const [priceState, priceDispatcher] = React.useContext(PriceContext)
  const [state, setState] = React.useContext(IngredientsContext);
  const [ingredientsItem, setIngredients] = React.useContext(IngredientsItemContext);
  const { bun, ingredients } = React.useMemo(() => {
    return {
      bun: ingredientsItem.find((item) => item.type === "bun"),
      ingredients: ingredientsItem.filter((item) => item.type !== "bun"),
    };
  }, [ingredientsItem]);

  const orderIngredients = ingredients.map((item) => item._id) 
  const orderArray = () => {
    if(bun !==undefined) {     
      orderIngredients.push(bun._id)
    }
  }

  orderArray()

  const price = () => {
    const sum = priceState.price.reduce( (currentSum, currentNumber) => {
      return currentSum + currentNumber 
    }, 0)
    return sum

  }
 const handleClick = () => {
    props.onClick()
    postIngredients({ingredients: orderIngredients})
    .then((data) => {
      setOrder(
        data
      )
      console.log(order)
    })
    .catch((e)=> {
      console.error(e)
    })

  }


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
          {price()}
          <span className="pl-1">
            <CurrencyIcon type="primary" />
          </span>
        </p>
        <Button
          onClick={handleClick}
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



export default BurgerConstructor;
