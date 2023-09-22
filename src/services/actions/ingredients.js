import { getIngredients } from "../../utils/api";
import { v4 as uuidv4 } from "uuid";

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";
export const DELETE_ITEM = "DELETE_ITEM";
export const ADD_ITEM = "ADD_ITEM";
export const ADD_BUN = "ADD_BUN";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const IS_SORT = "IS_SORT";
export const DECREASE_ITEM = "DECREASE_ITEM";
export const INCREASE_ITEM = "INCREASE_ITEM";
export const PRICE_INGREDIENTS = "PRICE_INGREDIENTS";
export const PRICE_BUN = "PRICE_BUN";
export const INCREASE_BUN = "INCREASE_BUN";
export const DECREASE_BUN = "DECREASE_BUN";
export const CHANGE_INGREDIENTS = "CHANGE_INGREDIENTS";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const getItems = () => {
  return (dispatch) => {
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

export const addIngredient = (item) => {
 
  return (dispatch) => {
    dispatch({
      type: ADD_INGREDIENTS,
      payload: {
        ...item,
        key: uuidv4()    
        }
    });
  };
};

export const changeIngredients = (dragIndex, hoverIndex, ingredients) => {
  const dragElement = ingredients[dragIndex];
  const newElements = [...ingredients];
  newElements.splice(dragIndex, 1);
  newElements.splice(hoverIndex, 0, dragElement);
  return (dispatch) => {
    dispatch({
      type: CHANGE_INGREDIENTS,
      newElements,
    });
  };
};
