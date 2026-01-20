import { TransformFnParams } from 'class-transformer';

export const trimString = ({
  value,
}: TransformFnParams): string | undefined => {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (value === null || value === undefined) {
    return undefined;
  }

  return String(value);
};

export const toBoolean = ({ value }: TransformFnParams): boolean => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }

  return Boolean(value);
};
