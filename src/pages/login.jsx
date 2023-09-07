import React from "react";
import style from "./form.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate} from "react-router-dom";
import { useFormField } from "../utils/hook/useFormField";
import { login } from "../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const { values, onChange } = useFormField({ email: '',  password: ''});
  const { user, loginFailed} = useSelector((store) => store.user);
  const useProvideLogin = async (e) => {
    e.preventDefault();
    if (values.email && values.password) {
      try {
        await dispatch(
          login({
            email: values.email,
            password: values.password,
          })
        );
      } catch (e) {
        console.log(e);
      } 
    } else {
      toast.error("Заполните все поля", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  if (user) {
    return (
      <Navigate
        to={'/'}
      />
    );
  }

  return (
    <div className={style.container}>
      <p className="text text_type_main-medium mb-6">Вход</p>
      <form className={style.form}>
        <EmailInput
          extraClass="mb-6"
          value={values.email}
          name={"email"}
          onChange={onChange}
          isIcon={false}
        />
        <PasswordInput
          value={values.password}
          name={"password"}
          onChange={onChange}
          extraClass="mb-6"
        />
      </form>
      <Button
        onClick={useProvideLogin}
        extraClass="mb-20"
        htmlType="button"
        type="primary"
        size="medium"
      >
        Войти
      </Button>
      <p className="text text_type_main-default text_color_inactive pb-4">
        Вы - новый пользователь?{" "}
        <Link className={style.link} to="/register">
          Зарегистрироваться
        </Link>{" "}
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link className={style.link} to="/forgot-password">
          Восстановить пароль
        </Link>{" "}
      </p>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
