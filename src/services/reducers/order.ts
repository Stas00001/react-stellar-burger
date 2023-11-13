import {
  POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  CLEAR_ORDER,
  TOrder
} from "../actions/order";

type TInitialState = {
  order: {} | null;
  itemsRequest: boolean,
  itemsFailed: boolean,
  number: string | null
}

const initialState : TInitialState= {
  order: null,
  itemsRequest: false,
  itemsFailed: false,
  number: null
};

export const orderReducer = (state = initialState, action: TOrder) => {
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
        number: action.number,
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

    case CLEAR_ORDER: {
      return {
        ...state,
        order: null,
      }
    }

    default: {
      return state;
    }
  }
};
