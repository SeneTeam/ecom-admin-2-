import React, {useState, useEffect} from 'react';
import '../../../styles/components/Atoms/Form/Input.scss';
import {InputProps} from '../../../types/props';

export default function Input<T>(
  { placeholder = '', padding = 'px-4', type, readonly = false, required = true, value = '', name, min = 0, max,
   full, fcolor = 'primary', bcolor = 'tertiary', pcolor = 'txt-secondary', width, handleChange = () => {},
    className = '', ...attrs}: InputProps<T>) {

      const [_value, setValue] = useState<string>('');

      useEffect(() => setValue(value?.toString()), [value]);
    
      function handleOnChange(e: any) {
        setValue(e.target.value);
        if (handleChange && _value !== e.target.value)
          handleChange({ name, value: e.target.value, event: e });
      }

    return (
        <input
          {...attrs}
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          spellCheck="true"
          readOnly={readonly}
          required={required}
          min={min}
          max={max}
          autoComplete="off"
          className={``}
          /* @ts-ignore */
          onChange={handleOnChange}
        />
    )
}