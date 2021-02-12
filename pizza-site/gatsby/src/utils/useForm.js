import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);
  // defaults = {name: '',email: '',}
  // therefore values = defaults object??

  function updateValue(e) {
    // check if the type is a number and force it to an actual number
    let { value } = e.target;
    // same as let value = e.target.value;

    if (e.target.type === 'number') {
      value = parseInt(value);
    }

    // setValues is method to update values in useState
    setValues({
      // copy existing values into it
      ...values,
      // update new value that has changed
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
