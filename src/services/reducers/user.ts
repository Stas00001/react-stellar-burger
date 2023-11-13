import {
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REFRESH_TOKEN_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  PATCH_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  POST_RESETPASSWORD_FAILED,
  POST_RESETPASSWORD_SUCCESS,
  POST_RESETPASSWORD_REQUEST,
  RESET_USER,
  TUserActions,
} from "../actions/user";

type TInitialState = {
  user: {email: string,
    name: string},
  registerRequest: boolean,
  registerFailed: boolean,
  registerSucces: boolean,
  loginRequest: boolean,
  loginFailed: boolean,
  loginSucces: boolean,
  tokenRequest: boolean,
  tokenFailed: boolean,
  tokenSuccess: boolean,
  forgotPasswordRequest: boolean,
  forgotPasswordFailed: boolean,
  forgotPasswordSuccess: boolean,
  getUserFailed: boolean,
  getUserSuccess: boolean,
  getUserRequest: boolean,
  patchUserFailed: boolean,
  patchUserSuccess: boolean,
  patchUserRequest: boolean,
  postResetPasswordFailed: boolean,
  postResetPasswordSuccess: boolean,
  postResetPasswordRequest: boolean,
  error: string | null,
}
const initialState : TInitialState = {
  user: {
    email: "",
    name: ""
  },
  registerRequest: false,
  registerFailed: false,
  registerSucces: false,
  loginRequest: false,
  loginFailed: false,
  loginSucces: false,
  tokenRequest: false,
  tokenFailed: false,
  tokenSuccess: false,
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  forgotPasswordSuccess: false,
  getUserFailed: false,
  getUserSuccess: false,
  getUserRequest: false,
  patchUserFailed: false,
  patchUserSuccess: false,
  patchUserRequest: false,
  postResetPasswordFailed: false,
  postResetPasswordSuccess: false,
  postResetPasswordRequest: false,
  error: null,
};

export const userReducer = (state = initialState, action:TUserActions) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        registerFailed: false,
        user: action.payload.user,
        registerRequest: false,
        registerSuccess: true,
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
        registerSuccess: false,
      };
    }

    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false
      };
    }

    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loginFailed: false,
        user: action.payload.user,
        loginRequest: false,
        loginSucces: true,
      };
    }

    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
        loginSucces: false,
        error: action.payload,
      };
    }

    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        tokenFailed: true,
        tokenRequest: false,
        tokenSuccess: false,
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        tokenFailed: false,
        tokenRequest: true,
        tokenSuccess: false,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        tokenFailed: false,
        tokenRequest: false,
        tokenSuccess: true,
      };
    }

    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: false,
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordFailed: false,
        forgotPasswordRequest: true,
        forgotPasswordSuccess: false,
      };
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordFailed: false,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: true,
      };
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        getUserFailed: true,
        getUserRequest: false,
        getUserSuccess: false,
      };
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserFailed: false,
        getUserRequest: false,
        getUserSuccess: true,
        user: {
          email: action.payload.user.email,
          name: action.payload.user.name,
          password: "",
        },
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserFailed: false,
        getUserRequest: true,
        getUserSuccess: false,
      };
    }

    case PATCH_USER_FAILED: {
      return {
        ...state,
        patchUserFailed: true,
        patchUserRequest: false,
        patchUserSuccess: false,
      };
    }

    case PATCH_USER_REQUEST: {
      return {
        ...state,
        patchUserFailed: false,
        patchUserRequest: true,
        patchUserSuccess: false,
      };
    }

    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        patchUserFailed: false,
        patchUserRequest: false,
        patchUserSuccess: true,
        user: action.payload.user,
      };
    }

    case POST_RESETPASSWORD_FAILED: {
      return {
        ...state,
        postResetPasswordFailed: true,
        postResetPasswordRequest: false,
        postResetPasswordSuccess: false,
      };
    }
    case POST_RESETPASSWORD_SUCCESS: {
      return {
        ...state,
        postResetPasswordFailed: false,
        postResetPasswordRequest: false,
        postResetPasswordSuccess: true,
      };
    }
    case POST_RESETPASSWORD_REQUEST: {
      return {
        ...state,
        postResetPasswordFailed: false,
        postResetPasswordRequest: true,
        postResetPasswordSuccess: false,
      };
    }

    case RESET_USER: {
      return {
        ...state,
        user: {},
      };
    }
    default: {
      return state;
    }
  }
};
