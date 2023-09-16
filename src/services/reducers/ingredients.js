import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  DELETE_ITEM,
  ADD_BUN,
  ADD_INGREDIENTS,
  DECREASE_ITEM,
  INCREASE_ITEM,
  PRICE_BUN,
  PRICE_INGREDIENTS,
  INCREASE_BUN,
  DECREASE_BUN,
  CHANGE_INGREDIENTS,
  CLEAR_CONSTRUCTOR
} from "../actions/ingredients";
const initialState = {
  items: [],
  bun: null,
  ingredients: [],
  price: [],
  itemsRequest: false,
  itemsFailed: false,
  success: false,
  constructor: false,
  constructorNull: true,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false,
        success: true,
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false,
        success: false,
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (item) => item.key !== action.keys
        ),
      };
    }
    case ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: action.ingredient,
      };
    }

    case INCREASE_BUN: {
      return {
        ...state,
        items: [...state.items].map((item) =>
        item._id === action.item._id ? { ...item, __v: 2} : item
      ),
      };
    }

    case DECREASE_BUN: {
      return {
        ...state,
        items: [...state.items].map((item) =>
        item.type === 'bun' ? { ...item, __v: 0} : item
      ),
      }
    }

    case INCREASE_ITEM: {
      return {
        ...state,
        items: [...state.items].map((item) =>
          item._id === action.item._id ? { ...item, __v: ++item.__v } : item
        ),
      };
    }
    case DECREASE_ITEM: {
      return {
        ...state,
        items: [...state.items].map((item) =>
          item._id === action.id ? { ...item, __v: --item.__v } : item
        ),
      };
    }

    case PRICE_BUN: {
      return {
        ...state,
        price: [action.payload * 2],
      };
    }

    case PRICE_INGREDIENTS: {
      return {
        ...state,
        price: [...state.price, action.payload],
      };
    }
    
    case CHANGE_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.newElements
      }
    }    
   
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [],
        bun: null,
        items: [...state.items].map((item) => 
        item.__v > 0 ? { ...item, __v: 0} : item
        )
      }
    }

    default: {
      return state;
    }
  }
};
