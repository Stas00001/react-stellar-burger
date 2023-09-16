import { useSelector } from "react-redux";
import style from "./ingredients-id.module.css";
import { useParams } from "react-router-dom";
const IngredientId = () => {
  const { items } = useSelector((store) => store.ingredients);
  const { ingredientId } = useParams();

  const ingredient = items.find((item) => item._id === ingredientId);
  return (
    <div className={`${style.ingredient}`}>
      {!ingredient && (
        <h1 className={`${style.error}text text_type_main-large`}>
          Ошибка.Ингредиент не найден!
        </h1>
      )}
      {ingredient && (
        <>
          <p className={`text text_type_main-large`}>Детали ингредиента</p>
          <img
            className={`${style.image} pb-4`}
            src={ingredient.image}
            alt={ingredient.name}
          />
          <p className={`${style.text} text text_type_main-medium mb-8`}>
            {ingredient.name}
          </p>
          <ul className={`${style.list} mb-15`}>
            <li>
              <p
                className={`${style.text} text text_type_main-default text_color_inactive`}
              >
                Калории,ккал
              </p>
              <p
                className={`${style.text} text text_type_digits-default text_color_inactive`}
              >
                {ingredient.calories}
              </p>
            </li>
            <li>
              <p
                className={`${style.text} text text_type_main-default text_color_inactive`}
              >
                Белки, г
              </p>
              <p
                className={`${style.text} text text_type_digits-default text_color_inactive`}
              >
                {ingredient.proteins}
              </p>
            </li>
            <li>
              <p
                className={`${style.text} text text_type_main-default text_color_inactive`}
              >
                Жиры, г
              </p>
              <p
                className={`${style.text} text text_type_digits-default text_color_inactive`}
              >
                {ingredient.fat}
              </p>
            </li>
            <li>
              <p
                className={`${style.text} text text_type_main-default text_color_inactive`}
              >
                Углеводы, г
              </p>
              <p
                className={`${style.text} text text_type_digits-default text_color_inactive`}
              >
                {ingredient.carbohydrates}
              </p>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default IngredientId;
