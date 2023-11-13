import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { TOrder } from "../services/actions/order";
import { rootReducer } from "../services/reducers/index";
import { store } from "..";
import { TUserActions } from "../services/actions/user";
import { TIngredientsActions } from "../services/actions/ingredients";
import { TIngredientDetailsActions } from "../services/actions/ingredients-details";
import { TWsActions } from "../services/actions/ws-action";

export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions =
  | TOrder
  | TUserActions
  | TIngredientsActions
  | TIngredientDetailsActions
  | TWsActions

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch; 