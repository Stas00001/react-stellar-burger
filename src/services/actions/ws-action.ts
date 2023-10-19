import { string } from "prop-types";
import { TOrder } from "../../types/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERS: "WS_GET_ORDERS" = "WS_GET_ORDERS";

export const WS_AUTH_CONNECTION_START: "WS_AUTH_CONNECTION_START" = "WS_AUTH_CONNECTION_START";
export const WS_AUTH_CONNECTION_SUCCESS: "WS_AUTH_CONNECTION_SUCCESS" = "WS_AUTH_CONNECTION_SUCCESS";
export const WS_AUTH_CONNECTION_ERROR: "WS_AUTH_CONNECTION_ERROR" = "WS_AUTH_CONNECTION_ERROR";
export const WS_AUTH_CONNECTION_CLOSED: "WS_AUTH_CONNECTION_CLOSED" = "WS_AUTH_CONNECTION_CLOSED";
export const WS_GET_AUTH_ORDERS: "WS_GET_AUTH_ORDERS" = "WS_GET_AUTH_ORDERS";

export const wsActions = {
  wsStart: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  getOrders: WS_GET_ORDERS,
};
export const wsAuthActions = {
  wsStart: WS_AUTH_CONNECTION_START,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  getOrders: WS_GET_AUTH_ORDERS,
};

export interface IWsConnectStart {
  readonly type: typeof WS_CONNECTION_START
}
export interface IWsConnectSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS
}
export interface IWsConnectError {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: string;

}

export interface IWsConnectClosed {
  readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWsGetOrder {
  readonly type: typeof WS_GET_ORDERS
  payload:{orders: Array<TOrder>, total: number, totalToday: number}

}

export interface IWsConnectAuthStart {
  readonly type: typeof WS_AUTH_CONNECTION_START
}
export interface IWsConnectAuthSuccess {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS
}
export interface IWsConnectAuthError {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR
  payload: string;
}

export interface IWsConnectAuthClosed {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED
}

export interface IWsGetAuthOrder {
  readonly type: typeof WS_GET_AUTH_ORDERS;
  payload: {orders: Array<TOrder>, total: number, totalToday: number}
}

export type TWsActions = IWsConnectAuthClosed
| IWsConnectAuthError
| IWsConnectAuthStart
| IWsConnectAuthSuccess
| IWsConnectClosed
| IWsConnectError
| IWsConnectSuccess
| IWsGetAuthOrder
| IWsGetOrder
export const wsConnectionStart = () : IWsConnectStart => ({
  type: WS_CONNECTION_START,
});

export const wsConnectionSuccess = () : IWsConnectSuccess => ({
  type: WS_CONNECTION_SUCCESS,
});

export const wsConnectionClosed = () : IWsConnectClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsConnectionError = (payload: string) : IWsConnectError => ({
  type: WS_CONNECTION_ERROR,
  payload
  
});
