import React from "react";
import styles from "./modal-overlay.module.css";
import { modalOverlayPropType } from "../../utils/prop-types";

const ModalOverlay = (props) => {
    return (
    <div className={styles.modalOverlay} onClick={props.onClose}></div> 
    )
}

ModalOverlay.propTypes = {
    onClose: modalOverlayPropType.isRequired
}
export default ModalOverlay