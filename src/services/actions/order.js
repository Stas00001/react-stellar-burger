import { postIngredients } from "../../utils/api";
import { token } from "./user";
export const POST_ORDER = 'POST_ORDER'
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDERS_FAILED'
export const CLEAR_ORDER = 'CLEAR_ORDER'
export const postOrder = (body) => {
    return (dispatch) => {
      dispatch({
        type: POST_ORDER_REQUEST
      });
      postIngredients(body)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: POST_ORDER_SUCCESS,
            order: res
          });
        }
      }).catch((e) => {
        if (e.message === "jwt expired" || "jwt malformed") {
          dispatch(token(postOrder()));
        }
        dispatch({
          type: POST_ORDER_FAILED
        });
        
      })
    };
  
}