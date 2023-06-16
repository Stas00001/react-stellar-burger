import React from "react";
import BurgerConstructorStyle from "./burger-constructor.module.css";
import IngredientList from "../ingredient-item/ingredient-list";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  SelectedIngredientsContext,
  OrderContext,
} from "../../services/use-context";
import { postIngredients } from "../../utils/api";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function reducer(state, action) {
  switch (action.type) {
    case "ingredients":
      return {
        ...state,
        price: [...state.price, action.payload],
      };
    case "bun":
      return {
        ...state,
        price: [action.payload * 2],
      };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const BurgerConstructor = () => {
  const initialState = { price: [] };
  const [priceState, priceDispatcher] = React.useReducer(reducer, initialState);
  const [order, setOrder] = React.useContext(OrderContext);
  const [modalOrder, setModalOrder] = React.useState(false);
  const [selectedIngredients] = React.useContext(
    SelectedIngredientsContext
  );
  const { typeBun, typeIngredients } = React.useMemo(() => {
    if (selectedIngredients.bun) {
      priceDispatcher({ type: "bun", payload: selectedIngredients.bun.price });
    }
    selectedIngredients.ingredients.reduce((res, ingredient) => {
      priceDispatcher({ type: "ingredients", payload: ingredient.price });
    }, {});
    return {
      typeBun: selectedIngredients.bun,
      typeIngredients: selectedIngredients.ingredients,
    };
  }, [selectedIngredients]);

  const price = React.useMemo(() => {
    const sum = priceState.price.reduce((currentSum, currentNumber) => {
      return currentSum + currentNumber;
    }, 0);
    return sum;
  }, [priceState]);
  const handleOpenModalOrder = () => {
    setModalOrder(true);
  };

  const handleCloseOrder = () => {
    setModalOrder(false);
  };

  const handleClick = () => {
    const orderIngredients = typeIngredients.map((item) => item._id);
    if (typeBun !== undefined) {
      orderIngredients.push(typeBun._id);
    }
    postIngredients({ ingredients: orderIngredients })
      .then((data) => {
        setOrder(data);
      })
      .then(() => {
        handleOpenModalOrder();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div
      className={`${BurgerConstructorStyle.constructor} ml-4 mr-4 mb-10 mt-25`}
    >
      {typeBun && (
        <ConstructorElement
          extraClass={`${BurgerConstructorStyle.constructor__item} mr-4`}
          type="top"
          isLocked={true}
          price={typeBun.price}
          text={`${typeBun.name} (вверх)`}
          thumbnail={typeBun.image}
        />
      )}
      <div
        className={`${BurgerConstructorStyle.constructor__container}  mt-3 mb-3 custom-scroll`}
      >
        <IngredientList ingredients={typeIngredients} />
      </div>
      {typeBun && (
        <ConstructorElement
          extraClass={`${BurgerConstructorStyle.constructor__item} mr-4`}
          type="bottom"
          isLocked={true}
          price={typeBun.price}
          text={`${typeBun.name} (низ)`}
          thumbnail={typeBun.image}
        />
      )}
      <div className={`${BurgerConstructorStyle.constructor__price} mt-10`}>
        <p
          className={`${BurgerConstructorStyle.constructor__price_item} text text_type_digits-medium pr-10`}
        >
          {price}
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

      <Modal active={modalOrder} setActive={setModalOrder}>
        <OrderDetails popupClose={handleCloseOrder} />
      </Modal>
    </div>
  );
};

export default BurgerConstructor;
