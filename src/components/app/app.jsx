import styles from "./app.module.css";
import React from "react";
import Header from "../app-header/header";
import BurgerIngredient from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { getIngredients } from "../../utils/api";
function App() {
  const [card, setCard] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [modalOrder, setModalOrder] = React.useState(false);
  const [modalIngredients, setModalIngredients] = React.useState({
    ingredients: null,
    successModal: false,
  });
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    success: false,
    data: [],
  });

  React.useEffect(() => {
    getIngredients()
      .then(setState({ ...state, hasError: false, isLoading: true }))
      .then((data) =>
        setState({ ...state, data, isLoading: false, success: true })
      )
      .catch((e) => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  }, []);

  const handleOpenModalIngredient = () => {
    setModal(true);
  };

  const onClickCard = (e) => {
    const result = data.data.filter((item) => item._id === e.currentTarget.id);
    const ingredients = result.reduce((res, ingredient) => {
      return {
        ...ingredient,
      };
    }, {});
    setCard([...card, ingredients]);
    handleOpenModalIngredient();
    setModalIngredients({
      ...modalIngredients,
      successModal: true,
      ingredients: ingredients,
    });
  };

  const handleOpenModalOrder = () => {
    setModalOrder(true);
  };

  const handleCloseOrder = () => {
    setModalOrder(false);
  };

  const { data, isLoading, hasError, success } = state;
  const { successModal } = modalIngredients;

  return (
    <div className={styles.app}>
      {isLoading && "Загрузка..."}
      {hasError && "Произошла ошибка"}
      {success && (
        <>
          <Header />
          <main>
            <section className={styles.app__section_burger}>
              <BurgerIngredient
                ingredients={data.data}
                onClickCard={onClickCard}
              />
              <BurgerConstructor
                onClick={handleOpenModalOrder}
                array={data.data}
              />
            </section>
          </main>
        </>
      )}

      <Modal active={modal} setActive={setModal}>
        {successModal && (
          <IngredientDetails
            data={modalIngredients.ingredients}
          />
        )}
      </Modal>

      <Modal active={modalOrder} setActive={setModalOrder}>
        <OrderDetails popupClose={handleCloseOrder} />
      </Modal>
    </div>
  );
}

export default App;
