import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactSelect, { Props, OptionTypeBase } from 'react-select';

import { useField } from '@unform/core';
import { Container } from './styles';

interface SelectProps extends Props<OptionTypeBase> {
  label?: string;
  id?: string;
  name: string;
  width?: string;
  options: Array<{ value: string; label: string }>;
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  name,
  width,
  options,
  ...rest
}) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  const [selected, setSelected] = useState(defaultValue || '');

  const handleSelect = useCallback((e) => {
    return setSelected(e.value);
  }, []);

  useEffect(() => {
    setSelected(defaultValue || '');
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'props.value.value',
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container width={width}>
      <label htmlFor={id}>{label}</label>

      <ReactSelect
        value={
          selected &&
          options &&
          options.find((option) => option.value === String(selected))
        }
        onChange={(e) => handleSelect(e)}
        options={options}
        ref={selectRef}
        id={id}
        styles={{
          control: (styles) => ({
            ...styles,
            background: '#FAFAFC',
            position: 'relative',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#E6E6F0',
            padding: '0 1.6rem',
            marginTop: '0.5rem',
            display: 'flex',
            height: '5.6rem',
          }),
          option: (styles, state) => ({
            ...styles,
            background: state.isFocused ? '#EBEBF5' : '#F8F8FC',
            fontWeight: state.isFocused ? 600 : 500,
            fontSize: '16px',
            lineHeight: '26px',
            color: '#6A6180',
            height: '56px',
            border: '1px solid #E6E6F0',
            borderLeft: state.isFocused
              ? '1.5px solid #8257E5'
              : '1px solid #E6E6F0',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }),
          menuList: (styles, state) => ({
            ...styles,
            background: '#F8F8FC',
          }),
          dropdownIndicator: (styles) => ({
            ...styles,
            border: 'none',
          }),
        }}
        {...rest}
      />
    </Container>
  );
};

export default Select;
