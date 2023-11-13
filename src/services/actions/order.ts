import { postIngredients } from "../../utils/api";
import { token } from "./user";
import { AppDispatch, AppThunk } from "../../types";
export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDERS_FAILED' = 'POST_ORDERS_FAILED'
export const CLEAR_ORDER: 'CLEAR_ORDER' = 'CLEAR_ORDER'

export interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_REQUEST
}
export interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS
  order: object
  number: number
}
export interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_FAILED
}

export interface IClearOrder {
  readonly type: typeof CLEAR_ORDER
}
export type TOrder = IClearOrder 
| IPostOrderFailed
| IPostOrderSuccess
| IPostOrderRequest
export const postOrder : AppThunk = (body: Array<string>)  => {
    return (dispatch: AppDispatch) => {
      dispatch({
        type: POST_ORDER_REQUEST
      });
      postIngredients(body)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: POST_ORDER_SUCCESS,
            order: res,
            number: res.order.number
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