import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "./modal.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  const { children, active, setActive } = props;
  React.useEffect(() => {
    document.addEventListener("keydown", closePopupEsc);

    return () => document.removeEventListener("keydown", closePopupEsc);
  }, []);

  const closePopupEsc = (evt) => {
    if (evt.key === "Escape") {
      evt.preventDefault();
      setActive(false);
    }
  };

  return ReactDOM.createPortal(
    <>
    <div
      className={active ? "modal active" : "modal"}
    >
      <ModalOverlay onClose ={() => setActive(false)} />
      <div
        className={active ? "modal__body active" : "modal__body"}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setActive(false)}
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
