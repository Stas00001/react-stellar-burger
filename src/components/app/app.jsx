import styles from "./app.module.css";
import React from "react";
import Header from "../app-header/header";
import BurgerIngeredienst from "../burger-ingredients/burger-ingredienst";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { getIngeredients } from "../api";
function App() {
  const [card, setCard] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [modalOrder, setModalOrder] = React.useState(false);
  const [modalIngeredient, setModalIngeredient] = React.useState({
    ingeredients: null,
    successModal: false,
  });
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    success: false,
    data: [],
  });

  React.useEffect(() => {
    getIngeredients()
      .then(setState({ ...state, hasError: false, isLoading: true }))
      .then((data) =>
        setState({ ...state, data, isLoading: false, success: true })
      )
      .catch((e) => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  }, []);

  const handleOpenModalIngeredient = () => {
    setModal(true);
  };

  const onClickCard = (e) => {
    const result = data.data.filter((item) => item._id === e.currentTarget.id);
    const ingeredients = result.reduce((res, ingeredient) => {
      return {
        ...ingeredient,
      };
    }, {});
    setCard([...card, ingeredients]);
    handleOpenModalIngeredient();
    setModalIngeredient({
      ...modalIngeredient,
      successModal: true,
      ingeredients: ingeredients,
    });
  };

  const handleOpenModalOrder = () => {
    setModalOrder(true);
  };

  const handleCloseOrder = () => {
    setModalOrder(false);
  };

  const { data, isLoading, hasError, success } = state;
  const { successModal } = modalIngeredient;

  return (
    <div className={styles.app}>
      {isLoading && "Загрузка..."}
      {hasError && "Произошла ошибка"}
      {success && (
        <>
          <Header />
          <main>
            <section className={styles.app__section_burger}>
              <BurgerIngeredienst
                ingeredienst={data.data}
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
            data={modalIngeredient.ingeredients}
          ></IngredientDetails>
        )}
      </Modal>

      <Modal active={modalOrder} setActive={setModalOrder}>
        <OrderDetails popupClose={handleCloseOrder} />
      </Modal>
    </div>
  );
}

export default App;
