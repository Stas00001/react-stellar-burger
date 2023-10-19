import { getIngredients } from "../../utils/api";
import { v4 as uuidv4 } from "uuid";
import { TIngredient } from "../../types/types";
import { AppDispatch, AppThunk } from "../../types";
export const GET_ITEMS_REQUEST: "GET_ITEMS_REQUEST" = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS: "GET_ITEMS_SUCCESS" = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED: "GET_ITEMS_FAILED" = "GET_ITEMS_FAILED";
export const DELETE_ITEM: "DELETE_ITEM" = "DELETE_ITEM";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INGREDIENTS: "ADD_INGREDIENTS" = "ADD_INGREDIENTS";
export const DECREASE_ITEM: "DECREASE_ITEM" = "DECREASE_ITEM";
export const INCREASE_ITEM: "INCREASE_ITEM" = "INCREASE_ITEM";
export const PRICE_INGREDIENTS: "PRICE_INGREDIENTS" = "PRICE_INGREDIENTS";
export const PRICE_BUN: "PRICE_BUN" = "PRICE_BUN";
export const INCREASE_BUN: "INCREASE_BUN" = "INCREASE_BUN";
export const DECREASE_BUN: "DECREASE_BUN" = "DECREASE_BUN";
export const CHANGE_INGREDIENTS: "CHANGE_INGREDIENTS" = "CHANGE_INGREDIENTS";
export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";

export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}
export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  items: Array<TIngredient>;
}
export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
}

export interface IDeleteItem {
  readonly type: typeof DELETE_ITEM;
  keys: string
}
export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENTS;
  payload: TIngredient;
}
export interface IAddBun {
  readonly type: typeof ADD_BUN;
  ingredient: TIngredient
}

export interface IDecreaseItem {
  readonly type: typeof DECREASE_ITEM;
  id: string
}
export interface IDecreaseBun {
  readonly type: typeof DECREASE_BUN;
  item: TIngredient

}
export interface IIncreaseItem {
  readonly type: typeof INCREASE_ITEM;
  item: TIngredient

}
export interface IIncreaseBun {
  readonly type: typeof INCREASE_BUN;
  item: TIngredient
}


export interface IPriceIngredient {
  readonly type: typeof PRICE_INGREDIENTS
  payload: number
}

export interface IChangeIngredients {
  readonly type: typeof CHANGE_INGREDIENTS;
  newElements: Array<TIngredient>
} 

export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR
}

export type TIngredientsActions =
  | IGetItemsRequest
  | IGetItemsFailed
  | IGetItemsSuccess
  | IAddBun
  | IAddIngredient
  | IDecreaseBun
  | IDecreaseItem
  | IDeleteItem
  | IIncreaseItem
  | IIncreaseBun
  | IChangeIngredients
  | IClearConstructor;

export const getItems : AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getIngredients().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data,
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      }
    });
  };
};

export const addIngredient : AppThunk = (item: TIngredient) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: ADD_INGREDIENTS,
      payload: {
        ...item,
        key: uuidv4(),
      },
    });
  };
};

export const changeIngredients : AppThunk = (
  dragIndex: number,
  hoverIndex: number,
  ingredients: Array<TIngredient>
) => {
  const dragElement = ingredients[dragIndex];
  const newElements = [...ingredients];
  newElements.splice(dragIndex, 1);
  newElements.splice(hoverIndex, 0, dragElement);
  return (dispatch: AppDispatch) => {
    dispatch({
      type: CHANGE_INGREDIENTS,
      newElements,
    });
  };
};
