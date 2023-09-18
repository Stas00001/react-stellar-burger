import style from "../ingredient-list/ingredient-list.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { useDrag, useDrop } from "react-dnd";
import { DELETE_ITEM, DECREASE_ITEM } from "../../services/actions/ingredients";
import { useDispatch } from "react-redux";
import { DragPreviewImage } from "react-dnd";

const IngredientItem = ({ item, moveElement, index, id, keys }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "constructorElement",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveElement(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const decrease = () => {
    dispatch({
      type: DECREASE_ITEM,
      id,
    });
  };
  const onDelete = () => {
    decrease();
    dispatch({
      type: DELETE_ITEM,
      keys,
    });
  };
  const [{ isDrag }, drag, preview] = useDrag({
    type: "constructorElement",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging() ? 'is-drag' :  'no-drag',
    }),
  });
  drag(drop(ref));
  return (
    <>
    <DragPreviewImage connect={preview} src={item.image}/>
    <li
      ref={ref}
      className={`${style[`constructor__list-item`]}`}
    >
      <span className="pr-1">
        {" "}
        <DragIcon />
      </span>
      <ConstructorElement
        extraClass={`${isDrag} mr-4`}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={onDelete}
      />
    </li>
    </>
  );
};

IngredientItem.propTypes = {
  moveElement: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  keys: PropTypes.string.isRequired
};
export default IngredientItem;
