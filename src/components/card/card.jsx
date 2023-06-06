import React from "react";
import cardStyle from "./card.module.css";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
const Card = (props) => {
  return (
    <div className={`${cardStyle.card} pr-4 pl-4`}>
      {props.data.map((item, index) => (
        <div
          onClick={(e) => props.onClickCard(e)}
          id={item._id}
          className={`${cardStyle.card__item} pr-4 pl-4 pb-8`}
          key={index}
          type={item.type}
        >
          <Counter count={1} size="default" extraClass="m-1" />
          <img
            className={`${cardStyle.card__image} pb-1`}
            src={item.image}
            alt={item.name}
          />
          <p
            className={`${cardStyle.card__price} text text_type_digits-default pb-1`}
          >
            {" "}
            {item.price}{" "}
            <span className="pl-1">
              <CurrencyIcon />
            </span>
          </p>
          <p className={`text text_type_main-default`}>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  onClickCard: PropTypes.func.isRequired
};

export default Card;
