import styles from "../components/app/app.module.css";
import React from "react";
import BurgerIngredient from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getItems } from "../services/actions/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loader from "../components/UI/loader/loader";

function Constructor() {
  const { itemsRequest, itemsFailed, success } = useSelector(
    (store) => store.ingredients
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      {itemsRequest && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <Loader />
        </div>
      )}
      {itemsFailed && "Произошла ошибка"}
      {success && !itemsRequest && (
        <>
          <main>
            <DndProvider backend={HTML5Backend}>
              <section className={styles.app__section_burger}>
                <BurgerIngredient />
                <BurgerConstructor />
              </section>
            </DndProvider>
          </main>
        </>
      )}
    </div>
  );
}

export default Constructor;
