import { TIngredient } from "../types/types";
import { getCookie } from "./cooke";

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;
type TForgotPasswordPostResponse = TServerResponse<{
  message: string;
}>;
type TRegisterResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: {
    name: string;
    email: string;
  };
}>;
type TResetPasswordResponse = TServerResponse<{
  message: string;
}>;
type TPostIngredientResponse = TServerResponse<{
  name: string;
  order: {
    createdAt: string;
    ingredients: TIngredient[];
    name: string;
    number: number;
    owner: {
      name: string;
      email: string;
    };
    price: number;
    status: string;
    updatedAt: string;
    _id: string
  }
}>;
type TLoginUserResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: {
    name: string;
    email: string;
  };
  status: number
}>;
type TLogoutResponse = TServerResponse<{
  message: string;
}>
type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

type TGetUserResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: {
    name: string;
    email: string;
  };
}>

type TPatchUserResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: {
    name: string;
    email: string;
  };
}>
const configApi = {
  baseUrl: "https://norma.nomoreparties.space/api",
};

const getResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getIngredients = () => {
  return fetch(`${configApi.baseUrl}/ingredients`).then((res) =>
    getResponse<TIngredientsResponse>(res)
  );
};

const postIngredients = (body: Array<string>) => {
  return fetch(`${configApi.baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify(body),
  }).then((res) => getResponse<TPostIngredientResponse>(res));
};

const registerUser = (body: {
  email: string;
  password: string;
  name: string;
}) => {
  return fetch(`${configApi.baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => getResponse<TRegisterResponse>(res));
};

const loginUser = (body: { email: string; password: string }) => {
  return fetch(`${configApi.baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => getResponse<TLoginUserResponse>(res));
};

const refreshToken = () => {
  return fetch(`${configApi.baseUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("refreshToken"),
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then((res) => getResponse<TRefreshResponse>(res));
};
const forgotPasswordPost = (body: { email: string }) => {
  return fetch(`${configApi.baseUrl}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => getResponse<TForgotPasswordPostResponse>(res));
};

const resetPasswordPost = (body: { password: string; token: string }) => {
  return fetch(`${configApi.baseUrl}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => getResponse<TResetPasswordResponse>(res));
};

const getUser = () => {
  return fetch(`${configApi.baseUrl}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  }).then((res) => getResponse<TGetUserResponse>(res));
};

const patchUser = (body: {
  email: string;
  name: string;
  password?: string;
}) => {
  return fetch(`${configApi.baseUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify(body),
  }).then((res) =>getResponse<TPatchUserResponse>(res));
};

const postLogout = () => {
  return fetch(`${configApi.baseUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then((res) => getResponse<TLogoutResponse>(res));
};
export {
  configApi,
  getIngredients,
  postIngredients,
  registerUser,
  loginUser,
  refreshToken,
  forgotPasswordPost,
  getUser,
  patchUser,
  resetPasswordPost,
  postLogout,
};
