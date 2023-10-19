import React, { useMemo } from "react";
import BurgerConstructorStyle from "./burger-constructor.module.css";
import IngredientList from "../ingredient-list/ingredient-list";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../order-details/order-details";
import { useDispatch } from "react-redux";
import {
  ADD_BUN,
  DECREASE_BUN,
  INCREASE_ITEM,
  INCREASE_BUN,
  addIngredient,
} from "../../services/actions/ingredients";
import { postOrder } from "../../services/actions/order";
import LoaderText from "../UI/loader-text/loader-text";
import { useDrop } from "react-dnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../../utils/cooke";
import { useSelector } from "../../types/hooks";
import { TIngredient } from "../../types/types";
const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const isLogin = getCookie("accessToken");
  const { items, ingredients, bun } = useSelector((store) => store.ingredients);
  const { itemsRequest } = useSelector((store) => store.order);
  const totalPrice  = useMemo(() => {
    return items.reduce((acc: number, item: TIngredient) => acc + item.price * item.__v, 0);
  }, [items]);
  const addItem = (itemId : TIngredient) => {
    const result = items.filter((item) => item._id === itemId._id);
    const ingredientsResult = result.reduce((res, ingredient) => {
      if (ingredient.type === "bun") {
        dispatch({
          type: ADD_BUN,
          ingredient,
        });
      } else {
        dispatch(addIngredient(ingredient));
      }
      return {
        ...ingredient,
      };
    }, {});
  };

  const decrease = () => {
    dispatch({
      type: DECREASE_BUN,
    });
  };

  const increase = (itemId: TIngredient) => {
    items!
      .filter((item) => item._id === itemId._id)
      .reduce((item: any) : any=> {
        if (item.type === "bun") {
          decrease();
          dispatch({
            type: INCREASE_BUN,
            item,
          });
        } else {
          dispatch({
            type: INCREASE_ITEM,
            item,
          });
        }
      }, {});
  };
  const [{ isHover,  }, dropTarget] = useDrop({
    accept: "ingredients",
    drop(itemId : TIngredient) {
      addItem(itemId);
      increase(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleClick = () => {
    if (!bun) {
      toast("Добавьте булку!", {
        theme: "dark",
      });
    }
    if (ingredients.length === 0) {
      toast("Добавьте ингредиенты!", {
        theme: "dark",
      });
    }
    if (!isLogin) {
      toast("Необходимо авторизоваться!", {
        theme: "dark",
      });
    }
    const orderIngredients = ingredients.map((item) => item._id);
    if (bun !== undefined && bun !== null) {
      orderIngredients.push(bun._id);
    }
    if (bun && ingredients.length > 0 && isLogin) {
      dispatch(postOrder({ ingredients: orderIngredients }));
    }
  };

  const className = isHover ? "border" : "shadow";
  const notNull = ingredients.length > 0 || bun ? "" : className;
  return (
    <div
      ref={dropTarget}
      className={`${BurgerConstructorStyle.constructor} ${notNull} ml-4 mr-4 mb-10 mt-25`}
    >
      {bun && (
        <ConstructorElement
          extraClass={`${BurgerConstructorStyle.constructor__item}  mr-4`}
          type="top"
          isLocked={true}
          price={bun.price}
          text={`${bun.name} (вверх)`}
          thumbnail={bun.image}
        />
      )}
        <IngredientList />
      {bun && (
        <ConstructorElement
          extraClass={`${BurgerConstructorStyle.constructor__item}  mr-4`}
          type="bottom"
          isLocked={true}
          price={bun.price}
          text={`${bun.name} (низ)`}
          thumbnail={bun.image}
        />
      )}
      {(ingredients.length > 0 || bun) && (
        <div className={`${BurgerConstructorStyle.constructor__price} mt-10`}>
          <p
            className={`${BurgerConstructorStyle.constructor__price_item} text text_type_digits-medium pr-10`}
          >
            {totalPrice}
            <span className="pl-1">
              <CurrencyIcon type="primary" />
            </span>
          </p>
          <Button
            onClick={handleClick}
            htmlType="button"
            type="primary"
            size="large"
            disabled={itemsRequest}
          >
           {itemsRequest ? <LoaderText/> : 'Оформить заказ'} {" "}
          </Button>
          <ToastContainer theme="dark" />
        </div>
      )}

      <OrderDetails />
    </div>
  );
};

export default BurgerConstructor;
