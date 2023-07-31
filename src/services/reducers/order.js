import { POST_ORDER_FAILED, POST_ORDER_REQUEST,POST_ORDER_SUCCESS } from "../actions/order";

const initialState = {
    order: null,
    itemsRequest: false,
    itemsFailed: false,
    
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case POST_ORDER_REQUEST: {
        return {
          ...state,
          itemsRequest: true,
        };
      }
      case POST_ORDER_SUCCESS: {
        return {
          ...state,
          itemsFailed: false,
          order: action.order,
          itemsRequest: false,
        };
      }
      case POST_ORDER_FAILED: {
        return {
          ...state,
          itemsFailed: true,
          itemsRequest: false,
        };
      }

      default: {
        return state;
      }
    }
}