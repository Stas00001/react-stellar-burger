import React from "react";
import { useRef, useEffect, useState } from "react";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategories from "../ingredients-categories/ingredients-categories";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { GET_INGREDIENT } from "../../services/actions/ingredients-details";
const BurgerIngredient = (props) => {
  const {items} = useSelector(store => store.ingredients)
  const {ingredient, successModal} = useSelector(store => store.ingredientsDetails)
  const dispatch = useDispatch()
  const [modal, setModal] = React.useState(false);
  const [current, setCurrent] = React.useState("one");
  const {arrTypeBun, arrTypeMain, arrTypeSauce } = useMemo(() => {
    return {
     arrTypeBun: items.filter((item) => item.type === "bun"),
     arrTypeMain: items.filter((item) => item.type === "main"),
     arrTypeSauce: items.filter((item) => item.type === "sauce"),
    }
  
  }, [items])
  
 
  const refBun = React.useRef(null);
  const refSauce = React.useRef(null);
  const refMain = React.useRef(null);
  const containerRef = useRef(null)


  const handlerScroll = () => {
    const containerY = containerRef.current.getBoundingClientRect().y;
    const bunsOffset = Math.abs(refBun.current.getBoundingClientRect().y - containerY);
    const saucesOffset = Math.abs(refSauce.current.getBoundingClientRect().y - containerY);
    const mainOffset = Math.abs(refMain.current.getBoundingClientRect().y - containerY);

    if (bunsOffset < saucesOffset && bunsOffset < mainOffset) setCurrent('bun');
    if (saucesOffset < bunsOffset && saucesOffset < mainOffset) setCurrent('sauce');
    if (mainOffset < bunsOffset && mainOffset < saucesOffset) setCurrent('main');
  };


  const onClickCard = (e) => {
    const item = items.find((item) => item._id === e.currentTarget.id);
    dispatch({
      type: GET_INGREDIENT,
      item
    })
    handleOpenModalIngredient();
  }
  const handleOpenModalIngredient = () => {
    setModal(true);
  };
  const tabHandler = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth'});
  };

  const handleClick = (ref) => {
    tabHandler(ref);
  };


  return (
    <div className={`${burgerIngredientsStyle.ingredients} mt-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <div className={`${burgerIngredientsStyle.ingredients__tab} pb-10`}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => {
            setCurrent("bun");
            handleClick(refBun);
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => {
            setCurrent("sauce");
            handleClick(refSauce);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => {
            handleClick(refMain);
            setCurrent("main");
          }}
        >
          Начинки
        </Tab>
      </div>
      <div
      ref={containerRef} 
      className={`${burgerIngredientsStyle.ingredients__container} custom-scroll`}
      onScroll={handlerScroll}
      >
        <IngredientsCategories 
        refBun ={refBun} 
        title = 'Булки' 
        onClickCard={onClickCard} 
        data={arrTypeBun} />

        <IngredientsCategories
          refBun ={refSauce}
          title = 'Соусы' 
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
      <Modal active={modal} setActive={setModal}>
        {successModal && (
          <IngredientDetails
            data={ingredient}
          />
        )}
      </Modal>
    </div>
  );
};

export default BurgerIngredient;
