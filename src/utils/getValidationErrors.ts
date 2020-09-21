import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(errors: ValidationError) {
  const validationsErrors: Errors = {};
  errors.inner.forEach((error) => {
    const formattedPath = error.path.replace(/(\.)(.*)/g, '[$2]');
    validationsErrors[formattedPath] = error.message;
  });

  return validationsErrors;
}
