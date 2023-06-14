import React from "react";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategories from "../ingredients-categories/ingredients-categories";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { IngredientsContext, IngredientsItemContext, PriceContext } from "../../utils/use-context";
const BurgerIngredient = ({modal, setModal, handleOpenModalIngredient} ,props) => {
  const [state, setState] = React.useContext(IngredientsContext);

  const [ingredients, setIngredients] = React.useContext(IngredientsItemContext)
  const [priceState, priceDispatcher] = React.useContext(PriceContext)

  const data = state.data.data;
  const arrTypeBun = data.filter((item) => item.type === "bun");
  const arrTypeMain = data.filter((item) => item.type === "main");
  const arrTypeSauce = data.filter((item) => item.type === "sauce");
  const [current, setCurrent] = React.useState("one");
  const refBun = React.useRef(null);
  const refSauce = React.useRef(null);
  const refMain = React.useRef(null);

  const onClickCard = (e) => {
    const result = data.filter((item) => item._id === e.currentTarget.id);
    const ingredientsResult = result.reduce((res, ingredient) => {
      if (ingredient.type === 'bun') {
        priceDispatcher({type: 'bun', payload: ingredient.price})

      } else {
      priceDispatcher({type: 'ingredients', payload: ingredient.price})
      } 
      return{
        ...ingredient
      }
    }, {});
   
    setIngredients([...ingredients, ingredientsResult])
    // handleOpenModalIngredient();
    // setModal({
    //     ...modal,
    //     successModal: true,
    //     ingredient: ingredientsResult,
    //   });
  }

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
        onClickCard={onClickCard} 
        data={arrTypeBun} />
        
        <IngredientsCategories
          refBun ={refSauce} 
          title = 'Соусы' 
          increment={props.increment}
          count={props.count}
          onClickCard={onClickCard}
          data={arrTypeSauce}
        />
        <IngredientsCategories
          refBun ={refMain} 
          title = 'Начинки' 
          onClickCard={onClickCard}
          data={arrTypeMain} 
          />
      </div>
    </div>
  );
};

export default BurgerIngredient;
