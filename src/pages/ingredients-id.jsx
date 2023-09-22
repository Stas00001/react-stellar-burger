import { useSelector } from "react-redux";
import style from "./ingredients-id.module.css";
import { useParams } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
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
      {items && (
        <>
          <IngredientDetails data={items}/>
        </>
      )}
    </div>
  );
};

export default IngredientId;
