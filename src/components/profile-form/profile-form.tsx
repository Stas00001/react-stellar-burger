import React, { FC } from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormField } from "../../utils/hook/useFormField";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile-form.module.css";
import { updateUser } from "../../services/actions/user";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "../../types/hooks";
const ProfileForm: FC = () => {
  const { user, email, name } = useSelector((store) => store.user);
  const [activeButtons, setActiveButtons] = React.useState(false);
  const { values, setValue, onChange } = useFormField({
    email: "",
    name: "",
    password: "",
  });
  const [disabled, setDisabled] = React.useState(true);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setValue({ ...values, email: email, name: name, password: "" });
  }, [email, name]);
  const updateUserSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUser({
        email: values.email,
        name: values.name,
        password: values.password,
      })
    );
    toast("Данные изменены!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    setActiveButtons(false);
  };

  const onChangeProfile = (evt: React.ChangeEvent<HTMLInputElement> ) => {
    onChange(evt);
    setActiveButtons(true);
  };

  const resetForm = () => {
    setValue({
      email: email,
      name: name,
      password: "",
    });
    setActiveButtons(false);
  };

  return (
    <>
      {values && (
        <form
          onSubmit={updateUserSubmit}
          className={style.form__container}
          action=""
        >
          <Input
            placeholder={"Имя"}
            value={values.name}
            disabled={disabled}
            onIconClick={() => setDisabled(false)}
            name={"name"}
            icon="EditIcon"
            errorText={"Ошибка"}
            extraClass="mb-6"
            onChange={onChangeProfile}
          />
          <EmailInput
            disabled={disabled}
            extraClass="mb-6"
            value={values.email}
            name={"email"}
            isIcon={true}
            onChange={onChangeProfile}
          />
          <PasswordInput
            icon="EditIcon"
            value={values.password}
            name={"password"}
            extraClass="mb-6"
            onChange={onChangeProfile}
          />
          {activeButtons && (
            <div className={style.buttons}>
              <Button
                onClick={resetForm}
                htmlType="button"
                type="secondary"
                size="medium"
              >
                Отменить
              </Button>

              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      )}
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
    </>
  );
};

export default ProfileForm;
