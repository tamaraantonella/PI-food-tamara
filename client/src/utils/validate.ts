export type Input = {
  name: string;
  summary: string;
  healthScore: number;
  steps: string;
  image: string;
  diets: string[];
};

export type InputErrors = {
  name?: string;
  summary?: string;
  healthScore?: string;
  image?: string;
};

export const validateInputs = (input: Input, callbackFn: Function) => {
  const error: InputErrors = {};
  if (
    input.name.length > 2 &&
    (input.name.length < 3 || input.name.search(/[^{}*;@>!<]*$/g) !== 0)
  ) {
    error.name =
      'Name is required, must be at least 3 characters long and must not contain special characters';
  }
  if (
    input.summary.length > 2 &&
    (!input.summary || input.summary.length < 10)
  ) {
    error.summary =
      'Summary is required and must be at least 10 characters long';
  }
  if (
    input.healthScore < 0 ||
    input.healthScore > 100 ||
    isNaN(Number(input.healthScore))
  ) {
    error.healthScore =
      'HealthScore must be between 0 and 100 and must be a number';
  }
  if (
    input.image.length &&
    (input.image.slice(0, 4) !== 'http' ||
      input.image.slice(input.image.length - 3, input.image.length) !== 'jpg')
  ) {
    error.image = 'Image must be a valid url';
  }

  !error.name && !error.summary && !error.healthScore
    ? callbackFn(false)
    : callbackFn(true);

  return error;
};
