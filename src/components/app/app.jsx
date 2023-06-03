import styles from "./app.module.css";
import React from "react";
import { data } from "../../utils/data";
import Header from "../app-header/header";
import BurgerIngeredienst from "../burger-ingredients/burger-ingredienst";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { object } from "prop-types";
import { configApi } from "../api";
import Modal from "../Modal/modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
const dataIngeredienst = JSON.parse(JSON.stringify(data));

function App() {
  const [card, setCard] = React.useState([])
  const [count, setCount] = React.useState(1)
  const [modal, setModal] = React.useState(false)
  const [modalOrder, setModalOrder] = React.useState(false)

  const [modalIngeredient, setModalIngeredient] = React.useState({
    ingeredients : {}
  })
  React.useEffect(() => {
    getIngeredients();
  },[])

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    success: false,
     data: []
  })

  const getIngeredients =() => { 
    setState({ ...state, hasError: false, isLoading: true })
    fetch(`${configApi.baseUrl}`)
      .then(res => 
        res.json(),
      )
      .then(data => setState({ ...state, data, isLoading: false, success: true}))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
      });
    }
    
    const handleOpenModalIngeredient = () => {
      setModal(true);
    }

   
    const onClickCard = (e) => {
        const result = data.data.filter((item) => item._id === e.target.id)
        const ingeredients = result.reduce((res, ingeredient) => {
          return {
            ...ingeredient
        }
        }, {})
        setCard([
            ...card,
            ingeredients
        ])
        handleOpenModalIngeredient()
        setModalIngeredient({
          ...modalIngeredient,
          ingeredients
        })
    }

    const handleOpenModalOrder = () => {
      setModalOrder(true);
    }

    const handleCloseOrder = () => {
      setModalOrder(false );
    }

    const remove = (id) => {
      setCard([...card.slice(0, id), ...card.slice(id + 1)]);

    }
    
    const onClickRemove = (e) => {
      const id = e.target.id;
      remove(id)
    }

    const typeBunId = card.filter((item) => item.type === 'bun')
    const bun = typeBunId.reduce((res, bun) => {
      return {
        ...bun
      }
    }, {})

    const { data, isLoading, hasError, success } = state;

    const popupOrder = (
      <Modal active ={modal} setActive = {setModal}> 
      <OrderDetails/>
      </Modal>
    ) 
  return (
    <div className={styles.app}>
      {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading 
        &&
        !hasError 
        &&
        success
        &&
       <>
      <Header/>
      <main>
        <section className = {styles.app__section_burger}>
        <BurgerIngeredienst ingeredienst = {data.data} onClickCard = {onClickCard}/>
        <BurgerConstructor onClick = {handleOpenModalOrder} remove = {onClickRemove} array = {card} bun = {bun}/>
        </section>
      </main>
      </>
      }
      <Modal active ={modal} setActive = {setModal}>
      <IngredientDetails data ={modalIngeredient}></IngredientDetails>
      </Modal>

      <Modal active ={modalOrder} setActive = {setModalOrder}> 
      <OrderDetails popupClose ={handleCloseOrder}/>
      </Modal>

       {/* <div style={{overflow: 'hidden'}}>
                <button onClick={() => setModal(true)}>Открыть модальное окно</button>
                {popupOrder}
      </div> */}
    </div>
  );
}

export default App;
