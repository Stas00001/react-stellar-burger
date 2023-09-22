export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERS = "WS_GET_ORDERS";

export const WS_AUTH_CONNECTION_START = "WS_AUTH_CONNECTION_START";
export const WS_AUTH_CONNECTION_SUCCESS = "WS_AUTH_CONNECTION_SUCCESS";
export const WS_AUTH_CONNECTION_ERROR = "WS_AUTH_CONNECTION_ERROR";
export const WS_AUTH_CONNECTION_CLOSED = "WS_AUTH_CONNECTION_CLOSED";
export const WS_GET_AUTH_ORDERS = "WS_GET_AUTH_ORDERS";

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

export const wsConnectionStart = () => ({
  type: WS_CONNECTION_START,
});

export const wsConnectionSuccess = () => ({
  type: WS_CONNECTION_SUCCESS,
});

export const wsConnectionClosed = () => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsConnectionError = () => ({
  type: WS_CONNECTION_ERROR,
});
