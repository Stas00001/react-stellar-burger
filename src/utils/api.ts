import { getCookie } from "./cooke";

const configApi = {
  baseUrl: "https://norma.nomoreparties.space/api",
};
const getResponse = (res: Response) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const getIngredients = () => {
  return fetch(`${configApi.baseUrl}/ingredients`).then(getResponse);
};

const postIngredients = (body : Array<string>) => {
  return fetch(`${configApi.baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify(body),
  }).then(getResponse);
};

const registerUser = (body : {email: string, password: string, name: string}) => {
  return fetch(`${configApi.baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(getResponse);
};

const loginUser = (body: {email: string, password: string}) => {
  return fetch(`${configApi.baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(getResponse);
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
  }).then(getResponse);
};
const forgotPasswordPost = (body: {email: string} ) => {
  return fetch(`${configApi.baseUrl}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(getResponse);
};

const resetPasswordPost = (body:{password: string, token: string}) => {
  return fetch(`${configApi.baseUrl}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then(getResponse);
};

const getUser = () => {
  return fetch(`${configApi.baseUrl}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  }).then(getResponse);
};

const patchUser = (body : {email: string, name: string; password?: string}) => {
  return fetch(`${configApi.baseUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify(body),
  }).then(getResponse);
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
  }).then(getResponse);
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
