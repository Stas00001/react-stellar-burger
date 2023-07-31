import React from "react";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategories from "../ingredients-categories/ingredients-categories";
import { IngredientsContext, SelectedIngredientsContext } from "../../services/use-context";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
const BurgerIngredient = (props) => {
  const [state, setState] = React.useContext(IngredientsContext);
  const [selectedIngredients, setSelectedIngredients] = React.useContext(SelectedIngredientsContext)
  const [modal, setModal] = React.useState(false);
  const [current, setCurrent] = React.useState("one");
  const [modalIngredients, setModalIngredients] = React.useState({
    ingredient: null,
    bun: null,
    successModal: false,
  });

  const data = state.data.data;
  const {arrTypeBun, arrTypeMain, arrTypeSauce } = React.useMemo(() => {
    return {
     arrTypeBun: data.filter((item) => item.type === "bun"),
     arrTypeMain: data.filter((item) => item.type === "main"),
     arrTypeSauce: data.filter((item) => item.type === "sauce"),
    }
  }, [data])
  
 
  const refBun = React.useRef(null);
  const refSauce = React.useRef(null);
  const refMain = React.useRef(null);

  const onClickCard = (e) => {
    const result = data.filter((item) => item._id === e.currentTarget.id);
    const ingredientsResult = result.reduce((res, ingredient) => {
      if (ingredient.type === 'bun') {
        setSelectedIngredients({...selectedIngredients, bun: ingredient})
        setState({...state, constructor: true, constructorNull: false,})
      } else {
        setSelectedIngredients({...selectedIngredients, ingredients: [...selectedIngredients.ingredients, ingredient ]})
        setState({...state, constructor: true, constructorNull: false,})
      }
      return{
        ...ingredient
      }
    }, {});
    // setSelectedIngredients([...selectedIngredients, ingredientsResult])
    // handleOpenModalIngredient();
    setModalIngredients({
        ...modal,
        successModal: true,
        ingredient: ingredientsResult,
      });
  }
  // const handleOpenModalIngredient = () => {
  //   setModal(true);
  // };
  const tabHandler = (ref) => {
    ref.current.scrollIntoView();
  };

  const handleClick = (ref) => {
    tabHandler(ref);
  };

  const { successModal } = modalIngredients;

  return (
    <div className={`${burgerIngredientsStyle.ingredients} mt-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <div className={`${burgerIngredientsStyle.ingredients__tab} pb-10`}>
        <Tab
          value="one"
          active={current === "one"}
          onClick={() => {
            setCurrent("one");
            handleClick(refBun);
          }}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === "two"}
          onClick={() => {
            setCurrent("two");
            handleClick(refSauce);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === "three"}
          onClick={() => {
            handleClick(refMain);
            setCurrent("three");
          }}
        >
          Начинки
        </Tab>
      </div>
      <div
        className={`${burgerIngredientsStyle.ingredients__container} custom-scroll`}
      >
       
        <IngredientsCategories 
        refBun ={refBun} 
        title = 'Булки' 
        onClickCard={onClickCard} 
        data={arrTypeBun} />
        
        <IngredientsCategories
          refBun ={refSauce} 
          title = 'Соусы' 
          onClickCard={onClickCard}
          data={arrTypeSauce}
        />
        <IngredientsCategories
          refBun ={refMain} 
          title = 'Начинки' 
          onClickCard={onClickCard}
          data={arrTypeMain} 
          />
      </div>
      <Modal active={modal} setActive={setModal}>
        {successModal && (
          <IngredientDetails
            data={modalIngredients.ingredient}
          />
        )}
      </Modal>
    </div>
  );
};

export default BurgerIngredient;
