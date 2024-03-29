import { useSelector } from "../../types/hooks";
import style from "./orders-ingedients.module.css";
import { FC } from "react";

type TProps = {
  id: string;
  counter?: number | undefined;
}
const OrdersIngredients : FC <TProps> = ({ id, counter }) => {
  const { items } = useSelector((store) => store.ingredients);
  const item = items.filter((item) => item._id === id)[0];
  return (
    <div className={`${style.link} `}>
      <div className={style.container}>
        <img
          className={style.image}
          src={item ? item.image : undefined}
          alt="Ингредиент"
        />
        {counter! >= 2 ? (
          <div className={style.counter}>
            <p className="text text_type_digits-default">+{counter}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OrdersIngredients;
