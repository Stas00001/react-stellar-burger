import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { ingredientsDetailsReducer } from './ingeridents-details';
import { orderReducer } from './order';
import { userReducer } from './user';
import { socketAuthMiddlewareReducer } from './socket-auth-middleware';
import { socketMiddlewareReducer } from './socket-middleware';
export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientsDetails: ingredientsDetailsReducer,
    order: orderReducer,
    user: userReducer,
    ws: socketMiddlewareReducer,
    wsAuth: socketAuthMiddlewareReducer,

  });