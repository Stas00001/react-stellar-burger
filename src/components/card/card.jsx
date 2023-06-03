import React from 'react';
import cardStyle from './card.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';



const Card = (props) => {
  const handleClick = (e) => {
    props.onClickCard(e)
  }
    
    return (
        <div className={`${cardStyle.card} pr-4 pl-4`}>
            {props.data.map((item, index) => (
            <div onClick={handleClick} className={`${cardStyle.card__item} pr-4 pl-4 pb-8`} key = {index} id = {item._id} type = {item.type}>
            <Counter count={1} size="default" extraClass="m-1"/>
            <img id = {item._id} className={`${cardStyle.card__image} pb-1`} src={item.image} alt={item.name} />
            <p id = {item._id} className={`${cardStyle.card__price} text text_type_digits-default pb-1`}> {item.price} <span id = {item._id} className='pl-1'><CurrencyIcon /></span></p>
            <p id = {item._id} className={`text text_type_main-default`}>{item.name}</p>
            </div>
            ))}
        </div>
    )
}


export default Card