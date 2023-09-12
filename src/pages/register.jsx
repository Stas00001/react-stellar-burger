import style from "./form.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { register } from "../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useFormField } from "../utils/hook/useFormField";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const { user, registerFailed } = useSelector((store) => store.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { values, onChange } = useFormField({
    email: "",
    password: "",
    name: "",
  });

  const registerSubmit = (e) => {
    e.preventDefault();
    if (values.email && values.password && values.name) {
      dispatch(
        register({
          email: values.email,
          password: values.password,
          name: values.name,
        })
      );
      navigate('/')
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
      <form onSubmit={registerSubmit} className={style.form}>
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
         {registerFailed && (
          <p className="text text_type_main-default" style={{ color: "red" }}>
           Данное имя уже занято!
          </p>
        )}
         <Button
        extraClass="mb-20"
        htmlType="submit"
        type="primary"
        size="medium"
      >
        Зарегистрироваться
      </Button>
      </form>

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
