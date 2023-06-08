import React from "react";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategories from "../ingredients-categories/ingredients-categories";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
const BurgerIngredient = (props) => {
  const data = props.ingredients;
  const arrTypeBun = data.filter((item) => item.type === "bun");
  const arrTypeMain = data.filter((item) => item.type === "main");
  const arrTypeSauce = data.filter((item) => item.type === "sauce");
  const [current, setCurrent] = React.useState("one");
  const refBun = React.useRef(null);
  const refSauce = React.useRef(null);
  const refMain = React.useRef(null);

  const tabHandler = (ref) => {
    ref.current.scrollIntoView();
  };

  const handleClick = (ref) => {
    tabHandler(ref);
  };
  return (
    <div className={`${burgerIngredientsStyle.ingredients} mt-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <div className={`${burgerIngredientsStyle.ingredients__tab} pb-10`}>
        <Tab
          value="one"
          active={current === "one"}
          onClick={() => {
            setCurrent("one");
            handleClick(refBun);
          }}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === "two"}
          onClick={() => {
            setCurrent("two");
            handleClick(refSauce);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === "three"}
          onClick={() => {
            handleClick(refMain);
            setCurrent("three");
          }}
        >
          Начинки
        </Tab>
      </div>
      <div
        className={`${burgerIngredientsStyle.ingredients__container} custom-scroll`}
      >
       
        <IngredientsCategories 
        refBun ={refBun} 
        title = 'Булки' 
        onClickCard={props.onClickCard} 
        data={arrTypeBun} />
        
        <IngredientsCategories
          refBun ={refSauce} 
          title = 'Соусы' 
          increment={props.increment}
          count={props.count}
          onClickCard={props.onClickCard}
          data={arrTypeSauce}
        />
        <IngredientsCategories
          refBun ={refMain} 
          title = 'Начинки' 
          onClickCard={props.onClickCard}
          data={arrTypeMain} 
          />
      </div>
    </div>
  );
};

BurgerIngredient.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  onClickCard: PropTypes.func.isRequired
};

export default BurgerIngredient;
