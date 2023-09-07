import React from "react";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormField } from "../../utils/hook/useFormField";
import { getUserData } from "../../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./profile-form.module.css";
import { updateUser } from "../../services/actions/user";
const ProfileForm = () => {
  const { user } = useSelector((store) => store.user);
  const { values, setValue, onChange } = useFormField({ email: '', name: '' , password: ''});
  const [disabled, setDisabled] = React.useState(true);
  const dispatch = useDispatch()
  React.useEffect(() => {
    setValue({ ...values, email: user.email, name: user.name });
    dispatch(getUserData());
  }, [dispatch, user.email, user.name]);

  const submitUpdateUser = (e) => {
    e.preventDefault()
    dispatch(updateUser({email: values.email, name: values.name}))
  }

  return (
    <form className={style.form__container} action="">
      <Input
        placeholder={"Имя"}
        value={values.name}
        disabled={disabled}
        onIconClick={() => setDisabled(false)}
        name={"name"}
        icon="EditIcon"
        errorText={"Ошибка"}
        extraClass="mb-6"
        onChange={onChange}
      />
      <EmailInput
        disabled={disabled}
        onIconClick={() => setDisabled(false)}
        extraClass="mb-6"
        icon="EditIcon"
        value={values.email}
        name={"email"}
        isIcon={false}
        onChange={onChange}
      />
      <PasswordInput
        icon="EditIcon"
        value={values.password}
        name={"password"}
        extraClass="mb-6"
        onChange={onChange}
      />
      {values && (<div className={style.buttons}>
        <Button onClick={submitUpdateUser} htmlType="submit" type="primary" size="medium">Сохранить</Button>
      </div>)}
        
    </form>
    
  );
};

export default ProfileForm;
