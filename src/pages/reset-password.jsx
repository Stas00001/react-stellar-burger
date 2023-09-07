import React from "react";
import style from "./form.module.css";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { resetPassword } from "../services/actions/user";
import { useFormField } from "../utils/hook/useFormField";
const ResetPassword = () => {
  const { values, onChange } = useFormField({ password: "", code: "" });
  const { forgotPasswordSuccess } = useSelector((store) => store.user);
  const dispatch = useDispatch
  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({
      password: values.password,
      token: values.code
    }))
  };
  if (!forgotPasswordSuccess) {
    return (
      <Navigate
        to={'/forgot-password'}
      />
    );
  }


  return (
    <div className={style.container}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <form className={style.form}>
        <PasswordInput
          onChange={onChange}
          value={values.password}
          name={"newPassword"}
          extraClass="mb-6"
        />
        <Input
          onChange={onChange}
          value={values.code}
          name={"emailCod"}
          placeholder="Укажите код из письма"
          extraClass="mb-6"
        />
      </form>
      <Button
        extraClass="mb-20"
        htmlType="button"
        type="submit"
        size="medium"
        onChange={resetPasswordSubmit}
      >
        Сохранить
      </Button>
      <p className="text text_type_main-default text_color_inactive pb-4">
        Вспомнили пароль?{" "}
        <Link className={style.link} to="/login">
          Войти
        </Link>{" "}
      </p>
    </div>
  );
};

export default ResetPassword;
