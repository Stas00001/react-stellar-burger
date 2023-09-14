import style from "./profile.module.css";
import ProfileForm from "../components/profile-form/profile-form";
import NavProfile from "../components/nav-profile/nav-profile";
import { Outlet } from "react-router-dom";
const Profile = () => {
  return (
    <div className={style.container}>
      <div>
        <NavProfile />
        <p
          className={`${style.nav__text} text text_type_main-small text_color_inactive`}
        >
          В этом разделе вы можете изменить свои персональные данные{" "}
        </p>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
