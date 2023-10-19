import React from "react";

export const useFormField = (initialValue: any) => {
    const [values, setValue] = React.useState(initialValue);
     
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const {value, name} = e.target
      setValue({...values, [name]: value})
    }
    return { values, onChange, setValue };
  };