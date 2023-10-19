import { TIngredient } from "../../types/types";

export const GET_INGREDIENT: "GET_INGREDIENT" = "GET_INGREDIENT";
export const CLEAR_INGREDIENT: "CLEAR_INGREDIENT" = "CLEAR_INGREDIENT";

export interface IGetIngredient {
  readonly type: typeof GET_INGREDIENT;
  item: TIngredient
}

export interface IClearIngredient {
  readonly type: typeof CLEAR_INGREDIENT;
}

export type TIngredientDetailsActions = IGetIngredient | IClearIngredient;
