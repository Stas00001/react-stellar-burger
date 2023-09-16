import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "./modal.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_INGREDIENT } from "../../services/actions/ingredients-details";
const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  const { children, active, handleModalClose } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    document.addEventListener("keydown", closePopupEsc);

    return () => document.removeEventListener("keydown", closePopupEsc);
  }, []);

  const closePopupEsc = (evt) =>
    evt.key === "Escape" ? handleModalClose() : null;

  return ReactDOM.createPortal(
    <>
      <div className={active ? "modal active" : "modal"}>
        <ModalOverlay onClose={handleModalClose} />
        <div
          className={active ? "modal__body active" : "modal__body"}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={handleModalClose} className={"modal__button-close"}>
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
};

export default Modal;
