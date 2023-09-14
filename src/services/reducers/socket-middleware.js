import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
  } from '../actions/ws-action';
  
  const initialState = {
    wsConnected: false,
    wsError: undefined,
    orders: null,
    total: 0,
    totalToday: 0
  }
  
  // Создадим редьюсер для WebSocket
  export const socketMiddlewareReducer = (state = initialState, action) => {
    switch (action.type) {
      // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
      // Установим флаг wsConnected в состояние true
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          wsError: undefined,
          wsConnected: true
        };
  
      // Опишем обработку экшена с типом WS_CONNECTION_ERROR
      // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          wsError: action.payload,
          wsConnected: false
        };
  
      // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
      // Установим флаг wsConnected в состояние false
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsError: undefined,
          wsConnected: false,
          orders: null,
        };
  
      // Опишем обработку экшена с типом WS_GET_ORDERS
      // Обработка происходит, когда с сервера возвращаются данные
      case WS_GET_ORDERS:
        return {
          ...state,
          wsError: undefined,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
      default:
        return state;
    }
  };