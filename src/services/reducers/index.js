import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { ingredientsDetailsReducer } from './ingeridents-details';
import { orderReducer } from './order';
export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientsDetails: ingredientsDetailsReducer,
    order: orderReducer,
  });