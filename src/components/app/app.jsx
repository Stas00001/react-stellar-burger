import styles from "./app.module.css";
import React from "react";
import Header from "../app-header/header";
import BurgerIngredient from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/api";
import { IngredientsContext, SelectedIngredientsContext, OrderContext } from "../../services/use-context.js";

function App() {
  
  const [order, setOrder] = React.useState(null)
 
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    success: false,
    data: [],
    ingredients: null,
    constructor: false,
    constructorNull: true,
  });
  const [selectedIngredients, setSelectedIngredients] = React.useState({
    bun: null,
    ingredients: []
  })

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

 

  const {bun, ingredients} = selectedIngredients
  const { isLoading, hasError, success, constructor, constructorNull } = state;

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
              <SelectedIngredientsContext.Provider value={[selectedIngredients, setSelectedIngredients]} >
              <section className={styles.app__section_burger}>
              <BurgerIngredient/>
             {constructorNull && (<div style={ {display: 'flex', justifyContent: 'center', alignItems: 'center'} }><p className="text text_type_main-medium"> {` <== конструктор пуст, выбирете ингредиенты`}</p></div>)} 
             {constructor && (<BurgerConstructor/>)}
            </section>
              </SelectedIngredientsContext.Provider>
            </IngredientsContext.Provider>
          </main>
        </>
      )}
      </OrderContext.Provider>
    </div>
  );
}

export default App;
