import React from "react";
import style from "./form.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormField } from "../utils/hook/useFormField";
import { login } from "../services/actions/user";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "../types/hooks";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, onChange } = useFormField({ email: "", password: "" });
  const { user, loginFailed } = useSelector(
    (store) => store.user
  );

  const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.email && values.password) {
      dispatch(
        login({
          email: values.email,
          password: values.password,
        })
      );
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
  if (Object.keys(user).length !== 0) {
    return <Navigate to="/" />;
  }

  return (
    <div className={style.container}>
      <p className="text text_type_main-medium mb-6">Вход</p>
      <form onSubmit={loginSubmit} className={style.form}>
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
         {loginFailed && (
          <p className="text text_type_main-default pb-3" style={{ color: "red" }}>
            Ошибка входа. Проверьте логин или пароль.
          </p>
        )}
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={`mb-20`}
        >
          Войти
        </Button>
      </form>

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
