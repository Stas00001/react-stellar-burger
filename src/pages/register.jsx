import style from "./form.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { register } from "../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useFormField } from "../utils/hook/useFormField";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const { isLogin } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { values, onChange } = useFormField({ email: '',  password: '', name: ''});

  const useProvideRegister = async (e) => {
    e.preventDefault();
    if (values.email && values.password && values.name) {
      await dispatch(
        register({
          email: values.email,
          password: values.password,
          name: values.name,
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
  

  return (
    <div className={style.container}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <form className={style.form}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          value={values.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
          onChange={onChange}
        />
        <EmailInput
          extraClass="mb-6"
          value={values.email}
          name={"email"}
          onChange={onChange}
        />
        <PasswordInput
          value={values.password}
          name={"password"}
          extraClass="mb-6"
          onChange={onChange}
        />
      </form>
      <Button
        onClick={useProvideRegister}
        extraClass="mb-20"
        htmlType="button"
        type="primary"
        size="medium"
      >
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-default text_color_inactive pb-4">
        Уже зарегистрированы?{" "}
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

export default Register;
