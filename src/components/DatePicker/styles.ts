import styled, { css } from 'styled-components';

interface ContainerProps {
  width?: string;
}

interface DatePickerContainerProps {
  disabled?: boolean | undefined;
}

export const Container = styled.section<ContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.textPrimary};
  }

  @media (min-width: 700px) {
    width: ${(props) => (props.width ? props.width : '100%')};
  }
`;

export const DatePickerContainer = styled.div<DatePickerContainerProps>`
  display: flex;

  position: relative;
  background: ${(props) => props.theme.colors.boxFooter};
  border: 1px solid ${(props) => props.theme.colors.lineWhite};
  padding: 0 1.6rem;
  margin-top: 0.8rem;
  border-radius: 8px;

  input {
    width: 100%;
    height: 5.6rem;
    border-radius: 0.8rem;
    background: ${(props) => props.theme.colors.boxFooter};

    border: 0;
    outline: 0;
    font: 1.6rem Archivo;

    &::placeholder {
      font-size: 16px;
      line-height: 24px;
      color: ${(props) => props.theme.colors.textComplement};
    }
  }

  button {
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
  }

  .react-datepicker {
    font-size: 1em !important;
  }
  .react-datepicker__header {
    padding-top: 0.8em !important;
  }
  .react-datepicker__month {
    margin: 0.4em 1em !important;
  }
  .react-datepicker__day-name,
  .react-datepicker__day {
    width: 1.9em !important;
    line-height: 1.9em !important;
    margin: 0.166em !important;
  }
  .react-datepicker__current-month {
    font-size: 1em !important;
  }
  .react-datepicker__navigation {
    top: 1em !important;
    line-height: 1.7em !important;
    border: 0.45em solid transparent !important;
  }
  .react-datepicker__navigation--previous {
    border-right-color: #ccc !important;
    left: 1em !important;
  }
  .react-datepicker__navigation--next {
    border-left-color: #ccc !important;
    right: 1em !important;
    left: 220px !important;
  }

  .react-datepicker__time-container {
    width: 6em !important;
  }
  .react-datepicker-time__header {
    font-size: 1em !important;
  }
  .react-datepicker-time__header--time {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .react-datepicker__time-box {
    margin-left: 0px !important;
    margin-right: 0px !important;
    width: 100% !important;
  }
  .react-datepicker__time-list {
    padding: 0 !important;
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}

  &:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: ${(props) => props.theme.colors.primaryLight};
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
    position: absolute;
  }
`;
