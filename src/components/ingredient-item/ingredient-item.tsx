import style from "../ingredient-list/ingredient-list.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DELETE_ITEM, DECREASE_ITEM } from "../../services/actions/ingredients";
import { useDispatch } from "react-redux";
import { DragPreviewImage } from "react-dnd";
import { TIngredient } from "../../types/types";
import { Identifier } from "dnd-core";

type TProps = {
  item: TIngredient;
  moveElement: (dragIndex: number, hoverIndex: number) => void;
  index: number;
  id: string;
  keys: string

}

const IngredientItem :FC<TProps> = ({ item, moveElement, index, id, keys }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement | null>(null);
  const [{handlerId}, drop] = useDrop<{
    ingredient: TIngredient;
    index: number;
  }, unknown,   { handlerId: Identifier | null } >({
    accept: "constructorElement",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
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
      if (!hoverBoundingRect || !clientOffset) return;
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
        <DragIcon type="primary" />
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


export default IngredientItem;
