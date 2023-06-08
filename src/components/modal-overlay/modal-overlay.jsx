import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { modalOverlayPropType } from "../../utils/prop-types";

const ModalOverlay = (props) => {
    return (
    <div className={styles.modalOverlay} onClick={props.onClose}></div> 
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}
export default ModalOverlay