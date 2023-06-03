import React from 'react';
import { Logo, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import header from './header.module.css'
class Header extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            type: 'secondary',
        };
        this.emailInput = React.createRef();

    }
   
    mouseOver = evt => {
        evt.stopPropagation();
        this.emailInput.current = () => {
            this.setState({
                type: 'primary',
            });
        }
    }

    mouseOut = evt => {
        evt.stopPropagation();
        this.emailInput.current = () => {
            this.setState({
                type: 'secondary',
            });
        }
    }



    render() {
      return (
        <header className={header.header}>
        <ul className={header.header__menu}>
            <li 
             ref = {this.emailInput}
             onMouseEnter = {this.mouseOver} 
             onMouseLeave = {this.mouseOut}
            className= {`pr-2  ${header.header__menu_item}`}>  
            <a  href='#'  className={`${header.header__link} link text text_type_main-default pl-5 pr-5 pt-4 pb-4`}>
                 <span className={`pr-2 ${header.header__span}`}>
                     <BurgerIcon
                    type={this.state.type} /> 
                 </span>Конструктор </a>
            </li>
            <li 
            className={header.header__menu_item}>
            <a  
             onMouseEnter = {this.mouseOver} 
             onMouseLeave = {this.mouseOut}
            href='#' className={`${header.header__link} link text text_type_main-default pl-5 pr-5 pt-4 pb-4`}> 
            <span className={`pr-2 ${header.header__span}`}>
                     <ListIcon             
                     type= 'secondary' /> 
             </span>Лента заказов</a>
            </li>
        </ul>
        <Logo/>
        <a href='#' className={`${header.header__link} link text text_type_main-default pl-5 pr-5 pt-4 pb-4`}>
            <span className={`pr-2 ${header.header__span}`}><ProfileIcon type='secondary' /></span> Личный кабинет
        </a>
        </header>
      );
    }
  }

  export default Header