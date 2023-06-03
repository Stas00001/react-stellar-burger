import React from "react";
import BurgerConstructorStyle from './burger-construtor.module.css'
import { ConstructorElement, Button, DragIcon, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
const dataIngeredienst = JSON.parse(JSON.stringify(data));

const BurgerConstructor = (props) => {
    const {price, image, name} = props.bun
    const ingeredients = props.array.map((item, index) => {
            if (item.type !== 'bun') {
            return (
                <li onClick={props.remove} key={index} id = {item._id} className ={`${BurgerConstructorStyle['constructor__list-item']}`} >
                <span id = {item._id} > <DragIcon/></span>
                <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail ={item.image}
                handleClose = {props.remove}
                >
                </ConstructorElement>
                </li>   
            )
            } 
        })

    return (

        <div className={`${BurgerConstructorStyle.constructor} ml-4 mr-4 mb-10 mt-25`}>
            <div className={`${BurgerConstructorStyle.constructor__container } custom-scroll`}>
                <ConstructorElement 
                extraClass="mr-4"
               type="top"
               isLocked={true}
               price={price || 1255}
               text={name || 'Краторная булка N-200i'}
               thumbnail = {image || 'https://code.s3.yandex.net/react/code/bun-02.png' }
                >
                </ConstructorElement>
                <ul className={`${BurgerConstructorStyle.constructor__list} mr-4`}>
                    {ingeredients}
                </ul> 
                <ConstructorElement 
                extraClass="mr-4"
                type="bottom"
                isLocked={true}
                price={price || 1255}
                text={name || 'Краторная булка N-200i'}
                thumbnail = {image || 'https://code.s3.yandex.net/react/code/bun-02.png' }
                >
                </ConstructorElement>              
            </div>
            <div className={`${BurgerConstructorStyle.constructor__price} mt-10`}>
            <p className={`${BurgerConstructorStyle.constructor__price_item} text text_type_digits-medium pr-10`}> 600 <span className="pl-1">
                <CurrencyIcon type="primary"/></span>
            </p>
            <Button onClick={props.onClick} htmlType="button" type="primary" size="large">Оформить заказ </Button>
            </div>
            
        </div>

    )
}


export default BurgerConstructor
