import { TIngredient } from "../../types/types"
import { GET_INGREDIENT, CLEAR_INGREDIENT, TIngredientDetailsActions } from "../actions/ingredients-details"

type TInitialState = {
    ingredient: TIngredient | null;
    successModal: boolean;
}

const initialState : TInitialState = {
    ingredient: null,
    successModal: false,

}

export const ingredientsDetailsReducer = (state = initialState, action: TIngredientDetailsActions) => {
    switch (action.type) {
        case GET_INGREDIENT: {
            return {
            ...state,
            ingredient: action.item,
            successModal: true,

            }
        }

        case CLEAR_INGREDIENT: {
            return {
                ...state,
                ingredient: null,
                successModal: false
            }
        }

        default: {
            return state
        }
    }
}