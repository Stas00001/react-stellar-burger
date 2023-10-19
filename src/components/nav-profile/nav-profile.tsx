import style from './nav-profile.module.css'
import { NavLink, useNavigate, Navigate } from 'react-router-dom'
import { postLogout } from '../../utils/api'
import { deleteCookie } from '../../utils/cooke'
import { resetUser } from '../../services/actions/user'
import { useDispatch } from '../../types/hooks'
const NavProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const logout = () => {
    postLogout().then((res)=>{
      if(res && res.success) {
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        dispatch(resetUser())
        return (
          <Navigate to = '/'/>
        )
      }
    }).catch(e => {
      console.log(e)
    })
  } 

    return (
    <nav className={style.nav__container}>
    <ul className={style.nav__list}>
      <li className={style[`nav__list-item`]}>
        <NavLink
        end
        to='/profile'
          className={({ isActive }) =>
            isActive
              ? `link text text_type_main-medium`
              : `link text text_type_main-medium text_color_inactive`
          }
        >
          Профиль
        </NavLink>
      </li>
      <li className={style[`nav__list-item`]}>
        <NavLink
          to="/profile/order"
          className={({ isActive }) =>
            isActive
              ? `link text text_type_main-medium`
              : `link text text_type_main-medium text_color_inactive`
          }
        >
          История заказов
        </NavLink>
      </li>
      <li className={style[`nav__list-item`]}>
        <NavLink
        to='/login'
        onClick={logout}
          className={({ isActive }) =>
            isActive
              ? `link text text_type_main-medium`
              : `link text text_type_main-medium text_color_inactive`
          }
        >
          Выход
        </NavLink>
      </li>
    </ul>
  </nav>
    )
}

export default NavProfile