import { FC } from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

type TProps = {
  onClose: () => void;
};

const ModalOverlay: FC<TProps> = (props) => {
  return <div className={styles.modalOverlay} onClick={props.onClose}></div>;
};

export default ModalOverlay;
