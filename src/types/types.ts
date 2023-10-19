export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  id: string;
  key?: string;
};
export type TLoginData = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: {
    email: string;
    name: string;
    password?: string;
  };
};

export type TOrder = {
  _id: string;
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string ;
  updatedAt: string;
};

export type TWsActions = {
  wsStart: string;
  onOpen: string;
  onClose: string;
  onError: string;
  getOrders: string;
};
