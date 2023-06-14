import styles from "./app.module.css";
import React from "react";
import Header from "../app-header/header";
import BurgerIngredient from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { getIngredients } from "../../utils/api";
import { IngredientsContext, IngredientsItemContext, PriceContext, OrderContext } from "../../utils/use-context.js";

function App() {
  const initialState = { price: [] };
  const [priceState, priceDispatcher] = React.useReducer(reducer, initialState)
  const [modal, setModal] = React.useState(false);
  const [modalOrder, setModalOrder] = React.useState(false);
  const [order, setOrder] = React.useState(null)
  const [modalIngredients, setModalIngredients] = React.useState({
    ingredient: null,
    successModal: false,
  });
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    success: false,
    data: [],
    ingredients: null,
  });
  const [ingredients, setIngredients] = React.useState([])

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

  function reducer(state , action) {
    switch (action.type) {
      case "ingredients":
        return {
          ...state,
           price: [...state.price, action.payload] };
      case "bun":
        return { 
          ...state,
          price: [action.payload * 2] };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }
  const handleOpenModalIngredient = () => {
    setModal(true);
  };

  // const onClickCard = (e) => {
  //   const result = data.data.filter((item) => item._id === e.currentTarget.id);
  //   const ingredient = result.reduce((res, ingredient) => {
  //     return {
  //       ...ingredient,
  //     };
  //   }, {});
  //   handleOpenModalIngredient();
  //   setModalIngredients({
  //     ...modalIngredients,
  //     successModal: true,
  //     ingredient: ingredient,
  //   });
  // };

  const handleOpenModalOrder = (e) => {

    setModalOrder(true);
  };

  const handleCloseOrder = () => {
    setModalOrder(false);
  };

  const { isLoading, hasError, success } = state;
  const { successModal } = modalIngredients;

  return (
    
    <div className={styles.app}>
      <OrderContext.Provider value={[order, setOrder]}>
      {isLoading && "Загрузка..."}
      {hasError && "Произошла ошибка"}
      {success && (
        <>
          <Header />
          <main>
            <IngredientsContext.Provider value={[state, setState]}>
              <IngredientsItemContext.Provider value={[ingredients, setIngredients]} >
                <PriceContext.Provider value={[priceState, priceDispatcher]}>
              <section className={styles.app__section_burger}>
              <BurgerIngredient handleOpenModalIngredient ={handleOpenModalIngredient} modal = {modalIngredients} setModal={setModalIngredients}/>
              <BurgerConstructor
                onClick={handleOpenModalOrder}
              />
            </section>
                </PriceContext.Provider>
              </IngredientsItemContext.Provider>
            </IngredientsContext.Provider>
          </main>
        </>
      )}

      <Modal active={modal} setActive={setModal}>
        {successModal && (
          <IngredientDetails
            data={modalIngredients.ingredient}
          />
        )}
      </Modal>
      <Modal active={modalOrder} setActive={setModalOrder}>
        <OrderDetails popupClose={handleCloseOrder} />
      </Modal>
      </OrderContext.Provider>
    </div>
  );
}

export default App;
