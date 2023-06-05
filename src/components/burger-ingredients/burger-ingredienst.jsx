import React from "react";
import burgerIngeredienstStyle from "./burger-ingeredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Card from "../card/card";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
const BurgerIngeredienst = (props) => {
  const data = props.ingeredienst;
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
    <div className={`${burgerIngeredienstStyle.ingeredients} mt-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <div className={`${burgerIngeredienstStyle.ingeredients__tab} pb-10`}>
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
        className={`${burgerIngeredienstStyle.ingeredients__conteiner} custom-scroll`}
      >
        <h3 ref={refBun} className="text text_type_main-medium pb-6">
          Булки
        </h3>
        <Card onClickCard={props.onClickCard} data={arrTypeBun} />
        <h3 ref={refSauce} className="text text_type_main-medium pt-10 pb-6">
          Соусы
        </h3>
        <Card
          increment={props.increment}
          count={props.count}
          onClickCard={props.onClickCard}
          data={arrTypeSauce}
        />
        <h3 ref={refMain} className="text text_type_main-medium pt-10 pb-6">
          Начинки
        </h3>
        <Card onClickCard={props.onClickCard} data={arrTypeMain} />
      </div>
    </div>
  );
};

BurgerIngeredienst.propTypes = {
  ingeredienst: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerIngeredienst;
