import {
  registerUser,
  loginUser,
  refreshToken,
  forgotPasswordPost,
  getUser,
  patchUser,
  resetPasswordPost,
} from "../../utils/api";
import { getCookie, setCookie } from "../../utils/cooke";
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";
export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const PATCH_USER_REQUEST = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS";
export const PATCH_USER_FAILED = "PATCH_USER_FAILED";
export const POST_RESETPASSWORD_FAILED = "POST_RESETPASSWORD_FAILED";
export const POST_RESETPASSWORD_REQUEST = "POST_RESETPASSWORD_REQUEST";
export const POST_RESETPASSWORD_SUCCESS = "POST_RESETPASSWORD_SUCCESS";
export const RESET_USER = "RESET_USER";

export const resetUser = () => ({
  type: RESET_USER,
});
export const registerUserSuccess = (payload) => ({
  type: REGISTER_USER_SUCCESS,
  payload,
});
export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
});
export const registerUserFailed = () => ({
  type: REGISTER_USER_FAILED,
});
export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});
export const loginUserSuccess = (payload) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});
export const loginUserFailed = () => ({
  type: LOGIN_USER_FAILED,
});
export const refreshTokenRequest = () => ({
  type: REFRESH_TOKEN_REQUEST,
});
export const refreshTokenSuccess = () => ({
  type: REFRESH_TOKEN_SUCCESS,
});
export const refreshTokenFailed = () => ({
  type: REFRESH_TOKEN_FAILED,
});
export const forgotPasswordRequest = () => ({
  type: FORGOT_PASSWORD_REQUEST,
});
export const forgotPasswordSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS,
});
export const forgotPasswordFailed = () => ({
  type: FORGOT_PASSWORD_FAILED,
});
export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});
export const getUserSuccess = (payload) => ({
  type: GET_USER_SUCCESS,
  payload,
});
export const getUserFailed = () => ({
  type: GET_USER_FAILED,
});

export const patchUserRequest = () => ({
  type: PATCH_USER_REQUEST,
});
export const patchUserSuccess = (payload) => ({
  type: PATCH_USER_SUCCESS,
  payload,
});
export const patchUserFailed = () => ({
  type: PATCH_USER_FAILED,
});
export const postResetPasswordSuccess = () => ({
  type: POST_RESETPASSWORD_SUCCESS,
});
export const postResetPasswordFailed = () => ({
  type: POST_RESETPASSWORD_FAILED,
});
export const postResetPasswordRequest = () => ({
  type: POST_RESETPASSWORD_REQUEST,
});
export const register = (body) => {
  return (dispatch) => {
    dispatch(refreshTokenRequest());
    registerUser(body)
      .then((res) => {
        if (res && res.success) {
          dispatch(registerUserSuccess(res));
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
        }
      })
      .catch((e) => {
        dispatch(registerUserFailed());
      });
  };
};

export const login = (body) => {
  return (dispatch) => {
    dispatch(loginUserRequest());
    loginUser(body)
      .then((res) => {
        if (res && res.success) {
          dispatch(loginUserSuccess(res));
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
        } else if (res.status !== 200) {
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch(loginUserFailed());
      });
  };
};

export const token = () => {
  return (dispatch) => {
    dispatch(refreshTokenRequest());
    refreshToken()
      .then((res) => {
        if (res && res.success) {
          dispatch(refreshTokenSuccess());
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
        }
      })
      .catch((e) => {
        dispatch(refreshTokenFailed());
      });
  };
};

export const forgotPassword = (body) => {
  return (dispatch) => {
    dispatch(forgotPasswordRequest());
    forgotPasswordPost(body)
      .then((res) => {
        if (res && res.success) {
          dispatch(forgotPasswordSuccess());
        }
      })
      .catch((e) => {
        dispatch(forgotPasswordFailed());
      });
  };
};
export const getUserData = () => {
  return (dispatch) => {
    dispatch(getUserRequest());
    getUser()
      .then((res) => {
        if (res && res.success) {
          dispatch(getUserSuccess(res));
        }
      })
      .catch((e) => {
        dispatch(getUserFailed());
        dispatch(token());
        dispatch(getUserData());
      });
  };
};

export const updateUser = (body) => {
  return (dispatch) => {
    dispatch(patchUserRequest());
    patchUser(body)
      .then((res) => {
        if (res && res.success) {
          dispatch(patchUserSuccess(res));
        }
      })
      .catch((e) => {
        dispatch(patchUserFailed());
        dispatch(token());
        dispatch(updateUser());
      });
  };
};

export const resetPassword = (body) => {
  return (dispatch) => {
    dispatch(postResetPasswordRequest());
    resetPasswordPost(body)
      .then((res) => {
        if (res && res.success) {
          dispatch(postResetPasswordSuccess());
        }
      })
      .catch((e) => {
        dispatch(POST_RESETPASSWORD_FAILED);
      });
  };
};
