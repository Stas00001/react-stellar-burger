import style from "./profile.module.css";
import NavProfile from "../components/nav-profile/nav-profile";
import { Outlet, useLocation,  } from "react-router-dom";
import { useEffect, useState } from "react";
const Profile = () => {
  const [currentLocation, setCurrentLocation] = useState('profile')
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/profile') {
    setCurrentLocation('profile')
    }
    if (location.pathname === '/profile/order'){
      setCurrentLocation('orders')

    }
  }, [location])
  const text = currentLocation === 'profile' ? 'В этом разделе вы можете изменить свои персональные данные' : 'В этом разделе вы можете просмотреть свою историю заказов'
  return (
    <div className={style.container}>
      <div>
        <NavProfile />
        <p
          className={`${style.nav__text} text text_type_main-small text_color_inactive`}
        >
        {text}{" "}
        </p>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
