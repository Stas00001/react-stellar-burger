import styles from "../components/app/app.module.css";
import React, { FC } from "react";
import BurgerIngredient from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loader from "../components/UI/loader/loader";
import { useSelector } from "../types/hooks";
const Constructor : FC =() => {
  const { itemsRequest, itemsFailed, success } = useSelector(
    (store) => store.ingredients
  );
  
  return (
    <div className={styles.app}>
      {itemsRequest && (
        <div className={`${styles['app__container-loader']}`}>
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
