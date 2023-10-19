import React, { FC } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import style from './modal.module.css'
import { CLEAR_INGREDIENT } from "../../services/actions/ingredients-details";
const modalRoot = document.getElementById("react-modals") as HTMLElement;
type TProps = {
  active?: boolean;
  children: JSX.Element,
  handleModalClose: (() => void);
}
const Modal : FC<TProps> = (props) => {
  const { children, active, handleModalClose } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.addEventListener("keydown", closePopupEsc);

    return () => document.removeEventListener("keydown", closePopupEsc);
  }, []);

  const closePopupEsc = (evt: KeyboardEvent) =>
    evt.key === "Escape" ? handleModalClose() : null;

  return ReactDOM.createPortal(
    <>
      <div className={active ? `${style.modal} ${style.active}` : `${style.modal}`}>
        <ModalOverlay onClose={handleModalClose} />
        <div
          className={active ? `${style[`modal__body`]} ${style.active}` : `${style[`modal__body`]}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={handleModalClose} className={`${style[`modal__button-close`]}`}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </div>
    </>,
    modalRoot
  );
};


export default Modal;
