import React from "react";
import BurgerConstructorStyle from "./burger-construtor.module.css";
import PropTypes from "prop-types";
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

  const ingeredients = ingredients.map((item, index) => {
    return (
      <li
        key={index}
        id={item._id}
        className={`${BurgerConstructorStyle["constructor__list-item"]}`}
      >
        <span id={item._id}>
          {" "}
          <DragIcon />
        </span>
        <ConstructorElement
          onClick={props.onClick}
          extraClass={`${BurgerConstructorStyle.constructor__item} mr-4`}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
        ></ConstructorElement>
      </li>
    );
  });
  const bunTop = () => {
    if (bun !== undefined) {
      return (
        <ConstructorElement
          extraClass={`${BurgerConstructorStyle.constructor__item} mr-4`}
          type="top"
          isLocked={true}
          price={bun.price}
          text={`${bun.name} (вверх)`}
          thumbnail={bun.image}
        ></ConstructorElement>
      );
    }
  };
  const bunBottom = () => {
    if (bun !== undefined) {
      return (
        <ConstructorElement
          extraClass={`${BurgerConstructorStyle.constructor__item} mr-4`}
          type="bottom"
          isLocked={true}
          price={bun.price}
          text={`${bun.name} (низ)`}
          thumbnail={bun.image}
        ></ConstructorElement>
      );
    }
  };

  return (
    <div
      className={`${BurgerConstructorStyle.constructor} ml-4 mr-4 mb-10 mt-25`}
    >
      <ConstructorElement
        extraClass={`${BurgerConstructorStyle.constructor__item} mr-4`}
        type="top"
        isLocked={true}
        price={1255}
        text={`Краторная булка N-200i (низ)`}
        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
      ></ConstructorElement>
      <div
        className={`${BurgerConstructorStyle.constructor__container}  mt-3 mb-3 custom-scroll`}
      >
        <ul className={`${BurgerConstructorStyle.constructor__list} mr-4`}>
          {ingeredients}
        </ul>
      </div>
      <ConstructorElement
        extraClass={`${BurgerConstructorStyle.constructor__item} mr-4`}
        type="bottom"
        isLocked={true}
        price={1255}
        text={`Краторная булка N-200i (вверх)`}
        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
      ></ConstructorElement>
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
