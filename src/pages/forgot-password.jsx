import React from "react";
import style from "./form.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { useFormField } from "../utils/hook/useFormField";
import { forgotPassword } from "../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const {values, onChange} = useFormField({email: ''})
  const { forgotPasswordSuccess } = useSelector((store) => store.user);

  const useProvideForgotPassword = async (e) => {
    e.preventDefault();
    if (values.email) {
      await dispatch(forgotPassword({
        email: values.email
      }));
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

  if (forgotPasswordSuccess) {
    return (
      <Navigate
        to={'/reset-password'}
      />
    );
  }


  return (
    <div className={style.container}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <form className={style.form}>
        <EmailInput
          extraClass="mb-6"
          placeholder="Укажите e-mail"
          onChange={onChange}
          value={values.email}
          name={"email"}
          isIcon={false}
        />
      </form>
      <Button
        extraClass="mb-20"
        htmlType="button"
        type="primary"
        size="medium"
        onClick={useProvideForgotPassword}
      >
        Восстоновить
      </Button>
      <p className="text text_type_main-default text_color_inactive pb-4">
        Вспомнили пароль?{" "}
        <Link className={style.link} to="/login">
          Войти
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

export default ForgotPassword;
