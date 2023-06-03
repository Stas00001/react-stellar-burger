import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import './modal.css'
const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
    
    const { children, onClose, active, setActive } = props
    React.useEffect(() => {
        document.addEventListener("keydown", closePopupEsc);
    },[])

    const closePopupEsc = (evt) => {
        if (evt.key === 'Escape') {
            evt.preventDefault();
            setActive(false);
          }
    }

    return ReactDOM.createPortal(
        (
            <>
                <div className={active ? 'modal active' : 'modal'}  onClick={() => setActive(false)}>
                <div className={active ? 'modal__body active' : 'modal__body'} onClick={(e) => e.stopPropagation()} >
                <button onClick={() => setActive(false)} className={'modal__button-close'}>  <CloseIcon type="primary" /></button>
                {children}

                </div>
                </div>
        
            </>
        ), 
        modalRoot
    );
}

export default Modal