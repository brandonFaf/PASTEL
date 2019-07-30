import { useState } from "react";

const useForm = initialState => {
  const [values, setValues] = useState(initialState);

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setValues(values => ({
      ...values,
      [name]: value
    }));
  };

  return {
    handleChange,
    values
  };
};

export default useForm;
