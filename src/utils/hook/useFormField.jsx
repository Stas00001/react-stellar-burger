import React from "react";

export const useFormField = (initialValue) => {
    const [values, setValue] = React.useState(initialValue);
     
    const onChange = (e) => {
      const {value, name} = e.target
      setValue({...values, [name]: value})
    }
    return { values, onChange, setValue };
  };