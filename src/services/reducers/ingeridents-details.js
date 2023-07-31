import { GET_INGREDIENT, CLEAR_INGREDIENT } from "../actions/ingredients-details"

const initialState = {
    ingredient: {},
    successModal: false,

}

export const ingredientsDetailsReducer = (state = initialState, action) => {
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
                ingredient: {},
                successModal: false
            }
        }

        default: {
            return state
        }
    }
}