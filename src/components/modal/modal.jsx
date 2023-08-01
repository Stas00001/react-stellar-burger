import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "./modal.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_INGREDIENT } from "../../services/actions/ingredients-details";
import { CLEAR_ORDER } from "../../services/actions/order";
import { CLEAR_CONSTRUCTOR } from "../../services/actions/ingredients";
const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  const { children, active, setActive } = props;
  const {order} = useSelector((store) => store.order)
  const dispatch = useDispatch()


  React.useEffect(() => {
    document.addEventListener("keydown", closePopupEsc);
   
    return () => document.removeEventListener("keydown", closePopupEsc);
  }, []);



  const closePopupEsc = (evt) => {
    if (evt.key === "Escape") {
      evt.preventDefault();
      close()
    }
  };
const close = () => {
  setActive(false);
  setTimeout(() => {
    dispatch({
      type: CLEAR_INGREDIENT
    })
  }, 300)
}
  return ReactDOM.createPortal(
    <>
    <div
      className={active ? "modal active" : "modal"}
    >
      <ModalOverlay onClose ={close} />
      <div
        className={active ? "modal__body active" : "modal__body"}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className={"modal__button-close"}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired
}



export default Modal;
