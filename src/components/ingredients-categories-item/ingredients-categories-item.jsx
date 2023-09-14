import ingredientsCategoriesStyle from "./ingredients-categories-item.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
const IngredientsCategoriesItem = ({ data, onClickCard }) => {
  const { _id } = data;
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredientId = data["_id"];
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredients",
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const isNull = () => {
    if (data.__v === 0) {
      return true;
    } else {
      return false;
    }
  };

  const count = isNull() ? false : true;

  return (
    <Link
      key={ingredientId}
      to={`/ingredients/${_id}`}
      state={{ background: location }}
      className="link"
    >
      <div
        ref={dragRef}
        onClick={(e) => onClickCard(e)}
        id={data._id}
        className={`${ingredientsCategoriesStyle.card__item} pr-4 pl-4 pb-8`}
        type={data.type}
      >
        {count && (
          <Counter count={data.__v} size="default" extraClass={` m-1`} />
        )}
        <img
          className={`${ingredientsCategoriesStyle.card__image} pb-1`}
          src={data.image}
          alt={data.name}
        />
        <p
          className={`${ingredientsCategoriesStyle.card__price} text text_type_digits-default pb-1`}
        >
          {" "}
          {data.price}{" "}
          <span className="pl-1">
            <CurrencyIcon />
          </span>
        </p>
        <p className={`text text_type_main-default`}>{data.name}</p>
      </div>
    </Link>
  );
};
export default IngredientsCategoriesItem;
