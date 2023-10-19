import {
  registerUser,
  loginUser,
  refreshToken,
  forgotPasswordPost,
  getUser,
  patchUser,
  resetPasswordPost,
} from "../../utils/api";
import { setCookie } from "../../utils/cooke";
import { TLoginData } from "../../types/types";
import { AppDispatch, AppThunk } from "../../types";
import { FC } from "react";
export const REGISTER_USER_REQUEST: "REGISTER_USER_REQUEST" =
  "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS" =
  "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED: "REGISTER_USER_FAILED" =
  "REGISTER_USER_FAILED";
export const LOGIN_USER_FAILED: "LOGIN_USER_FAILED" = "LOGIN_USER_FAILED";
export const LOGIN_USER_REQUEST: "LOGIN_USER_REQUEST" = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS" = "LOGIN_USER_SUCCESS";
export const REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS" =
  "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED: "REFRESH_TOKEN_FAILED" =
  "REFRESH_TOKEN_FAILED";
export const REFRESH_TOKEN_REQUEST: "REFRESH_TOKEN_REQUEST" =
  "REFRESH_TOKEN_REQUEST";
export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" =
  "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" =
  "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" =
  "FORGOT_PASSWORD_FAILED";
export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";
export const PATCH_USER_REQUEST: "PATCH_USER_REQUEST" = "PATCH_USER_REQUEST";
export const PATCH_USER_SUCCESS: "PATCH_USER_SUCCESS" = "PATCH_USER_SUCCESS";
export const PATCH_USER_FAILED: "PATCH_USER_FAILED" = "PATCH_USER_FAILED";
export const POST_RESETPASSWORD_FAILED: "POST_RESETPASSWORD_FAILED" =
  "POST_RESETPASSWORD_FAILED";
export const POST_RESETPASSWORD_REQUEST: "POST_RESETPASSWORD_REQUEST" =
  "POST_RESETPASSWORD_REQUEST";
export const POST_RESETPASSWORD_SUCCESS: "POST_RESETPASSWORD_SUCCESS" =
  "POST_RESETPASSWORD_SUCCESS";
export const RESET_USER: "RESET_USER" = "RESET_USER";

export interface IRegisterRequest {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_USER_SUCCESS;
  payload: TLoginData;
}

export interface IRegisterFailed {
  readonly type: typeof REGISTER_USER_FAILED;
}

export interface ILoginUserRequest {
  readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILoginUserSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS;
  payload: TLoginData;
}
export interface ILoginUserFailed {
  readonly type: typeof LOGIN_USER_FAILED;
  payload: string
}
export interface IRefreshTokenRequest {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccess {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
}
export interface IRefreshTokenFailed {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  payload: TLoginData;
}

export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

export interface IPatchUserRequest {
  readonly type: typeof PATCH_USER_REQUEST;
}

export interface IPatchUserSuccess {
  readonly type: typeof PATCH_USER_SUCCESS;
  payload: TLoginData;
}

export interface IPatchUserFailed {
  readonly type: typeof PATCH_USER_FAILED;
}

export interface IResetPasswordRequest {
  readonly type: typeof POST_RESETPASSWORD_REQUEST;
}

export interface IResetPasswordSuccess {
  readonly type: typeof POST_RESETPASSWORD_SUCCESS;
  
}

export interface IResetPasswordFailed {
  readonly type: typeof POST_RESETPASSWORD_FAILED;
}

export interface IResetUser {
  readonly type: typeof RESET_USER;
}

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
} 

export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS
}

export interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED
}

export type TUserActions = IGetUserFailed
| IGetUserRequest 
| IGetUserSuccess
| ILoginUserFailed
| ILoginUserRequest
| ILoginUserSuccess
| IPatchUserRequest
| IPatchUserSuccess
| IPatchUserFailed
| IRefreshTokenRequest
| IRefreshTokenFailed
| IRefreshTokenSuccess
| IResetPasswordFailed
| IResetPasswordSuccess
| IResetPasswordRequest
| IResetUser
| IForgotPasswordFailed
| IForgotPasswordRequest
| IForgotPasswordSuccess
| IRegisterFailed
| IRegisterRequest
| IRegisterSuccess;
export const resetUser = () : IResetUser => ({
  type: RESET_USER,
});
export const registerUserSuccess = (payload: TLoginData) : IRegisterSuccess => ({
  type: REGISTER_USER_SUCCESS,
  payload,
});
export const registerUserRequest = () : IRegisterRequest => ({
  type: REGISTER_USER_REQUEST,
});
export const registerUserFailed = () : IRegisterFailed => ({
  type: REGISTER_USER_FAILED,
});
export const loginUserRequest = () : ILoginUserRequest => ({
  type: LOGIN_USER_REQUEST,
});
export const loginUserSuccess = (payload: TLoginData) : ILoginUserSuccess => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});
export const loginUserFailed = (payload:string) : ILoginUserFailed => ({
  type: LOGIN_USER_FAILED,
  payload
});
export const refreshTokenRequest = () : IRefreshTokenRequest => ({
  type: REFRESH_TOKEN_REQUEST,
});
export const refreshTokenSuccess = () : IRefreshTokenSuccess => ({
  type: REFRESH_TOKEN_SUCCESS,
});
export const refreshTokenFailed = () : IRefreshTokenFailed => ({
  type: REFRESH_TOKEN_FAILED,
});
export const forgotPasswordRequest = () : IForgotPasswordRequest => ({
  type: FORGOT_PASSWORD_REQUEST,
});
export const forgotPasswordSuccess = () : IForgotPasswordSuccess => ({
  type: FORGOT_PASSWORD_SUCCESS,
});
export const forgotPasswordFailed = () : IForgotPasswordFailed => ({
  type: FORGOT_PASSWORD_FAILED,
});
export const getUserRequest = () : IGetUserRequest => ({
  type: GET_USER_REQUEST,
});
export const getUserSuccess = (payload: TLoginData) : IGetUserSuccess => ({
  type: GET_USER_SUCCESS,
  payload,
});
export const getUserFailed = () : IGetUserFailed => ({
  type: GET_USER_FAILED,
});

export const patchUserRequest = () : IPatchUserRequest => ({
  type: PATCH_USER_REQUEST,
});
export const patchUserSuccess = (payload : TLoginData) : IPatchUserSuccess=> ({
  type: PATCH_USER_SUCCESS,
  payload,
});
export const patchUserFailed = () : IPatchUserFailed  => ({
  type: PATCH_USER_FAILED,
});
export const postResetPasswordSuccess = () : IResetPasswordSuccess => ({
  type: POST_RESETPASSWORD_SUCCESS,
});
export const postResetPasswordFailed = () : IResetPasswordFailed => ({
  type: POST_RESETPASSWORD_FAILED,
});
export const postResetPasswordRequest = () : IResetPasswordRequest => ({
  type: POST_RESETPASSWORD_REQUEST,
});
export const register : AppThunk = (body: {email: string, password: string, name: string}) => {
  return (dispatch : AppDispatch) => {
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

export const login : AppThunk = (body : {email: string, password: string}) => {
  return (dispatch : AppDispatch) => {
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
        dispatch(loginUserFailed(e));
      });
  };
};

export const token : AppThunk = (update : FC) => {
  return (dispatch : AppDispatch) => {
    dispatch(refreshTokenRequest());
    refreshToken()
      .then((res) => {
        if (res && res.success) {
          dispatch(refreshTokenSuccess());
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
          dispatch(update);
        }
      })
      .catch((e) => {
        dispatch(refreshTokenFailed());
      });
  };
};

export const forgotPassword : AppThunk = (body : {email: string}) => {
  return (dispatch : AppDispatch) => {
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
export const getUserData : AppThunk = () => {
  return (dispatch : AppDispatch) => {
    dispatch(getUserRequest());
    getUser()
      .then((res) => {
        if (res && res.success) {
          dispatch(getUserSuccess(res));
        }
      })
      .catch((e) => {
        if (e.message === "jwt expired" || "jwt malformed") {
          dispatch(token(getUserData()));
        }
        dispatch(getUserFailed());
      });
  };
};

export const updateUser : AppThunk = (body:{email: string, name: string, password?:string}) => {
  return (dispatch : AppDispatch) => {
    dispatch(patchUserRequest());
    patchUser(body)
      .then((res) => {
        if (res && res.success) {
          dispatch(patchUserSuccess(res));
        }
      })
      .catch((e) => {
        if (e.message === "jwt expired" || "jwt malformed") {
          dispatch(token(updateUser()));
        }
        dispatch(patchUserFailed());
      });
  };
};

export const resetPassword : AppThunk = (body:{password: string, token: string}) => {
  return (dispatch : AppDispatch) => {
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
