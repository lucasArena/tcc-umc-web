import React, { InputHTMLAttributes } from 'react';

import { Container, UploadContainer } from './styles';

import UploadIcon from '../../assets/images/icons/upload-purple.svg';

interface InputUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  imageAlt?: string;
  description?: string;
  name: string;
  id: string;
}

const InputFile: React.FC<InputUploadProps> = ({
  id,
  name,
  description,
  imageAlt,
  ...rest
}) => {
  return (
    <Container>
      <UploadContainer htmlFor={id}>
        <img src={UploadIcon} alt={imageAlt || 'Upload'} />
        <span>{description}</span>
        <input type="file" name={name} id={id} {...rest} />
      </UploadContainer>
    </Container>
  );
};

export default InputFile;
