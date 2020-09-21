import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useField } from '@unform/core';
import 'react-datepicker/dist/react-datepicker.css';

import { Container, DatePickerContainer } from './styles';

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  label?: string;
}
const DatePicker: React.FC<Props> = ({ name, label, ...rest }) => {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <label htmlFor="">{label}</label>
      <DatePickerContainer>
        <ReactDatePicker
          ref={datepickerRef}
          selected={date}
          onChange={setDate}
          {...rest}
        />
      </DatePickerContainer>
    </Container>
  );
};
export default DatePicker;
