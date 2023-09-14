import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import header from "./header.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { isLogin } = useSelector((store) => store.user);
  const data = useSelector((store) => store.ws)
  const link = isLogin ? "/profile" : "/login";
  return (
    <header className={header.header}>
      <ul className={header.header__menu}>
        <li className={`pr-2  ${header.header__menu_item}`}>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isActive
                ? `${header["header__link-active"]} link_active link text text_type_main-default pl-5 pr-5 pt-4 pb-4`
                : `${header.header__link} link text text_type_main-default pl-5 pr-5 pt-4 pb-4`
            }
          >
            <span className={`pr-2 ${header.header__span}`}>
              <BurgerIcon type="secondary" />
            </span>
            Конструктор{" "}
          </NavLink>
        </li>
        <li className={header.header__menu_item}>
          <NavLink
            to='/feed'
            className={({ isActive, isPending }) =>
              isActive
                ? `${header["header__link-active"]} link_active link text text_type_main-default pl-5 pr-5 pt-4 pb-4`
                : `${header.header__link} link text text_type_main-default pl-5 pr-5 pt-4 pb-4`
            }
          >
            <span className={`pr-2 ${header.header__span}`}>
              <ListIcon type="secondary" />
            </span>
            Лента заказов
          </NavLink>
        </li>
      </ul>
      <Logo />
      <NavLink
        to='/profile'
        className={({ isActive, isPending }) =>
          isActive
            ? `${header["header__link-active"]} link_active  link text text_type_main-default pl-5 pr-5 pt-4 pb-4`
            : `${header.header__link} link text text_type_main-default pl-5 pr-5 pt-4 pb-4`
        }
      >
        <span className={`pr-2 ${header.header__span}`}>
          <ProfileIcon type="secondary" />
        </span>{" "}
        Личный кабинет
      </NavLink>
    </header>
  );
};

export default Header;
