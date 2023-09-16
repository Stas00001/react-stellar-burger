import { useSelector } from "react-redux";
import style from "./orders-ingedients.module.css";
import { Link, useNavigate } from "react-router-dom";
const OrdersIngredients = ({ id, counter }) => {
  const navigate = useNavigate();
  const { items } = useSelector((store) => store.ingredients);
  const item = items.filter((item) => item._id === id)[0];
  const onClick = () => {
    navigate(`/ingredients/${id}`);
  };
  return (
    <div onClick={onClick} className={`${style.link} link`}>
      <div className={style.container}>
        <img
          className={style.image}
          src={item ? item.image : null}
          alt="Ингредиент"
        />
        {counter >= 2 ? (
          <div className={style.counter}>
            <p className="text text_type_digits-default">+{counter}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OrdersIngredients;
