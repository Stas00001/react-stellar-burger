import {
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import header from "./header.module.css";
const Header = (props) => {
  return (
    <header className={header.header}>
      <ul className={header.header__menu}>
        <li className={`pr-2  ${header.header__menu_item}`}>
          <a
            href="#"
            className={`${header.header__link} link text text_type_main-default pl-5 pr-5 pt-4 pb-4`}
          >
            <span className={`pr-2 ${header.header__span}`}>
              <BurgerIcon type="secondary" />
            </span>
            Конструктор{" "}
          </a>
        </li>
        <li className={header.header__menu_item}>
          <a
            href="#"
            className={`${header.header__link} link text text_type_main-default pl-5 pr-5 pt-4 pb-4`}
          >
            <span className={`pr-2 ${header.header__span}`}>
              <ListIcon type="secondary" />
            </span>
            Лента заказов
          </a>
        </li>
      </ul>
      <Logo />
      <a
        href="#"
        className={`${header.header__link} link text text_type_main-default pl-5 pr-5 pt-4 pb-4`}
      >
        <span className={`pr-2 ${header.header__span}`}>
          <ProfileIcon type="secondary" />
        </span>{" "}
        Личный кабинет
      </a>
    </header>
  );
};

export default Header;
